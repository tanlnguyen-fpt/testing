export default function getTypeOfTriangle(a, b, c) {
  if (typeof a !== 'number') {
    a = parseInt(a);
  }
  if (typeof b !== 'number') {
    b = parseInt(b);
  }
  if (typeof c !== 'number') {
    c = parseInt(c);
  }

  if (a + b <= c || a + c <= b || b + c <= a) return 'Not a triangle';
  else {
    if (a == b && a == c) {
      return 'Equilateral Triangle';
    } else {
      if (
        (a == b && a * a + b * b - c * c < 0.00000001) ||
        (a == c && a * a + c * c - b * b < 0.00000001) ||
        (b == c && b * b + c * c - a * a < 0.00000001)
      ) {
        return 'Isosceles-Right Triangle';
      } else if (a == b || a == c || b == c) {
        return 'Isosceles Triangle';
      } else if (a * a + b * b == c * c || a * a + c * c == b * b || b * b + c * c == a * a) {
        return 'Right Triangle';
      } else return 'Normal Triangle';
    }
  }
}
