import { EPSILON } from "./common";
import { Vector2 } from "./Vector2";

export class Matrix2 {
  public array: number[];

  public constructor() {
    this.array = new Array<number>(2 * 2);
    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 1;
  }

  public clone(): Matrix2 {
    const o = new Matrix2();
    o.array = [...this.array];

    return o;
  }

  public copy(a: Matrix2): this {
    a.array = [...a.array];
    return this;
  }

  public identity(): this {
    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 1;
    return this;
  }

  public transpose(): this {
    const a1 = this.array[1];
    this.array[1] = this.array[2];
    this.array[2] = a1;
    return this;
  }

  public invert(): this {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];

    let det = a0 * a3 - a2 * a1;

    if (!det) {
      return this;
    }
    det = 1.0 / det;

    this.array[0] = a3 * det;
    this.array[1] = -a1 * det;
    this.array[2] = -a2 * det;
    this.array[3] = a0 * det;

    return this;
  }

  public adjoint(): this {
    const a0 = this.array[0];
    this.array[0] = this.array[3];
    this.array[1] = -this.array[1];
    this.array[2] = -this.array[2];
    this.array[3] = a0;

    return this;
  }

  public determinant(): number {
    return this.array[0] * this.array[3] - this.array[2] * this.array[1];
  }

  public multiply(b: Matrix2): this {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];
    const b0 = b.array[0],
      b1 = b.array[1],
      b2 = b.array[2],
      b3 = b.array[3];
    this.array[0] = a0 * b0 + a2 * b1;
    this.array[1] = a1 * b0 + a3 * b1;
    this.array[2] = a0 * b2 + a2 * b3;
    this.array[3] = a1 * b2 + a3 * b3;
    return this;
  }

  public rotate(rad: number): this {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    this.array[0] = a0 * c + a2 * s;
    this.array[1] = a1 * c + a3 * s;
    this.array[2] = a0 * -s + a2 * c;
    this.array[3] = a1 * -s + a3 * c;
    return this;
  }

  public scale(v: Vector2): this {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];
    const v0 = v.x,
      v1 = v.y;
    this.array[0] = a0 * v0;
    this.array[1] = a1 * v0;
    this.array[2] = a2 * v1;
    this.array[3] = a3 * v1;
    return this;
  }

  public fromRotation(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    this.array[0] = c;
    this.array[1] = s;
    this.array[2] = -s;
    this.array[3] = c;
    return this;
  }

  public fromScaling(v: Vector2): this {
    this.array[0] = v.x;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = v.y;
    return this;
  }

  public toString(): string {
    return (
      "mat2(" +
      this.array[0].toString() +
      ", " +
      this.array[1].toString() +
      ", " +
      this.array[2].toString() +
      ", " +
      this.array[3].toString() +
      ")"
    );
  }

  public frob(): number {
    return Math.sqrt(
      this.array[0] * this.array[0] +
        this.array[1] * this.array[1] +
        this.array[2] * this.array[2] +
        this.array[3] * this.array[3]
    );
  }

  // TODO this doesnt make sense
  // LDU(L:matrix2, D:matrix2, U:matrix2, a:matrix2) {
  //   L.array[2] = this.array[2] / this.array[0];
  //   U.array[0] = this.array[0];
  //   U.array[1] = this.array[1];
  //   U.array[3] = this.array[3] - L.array[2] * U.array[1];
  //   return [L, D, U];
  // }

  public add(b: Matrix2): this {
    this.array[0] = this.array[0] + b.array[0];
    this.array[1] = this.array[1] + b.array[1];
    this.array[2] = this.array[2] + b.array[2];
    this.array[3] = this.array[3] + b.array[3];
    return this;
  }

  public subtract(b: Matrix2): this {
    this.array[0] = this.array[0] - b.array[0];
    this.array[1] = this.array[1] - b.array[1];
    this.array[2] = this.array[2] - b.array[2];
    this.array[3] = this.array[3] - b.array[3];
    return this;
  }

  public exactEquals(b: Matrix2): boolean {
    return (
      this.array[0] === b.array[0] &&
      this.array[1] === b.array[1] &&
      this.array[2] === b.array[2] &&
      this.array[3] === b.array[3]
    );
  }

  public equals(b: Matrix2): boolean {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];
    const b0 = b.array[0],
      b1 = b.array[1],
      b2 = b.array[2],
      b3 = b.array[3];
    return (
      Math.abs(a0 - b0) <=
        EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <=
        EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
    );
  }

  public multiplyScalar(b: number): this {
    this.array[0] = this.array[0] * b;
    this.array[1] = this.array[1] * b;
    this.array[2] = this.array[2] * b;
    this.array[3] = this.array[3] * b;
    return this;
  }

  public multiplyScalarAndAdd(b: Matrix2, scale: number): this {
    this.array[0] = this.array[0] + b.array[0] * scale;
    this.array[1] = this.array[1] + b.array[1] * scale;
    this.array[2] = this.array[2] + b.array[2] * scale;
    this.array[3] = this.array[3] + b.array[3] * scale;
    return this;
  }
}
