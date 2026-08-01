-- Phase A–C foundation: profiles, sites, audit, alerts, offline detector, key revoke

-- Operator profiles (linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'operator'
    check (role in ('admin', 'operator', 'viewer')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'operator')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sites / multi-site tenancy (simplified)
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null default 'Sector-7G',
  created_at timestamptz not null default now()
);

insert into public.sites (name, region)
select 'Indonesia Central', 'Sector-7G'
where not exists (select 1 from public.sites limit 1);

-- Extend devices
alter table public.devices
  add column if not exists site_id uuid references public.sites (id),
  add column if not exists revoked_at timestamptz,
  add column if not exists notes text;

-- Audit trail
create table if not exists public.audit_logs (
  id bigserial primary key,
  actor_id uuid references auth.users (id),
  action text not null,
  entity text not null,
  entity_id text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- Alert events
create table if not exists public.alert_events (
  id bigserial primary key,
  device_id text,
  severity text not null check (severity in ('info', 'warning', 'critical')),
  water_status text,
  message text not null,
  acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists alert_events_created_at_idx on public.alert_events (created_at desc);

-- Offline detector: mark devices offline if no ping for 5 minutes
create or replace function public.mark_stale_devices()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  update public.devices
  set status = 'offline'
  where revoked_at is null
    and status = 'online'
    and (last_ping is null or last_ping < now() - interval '5 minutes');

  get diagnostics n = row_count;
  return n;
end;
$$;

do $$
begin
  perform cron.unschedule('mark-stale-devices-5m');
exception
  when others then null;
end $$;

select cron.schedule(
  'mark-stale-devices-5m',
  '*/5 * * * *',
  $$select public.mark_stale_devices();$$
);

-- Authenticated read for dashboard tables
alter table public.devices enable row level security;
drop policy if exists "devices_select_authenticated" on public.devices;
create policy "devices_select_authenticated"
  on public.devices for select to authenticated
  using (true);

drop policy if exists "telemetry_logs_select_authenticated" on public.telemetry_logs;
create policy "telemetry_logs_select_authenticated"
  on public.telemetry_logs for select to authenticated
  using (true);

alter table public.alert_events enable row level security;
drop policy if exists "alerts_select_authenticated" on public.alert_events;
create policy "alerts_select_authenticated"
  on public.alert_events for select to authenticated
  using (true);

alter table public.audit_logs enable row level security;
drop policy if exists "audit_select_authenticated" on public.audit_logs;
create policy "audit_select_authenticated"
  on public.audit_logs for select to authenticated
  using (true);

alter table public.sites enable row level security;
drop policy if exists "sites_select_authenticated" on public.sites;
create policy "sites_select_authenticated"
  on public.sites for select to authenticated
  using (true);

alter table public.workflows enable row level security;
drop policy if exists "workflows_select_authenticated" on public.workflows;
create policy "workflows_select_authenticated"
  on public.workflows for select to authenticated
  using (true);
