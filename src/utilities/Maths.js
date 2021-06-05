// counts a^-1 mod m
function modular_inverse(a, m) {
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

function solve_two_CRT(eq1, eq2, no) {
  const a1 = eq1.a;
  const m1 = eq1.m;
  const a2 = eq2.a;
  const m2 = eq2.m;

  const mult = modular_inverse(m1, m2);
  let a = a1 + (a2 - a1) * mult * m1;
  const m = m1 * m2;

  while (a >= m || a < 0) a = ((a % m) + m) % m;

  return { id: `res${no}`, a: a, m: m };
}
export { solve_two_CRT };

function solve_CRT(eqList) {
  if (eqList.length === 0) return { step: [] };

  var copy = eqList.slice();
  var first;
  var second;
  var temp;
  let steps = eqList.length - 1;
  let actions = [];

  for (var i = 1; i <= steps; i++) {
    const init = copy.slice();

    first = copy.shift();
    second = copy.shift();
    temp = solve_two_CRT(first, second, i);
    copy.push(temp);

    const final = copy.slice();

    const step1 = `- Declare ${first.id} as x = ${first.a} + ${first.m}k`;
    const step2 = `- Substitute x to ${second.id}. Resulting in ${first.a} + ${first.m}k ≡ ${second.a} (mod ${second.m})`;
    const step3 = `- Subtract ${first.a} from both sides`;
    const step4 = `- Multiply both sides by ${modular_inverse(
      first.m,
      second.m
    )}, which is the inverse modulo of ${first.m} mod ${second.m}`;
    const step5 = `- The result is k ≡ ${parseInt(
      (temp.a - first.a) / first.m
    )} (mod ${second.m}).`;
    const step6 = `- Declare k as k = ${parseInt(
      (temp.a - first.a) / first.m
    )} + ${second.m}l. Substitute k to ${first.id}.`;
    const step7 = `- The result is x = ${temp.a} + ${temp.m}l.`;
    const step8 = `- Declare x as x ≡ ${temp.a} (mod ${temp.m}), equivalence ${temp.id}`;

    actions.push({
      init: init,
      final: final,
      no: i,
      step: [step1, step2, step3, step4, step5, step6, step7, step8],
    });
  }
  return { res: copy[0], step: actions };
}
export { solve_CRT };
