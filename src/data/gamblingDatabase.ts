import { GamblingApp, GamblingDomain } from '../types';

export const DATABASE_VERSION = 'v2026.09.29-ethiopia-edition';
export const TOTAL_SYSTEM_DOMAINS = 1540;
export const TOTAL_SYSTEM_APPS = 62;

// Comprehensive Ethiopian Betting Applications
export const ETHIOPIAN_GAMBLING_APPS: GamblingApp[] = [
  {
    id: 'eth-app-1',
    name: 'Vamos Bet Ethiopia',
    amharicName: 'ቫሞስ ቤት',
    packageId: 'com.vamos.bet',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-2',
    name: 'Betika Ethiopia Sports & Virtuals',
    amharicName: 'ቤቲካ ኢትዮጵያ',
    packageId: 'com.betika.app.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-3',
    name: 'HarifSport / HarifBet',
    amharicName: 'ሀሪፍ ስፖርት / ሀሪፍ ቤት',
    packageId: 'com.harifsport.mobile',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-4',
    name: 'Habesha Bet Sportsbook',
    amharicName: 'ሀበሻ ቤት ስፖርት ቤቲንግ',
    packageId: 'com.habeshabet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-5',
    name: 'HuluSport Betting & Live Games',
    amharicName: 'ሁሉ ስፖርት ቤቲንግ',
    packageId: 'com.hulusport.betting',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-6',
    name: 'Anbessa Bet / Lion Bet',
    amharicName: 'አንበሳ ቤት ቤቲንግ',
    packageId: 'com.anbessabet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-7',
    name: 'Winner Bet Ethiopia',
    amharicName: 'ዊነር ቤት',
    packageId: 'com.winnerbet.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-8',
    name: 'Gada Bet / Gada Sport',
    amharicName: 'ገዳ ቤት ስፖርት',
    packageId: 'com.gadabet.mobile',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-9',
    name: 'Ashewa Bet Ethiopia',
    amharicName: 'አሸዋ ቤት',
    packageId: 'com.ashewa.bet',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-10',
    name: 'EthioBet Mobile',
    amharicName: 'ኢትዮ ቤት',
    packageId: 'com.ethiobet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-11',
    name: 'Bravo Bet Ethiopia',
    amharicName: 'ብራቮ ቤት',
    packageId: 'com.bravobet.mobile',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-12',
    name: 'Flash Bet Ethiopia',
    amharicName: 'ፍላሽ ቤት',
    packageId: 'com.flashbet.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-13',
    name: 'Zemen Bet Mobile',
    amharicName: 'ዘመን ቤት',
    packageId: 'com.zemenbet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-14',
    name: 'Bet251 Ethiopia',
    amharicName: 'ቤት 251',
    packageId: 'com.bet251.mobile',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-15',
    name: 'Bunna Bet Mobile',
    amharicName: 'ቡና ቤት ቤቲንግ',
    packageId: 'com.bunnabet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-16',
    name: 'Desta Bet Ethiopia',
    amharicName: 'ደስታ ቤት',
    packageId: 'com.destabet.app',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-17',
    name: 'BetKing Ethiopia',
    amharicName: 'ቤትኪንግ ኢትዮጵያ',
    packageId: 'com.betking.ethiopia',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-18',
    name: 'World Bet Ethiopia',
    amharicName: 'ዎርልድ ቤት',
    packageId: 'com.worldbet.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-19',
    name: 'Galaxy Bet Mobile',
    amharicName: 'ጋላክሲ ቤት',
    packageId: 'com.galaxybet.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia 🇪🇹',
    isEthiopian: true,
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'eth-app-20',
    name: '1xBet Ethiopia (Telebirr & CBE Birr)',
    amharicName: '1xBet ኢትዮጵያ',
    packageId: 'org.xbet.client.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia / Global',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'eth-app-21',
    name: 'Melbet Ethiopia Mobile',
    amharicName: 'መልቤት ኢትዮጵያ',
    packageId: 'com.melbet.client.et',
    category: 'Ethiopian Sportsbook',
    country: 'Ethiopia / Global',
    isEthiopian: true,
    riskScore: 'Critical',
    isEnabled: true
  }
];

