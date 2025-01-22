'use client';

import React, { useState } from 'react';

type StateShippingRate = {
  state: string;
  rate: number;
};

const shippingRates: StateShippingRate[] = [
  { state: 'Lagos', rate: 20 },
  { state: 'Abuja', rate: 25 },
  { state: 'Rivers', rate: 30 },
  { state: 'Kano', rate: 35 },
];

interface ShippingCalculatorProps {
  onShippingSelect: (state: string, rate: number) => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onShippingSelect }) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [shippingRate, setShippingRate] = useState<number | null>(null);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedState(selected);

    const rate = shippingRates.find((item) => item.state === selected)?.rate || 0;
    setShippingRate(rate);

    onShippingSelect(selected, rate);
  };

  return (
    <div className="shipping-calculator w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Shipping Calculator</h3>
      <div className="relative">
        <label
          htmlFor="state-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select your state:
        </label>
        <select
          id="state-select"
          className="w-full rounded-lg bg-white text-gray-900 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 transition-all cursor-pointer hover:bg-blue-50"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">-- Select State --</option>
          {shippingRates.map((item) => (
            <option key={item.state} value={item.state}>
              {item.state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShippingCalculator;