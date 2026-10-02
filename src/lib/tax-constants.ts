export const TAX_CONSTANTS = {
  MZP: 8000, // Мінімальна заробітна плата, грн
  LIVING_WAGE: 3028, // Прожитковий мінімум для працездатних осіб, грн
  ESV_MIN: 1760, // 22% від 8000 грн
  ESV_RATE: 0.22,
  PIT_RATE: 0.18, // ПДФО 18%
  MILITARY_TAX_RATE_DEFAULT: 0.05, // 5% згідно із Законом № 4015-IX
  MILITARY_TAX_RATE_OLD: 0.015, // 1.5%
  // Військовий збір для ФОП 1-2 груп: 10% від МЗП
  MILITARY_TAX_FOP_1_2: 800, // 10% від 8000 грн
  // Військовий збір для ФОП 3 групи: 1% від доходу
  MILITARY_TAX_FOP_3_RATE: 0.01,
  // Ставки ЄП
  EP_GROUP_1_RATE: 0.10, // до 10% від прожиткового мінімуму
  EP_GROUP_1_AMOUNT: 302.80,
  EP_GROUP_2_RATE: 0.20, // до 20% від МЗП
  EP_GROUP_2_AMOUNT: 1600.00,
  EP_GROUP_3_RATE: 0.05, // 5% від доходу
  // Річні ліміти доходів ФОП (2024–2026)
  LIMITS: {
    GROUP_1: 1336000, // 167 МЗП
    GROUP_2: 6672000, // 834 МЗП
    GROUP_3: 9336000, // 1167 МЗП
  },
  // Тариф електроенергії для населення
  GRID_ELECTRICITY_TARIFF: 4.32, // грн/кВт·год
};

export type TaxRegime = 'fop1' | 'fop2' | 'fop3' | 'salary';

export interface TaxCalculationResult {
  regime: TaxRegime;
  grossIncome: number;
  singleTax: number;
  militaryTax: number;
  esv: number;
  totalTaxes: number;
  netIncome: number;
  taxPercentage: number;
  employerEsv?: number;
  employerTotalCost?: number;
  pit?: number;
  yearlyLimit?: number;
  isOverLimit?: boolean;
}

export function calculateTaxes(
  regime: TaxRegime,
  amount: number,
  options: {
    salaryMode?: 'gross' | 'net';
    useNewMilitaryTax?: boolean;
    fopMilitaryTaxEnabled?: boolean;
  } = {}
): TaxCalculationResult {
  const {
    salaryMode = 'gross',
    useNewMilitaryTax = true,
    fopMilitaryTaxEnabled = true,
  } = options;

  const validAmount = Math.max(0, isNaN(amount) ? 0 : amount);

  if (regime === 'fop1') {
    const singleTax = TAX_CONSTANTS.EP_GROUP_1_AMOUNT;
    const esv = TAX_CONSTANTS.ESV_MIN;
    const militaryTax = fopMilitaryTaxEnabled ? TAX_CONSTANTS.MILITARY_TAX_FOP_1_2 : 0;
    const totalTaxes = singleTax + esv + militaryTax;
    const netIncome = Math.max(0, validAmount - totalTaxes);
    const taxPercentage = validAmount > 0 ? (totalTaxes / validAmount) * 100 : 0;
    const yearlyLimit = TAX_CONSTANTS.LIMITS.GROUP_1;

    return {
      regime,
      grossIncome: validAmount,
      singleTax,
      militaryTax,
      esv,
      totalTaxes,
      netIncome,
      taxPercentage,
      yearlyLimit,
      isOverLimit: validAmount * 12 > yearlyLimit,
    };
  }

  if (regime === 'fop2') {
    const singleTax = TAX_CONSTANTS.EP_GROUP_2_AMOUNT;
    const esv = TAX_CONSTANTS.ESV_MIN;
    const militaryTax = fopMilitaryTaxEnabled ? TAX_CONSTANTS.MILITARY_TAX_FOP_1_2 : 0;
    const totalTaxes = singleTax + esv + militaryTax;
    const netIncome = Math.max(0, validAmount - totalTaxes);
    const taxPercentage = validAmount > 0 ? (totalTaxes / validAmount) * 100 : 0;
    const yearlyLimit = TAX_CONSTANTS.LIMITS.GROUP_2;

    return {
      regime,
      grossIncome: validAmount,
      singleTax,
      militaryTax,
      esv,
      totalTaxes,
      netIncome,
      taxPercentage,
      yearlyLimit,
      isOverLimit: validAmount * 12 > yearlyLimit,
    };
  }

  if (regime === 'fop3') {
    const singleTax = validAmount * TAX_CONSTANTS.EP_GROUP_3_RATE;
    const esv = TAX_CONSTANTS.ESV_MIN;
    const militaryTax = fopMilitaryTaxEnabled
      ? validAmount * TAX_CONSTANTS.MILITARY_TAX_FOP_3_RATE
      : 0;
    const totalTaxes = singleTax + esv + militaryTax;
    const netIncome = Math.max(0, validAmount - totalTaxes);
    const taxPercentage = validAmount > 0 ? (totalTaxes / validAmount) * 100 : 0;
    const yearlyLimit = TAX_CONSTANTS.LIMITS.GROUP_3;

    return {
      regime,
      grossIncome: validAmount,
      singleTax,
      militaryTax,
      esv,
      totalTaxes,
      netIncome,
      taxPercentage,
      yearlyLimit,
      isOverLimit: validAmount * 12 > yearlyLimit,
    };
  }

  // regime === 'salary'
  const milRate = useNewMilitaryTax
    ? TAX_CONSTANTS.MILITARY_TAX_RATE_DEFAULT
    : TAX_CONSTANTS.MILITARY_TAX_RATE_OLD;
  const pitRate = TAX_CONSTANTS.PIT_RATE; // 18%
  const totalDeductionRate = pitRate + milRate; // 23% або 19.5%

  let gross = validAmount;
  let net = 0;

  if (salaryMode === 'net') {
    // Net = Gross * (1 - totalDeductionRate)
    // Gross = Net / (1 - totalDeductionRate)
    gross = validAmount / (1 - totalDeductionRate);
  }

  const pit = gross * pitRate;
  const militaryTax = gross * milRate;
  const totalEmployeeTaxes = pit + militaryTax;
  net = gross - totalEmployeeTaxes;

  // Роботодавець нараховує ЄСВ 22% понад оклад
  // База не може бути нижче МЗП (8000 грн) при основному місці роботи
  const employerEsv = Math.max(gross * TAX_CONSTANTS.ESV_RATE, TAX_CONSTANTS.ESV_MIN);
  const employerTotalCost = gross + employerEsv;

  const totalTaxesAll = totalEmployeeTaxes + employerEsv;
  const taxPercentage = employerTotalCost > 0 ? (totalTaxesAll / employerTotalCost) * 100 : 0;

  return {
    regime,
    grossIncome: Math.round(gross * 100) / 100,
    singleTax: 0,
    pit: Math.round(pit * 100) / 100,
    militaryTax: Math.round(militaryTax * 100) / 100,
    esv: Math.round(employerEsv * 100) / 100, // Відображаємо ЄСВ
    employerEsv: Math.round(employerEsv * 100) / 100,
    employerTotalCost: Math.round(employerTotalCost * 100) / 100,
    totalTaxes: Math.round(totalEmployeeTaxes * 100) / 100,
    netIncome: Math.round(net * 100) / 100,
    taxPercentage: Math.round(taxPercentage * 10) / 10,
  };
}
