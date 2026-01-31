import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import CurrencyInput from "./components/CurrencyInput";
import CurrencyRates from "./components/CurrencyRates";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

const ALLOWED_CURRENCIES = [
  "uah",
  "usd",
  "eur",
  "pln",
  "gbp",
  "chf",
  "cad",
  "czk",
  "nok",
  "sek",
  "dkk",
];

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("uah");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = ALLOWED_CURRENCIES;

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(Number((amount * currencyInfo[to]).toFixed(2)));
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const currentRate = currencyInfo[to] ? currencyInfo[to].toFixed(2) : "...";

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#101419] p-4 lg:p-10">
      <div className="flex rounded-md flex-col lg:flex-row gap-6 items-stretch max-w-7xl w-full bg-[#181f26] p-6 lg:p-10">
        <div className="w-full lg:w-3/5 flex justify-center lg:border-r border-gray-700 lg:pr-10">
          <CurrencyRates />
        </div>

        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-xl text-white font-medium mb-1">
              Калькулятор валют
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Калькулятор у тестовому режимі!
            </p>

            <form
              className="flex flex-col gap-4 relative"
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <CurrencyInput
                amount={amount}
                currencyOptions={options}
                currency={from}
                onAmountChange={(val) => setAmount(val)}
                onCurrencyChange={(val) => setFrom(val)}
              />

              <div className="absolute left-1/2 top-[95px] -translate-x-1/2 -translate-y-1/2 z-100">
                <button
                  type="button"
                  className="bg-[#2a303c] border-4 border-[#111827] rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-all shadow-lg"
                  onClick={swap}
                >
                  <ArrowUpDown size={20} />
                </button>
              </div>

              <CurrencyInput
                amount={convertedAmount}
                currencyOptions={options}
                currency={to}
                onCurrencyChange={(val) => setTo(val)}
                onAmountChange={(val) => setConvertedAmount(val)}
              />

              <div className="flex justify-between items-center mt-2">
                <div className="text-gray-400 text-sm font-medium">
                  1 {from.toUpperCase()} = {currentRate} {to.toUpperCase()}
                </div>

                <button
                  type="submit"
                  className="bg-[#facc15] hover:bg-[#eab308] text-black font-bold py-3 px-8 rounded-full transition-all shadow-md active:scale-95"
                >
                  ПОМІНЯТИ ВАЛЮТУ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
