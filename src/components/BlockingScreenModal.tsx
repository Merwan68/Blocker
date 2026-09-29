import React from 'react';
import { ShieldAlert, ArrowLeft, HeartHandshake, PhoneCall } from 'lucide-react';
import { ProtectionCategory } from '../types';

interface BlockingScreenModalProps {
  isOpen: boolean;
  targetName: string;
  targetType: 'app' | 'website';
  category: ProtectionCategory;
  destination: string;
  onClose: () => void;
}

export const BlockingScreenModal: React.FC<BlockingScreenModalProps> = ({
  isOpen,
  targetName,
  targetType,
  category,
  destination,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-slate-950 border-2 border-rose-600 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Shield Warning Icon */}
        <div className="w-20 h-20 rounded-full bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-400 mx-auto animate-pulse">
          <span className="text-4xl">🛑</span>
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            ACCESS BLOCKED
          </h2>
          <p className="text-xs text-rose-300 font-semibold tracking-wide">
            AegisBet Digital Wellbeing Barrier
          </p>
        </div>

        {/* Intercepted Details */}
        <div className="bg-slate-900/90 border border-rose-900/60 rounded-2xl p-4 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">Intercepted Target</span>
            <span className="text-rose-400 font-medium font-mono text-[11px] uppercase">{targetType}</span>
          </div>
          <div className="text-sm font-bold text-white truncate">{targetName}</div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
            <span>Category: <strong className="text-slate-200">{category}</strong></span>
            <span className="font-mono text-emerald-400 text-[10px]">Sinkholed 0.0.0.0</span>
          </div>
        </div>

        {/* Explanatory Message */}
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            This {targetType === 'app' ? 'application' : 'website'} is blocked by your Gambling Protection settings to safeguard your wellbeing and financial health.
          </p>
          <p className="text-rose-400 font-semibold">
            Protection is currently active.
          </p>
        </div>

        {/* Digital Wellbeing Resource */}
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Need support? Confidential Helpline: <strong>1-800-522-4700</strong></span>
        </div>

        {/* Return Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-sm shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>[ Go Back to Safety ]</span>
          </button>
        </div>

      </div>
    </div>
  );
};
