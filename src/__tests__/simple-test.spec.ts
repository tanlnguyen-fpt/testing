import calculate from '../function/calculation';

test('I want to test 1 + 1 = 2', () => {
  const a = 1;
  const b = 1;
  expect(calculate(a, b)).toBe(2);
});
