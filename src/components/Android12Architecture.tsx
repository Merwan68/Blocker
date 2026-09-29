import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Key, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Android12Architecture: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'matrix' | 'fgs' | 'permissions' | 'sinkhole'>('matrix');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Operating System Specification
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                minSdk 31 · targetSdk 35
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Android 12+ Native Architecture & Compatibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Fully compliant with Android 12 (API 31), Android 13 (API 33), Android 14 (API 34), and Android 15 (API 35).
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSection('matrix')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'matrix' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              OS Matrix
            </button>
            <button
              onClick={() => setActiveSection('fgs')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'fgs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              FGS & Android 12 Rules
            </button>
            <button
              onClick={() => setActiveSection('permissions')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'permissions' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              API 33+ Permissions
            </button>
            <button
              onClick={() => setActiveSection('sinkhole')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'sinkhole' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Local Sinkhole Engine
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Android 12+ API Matrix */}
      {activeSection === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 12 (API 31–32)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Baseline</span>
            </div>
            <h4 className="text-sm font-bold text-white">Foreground Service Restrictions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforces <code className="text-slate-300">PendingIntent.FLAG_IMMUTABLE</code> on all notifications and implements official VPN exceptions to avoid <code className="text-slate-300">ForegroundServiceStartNotAllowedException</code>.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 13 (API 33)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Supported</span>
            </div>
            <h4 className="text-sm font-bold text-white">Runtime Notification Permission</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Requests <code className="text-slate-300">POST_NOTIFICATIONS</code> dynamically during initial setup to ensure persistent wellbeing status notifications display in system tray.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 14 (API 34)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Supported</span>
            </div>
            <h4 className="text-sm font-bold text-white">Foreground Service Types</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Declares <code className="text-slate-300">foregroundServiceType="specialUse"</code> and system exemptions for network filtering and digital wellbeing self-exclusion.
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 15 (API 35)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Forward Ready</span>
            </div>
            <h4 className="text-sm font-bold text-white">16KB Page Size & Edge-to-Edge</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compiled with native 16KB memory alignment in Kotlin NDK binaries and compliant with mandatory edge-to-edge window insets.
            </p>
          </div>

        </div>
      )}

      {/* Section 2: Foreground Service Details */}
      {activeSection === 'fgs' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Android 12+ Background Start Restrictions & Exemptions
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In Android 12 (API level 31), apps cannot launch foreground services while running in the background, throwing a <code className="text-rose-400 font-mono">ForegroundServiceStartNotAllowedException</code>. AegisBet is architected using the official exemptions:
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">1. User Interaction / Explicit Consent Launch</span>
              <p className="text-slate-400">
                When the user taps "Enable Protection" in the UI, Android treats the app as in the foreground state. <code className="text-white font-mono">ContextCompat.startForegroundService()</code> succeeds immediately.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">2. Official VpnService System Exemption</span>
              <p className="text-slate-400">
                <code className="text-white font-mono">android.net.VpnService</code> has a built-in OS exemption. The platform dialog invoked by <code className="text-white font-mono">VpnService.prepare(context)</code> grants the app system foreground execution rights.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">3. START_STICKY & Boot Completed Handler</span>
              <p className="text-slate-400">
                The service returns <code className="text-white font-mono">START_STICKY</code> in <code className="text-white font-mono">onStartCommand()</code>. If Android terminates the process under severe RAM pressure, the OS automatically resurrects the service once memory stabilizes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Permissions Specification */}
      {activeSection === 'permissions' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Required Permissions & Manifest Declarations (Android 12+)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All permissions are standard, transparent, and compliant with Google Play Store policies for digital wellbeing:
          </p>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
            <div className="text-slate-500">&lt;!-- Android 12+ Core Network & Wellbeing Permissions --&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE" /&gt;</div>
            <div className="text-indigo-400">&lt;!-- Android 14 (API 34) Foreground Service Types --&gt;</div>
            <div className="text-indigo-300">&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" /&gt;</div>
            <div className="text-cyan-400">&lt;!-- Android 13 (API 33) Runtime Notification Permission --&gt;</div>
            <div className="text-cyan-300">&lt;uses-permission android:name="android.permission.POST_NOTIFICATIONS" /&gt;</div>
            <div className="text-emerald-400">&lt;!-- Persistence across device restarts --&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" /&gt;</div>
          </div>
        </div>
      )}

      {/* Section 4: Sinkhole Mechanics */}
      {activeSection === 'sinkhole' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Why Local Loopback DNS Sinkholing is the Superior Technique
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-950/40 border border-emerald-600/50 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                AegisBet Local DNS Sinkhole (Legitimate)
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Operates exclusively on DNS queries (UDP/TCP Port 53).</li>
                <li>Zero TLS/HTTPS certificate tampering or interception.</li>
                <li>Zero external VPN servers: all packets processed on-device.</li>
                <li>No root access required. Works out-of-the-box on Android 12+.</li>
                <li>Complies with Google Play Developer Distribution Agreement.</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-950/40 border border-rose-600/50 rounded-xl space-y-2">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Malware / Exploits / MITM (Rejected)
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Attempting to install fake root CA certificates to snoop traffic.</li>
                <li>Injecting malicious code or modifying system partition.</li>
                <li>Stealing credentials, session cookies, or banking data.</li>
                <li>Permanently locking the device or demanding ransom.</li>
                <li>Causes immediate removal and developer account ban.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
