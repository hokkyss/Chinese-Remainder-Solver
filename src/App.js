import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

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
  // counts a^b using divide and conquer
  function power(a, b) {
    b = parseInt(b);
    if (b === 0) return 1;
    var temp = b % 2 === 0 ? power(a, b / 2) : power(a, (b - 1) / 2);

    return temp * temp * (b % 2 === 0 ? 1 : a);
  }

  function euler_totient_function(n) {
    // reference https://cp-algorithms.com/algebra/phi-function.html
    // calculating by divisor sum property

    let pi = [];
    pi.push(0);
    pi.push(1);
    for (var i = 2; i <= n; i++) {
      pi.push(i - 1);
    }

    for (i = 2; i <= n; i++) {
      for (var j = i * 2; j <= n; j += i) {
        pi[j] -= pi[i];
      }
    }

    return pi[n];
  }

  // counts a^-1 mod m
  function modular_inverse(a, m) {
    // using euler totient function, refer to https://cp-algorithms.com/algebra/module-inverse.html
    // const pi = euler_totient_function(m);

    // return power(a, pi - 1);

    // using bezout identity
    // taken from https://www.dcode.fr/bezout-identity

    let r = a,
      r2 = m,
      u = 1,
      v = 0,
      u2 = 0,
      v2 = 1;
    while (r2 !== 0) {
      let q = parseInt(r / r2);
      let tempr = r,
        tempu = u,
        tempv = v;
      r = r2;
      u = u2;
      v = v2;
      r2 = tempr - q * r2;
      u2 = tempu - q * u2;
      v2 = tempv - q * v2;
    }
    return u;
  }

  function GCD(a, b) {
    if (b === 0) return a;
    return GCD(b, a % b);
  }

  function is_coprime(l) {
    for (var i = 0; i < l.length; i++) {
      for (var j = i + 1; j < l.length; j++) {
        if (GCD(l[i].m, l[j].m) === 1) continue;
        return { is: false, i: i, j: j };
      }
    }
    return { is: true, i: -1, j: -1 };
  }

  // Precondition: is_coprime(all equivalence) === 1
  function solve_two_CRT(eq1, eq2) {
    const a1 = eq1.a;
    const m1 = eq1.m;
    const a2 = eq2.a;
    const m2 = eq2.m;

    const mult = modular_inverse(m1, m2);
    // for some reason, the result of using euler_totient_function to calculate modular inverse
    // produce different results
    let a = a1 + (a2 - a1) * mult * m1;
    const m = m1 * m2;

    while (a >= m || a < 0) a = ((a % m) + m) % m;

    return { a: a, m: m };
  }

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
  console.log(power(5, 5));
  console.log(euler_totient_function(10));

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
