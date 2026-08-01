# DATAVLOW.ID

**Scalable IoT PaaS for real-time water quality monitoring, fuzzy inference, and edge automation.**

DATAVLOW.ID is a production-oriented command center that ingests telemetry from ESP32-class devices, classifies water quality with Fuzzy Mamdani logic, streams live metrics to a glassmorphic dashboard, and exposes a full API surface for fleet management, simulation, analytics, and workflow automation.

Built with **Next.js (App Router)**, **Supabase**, and **TypeScript**.

---

## Highlights

| Capability | Description |
|---|---|
| **ESP32 Telemetry Gateway** | Authenticated `POST /api/v1/telemetry` with API-key device auth |
| **Fuzzy Mamdani Engine** | Server-side fallback for `crisp_score`, `water_status`, and `action_message` |
| **Realtime Dashboard** | Supabase Realtime `INSERT` stream → KPI cards, status banner, kinetic chart |
| **Historical Ledger** | Filterable telemetry ledger with CSV / JSON / PDF-ready export |
| **Device Fleet** | Registration wizard, ping/latency health, online status tracking |
| **Logic Builder Core** | Workflow save/load + dry-run IF/THEN testing |
| **Simulation Center** | Virtual LCD 16×2 hardware state + Telegram alert formatting |
| **Global UI State** | Dark/Light theme and ID/EN locale via React Context |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Backend:** Next.js Route Handlers (`/app/api/v1/*`)
- **Database:** Supabase (PostgreSQL) + `pg_cron` retention
- **Realtime:** Supabase Realtime (`postgres_changes`)
- **Auth for devices:** Per-device `api_key` (service-role server path)
- **Styling:** Design-system tokens from `DESAINUI.MD` (glassmorphism / obsidian)

---

## Architecture

```
ESP32 / Edge Node
        │  POST /api/v1/telemetry  (api_key + sensors)
        ▼
┌───────────────────────┐
│  Next.js API Gateway  │  Fuzzy Mamdani · ingest_telemetry RPC
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│  Supabase Postgres    │  devices · telemetry_logs · workflows · simulation_hardware
│  + Realtime           │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│  Web Command Center   │  Dashboard · Analytics Ledger · Simulation
└───────────────────────┘
```

**Data lifecycle:** `telemetry_logs` older than **7 days** are purged via `pg_cron` (+ light insert trigger) to stay within free-tier storage limits.

---

## Project Structure

```
├── app/
│   ├── api/v1/                 # REST API (telemetry, devices, ledger, workflows, simulation, telegram)
│   ├── analytics/              # Historical Water Quality Ledger UI
│   ├── page.tsx                # Precision Telemetry Dashboard
│   └── layout.tsx
├── components/                 # Dashboard, ledger, providers, UI controls
├── context/                    # GlobalUIContext (theme + locale)
├── hooks/                      # useTelemetryStream, useTelemetryLedger
├── lib/
│   ├── api/                    # HTTP helpers & validators
│   ├── fuzzy/                  # Mamdani inference
│   ├── devices/ · ledger/ · simulation/ · workflows/
│   └── supabase/               # browser / server / admin clients
├── supabase/migrations/        # SQL schema, RPC, RLS, Realtime, retention
├── types/database.types.ts
└── DESAINUI.MD                 # Locked UI/UX blueprints
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project
- (Optional) Telegram bot token for live alert delivery

### 1. Install

```bash
git clone https://github.com/valdomuhammaddd/datavlow-id.git
cd datavlow-id
npm install
```

### 2. Environment

Copy the example file and fill in your Supabase keys:

```bash
cp .env.example .env.local
```

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Publishable / anon key |
| `SUPABASE_SECRET_KEY` | Server only | Secret / service-role key |
| `SUPABASE_JWKS_URL` | Server | JWKS endpoint (optional) |
| `TELEGRAM_BOT_TOKEN` | Server | Optional bot delivery |
| `TELEGRAM_DEFAULT_CHAT_ID` | Server | Optional default chat |
| `TELEGRAM_WEBHOOK_SECRET` | Server | Optional webhook verification |

> Legacy aliases `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are still supported via `lib/supabase/env.ts`.

