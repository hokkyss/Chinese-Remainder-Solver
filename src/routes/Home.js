import React, { useState, useEffect } from "react";
import { is_coprime, solve_CRT } from "../utilities/Maths";
import Equivalence from "../components/Equivalence";
import Steps from "../components/Steps";
import "../styles/index.css";

function Home() {
  const [a, setA] = useState(0);
  const [m, setM] = useState(2);
  const [obj, setObj] = useState({ id: 1, a: 0, m: 2 });
  const [equivalence, setEquivalence] = useState([
    { id: "ex0", a: 3, m: 5 },
    { id: "ex1", a: 5, m: 7 },
    { id: "ex2", a: 7, m: 11 },
  ]);
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState({});
  const [valid, setValid] = useState({ is: true, i: -1, j: -1 });
  const [steps, setSteps] = useState([]);

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

  useEffect(() => {
    const { res, step } = solve_CRT(equivalence);
    const validity = is_coprime(equivalence);
    setResult(res);
    setSteps(step);
    setValid(validity);

    if (equivalence.length === 0 || !validity.is) setShowSteps(false);
  }, [equivalence]);

  return (
    <div className="container">
      <div className="left">
        {equivalence.length === 0 ? (
          <div className="result">Input your equivalence!</div>
        ) : valid.is ? (
          <div className="result">
            x &equiv; {result.a} (mod {result.m})
          </div>
        ) : (
          <div className="result">
            Equivalence {valid.i} and {valid.j} are not coprime!
          </div>
        )}

        <div className="input-container">
          x &equiv;{" "}
          <input
            onChange={handleChange}
            type="number"
            id="a"
            className="input"
            value={a}
            min={0}
          />{" "}
          (mod{" "}
          <input
            onChange={handleChange}
            type="number"
            id="m"
            className="input"
            value={m}
            min={2}
          />
          )
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
        {valid.is && (
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
          {steps.length > 0
            ? steps.map((step) => <Steps step={step} key={step.no} />)
            : "No steps needed"}
        </div>
      )}
    </div>
  );
}

export default Home;
