import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  Globe2, 
  Coins, 
  Play, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { BlockerState, ProtectionCategory } from '../types';
import { ETHIOPIAN_GAMBLING_APPS, ETHIOPIAN_GAMBLING_DOMAINS } from '../data/gamblingDatabase';

interface EthiopianShieldViewProps {
  state: BlockerState;
  onToggleEthiopianShield: () => void;
  onToggleTelebirrBlock: () => void;
  onTriggerBlock: (name: string, type: 'app' | 'website', category: ProtectionCategory, destination: string) => void;
}

export const EthiopianShieldView: React.FC<EthiopianShieldViewProps> = ({
  state,
  onToggleEthiopianShield,
  onToggleTelebirrBlock,
  onTriggerBlock
}) => {
  return (
    <div className="space-y-6">
      
      {/* Hero Ethiopian Defense Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-amber-950/40 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950/90 border-2 border-amber-500/60 flex flex-col items-center justify-center shrink-0 shadow-lg text-2xl">
              <span>🇪🇹</span>
              <span className="text-[10px] font-bold text-amber-400 mt-0.5">ETHIOPIA</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                  የኢትዮጵያ ስፖርት ቤቲንግ መከላከያ
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/60">
                  {ETHIOPIAN_GAMBLING_DOMAINS.length} Domains · {ETHIOPIAN_GAMBLING_APPS.length} Apps
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Ethiopian Betting & Gambling Shield
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Blocks all popular Ethiopian sports betting platforms, virtual casino games, lottery portals, and telebirr/CBE Birr wagering gateways on your private device.
              </p>
            </div>
          </div>

          {/* Master Ethiopian Shield Toggle */}
          <div className="flex flex-col sm:items-end w-full md:w-auto">
            <button
              onClick={onToggleEthiopianShield}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                state.ethiopianShieldActive
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{state.ethiopianShieldActive ? 'Ethiopian Shield: ACTIVE' : 'Ethiopian Shield: PAUSED'}</span>
            </button>
            <span className="text-[11px] text-slate-400 mt-1.5 self-center sm:self-end font-mono">
              Auto-Sinkhole 0.0.0.0
            </span>
          </div>

        </div>

        {/* Ambient flag colors glow */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-80 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Specific to Ethiopian Currency (ETB) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Estimated Savings (Ethiopian Birr)</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
              {state.moneySavedEstimateBirr.toLocaleString()} ETB
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Saved by preventing deposits via Telebirr / CBE
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Telebirr & CBE Deposit Guard</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white block">
                {state.telebirrBettingBlockEnabled ? 'ENFORCED' : 'OFF'}
              </span>
              <span className="text-[11px] text-emerald-400">Merchant API sinkholed</span>
            </div>
            <button
              onClick={onToggleTelebirrBlock}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                state.telebirrBettingBlockEnabled ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                state.telebirrBettingBlockEnabled ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Catalogued Ethiopian Providers</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">25+ Bookmakers</span>
            <span className="text-[11px] text-indigo-300 block mt-0.5">
              Vamos, Betika, HuluSport, Habesha, Anbessa...
            </span>
          </div>
        </div>

      </div>

      {/* Quick Interactive Testing for Ethiopian Bookmakers */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Quick Test: Simulate Ethiopian Betting Access
          </span>
          <span className="text-[11px] text-slate-400">Click to verify instant 0.0.0.0 deflection</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {[
            { name: 'Vamos Bet', amharic: 'ቫሞስ ቤት', domain: 'vamos.bet' },
            { name: 'HuluSport', amharic: 'ሁሉ ስፖርት', domain: 'hulusport.et' },
            { name: 'Habesha Bet', amharic: 'ሀበሻ ቤት', domain: 'habeshabet.com' },
            { name: 'Betika ET', amharic: 'ቤቲካ ኢትዮጵያ', domain: 'betika.et' },
            { name: 'HarifSport', amharic: 'ሀሪፍ ስፖርት', domain: 'harifsport.com' },
            { name: 'Anbessa Bet', amharic: 'አንበሳ ቤት', domain: 'anbessabet.com' }
          ].map((item) => (
            <button
              key={item.domain}
              onClick={() => onTriggerBlock(`${item.name} (${item.amharic})`, 'website', 'Ethiopian Sportsbook', item.domain)}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/60 text-left transition-all group"
            >
              <span className="text-xs font-bold text-white block group-hover:text-amber-300 truncate">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-400 block truncate mt-0.5 font-sans">
                {item.amharic}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                Trigger Block &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Directory of Catalogued Ethiopian Betting Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ethiopian Websites */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Blocked Ethiopian Betting Domains ({ETHIOPIAN_GAMBLING_DOMAINS.length})
            </span>
            <span className="text-[10px] font-mono text-emerald-400">DNS Sinkhole 0.0.0.0</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {ETHIOPIAN_GAMBLING_DOMAINS.map((dom) => (
              <div
                key={dom.id}
                className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-white block">{dom.domain}</span>
                  <span className="text-[11px] text-slate-400">{dom.serviceName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50 block">
                    0.0.0.0
                  </span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Telebirr Blocked</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethiopian Apps */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              Blocked Ethiopian Android Apps ({ETHIOPIAN_GAMBLING_APPS.length})
            </span>
            <span className="text-[10px] font-mono text-amber-300">Accessibility Guard</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {ETHIOPIAN_GAMBLING_APPS.map((app) => (
              <div
                key={app.id}
                className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{app.name}</span>
                    <span className="text-[10px] text-amber-400">({app.amharicName})</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{app.packageId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800/50 block">
                    Interception
                  </span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">{app.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Local Support & Wellbeing Helplines in Ethiopia */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <strong className="text-white block">Addis Ababa Addiction & Mental Health Counseling Resources:</strong>
            <span className="text-slate-400">
              Amanuel Mental Specialized Hospital (አማኑኤል ሆስፒታል) Addiction Rehabilitation Unit · Addis Ababa, Ethiopia.
            </span>
          </div>
        </div>
        <span className="text-amber-400 font-bold shrink-0">Confidential Self-Help</span>
      </div>

    </div>
  );
};
