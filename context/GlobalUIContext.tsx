"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";
export type LocaleCode = "ID" | "EN";

interface GlobalUIContextValue {
  theme: ThemeMode;
  locale: LocaleCode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setLocale: (locale: LocaleCode) => void;
  t: (key: string) => string;
}

const STORAGE_THEME = "datavlow.theme";
const STORAGE_LOCALE = "datavlow.locale";

const MESSAGES: Record<LocaleCode, Record<string, string>> = {
  ID: {
    dashboard: "Dashboard",
    network: "Jaringan",
    devices: "Perangkat",
    analytics: "Analitik",
    settings: "Pengaturan",
    help: "Bantuan",
    logout: "Keluar",
    addDevice: "Tambah Perangkat",
    logicBuilder: "Logic Builder",
    commandCenter: "Pusat Komando",
    historicalLedger: "Buku Besar Historis",
    historicalLedgerDesc:
      "Aliran telemetri kualitas air node untuk sektor regional-7G.",
    export: "EKSPOR",
    dataStreamLedger: "Ledger Aliran Data",
    searchNodeId: "Cari Node ID...",
    avgPh: "RATA-RATA pH",
    tdsAggregate: "AGREGAT TDS",
    meanTemp: "SUHU RATA-RATA",
    activeNodes: "NODE AKTIF",
    lastSync: "Sinkron terakhir",
    showing: "Menampilkan",
    of: "dari",
    recordedTelemetries: "telemetri tercatat",
    liveMap: "Peta Telemetri Live",
    regionalSector: "Distribusi Sektor Regional - Indonesia Tengah",
    realtimeTracking: "Pelacakan Real-time",
    spatialNodeView: "Tampilan Node Spasial",
    satelliteOverlay: "Overlay Citra Satelit v4.2",
    fuzzyEngine: "Mesin Logika: Fuzzy Mamdani",
    aggregateScore: "SKOR AGREGAT",
    systemOptimal: "Sistem Optimal",
    systemCaution: "Sistem Waspada",
    systemAlert: "Sistem Alert",
    awaitingTelemetry: "Menunggu Telemetri",
    realTime: "REAL-TIME",
    acidity: "Keasaman (pH)",
    tdsLevel: "Level TDS",
    turbidity: "Kekeruhan",
    temperature: "Suhu",
    telemetryTopography: "Topografi Telemetri",
    kineticTrends: "Tren kinetik kualitas air real-time",
    liveStream: "STREAM LIVE",
    connecting: "MENGHUBUNGKAN",
    nodesOnline: "NODE ONLINE",
    systemAlerts: "ALERT SISTEM",
    uplinkStatus: "STATUS UPLINK",
    healthy: "SEHAT",
    alert: "ALERT",
    none: "Tidak Ada",
    critical: "Kritis",
    live: "Live",
    syncing: "Menyinkronkan...",
    idle: "Siaga",
    stableNominal: "Stabil (Nominal)",
    slightIncrease: "Sedikit Naik",
    controlled: "Terkendali",
    online: "Online",
  },
  EN: {
    dashboard: "Dashboard",
    network: "Network",
    devices: "Devices",
    analytics: "Analytics",
    settings: "Settings",
    help: "Help",
    logout: "Logout",
    addDevice: "Add Device",
    logicBuilder: "Logic Builder",
    commandCenter: "Command Center",
    historicalLedger: "Historical Ledger",
    historicalLedgerDesc:
      "Water quality node telemetry streams for regional sector-7G.",
    export: "EXPORT",
    dataStreamLedger: "Data Stream Ledger",
    searchNodeId: "Search Node ID...",
    avgPh: "AVG PH LEVEL",
    tdsAggregate: "TDS AGGREGATE",
    meanTemp: "MEAN TEMPERATURE",
    activeNodes: "ACTIVE NODES",
    lastSync: "Last Sync",
    showing: "Showing",
    of: "of",
    recordedTelemetries: "recorded telemetries",
    liveMap: "Live Telemetry Map",
    regionalSector: "Regional Sector Distribution - Indonesia Central",
    realtimeTracking: "Real-time Tracking",
    spatialNodeView: "Spatial Node View",
    satelliteOverlay: "Satellite Imagery Overlay v4.2",
    fuzzyEngine: "Logic Engine: Fuzzy Mamdani",
    aggregateScore: "AGGREGATE SCORE",
    systemOptimal: "System Optimal",
    systemCaution: "System Caution",
    systemAlert: "System Alert",
    awaitingTelemetry: "Awaiting Telemetry",
    realTime: "REAL-TIME",
    acidity: "Acidity (pH)",
    tdsLevel: "TDS level",
    turbidity: "Turbidity",
    temperature: "Temperature",
    telemetryTopography: "Telemetry Topography",
    kineticTrends: "Real-time water quality kinetic trends",
    liveStream: "LIVE STREAM",
    connecting: "CONNECTING",
    nodesOnline: "NODES ONLINE",
    systemAlerts: "SYSTEM ALERTS",
    uplinkStatus: "UPLINK STATUS",
    healthy: "HEALTHY",
    alert: "ALERT",
    none: "None",
    critical: "Critical",
    live: "Live",
    syncing: "Syncing...",
    idle: "Idle",
    stableNominal: "Stable (Nominal)",
    slightIncrease: "Slight Increase",
    controlled: "Controlled",
    online: "Online",
  },
};

const GlobalUIContext = createContext<GlobalUIContextValue | null>(null);

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_THEME);
  return stored === "light" ? "light" : "dark";
}

function readStoredLocale(): LocaleCode {
  if (typeof window === "undefined") return "ID";
  const stored = window.localStorage.getItem(STORAGE_LOCALE);
  return stored === "EN" ? "EN" : "ID";
}

export function GlobalUIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [locale, setLocaleState] = useState<LocaleCode>("ID");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setThemeState(readStoredTheme());
    setLocaleState(readStoredLocale());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.lang = locale === "ID" ? "id" : "en";
    window.localStorage.setItem(STORAGE_THEME, theme);
    window.localStorage.setItem(STORAGE_LOCALE, locale);
  }, [theme, locale, hydrated]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string) => MESSAGES[locale][key] ?? MESSAGES.EN[key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({
      theme,
      locale,
      toggleTheme,
      setTheme,
      setLocale,
      t,
    }),
    [theme, locale, toggleTheme, setTheme, setLocale, t],
  );

  return (
    <GlobalUIContext.Provider value={value}>{children}</GlobalUIContext.Provider>
  );
}

export function useGlobalUI(): GlobalUIContextValue {
  const ctx = useContext(GlobalUIContext);
  if (!ctx) {
    throw new Error("useGlobalUI must be used within GlobalUIProvider");
  }
  return ctx;
}
