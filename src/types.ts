export interface TechnicalSpec {
  id: string;
  category: string;
  label: string;
  value: string;
  details: string;
}

export interface ChatMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

export interface Hotspot {
  id: string;
  label: string;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  description: string;
  specLink?: string;
  metric?: string;
}

export interface VehicleLayer {
  id: string;
  name: string;
  title: string;
  scale: number;
  offsetY: number; // base Y position offsets in pixels
  color: string;
  description: string;
  hotspots: Hotspot[];
}

export interface AeroTelemetry {
  flapAngleFrontLeft: number;
  flapAngleFrontRight: number;
  flapAngleRearLeft: number;
  flapAngleRearRight: number;
  downforceKg: number;
  dragCoefficient: number;
  airSpeedKmh: number;
  pitchDeg: number;
  rollDeg: number;
}
