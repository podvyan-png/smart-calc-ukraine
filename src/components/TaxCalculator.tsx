'use client';

import React, { useState } from 'react';
import {
  TAX_CONSTANTS,
  TaxRegime,
  calculateTaxes,
} from '@/lib/tax-constants';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import CopyButton from './CopyButton';
import {
  Coins,
  Building2,
  UserCheck,
  ShieldAlert,
  Percent,
  TrendingUp,
  FileSpreadsheet,
  Info,
  DollarSign,
  ArrowRightLeft,
} from 'lucide-react';

const REGIMES: { id: TaxRegime; title: string; subtitle: string }[] = [
  { id: 'fop1', title: 'ФОП 1 група', subtitle: 'Роздріб на ринку, побутові послуги' },
  { id: 'fop2', title: 'ФОП 2 група', subtitle: 'Послуги населенню, ресторанний бізнес' },
  { id: 'fop3', title: 'ФОП 3 група (5%)', subtitle: 'IT, консалтинг, фриланс, B2B' },
  { id: 'salary', title: 'Зарплата (Працівник)', subtitle: 'Офіційне працевлаштування' },
];

export default function TaxCalculator() {
  const [regime, setRegime] = useState<TaxRegime>('fop3');
  const [amount, setAmount] = useState<number>(75000);
  const [salaryMode, setSalaryMode] = useState<'gross' | 'net'>('gross');
  const [useNewMilitaryTax, setUseNewMilitaryTax] = useState<boolean>(true);
  const [fopMilitaryTaxEnabled, setFopMilitaryTaxEnabled] = useState<boolean>(true);

  const result = calculateTaxes(regime, amount, {
    salaryMode,
    useNewMilitaryTax,
    fopMilitaryTaxEnabled,
  });

  const getCopyText = (): string => {
    const title = REGIMES.find((r) => r.id === regime)?.title || 'Розрахунок податків';
    if (regime === 'salary') {
      return `🇺🇦 Розрахунок заробітної плати (Смарт Калькулятор Україна)
----------------------------------------
• Тип розрахунку: ${salaryMode === 'gross' ? 'Від нарахованої (Gross)' : 'Від чистої "на руки" (Net)'}
• Нарахована ЗП (Gross): ${formatCurrency(result.grossIncome)}
• ПДФО (18%): ${formatCurrency(result.pit || 0)}
• Військовий збір (${useNewMilitaryTax ? '5%' : '1.5%'}): ${formatCurrency(result.militaryTax)}
• Чиста зарплата "на руки": ${formatCurrency(result.netIncome)}
• ЄСВ роботодавця (22%): ${formatCurrency(result.employerEsv || 0)}
• Загальні витрати роботодавця: ${formatCurrency(result.employerTotalCost || 0)}
• Ефективне податкове навантаження: ${result.taxPercentage}%
----------------------------------------
Константи: МЗП = ${TAX_CONSTANTS.MZP} грн | ЄСВ мін. = ${TAX_CONSTANTS.ESV_MIN} грн`;
    }

    return `🇺🇦 Розрахунок податків ${title} (Смарт Калькулятор Україна)
----------------------------------------
• Щомісячний дохід: ${formatCurrency(result.grossIncome)}
• Єдиний податок (ЄП): ${formatCurrency(result.singleTax)}
• Військовий збір (ВЗ): ${formatCurrency(result.militaryTax)}
• ЄСВ (22% від МЗП): ${formatCurrency(result.esv)}
• Загалом податків у місяць: ${formatCurrency(result.totalTaxes)}
• Чистий дохід "на руки": ${formatCurrency(result.netIncome)}
• Реальне податкове навантаження: ${formatNumber(result.taxPercentage, 1)}%
----------------------------------------
Річний ліміт доходу: ${formatCurrency(result.yearlyLimit || 0)}
Константи: МЗП = ${TAX_CONSTANTS.MZP} грн | Прожитковий мінімум = ${TAX_CONSTANTS.LIVING_WAGE} грн | ЄСВ = ${TAX_CONSTANTS.ESV_MIN} грн`;
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val);
  };

  return (
    <div className="space-y-6">
      {/* Statutory Constants Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 dark:from-slate-800/80 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-bold">
            МЗП
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Мінімальна зарплата</p>
            <p className="font-bold text-slate-800 dark:text-slate-100">
              {formatCurrency(TAX_CONSTANTS.MZP, { decimals: 0 })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-600/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 font-bold">
            ПМ
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Прожитковий мінімум</p>
            <p className="font-bold text-slate-800 dark:text-slate-100">
              {formatCurrency(TAX_CONSTANTS.LIVING_WAGE, { decimals: 0 })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 font-bold">
            ЄСВ
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Мін. ЄСВ (22%)</p>
            <p className="font-bold text-slate-800 dark:text-slate-100">
              {formatCurrency(TAX_CONSTANTS.ESV_MIN, { decimals: 0 })}/міс
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Input & Options vs Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Regime Switcher */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Оберіть категорію оподаткування:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REGIMES.map((r) => {
                const isSelected = regime === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRegime(r.id);
                      if (r.id === 'salary' && amount > 150000) {
                        setAmount(30000);
                      } else if (r.id !== 'salary' && amount < 15000) {
                        setAmount(60000);
                      }
                    }}
                    type="button"
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 focus:outline-none ${
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm ring-1 ring-blue-500/20'
                        : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-semibold text-sm ${
                          isSelected
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {r.title}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {r.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Input */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="tax-amount"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {regime === 'salary'
                  ? salaryMode === 'gross'
                    ? 'Нарахована заробітна плата (Gross):'
                    : 'Бажана сума "на руки" (Net):'
                  : 'Очікуваний дохід у місяць:'}
              </label>

              {regime === 'salary' && (
                <button
                  type="button"
                  onClick={() => setSalaryMode(salaryMode === 'gross' ? 'net' : 'gross')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                  title="Змінити режим розрахунку"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  {salaryMode === 'gross' ? 'Перемкнути на "На руки"' : 'Перемкнути на "Gross"'}
                </button>
              )}
            </div>

            <div className="relative">
              <input
                id="tax-amount"
                type="number"
                min="0"
                step="500"
                value={amount === 0 ? '' : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="Введіть суму в грн"
                className="w-full text-2xl font-bold px-4 py-3.5 pr-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 dark:text-slate-500 select-none">
                ₴ / міс
              </span>
            </div>

            {/* Quick Amount Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-slate-400 self-center mr-1">Швидко:</span>
              {(regime === 'salary'
                ? [8000, 15000, 25000, 45000, 80000]
                : [20000, 50000, 100000, 200000, 500000]
              ).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleQuickAmount(preset)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                    amount === preset
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {formatNumber(preset, 0)} ₴
                </button>
              ))}
            </div>
          </div>

          {/* Tax Regulation Settings / Toggles */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-500" /> Параметри законодавства (Закон № 4015-IX)
            </h4>

            {regime === 'salary' ? (
              <label className="flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <span>
                  Військовий збір із зарплати:{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {useNewMilitaryTax ? '5% (Нова ставка)' : '1.5% (Попередня ставка)'}
                  </strong>
                </span>
                <input
                  type="checkbox"
                  checked={useNewMilitaryTax}
                  onChange={(e) => setUseNewMilitaryTax(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>
            ) : (
              <label className="flex items-center justify-between text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <span>
                  Військовий збір для ФОП:{' '}
                  <strong className="text-slate-900 dark:text-white">
                    {fopMilitaryTaxEnabled
                      ? regime === 'fop3'
                        ? '1% від доходу'
                        : '800 грн/міс (10% МЗП)'
                      : 'Вимкнено (0 грн)'}
                  </strong>
                </span>
                <input
                  type="checkbox"
                  checked={fopMilitaryTaxEnabled}
                  onChange={(e) => setFopMilitaryTaxEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
              </label>
            )}

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              * Відповідно до Закону № 4015-IX ставка військового збору для найманих працівників
              становить 5%, для ФОП 1-2 груп — 10% від МЗП (800 грн/міс), для ФОП 3 групи — 1% від
              доходу.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Calculation & Copy Result */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            {/* Primary Net Result Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-500/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                {regime === 'salary' ? 'Чиста заробітна плата' : 'Чистий прибуток "на руки"'}
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">
                  {formatCurrency(result.netIncome)}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                  {formatNumber(100 - result.taxPercentage, 1)}% залишок
                </span>
              </div>
              <p className="mt-2 text-xs text-blue-100/90 font-medium">
                {regime === 'salary'
                  ? `Після відрахування ПДФО (18%) та Військового збору (${useNewMilitaryTax ? '5%' : '1.5%'})`
                  : `Після сплати ЄП, ВЗ та обовʼязкового ЄСВ (${TAX_CONSTANTS.ESV_MIN} грн)`}
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-700/60 text-sm">
              {regime === 'salary' ? (
                <>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 dark:text-slate-300">Нараховано (Gross):</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatCurrency(result.grossIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      ПДФО (18%):
                    </span>
                    <span className="font-semibold">-{formatCurrency(result.pit || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-rose-600 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      Військовий збір ({useNewMilitaryTax ? '5%' : '1.5%'}):
                    </span>
                    <span className="font-semibold">-{formatCurrency(result.militaryTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-slate-600 dark:text-slate-400 text-xs">
                    <span>Разом податків із працівника:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                      -{formatCurrency(result.totalTaxes)}
                    </span>
                  </div>

                  {/* Employer Part */}
                  <div className="pt-3 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                          <Building2 className="w-4 h-4" /> Витрати роботодавця:
                        </span>
                        <span>{formatCurrency(result.employerTotalCost || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span>ЄСВ (22% понад оклад):</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          +{formatCurrency(result.employerEsv || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 dark:text-slate-300">
                      {regime === 'fop3'
                        ? 'Єдиний податок (5%):'
                        : regime === 'fop2'
                        ? 'Єдиний податок (20% МЗП):'
                        : 'Єдиний податок (10% ПМ):'}
                    </span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      -{formatCurrency(result.singleTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 dark:text-slate-300">
                      {regime === 'fop3' ? 'Військовий збір (1%):' : 'Військовий збір (10% МЗП):'}
                    </span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      -{formatCurrency(result.militaryTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-600 dark:text-slate-300">
                      ЄСВ (22% від МЗП {TAX_CONSTANTS.MZP} грн):
                    </span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      -{formatCurrency(result.esv)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 text-slate-800 dark:text-slate-200 font-semibold">
                    <span>Разом податкових платежів:</span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                      {formatCurrency(result.totalTaxes)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Visual Bar Breakdown */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Податкове навантаження</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {formatNumber(result.taxPercentage, 1)}%
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex">
                <div
                  style={{ width: `${Math.min(100, Math.max(5, 100 - result.taxPercentage))}%` }}
                  className="bg-blue-600 h-full transition-all duration-500"
                  title="Чистий дохід"
                />
                <div
                  style={{ width: `${Math.min(100, Math.max(2, result.taxPercentage))}%` }}
                  className="bg-rose-500 h-full transition-all duration-500"
                  title="Податки та збори"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> Чистий дохід
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Податки (ЄП, ВЗ, ЄСВ)
                </span>
              </div>
            </div>

            {/* FOP Annual Revenue Limit Progress */}
            {result.yearlyLimit && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Річний ліміт доходу:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.yearlyLimit, { decimals: 0 })}
                  </span>
                </div>
                {result.isOverLimit && (
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold text-[11px] pt-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>Увага! При такому доході річний ліміт буде перевищено.</span>
                  </div>
                )}
              </div>
            )}

            {/* Copy Button */}
            <div className="pt-2">
              <CopyButton
                getText={getCopyText}
                label="Скопіювати розрахунок податків"
                className="w-full py-3 text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
