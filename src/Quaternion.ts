import { EPSILON } from "./common";
import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";
export class Quaternion {
  public constructor(
    public x = 0,
    public y = 0,
    public z = 0,
    public w = 1
  ) {}

  public setArray(arr: number[]): this {
    this.x = arr[0];
    this.y = arr[1];
    this.z = arr[2];
    this.w = arr[3];
    return this;
  }

  public identity(): this {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  public setAxisAngle(axis: Vector3, rad: number): this {
    rad = rad * 0.5;
    const s = Math.sin(rad);
    this.x = s * axis.x;
    this.y = s * axis.y;
    this.z = s * axis.z;
    this.w = Math.cos(rad);
    return this;
  }

  public getAxisAngle(): { axis: Vector3; angle: number } {
    const outAxis = new Vector3();
    const rad = Math.acos(this.w) * 2.0;
    const s = Math.sin(rad / 2.0);
    if (s > EPSILON) {
      outAxis.x = this.x / s;
      outAxis.y = this.y / s;
      outAxis.z = this.z / s;
    } else {
      outAxis.x = 1;
      outAxis.y = 0;
      outAxis.z = 0;
    }
    return { axis: outAxis, angle: rad };
  }

  public getAngle(b: Quaternion): number {
    const dotproduct = this.dot(b);

    return Math.acos(2 * dotproduct * dotproduct - 1);
  }

  public multiply(b: Quaternion): this {
    const ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    const bx = b.x,
      by = b.y,
      bz = b.z,
      bw = b.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;
    return this;
  }

  public rotateX(rad: number): this {
    rad *= 0.5;

    const ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    const bx = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw + aw * bx;
    this.y = ay * bw + az * bx;
    this.z = az * bw - ay * bx;
    this.w = aw * bw - ax * bx;
    return this;
  }

  public rotateY(rad: number): this {
    rad *= 0.5;

    const ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    const by = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw - az * by;
    this.y = ay * bw + aw * by;
    this.z = az * bw + ax * by;
    this.w = aw * bw - ay * by;
    return this;
  }

  public rotateZ(rad: number): this {
    rad *= 0.5;

    const ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    const bz = Math.sin(rad),
      bw = Math.cos(rad);

    this.x = ax * bw + ay * bz;
    this.y = ay * bw - ax * bz;
    this.z = az * bw + aw * bz;
    this.w = aw * bw - az * bz;
    return this;
  }

  public calculateW(): this {
    const x = this.x,
      y = this.y,
      z = this.z;

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return this;
  }

  public exp(): this {
    const x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;

    const r = Math.sqrt(x * x + y * y + z * z);
    const et = Math.exp(w);
    const s = r > 0 ? (et * Math.sin(r)) / r : 0;

    this.x = x * s;
    this.y = y * s;
    this.z = z * s;
    this.w = et * Math.cos(r);

    return this;
  }

  public ln(): this {
    const x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;

    const r = Math.sqrt(x * x + y * y + z * z);
    const t = r > 0 ? Math.atan2(r, w) / r : 0;

    this.x = x * t;
    this.y = y * t;
    this.z = z * t;
    this.w = 0.5 * Math.log(x * x + y * y + z * z + w * w);

    return this;
  }

  public pow(b: number): this {
    this.ln();
    this.scale(b);
    this.exp();
    return this;
  }

  public slerp(b: Quaternion, t: number): this {
    const ax = this.x,
      ay = this.y,
      az = this.z,
      aw = this.w;
    let bx = b.x,
      by = b.y,
      bz = b.z,
      bw = b.w;

    let omega, cosom, sinom, scale0, scale1;

    cosom = ax * bx + ay * by + az * bz + aw * bw;

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }

    if (1.0 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1.0 - t;
      scale1 = t;
    }

    this.x = scale0 * ax + scale1 * bx;
    this.y = scale0 * ay + scale1 * by;
    this.z = scale0 * az + scale1 * bz;
    this.w = scale0 * aw + scale1 * bw;

    return this;
  }

  public invert(): this {
    const a0 = this.x,
      a1 = this.y,
      a2 = this.z,
      a3 = this.w;
    const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    const invDot = dot ? 1.0 / dot : 0;

    this.x = -a0 * invDot;
    this.y = -a1 * invDot;
    this.z = -a2 * invDot;
    this.w = a3 * invDot;
    return this;
  }

  public conjugate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    // this.w = this.w;
    return this;
  }

  public fromMat3(m: Matrix3): this {
    const fTrace = m.array[0] + m.array[4] + m.array[8];
    let fRoot;
    const out = [0, 0, 0, 1];

    if (fTrace > 0.0) {
      fRoot = Math.sqrt(fTrace + 1.0);
      this.w = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      this.x = (m.array[5] - m.array[7]) * fRoot;
      this.y = (m.array[6] - m.array[2]) * fRoot;
      this.z = (m.array[1] - m.array[3]) * fRoot;
    } else {
      let i = 0;
      if (m.array[4] > m.array[0]) i = 1;
      if (m.array[8] > m.array[i * 3 + i]) i = 2;
      const j = (i + 1) % 3;
      const k = (i + 2) % 3;

      fRoot = Math.sqrt(
        m.array[i * 3 + i] - m.array[j * 3 + j] - m.array[k * 3 + k] + 1.0
      );
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      this.w = (m.array[j * 3 + k] - m.array[k * 3 + j]) * fRoot;
      out[j] = (m.array[j * 3 + i] + m.array[i * 3 + j]) * fRoot;
      out[k] = (m.array[k * 3 + i] + m.array[i * 3 + k]) * fRoot;
    }
    this.setArray(out);

    return this;
  }

  public fromEuler(x: number, y: number, z: number, order = "zyx"): this {
    const halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    const sx = Math.sin(x);
    const cx = Math.cos(x);
    const sy = Math.sin(y);
    const cy = Math.cos(y);
    const sz = Math.sin(z);
    const cz = Math.cos(z);

    switch (order) {
      case "xyz":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "xzy":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yxz":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz - sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yzx":
        this.x = sx * cy * cz + cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zxy":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz + sx * sy * cz;
        this.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zyx":
        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;
        break;

      default:
        throw new Error("Unknown angle order " + order);
    }

    return this;
  }

  public toString(): string {
    return (
      "quat(" +
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

  public clone(): Quaternion {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  public static fromArray(arr: number[]): Quaternion {
    return new Quaternion(arr[0], arr[1], arr[2], arr[3]);
  }

  public copy(a: Quaternion): this {
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

  public add(b: Quaternion): this {
    this.x = this.x + b.x;
    this.y = this.y + b.y;
    this.z = this.z + b.z;
    this.w = this.w + b.w;
    return this;
  }

  public subtract(b: Quaternion): this {
    this.x = this.x - b.x;
    this.y = this.y - b.y;
    this.z = this.z - b.z;
    this.w = this.w - b.w;
    return this;
  }

  public scale(b: number): this {
    this.x = this.x * b;
    this.y = this.y * b;
    this.z = this.z * b;
    this.w = this.w * b;
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

  public dot(b: Quaternion): number {
    return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
  }

  public lerp(b: Quaternion, t: number): this {
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

  public exactEquals(b: Quaternion): boolean {
    return this.x === b.x && this.y === b.y && this.z === b.z && this.w === b.w;
  }

  public equals(b: Quaternion): boolean {
    return Math.abs(this.dot(b)) >= 1 - EPSILON;
  }
}
