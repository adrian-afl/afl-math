import * as glMatrix from "./common.js";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";
export class Vector4 {
  public constructor(
    public x = 0,
    public y = 0,
    public z = 0,
    public w = 0
  ) {}

  public clone(): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  public static fromArray(arr: number[]): Vector4 {
    return new Vector4(arr[0], arr[1], arr[2], arr[3]);
  }

  public copy(a: Vector4): this {
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
    this.w = a.w;
    return this;
  }

  public set(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  public setArray(arr: number[]): this {
    this.x = arr[0];
    this.y = arr[1];
    this.z = arr[2];
    this.w = arr[3];
    return this;
  }

  public add(b: Vector4): this {
    this.x = this.x + b.x;
    this.y = this.y + b.y;
    this.z = this.z + b.z;
    this.w = this.w + b.w;
    return this;
  }

  public subtract(b: Vector4): this {
    this.x = this.x - b.x;
    this.y = this.y - b.y;
    this.z = this.z - b.z;
    this.w = this.w - b.w;
    return this;
  }

  public multiply(b: Vector4): this {
    this.x = this.x * b.x;
    this.y = this.y * b.y;
    this.z = this.z * b.z;
    this.w = this.w * b.w;
    return this;
  }

  public divide(b: Vector4): this {
    this.x = this.x / b.x;
    this.y = this.y / b.y;
    this.z = this.z / b.z;
    this.w = this.w / b.w;
    return this;
  }

  public ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }

  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }

  public min(b: Vector4): this {
    this.x = Math.min(this.x, b.x);
    this.y = Math.min(this.y, b.y);
    this.z = Math.min(this.z, b.z);
    this.w = Math.min(this.w, b.w);
    return this;
  }

  public max(b: Vector4): this {
    this.x = Math.max(this.x, b.x);
    this.y = Math.max(this.y, b.y);
    this.z = Math.max(this.z, b.z);
    this.w = Math.max(this.w, b.w);
    return this;
  }

  public round(): this {
    this.x = glMatrix.round(this.x);
    this.y = glMatrix.round(this.y);
    this.z = glMatrix.round(this.z);
    this.w = glMatrix.round(this.w);
    return this;
  }

  public scale(b: number): this {
    this.x = this.x * b;
    this.y = this.y * b;
    this.z = this.z * b;
    this.w = this.w * b;
    return this;
  }

  public scaleAndAdd(b: Vector4, scale: number): this {
    this.x = this.x + b.x * scale;
    this.y = this.y + b.y * scale;
    this.z = this.z + b.z * scale;
    this.w = this.w + b.w * scale;
    return this;
  }

  public distance(b: Vector4): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    const z = b.z - this.z;
    const w = b.w - this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  public squaredDistance(b: Vector4): number {
    const x = b.x - this.x;
    const y = b.y - this.y;
    const z = b.z - this.z;
    const w = b.w - this.w;
    return x * x + y * y + z * z + w * w;
  }

  public length(): number {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  public squaredLength(): number {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    return x * x + y * y + z * z + w * w;
  }

  public negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }

  public inverse(): this {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    this.w = 1.0 / this.w;
    return this;
  }

  public normalize(): this {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    this.x = x * len;
    this.y = y * len;
    this.z = z * len;
    this.w = w * len;
    return this;
  }

  public dot(b: Vector4): number {
    return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
  }

  // TODO
  //  cross( u, v, w) {
  //   let A = v[0] * w[1] - v[1] * w[0],
  //     B = v[0] * w[2] - v[2] * w[0],
  //     C = v[0] * w[3] - v[3] * w[0],
  //     D = v[1] * w[2] - v[2] * w[1],
  //     E = v[1] * w[3] - v[3] * w[1],
  //     F = v[2] * w[3] - v[3] * w[2];
  //   let G = u[0];
  //   let H = u[1];
  //   let I = u[2];
  //   let J = u[3];
  //
  //   this.x = H * F - I * E + J * D;
  //   this.y = -(G * F) + I * C - J * B;
  //   this.z = G * E - H * C + J * A;
  //   this.w = -(G * D) + H * B - I * A;
  //
  //   return this;
  // }

  public lerp(b: Vector4, t: number): this {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const aw = this.w;
    this.x = ax + t * (b.x - ax);
    this.y = ay + t * (b.y - ay);
    this.z = az + t * (b.z - az);
    this.w = aw + t * (b.w - aw);
    return this;
  }

  public transformMat4(m: Matrix4): this {
    const x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;
    this.x = m.array[0] * x + m.array[4] * y + m.array[8] * z + m.array[12] * w;
    this.y = m.array[1] * x + m.array[5] * y + m.array[9] * z + m.array[13] * w;
    this.z =
      m.array[2] * x + m.array[6] * y + m.array[10] * z + m.array[14] * w;
    this.w =
      m.array[3] * x + m.array[7] * y + m.array[11] * z + m.array[15] * w;
    return this;
  }

  public transformQuat(q: Quaternion): this {
    const x = this.x,
      y = this.y,
      z = this.z;
    const qx = q.x,
      qy = q.y,
      qz = q.w,
      qw = q.z;

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    // this.w = this.w;
    return this;
  }

  public zero(): this {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.w = 0.0;
    return this;
  }

  public toString(): string {
    return (
      "vec4(" +
      this.x.toString() +
      ", " +
      this.y.toString() +
      ", " +
      this.z.toString() +
      ", " +
      this.w.toString() +
      ")"
    );
  }

  public exactEquals(b: Vector4): boolean {
    return this.x === b.x && this.y === b.y && this.z === b.z && this.w === b.w;
  }

  public equals(b: Vector4): boolean {
    const a0 = this.x,
      a1 = this.y,
      a2 = this.z,
      a3 = this.w;
    const b0 = b.x,
      b1 = b.y,
      b2 = b.z,
      b3 = b.w;
    return (
      Math.abs(a0 - b0) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(3), Math.abs(b3))
    );
  }
}
