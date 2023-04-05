import React from "react";
import "./App.css";
import Header from "./assets/components/header";

export default function App() {
  const [ammount, setAmmount] = React.useState("");
  const [caseCost, setCaseCost] = React.useState("");
  const [maxCases, setMaxCases] = React.useState("");
  const [totalCost, setTotalCost] = React.useState("0");
  const [headingText, setHeadingText] = React.useState("Enter custom values!");

  function calculateMaxCases(ammount, caseCost) {
    const maxCases = Math.floor(ammount / (caseCost + 2.65));
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
    setHeadingText("You can buy " + result.maxCases + " cases.");
  }

  return (
    <div className="text-center">
      <Header />
      <div className="text-slate-200 mx-5 mt-12 lg:mt-12 mb-20 lg:mb-32 flex-col justify-center pb-40">
        <div className="pt-10 py-auto px-40">
          <div className="bg-none pt-20 py-64 rounded shrink">
            <h3 className="font-noto text-5xl pb-32 sca font-bold leading-snug text-center lg:text-6xl self-center">
              {headingText}
            </h3>
            <label
              htmlFor="ammount"
              className="justify-center static font-noto flex-none text-3xl mt-6 py-1 shrink-0 text-center font-semibold leading-snug self-center"
            >
              Total Money: <em>$ </em>
            </label>
            <input
              type="text"
              id="ammount"
              placeholder="0.00"
              value={ammount}
              onKeyDown={handleKeyPress}
              onChange={(e) => setAmmount(e.target.value)}
              className="w-28 flex-col text-xl font-noto flex-none"
            />
            <label
              htmlFor="caseCost"
              className="font-noto text-3xl mt-6 py-1 text-center font-semibold leading-snug self-center"
            >
              Case Cost <em>$ </em>
            </label>
            <input
              type="text"
              id="caseCost"
              value={caseCost}
              placeholder="0.00"
              onKeyDown={handleKeyPress}
              onChange={(e) => setCaseCost(e.target.value)}
              className="w-28 flex-col text-xl flex-none"
            />
            <button
              type="submit"
              className="bg-amber-400 flex-none hover:bg-amber-300 text-zinc-800 font-bold text-2xl py-2 px-4 rounded"
              value={maxCases}
              onClick={handleButtonClick}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
