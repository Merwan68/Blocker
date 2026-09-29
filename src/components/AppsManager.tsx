import React, { useState } from 'react';
import { Smartphone, Plus, Search, Trash2, CheckCircle2, Shield, Filter } from 'lucide-react';
import { BlockerState, GamblingApp, ProtectionCategory } from '../types';
import { INITIAL_GAMBLING_APPS } from '../data/gamblingDatabase';

interface AppsManagerProps {
  state: BlockerState;
  onUpdateState: (newState: BlockerState) => void;
}

export const AppsManager: React.FC<AppsManagerProps> = ({
  state,
  onUpdateState
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newAppName, setNewAppName] = useState('');
  const [newPackageId, setNewPackageId] = useState('');
  const [newCategory, setNewCategory] = useState<ProtectionCategory>('Sports Betting');

  const allApps = [...state.customApps, ...INITIAL_GAMBLING_APPS];

  const filteredApps = allApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.packageId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleApp = (appId: string) => {
    // If it's a custom app
    if (state.customApps.some(a => a.id === appId)) {
      const updatedCustom = state.customApps.map(a => a.id === appId ? { ...a, isEnabled: !a.isEnabled } : a);
      onUpdateState({ ...state, customApps: updatedCustom });
    }
  };

  const handleAddCustomApp = () => {
    if (!newAppName.trim() || !newPackageId.trim()) return;
    const newApp: GamblingApp = {
      id: `custom-app-${Date.now()}`,
      name: newAppName.trim(),
      packageId: newPackageId.trim().toLowerCase(),
      category: newCategory,
      country: 'User Defined',
      riskScore: 'High',
      isEnabled: true,
      isCustom: true
    };
    onUpdateState({
      ...state,
      customApps: [newApp, ...state.customApps]
    });
    setNewAppName('');
    setNewPackageId('');
  };

  const handleDeleteCustomApp = (id: string) => {
    onUpdateState({
      ...state,
      customApps: state.customApps.filter(a => a.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Application Interception Engine
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                {allApps.length} Packages Monitored
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Monitored Betting & Casino Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitors and intercepts foreground application launches on Android 12+.
            </p>
          </div>
        </div>
      </div>

      {/* Add Custom App Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider block">
          Add Custom Application to Blocklist
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <input
            type="text"
            placeholder="App Display Name (e.g. MyLocalBookie)"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            className="sm:col-span-4 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            placeholder="Package ID (e.g. com.example.betting)"
            value={newPackageId}
            onChange={(e) => setNewPackageId(e.target.value)}
            className="sm:col-span-4 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as ProtectionCategory)}
            className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="Sports Betting">Sports Betting</option>
            <option value="Online Casino">Online Casino</option>
            <option value="Poker">Poker</option>
            <option value="Crypto Gambling">Crypto Gambling</option>
            <option value="Slots">Slots</option>
            <option value="Lottery">Lottery</option>
          </select>
          <button
            onClick={handleAddCustomApp}
            className="sm:col-span-2 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add App</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by application name or package ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Categories</option>
          <option value="Sports Betting">Sports Betting</option>
          <option value="Online Casino">Online Casino</option>
          <option value="Poker">Poker</option>
          <option value="Crypto Gambling">Crypto Gambling</option>
          <option value="Betting Exchange">Betting Exchange</option>
        </select>
      </div>

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className={`p-4 rounded-2xl border transition-all ${
              app.isCustom
                ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug truncate max-w-[180px]">
                    {app.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[180px]">
                    {app.packageId}
                  </span>
                </div>
              </div>

              {app.isCustom ? (
                <button
                  onClick={() => handleDeleteCustomApp(app.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Remove custom app"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  Protected
                </span>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{app.category}</span>
              <span className="text-slate-500">{app.country}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
