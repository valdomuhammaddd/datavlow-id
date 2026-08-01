-- Browser dashboard (anon key) needs SELECT for history + Realtime filters
alter table public.telemetry_logs enable row level security;

drop policy if exists "telemetry_logs_select_public" on public.telemetry_logs;

create policy "telemetry_logs_select_public"
  on public.telemetry_logs
  for select
  to anon, authenticated
  using (true);
