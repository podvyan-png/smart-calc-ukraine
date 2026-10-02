import { TAX_CONSTANTS } from './tax-constants';

export interface GeneratorPreset {
  id: string;
  name: string;
  powerKw: string;
  consumptionLPerHour: number;
  description: string;
}

export const GENERATOR_PRESETS: GeneratorPreset[] = [
  {
    id: 'inverter-1kw',
    name: 'Інверторний 1-1.2 кВт',
    powerKw: '1.0 кВт',
    consumptionLPerHour: 0.5,
    description: 'Для роутера, ноутбуків, освітлення, котла',
  },
  {
    id: 'gasoline-3kw',
    name: 'Бензиновий 2.8 - 3.2 кВт',
    powerKw: '3.0 кВт',
    consumptionLPerHour: 1.1,
    description: 'Найпопулярніший домашній вибір (холодильник, світло, техніка)',
  },
  {
    id: 'gasoline-5kw',
    name: 'Бензиновий 5.0 - 6.5 кВт',
    powerKw: '5.5 кВт',
    consumptionLPerHour: 2.1,
    description: 'Для приватного будинку або невеликого офісу/кавʼярні',
  },
  {
    id: 'diesel-5kw',
    name: 'Дизельний 5.0 - 7.0 кВт',
    powerKw: '6.0 кВт',
    consumptionLPerHour: 1.5,
    description: 'Економічний дизель для тривалої безперервної роботи',
  },
];

export interface GeneratorCalculationResult {
  consumptionPerHour: number;
  fuelPrice: number;
  hoursPerDay: number;
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  fuelLitersPerDay: number;
  fuelLitersPerMonth: number;
  gridComparisonCostMonth: number;
  extraAutonomyCostMonth: number;
}

export function calculateGenerator(
  consumptionPerHour: number,
  fuelPrice: number,
  hoursPerDay: number,
  averageKwPower: number = 2.5
): GeneratorCalculationResult {
  const c = Math.max(0, isNaN(consumptionPerHour) ? 0 : consumptionPerHour);
  const p = Math.max(0, isNaN(fuelPrice) ? 0 : fuelPrice);
  const h = Math.min(24, Math.max(0, isNaN(hoursPerDay) ? 0 : hoursPerDay));

  const costPerHour = c * p;
  const fuelLitersPerDay = c * h;
  const costPerDay = costPerHour * h;
  const fuelLitersPerMonth = fuelLitersPerDay * 30;
  const costPerMonth = costPerDay * 30;

  // Порівняння з центральною електромережею (тариф 4.32 грн/кВт·год)
  const totalKwhPerMonth = averageKwPower * h * 30;
  const gridComparisonCostMonth = totalKwhPerMonth * TAX_CONSTANTS.GRID_ELECTRICITY_TARIFF;
  const extraAutonomyCostMonth = Math.max(0, costPerMonth - gridComparisonCostMonth);

  return {
    consumptionPerHour: c,
    fuelPrice: p,
    hoursPerDay: h,
    costPerHour: Math.round(costPerHour * 100) / 100,
    costPerDay: Math.round(costPerDay * 100) / 100,
    costPerMonth: Math.round(costPerMonth * 100) / 100,
    fuelLitersPerDay: Math.round(fuelLitersPerDay * 10) / 10,
    fuelLitersPerMonth: Math.round(fuelLitersPerMonth * 10) / 10,
    gridComparisonCostMonth: Math.round(gridComparisonCostMonth * 100) / 100,
    extraAutonomyCostMonth: Math.round(extraAutonomyCostMonth * 100) / 100,
  };
}
