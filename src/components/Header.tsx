'use client';

import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-amber-400 p-[2px] shadow-md shadow-blue-500/20 group">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-95">
              <Calculator className="w-6 h-6 text-blue-600 dark:text-amber-400 stroke-[2.2]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-blue-700" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Смарт Калькулятор <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Україна</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <Sparkles className="w-3 h-3 text-amber-500" /> 2024–2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
              Актуальні розрахунки податків, палива та витрат в Україні
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pr-2 border-r border-slate-200 dark:border-slate-700/60">
            <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 font-mono">
              МЗП: <span className="font-bold text-slate-800 dark:text-slate-200">8 000 грн</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 font-mono">
              ЄСВ: <span className="font-bold text-slate-800 dark:text-slate-200">1 760 грн</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
