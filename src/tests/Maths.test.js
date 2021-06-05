import { modular_inverse, is_coprime, solve_two_CRT } from "../utilities/Maths";

test("inverse modulo", () => {
  expect((modular_inverse(2, 5) * 2) % 5).toBe(1);
});

test("is all coprime", () => {
  const x = [
    { a: 5, m: 12 },
    { a: 5, m: 6 },
  ];
  var { is } = is_coprime(x);
  expect(is).toBe(false);

  const x2 = [
    { a: 5, m: 12 },
    { a: 5, m: 7 },
  ];

  var { is } = is_coprime(x2);
  expect(is).toBe(true);
});

test("solve two CRT", () => {
  const x2 = [
    { a: 5, m: 12 },
    { a: 5, m: 7 },
  ];

  const result = { a: 5, m: 84 };
  const to_be_tested = solve_two_CRT(x2[0], x2[1]);

  expect(to_be_tested.a).toBe(result.a);
  expect(to_be_tested.m).toBe(result.m);
});
