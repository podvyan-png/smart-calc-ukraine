'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, ShieldCheck, Scale, Zap, Fuel } from 'lucide-react';
import { TAX_CONSTANTS } from '@/lib/tax-constants';
import { formatCurrency } from '@/lib/formatters';

interface FaqItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    id: 'fop-rates',
    icon: Scale,
    question: 'Які ставки єдиного податку, ЄСВ та ліміти діють для ФОП у 2024–2026 роках?',
    answer: (
      <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <p>
          В Україні базові ставки для платників єдиного податку привʼязані до розміру Мінімальної
          заробітної плати (МЗП = {formatCurrency(TAX_CONSTANTS.MZP, { decimals: 0 })}) та
          Прожиткового мінімуму для працездатних осіб (ПМПО ={' '}
          {formatCurrency(TAX_CONSTANTS.LIVING_WAGE, { decimals: 0 })}):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Група ФОП</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Єдиний податок</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Військовий збір</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">ЄСВ (22%)</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">Річний ліміт</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">1 група</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">до 302,80 грн/міс (10% ПМПО)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">800 грн/міс (10% МЗП)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1 760 грн/міс</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1 336 000 грн</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">2 група</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1 600 грн/міс (20% МЗП)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">800 грн/міс (10% МЗП)</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1 760 грн/міс</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">6 672 000 грн</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700">3 група</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">5% від отриманого доходу</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1% від доходу</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">1 760 грн/міс</td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700">9 336 000 грн</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'military-tax-update',
    icon: ShieldCheck,
    question: 'Що змінилося у Військовому зборі згідно із Законом № 4015-IX?',
    answer: (
      <div className="space-y-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <p>
          Верховна Рада ухвалила комплексні зміни до Податкового кодексу України щодо особливостей
          оподаткування у період дії воєнного стану:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Наймані працівники:</strong> Ставка військового збору зросла з 1.5% до{' '}
            <strong>5%</strong> від нарахованої заробітної плати (дохід оподатковується сумарно:
            18% ПДФО + 5% ВЗ = 23%).
          </li>
          <li>
            <strong>ФОП 1 та 2 груп:</strong> Введено щомісячний фіксований військовий збір у розмірі{' '}
            <strong>10% від мінімальної зарплати</strong> (800 грн на місяць).
          </li>
          <li>
            <strong>ФОП 3 групи:</strong> Встановлено військовий збір у розмірі{' '}
            <strong>1% від отриманого доходу</strong> щоквартально на додаток до 5% єдиного податку.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'salary-breakdown',
    icon: BookOpen,
    question: 'Як саме розраховується заробітна плата та які витрати несе роботодавець?',
    answer: (
      <div className="space-y-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <p>
          В Україні фонд оплати праці має подвійне оподаткування — утримання із зарплати робітника та
          нарахування ЄСВ роботодавцем:
        </p>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-1 text-xs font-mono">
          <p className="font-bold text-slate-900 dark:text-white">Приклад для окладу 20 000 грн (Gross):</p>
          <p>• ПДФО (18%): 3 600 грн</p>
          <p>• Військовий збір (5%): 1 000 грн</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold">
            = Працівник отримує на картку (Net): 15 400 грн
          </p>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold">
            + Роботодавець додатково нараховує ЄСВ (22%): 4 400 грн
          </p>
          <p className="font-bold text-slate-900 dark:text-white pt-1">
            = Загальні витрати компанії на працівника: 24 400 грн
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'fuel-trip-tips',
    icon: Fuel,
    question: 'Як точніше оцінити реальну витрату палива автомобіля?',
    answer: (
      <div className="space-y-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <p>
          Паспортна витрата зазвичай на 15–25% оптимістичніша за реальну. Щоб отримати найточніший
          розрахунок:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>У міському циклі з заторами та світлофорами додавайте +2-3 л до трасового показника.</li>
          <li>Увімкнений клімат-контроль або кондиціонер додає ~0.5–1 л/100 км.</li>
          <li>Повне завантаження салону та багажник на даху додають до 15% до витрати палива.</li>
          <li>Дотримання крейсерської швидкості 90–100 км/год на трасі знижує витрату на 15–20% порівняно зі швидкістю 130 км/год.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'generator-efficiency',
    icon: Zap,
    question: 'Як знизити витрату палива та продовжити життя генератора?',
    answer: (
      <div className="space-y-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        <p>
          Для максимальної економічності та довговічності дотримуйтесь правил експлуатації:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Оптимальне навантаження:</strong> Генератор найбільш ефективний при навантаженні{' '}
            <strong>50–70%</strong> від його номінальної потужності. Робота на холостому ходу або
            постійне перевантаження різко збільшує витрату палива на кВт·год.
          </li>
          <li>
            <strong>Інверторні моделі:</strong> Для живлення лише електроніки, телевізора та котла
            інверторний генератор з Eco-режимом витрачає від 0.35–0.5 л/год, що в 2-3 рази менше за
            великі моделі.
          </li>
          <li>
            <strong>Регламент ТО:</strong> Перша заміна моторного мастила проводиться через 20 годин
            (обкатка), надалі — кожні 50–100 мотогодин роботи.
          </li>
        </ul>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>(['fop-rates', 'military-tax-update']);

  const toggle = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Довідка та актуальні ставки податків в Україні
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Корисна інформація, формули розрахунків та норми чинного законодавства
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {FAQS.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            const Icon = faq.icon;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                >
                  <span className="flex items-center gap-3 font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
