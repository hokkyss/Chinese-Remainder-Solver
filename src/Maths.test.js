import {
  power,
  euler_totient_function,
  modular_inverse,
  GCD,
  is_coprime,
  solve_two_CRT,
} from "./Maths";

test("power", () => {
  expect(power(2, 5)).toBe(32);
  expect(power(5, 2)).toBe(25);
  expect(power(1000000000, 0)).toBe(1);
  expect(power(0, 111113213)).toBe(0);
});
