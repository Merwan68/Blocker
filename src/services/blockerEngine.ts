import { BlockerState, BlockEventLog, GamblingApp, GamblingDomain } from '../types';
import { INITIAL_GAMBLING_APPS, INITIAL_GAMBLING_DOMAINS, DATABASE_VERSION } from '../data/gamblingDatabase';

const STORAGE_KEY = 'aegisbet_blocker_state_et_v3';
const LOGS_STORAGE_KEY = 'aegisbet_block_logs_et_v3';

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
    isProtectionActive: true, // Active by default
    webProtectionEnabled: true,
    appProtectionEnabled: true,
    ethiopianShieldActive: true, // Dedicated Ethiopian betting filter
    telebirrBettingBlockEnabled: true, // Telebirr / CBE Birr deposit protection
    adultContentFilter: true,
    safeSearchEnforced: true,
    protectionStartDate: Date.now() - 34 * 24 * 60 * 60 * 1000, // 34 days active streak
    totalBlocks: 624,
    todayBlocks: 28,
    weekBlocks: 142,
    hoursGamblingFree: 816, // 34 days * 24h
    moneySavedEstimateBirr: 85000, // 85,000 ETB estimated money saved
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
      id: 'log-et-1',
      timestamp: Date.now() - 9 * 60 * 1000,
      targetName: 'Vamos Bet Ethiopia (ቫሞስ ቤት)',
      targetType: 'website',
      category: 'Ethiopian Sportsbook',
      destination: 'vamos.bet',
      actionTaken: 'Sinkholed (0.0.0.0)',
      isEthiopian: true
    },
    {
      id: 'log-et-2',
      timestamp: Date.now() - 32 * 60 * 1000,
      targetName: 'HuluSport Betting (ሁሉ ስፖርት)',
      targetType: 'app',
      category: 'Ethiopian Sportsbook',
      destination: 'com.hulusport.betting',
      actionTaken: 'Window Intercepted',
      isEthiopian: true
    },
    {
      id: 'log-et-3',
      timestamp: Date.now() - 78 * 60 * 1000,
      targetName: 'Habesha Bet (ሀበሻ ቤት)',
      targetType: 'website',
      category: 'Ethiopian Sportsbook',
      destination: 'habeshabet.com',
      actionTaken: 'Sinkholed (0.0.0.0)',
      isEthiopian: true
    },
    {
      id: 'log-et-4',
      timestamp: Date.now() - 145 * 60 * 1000,
      targetName: 'Betika Ethiopia (ቤቲካ)',
      targetType: 'website',
      category: 'Ethiopian Sportsbook',
      destination: 'betika.et',
      actionTaken: 'Sinkholed (0.0.0.0)',
      isEthiopian: true
    }
  ];
}

export function saveLogs(logs: BlockEventLog[]): void {
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs.slice(0, 150)));
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

    // Check if Ethiopian filter is explicitly disabled
    if (item.isEthiopian && !state.ethiopianShieldActive) {
      continue;
    }

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

    if (app.isEthiopian && !state.ethiopianShieldActive) {
      continue;
    }

    if (clean === app.packageId.toLowerCase()) {
      return { isBlocked: true, matchedApp: app };
    }
  }

  return { isBlocked: false };
}
