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
  ChevronRight,
  Layers3,
  Server
} from 'lucide-react';

export const Android12Architecture: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'matrix' | 'fgs' | 'permissions' | 'sinkhole' | 'android15'>('matrix');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Operating System Matrix
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                Android 12, 12L, 13, 14, 15 & 16 (API 31–36)
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Complete Support for All Android Versions Above Android 12
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Engineered to meet every mandatory platform change introduced across Android 12 (API 31), 12L (API 32), 13 (API 33), 14 (API 34), 15 (API 35), and forward-ready for 16 (API 36).
            </p>
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSection('matrix')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'matrix' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              OS Version Spectrum
            </button>
            <button
              onClick={() => setActiveSection('fgs')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'fgs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              FGS & Foreground Rules
            </button>
            <button
              onClick={() => setActiveSection('android15')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'android15' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Android 15 16KB Pages
            </button>
            <button
              onClick={() => setActiveSection('permissions')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSection === 'permissions' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Permissions Spec
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: OS Version Spectrum (12, 12L, 13, 14, 15, 16) */}
      {activeSection === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
          
          {/* Android 12 & 12L */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 12 & 12L (API 31–32)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white">Immutable Intents & FGS Start Rules</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforces <code className="text-slate-300">FLAG_IMMUTABLE</code> on all Notification PendingIntents. Bypasses the background FGS launch restriction via the official <code className="text-slate-300">VpnService.prepare()</code> exemption.
            </p>
          </div>

          {/* Android 13 */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 13 (API 33)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white">Runtime Notification Permission</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fully compliant with <code className="text-slate-300">POST_NOTIFICATIONS</code> runtime dialog. Ongoing shield notification persists in the notification drawer without crashing the foreground service.
            </p>
          </div>

          {/* Android 14 */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 14 (API 34)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white">FGS Types & Special Use Subtypes</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explicitly declares <code className="text-slate-300">android:foregroundServiceType="specialUse"</code> and binds <code className="text-slate-300">PROPERTY_SPECIAL_USE_FGS_SUBTYPE</code> to prevent runtime security exceptions.
            </p>
          </div>

          {/* Android 15 */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 15 (API 35)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Verified</span>
            </div>
            <h4 className="text-sm font-bold text-white">16KB Page Alignment & Private Space</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compiled with native 16 KB memory page size alignment for Android 15 devices. Handles Android 15 Private Space to ensure betting apps installed in private profiles are intercepted.
            </p>
          </div>

          {/* Android 16 */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">Android 16 (API 36)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Forward Ready</span>
            </div>
            <h4 className="text-sm font-bold text-white">Target SDK 35+ Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prepared for upcoming Android 16 Baklava SDK releases with modular architecture and zero deprecated network API usage.
            </p>
          </div>

          {/* Transsion / Samsung / Xiaomi */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">OEM Android Skins</span>
              <span className="text-[10px] text-amber-400 font-semibold bg-amber-950 px-1.5 py-0.5 rounded">Optimized</span>
            </div>
            <h4 className="text-sm font-bold text-white">Tecno HiOS, Infinix XOS & Samsung</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Includes persistence architecture to survive aggressive OEM task killers on Tecno, Infinix, Samsung One UI, and Xiaomi devices popular in Ethiopia and globally.
            </p>
          </div>

        </div>
      )}

      {/* Section 2: FGS Details */}
      {activeSection === 'fgs' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Foreground Service Restrictions on Android 12, 13, 14 & 15
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Google introduced strict background start limits in Android 12 (<code className="text-rose-400 font-mono">ForegroundServiceStartNotAllowedException</code>) and mandatory foreground service types in Android 14. Here is how AegisBet maintains 100% legal, non-crashing execution:
          </p>

          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">1. The VpnService Privilege</span>
              <p className="text-slate-400">
                Under Android documentation, <code className="text-white font-mono">VpnService</code> is a system-level privileged component. When activated through the user-accepted system consent prompt, it is immune to background start bans across all Android versions above Android 12.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">2. Android 14 Mandatory FGS Property Declaration</span>
              <p className="text-slate-400">
                In Android 14 (API 34), services must declare a specific subtype in the manifest. AegisBet includes:
              </p>
              <div className="p-2 bg-black rounded font-mono text-[11px] text-emerald-400">
                &lt;property android:name="android.app.PROPERTY_SPECIAL_USE_FGS_SUBTYPE"
                android:value="Digital wellbeing self-exclusion blocker routing gambling domains to 0.0.0.0" /&gt;
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">3. START_STICKY & Auto-Resurrection</span>
              <p className="text-slate-400">
                If the operating system under extreme RAM pressure kills the service, Android automatically re-launches AegisBet when resources free up, maintaining uninterrupted gambling protection.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Android 15 16KB Pages */}
      {activeSection === 'android15' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Android 15 (API 35) 16 KB Memory Page Size Support
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Beginning with Android 15, devices can be configured with 16 KB memory page sizes (replacing traditional 4 KB pages). Apps with unaligned native libraries crash on launch on modern Android 15 hardware.
          </p>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              How AegisBet Guarantees 16 KB Compatibility:
            </span>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside text-[11px]">
              <li>Pure Kotlin native network loops with zero unaligned legacy 32-bit C/C++ SO blobs.</li>
              <li>Configured in <code className="text-indigo-300 font-mono">build.gradle.kts</code> with 16 KB alignment packaging flags.</li>
              <li>Verified compatible with the Android 15 16 KB emulator image.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Section 4: Permissions */}
      {activeSection === 'permissions' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white">
            Manifest Permissions across Android 12, 13, 14, 15 & 16
          </h3>
          
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
            <div className="text-slate-500">&lt;!-- Compatible with Android 12, 12L, 13, 14, 15, 16 --&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE" /&gt;</div>
            <div className="text-indigo-400">&lt;!-- Android 14+ Mandatory FGS Type --&gt;</div>
            <div className="text-indigo-300">&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" /&gt;</div>
            <div className="text-cyan-400">&lt;!-- Android 13+ Notification Permission --&gt;</div>
            <div className="text-cyan-300">&lt;uses-permission android:name="android.permission.POST_NOTIFICATIONS" /&gt;</div>
            <div className="text-emerald-400">&lt;!-- Device Reboot Persistence --&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /&gt;</div>
            <div>&lt;uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" /&gt;</div>
          </div>
        </div>
      )}

    </div>
  );
};
