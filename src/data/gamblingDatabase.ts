import { GamblingApp, GamblingDomain } from '../types';

export const DATABASE_VERSION = 'v2026.09.29-live';
export const TOTAL_SYSTEM_DOMAINS = 1420;
export const TOTAL_SYSTEM_APPS = 36;

export const INITIAL_GAMBLING_APPS: GamblingApp[] = [
  {
    id: 'app-1',
    name: 'DraftKings Sportsbook & Casino',
    packageId: 'com.draftkings.sportsbook',
    category: 'Sports Betting',
    country: 'United States',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-2',
    name: 'FanDuel Sportsbook',
    packageId: 'com.fanduel.sportsbook',
    category: 'Sports Betting',
    country: 'United States',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-3',
    name: 'BetMGM Sports & Casino',
    packageId: 'com.bwin.mgm',
    category: 'Online Casino',
    country: 'Global',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-4',
    name: 'Bet365 Sportsbook & Live Betting',
    packageId: 'com.bet365.mobile',
    category: 'Sports Betting',
    country: 'Global',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-5',
    name: 'Stake.com Crypto Casino & Sports',
    packageId: 'com.stake.crypto.casino',
    category: 'Crypto Gambling',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-6',
    name: 'PokerStars Real Money Poker',
    packageId: 'com.pyrsoftware.pokerstars',
    category: 'Poker',
    country: 'Global',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-7',
    name: '888casino Real Money Slots',
    packageId: 'com.eighteighteight.casino',
    category: 'Online Casino',
    country: 'Europe / UK',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-8',
    name: 'Caesars Sportsbook',
    packageId: 'com.williamhill.us',
    category: 'Sports Betting',
    country: 'United States',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-9',
    name: '1xBet Official Betting',
    packageId: 'org.xbet.client',
    category: 'Betting Exchange',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-10',
    name: 'Bovada Mobile Sportsbook & Casino',
    packageId: 'lv.bovada.mobile',
    category: 'Online Casino',
    country: 'Americas',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-11',
    name: 'Roobet Crypto Casino & Crash',
    packageId: 'com.roobet.app',
    category: 'Crypto Gambling',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-12',
    name: 'Rollbit Crypto Casino & Trading',
    packageId: 'com.rollbit.mobile',
    category: 'Crypto Gambling',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'app-13',
    name: 'Betfair Sports Betting & Exchange',
    packageId: 'com.betfair.exchange',
    category: 'Betting Exchange',
    country: 'UK / Europe',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-14',
    name: 'Jackpot City Real Slots & Games',
    packageId: 'com.jackpotcity.slots',
    category: 'Slots',
    country: 'International',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-15',
    name: 'Unibet Sports Betting & Racing',
    packageId: 'com.unibet.sportsbook',
    category: 'Sports Betting',
    country: 'Europe',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-16',
    name: 'Jackpocket Lottery Ticket Courier',
    packageId: 'com.jackpocket',
    category: 'Lottery',
    country: 'United States',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-17',
    name: 'Ignition Casino & Poker Real Money',
    packageId: 'com.ignition.poker',
    category: 'Poker',
    country: 'Americas',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'app-18',
    name: 'Betway Sports & Esports Betting',
    packageId: 'com.betway.sports',
    category: 'Sports Betting',
    country: 'Global',
    riskScore: 'High',
    isEnabled: true
  }
];

