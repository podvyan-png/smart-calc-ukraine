'use client';

import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Смарт Калькулятор Україна
            </span>
            <span>•</span>
            <span>Версія 2024–2026</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span>Зроблено з турботою про українців</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>в Україні 🇺🇦</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <strong>Юридичне застереження:</strong> Розрахунки на сайті носять інформаційний та
          довідковий характер відповідно до чинних норм Податкового кодексу України (Закон № 4015-IX,
          розміри МЗП та ПМПО). Сервіс не надає персональних юридичних чи бухгалтерських
          консультацій. Для офіційної звітності використовуйте затверджені форми ДПС України.
        </div>
      </div>
    </footer>
  );
}
