import * as glMatrix from "./common.js";
import { Matrix2 } from "./Matrix2";
import { Matrix3 } from "./Matrix3";
import { Matrix4 } from "./Matrix4";

export class Vector2 {
  public constructor(
    public x = 0,
    public y = 0
  ) {}

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public static fromArray(arr: number[]): Vector2 {
    return new Vector2(arr[0], arr[1]);
  }

  public copy(a: Vector2): this {
    this.x = a.x;
    this.y = a.y;
    return this;
  }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public setArray(arr: number[]): this {
    this.x = arr[0];
    this.y = arr[1];
    return this;
  }

  public add(a: Vector2): this {
    this.x += a.x;
    this.y += a.y;
    return this;
  }

  public subtract(a: Vector2): this {
    this.x -= a.x;
    this.y -= a.y;
    return this;
  }

  public multiply(a: Vector2): this {
    this.x *= a.x;
    this.y *= a.y;
    return this;
  }

  public divide(a: Vector2): this {
    this.x /= a.x;
    this.y /= a.y;
    return this;
  }

  public ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  public min(a: Vector2): this {
    this.x = Math.min(a.x, this.x);
    this.y = Math.min(a.y, this.y);
    return this;
  }

  public max(a: Vector2): this {
    this.x = Math.max(a.x, this.x);
    this.y = Math.max(a.y, this.y);
    return this;
  }

  public round(): this {
    this.x = glMatrix.round(this.x);
    this.y = glMatrix.round(this.y);
    return this;
  }

  public scale(a: number): this {
    this.x *= a;
    this.y *= a;
    return this;
  }

  public distance(b: Vector2): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  public squaredDistance(b: Vector2): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    return x * x + y * y;
  }

  public squaredLength(): number {
    return this.x * this.x + this.y * this.y;
  }

  public negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  public inverse(): this {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    return this;
  }

  public normalize(): this {
    const x = this.x;
    const y = this.y;
    let len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    this.x = this.x * len;
    this.y = this.y * len;
    return this;
  }

  public dot(b: Vector2): number {
    return this.x * b.x + this.y * b.y;
  }

  // todo
  // cross(out, a, b) {
  //   var z = a.x * b.y - a.y * b.x;
  //   out.x = out.y = 0;
  //   out.z = z;
  //   return out;
  // }

  public lerp(b: Vector2, t: number): this {
    const ax = this.x,
      ay = this.y;
    this.x = ax + t * (b.x - ax);
    this.y = ay + t * (b.y - ay);
    return this;
  }

  public transformMat2(m: Matrix2): this {
    const x = this.x,
      y = this.y;
    this.x = m.array[0] * x + m.array[2] * y;
    this.y = m.array[1] * x + m.array[3] * y;
    return this;
  }

  public transformMat3(m: Matrix3): this {
    const x = this.x,
      y = this.y;
    this.x = m.array[0] * x + m.array[3] * y + m.array[6];
    this.y = m.array[1] * x + m.array[4] * y + m.array[7];
    return this;
  }

  public transformMat4(m: Matrix4): this {
    const x = this.x;
    const y = this.y;
    this.x = m.array[0] * x + m.array[4] * y + m.array[12];
    this.y = m.array[1] * x + m.array[5] * y + m.array[13];
    return this;
  }

  public angle(b: Vector2): number {
    const x1 = this.x,
      y1 = this.y,
      x2 = b.x,
      y2 = b.y,
      mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
      cosine = mag && (x1 * x2 + y1 * y2) / mag;

    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  public zero(): this {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  public toString(): string {
    return "vec2(" + this.x.toString() + ", " + this.y.toString() + ")";
  }

  public exactEquals(b: Vector2): boolean {
    return this.x === b.x && this.y === b.y;
  }

  public equals(b: Vector2): boolean {
    const a0 = this.x,
      a1 = this.y;
    const b0 = b.x,
      b1 = b.y;
    return (
      Math.abs(a0 - b0) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1))
    );
  }
}
