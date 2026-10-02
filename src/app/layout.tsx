import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Смарт Калькулятор Україна — Податки ФОП, ЗП, Паливо, Генератор',
  description:
    'Сучасний український калькулятор податків (ФОП 1, 2, 3 групи, Зарплата з урахуванням ПДФО 18% та ВЗ 5%), витрат палива для авто та вартості роботи генератора.',
  keywords: [
    'калькулятор податків Україна',
    'податки ФОП 3 група',
    'калькулятор зарплати 2024 2025 2026',
    'військовий збір 5 відсотків',
    'калькулятор палива',
    'витрати генератора вартість години',
    'ЄСВ 1760 грн',
  ],
  authors: [{ name: 'Смарт Калькулятор Україна' }],
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-adsense-account': 'ca-pub-7163481804401898',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7163481804401898"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
