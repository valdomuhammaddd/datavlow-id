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

export interface Device {
  id: string;
  api_key: string;
  name: string;
  status: DeviceStatus;
  last_ping: string | null;
  latency_ms?: number | null;
  health?: string | null;
}

export interface DeviceInsert {
  id?: string;
  api_key: string;
  name: string;
  status?: DeviceStatus;
  last_ping?: string | null;
  latency_ms?: number | null;
  health?: string | null;
}

export interface DeviceUpdate {
  id?: string;
  api_key?: string;
  name?: string;
  status?: DeviceStatus;
  last_ping?: string | null;
  latency_ms?: number | null;
  health?: string | null;
}

export interface TelemetryLog {
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
}

export interface TelemetryLogInsert {
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
}

export interface TelemetryLogUpdate {
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
}

export interface WorkflowRow {
  id: string;
  name: string;
  status: WorkflowStatus;
  definition: Json;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowInsert {
  id?: string;
  name: string;
  status?: WorkflowStatus;
  definition?: Json;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface WorkflowUpdate {
  id?: string;
  name?: string;
  status?: WorkflowStatus;
  definition?: Json;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SimulationHardware {
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
}

export interface SimulationHardwareInsert {
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
}

export interface SimulationHardwareUpdate {
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
}

export interface Database {
  public: {
    Tables: {
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
    };
    Views: Record<string, never>;
    Functions: {
      purge_old_telemetry_logs: {
        Args: Record<string, never>;
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
      device_status: DeviceStatus;
      water_status: WaterStatus;
      workflow_status: WorkflowStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
