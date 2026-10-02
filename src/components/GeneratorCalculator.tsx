'use client';

import React, { useState } from 'react';
import {
  GENERATOR_PRESETS,
  calculateGenerator,
} from '@/lib/generator-calculator';
import { FUEL_PRESETS } from '@/lib/fuel-calculator';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { TAX_CONSTANTS } from '@/lib/tax-constants';
import CopyButton from './CopyButton';
import {
  Zap,
  Clock,
  Fuel,
  Flame,
  Calendar,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

export default function GeneratorCalculator() {
  const [consumptionPerHour, setConsumptionPerHour] = useState<number>(1.1);
  const [fuelPrice, setFuelPrice] = useState<number>(56.80);
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [selectedGeneratorPresetId, setSelectedGeneratorPresetId] = useState<string>('gasoline-3kw');
  const [averagePowerKw, setAveragePowerKw] = useState<number>(2.5);

  const result = calculateGenerator(consumptionPerHour, fuelPrice, hoursPerDay, averagePowerKw);

  const handleSelectGenerator = (preset: typeof GENERATOR_PRESETS[0]) => {
    setSelectedGeneratorPresetId(preset.id);
    setConsumptionPerHour(preset.consumptionLPerHour);
    if (preset.id === 'inverter-1kw') setAveragePowerKw(0.8);
    else if (preset.id === 'gasoline-3kw') setAveragePowerKw(2.2);
    else if (preset.id === 'gasoline-5kw') setAveragePowerKw(4.5);
    else if (preset.id === 'diesel-5kw') setAveragePowerKw(4.5);
  };

  const getCopyText = (): string => {
    return `⚡ Розрахунок роботи генератора (Смарт Калькулятор Україна)
----------------------------------------
• Витрата палива: ${consumptionPerHour} л/год
• Ціна палива: ${formatCurrency(fuelPrice)}/л
• Час роботи на добу: ${hoursPerDay} год/день
----------------------------------------
• Вартість 1 години роботи: ${formatCurrency(result.costPerHour)}
• Витрати на добу: ${formatCurrency(result.costPerDay)} (${formatNumber(result.fuelLitersPerDay, 1)} л)
• Витрати за місяць (30 днів): ${formatCurrency(result.costPerMonth)} (${formatNumber(result.fuelLitersPerMonth, 1)} л)
----------------------------------------
Порівняння з тарифом мережі (${TAX_CONSTANTS.GRID_ELECTRICITY_TARIFF} грн/кВт·год):
• Еквівалент з розетки за місяць: ${formatCurrency(result.gridComparisonCostMonth)}
• Переплата за автономність: ${formatCurrency(result.extraAutonomyCostMonth)}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Generator Models Presets */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Оберіть тип генератора або вкажіть власну витрату:
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GENERATOR_PRESETS.map((preset) => {
                const isSelected = selectedGeneratorPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectGenerator(preset)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 ring-1 ring-amber-500/20 shadow-sm'
                        : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {preset.name}
                      </span>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">
                        {preset.consumptionLPerHour} л/год
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consumption & Fuel price inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fuel Consumption */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <label
                htmlFor="gen-consumption"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-rose-500" />
                Витрата палива (л/год):
              </label>

              <div className="relative">
                <input
                  id="gen-consumption"
                  type="number"
                  min="0.1"
                  max="15"
                  step="0.1"
                  value={consumptionPerHour === 0 ? '' : consumptionPerHour}
                  onChange={(e) => {
                    setConsumptionPerHour(parseFloat(e.target.value) || 0);
                    setSelectedGeneratorPresetId('custom');
                  }}
                  className="w-full text-xl font-bold px-4 py-3 pr-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-500 select-none">
                  л / год
                </span>
              </div>

              <div className="flex gap-1">
                {[0.5, 0.8, 1.1, 1.8, 2.5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setConsumptionPerHour(val);
                      setSelectedGeneratorPresetId('custom');
                    }}
                    className={`text-[11px] flex-1 py-1 rounded border text-center transition-all ${
                      consumptionPerHour === val
                        ? 'bg-amber-500 text-white border-amber-500 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {val}л
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Price */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <label
                htmlFor="gen-fuel-price"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Fuel className="w-4 h-4 text-blue-500" />
                Ціна палива (грн/л):
              </label>

              <div className="relative">
                <input
                  id="gen-fuel-price"
                  type="number"
                  min="0"
                  step="0.5"
                  value={fuelPrice === 0 ? '' : fuelPrice}
                  onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                  className="w-full text-xl font-bold px-4 py-3 pr-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-500 select-none">
                  грн / л
                </span>
              </div>

              <div className="flex gap-1.5">
                {[
                  { label: 'А-95 (56.8 ₴)', val: 56.8 },
                  { label: 'Дизель (53.4 ₴)', val: 53.4 },
                  { label: 'Газ (33.9 ₴)', val: 33.9 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFuelPrice(item.val)}
                    className={`text-[10px] sm:text-[11px] flex-1 py-1 rounded border text-center transition-all ${
                      fuelPrice === item.val
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Operating Hours per Day Slider & Presets */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="gen-hours-slider"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Годин роботи на добу:
              </label>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {hoursPerDay} {hoursPerDay === 1 ? 'година' : hoursPerDay < 5 ? 'години' : 'годин'}
              </span>
            </div>

            <input
              id="gen-hours-slider"
              type="range"
              min="1"
              max="24"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 1)}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-slate-400 self-center mr-1">Режими відключень:</span>
              {[
                { label: '3 год (легкі графіки)', val: 3 },
                { label: '6 год (графік 4/2)', val: 6 },
                { label: '10 год (жорсткі графіки)', val: 10 },
                { label: '16 год (аварійні)', val: 16 },
                { label: '24 год (цілодобово)', val: 24 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setHoursPerDay(p.val)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    hoursPerDay === p.val
                      ? 'bg-amber-500 text-white border-amber-500 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            {/* Primary Monthly Cost Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">
                Витрати на місяць (30 днів)
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">
                  {formatCurrency(result.costPerMonth)}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                  {formatNumber(result.fuelLitersPerMonth, 0)} л палива
                </span>
              </div>
              <p className="mt-2 text-xs text-amber-50/90 font-medium">
                При роботі {hoursPerDay} год/добу з витратою {consumptionPerHour} л/год
              </p>
            </div>

            {/* Quick Metrics: Hour & Day */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-xs text-slate-500 dark:text-slate-400">1 година роботи</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatCurrency(result.costPerHour)}
                </p>
                <span className="text-[11px] text-slate-400">{consumptionPerHour} л палива</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-xs text-slate-500 dark:text-slate-400">На добу ({hoursPerDay} год)</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatCurrency(result.costPerDay)}
                </p>
                <span className="text-[11px] text-slate-400">{result.fuelLitersPerDay} л / добу</span>
              </div>
            </div>

            {/* Comparison with Grid Tariff */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Порівняння з центральною електромережею</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Тариф для населення: <strong>{TAX_CONSTANTS.GRID_ELECTRICITY_TARIFF} грн/кВт·год</strong>. Такий самий обсяг електроенергії від розетки коштував би близько{' '}
                <strong>{formatCurrency(result.gridComparisonCostMonth)}</strong> / місяць.
              </p>
              <div className="pt-1 flex justify-between items-center text-amber-700 dark:text-amber-400 font-semibold border-t border-blue-200/60 dark:border-blue-900/40">
                <span>Плата за незалежність:</span>
                <span>+{formatCurrency(result.extraAutonomyCostMonth)}</span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="pt-2">
              <CopyButton
                getText={getCopyText}
                label="Скопіювати розрахунок генератора"
                className="w-full py-3 text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
