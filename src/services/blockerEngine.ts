import { BlockerState, BlockEventLog, GamblingApp, GamblingDomain } from '../types';
import { INITIAL_GAMBLING_APPS, INITIAL_GAMBLING_DOMAINS, DATABASE_VERSION } from '../data/gamblingDatabase';

const STORAGE_KEY = 'aegisbet_blocker_state_v2';
const LOGS_STORAGE_KEY = 'aegisbet_block_logs_v2';

export function getInitialBlockerState(): BlockerState {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  return {
    isProtectionActive: true, // Active by default!
    webProtectionEnabled: true,
    appProtectionEnabled: true,
    adultContentFilter: true,
    safeSearchEnforced: true,
    protectionStartDate: Date.now() - 21 * 24 * 60 * 60 * 1000, // 21 days active streak
    totalBlocks: 418,
    todayBlocks: 17,
    weekBlocks: 94,
    hoursGamblingFree: 504, // 21 days * 24h
    moneySavedEstimate: 1450, // estimated $ saved by avoiding gambling
    customApps: [],
    customDomains: [],
    databaseVersion: DATABASE_VERSION,
    lastUpdated: Date.now()
  };
}

export function saveBlockerState(state: BlockerState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getSavedLogs(): BlockEventLog[] {
  const saved = localStorage.getItem(LOGS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return [
    {
      id: 'log-1',
      timestamp: Date.now() - 14 * 60 * 1000,
      targetName: 'DraftKings Sportsbook',
      targetType: 'app',
      category: 'Sports Betting',
      destination: 'com.draftkings.sportsbook',
      actionTaken: 'Window Intercepted'
    },
    {
      id: 'log-2',
      timestamp: Date.now() - 85 * 60 * 1000,
      targetName: 'Stake Crypto Casino',
      targetType: 'website',
      category: 'Crypto Gambling',
      destination: 'stake.com',
      actionTaken: 'Sinkholed (0.0.0.0)'
    },
    {
      id: 'log-3',
      timestamp: Date.now() - 210 * 60 * 1000,
      targetName: 'Bovada Sports & Casino',
      targetType: 'website',
      category: 'Online Casino',
      destination: 'bovada.lv',
      actionTaken: 'Sinkholed (0.0.0.0)'
    }
  ];
}

export function saveLogs(logs: BlockEventLog[]): void {
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs.slice(0, 100)));
}

// Clean and normalize domain name
export function normalizeDomain(input: string): string {
  let cleaned = input.trim().toLowerCase();
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '');
  cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0];
  return cleaned;
}

// Match domain against active blocklist
export function isDomainBlocked(
  domain: string,
  state: BlockerState,
  activeDomains: GamblingDomain[]
): { isBlocked: boolean; matchedItem?: GamblingDomain } {
  if (!state.isProtectionActive || !state.webProtectionEnabled) {
    return { isBlocked: false };
  }

  const clean = normalizeDomain(domain);
  const allDomains = [...activeDomains, ...state.customDomains];

  for (const item of allDomains) {
    if (!item.isEnabled) continue;
    const target = normalizeDomain(item.domain);
    if (clean === target || clean.endsWith('.' + target)) {
      return { isBlocked: true, matchedItem: item };
    }
  }

  return { isBlocked: false };
}

// Match app package against active blocklist
export function isAppBlocked(
  packageId: string,
  state: BlockerState,
  activeApps: GamblingApp[]
): { isBlocked: boolean; matchedApp?: GamblingApp } {
  if (!state.isProtectionActive || !state.appProtectionEnabled) {
    return { isBlocked: false };
  }

  const clean = packageId.trim().toLowerCase();
  const allApps = [...activeApps, ...state.customApps];

  for (const app of allApps) {
    if (!app.isEnabled) continue;
    if (clean === app.packageId.toLowerCase()) {
      return { isBlocked: true, matchedApp: app };
    }
  }

  return { isBlocked: false };
}
