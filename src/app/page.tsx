'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import TabsNav, { TabId } from '@/components/TabsNav';
import TaxCalculator from '@/components/TaxCalculator';
import FuelCalculator from '@/components/FuelCalculator';
import GeneratorCalculator from '@/components/GeneratorCalculator';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('taxes');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Tab switcher */}
        <section aria-label="Перемикач калькуляторів">
          <TabsNav activeTab={activeTab} onChange={setActiveTab} />
        </section>

        {/* Dynamic Calculator Content */}
        <section
          aria-label="Вміст активного калькулятора"
          className="transition-all duration-300"
        >
          {activeTab === 'taxes' && <TaxCalculator />}
          {activeTab === 'fuel' && <FuelCalculator />}
          {activeTab === 'generator' && <GeneratorCalculator />}
        </section>

        {/* FAQ & Guide for SEO */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
