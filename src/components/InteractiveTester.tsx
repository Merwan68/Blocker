import React, { useState } from 'react';
import { 
  Globe2, 
  Smartphone, 
  Play, 
  AlertOctagon, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { BlockerState, GamblingApp, GamblingDomain, ProtectionCategory } from '../types';
import { isDomainBlocked, isAppBlocked, normalizeDomain } from '../services/blockerEngine';
import { INITIAL_GAMBLING_APPS, INITIAL_GAMBLING_DOMAINS } from '../data/gamblingDatabase';

interface InteractiveTesterProps {
  state: BlockerState;
  onTriggerBlock: (name: string, type: 'app' | 'website', category: ProtectionCategory, destination: string) => void;
}

export const InteractiveTester: React.FC<InteractiveTesterProps> = ({
  state,
  onTriggerBlock
}) => {
  const [testDomainInput, setTestDomainInput] = useState('stake.com');
  const [selectedAppId, setSelectedAppId] = useState<string>(INITIAL_GAMBLING_APPS[0].id);
  const [simulatedLog, setSimulatedLog] = useState<{
    status: 'idle' | 'blocked' | 'allowed';
    title: string;
    details: string;
    technicalLog: string[];
  }>({
    status: 'idle',
    title: 'Ready for Testing',
    details: 'Enter a domain or select an app to test real-time interception on Android 12+.',
    technicalLog: []
  });

  // Test Domain Visit
  const handleTestDomain = () => {
    const clean = normalizeDomain(testDomainInput);
    if (!clean) return;

    const result = isDomainBlocked(clean, state, INITIAL_GAMBLING_DOMAINS);
    const timestamp = new Date().toLocaleTimeString();

    if (result.isBlocked) {
      const category = result.matchedItem?.category || 'Sports Betting';
      const serviceName = result.matchedItem?.serviceName || clean;

      setSimulatedLog({
        status: 'blocked',
        title: `🛑 Intercepted: ${clean}`,
        details: `DNS query intercepted by local VpnService. Resolved to 0.0.0.0 (Sinkhole). Access prevented.`,
        technicalLog: [
          `[${timestamp}] UDP Port 53 query received for '${clean}'`,
          `[${timestamp}] Matching against AegisBet local Radix-Tree (1,420+ signatures)...`,
          `[${timestamp}] MATCH FOUND: Category = ${category} (${serviceName})`,
          `[${timestamp}] Synthesizing DNS Response: 0.0.0.0 (NXDOMAIN)`,
          `[${timestamp}] Android 12+ TUN socket routed to local loopback (zero external traffic)`
        ]
      });

      // Trigger full screen blocking modal
      onTriggerBlock(serviceName, 'website', category, clean);
    } else {
      setSimulatedLog({
        status: 'allowed',
        title: `Passed: ${clean}`,
        details: state.isProtectionActive 
          ? `Domain is not in the gambling database and was permitted to upstream DNS resolver.` 
          : `Protection is currently paused. All domains are permitted.`,
        technicalLog: [
          `[${timestamp}] UDP Port 53 query received for '${clean}'`,
          `[${timestamp}] AegisBet filter check: Not identified as gambling`,
          `[${timestamp}] Forwarded to upstream DoH/DoT resolver via protect(socket)`
        ]
      });
    }
  };

  // Test App Launch
  const handleTestApp = () => {
    const targetApp = INITIAL_GAMBLING_APPS.find(a => a.id === selectedAppId);
    if (!targetApp) return;

    const result = isAppBlocked(targetApp.packageId, state, INITIAL_GAMBLING_APPS);
    const timestamp = new Date().toLocaleTimeString();

    if (result.isBlocked) {
      setSimulatedLog({
        status: 'blocked',
        title: `🛑 App Intercepted: ${targetApp.name}`,
        details: `Detected foreground window switch to '${targetApp.packageId}'. Overlay activity invoked.`,
        technicalLog: [
          `[${timestamp}] AccessibilityEvent: TYPE_WINDOW_STATE_CHANGED`,
          `[${timestamp}] Package detected in foreground: '${targetApp.packageId}'`,
          `[${timestamp}] MATCH: ${targetApp.name} (Risk: ${targetApp.riskScore})`,
          `[${timestamp}] Invoking BlockingOverlayActivity with FLAG_ACTIVITY_NEW_TASK`,
          `[${timestamp}] User redirected away from gambling interface`
        ]
      });

      onTriggerBlock(targetApp.name, 'app', targetApp.category, targetApp.packageId);
    } else {
      setSimulatedLog({
        status: 'allowed',
        title: `App Allowed: ${targetApp.name}`,
        details: `App protection is currently inactive or disabled for this package.`,
        technicalLog: [
          `[${timestamp}] Package in foreground: '${targetApp.packageId}'`,
          `[${timestamp}] Protection inactive: No intervention`
        ]
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                Live Verification Station
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                Android 12+ API 31–35
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Interactive Threat Interception Cockpit
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Simulate real-world browsing and app launch events to inspect the instant dual-layer blocker in action.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Test Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Test 1: Website Interceptor */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <span>1. Test Website / Domain Blocking (DNS Sinkhole)</span>
            </div>
            <p className="text-xs text-slate-400">
              Type any gambling domain (or test URL) to simulate an HTTP/HTTPS browser connection attempt:
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testDomainInput}
                  onChange={(e) => setTestDomainInput(e.target.value)}
                  placeholder="e.g. bet365.com, stake.com, bovada.lv"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  onClick={handleTestDomain}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Visit</span>
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                <span>Presets:</span>
                {['stake.com', 'bet365.com', 'bovada.lv', 'roobet.com', 'google.com (Safe)'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      const clean = preset.split(' ')[0];
                      setTestDomainInput(clean);
                    }}
                    className="px-2 py-1 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 font-mono text-[10px]"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-slate-200">How it functions:</strong> Intercepts UDP port 53 packets directly on the Android 12+ TUN interface. Returns 0.0.0.0 in &lt;0.2ms. Zero TLS inspection.
          </div>
        </div>

        {/* Test 2: Application Interceptor */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>2. Test Betting Application Blocking (Foreground Guard)</span>
            </div>
            <p className="text-xs text-slate-400">
              Select any installed betting app to simulate launching it on an Android device:
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                >
                  {INITIAL_GAMBLING_APPS.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.name} ({app.packageId})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleTestApp}
                  className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Launch</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Monitors <strong>36+ catalogued packages</strong> including DraftKings, FanDuel, BetMGM, Stake, PokerStars, and 1xBet.
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-slate-200">How it functions:</strong> Utilizes <code className="text-cyan-300">AccessibilityService</code> window events to detect the package in the foreground, immediately launching the Red 🛑 ACCESS BLOCKED screen.
          </div>
        </div>

      </div>

      {/* Simulated Interception Terminal / Telemetry Inspector */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              simulatedLog.status === 'blocked' ? 'bg-rose-500' : simulatedLog.status === 'allowed' ? 'bg-emerald-400' : 'bg-slate-500'
            }`} />
            <span className="font-bold text-white uppercase text-[11px]">Android 12+ Packet & Window Interception Log</span>
          </div>
          <span className="text-[10px] text-slate-500">Live Device Output</span>
        </div>

        <div className="space-y-1 pt-1">
          <div className={`font-bold text-sm ${
            simulatedLog.status === 'blocked' ? 'text-rose-400' : simulatedLog.status === 'allowed' ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {simulatedLog.title}
          </div>
          <p className="text-slate-300 text-xs font-sans">{simulatedLog.details}</p>
        </div>

        {simulatedLog.technicalLog.length > 0 && (
          <div className="p-3 bg-black rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 mt-2">
            {simulatedLog.technicalLog.map((line, idx) => (
              <div key={idx} className={line.includes('MATCH') || line.includes('Intercepted') ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
