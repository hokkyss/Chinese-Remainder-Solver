import React, { useState, useEffect } from "react";
import { is_coprime, solve_CRT } from "../utilities/Maths";
import Equivalence from "../components/Equivalence";
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
  const [valid, setValid] = useState(true);

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
    setResult(solve_CRT(equivalence));
    setValid(is_coprime(equivalence));
  }, [equivalence]);

  return (
    <div className="container">
      <div className="left">
        {valid.is ? (
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
          <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
            BBBB
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
