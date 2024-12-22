import * as glMatrix from "./common.js";
import { Matrix3 } from "./Matrix3";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";
export class Vector3 {
  public constructor(
    public x = 0,
    public y = 0,
    public z = 0
  ) {}

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public static fromArray(arr: number[]): Vector3 {
    return new Vector3(arr[0], arr[1], arr[2]);
  }

  public toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  public copy(a: Vector3): this {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    return this;
  }

  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  public setArray(arr: number[]): this {
    this.x = arr[0];
    this.y = arr[1];
    this.z = arr[2];
    return this;
  }

  public add(a: Vector3): this {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  }

  public subtract(a: Vector3): this {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  }

  public multiply(a: Vector3): this {
    this.x *= a.x;
    this.y *= a.y;
    this.z *= a.z;
    return this;
  }

  public divide(a: Vector3): this {
    this.x /= a.x;
    this.y /= a.y;
    this.z /= a.z;
    return this;
  }

  public ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }

  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  public min(a: Vector3): this {
    this.x = Math.min(a.x, this.x);
    this.y = Math.min(a.y, this.y);
    this.z = Math.min(a.z, this.z);
    return this;
  }

  public max(a: Vector3): this {
    this.x = Math.max(a.x, this.x);
    this.y = Math.max(a.y, this.y);
    this.z = Math.max(a.z, this.z);
    return this;
  }

  public round(): this {
    this.x = glMatrix.round(this.x);
    this.y = glMatrix.round(this.y);
    this.z = glMatrix.round(this.z);
    return this;
  }

  public scale(a: number): this {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  }

  public distance(b: Vector3): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    const z = b.z - this.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  public squaredDistance(b: Vector3): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    const z = b.z - this.z;
    return x * x + y * y + z * z;
  }

  public squaredLength(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  public inverse(): this {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    return this;
  }

  public normalize(): this {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    let len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    this.x = this.x * len;
    this.y = this.y * len;
    this.z = this.z * len;
    return this;
  }

  public dot(a: Vector3): number {
    return a.x * this.x + a.y * this.y + a.z * this.z;
  }

  public cross(b: Vector3): this {
    const ax = this.x,
      ay = this.y,
      az = this.z;
    const bx = b.x,
      by = b.y,
      bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }

  public lerp(b: Vector3, t: number): this {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    this.x = ax + t * (b.x - ax);
    this.y = ay + t * (b.y - ay);
    this.z = az + t * (b.z - az);
    return this;
  }

  public slerp(b: Vector3, t: number): this {
    const angle = Math.acos(Math.min(Math.max(this.dot(b), -1), 1));
    const sinTotal = Math.sin(angle);

    const ratioA = Math.sin((1 - t) * angle) / sinTotal;
    const ratioB = Math.sin(t * angle) / sinTotal;
    this.x = ratioA * this.x + ratioB * b.x;
    this.y = ratioA * this.y + ratioB * b.y;
    this.z = ratioA * this.z + ratioB * b.z;

    return this;
  }

  public transformMat4(m: Matrix4): this {
    const x = this.x,
      y = this.y,
      z = this.z;
    let w = m.array[3] * x + m.array[7] * y + m.array[11] * z + m.array[15];
    w = w || 1.0;
    this.x =
      (m.array[0] * x + m.array[4] * y + m.array[8] * z + m.array[12]) / w;
    this.y =
      (m.array[1] * x + m.array[5] * y + m.array[9] * z + m.array[13]) / w;
    this.z =
      (m.array[2] * x + m.array[6] * y + m.array[10] * z + m.array[14]) / w;
    return this;
  }

  public transformMat3(m: Matrix3): this {
    const x = this.x,
      y = this.y,
      z = this.z;
    this.x = x * m.array[0] + y * m.array[3] + z * m.array[6];
    this.y = x * m.array[1] + y * m.array[4] + z * m.array[7];
    this.z = x * m.array[2] + y * m.array[5] + z * m.array[8];
    return this;
  }

  public transformQuat(q: Quaternion): this {
    const qx = q.x,
      qy = q.y,
      qz = q.z,
      qw = q.w;
    const x = this.x,
      y = this.y,
      z = this.z;

    let uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x;

    let uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx;

    const w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;

    this.x = x + uvx + uuvx;
    this.y = y + uvy + uuvy;
    this.z = z + uvz + uuvz;
    return this;
  }

  public angle(b: Vector3): number {
    const ax = this.x,
      ay = this.y,
      az = this.z,
      bx = b.x,
      by = b.y,
      bz = b.z,
      mag = Math.sqrt(
        (ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)
      ),
      cosine = mag && this.dot(b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  public zero(): this {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    return this;
  }

  public toString(): string {
    return (
      "vec3(" +
      this.x.toString() +
      ", " +
      this.y.toString() +
      ", " +
      this.z.toString() +
      ")"
    );
  }

  public exactEquals(b: Vector3): boolean {
    return this.x === b.x && this.y === b.y && this.z === b.z;
  }

  public equals(b: Vector3): boolean {
    const a0 = this.x,
      a1 = this.y,
      a2 = this.z;
    const b0 = b.x,
      b1 = b.y,
      b2 = b.z;
    return (
      Math.abs(a0 - b0) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2))
    );
  }
}
