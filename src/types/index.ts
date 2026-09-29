export type ProtectionCategory = 
  | 'Sports Betting'
  | 'Online Casino'
  | 'Poker'
  | 'Lottery'
  | 'Slots'
  | 'Crypto Gambling'
  | 'Betting Exchange';

export interface GamblingApp {
  id: string;
  name: string;
  packageId: string;
  category: ProtectionCategory;
  country: string;
  riskScore: 'High' | 'Critical';
  isEnabled: boolean;
  isCustom?: boolean;
}

export interface GamblingDomain {
  id: string;
  domain: string;
  category: ProtectionCategory;
  serviceName: string;
  isEnabled: boolean;
  isCustom?: boolean;
}

export interface BlockerState {
  isProtectionActive: boolean;
  webProtectionEnabled: boolean;
  appProtectionEnabled: boolean;
  adultContentFilter: boolean;
  safeSearchEnforced: boolean;
  protectionStartDate: number;
  totalBlocks: number;
  todayBlocks: number;
  weekBlocks: number;
  hoursGamblingFree: number;
  moneySavedEstimate: number;
  customApps: GamblingApp[];
  customDomains: GamblingDomain[];
  databaseVersion: string;
  lastUpdated: number;
}

export interface BlockEventLog {
  id: string;
  timestamp: number;
  targetName: string;
  targetType: 'app' | 'website';
  category: ProtectionCategory;
  destination: string;
  actionTaken: 'Sinkholed (0.0.0.0)' | 'Window Intercepted' | 'Access Denied';
}
