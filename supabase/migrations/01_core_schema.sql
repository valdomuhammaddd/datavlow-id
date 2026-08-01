-- DATAVLOW.ID — core schema
-- devices + telemetry_logs with 7-day telemetry retention

create extension if not exists "pgcrypto";
create extension if not exists "pg_cron";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  api_key text not null unique,
  name text not null,
  status text not null default 'offline'
    check (status in ('online', 'offline', 'error', 'maintenance')),
  last_ping timestamptz
);

create table if not exists public.telemetry_logs (
  id bigserial primary key,
  device_id text not null
    references public.devices (api_key)
    on delete cascade,
  ph numeric,
  tds numeric,
  turbidity numeric,
  temp numeric,
  crisp_score numeric,
  water_status text
    check (
      water_status is null
      or water_status in ('Baik', 'Cukup Baik', 'Tidak Baik')
    ),
  action_message text,
  created_at timestamptz not null default now()
);

create index if not exists telemetry_logs_device_id_idx
  on public.telemetry_logs (device_id);

create index if not exists telemetry_logs_created_at_idx
  on public.telemetry_logs (created_at desc);

create index if not exists devices_status_idx
  on public.devices (status);

-- ---------------------------------------------------------------------------
-- Lifecycle: purge telemetry older than 7 days (free-tier footprint)
-- ---------------------------------------------------------------------------

create or replace function public.purge_old_telemetry_logs()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.telemetry_logs
  where created_at < now() - interval '7 days';

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.purge_old_telemetry_logs() is
  'Deletes telemetry_logs rows older than 7 days. Scheduled via pg_cron.';

-- Daily at 03:00 UTC
select cron.schedule(
  'purge-telemetry-logs-7d',
  '0 3 * * *',
  $$select public.purge_old_telemetry_logs();$$
);

-- Optional defense-in-depth: also prune on insert bursts (cheap no-op when fresh)
create or replace function public.telemetry_logs_retention_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Probabilistic prune (~1% of inserts) to avoid per-row delete cost
  if random() < 0.01 then
    perform public.purge_old_telemetry_logs();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_telemetry_logs_retention on public.telemetry_logs;

create trigger trg_telemetry_logs_retention
  after insert on public.telemetry_logs
  for each row
  execute function public.telemetry_logs_retention_trigger();