**Never commit `.env.local`.** It is gitignored.

### 3. Database migrations

In the Supabase SQL Editor, run in order:

1. `supabase/migrations/01_core_schema.sql`
2. `supabase/migrations/02_ingest_telemetry.sql`
3. `supabase/migrations/03_realtime_telemetry.sql`
4. `supabase/migrations/04_rls_telemetry_read.sql`
5. `supabase/migrations/05_platform_tables.sql`

### 4. Seed a device

```sql
insert into public.devices (name, api_key, status)
values ('ESP32-Lab-01', 'dv_your_test_key', 'offline');
```

### 5. Run locally

```bash
npm run dev
```

- Dashboard: [http://localhost:3000](http://localhost:3000)
- Analytics ledger: [http://localhost:3000/analytics](http://localhost:3000/analytics)

---

## API Reference (MVP)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/telemetry` | Ingest sensor payload from ESP32 |
| `GET` | `/api/v1/ledger` | Query ledger (`nodeId`, `status`, `dateFrom`, `dateTo`, `page`, `pageSize`) |
| `GET/POST` | `/api/v1/ledger/export` | Export `csv` \| `json` \| `pdf` payload |
| `GET` | `/api/v1/devices` | List fleet |
| `POST` | `/api/v1/devices` | Register device |
| `POST` | `/api/v1/devices/ping` | Latency / health probe |
| `GET/POST` | `/api/v1/simulation/hardware` | Virtual LCD + button/sensor actions |
| `POST` | `/api/v1/telegram/webhook` | Alert format + optional Telegram send |
| `GET/POST` | `/api/v1/workflows` | Load/save workflows; `action: "test"` dry-run |

### Telemetry payload example

```json
{
  "api_key": "dv_your_test_key",
  "ph": 7.2,
  "tds": 450,
  "turbidity": 1.5,
  "temp": 24.5
}
```

**Response**

```json
{
  "success": true,
  "timestamp": "2026-08-02T00:00:00.000Z",
  "water_status": "Baik",
  "crisp_score": 88.0
}
```

Water status labels follow the design system: **`Baik`** · **`Cukup Baik`** · **`Tidak Baik`**.

---

## Deploy to Vercel

1. Push this repository to GitHub (see below).
2. Import the repo in [Vercel](https://vercel.com/new).
3. Set Environment Variables (Production + Preview):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
   - (optional) Telegram variables

4. Deploy. Vercel will run `next build` automatically.
5. Point ESP32 devices to:

   `https://<your-domain>/api/v1/telemetry`

### Framework preset

- **Framework Preset:** Next.js  
- **Build Command:** `next build` (default)  
- **Install Command:** `npm install` (default)  
- **Node.js:** 20.x recommended  

---

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # lint (when configured)
```

---

## Security Notes

- Device ingestion uses **service-role** on the server after validating `api_key` against `devices`.
- Browser clients use the **publishable** key with RLS (`telemetry_logs` select policy).
- Rotate any key that has been exposed in chat, screenshots, or public logs.
- Keep `SUPABASE_SECRET_KEY` server-only — never prefix with `NEXT_PUBLIC_`.

---

## Roadmap (post-MVP)

- [ ] Full auth (Supabase Auth) for operator accounts  
- [ ] Settings UI (thresholds, Telegram credentials, roles)  
- [ ] Visual Logic Builder canvas wired to `/api/v1/workflows`  
- [ ] PDF binary generation (currently PDF-ready JSON document model)  
- [ ] Multi-tenant organizations / regional sectors  

---

## License

Private / proprietary unless otherwise stated by the repository owner.

---

## Author

Maintained by [valdomuhammaddd](https://github.com/valdomuhammaddd) — DATAVLOW.ID Command Center.
