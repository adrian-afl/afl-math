import { EPSILON } from "./common";
import { Matrix2 } from "./Matrix2";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";

export class Matrix3 {
  public array: number[];

  public constructor() {
    this.array = new Array<number>(3 * 3);
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[5] = 0;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[0] = 1;
    this.array[4] = 1;
    this.array[8] = 1;
  }

  public clone(a: Matrix3): Matrix3 {
    const o = new Matrix3();
    o.array = [...a.array];

    return o;
  }

  public copy(a: Matrix3): this {
    a.array = [...a.array];
    return this;
  }

  public fromMat4(a: Matrix4): this {
    this.array[0] = a.array[0];
    this.array[1] = a.array[1];
    this.array[2] = a.array[2];
    this.array[3] = a.array[4];
    this.array[4] = a.array[5];
    this.array[5] = a.array[6];
    this.array[6] = a.array[8];
    this.array[7] = a.array[9];
    this.array[8] = a.array[10];
    return this;
  }

  public identity(): this {
    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 1;
    this.array[5] = 0;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 1;
    return this;
  }

  public transpose(): this {
    const a01 = this.array[1],
      a02 = this.array[2],
      a12 = this.array[5];
    this.array[1] = this.array[3];
    this.array[2] = this.array[6];
    this.array[3] = a01;
    this.array[5] = this.array[7];
    this.array[6] = a02;
    this.array[7] = a12;

    return this;
  }

