import { useState, useEffect } from "react";
import "../styles/Steps.css";

export default function Steps({ step }) {
  const [initList, setInitList] = useState([]);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    setInitList(step.init.map((eq) => eq.id));
    setFinalList(step.final.map((eq) => eq.id));
  }, [step]);

  return (
    <div className="step">
      <div className="list">Initial equivalences: {initList.join(", ")}</div>
      {step.step.map((step) => (
        <div className="every-step">{step}</div>
      ))}
      <div className="list">Final equivalences: {finalList.join(", ")}</div>
    </div>
  );
}
