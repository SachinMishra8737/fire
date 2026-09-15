export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
export type AbnormalityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AppPage =
  | 'login'
  | 'dashboard'
  | 'live-monitor'
  | 'events'
  | 'analysis'
  | 'investigation'
  | 'analytics'
  | 'history'
  | 'system';

export interface ContextPillar {
  title: string;
  description: string;
  status: 'verified' | 'caution' | 'inconclusive';
  tag: string;
  metric?: string;
  subDetail?: string;
}

export interface SpatialContextData {
  distanceKm: number;
  bufferRadiusKm: number;
  nearbyFacilitiesCount: number;
  landUseClassification: string;
  facilityName?: string;
}

export interface ThermalEvent {
  id: string; // e.g. 'EVT-1042'
  legacyId?: string; // e.g. 'Event 02'
  name: string;
  region: string;
  state: string;
  lat: number;
  lng: number;
  mapX: number; // percentage on India map
  mapY: number; // percentage on India map
  frpMw: number; // Fire Radiative Power in MegaWatts
  brightnessTempK: number; // Kelvin
  detectionTimeUtc: string;
  detectionTimeIst?: string;
  sensor: string;
  abnormality: AbnormalityLevel;
  abnormalityScore: number; // 0 - 100
  likelySource: string;
  investigationPriority: PriorityLevel;
  priorityScore: number; // 0 - 100
  confidence: number; // 0 - 1.0
  insufficientEvidence?: boolean;
  message?: string;
  evidence: string[];
  spatialContext: SpatialContextData;
  sourceProbabilities: {
    industrial: number;
    agricultural: number;
    vegetation: number;
    other: number;
  };
  contextCards: {
    localHistory: ContextPillar;
    eventBehaviour: ContextPillar;
    infrastructure: ContextPillar;
    regionalContext: ContextPillar;
  };
}

export interface AnalysisResponse {
  event_id: string;
  abnormality: string;
  abnormality_score: number;
  source: string;
  source_probabilities: {
    industrial: number;
    agricultural: number;
    vegetation: number;
    other: number;
  };
  priority: string;
  priority_score: number;
  confidence: number;
  evidence: string[];
  insufficient_evidence?: boolean;
  message?: string;
  recommendation?: string;
  analysis_timestamp?: string;
  processing_latency_ms?: number;
}

export interface InvestigationCase {
  caseId: string; // e.g. 'INV-2026-1042'
  eventId: string; // e.g. 'EVT-1042'
  eventName: string;
  location: string;
  state: string;
  priority: PriorityLevel;
  score: number;
  status: 'QUEUED' | 'INVESTIGATING' | 'FIELD_REQUESTED' | 'RESOLVED';
  assignedOfficer: string;
  createdAt: string;
  evidence: string[];
  notes: Array<{
    id: string;
    author: string;
    timestamp: string;
    text: string;
  }>;
}

export interface HistoricalDayRecord {
  date: string;
  eventsCount: number;
  highCount: number;
  criticalCount: number;
  statusSummary: string;
}
