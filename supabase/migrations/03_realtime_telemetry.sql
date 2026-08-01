-- Enable Supabase Realtime for telemetry_logs INSERT streaming
alter publication supabase_realtime add table public.telemetry_logs;
