import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  Globe2, 
  Zap, 
  Cpu, 
  FileCode, 
  Activity, 
  CheckCircle2, 
  ShieldAlert,
  Flame,
  RotateCcw
} from 'lucide-react';
import { BlockerState, BlockEventLog, ProtectionCategory } from './types';
import { getInitialBlockerState, saveBlockerState, getSavedLogs, saveLogs } from './services/blockerEngine';
import { DashboardOverview } from './components/DashboardOverview';
import { InteractiveTester } from './components/InteractiveTester';
import { AppsManager } from './components/AppsManager';
import { DomainsManager } from './components/DomainsManager';
import { Android12Architecture } from './components/Android12Architecture';
import { NativeCodeExport } from './components/NativeCodeExport';
import { BlockingScreenModal } from './components/BlockingScreenModal';

export default function App() {
  const [blockerState, setBlockerState] = useState<BlockerState>(getInitialBlockerState);
  const [logs, setLogs] = useState<BlockEventLog[]>(getSavedLogs);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tester' | 'apps' | 'domains' | 'android12' | 'export'>('dashboard');

  // Blocking Modal State
  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);
  const [blockedTargetName, setBlockedTargetName] = useState('');
  const [blockedTargetType, setBlockedTargetType] = useState<'app' | 'website'>('website');
  const [blockedCategory, setBlockedCategory] = useState<ProtectionCategory>('Sports Betting');
  const [blockedDestination, setBlockedDestination] = useState('');

  const updateState = (newState: BlockerState) => {
    setBlockerState(newState);
    saveBlockerState(newState);
  };

  const handleToggleMasterProtection = () => {
    const updated: BlockerState = {
      ...blockerState,
      isProtectionActive: !blockerState.isProtectionActive
    };
    updateState(updated);
  };

  const handleToggleWebProtection = () => {
    const updated: BlockerState = {
      ...blockerState,
      webProtectionEnabled: !blockerState.webProtectionEnabled
    };
    updateState(updated);
  };

  const handleToggleAppProtection = () => {
    const updated: BlockerState = {
      ...blockerState,
      appProtectionEnabled: !blockerState.appProtectionEnabled
    };
    updateState(updated);
  };

  const handleTriggerBlock = (
    name: string, 
    type: 'app' | 'website', 
    category: ProtectionCategory, 
    destination: string
  ) => {
    // Record into logs
    const newLog: BlockEventLog = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      targetName: name,
      targetType: type,
      category,
      destination,
      actionTaken: type === 'website' ? 'Sinkholed (0.0.0.0)' : 'Window Intercepted'
    };

    const newLogsList = [newLog, ...logs];
    setLogs(newLogsList);
    saveLogs(newLogsList);

    // Increment deflection count & estimated savings
    const updated: BlockerState = {
      ...blockerState,
      totalBlocks: blockerState.totalBlocks + 1,
      todayBlocks: blockerState.todayBlocks + 1,
      weekBlocks: blockerState.weekBlocks + 1,
      moneySavedEstimate: blockerState.moneySavedEstimate + 25
    };
    updateState(updated);

    // Open Red 🛑 ACCESS BLOCKED screen
    setBlockedTargetName(name);
    setBlockedTargetType(type);
    setBlockedCategory(category);
    setBlockedDestination(destination);
    setIsBlockingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Application Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-all ${
              blockerState.isProtectionActive 
                ? 'bg-emerald-600 shadow-emerald-600/30' 
                : 'bg-rose-600 shadow-rose-600/30'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">AegisBet</span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  Gambling & Betting Blocker
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">Android 12+ (API 31–35)</span>
                <span aria-hidden="true">·</span>
                <span>Zero-Friction Auto-Block</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('tester')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'tester' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Test Blocker</span>
            </button>

            <button
              onClick={() => setActiveTab('domains')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'domains' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Websites (1,420+)</span>
            </button>

            <button
              onClick={() => setActiveTab('apps')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'apps' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Apps (36+)</span>
            </button>

            <button
              onClick={() => setActiveTab('android12')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'android12' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Android 12+ Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'export' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Native Code</span>
            </button>
          </nav>

          {/* Quick Status Pill */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
              blockerState.isProtectionActive
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60'
                : 'bg-rose-950/80 text-rose-400 border-rose-700/60'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                blockerState.isProtectionActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`} />
              <span>{blockerState.isProtectionActive ? 'SHIELD ON' : 'SHIELD OFF'}</span>
            </span>
          </div>

        </div>

        {/* Mobile Segmented Bar */}
        <div className="lg:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950 p-1 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'tester' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Test
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'domains' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Websites
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'apps' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Apps
          </button>
          <button
            onClick={() => setActiveTab('android12')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'android12' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Android 12+
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-1.5 px-2 rounded-md ${activeTab === 'export' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            Code
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <DashboardOverview
            state={blockerState}
            logs={logs}
            onToggleProtection={handleToggleMasterProtection}
            onToggleWebProtection={handleToggleWebProtection}
            onToggleAppProtection={handleToggleAppProtection}
            onNavigateToTester={() => setActiveTab('tester')}
          />
        )}

        {activeTab === 'tester' && (
          <InteractiveTester
            state={blockerState}
            onTriggerBlock={handleTriggerBlock}
          />
        )}

        {activeTab === 'domains' && (
          <DomainsManager
            state={blockerState}
            onUpdateState={updateState}
          />
        )}

        {activeTab === 'apps' && (
          <AppsManager
            state={blockerState}
            onUpdateState={updateState}
          />
        )}

        {activeTab === 'android12' && (
          <Android12Architecture />
        )}

        {activeTab === 'export' && (
          <NativeCodeExport />
        )}

      </main>

      {/* Fullscreen Red 🛑 ACCESS BLOCKED Modal (Section 9) */}
      <BlockingScreenModal
        isOpen={isBlockingModalOpen}
        targetName={blockedTargetName}
        targetType={blockedTargetType}
        category={blockedCategory}
        destination={blockedDestination}
        onClose={() => setIsBlockingModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AegisBet Digital Wellbeing Barrier · Built for Android 12+ (API 31–35)</span>
          <div className="flex items-center gap-3">
            <span>Zero MitM</span>
            <span>·</span>
            <span>No Plaintext Tracking</span>
            <span>·</span>
            <span>Local Loopback 0.0.0.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
