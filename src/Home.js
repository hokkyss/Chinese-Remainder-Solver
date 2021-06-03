import React, { useState, useEffect } from "react";
import { is_coprime, solve_two_CRT, solve_CRT } from "./Maths";
import Equivalence from "./Equivalence";
import "./index.css";

function Home() {
  const [a, setA] = useState(0);
  const [m, setM] = useState(2);
  const [obj, setObj] = useState({ id: 1, a: 0, m: 2 });
  const [equivalence, setEquivalence] = useState([
    { id: -2, a: 3, m: 5 },
    { id: -1, a: 5, m: 7 },
    { id: 0, a: 7, m: 11 },
  ]);
  const [stepsButton, setStepsButton] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState({});

  const handleSubmit = () => {
    const valid = is_coprime(equivalence);
    if (valid) {
    }
    setStepsButton(true);
  };

  const addEquivalence = () => {
    setEquivalence(equivalence.concat(obj));
    setA(0);
    setM(2);
    setObj({ id: obj.id + 1, a: 0, m: 2 });
  };

  const handleChange = () => {
    const newA = parseInt(document.getElementById("a").value);
    const newM = parseInt(document.getElementById("m").value);
    setA(newA);
    setM(newM);
    setObj({ id: obj.id, a: newA, m: newM });
  };

  const removeEquivalence = (id) => {
    for (var i = 0; i < equivalence.length; i++) {}
    setEquivalence(equivalence.filter((eq) => eq.id !== id));
    alert(`equivalence ${id} is removed`);
  };

  // dari video https://youtu.be/JgrN9tOKz0s?t=505
  useEffect(() => {
    setResult(solve_CRT(equivalence));
  }, [equivalence]);

  return (
    <div className="container">
      <div className="left">
        <div className="result">
          x &equiv; {result.a} (mod {result.m})
        </div>
        <div className="input-container">
          x &equiv;{" "}
          <input
            onChange={handleChange}
            type="number"
            id="a"
            className="input"
            placeholder={a}
            value={a}
            min={0}
          />{" "}
          (mod{" "}
          <input
            onChange={handleChange}
            type="number"
            id="m"
            className="input"
            placeholder={m}
            value={m}
            min={2}
          />
          )
          <button
            type="submit"
            value="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Solve
          </button>
          <button type="button" className="add-button" onClick={addEquivalence}>
            Add
          </button>
        </div>
        <div className="equivalence-container">
          {equivalence.map((eq) => (
            <Equivalence
              key={eq.id}
              eq={eq}
              onClick={(id) => removeEquivalence(id)}
            />
          ))}
        </div>
        {stepsButton && (
          <button
            className="steps-button"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? "Hide" : "Show"} Steps
          </button>
        )}
      </div>
      {showSteps && (
        <div className="right">
          <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
            BBBB
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
