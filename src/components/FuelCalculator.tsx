'use client';

import React, { useState } from 'react';
import { FUEL_PRESETS, calculateFuel } from '@/lib/fuel-calculator';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import CopyButton from './CopyButton';
import {
  Fuel,
  Navigation,
  Gauge,
  Users,
  CircleDollarSign,
  MapPin,
  TrendingDown,
  Repeat,
  Sparkles,
} from 'lucide-react';

const POPULAR_ROUTES = [
  { name: 'Київ ⇄ Житомир', dist: 140 },
  { name: 'Київ ⇄ Одеса', dist: 480 },
  { name: 'Київ ⇄ Львів', dist: 540 },
  { name: 'Київ ⇄ Дніпро', dist: 490 },
  { name: 'Львів ⇄ Івано-Франківськ', dist: 135 },
];

export default function FuelCalculator() {
  const [distance, setDistance] = useState<number>(350);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [consumption, setConsumption] = useState<number>(8.0);
  const [pricePerLiter, setPricePerLiter] = useState<number>(56.80);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('a95');
  const [passengers, setPassengers] = useState<number>(1);

  const effectiveDistance = isRoundTrip ? distance * 2 : distance;
  const result = calculateFuel(effectiveDistance, consumption, pricePerLiter, passengers);

  const handleSelectPreset = (id: string, price: number) => {
    setSelectedPresetId(id);
    setPricePerLiter(price);
  };

  const getCopyText = (): string => {
    return `⛽ Розрахунок витрат на паливо (Смарт Калькулятор Україна)
----------------------------------------
• Маршрут / Відстань: ${effectiveDistance} км ${isRoundTrip ? '(туди й назад)' : '(в один бік)'}
• Витрата палива: ${consumption} л/100 км
• Ціна палива: ${formatCurrency(pricePerLiter)}/л
• Кількість пасажирів: ${passengers} ос.
----------------------------------------
• Необхідно палива: ${formatNumber(result.fuelNeededLiters, 2)} л
• Загальна вартість поїздки: ${formatCurrency(result.totalCost)}
• Вартість на 1 пасажира: ${formatCurrency(result.costPerPassenger)}
• Собівартість 1 км: ${formatCurrency(result.costPerKm)}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Distance Input */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="fuel-distance"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Відстань поїздки:
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                <Repeat className={`w-3.5 h-3.5 ${isRoundTrip ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                <span>В обидва боки (x2)</span>
                <input
                  type="checkbox"
                  checked={isRoundTrip}
                  onChange={(e) => setIsRoundTrip(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="relative">
              <input
                id="fuel-distance"
                type="number"
                min="1"
                step="10"
                value={distance === 0 ? '' : distance}
                onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                placeholder="Введіть км"
                className="w-full text-2xl font-bold px-4 py-3.5 pr-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 dark:text-slate-500 select-none">
                км {isRoundTrip && <span className="text-xs text-blue-600 dark:text-blue-400">(туди: {distance} км)</span>}
              </span>
            </div>

            {/* Popular Ukrainian Routes */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" /> Популярні напрямки по Україні:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_ROUTES.map((route) => (
                  <button
                    key={route.name}
                    type="button"
                    onClick={() => {
                      setDistance(route.dist);
                      setIsRoundTrip(false);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      distance === route.dist && !isRoundTrip
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {route.name} ({route.dist} км)
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Consumption & Fuel Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Consumption Input */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <label
                htmlFor="fuel-consumption"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Gauge className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Витрата палива:
              </label>

              <div className="relative">
                <input
                  id="fuel-consumption"
                  type="number"
                  min="1"
                  max="40"
                  step="0.1"
                  value={consumption === 0 ? '' : consumption}
                  onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                  className="w-full text-xl font-bold px-4 py-3 pr-20 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-500 select-none">
                  л / 100 км
                </span>
              </div>

              {/* Consumption presets */}
              <div className="flex gap-1.5">
                {[
                  { label: 'Економ 5.5', val: 5.5 },
                  { label: 'Траса 7.0', val: 7.0 },
                  { label: 'Місто 9.5', val: 9.5 },
                  { label: 'SUV 11.5', val: 11.5 },
                ].map((c) => (
                  <button
                    key={c.val}
                    type="button"
                    onClick={() => setConsumption(c.val)}
                    className={`text-[11px] flex-1 py-1 rounded-md border text-center transition-all ${
                      consumption === c.val
                        ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Passengers Counter */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Кількість пасажирів:
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center border border-slate-200 dark:border-slate-600"
                >
                  -
                </button>
                <div className="flex-1 text-center py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {passengers}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    {passengers === 1 ? 'Тільки водій' : `${passengers} осіб у машині`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(9, passengers + 1))}
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center border border-slate-200 dark:border-slate-600"
                >
                  +
                </button>
              </div>

              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPassengers(num)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      passengers === num
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {num} {num === 1 ? 'особа' : 'особи'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fuel Price & Quick Presets */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="fuel-price"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Fuel className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Ціна палива (грн/л):
              </label>
              <span className="text-xs text-slate-400">Швидкі пресети АЗС України</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FUEL_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id, preset.price)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500 dark:border-rose-400 ring-1 ring-rose-500/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {preset.label}
                      </span>
                      {preset.badge && (
                        <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-bold">
                          {preset.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {preset.price.toFixed(2)} ₴
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <input
                id="fuel-price"
                type="number"
                min="0"
                step="0.1"
                value={pricePerLiter === 0 ? '' : pricePerLiter}
                onChange={(e) => {
                  setPricePerLiter(parseFloat(e.target.value) || 0);
                  setSelectedPresetId('custom');
                }}
                className="w-full text-lg font-bold px-4 py-2.5 pr-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 select-none">
                грн / л
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            {/* Primary Total Cost Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 text-white shadow-lg shadow-amber-500/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">
                Загальна вартість поїздки
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">
                  {formatCurrency(result.totalCost)}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                  {formatNumber(result.fuelNeededLiters, 1)} л палива
                </span>
              </div>
              <p className="mt-2 text-xs text-amber-50/90 font-medium">
                Відстань {effectiveDistance} км • {consumption} л/100км • {pricePerLiter.toFixed(2)} грн/л
              </p>
            </div>

            {/* Split per passenger highlight */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Вартість з 1 пасажира</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.costPerPassenger)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {passengers} {passengers === 1 ? 'особа' : 'осіб'}
              </span>
            </div>

            {/* Detailed Metrics List */}
            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-700/60 text-sm">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 dark:text-slate-300">Потрібно палива:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatNumber(result.fuelNeededLiters, 2)} літрів
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 dark:text-slate-300">Собівартість 1 км шляху:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(result.costPerKm)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 dark:text-slate-300">Орієнтовний час у дорозі:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  ~{(effectiveDistance / 75).toFixed(1)} год (при сер. 75 км/год)
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="pt-2">
              <CopyButton
                getText={getCopyText}
                label="Скопіювати розрахунок поїздки"
                className="w-full py-3 text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
