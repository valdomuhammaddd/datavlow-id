-- Workflows + Simulation hardware state for DATAVLOW.ID platform APIs

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'draft'
    check (status in ('draft', 'live', 'archived')),
  definition jsonb not null default '{"nodes":[],"edges":[]}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workflows_status_idx on public.workflows (status);
create index if not exists workflows_updated_at_idx on public.workflows (updated_at desc);

create table if not exists public.simulation_hardware (
  device_id text primary key,
  ph numeric not null default 7.2,
  tds numeric not null default 450,
  turbidity numeric not null default 1.5,
  temp numeric not null default 24.5,
  sensors_enabled boolean not null default true,
  lcd_line1 text not null default 'pH:7.2 TDS:450  ',
  lcd_line2 text not null default 'Status: BAIK    ',
  last_button text,
  water_status text,
  crisp_score numeric,
  action_message text,
  uptime_seconds integer not null default 0,
  rssi integer not null default -64,
  voltage numeric not null default 3.31,
  updated_at timestamptz not null default now()
);

-- Optional device metrics for ping/health UI
alter table public.devices
  add column if not exists latency_ms numeric,
  add column if not exists health text;

alter table public.telemetry_logs enable row level security;

-- Service role bypasses RLS; keep anon select from prior migration.
