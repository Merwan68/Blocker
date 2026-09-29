import React, { useState } from 'react';
import { Globe2, Plus, Search, Trash2, CheckCircle2, Shield, Filter } from 'lucide-react';
import { BlockerState, GamblingDomain, ProtectionCategory } from '../types';
import { INITIAL_GAMBLING_DOMAINS } from '../data/gamblingDatabase';
import { normalizeDomain } from '../services/blockerEngine';

interface DomainsManagerProps {
  state: BlockerState;
  onUpdateState: (newState: BlockerState) => void;
}

export const DomainsManager: React.FC<DomainsManagerProps> = ({
  state,
  onUpdateState
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newDomain, setNewDomain] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newCategory, setNewCategory] = useState<ProtectionCategory>('Sports Betting');

  const allDomains = [...state.customDomains, ...INITIAL_GAMBLING_DOMAINS];

  const filteredDomains = allDomains.filter(dom => {
    const matchesSearch = dom.domain.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dom.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddCustomDomain = () => {
    const clean = normalizeDomain(newDomain);
    if (!clean) return;

    const newEntry: GamblingDomain = {
      id: `custom-dom-${Date.now()}`,
      domain: clean,
      category: newCategory,
      serviceName: newServiceName.trim() || clean,
      isEnabled: true,
      isCustom: true
    };

    onUpdateState({
      ...state,
      customDomains: [newEntry, ...state.customDomains]
    });
    setNewDomain('');
    setNewServiceName('');
  };

  const handleDeleteCustomDomain = (id: string) => {
    onUpdateState({
      ...state,
      customDomains: state.customDomains.filter(d => d.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                DNS Sinkhole Database
              </span>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/60">
                {(1420 + state.customDomains.length).toLocaleString()} Domains Sinkholed
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Gambling & Betting Website Blocklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every DNS query for these hostnames is intercepted on Android 12+ and routed to 0.0.0.0.
            </p>
          </div>
        </div>
      </div>

      {/* Add Custom Domain Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider block">
          Add Custom Website / Domain to Sinkhole
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <input
            type="text"
            placeholder="Domain (e.g. custombetting.com or slots.example.org)"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="sm:col-span-5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
          <input
            type="text"
            placeholder="Service Label (Optional)"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            className="sm:col-span-3 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as ProtectionCategory)}
            className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="Sports Betting">Sports Betting</option>
            <option value="Online Casino">Online Casino</option>
            <option value="Poker">Poker</option>
            <option value="Crypto Gambling">Crypto Gambling</option>
            <option value="Betting Exchange">Betting Exchange</option>
          </select>
          <button
            onClick={handleAddCustomDomain}
            className="sm:col-span-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Domain</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search domains or betting services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="Sports Betting">Sports Betting</option>
          <option value="Online Casino">Online Casino</option>
          <option value="Poker">Poker</option>
          <option value="Crypto Gambling">Crypto Gambling</option>
          <option value="Betting Exchange">Betting Exchange</option>
        </select>
      </div>

      {/* Domains Table / List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-white uppercase text-[11px] tracking-wider">
            Sinkholed Hostnames ({filteredDomains.length} shown)
          </span>
          <span className="font-mono text-[10px] text-emerald-400">Resolution Target: 0.0.0.0</span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-[460px] overflow-y-auto">
          {filteredDomains.map((item) => (
            <div
              key={item.id}
              className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="font-mono font-bold text-white block">{item.domain}</span>
                  <span className="text-[11px] text-slate-400">{item.serviceName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-medium">{item.category}</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">
                  0.0.0.0
                </span>
                {item.isCustom && (
                  <button
                    onClick={() => handleDeleteCustomDomain(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove custom domain"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
