export interface FuelPreset {
  id: string;
  name: string;
  label: string;
  price: number; // грн/л
  badge?: string;
}

export const FUEL_PRESETS: FuelPreset[] = [
  { id: 'a95', name: 'Бензин А-95', label: 'А-95', price: 56.80, badge: 'Популярне' },
  { id: 'a95_plus', name: 'А-95 Преміум', label: 'А-95+', price: 59.90 },
  { id: 'diesel', name: 'Дизель (ДП)', label: 'Дизель', price: 53.40, badge: 'Економ' },
  { id: 'lpg', name: 'Газ (LPG)', label: 'Газ', price: 33.90, badge: 'Вигідно' },
  { id: 'electric', name: 'Електро (кВт)', label: 'Електро', price: 15.00 },
];

export interface FuelCalculationResult {
  distance: number;
  consumption: number;
  pricePerLiter: number;
  passengers: number;
  fuelNeededLiters: number;
  totalCost: number;
  costPerPassenger: number;
  costPerKm: number;
}

export function calculateFuel(
  distance: number,
  consumption: number,
  pricePerLiter: number,
  passengers: number
): FuelCalculationResult {
  const d = Math.max(0, isNaN(distance) ? 0 : distance);
  const c = Math.max(0, isNaN(consumption) ? 0 : consumption);
  const p = Math.max(0, isNaN(pricePerLiter) ? 0 : pricePerLiter);
  const pass = Math.max(1, isNaN(passengers) || passengers <= 0 ? 1 : Math.round(passengers));

  const fuelNeededLiters = (d / 100) * c;
  const totalCost = fuelNeededLiters * p;
  const costPerPassenger = pass > 0 ? totalCost / pass : totalCost;
  const costPerKm = d > 0 ? totalCost / d : 0;

  return {
    distance: d,
    consumption: c,
    pricePerLiter: p,
    passengers: pass,
    fuelNeededLiters: Math.round(fuelNeededLiters * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerPassenger: Math.round(costPerPassenger * 100) / 100,
    costPerKm: Math.round(costPerKm * 100) / 100,
  };
}
