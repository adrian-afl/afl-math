export const EPSILON = 0.000001;

export function round(a: number) {
  if (a >= 0)
    return Math.round(a);

  return (a % 0.5 === 0) ? Math.floor(a) : Math.round(a);
}

const degree = Math.PI / 180;

const radian = 180 / Math.PI;

export function toRadian(a: number): number {
  return a * degree;
}

export function toDegree(a: number): number {
  return a * radian;
}

export function equals(a: number, b: number): boolean {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
