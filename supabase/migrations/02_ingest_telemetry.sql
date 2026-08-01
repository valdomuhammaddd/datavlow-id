-- Atomic ingest: insert telemetry_logs + update devices.last_ping/status

create or replace function public.ingest_telemetry(
  p_api_key text,
  p_ph numeric,
  p_tds numeric,
  p_turbidity numeric,
  p_temp numeric,
  p_crisp_score numeric default null,
  p_water_status text default null,
  p_action_message text default null,
  p_created_at timestamptz default now()
)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ts timestamptz := coalesce(p_created_at, now());
begin
  if not exists (
    select 1 from public.devices d where d.api_key = p_api_key
  ) then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  insert into public.telemetry_logs (
    device_id,
    ph,
    tds,
    turbidity,
    temp,
    crisp_score,
    water_status,
    action_message,
    created_at
  ) values (
    p_api_key,
    p_ph,
    p_tds,
    p_turbidity,
    p_temp,
    p_crisp_score,
    p_water_status,
    p_action_message,
    v_ts
  );

  update public.devices
  set
    last_ping = v_ts,
    status = 'online'
  where api_key = p_api_key;

  return v_ts;
end;
$$;

revoke all on function public.ingest_telemetry(
  text, numeric, numeric, numeric, numeric, numeric, text, text, timestamptz
) from public;

grant execute on function public.ingest_telemetry(
  text, numeric, numeric, numeric, numeric, numeric, text, text, timestamptz
) to service_role;
