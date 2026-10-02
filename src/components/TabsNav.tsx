'use client';

import React from 'react';
import { Briefcase, Fuel, Zap } from 'lucide-react';

export type TabId = 'taxes' | 'fuel' | 'generator';

interface TabItem {
  id: TabId;
  label: string;
  shortLabel: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  {
    id: 'taxes',
    label: 'Податки ФОП & Зарплата',
    shortLabel: 'Податки & ЗП',
    badge: 'Нові ставки',
    icon: Briefcase,
  },
  {
    id: 'fuel',
    label: 'Паливо & Поїздка',
    shortLabel: 'Паливо & Авто',
    badge: 'АЗС ціни',
    icon: Fuel,
  },
  {
    id: 'generator',
    label: 'Генератор & Електрика',
    shortLabel: 'Генератор',
    badge: 'Автономність',
    icon: Zap,
  },
];

interface TabsNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export default function TabsNav({ activeTab, onChange }: TabsNavProps) {
  return (
    <div className="w-full">
      <div className="flex p-1.5 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-md shadow-slate-300/40 dark:shadow-none'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/40 dark:hover:bg-slate-700/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                  isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.shortLabel}</span>

              {tab.badge && (
                <span
                  className={`hidden lg:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                      : 'bg-slate-300/60 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
