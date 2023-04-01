import React from "react";
import "./App.css";
import Header from "./assets/components/header";

export default function App() {
  const [ammount, setAmmount] = React.useState("");
  const [caseCost, setCaseCost] = React.useState("");
  const [maxCases, setMaxCases] = React.useState("0");
  const [totalCost, setTotalCost] = React.useState("0");
  const [headingText, setHeadingText] = React.useState("Try it out!");

  function calculateMaxCases(ammount, caseCost) {
    const maxCases = Math.floor(ammount / (caseCost + 2.5));

    const totalCost = maxCases;

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
      enteredChar !== "."
    ) {
      e.preventDefault();
    }
  }
  function handleButtonClick() {
    const result = calculateMaxCases(parseFloat(ammount), parseFloat(caseCost));
    setMaxCases(result.maxCases);
    setTotalCost(result.totalCost);
    setHeadingText("You can buy " + result.maxCases + " cases.");
  }

  return (
    <div>
      <Header />
      <div className="m-0 mx-auto p-2 text-center max-w-7xl">
        <div className="pt-10 py-auto">
          <h3 class="font-sans text-xl pb-5 font-bold">{headingText}</h3>
          <label htmlFor="ammount" className="text-xl">
            Total Money
          </label>
          <input
            type="text"
            id="ammount"
            placeholder="0"
            value={ammount}
            onKeyDown={handleKeyPress}
            onChange={(e) => setAmmount(e.target.value)}
          />
          <label htmlFor="caseCost" className="text-xl">
            Case Cost
          </label>
          <input
            type="text"
            id="caseCost"
            value={caseCost}
            placeholder="0"
            onKeyDown={handleKeyPress}
            onChange={(e) => setCaseCost(e.target.value)}
          />
          <button
            type="submit"
            class="bg-slate-600 hover:bg-slate-700 text-slate-50 font-bold py-2 px-4 rounded"
            value={maxCases}
            onClick={handleButtonClick}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
