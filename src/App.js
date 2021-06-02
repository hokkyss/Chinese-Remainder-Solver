import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { is_coprime, solve_two_CRT } from "./Maths";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

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
  console.log(solve_two_CRT(first, x[2]));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