  public invert(): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2];
    const a10 = this.array[3],
      a11 = this.array[4],
      a12 = this.array[5];
    const a20 = this.array[6],
      a21 = this.array[7],
      a22 = this.array[8];

    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;

    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return this;
    }
    det = 1.0 / det;

    this.array[0] = b01 * det;
    this.array[1] = (-a22 * a01 + a02 * a21) * det;
    this.array[2] = (a12 * a01 - a02 * a11) * det;
    this.array[3] = b11 * det;
    this.array[4] = (a22 * a00 - a02 * a20) * det;
    this.array[5] = (-a12 * a00 + a02 * a10) * det;
    this.array[6] = b21 * det;
    this.array[7] = (-a21 * a00 + a01 * a20) * det;
    this.array[8] = (a11 * a00 - a01 * a10) * det;
    return this;
  }

  public adjoint(): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2];
    const a10 = this.array[3],
      a11 = this.array[4],
      a12 = this.array[5];
    const a20 = this.array[6],
      a21 = this.array[7],
      a22 = this.array[8];

    this.array[0] = a11 * a22 - a12 * a21;
    this.array[1] = a02 * a21 - a01 * a22;
    this.array[2] = a01 * a12 - a02 * a11;
    this.array[3] = a12 * a20 - a10 * a22;
    this.array[4] = a00 * a22 - a02 * a20;
    this.array[5] = a02 * a10 - a00 * a12;
    this.array[6] = a10 * a21 - a11 * a20;
    this.array[7] = a01 * a20 - a00 * a21;
    this.array[8] = a00 * a11 - a01 * a10;
    return this;
  }

  public determinant(): number {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2];
    const a10 = this.array[3],
      a11 = this.array[4],
      a12 = this.array[5];
    const a20 = this.array[6],
      a21 = this.array[7],
      a22 = this.array[8];

    return (
      a00 * (a22 * a11 - a12 * a21) +
      a01 * (-a22 * a10 + a12 * a20) +
      a02 * (a21 * a10 - a11 * a20)
    );
  }

  public multiply(b: Matrix3): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2];
    const a10 = this.array[3],
      a11 = this.array[4],
      a12 = this.array[5];
    const a20 = this.array[6],
      a21 = this.array[7],
      a22 = this.array[8];

    const b00 = b.array[0],
      b01 = b.array[1],
      b02 = b.array[2];
    const b10 = b.array[3],
      b11 = b.array[4],
      b12 = b.array[5];
    const b20 = b.array[6],
      b21 = b.array[7],
      b22 = b.array[8];

    this.array[0] = b00 * a00 + b01 * a10 + b02 * a20;
    this.array[1] = b00 * a01 + b01 * a11 + b02 * a21;
    this.array[2] = b00 * a02 + b01 * a12 + b02 * a22;

    this.array[3] = b10 * a00 + b11 * a10 + b12 * a20;
    this.array[4] = b10 * a01 + b11 * a11 + b12 * a21;
    this.array[5] = b10 * a02 + b11 * a12 + b12 * a22;

    this.array[6] = b20 * a00 + b21 * a10 + b22 * a20;
    this.array[7] = b20 * a01 + b21 * a11 + b22 * a21;
    this.array[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return this;
  }

  // TODO this doesnt make sense
  //  translate(  v: vector3) {
  //   let a00 = this.array[0],
  //     a01 = this.array[1],
  //     a02 = this.array[2],
  //     a10 = this.array[3],
  //     a11 = this.array[4],
  //     a12 = this.array[5],
  //     a20 = this.array[6],
  //     a21 = this.array[7],
  //     a22 = this.array[8],
  //     x = v[0],
  //     y = v[1];
  //
  //   this.array[0] = a00;
  //   this.array[1] = a01;
  //   this.array[2] = a02;
  //
  //   this.array[3] = a10;
  //   this.array[4] = a11;
  //   this.array[5] = a12;
  //
  //   this.array[6] = x * a00 + y * a10 + a20;
  //   this.array[7] = x * a01 + y * a11 + a21;
  //   this.array[8] = x * a02 + y * a12 + a22;
  //   return this;
  // }

  public rotate(rad: number): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2],
      a10 = this.array[3],
      a11 = this.array[4],
      a12 = this.array[5],
      a20 = this.array[6],
      a21 = this.array[7],
      a22 = this.array[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

    this.array[0] = c * a00 + s * a10;
    this.array[1] = c * a01 + s * a11;
    this.array[2] = c * a02 + s * a12;

    this.array[3] = c * a10 - s * a00;
    this.array[4] = c * a11 - s * a01;
    this.array[5] = c * a12 - s * a02;

    this.array[6] = a20;
    this.array[7] = a21;
    this.array[8] = a22;
    return this;
  }

  // TODO this also doesnt make sense
  //  scale(  v) {
  //   let x = v[0],
  //     y = v[1];
  //
  //   this.array[0] = x * this.array[0];
  //   this.array[1] = x * this.array[1];
  //   this.array[2] = x * this.array[2];
  //
  //   this.array[3] = y * this.array[3];
  //   this.array[4] = y * this.array[4];
  //   this.array[5] = y * this.array[5];
  //
  //   this.array[6] = this.array[6];
  //   this.array[7] = this.array[7];
  //   this.array[8] = this.array[8];
  //   return this;
  // }
  // TODO and this too
  //  fromTranslation( v) {
  //   this.array[0] = 1;
  //   this.array[1] = 0;
  //   this.array[2] = 0;
  //   this.array[3] = 0;
  //   this.array[4] = 1;
  //   this.array[5] = 0;
  //   this.array[6] = v[0];
  //   this.array[7] = v[1];
  //   this.array[8] = 1;
  //   return this;
  // }

  // TODO what ?????
  //  fromRotation( rad: number) {
  //   let s = Math.sin(rad),
  //     c = Math.cos(rad);
  //
  //   this.array[0] = c;
  //   this.array[1] = s;
  //   this.array[2] = 0;
  //
  //   this.array[3] = -s;
  //   this.array[4] = c;
  //   this.array[5] = 0;
  //
  //   this.array[6] = 0;
  //   this.array[7] = 0;
  //   this.array[8] = 1;
  //   return this;
  // }
  //
  //  fromScaling( v) {
  //   this.array[0] = v[0];
  //   this.array[1] = 0;
  //   this.array[2] = 0;
  //
  //   this.array[3] = 0;
  //   this.array[4] = v[1];
  //   this.array[5] = 0;
  //
  //   this.array[6] = 0;
  //   this.array[7] = 0;
  //   this.array[8] = 1;
  //   return this;
  // }

  public fromMat2d(a: Matrix2): this {
    this.array[0] = a.array[0];
    this.array[1] = a.array[1];
    this.array[2] = 0;

    this.array[3] = a.array[2];
    this.array[4] = a.array[3];
    this.array[5] = 0;

    this.array[6] = a.array[4];
    this.array[7] = a.array[5];
    this.array[8] = 1;
    return this;
  }

  public fromQuat(q: Quaternion): this {
    const x = q.x,
      y = q.y,
      z = q.z,
      w = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;

    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    this.array[0] = 1 - yy - zz;
    this.array[3] = yx - wz;
    this.array[6] = zx + wy;

    this.array[1] = yx + wz;
    this.array[4] = 1 - xx - zz;
    this.array[7] = zy - wx;

    this.array[2] = zx - wy;
    this.array[5] = zy + wx;
    this.array[8] = 1 - xx - yy;

    return this;
  }

  public normalFromMat4(a: Matrix4): this {
    const a00 = a.array[0],
      a01 = a.array[1],
      a02 = a.array[2],
      a03 = a.array[3];
    const a10 = a.array[4],
      a11 = a.array[5],
      a12 = a.array[6],
      a13 = a.array[7];
    const a20 = a.array[8],
      a21 = a.array[9],
      a22 = a.array[10],
      a23 = a.array[11];
    const a30 = a.array[12],
      a31 = a.array[13],
      a32 = a.array[14],
      a33 = a.array[15];

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return this;
    }
    det = 1.0 / det;

    this.array[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    this.array[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    this.array[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    this.array[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    this.array[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    this.array[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    this.array[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    this.array[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    this.array[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return this;
  }

  public projection(width: number, height: number): this {
    this.array[0] = 2 / width;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = -2 / height;
    this.array[5] = 0;
    this.array[6] = -1;
    this.array[7] = 1;
    this.array[8] = 1;
    return this;
  }

  public toString(): string {
    return (
      "mat3(" +
      this.array[0].toString() +
      ", " +
      this.array[1].toString() +
      ", " +
      this.array[2].toString() +
      ", " +
      this.array[3].toString() +
      ", " +
      this.array[4].toString() +
      ", " +
      this.array[5].toString() +
      ", " +
      this.array[6].toString() +
      ", " +
      this.array[7].toString() +
      ", " +
      this.array[8].toString() +
      ")"
    );
  }

  public frob(): number {
    return Math.sqrt(
      this.array[0] * this.array[0] +
        this.array[1] * this.array[1] +
        this.array[2] * this.array[2] +
        this.array[3] * this.array[3] +
        this.array[4] * this.array[4] +
        this.array[5] * this.array[5] +
        this.array[6] * this.array[6] +
        this.array[7] * this.array[7] +
        this.array[8] * this.array[8]
    );
  }

  public add(b: Matrix3): this {
    this.array[0] = this.array[0] + b.array[0];
    this.array[1] = this.array[1] + b.array[1];
    this.array[2] = this.array[2] + b.array[2];
    this.array[3] = this.array[3] + b.array[3];
    this.array[4] = this.array[4] + b.array[4];
    this.array[5] = this.array[5] + b.array[5];
    this.array[6] = this.array[6] + b.array[6];
    this.array[7] = this.array[7] + b.array[7];
    this.array[8] = this.array[8] + b.array[8];
    return this;
  }

  public subtract(b: Matrix3): this {
    this.array[0] = this.array[0] - b.array[0];
    this.array[1] = this.array[1] - b.array[1];
    this.array[2] = this.array[2] - b.array[2];
    this.array[3] = this.array[3] - b.array[3];
    this.array[4] = this.array[4] - b.array[4];
    this.array[5] = this.array[5] - b.array[5];
    this.array[6] = this.array[6] - b.array[6];
    this.array[7] = this.array[7] - b.array[7];
    this.array[8] = this.array[8] - b.array[8];
    return this;
  }

  public multiplyScalar(b: number): this {
    this.array[0] = this.array[0] * b;
    this.array[1] = this.array[1] * b;
    this.array[2] = this.array[2] * b;
    this.array[3] = this.array[3] * b;
    this.array[4] = this.array[4] * b;
    this.array[5] = this.array[5] * b;
    this.array[6] = this.array[6] * b;
    this.array[7] = this.array[7] * b;
    this.array[8] = this.array[8] * b;
    return this;
  }

  public multiplyScalarAndAdd(b: Matrix3, scale: number): this {
    this.array[0] = this.array[0] + b.array[0] * scale;
    this.array[1] = this.array[1] + b.array[1] * scale;
    this.array[2] = this.array[2] + b.array[2] * scale;
    this.array[3] = this.array[3] + b.array[3] * scale;
    this.array[4] = this.array[4] + b.array[4] * scale;
    this.array[5] = this.array[5] + b.array[5] * scale;
    this.array[6] = this.array[6] + b.array[6] * scale;
    this.array[7] = this.array[7] + b.array[7] * scale;
    this.array[8] = this.array[8] + b.array[8] * scale;
    return this;
  }

  public exactEquals(b: Matrix3): boolean {
    return (
      this.array[0] === b.array[0] &&
      this.array[1] === b.array[1] &&
      this.array[2] === b.array[2] &&
      this.array[3] === b.array[3] &&
      this.array[4] === b.array[4] &&
      this.array[5] === b.array[5] &&
      this.array[6] === b.array[6] &&
      this.array[7] === b.array[7] &&
      this.array[8] === b.array[8]
    );
  }

  public equals(b: Matrix3): boolean {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3],
      a4 = this.array[4],
      a5 = this.array[5],
      a6 = this.array[6],
      a7 = this.array[7],
      a8 = this.array[8];
    const b0 = b.array[0],
      b1 = b.array[1],
      b2 = b.array[2],
      b3 = b.array[3],
      b4 = b.array[4],
      b5 = b.array[5],
      b6 = b.array[6],
      b7 = b.array[7],
      b8 = b.array[8];
    return (
      Math.abs(a0 - b0) <=
        EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <=
        EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <=
        EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
      Math.abs(a4 - b4) <=
        EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
      Math.abs(a5 - b5) <=
        EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
      Math.abs(a6 - b6) <=
        EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
      Math.abs(a7 - b7) <=
        EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
      Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8))
    );
  }
}
