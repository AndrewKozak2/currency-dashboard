import React, { useState } from "react";
import useCurrencyInfo from "../hooks/useCurrencyInfo";

const CURRENCY_CONFIG = [
  { code: "usd", name: "USD/UAH", country: "us" },
  { code: "eur", name: "EUR/UAH", country: "eu" },
  { code: "pln", name: "PLN/UAH", country: "pl" },
  { code: "gbp", name: "GBP/UAH", country: "gb" },
  { code: "chf", name: "CHF/UAH", country: "ch" },
  { code: "cad", name: "CAD/UAH", country: "ca" },
  { code: "czk", name: "CZK/UAH", country: "cz" },
  { code: "nok", name: "NOK/UAH", country: "no" },
  { code: "sek", name: "SEK/UAH", country: "se" },
  { code: "dkk", name: "DKK/UAH", country: "dk" },
];

function CurrencyRates() {
  const rates = useCurrencyInfo("uah");
  const isLoaded = rates && Object.keys(rates).length > 0;

  const [isExpanded, setIsExpanded] = useState(false);

  const displayedCurrencies = isExpanded
    ? CURRENCY_CONFIG
    : CURRENCY_CONFIG.slice(0, 5);

  return (
    <div className="w-full text-white max-w-2xl rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Курс валют</h2>
        <span className="text-xs text-gray-500">За даними НБУ (simulated)</span>
      </div>

      <div className="flex justify-between text-gray-400 text-sm mb-4 px-2">
        <span className="w-1/3 text-left">Валюта</span>
        <div className="flex gap-6 w-1/3 justify-end">
          <span className="w-16 text-right">Купівля</span>
          <span className="w-16 text-right">Продаж</span>
        </div>
      </div>

      <ul className="flex flex-col gap-1 mb-4">
        {!isLoaded ? (
          <div className="text-center text-gray-500 py-10">Завантаження...</div>
        ) : (
          displayedCurrencies.map((item) => {
            const rawRate = rates[item.code];
            if (!rawRate) return null;

            const baseRate = 1 / rawRate;
            const buyPrice = (baseRate * 0.98).toFixed(2);
            const sellPrice = (baseRate * 1.02).toFixed(2);

            return (
              <li
                key={item.code}
                className="flex justify-between items-center py-3 px-2 border-b border-gray-800 last:border-none hover:bg-gray-800/50 rounded-lg transition-colors cursor-default"
              >
                <div className="flex items-center gap-3 w-1/3">
                  <img
                    src={`https://flagcdn.com/w40/${item.country}.png`}
                    alt={item.code}
                    className="w-6 h-4 object-cover rounded-sm shadow-sm opacity-80"
                  />
                  <span className="font-medium text-lg text-gray-200">
                    {item.name}
                  </span>
                </div>

                <div className="flex gap-6 w-1/3 justify-end text-lg">
                  <span className="w-16 text-right text-gray-300">
                    {buyPrice}
                  </span>
                  <span className="w-16 text-right text-emerald-400">
                    {sellPrice}
                  </span>
                </div>
              </li>
            );
          })
        )}
      </ul>

      <div className="mt-2 text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#d4af37] border border-[#d4af37] px-6 py-2 rounded-full hover:bg-[#d4af37] hover:text-black transition-all text-sm uppercase font-semibold"
        >
          {isExpanded ? "Сховати пропозиції" : "Побачити усі пропозиції"}
        </button>
      </div>
    </div>
  );
}

export default CurrencyRates;