// Comprehensive Ethiopian Betting Websites & Domains
export const ETHIOPIAN_GAMBLING_DOMAINS: GamblingDomain[] = [
  { id: 'eth-dom-1', domain: 'vamos.bet', category: 'Ethiopian Sportsbook', serviceName: 'Vamos Bet Ethiopia (ቫሞስ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-2', domain: 'vamosbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Vamos Bet (.et Portal)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-3', domain: 'vamosbet.com', category: 'Ethiopian Sportsbook', serviceName: 'Vamos Bet Global URL', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-4', domain: 'betika.et', category: 'Ethiopian Sportsbook', serviceName: 'Betika Ethiopia (ቤቲካ)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-5', domain: 'et.betika.com', category: 'Ethiopian Sportsbook', serviceName: 'Betika Ethiopia Web', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-6', domain: 'harifsport.com', category: 'Ethiopian Sportsbook', serviceName: 'HarifSport (ሀሪፍ ስፖርት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-7', domain: 'harifsport.et', category: 'Ethiopian Sportsbook', serviceName: 'HarifSport (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-8', domain: 'harifbet.com', category: 'Ethiopian Sportsbook', serviceName: 'HarifBet Online', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-9', domain: 'habeshabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Habesha Bet (ሀበሻ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-10', domain: 'habeshabet.et', category: 'Ethiopian Sportsbook', serviceName: 'Habesha Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-11', domain: 'habeshabets.com', category: 'Ethiopian Sportsbook', serviceName: 'Habesha Bets Mirror', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-12', domain: 'hulusport.et', category: 'Ethiopian Sportsbook', serviceName: 'HuluSport Ethiopia (ሁሉ ስፖርት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-13', domain: 'hulusport.com', category: 'Ethiopian Sportsbook', serviceName: 'HuluSport Global', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-14', domain: 'hulusports.com', category: 'Ethiopian Sportsbook', serviceName: 'HuluSports Alternate', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-15', domain: 'anbessabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Anbessa Bet (አንበሳ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-16', domain: 'anbessabet.et', category: 'Ethiopian Sportsbook', serviceName: 'Anbessa Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-17', domain: 'lionbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Lion Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-18', domain: 'winner.et', category: 'Ethiopian Sportsbook', serviceName: 'Winner Bet Ethiopia (ዊነር)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-19', domain: 'winnerbet.et', category: 'Ethiopian Sportsbook', serviceName: 'WinnerBet Portal', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-20', domain: 'winnerbet.com', category: 'Ethiopian Sportsbook', serviceName: 'WinnerBet Global', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-21', domain: 'gadabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Gada Bet (ገዳ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-22', domain: 'gadabet.et', category: 'Ethiopian Sportsbook', serviceName: 'Gada Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-23', domain: 'ashewa.bet', category: 'Ethiopian Sportsbook', serviceName: 'Ashewa Bet (አሸዋ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-24', domain: 'ashewabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Ashewa Bet Web', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-25', domain: 'ethiobet.et', category: 'Ethiopian Sportsbook', serviceName: 'EthioBet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-26', domain: 'ethiobetting.com', category: 'Ethiopian Sportsbook', serviceName: 'EthioBetting Portal', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-27', domain: 'bravobet.et', category: 'Ethiopian Sportsbook', serviceName: 'Bravo Bet (ብራቮ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-28', domain: 'bravobet.com', category: 'Ethiopian Sportsbook', serviceName: 'Bravo Bet Global', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-29', domain: 'flashbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Flash Bet (ፍላሽ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-30', domain: 'flashbetet.com', category: 'Ethiopian Sportsbook', serviceName: 'FlashBet ET Mirror', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-31', domain: 'zemenbet.com', category: 'Ethiopian Sportsbook', serviceName: 'Zemen Bet (ዘመን ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-32', domain: 'zemenbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Zemen Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-33', domain: 'bet251.com', category: 'Ethiopian Sportsbook', serviceName: 'Bet251 (ቤት 251)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-34', domain: 'bet251.et', category: 'Ethiopian Sportsbook', serviceName: 'Bet251 Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-35', domain: 'bunnabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Bunna Bet (ቡና ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-36', domain: 'bunnabet.et', category: 'Ethiopian Sportsbook', serviceName: 'Bunna Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-37', domain: 'destabet.com', category: 'Ethiopian Sportsbook', serviceName: 'Desta Bet (ደስታ ቤት)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-38', domain: 'destabet.et', category: 'Ethiopian Sportsbook', serviceName: 'Desta Bet (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-39', domain: 'betking.com.et', category: 'Ethiopian Sportsbook', serviceName: 'BetKing Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-40', domain: 'betking.et', category: 'Ethiopian Sportsbook', serviceName: 'BetKing (.et)', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-41', domain: 'worldbet.et', category: 'Ethiopian Sportsbook', serviceName: 'World Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-42', domain: 'worldbet.com.et', category: 'Ethiopian Sportsbook', serviceName: 'WorldBet Mirror', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-43', domain: 'galaxybet.et', category: 'Ethiopian Sportsbook', serviceName: 'Galaxy Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-44', domain: 'bestbet.et', category: 'Ethiopian Sportsbook', serviceName: 'BestBet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-45', domain: 'targetbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Target Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-46', domain: 'topbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Top Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-47', domain: 'gbet.et', category: 'Ethiopian Sportsbook', serviceName: 'G-Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-48', domain: 'goldenbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Golden Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-49', domain: '1xbet.et', category: 'Ethiopian Sportsbook', serviceName: '1xBet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-50', domain: 'et.1xbet.com', category: 'Ethiopian Sportsbook', serviceName: '1xBet Ethiopia Portal', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-51', domain: 'melbet.et', category: 'Ethiopian Sportsbook', serviceName: 'Melbet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-52', domain: '22bet.et', category: 'Ethiopian Sportsbook', serviceName: '22Bet Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-53', domain: 'betwinner.et', category: 'Ethiopian Sportsbook', serviceName: 'Betwinner Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true },
  { id: 'eth-dom-54', domain: 'megapari.et', category: 'Ethiopian Sportsbook', serviceName: 'MegaPari Ethiopia', isEthiopian: true, isEnabled: true, telebirrBlockEnabled: true }
];

// International Gambling Apps
export const INTERNATIONAL_GAMBLING_APPS: GamblingApp[] = [
  {
    id: 'intl-app-1',
    name: 'DraftKings Sportsbook & Casino',
    packageId: 'com.draftkings.sportsbook',
    category: 'Sports Betting',
    country: 'United States',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-2',
    name: 'FanDuel Sportsbook',
    packageId: 'com.fanduel.sportsbook',
    category: 'Sports Betting',
    country: 'United States',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-3',
    name: 'BetMGM Sports & Casino',
    packageId: 'com.bwin.mgm',
    category: 'Online Casino',
    country: 'Global',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-4',
    name: 'Bet365 Sportsbook',
    packageId: 'com.bet365.mobile',
    category: 'Sports Betting',
    country: 'Global',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-5',
    name: 'Stake.com Crypto Casino',
    packageId: 'com.stake.crypto.casino',
    category: 'Crypto Gambling',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-6',
    name: 'PokerStars Real Money',
    packageId: 'com.pyrsoftware.pokerstars',
    category: 'Poker',
    country: 'Global',
    riskScore: 'High',
    isEnabled: true
  },
  {
    id: 'intl-app-7',
    name: '888casino Real Money',
    packageId: 'com.eighteighteight.casino',
    category: 'Online Casino',
    country: 'Europe / UK',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-8',
    name: 'Bovada Mobile Sports & Casino',
    packageId: 'lv.bovada.mobile',
    category: 'Online Casino',
    country: 'Americas',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-9',
    name: 'Roobet Crypto Casino',
    packageId: 'com.roobet.app',
    category: 'Crypto Gambling',
    country: 'International',
    riskScore: 'Critical',
    isEnabled: true
  },
  {
    id: 'intl-app-10',
    name: 'Betfair Exchange',
    packageId: 'com.betfair.exchange',
    category: 'Betting Exchange',
    country: 'UK / Europe',
    riskScore: 'High',
    isEnabled: true
  }
];

// International Gambling Domains
export const INTERNATIONAL_GAMBLING_DOMAINS: GamblingDomain[] = [
  { id: 'intl-dom-1', domain: 'stake.com', category: 'Crypto Gambling', serviceName: 'Stake Crypto Casino', isEnabled: true },
  { id: 'intl-dom-2', domain: 'bet365.com', category: 'Sports Betting', serviceName: 'Bet365 Worldwide', isEnabled: true },
  { id: 'intl-dom-3', domain: 'sportsbook.draftkings.com', category: 'Sports Betting', serviceName: 'DraftKings Sportsbook', isEnabled: true },
  { id: 'intl-dom-4', domain: 'fanduel.com', category: 'Sports Betting', serviceName: 'FanDuel Sportsbook', isEnabled: true },
  { id: 'intl-dom-5', domain: 'bovada.lv', category: 'Online Casino', serviceName: 'Bovada Sports & Casino', isEnabled: true },
  { id: 'intl-dom-6', domain: 'betonline.ag', category: 'Sports Betting', serviceName: 'BetOnline Sportsbook', isEnabled: true },
  { id: 'intl-dom-7', domain: 'pokerstars.com', category: 'Poker', serviceName: 'PokerStars International', isEnabled: true },
  { id: 'intl-dom-8', domain: '888casino.com', category: 'Online Casino', serviceName: '888 Casino & Slots', isEnabled: true },
  { id: 'intl-dom-9', domain: 'roobet.com', category: 'Crypto Gambling', serviceName: 'Roobet Casino', isEnabled: true },
  { id: 'intl-dom-10', domain: 'rollbit.com', category: 'Crypto Gambling', serviceName: 'Rollbit Crypto Casino', isEnabled: true }
];

// Combined list: Ethiopian apps prioritized first
export const INITIAL_GAMBLING_APPS: GamblingApp[] = [
  ...ETHIOPIAN_GAMBLING_APPS,
  ...INTERNATIONAL_GAMBLING_APPS
];

export const INITIAL_GAMBLING_DOMAINS: GamblingDomain[] = [
  ...ETHIOPIAN_GAMBLING_DOMAINS,
  ...INTERNATIONAL_GAMBLING_DOMAINS
];
