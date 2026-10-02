'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  getText: () => string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  getText,
  label = 'Скопіювати результат',
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = getText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border active:scale-95 shadow-sm ${
        copied
          ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-slate-200/50 dark:shadow-none'
      } ${className}`}
      title="Скопіювати розрахунок у буфер обміну"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-white stroke-[2.5]" />
          <span>Скопійовано в буфер!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-blue-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
