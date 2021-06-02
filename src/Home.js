import { is_coprime, solve_two_CRT } from "./Maths";
import "./index.css";

function Home() {
  let x = [
    { a: 1, m: 2 },
    { a: 2, m: 3 },
    { a: 3, m: 5 },
  ];

  // dari video https://youtu.be/JgrN9tOKz0s?t=505
  x = [
    { a: 3, m: 5 },
    { a: 5, m: 7 },
    { a: 7, m: 11 },
  ];

  console.log(is_coprime(x));
  const first = solve_two_CRT(x[0], x[1]);
  console.log(first);
  const result = solve_two_CRT(first, x[2]);
  console.log(result);

  return (
    <div className="container">
      <div className="left">
        <div className="result">
          x &equiv; {result.a} (mod {result.m})
        </div>
        <div className="input-container">
          x &equiv;{" "}
          <input
            type="number"
            id="a"
            className="input"
            placeholder={0}
            min={0}
          />{" "}
          (mod{" "}
          <input
            type="number"
            id="m"
            className="input"
            placeholder={2}
            min={0}
          />
          )
          <button type="submit" value="submit" className="submit-button">
            Solve
          </button>
          <button type="button" className="add-button">
            Add
          </button>
        </div>
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
          AAAA
        </a>
      </div>
      <div className="right">
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">
          BBBB
        </a>
      </div>
    </div>
  );
}

export default Home;
