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
  ExternalLink,
  Key,
  Share2,
  Mail,
  Lock,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const PrivateApkInstallerGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standalone' | 'firebase' | 'play_internal' | 'device_settings'>('standalone');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadFullZip = async () => {
    try {
      setIsZipping(true);
      const { generateProjectZip } = await import('../services/zipProjectGenerator');
      const blob = await generateProjectZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AegisBet-Flutter-Android-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to create zip:', e);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadAppBundleScript = () => {
    const buildScript = `#!/bin/bash
# AegisBet Standalone APK Build Script for Private Devices
# Target: Android 12+ (API 31-36)
set -e

echo "=========================================="
echo " Building AegisBet Private Release APK   "
echo " (No Google Play Store account required) "
echo "=========================================="

cd android
chmod +x gradlew

# Build standalone debug/release APK
./gradlew assembleDebug

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
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Private Deployment Workbench
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                100% Private · Zero Public Listing
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              How to Publish & Install Privately from Scratch
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Step-by-step instructions to compile your APK, sign it with your own private key, and distribute it directly to your chosen devices without making it public.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadFullZip}
              disabled={isZipping}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <FolderDown className={`w-4 h-4 ${isZipping ? 'animate-bounce' : ''}`} />
              <span>{isZipping ? 'Bundling ZIP Archive...' : 'Download Project (.zip)'}</span>
            </button>
            <button
              onClick={handleDownloadAppBundleScript}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Build Script (.sh)</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-800 mt-6 text-xs">
          <button
            onClick={() => setActiveTab('standalone')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'standalone' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Method 1: Direct APK Sideload (Recommended, 100% Free)
          </button>
          <button
            onClick={() => setActiveTab('firebase')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'firebase' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Method 2: Firebase App Distribution (Free OTA Updates)
          </button>
          <button
            onClick={() => setActiveTab('play_internal')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'play_internal' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Method 3: Google Play Closed Internal Track
          </button>
          <button
            onClick={() => setActiveTab('device_settings')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'device_settings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Device Optimization (Tecno, Samsung, Xiaomi)
          </button>
        </div>
      </div>

      {/* TAB 1: STANDALONE APK SIDELOADING */}
      {activeTab === 'standalone' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Quick Overview Card */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-xs text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white">Why this method is best: </strong>
              Requires no developer registration, no Google Play fees, and no waiting for review. You generate the <code className="text-white font-mono">.apk</code> on your computer and install it directly via USB, Telegram, or private Google Drive link.
            </div>
          </div>

          {/* Step 1: Create Private Signing Key */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                Step 1: Generate Your Private Keystore (One-Time)
              </span>
              <button
                onClick={() => copyToClipboard('keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias aegisbet-key', 1)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Command</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Run this in your terminal to create your cryptographic signing key:
            </p>
            <div className="p-3 bg-black rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias aegisbet-key
            </div>
            <p className="text-[11px] text-slate-500">
              Enter a password you will remember (e.g. <code className="text-slate-300">AegisBetSecret2026</code>) and place the generated <code className="text-slate-300">my-release-key.jks</code> inside <code className="text-slate-300">android/app/</code>.
            </p>
          </div>

          {/* Step 2: Build the APK */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Step 2: Compile the Standalone APK
              </span>
              <button
                onClick={() => copyToClipboard('cd android && ./gradlew assembleDebug', 2)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Command</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              In your project folder, compile the standalone debug/release package:
            </p>
            <div className="p-3 bg-black rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              cd android && ./gradlew assembleDebug
            </div>
            <p className="text-[11px] text-slate-400">
              The compiled APK is created at: <code className="text-white font-mono">android/app/build/outputs/apk/debug/app-debug.apk</code>
            </p>
          </div>

          {/* Step 3: Transfer to Phone */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              Step 3: Transfer & Install on Any Android 12+ Phone
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block">Option A: USB Cable (ADB)</strong>
                <p className="text-slate-400 text-[11px]">Connect phone to PC with USB debugging and run:</p>
                <code className="text-emerald-400 font-mono text-[10px] block bg-slate-900 p-1 rounded">
                  adb install -r app-debug.apk
                </code>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block">Option B: Telegram / WhatsApp</strong>
                <p className="text-slate-400 text-[11px]">Send the file to your Telegram "Saved Messages" or WhatsApp chat, then tap to download and open.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block">Option C: Google Drive Link</strong>
                <p className="text-slate-400 text-[11px]">Upload the APK to Google Drive, generate a private link, and open it in the phone's browser.</p>
              </div>
            </div>
          </div>

          {/* Step 4: Installation Prompt & Play Protect */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Step 4: Bypassing the Android Installation Warnings
            </span>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-amber-300 block">1. "Install Unknown Apps" Prompt:</strong>
                <p className="text-slate-400">
                  When tapping the APK, Android will say <em>"Your phone is not allowed to install unknown apps from this source"</em>. Tap <strong>Settings</strong> &rarr; Toggle <strong>"Allow from this source"</strong> ON &rarr; Tap <strong>Install</strong>.
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-amber-300 block">2. Google Play Protect Prompt:</strong>
                <p className="text-slate-400">
                  If Play Protect shows <em>"Unrecognized Developer"</em>, tap <strong>More Details</strong> &rarr; Tap <strong>Install Anyway</strong>. (This is normal for any app built outside the public store).
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FIREBASE APP DISTRIBUTION */}
      {activeTab === 'firebase' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 animate-in fade-in duration-150">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              Method 2: Firebase App Distribution (Free Professional OTA Updates)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Firebase App Distribution is a 100% free tool provided by Google. It allows you to distribute your app privately via email invitations. When you compile a new update, you upload it to Firebase, and all your devices get an update notification automatically!
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-300 block">Step 1: Open Google Firebase Console</span>
              <p className="text-slate-400">
                Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">console.firebase.google.com</a> with your Google Account. Click <strong>Create Project</strong> (e.g. name it <code className="text-white">AegisBet-Private</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-300 block">Step 2: Register Android Application</span>
              <p className="text-slate-400">
                Click the Android icon to add an app. Enter the package name: <code className="text-white font-mono">com.aegisbet.app</code>. Click <strong>Register App</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-300 block">Step 3: Open App Distribution</span>
              <p className="text-slate-400">
                In the left sidebar, click <strong>Release & Monitor &rarr; App Distribution</strong>. Drag and drop your compiled <code className="text-white font-mono">app-debug.apk</code> into the box.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-300 block">Step 4: Add Testers' Email Addresses</span>
              <p className="text-slate-400">
                Type the Gmail/email address of the devices you want to install it on. Firebase will send them a private invitation link. Clicking the link installs the app directly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE PLAY INTERNAL TESTING */}
      {activeTab === 'play_internal' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-base font-bold text-white">
            Method 3: Google Play Closed Internal Testing Track
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you have a Google Play Console account ($25 one-time fee) and want Google Play to handle installation while keeping the app <strong>100% invisible to the public</strong>:
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">1. Use "Internal Testing Track" (Not Production)</span>
              <p className="text-slate-400">
                Inside Google Play Console, go to <strong>Testing &rarr; Internal Testing</strong>. Create a release and upload the <code className="text-white">.aab</code> bundle.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">2. Create an Email Whitelist</span>
              <p className="text-slate-400">
                Add an email list (e.g. <code className="text-white">my-private-devices</code>). Only the exact Gmail accounts on this list can download the app. It will never appear in Google Play search results.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 block">3. Copy the Private Join Link</span>
              <p className="text-slate-400">
                Google Play generates a private URL (e.g. <code className="text-slate-300 font-mono">play.google.com/apps/testing/com.aegisbet.app</code>). Open this URL on your phone to install directly through the Play Store app.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEVICE SETTINGS */}
      {activeTab === 'device_settings' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-amber-400" />
            Critical Settings for Tecno, Infinix, Samsung & Xiaomi Phones
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            Android phone brands commonly used in Ethiopia and worldwide (like Tecno HiOS, Infinix XOS, Samsung One UI, and Xiaomi MIUI) aggressively kill background VPN services to save battery. Perform these 2 quick steps on the phone once:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block">1. Unrestricted Battery Usage</span>
              <p className="text-slate-400 leading-relaxed">
                Open <strong>Settings &rarr; Apps &rarr; AegisBet &rarr; Battery</strong> &rarr; Select <strong>"Unrestricted"</strong> (or disable Battery Optimization). This prevents the phone from killing the background DNS sinkhole.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 block">2. Always-On VPN (Zero Bypass)</span>
              <p className="text-slate-400 leading-relaxed">
                Open <strong>Settings &rarr; Network & internet &rarr; VPN</strong> &rarr; Tap the <strong>Gear icon</strong> next to AegisBet &rarr; Enable <strong>"Always-on VPN"</strong>. This ensures no app can bypass the gambling block even if the phone reboots!
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
