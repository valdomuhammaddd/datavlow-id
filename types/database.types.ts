export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type DeviceStatus = "online" | "offline" | "error" | "maintenance";

export type WaterStatus = "Baik" | "Cukup Baik" | "Tidak Baik";

export type WorkflowStatus = "draft" | "live" | "archived";

export type OperatorRole = "admin" | "operator" | "viewer";

export type AlertSeverity = "info" | "warning" | "critical";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: OperatorRole;
  created_at: string;
};

export type ProfileInsert = {
  id: string;
  email?: string | null;
  display_name?: string | null;
  role?: OperatorRole;
  created_at?: string;
};

export type ProfileUpdate = {
  id?: string;
  email?: string | null;
  display_name?: string | null;
  role?: OperatorRole;
  created_at?: string;
};

export type Site = {
  id: string;
  name: string;
  region: string;
  created_at: string;
};

export type SiteInsert = {
  id?: string;
  name: string;
  region?: string;
  created_at?: string;
};

export type SiteUpdate = {
  id?: string;
  name?: string;
  region?: string;
  created_at?: string;
};

export type Device = {
  id: string;
  api_key: string;
  name: string;
  status: DeviceStatus;
  last_ping: string | null;
  latency_ms: number | null;
  health: string | null;
  site_id: string | null;
  revoked_at: string | null;
  notes: string | null;
};

export type DeviceInsert = {
  id?: string;
  api_key: string;
  name: string;
  status?: DeviceStatus;
  last_ping?: string | null;
  latency_ms?: number | null;
  health?: string | null;
  site_id?: string | null;
  revoked_at?: string | null;
  notes?: string | null;
};

export type DeviceUpdate = {
  id?: string;
  api_key?: string;
  name?: string;
  status?: DeviceStatus;
  last_ping?: string | null;
  latency_ms?: number | null;
  health?: string | null;
  site_id?: string | null;
  revoked_at?: string | null;
  notes?: string | null;
};

export type TelemetryLog = {
  id: number;
  device_id: string;
  ph: number | null;
  tds: number | null;
  turbidity: number | null;
  temp: number | null;
  crisp_score: number | null;
  water_status: WaterStatus | null;
  action_message: string | null;
  created_at: string;
};

export type TelemetryLogInsert = {
  id?: number;
  device_id: string;
  ph?: number | null;
  tds?: number | null;
  turbidity?: number | null;
  temp?: number | null;
  crisp_score?: number | null;
  water_status?: WaterStatus | null;
  action_message?: string | null;
  created_at?: string;
};

export type TelemetryLogUpdate = {
  id?: number;
  device_id?: string;
  ph?: number | null;
  tds?: number | null;
  turbidity?: number | null;
  temp?: number | null;
  crisp_score?: number | null;
  water_status?: WaterStatus | null;
  action_message?: string | null;
  created_at?: string;
};

export type WorkflowRow = {
  id: string;
  name: string;
  status: WorkflowStatus;
  definition: Json;
  version: number;
  created_at: string;
  updated_at: string;
};

export type WorkflowInsert = {
  id?: string;
  name: string;
  status?: WorkflowStatus;
  definition?: Json;
  version?: number;
  created_at?: string;
  updated_at?: string;
};

export type WorkflowUpdate = {
  id?: string;
  name?: string;
  status?: WorkflowStatus;
  definition?: Json;
  version?: number;
  created_at?: string;
  updated_at?: string;
};

export type SimulationHardware = {
  device_id: string;
  ph: number;
  tds: number;
  turbidity: number;
  temp: number;
  sensors_enabled: boolean;
  lcd_line1: string;
  lcd_line2: string;
  last_button: string | null;
  water_status: string | null;
  crisp_score: number | null;
  action_message: string | null;
  uptime_seconds: number;
  rssi: number;
  voltage: number;
  updated_at: string;
};

export type SimulationHardwareInsert = {
  device_id: string;
  ph?: number;
  tds?: number;
  turbidity?: number;
  temp?: number;
  sensors_enabled?: boolean;
  lcd_line1?: string;
  lcd_line2?: string;
  last_button?: string | null;
  water_status?: string | null;
  crisp_score?: number | null;
  action_message?: string | null;
  uptime_seconds?: number;
  rssi?: number;
  voltage?: number;
  updated_at?: string;
};

export type SimulationHardwareUpdate = {
  device_id?: string;
  ph?: number;
  tds?: number;
  turbidity?: number;
  temp?: number;
  sensors_enabled?: boolean;
  lcd_line1?: string;
  lcd_line2?: string;
  last_button?: string | null;
  water_status?: string | null;
  crisp_score?: number | null;
  action_message?: string | null;
  uptime_seconds?: number;
  rssi?: number;
  voltage?: number;
  updated_at?: string;
};

export type AuditLog = {
  id: number;
  actor_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  meta: Json;
  created_at: string;
};

export type AuditLogInsert = {
  id?: number;
  actor_id?: string | null;
  action: string;
  entity: string;
  entity_id?: string | null;
  meta?: Json;
  created_at?: string;
};

export type AuditLogUpdate = {
  id?: number;
  actor_id?: string | null;
  action?: string;
  entity?: string;
  entity_id?: string | null;
  meta?: Json;
  created_at?: string;
};

export type AlertEvent = {
  id: number;
  device_id: string | null;
  severity: AlertSeverity;
  water_status: string | null;
  message: string;
  acknowledged: boolean;
  created_at: string;
};

export type AlertEventInsert = {
  id?: number;
  device_id?: string | null;
  severity: AlertSeverity;
  water_status?: string | null;
  message: string;
  acknowledged?: boolean;
  created_at?: string;
};

export type AlertEventUpdate = {
  id?: number;
  device_id?: string | null;
  severity?: AlertSeverity;
  water_status?: string | null;
  message?: string;
  acknowledged?: boolean;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      sites: {
        Row: Site;
        Insert: SiteInsert;
        Update: SiteUpdate;
        Relationships: [];
      };
      devices: {
        Row: Device;
        Insert: DeviceInsert;
        Update: DeviceUpdate;
        Relationships: [];
      };
      telemetry_logs: {
        Row: TelemetryLog;
        Insert: TelemetryLogInsert;
        Update: TelemetryLogUpdate;
        Relationships: [
          {
            foreignKeyName: "telemetry_logs_device_id_fkey";
            columns: ["device_id"];
            isOneToOne: false;
            referencedRelation: "devices";
            referencedColumns: ["api_key"];
          },
        ];
      };
      workflows: {
        Row: WorkflowRow;
        Insert: WorkflowInsert;
        Update: WorkflowUpdate;
        Relationships: [];
      };
      simulation_hardware: {
        Row: SimulationHardware;
        Insert: SimulationHardwareInsert;
        Update: SimulationHardwareUpdate;
        Relationships: [];
      };
      audit_logs: {
        Row: AuditLog;
        Insert: AuditLogInsert;
        Update: AuditLogUpdate;
        Relationships: [];
      };
      alert_events: {
        Row: AlertEvent;
        Insert: AlertEventInsert;
        Update: AlertEventUpdate;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      purge_old_telemetry_logs: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      mark_stale_devices: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      ingest_telemetry: {
        Args: {
          p_api_key: string;
          p_ph: number;
          p_tds: number;
          p_turbidity: number;
          p_temp: number;
          p_crisp_score?: number | null;
          p_water_status?: string | null;
          p_action_message?: string | null;
          p_created_at?: string | null;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
