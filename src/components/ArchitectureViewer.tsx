import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Key, 
  Layers, 
  FileCode, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Lock,
  Globe2,
  Server
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apis' | 'pipeline' | 'keystore' | 'limitations' | 'policy'>('apis');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-white">Android Native Security Architecture</h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              API Level 34+ Ready
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Engineered exclusively with official Android OS framework APIs. Zero exploits, zero root required, zero TLS decryption.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('apis')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'apis' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            OS Framework APIs
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'pipeline' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            DNS Sinkhole Pipeline
          </button>
          <button
            onClick={() => setActiveTab('keystore')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'keystore' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Keystore & PBKDF2
          </button>
          <button
            onClick={() => setActiveTab('limitations')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'limitations' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            OS Limitations & Mitigations
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'policy' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Google Play Policy
          </button>
        </div>
      </div>

      {/* Tab 1: OS Framework APIs */}
      {activeTab === 'apis' && (
        <div className="py-6 space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* VpnService */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4" />
                  android.net.VpnService
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded">Core Filter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Establishes a virtual network interface on device. Binds a TUN interface with an IP (e.g., 10.0.0.2). Routes DNS port 53 traffic into local parser.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 space-y-1">
                <div>Builder(context)</div>
                <div className="pl-4">.addAddress("10.0.0.2", 32)</div>
                <div className="pl-4">.addRoute("10.0.0.0", 32)</div>
                <div className="pl-4">.addDnsServer("127.0.0.1")</div>
                <div className="pl-4">.setBlocking(true).establish()</div>
              </div>
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-200">Security Benefit:</strong> Blocks domains before socket connection occurs. Zero payload inspection.
              </div>
            </div>

            {/* AccessibilityService vs UsageStats */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  AccessibilityService & UsageStats
                </span>
                <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-950 px-2 py-0.5 rounded">Foreground Detection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Detects when a prohibited gambling package takes foreground focus via <code className="text-cyan-300">AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED</code>.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 space-y-1">
                <div>onAccessibilityEvent(event: AccessibilityEvent) &#123;</div>
                <div className="pl-4">val pkg = event.packageName?.toString()</div>
                <div className="pl-4">if (gamblingVault.isBlocked(pkg)) &#123;</div>
                <div className="pl-8">triggerBlockingOverlay(pkg)</div>
                <div className="pl-4">&#125;</div>
                <div>&#125;</div>
              </div>
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-200">Fallback API:</strong> <code className="text-slate-300">UsageStatsManager.queryEvents()</code> polling interval for non-accessibility deployments.
              </div>
            </div>

            {/* Android Keystore */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Key className="w-4 h-4" />
                  Android Keystore + StrongBox
                </span>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-950 px-2 py-0.5 rounded">Hardware Cryptography</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generates and binds hardware AES-256 keys inside the Secure Element / Trusted Execution Environment (TEE). Keys never leave hardware boundary.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 space-y-1">
                <div>KeyGenParameterSpec.Builder(KEY_ALIAS, ...)</div>
                <div className="pl-4">.setBlockModes(BLOCK_MODE_GCM)</div>
                <div className="pl-4">.setEncryptionPaddings(ENCRYPTION_PADDING_NONE)</div>
                <div className="pl-4">.setIsStrongBoxBacked(true)</div>
                <div className="pl-4">.build()</div>
              </div>
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-200">Zero Plaintext:</strong> Protection PIN stored strictly as 100,000-round PBKDF2 hash with unique 128-bit salt.
              </div>
            </div>

            {/* DevicePolicyManager */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  DeviceAdminReceiver
                </span>
                <span className="text-[10px] text-purple-400 font-semibold bg-purple-950 px-2 py-0.5 rounded">Anti-Uninstall Barrier</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implements official Device Administration. Intercepts <code className="text-purple-300">onDisableRequested()</code> when user attempts to remove admin rights or uninstall app.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 space-y-1">
                <div>override fun onDisableRequested(...) : CharSequence &#123;</div>
                <div className="pl-4">return "Warning: Disabling requires master AegisBet PIN."</div>
                <div>&#125;</div>
              </div>
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-200">User Safeguard:</strong> User retains legitimate recovery capability without malware lock-in.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: DNS Sinkhole Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="py-6 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            DNS Packet Interception & Synthesis Flow
          </h3>
          <p className="text-xs text-slate-400">
            AegisBet implements an on-device DNS resolver running inside <code className="text-indigo-400">VpnService</code>. It does not route user data to remote proxy servers.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
              <div className="flex-1">
                <span className="text-xs font-bold text-white block">Application Requests Domain</span>
                <span className="text-[11px] text-slate-400">Browser or app attempts to resolve IP for <code className="text-slate-200">stake.com</code> or <code className="text-slate-200">bovada.lv</code></span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
              <div className="flex-1">
                <span className="text-xs font-bold text-white block">TUN Interface Intercepts UDP 53</span>
                <span className="text-[11px] text-slate-400">Android network stack directs UDP port 53 packets through AegisBet's file descriptor (<code className="text-indigo-300">vpnInterface.fileDescriptor</code>)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>

            <div className="p-4 bg-slate-950 border border-indigo-500/50 rounded-xl flex items-center gap-4 bg-indigo-950/20">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">3</div>
              <div className="flex-1">
                <span className="text-xs font-bold text-white block">Radix-Tree / Trie Fast Domain Lookup</span>
                <span className="text-[11px] text-slate-300">Domain checked against compiled database of 1,248+ gambling patterns in &lt;0.2 milliseconds offline</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-rose-950/40 border border-rose-700/60 rounded-xl space-y-1">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Gambling Domain Match
                </span>
                <p className="text-[11px] text-rose-200/80 leading-relaxed">
                  Synthesize immediate DNS Response with <code className="text-white font-mono">0.0.0.0</code> (NXDOMAIN / Sinkhole IP). Connection cleanly terminates at DNS layer with zero battery drain.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Benign Domain
                </span>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  Direct forward to clean encrypted DNS resolver (Cloudflare 1.1.1.1 or Quad9) via protected upstream socket using <code className="text-white font-mono">protect(socket)</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Keystore & PBKDF2 */}
      {activeTab === 'keystore' && (
        <div className="py-6 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Cryptographic Vault & PIN Security Specifications
          </h3>
          <p className="text-xs text-slate-400">
            Never store PIN in plaintext. Storage conforms to NIST SP 800-132 recommendations for password-based key derivation.
          </p>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[11px]">Derivation Function</span>
                <strong className="text-white font-mono block mt-1">PBKDF2-HMAC-SHA256</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[11px]">Iteration Count</span>
                <strong className="text-emerald-400 font-mono block mt-1">100,000 Rounds</strong>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-slate-400 block text-[11px]">Salt Generation</span>
                <strong className="text-indigo-400 font-mono block mt-1">128-bit CSPRNG SecureRandom</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg space-y-1.5">
              <span className="text-xs font-bold text-white block">Rate Limiting & Lockout Schedule</span>
              <div className="grid grid-cols-4 gap-2 text-[11px] text-center pt-1 font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">1-2 Fails</span>
                  <span className="text-white font-semibold">0s Delay</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-amber-400 block text-[10px]">3 Fails</span>
                  <span className="text-white font-semibold">30s Lock</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-amber-400 block text-[10px]">4 Fails</span>
                  <span className="text-white font-semibold">60s Lock</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-rose-400 block text-[10px]">5+ Fails</span>
                  <span className="text-white font-semibold">300s Lock</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-slate-200">Timing Attack Protection</span>
              <p className="text-slate-400 text-[11px]">
                Authentication uses constant-time XOR byte comparison (<code className="text-indigo-300">MessageDigest.isEqual()</code>) to eliminate side-channel timing analysis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Limitations & Mitigations */}
      {activeTab === 'limitations' && (
        <div className="py-6 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Android OS Limitations Analysis (Section 29)
          </h3>
          <p className="text-xs text-slate-400">
            Transparently documenting OS boundaries without claiming false technical guarantees.
          </p>

          <div className="space-y-3">
            
            {/* Limitation 1 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  1. VPN Disconnection by User in Android Settings
                </span>
                <span className="text-[10px] text-slate-400 font-mono">OS Hard Boundary</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Why it exists:</strong> Android intentionally guarantees device owners can revoke third-party VPN profiles from System Settings &rarr; Network &rarr; VPN to prevent user entrapment.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-emerald-400">Legitimate AegisBet Mitigation:</span>
                <p className="text-slate-300 text-[11px]">
                  1. Listen to <code className="text-indigo-300">VpnService.onRevoke()</code>.
                  <br />
                  2. Promptly launch high-priority PIN challenge: <em>"Gambling protection was interrupted. Please authenticate to manage protection."</em>
                  <br />
                  3. Complement with AccessibilityService foreground monitor so gambling apps remain blocked even if VPN was turned off.
                </p>
              </div>
            </div>

            {/* Limitation 2 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  2. Single Active VPN Limitation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Android Architecture</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Why it exists:</strong> Standard Android permits only one active <code className="text-slate-200">VpnService</code> at a time. If the user connects to a corporate VPN (e.g. Cisco AnyConnect, WireGuard), AegisBet VPN is paused.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-emerald-400">Legitimate AegisBet Mitigation:</span>
                <p className="text-slate-300 text-[11px]">
                  The dual-layer architecture falls back directly onto the <code className="text-indigo-300">AccessibilityService</code> app-layer blocker, which monitors app packages independently of network state.
                </p>
              </div>
            </div>

            {/* Limitation 3 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  3. App Uninstallation Without Device Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">User Ownership Policy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Why it exists:</strong> To prevent malware from taking over devices permanently, Android allows users to uninstall regular applications unless managed by enterprise Device Admin or Knox.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-emerald-400">Legitimate AegisBet Mitigation:</span>
                <p className="text-slate-300 text-[11px]">
                  Activate <code className="text-indigo-300">DeviceAdminReceiver</code>. When an uninstallation attempt occurs, Android OS prompts the user with the configured security policy dialog, requiring Device Admin deactivation (which prompts for PIN).
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 5: Google Play Policy */}
      {activeTab === 'policy' && (
        <div className="py-6 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Google Play Store Policy & Legitimate Wellbeing Compliance
          </h3>
          
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">Prominent Disclosure for Accessibility API</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Complies with Google Play's 2024–2026 Accessibility Service Policy: The app presents a clear, full-screen disclosure explaining that Accessibility is used <em>solely</em> to detect foreground betting apps for self-exclusion and gambling harm prevention.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">VPN Policy Exemption for Digital Wellbeing</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Google Play explicitly permits local <code className="text-slate-200">VpnService</code> usage for parental controls, ad/malware blocking, and digital wellbeing apps when data remains on device without remote rerouting.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white block">Anti-Malware Certification</span>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Zero hidden surveillance, zero keylogging, zero credential theft. All protection parameters are configured transparently by the user.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