export const INITIAL_GAMBLING_DOMAINS: GamblingDomain[] = [
  { id: 'dom-1', domain: 'stake.com', category: 'Crypto Gambling', serviceName: 'Stake Crypto Casino', isEnabled: true },
  { id: 'dom-2', domain: 'bet365.com', category: 'Sports Betting', serviceName: 'Bet365 Worldwide', isEnabled: true },
  { id: 'dom-3', domain: 'sportsbook.draftkings.com', category: 'Sports Betting', serviceName: 'DraftKings Sportsbook', isEnabled: true },
  { id: 'dom-4', domain: 'fanduel.com', category: 'Sports Betting', serviceName: 'FanDuel Sportsbook', isEnabled: true },
  { id: 'dom-5', domain: 'bovada.lv', category: 'Online Casino', serviceName: 'Bovada Sports & Casino', isEnabled: true },
  { id: 'dom-6', domain: 'betonline.ag', category: 'Sports Betting', serviceName: 'BetOnline Sportsbook', isEnabled: true },
  { id: 'dom-7', domain: 'pokerstars.com', category: 'Poker', serviceName: 'PokerStars International', isEnabled: true },
  { id: 'dom-8', domain: '888casino.com', category: 'Online Casino', serviceName: '888 Casino & Slots', isEnabled: true },
  { id: 'dom-9', domain: '1xbet.com', category: 'Sports Betting', serviceName: '1xBet Global Betting', isEnabled: true },
  { id: 'dom-10', domain: 'roobet.com', category: 'Crypto Gambling', serviceName: 'Roobet Casino', isEnabled: true },
  { id: 'dom-11', domain: 'rollbit.com', category: 'Crypto Gambling', serviceName: 'Rollbit NFT & Casino', isEnabled: true },
  { id: 'dom-12', domain: 'williamhill.com', category: 'Sports Betting', serviceName: 'William Hill Bookmakers', isEnabled: true },
  { id: 'dom-13', domain: 'caesars.com/sportsbook', category: 'Sports Betting', serviceName: 'Caesars Sportsbook', isEnabled: true },
  { id: 'dom-14', domain: 'ggpoker.com', category: 'Poker', serviceName: 'GGPoker World Poker', isEnabled: true },
  { id: 'dom-15', domain: 'jackpotjoy.com', category: 'Online Casino', serviceName: 'JackpotJoy Bingo & Slots', isEnabled: true },
  { id: 'dom-16', domain: 'partypoker.com', category: 'Poker', serviceName: 'PartyPoker Online', isEnabled: true },
  { id: 'dom-17', domain: 'lotterypost.com', category: 'Lottery', serviceName: 'Lottery Results & Games', isEnabled: true },
  { id: 'dom-18', domain: 'betfair.com', category: 'Betting Exchange', serviceName: 'Betfair Exchange', isEnabled: true },
  { id: 'dom-19', domain: 'bwin.com', category: 'Sports Betting', serviceName: 'Bwin Sports & Poker', isEnabled: true },
  { id: 'dom-20', domain: 'ladbrokes.com', category: 'Sports Betting', serviceName: 'Ladbrokes Coral Group', isEnabled: true },
  { id: 'dom-21', domain: 'mybookie.ag', category: 'Sports Betting', serviceName: 'MyBookie Sportsbook', isEnabled: true },
  { id: 'dom-22', domain: 'ignitioncasino.eu', category: 'Online Casino', serviceName: 'Ignition Casino & Poker', isEnabled: true },
  { id: 'dom-23', domain: 'skybet.com', category: 'Sports Betting', serviceName: 'Sky Bet UK', isEnabled: true },
  { id: 'dom-24', domain: 'paddypower.com', category: 'Sports Betting', serviceName: 'Paddy Power Sports', isEnabled: true },
  { id: 'dom-25', domain: 'chumba-casino.com', category: 'Online Casino', serviceName: 'Chumba Social Casino', isEnabled: true },
  { id: 'dom-26', domain: 'pulsz.com', category: 'Slots', serviceName: 'Pulsz Slots & Casino', isEnabled: true },
  { id: 'dom-27', domain: 'casinomeister.com', category: 'Online Casino', serviceName: 'Casino Portal', isEnabled: true },
  { id: 'dom-28', domain: 'sportsbet.com.au', category: 'Sports Betting', serviceName: 'Sportsbet Australia', isEnabled: true },
  { id: 'dom-29', domain: 'gambleaware.org/redirect', category: 'Betting Exchange', serviceName: 'Betting Links', isEnabled: true },
  { id: 'dom-30', domain: 'betway.com', category: 'Sports Betting', serviceName: 'Betway Global', isEnabled: true }
];
