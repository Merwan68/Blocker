import React, { useState } from 'react';
import { 
  Smartphone, 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  FolderDown, 
  FileCode, 
  AlertCircle, 
  BatteryCharging, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

export const PrivateApkInstallerGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadAppBundleScript = () => {
    const buildScript = `#!/bin/bash
# AegisBet Standalone APK Build Script for Private Devices
# Target: Android 12+ (API 31-35)
set -e

echo "=========================================="
echo " Building AegisBet Private Release APK   "
echo " (No Google Play Store account required) "
echo "=========================================="

cd android
chmod +x gradlew

# Build standalone debug/release APK
./gradlew assembleRelease || ./gradlew assembleDebug

echo ""
echo "Build complete! Standalone APK located at:"
echo "android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "To install on your connected Android device, run:"
echo "adb install -r app/build/outputs/apk/debug/app-debug.apk"
`;

    const blob = new Blob([buildScript], { type: 'text/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'build_private_apk.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                Private Deployment Guide
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                100% Private Sideloading
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Private Device Installation & APK Sideloading
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              No public Google Play Store account needed. Build and install AegisBet directly onto your personal devices, family phones, or test devices via APK sideloading.
            </p>
          </div>

          <button
            onClick={handleDownloadAppBundleScript}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Build Script</span>
          </button>
        </div>
      </div>

      {/* 4 Step Visual Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
            1
          </div>
          <h4 className="font-bold text-white">Generate Private APK</h4>
          <p className="text-slate-400 text-[11px]">
            Run <code className="text-indigo-300">./gradlew assembleDebug</code> in Android Studio or terminal to generate the standalone installable <code className="text-white">.apk</code> file.
          </p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
            2
          </div>
          <h4 className="font-bold text-white">Transfer to Device</h4>
          <p className="text-slate-400 text-[11px]">
            Send the file to your phone via USB cable, Telegram/WhatsApp Saved Messages, Google Drive, or ADB command line.
          </p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
            3
          </div>
          <h4 className="font-bold text-white">Sideload / Install</h4>
          <p className="text-slate-400 text-[11px]">
            Tap the APK in Files. When Play Protect prompts <em>"Unrecognized App"</em>, tap <strong>More Details &rarr; Install Anyway</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
            4
          </div>
          <h4 className="font-bold text-white">Activate Protection</h4>
          <p className="text-slate-400 text-[11px]">
            Open AegisBet, tap <strong>Enable Protection</strong>. Accept the Android VPN confirmation dialog. Protection begins instantly.
          </p>
        </div>

      </div>

      {/* Terminal Commands Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Terminal Commands for Instant Build & Install
          </span>
          <span className="text-[10px] text-slate-500 font-mono">macOS / Linux / WSL / Windows CMD</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 pb-1">
              <span>Command 1: Compile APK locally</span>
              <button
                onClick={() => copyToClipboard('cd android && ./gradlew assembleDebug', 1)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
            <div className="p-3 bg-black rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              cd android && ./gradlew assembleDebug
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Produces the APK at: <code className="text-slate-300">android/app/build/outputs/apk/debug/app-debug.apk</code>
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 pb-1">
              <span>Command 2: Install directly to phone via USB (with ADB enabled)</span>
              <button
                onClick={() => copyToClipboard('adb install -r android/app/build/outputs/apk/debug/app-debug.apk', 2)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
            <div className="p-3 bg-black rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              adb install -r android/app/build/outputs/apk/debug/app-debug.apk
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Device Settings for Tecno, Infinix, Samsung, Xiaomi */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-amber-400" />
          Critical Settings for African / Asian Market Devices (Tecno, Infinix, Samsung, Xiaomi)
        </span>
        <p className="text-xs text-slate-300 leading-relaxed">
          Many popular devices sold in Ethiopia (such as Tecno HiOS, Infinix XOS, Samsung OneUI, and Xiaomi MIUI) have aggressive battery savers that close background apps. Configure these two settings once on the target phone so AegisBet remains active permanently:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 block">1. Disable Battery Optimization (Unrestricted)</span>
            <p className="text-slate-400 leading-relaxed">
              Open <strong>Settings &rarr; Apps &rarr; AegisBet &rarr; Battery &rarr; Select "Unrestricted"</strong> (or "Don't Optimize"). This ensures the local DNS sinkhole is never put to sleep by the operating system.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 block">2. Always-On VPN (Optional Highest Protection)</span>
            <p className="text-slate-400 leading-relaxed">
              Open <strong>Settings &rarr; Network & internet &rarr; VPN &rarr; Tap the gear next to AegisBet &rarr; Enable "Always-on VPN"</strong>. This prevents any app on the phone from accessing the internet without filtering.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
