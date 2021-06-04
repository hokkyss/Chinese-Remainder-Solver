// counts a^b using divide and conquer
function power(a, b) {
  b = parseInt(b);
  if (b === 0) return 1;
  var temp = b % 2 === 0 ? power(a, b / 2) : power(a, (b - 1) / 2);

  return temp * temp * (b % 2 === 0 ? 1 : a);
}
export { power };

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
export { euler_totient_function };

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

  while (u < 0 || u > m) {
    u = (u + m) % m;
  }
  return u;
}
export { modular_inverse };

function GCD(a, b) {
  if (b === 0) return a;
  return GCD(b, a % b);
}
export { GCD };

function is_coprime(l) {
  if (l.length === 0) return { is: false, i: -2, j: -2 };

  for (var i = 0; i < l.length; i++) {
    for (var j = i + 1; j < l.length; j++) {
      if (GCD(l[i].m, l[j].m) === 1) continue;
      return { is: false, i: l[i].id, j: l[j].id };
    }
  }
  return { is: true, i: -1, j: -1 };
}
export { is_coprime };

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
export { solve_two_CRT };

function solve_CRT(eqList) {
  var copy = eqList.slice();
  var first;
  var second;
  var temp;
  let steps = eqList.length - 1;

  if (steps === -1) {
    return {};
  }

  for (var i = 1; i <= steps; i++) {
    first = copy.shift();
    second = copy.shift();
    temp = solve_two_CRT(first, second);
    copy.push(temp);
  }
  return copy[0];
}
export { solve_CRT };
