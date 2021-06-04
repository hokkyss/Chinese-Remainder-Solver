import "../styles/Equivalence.css";

export default function Equivalence({ eq, onClick }) {
  return (
    <div className="equivalence">
      <div className="equivalence-left">{eq.id}</div>
      <div className="equivalence-right">
        <div className="equivalence-detail">
          x &equiv; {eq.a} (mod {eq.m})
        </div>
        <button className="equivalence-button" onClick={() => onClick(eq.id)}>
          -
        </button>
      </div>
    </div>
  );
}
