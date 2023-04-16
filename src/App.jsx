import React from "react";
import "./App.css";
import Header from "./assets/components/header";

export default function App() {
  const [ammount, setAmmount] = React.useState("");
  const [caseCost, setCaseCost] = React.useState("");
  const [maxCases, setMaxCases] = React.useState("");
  const [, setTotalCost] = React.useState("0");
  const [headingText, setHeadingText] = React.useState(
    "Enter your custom values!"
  );

  function calculateMaxCases(ammount, caseCost) {
    const maxCases = Math.floor(ammount / (caseCost + 2.5));
    const addTax = maxCases * 1.0825 + maxCases;

    const totalCost = addTax + maxCases;

    return {
      maxCases: maxCases,
      totalCost: totalCost.toFixed(2),
    };
  }

  function handleKeyPress(e) {
    const enteredChar = e.key;
    const isNumber = /^[0-9]$/;
    if (
      !isNumber.test(enteredChar) &&
      enteredChar !== "Backspace" &&
      enteredChar !== "Delete" &&
      enteredChar !== "ArrowLeft" &&
      enteredChar !== "ArrowRight" &&
      enteredChar !== "." &&
      enteredChar !== "Tab"
    ) {
      e.preventDefault();
    }
  }
  function handleButtonClick() {
    const result = calculateMaxCases(parseFloat(ammount), parseFloat(caseCost));
    if (isNaN(result.maxCases) || isNaN(result.totalCost)) {
      setHeadingText("Please enter a number.");
      return;
    }

    setMaxCases(result.maxCases);
    setTotalCost(result.totalCost);
    setHeadingText(`You can buy ${result.maxCases} cases.`);
  }

  return (
    <div className="text-center">
      <Header />
      <div className="text-slate-200 flex">
        <div className="w-full p-32 grid-container sm:m-18 grid grid-cols-2 align-middle gap-4 rounded-lg">
          <div className="grid w-max p-24 gap-4 bg-slate-600 rounded-xl shadow-zinc-600 shadow-2xl border-2 shrink">
            <label
              htmlFor="ammount"
              className="font-noto text-3xl font-semibold h-12 pt-2 align-middle"
            >
              Total Money: $
            </label>
            <input
              type="text"
              id="ammount"
              placeholder="0.00"
              value={ammount}
              onKeyDown={handleKeyPress}
              onChange={(e) => setAmmount(e.target.value)}
              className="w-28 h-12 text-xl font-noto placeholder-stone-600 outline-4 outline-amber-400 text-right"
            />
            <label
              htmlFor="caseCost"
              className="font-noto text-3xl text-center font-semibold h-12 p-2"
            >
              Case Cost: $
            </label>
            <input
              type="text"
              id="caseCost"
              value={caseCost}
              placeholder="0.00"
              onKeyDown={handleKeyPress}
              onChange={(e) => setCaseCost(e.target.value)}
              className="w-28 h-12 text-xl font-noto placeholder-stone-600 outline-amber-400 text-right"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 col-span-2 w-full h-12 text-zinc-800 font-bold mt-8 text-2xl rounded"
              value={maxCases}
              onClick={handleButtonClick}
            >
              Calculate
            </button>
          </div>
        </div>
        <div className="bg-none w-full mr-12 p-32">
          <h3 className="font-noto text-5xl lg:text-6xl align-middle px-24 py-32 border-t-8">
            {headingText}
          </h3>
        </div>
      </div>
    </div>
  );
}
