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
    analytics: "Ledger",
    settings: "Pengaturan",
    help: "Bantuan",
    logout: "Keluar",
    addDevice: "Tambah Perangkat",
    logicBuilder: "Logic Builder",
    simulation: "Simulasi",
    commandCenter: "Pusat Komando",
    historicalLedger: "Buku Besar Historis",
    historicalLedgerDesc:
      "Tabel data dari API ledger. Grafik realtime ada di Dashboard.",
    export: "EKSPOR",
    exportCsv: "EKSPOR CSV",
    refresh: "SEGARKAN",
    dataStreamLedger: "Ledger Aliran Data",
    searchNodeId: "Cari nama perangkat...",
    searchDeviceName: "Cari nama perangkat...",
    deviceName: "Nama Perangkat",
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
    offline: "Offline",
    precisionTelemetry: "Telemetri Presisi",
    precisionTelemetryDesc:
      "KPI live + grafik multi-garis (30 titik terakhir). Data spreadsheet ada di Ledger.",
    openSpreadsheetLedger: "BUKA LEDGER SPREADSHEET",
    kineticStreams: "Aliran Sensor Kinetik",
    kineticStreamsDesc:
      "4 panel terpisah · pH · TDS · Kekeruhan · Suhu · masing-masing skala sendiri",
    processing: "Memproses...",
    delete: "Hapus",
    deleteRowConfirm: "Hapus baris telemetri ini?",
    deleteOk: "Baris dihapus",
    deleteFail: "Gagal menghapus",
    noLedgerRows:
      "Belum ada data ledger — kirim telemetri ESP32 atau gunakan Simulasi.",
    pageOf: "Halaman",
    rows: "baris",
    timestamp: "Waktu",
    status: "Status",
    actions: "Aksi",
    filterAll: "SEMUA",
    filterBaik: "BAIK",
    filterCukup: "CUKUP",
    filterAlert: "ALERT",
    spreadsheetView: "TAMPILAN SPREADSHEET",
    devicesDesc: "Daftarkan perangkat, salin API key, pantau kesehatan armada.",
    deviceNamePlaceholder: "Nama perangkat (contoh: kambangiwak)",
    noSite: "Tanpa situs",
    generateKey: "GENERATE KEY",
    copyOnce: "SALIN SEKALI — SIMPAN AMAN",
    copyClipboard: "Salin ke clipboard",
    total: "TOTAL",
    errorStatus: "ERROR",
    lastPing: "PING TERAKHIR",
    latency: "LATENSI",
    apiKey: "API KEY",
    ping: "Ping",
    rotate: "Rotate",
    revoke: "Revoke",
    noDevicesYet: "Belum ada perangkat. Daftarkan node pertama di atas.",
    sessionExpired: "Sesi berakhir — silakan login ulang.",
    logicBuilderDesc:
      "Susun otomasi IF/THEN langkah demi langkah. Simpan draf, uji dry-run, lalu publish ke live.",
    saveDraft: "SIMPAN DRAF",
    publishLive: "PUBLISH LIVE",
    dryRunTest: "UJI DRY-RUN",
    publishLiveHint:
      "Publish Live mengaktifkan workflow untuk armada. Pastikan dry-run sukses dulu.",
    dryRunHint:
      "Dry-run menjalankan graf dengan input uji di kanan — tanpa mengubah perangkat nyata.",
    testInputs: "INPUT UJI",
    library: "PERPUSTAKAAN",
    remove: "Hapus",
    step: "LANGKAH",
    workflowName: "Nama workflow",
    dryRunResult: "HASIL DRY-RUN",
    simulationDesc: "LCD ESP32 virtual 16x2 + bangku sensor",
    selectDevice: "Pilih perangkat",
    deviceNameLabel: "Nama Perangkat",
    noDeviceSelect: "Daftarkan perangkat dulu di menu Perangkat",
    left: "◀ KIRI",
    right: "KANAN ▶",
    toggleSensors: "TOGGLE SENSOR",
    refreshLcd: "SEGARKAN LCD",
    nominalSample: "SAMPEL NOMINAL",
    alertSample: "SAMPEL ALERT",
    settingsDesc:
      "Konfigurasi industri: situs lapangan, alert, jejak audit, dan kesehatan platform.",
    tabSites: "SITUS",
    tabAlerts: "ALERT",
    tabAudit: "AUDIT",
    tabHealth: "KESEHATAN",
    siteName: "Nama situs",
    region: "Wilayah",
    addSite: "TAMBAH SITUS",
    severity: "SEVERITAS",
    message: "PESAN",
    time: "WAKTU",
    ack: "Ack",
    noAlerts: "Belum ada alert",
    action: "AKSI",
    entity: "ENTITAS",
    refreshProbe: "SEGARKAN PROBE",
    helpDesc:
      "Pusat bantuan operator DATAVLOW.ID — pairing, data, dan troubleshooting.",
    helpPairingTitle: "Panduan Pairing Perangkat",
    helpDataTitle: "Tampilan Data & Dashboard",
    helpFuzzyTitle: "Mesin Fuzzy Mamdani",
    helpTroubleshootTitle: "Troubleshooting",
    activeDevice: "Perangkat aktif",
    unknownDevice: "Perangkat tidak dikenal",
    notifications: "Notifikasi",
    noNotifications: "Tidak ada alert terbuka",
    viewAllAlerts: "Lihat semua",
    profile: "Profil",
  },
  EN: {
    dashboard: "Dashboard",
    network: "Network",
    devices: "Devices",
    analytics: "Ledger",
    settings: "Settings",
    help: "Help",
    logout: "Logout",
    addDevice: "Add Device",
    logicBuilder: "Logic Builder",
    simulation: "Simulation",
    commandCenter: "Command Center",
    historicalLedger: "Historical Ledger",
    historicalLedgerDesc:
      "Table data from the ledger API. Realtime charts live on the Dashboard.",
    export: "EXPORT",
    exportCsv: "EXPORT CSV",
    refresh: "REFRESH",
    dataStreamLedger: "Data Stream Ledger",
    searchNodeId: "Search device name...",
    searchDeviceName: "Search device name...",
    deviceName: "Device Name",
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
    offline: "Offline",
    precisionTelemetry: "Precision Telemetry",
    precisionTelemetryDesc:
      "Live KPI + multi-line chart (last 30 points). Spreadsheet data is on Ledger.",
    openSpreadsheetLedger: "OPEN SPREADSHEET LEDGER",
    kineticStreams: "Kinetic Sensor Streams",
    kineticStreamsDesc:
      "4 separate panels · pH · TDS · Turbidity · Temp · independent scales",
    processing: "Processing...",
    delete: "Delete",
    deleteRowConfirm: "Delete this telemetry row?",
    deleteOk: "Row deleted",
    deleteFail: "Delete failed",
    noLedgerRows:
      "No ledger rows yet — send ESP32 telemetry or use Simulation.",
    pageOf: "Page",
    rows: "rows",
    timestamp: "Timestamp",
    status: "Status",
    actions: "Actions",
    filterAll: "ALL",
    filterBaik: "GOOD",
    filterCukup: "FAIR",
    filterAlert: "ALERT",
    spreadsheetView: "SPREADSHEET LEDGER VIEW",
    devicesDesc: "Register devices, copy API keys, ping fleet health.",
    deviceNamePlaceholder: "Device name (e.g. kambangiwak)",
    noSite: "No site",
    generateKey: "GENERATE KEY",
    copyOnce: "COPY ONCE — STORE SECURELY",
    copyClipboard: "Copy to clipboard",
    total: "TOTAL",
    errorStatus: "ERROR",
    lastPing: "LAST PING",
    latency: "LATENCY",
    apiKey: "API KEY",
    ping: "Ping",
    rotate: "Rotate",
    revoke: "Revoke",
    noDevicesYet: "No devices yet. Register the first node above.",
    sessionExpired: "Session expired — please sign in again.",
    logicBuilderDesc:
      "Build IF/THEN automation step by step. Save draft, dry-run test, then publish live.",
    saveDraft: "SAVE DRAFT",
    publishLive: "PUBLISH LIVE",
    dryRunTest: "DRY-RUN TEST",
    publishLiveHint:
      "Publish Live activates the workflow for the fleet. Confirm dry-run passes first.",
    dryRunHint:
      "Dry-run executes the graph with the test inputs on the right — no real devices change.",
    testInputs: "TEST INPUTS",
    library: "LIBRARY",
    remove: "Remove",
    step: "STEP",
    workflowName: "Workflow name",
    dryRunResult: "DRY-RUN RESULT",
    simulationDesc: "Virtual ESP32 LCD 16x2 + sensor bench",
    selectDevice: "Select device",
    deviceNameLabel: "Device Name",
    noDeviceSelect: "Register a device first under Devices",
    left: "◀ LEFT",
    right: "RIGHT ▶",
    toggleSensors: "TOGGLE SENSORS",
    refreshLcd: "REFRESH LCD",
    nominalSample: "NOMINAL SAMPLE",
    alertSample: "ALERT SAMPLE",
    settingsDesc:
      "Industrial configuration: field sites, alerts, audit trail, and platform health.",
    tabSites: "SITES",
    tabAlerts: "ALERTS",
    tabAudit: "AUDIT",
    tabHealth: "HEALTH",
    siteName: "Site name",
    region: "Region",
    addSite: "ADD SITE",
    severity: "SEVERITY",
    message: "MESSAGE",
    time: "TIME",
    ack: "Ack",
    noAlerts: "No alerts yet",
    action: "ACTION",
    entity: "ENTITY",
    refreshProbe: "REFRESH PROBE",
    helpDesc:
      "DATAVLOW.ID operator help center — pairing, data views, troubleshooting.",
    helpPairingTitle: "Device Pairing Guide",
    helpDataTitle: "Data Views & Dashboard",
    helpFuzzyTitle: "Fuzzy Mamdani Engine",
    helpTroubleshootTitle: "Troubleshooting",
    activeDevice: "Active device",
    unknownDevice: "Unknown device",
    notifications: "Notifications",
    noNotifications: "No open alerts",
    viewAllAlerts: "View all",
    profile: "Profile",
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
