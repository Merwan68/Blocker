import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Globe2, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  ExternalLink,
  Flame,
  Zap,
  Sliders
} from 'lucide-react';
import { BlockerState, BlockEventLog } from '../types';

interface DashboardOverviewProps {
  state: BlockerState;
  logs: BlockEventLog[];
  onToggleProtection: () => void;
  onToggleWebProtection: () => void;
  onToggleAppProtection: () => void;
  onNavigateToTester: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  state,
  logs,
  onToggleProtection,
  onToggleWebProtection,
  onToggleAppProtection,
  onNavigateToTester
}) => {
  return (
    <div className="space-y-6">
      
      {/* Hero Master Shield Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        state.isProtectionActive
          ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/40 shadow-2xl shadow-emerald-950/20'
          : 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border-rose-500/40 shadow-2xl shadow-rose-950/20'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
              state.isProtectionActive
                ? 'bg-emerald-600/20 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-600/20'
                : 'bg-rose-600/20 border-rose-400 text-rose-400 shadow-lg shadow-rose-600/20'
            }`}>
              {state.isProtectionActive ? (
                <ShieldCheck className="w-10 h-10 animate-pulse" />
              ) : (
                <ShieldAlert className="w-10 h-10" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  state.isProtectionActive ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'
                }`} />
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  AegisBet System Status
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                {state.isProtectionActive ? 'Gambling Protection Active' : 'Protection Paused'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {state.isProtectionActive 
                  ? 'All sportsbooks, online casinos, poker rooms, and gambling apps are blocked.' 
                  : 'Barrier is currently off. Tap to re-enable instant protection.'}
              </p>
            </div>
          </div>

          {/* Master Toggle Button */}
          <div className="flex flex-col sm:items-end w-full sm:w-auto">
            <button
              onClick={onToggleProtection}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                state.isProtectionActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{state.isProtectionActive ? 'Pause Protection' : 'Enable Protection Now'}</span>
            </button>
            <span className="text-[11px] text-slate-400 mt-1.5 self-center sm:self-end">
              One-tap instant activation
            </span>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className={`absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${
          state.isProtectionActive ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />
      </div>

      {/* Digital Wellbeing Streak & Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Gambling-Free Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">21 Days</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">504 consecutive hours free</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Deflected Today</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{state.todayBlocks}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{state.weekBlocks} interventions this week</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Estimated Money Saved</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">${state.moneySavedEstimate.toLocaleString()}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Based on typical wagering volume</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Blockers</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {(1420 + state.customDomains.length).toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{36 + state.customApps.length} apps + 1,420 domains</span>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Engine Toggles + Live Interception Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Protection Layers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Active Protection Engines
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Engine {state.databaseVersion}</span>
            </div>

            {/* Web DNS Sinkhole Toggle */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Web DNS Sinkhole</span>
                  <span className="text-[11px] text-slate-400">
                    Resolves gambling domains to <code className="text-emerald-400">0.0.0.0</code>
                  </span>
                </div>
              </div>
              <button
                onClick={onToggleWebProtection}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  state.webProtectionEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  state.webProtectionEnabled ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* App Package Interceptor Toggle */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Application Interceptor</span>
                  <span className="text-[11px] text-slate-400">
                    Monitors 36+ known betting & casino packages
                  </span>
                </div>
              </div>
              <button
                onClick={onToggleAppProtection}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  state.appProtectionEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  state.appProtectionEnabled ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* SafeSearch & Adult Filter */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Gambling Ad & SafeSearch</span>
                  <span className="text-[11px] text-slate-400">
                    Suppresses gambling affiliates and sponsored bets
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800/60">
                ACTIVE
              </span>
            </div>

            {/* Test Launcher Button */}
            <button
              onClick={onNavigateToTester}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Open Interactive Live Testing Cockpit</span>
            </button>
          </div>

          {/* Wellbeing Support Helpline Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Digital Wellbeing & Support
            </span>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>National Problem Gambling Helpline</span>
              </div>
              <p className="text-slate-300 font-mono text-sm font-semibold">1-800-522-4700</p>
              <p className="text-[11px] text-slate-500">Free, confidential 24/7 support via call or text.</p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>UK Helpline: <strong>0808 8020 133</strong></span>
              <a 
                href="https://www.gamcare.org.uk" 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>GamCare</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Live Deflection Log */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Live Deflection Telemetry
                </span>
                <span className="text-[11px] text-slate-400">
                  Real-time record of prevented gambling requests
                </span>
              </div>
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                {logs.length} Interventions
              </span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
              {logs.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No interventions recorded yet. Use the Interactive Testing Cockpit to simulate gambling traffic.
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center shrink-0">
                        {log.targetType === 'app' ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Globe2 className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-200 block truncate max-w-[200px] sm:max-w-xs">
                          {log.targetName}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span className="font-mono text-slate-300">{log.destination}</span>
                          <span>·</span>
                          <span className="text-rose-400">{log.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50 block">
                        {log.actionTaken}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
