import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const getCountryCode = (currencyCode) => {
  if (!currencyCode) return "us";
  const map = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    PLN: "pl",
    CHF: "ch",
    CAD: "ca",
    UAH: "ua",
  };
  return (
    map[currencyCode.toUpperCase()] || currencyCode.slice(0, 2).toLowerCase()
  );
};

function CurrencyInput({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  readOnly = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`bg-[#27323d] p-3 rounded-md flex flex-col gap-1 border border-gray-700 hover:border-gray-500 transition-colors relative ${isOpen ? "z-50" : "z-0"}`}
    >
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>Валюта</span>
        <span>Кількість</span>
      </div>
      <div className="flex justify-between items-center relative">
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer group p-1 rounded transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={`https://flagcdn.com/w40/${getCountryCode(currency)}.png`}
              alt="flag"
              className="w-6 h-4 object-cover rounded-sm"
            />
            <span className="text-white font-bold text-lg uppercase">
              {currency}
            </span>
            {isOpen ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>

          {isOpen && (
            <ul
              className="absolute left-0 top-full w-39 bg-[#1f2937] border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto py-1
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-600
                [&::-webkit-scrollbar-thumb]:rounded-full
                "
            >
              {currencyOptions.map((curr) => (
                <li
                  key={curr}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => {
                    onCurrencyChange && onCurrencyChange(curr);
                    setIsOpen(false);
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w40/${getCountryCode(curr)}.png`}
                    alt={curr}
                    className="w-5 h-3 object-cover rounded-sm"
                  />
                  <span
                    className={`uppercase font-medium ${curr === currency ? "text-[#facc15]" : "text-white"}`}
                  >
                    {curr}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          className="bg-transparent text-right text-white text-xl font-bold outline-none w-1/2 placeholder-gray-600"
          placeholder="0"
          value={amount === 0 ? "" : amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}

export default CurrencyInput;
