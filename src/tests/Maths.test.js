import {
  power,
  euler_totient_function,
  modular_inverse,
  is_coprime,
  solve_two_CRT,
} from "../utilities/Maths";

test("power", () => {
  expect(power(2, 5)).toBe(32);
  expect(power(5, 2)).toBe(25);
  expect(power(1000000000, 0)).toBe(1);
  expect(power(0, 111113213)).toBe(0);
});

test("phi", () => {
  expect(euler_totient_function(10)).toBe(4);
  expect(euler_totient_function(17)).toBe(16);
});

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
