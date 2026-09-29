export type ProtectionCategory = 
  | 'Sports Betting'
  | 'Online Casino'
  | 'Poker'
  | 'Lottery'
  | 'Slots'
  | 'Crypto Gambling'
  | 'Betting Exchange'
  | 'Ethiopian Sportsbook';

export interface GamblingApp {
  id: string;
  name: string;
  packageId: string;
  category: ProtectionCategory;
  country: string;
  isEthiopian?: boolean;
  riskScore: 'High' | 'Critical';
  isEnabled: boolean;
  isCustom?: boolean;
  amharicName?: string;
}

export interface GamblingDomain {
  id: string;
  domain: string;
  category: ProtectionCategory;
  serviceName: string;
  isEthiopian?: boolean;
  isEnabled: boolean;
  isCustom?: boolean;
  telebirrBlockEnabled?: boolean;
}

export interface BlockerState {
  isProtectionActive: boolean;
  webProtectionEnabled: boolean;
  appProtectionEnabled: boolean;
  ethiopianShieldActive: boolean;
  telebirrBettingBlockEnabled: boolean;
  adultContentFilter: boolean;
  safeSearchEnforced: boolean;
  protectionStartDate: number;
  totalBlocks: number;
  todayBlocks: number;
  weekBlocks: number;
  hoursGamblingFree: number;
  moneySavedEstimateBirr: number;
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
  isEthiopian?: boolean;
}
