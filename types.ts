
export enum SystemStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  SYNCING = 'SYNCING',
  ERROR = 'ERROR',
  ENFORCING = 'ENFORCING'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'critical';
  message: string;
}

export interface TargetProfile {
  name: string;
  id: string;
  commander: string;
  status: string;
  enforcementLevel: string;
}
