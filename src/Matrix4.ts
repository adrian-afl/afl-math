import * as glMatrix from "./common.js";
import { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";

export class Matrix4 {
  public array: number[];

  public constructor() {
    this.array = new Array<number>(4 * 4);

    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;

    this.array[0] = 1;
    this.array[5] = 1;
    this.array[10] = 1;
    this.array[15] = 1;
  }

  public clone(): Matrix4 {
    const o = new Matrix4();
    o.array = [...this.array];

    return o;
  }

  public copy(a: Matrix4): this {
    a.array = [...a.array];
    return this;
  }

  public identity(): this {
    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = 1;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = 1;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public transpose(): this {
    const a01 = this.array[1],
      a02 = this.array[2],
      a03 = this.array[3];
    const a12 = this.array[6],
      a13 = this.array[7];
    const a23 = this.array[11];

    this.array[1] = this.array[4];
    this.array[2] = this.array[8];
    this.array[3] = this.array[12];
    this.array[4] = a01;
    this.array[6] = this.array[9];
    this.array[7] = this.array[13];
    this.array[8] = a02;
    this.array[9] = a12;
    this.array[11] = this.array[14];
    this.array[12] = a03;
    this.array[13] = a13;
    this.array[14] = a23;
    return this;
  }

  public invert(): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2],
      a03 = this.array[3];
    const a10 = this.array[4],
      a11 = this.array[5],
      a12 = this.array[6],
      a13 = this.array[7];
    const a20 = this.array[8],
      a21 = this.array[9],
      a22 = this.array[10],
      a23 = this.array[11];
    const a30 = this.array[12],
      a31 = this.array[13],
      a32 = this.array[14],
      a33 = this.array[15];

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
    this.array[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    this.array[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    this.array[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    this.array[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    this.array[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    this.array[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    this.array[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    this.array[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    this.array[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    this.array[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    this.array[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    this.array[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    this.array[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    this.array[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    this.array[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return this;
  }

  public adjoint(): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2],
      a03 = this.array[3];
    const a10 = this.array[4],
      a11 = this.array[5],
      a12 = this.array[6],
      a13 = this.array[7];
    const a20 = this.array[8],
      a21 = this.array[9],
      a22 = this.array[10],
      a23 = this.array[11];
    const a30 = this.array[12],
      a31 = this.array[13],
      a32 = this.array[14],
      a33 = this.array[15];

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

    this.array[0] = a11 * b11 - a12 * b10 + a13 * b09;
    this.array[1] = a02 * b10 - a01 * b11 - a03 * b09;
    this.array[2] = a31 * b05 - a32 * b04 + a33 * b03;
    this.array[3] = a22 * b04 - a21 * b05 - a23 * b03;
    this.array[4] = a12 * b08 - a10 * b11 - a13 * b07;
    this.array[5] = a00 * b11 - a02 * b08 + a03 * b07;
    this.array[6] = a32 * b02 - a30 * b05 - a33 * b01;
    this.array[7] = a20 * b05 - a22 * b02 + a23 * b01;
    this.array[8] = a10 * b10 - a11 * b08 + a13 * b06;
    this.array[9] = a01 * b08 - a00 * b10 - a03 * b06;
    this.array[10] = a30 * b04 - a31 * b02 + a33 * b00;
    this.array[11] = a21 * b02 - a20 * b04 - a23 * b00;
    this.array[12] = a11 * b07 - a10 * b09 - a12 * b06;
    this.array[13] = a00 * b09 - a01 * b07 + a02 * b06;
    this.array[14] = a31 * b01 - a30 * b03 - a32 * b00;
    this.array[15] = a20 * b03 - a21 * b01 + a22 * b00;
    return this;
  }

  public determinant(): number {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2],
      a03 = this.array[3];
    const a10 = this.array[4],
      a11 = this.array[5],
      a12 = this.array[6],
      a13 = this.array[7];
    const a20 = this.array[8],
      a21 = this.array[9],
      a22 = this.array[10],
      a23 = this.array[11];
    const a30 = this.array[12],
      a31 = this.array[13],
      a32 = this.array[14],
      a33 = this.array[15];

    const b0 = a00 * a11 - a01 * a10;
    const b1 = a00 * a12 - a02 * a10;
    const b2 = a01 * a12 - a02 * a11;
    const b3 = a20 * a31 - a21 * a30;
    const b4 = a20 * a32 - a22 * a30;
    const b5 = a21 * a32 - a22 * a31;
    const b6 = a00 * b5 - a01 * b4 + a02 * b3;
    const b7 = a10 * b5 - a11 * b4 + a12 * b3;
    const b8 = a20 * b2 - a21 * b1 + a22 * b0;
    const b9 = a30 * b2 - a31 * b1 + a32 * b0;

    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }

  public multiply(b: Matrix4): this {
    const a00 = this.array[0],
      a01 = this.array[1],
      a02 = this.array[2],
      a03 = this.array[3];
    const a10 = this.array[4],
      a11 = this.array[5],
      a12 = this.array[6],
      a13 = this.array[7];
    const a20 = this.array[8],
      a21 = this.array[9],
      a22 = this.array[10],
      a23 = this.array[11];
    const a30 = this.array[12],
      a31 = this.array[13],
      a32 = this.array[14],
      a33 = this.array[15];

    let b0 = b.array[0],
      b1 = b.array[1],
      b2 = b.array[2],
      b3 = b.array[3];
    this.array[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.array[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.array[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.array[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.array[4];
    b1 = b.array[5];
    b2 = b.array[6];
    b3 = b.array[7];
    this.array[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.array[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.array[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.array[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.array[8];
    b1 = b.array[9];
    b2 = b.array[10];
    b3 = b.array[11];
    this.array[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.array[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.array[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.array[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b.array[12];
    b1 = b.array[13];
    b2 = b.array[14];
    b3 = b.array[15];
    this.array[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.array[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.array[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.array[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return this;
  }

  public translate(v: Vector3): this {
    const x = v.x,
      y = v.y,
      z = v.z;
    this.array[12] =
      this.array[0] * x +
      this.array[4] * y +
      this.array[8] * z +
      this.array[12];
    this.array[13] =
      this.array[1] * x +
      this.array[5] * y +
      this.array[9] * z +
      this.array[13];
    this.array[14] =
      this.array[2] * x +
      this.array[6] * y +
      this.array[10] * z +
      this.array[14];
    this.array[15] =
      this.array[3] * x +
      this.array[7] * y +
      this.array[11] * z +
      this.array[15];

    return this;
  }

  public scale(v: Vector3): this {
    const x = v.x,
      y = v.y,
      z = v.z;

    this.array[0] = this.array[0] * x;
    this.array[1] = this.array[1] * x;
    this.array[2] = this.array[2] * x;
    this.array[3] = this.array[3] * x;
    this.array[4] = this.array[4] * y;
    this.array[5] = this.array[5] * y;
    this.array[6] = this.array[6] * y;
    this.array[7] = this.array[7] * y;
    this.array[8] = this.array[8] * z;
    this.array[9] = this.array[9] * z;
    this.array[10] = this.array[10] * z;
    this.array[11] = this.array[11] * z;
    // this.array[12] = this.array[12];
    // this.array[13] = this.array[13];
    // this.array[14] = this.array[14];
    // this.array[15] = this.array[15];
    return this;
  }

  public rotate(axis: Vector3, rad: number): this {
    let x = axis.x,
      y = axis.y,
      z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);

    if (len < glMatrix.EPSILON) {
      return this;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const a00 = this.array[0];
    const a01 = this.array[1];
    const a02 = this.array[2];
    const a03 = this.array[3];
    const a10 = this.array[4];
    const a11 = this.array[5];
    const a12 = this.array[6];
    const a13 = this.array[7];
    const a20 = this.array[8];
    const a21 = this.array[9];
    const a22 = this.array[10];
    const a23 = this.array[11];

    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;
    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;
    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;

    this.array[0] = a00 * b00 + a10 * b01 + a20 * b02;
    this.array[1] = a01 * b00 + a11 * b01 + a21 * b02;
    this.array[2] = a02 * b00 + a12 * b01 + a22 * b02;
    this.array[3] = a03 * b00 + a13 * b01 + a23 * b02;
    this.array[4] = a00 * b10 + a10 * b11 + a20 * b12;
    this.array[5] = a01 * b10 + a11 * b11 + a21 * b12;
    this.array[6] = a02 * b10 + a12 * b11 + a22 * b12;
    this.array[7] = a03 * b10 + a13 * b11 + a23 * b12;
    this.array[8] = a00 * b20 + a10 * b21 + a20 * b22;
    this.array[9] = a01 * b20 + a11 * b21 + a21 * b22;
    this.array[10] = a02 * b20 + a12 * b21 + a22 * b22;
    this.array[11] = a03 * b20 + a13 * b21 + a23 * b22;

    return this;
  }

  public rotateX(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a10 = this.array[4];
    const a11 = this.array[5];
    const a12 = this.array[6];
    const a13 = this.array[7];
    const a20 = this.array[8];
    const a21 = this.array[9];
    const a22 = this.array[10];
    const a23 = this.array[11];

    this.array[4] = a10 * c + a20 * s;
    this.array[5] = a11 * c + a21 * s;
    this.array[6] = a12 * c + a22 * s;
    this.array[7] = a13 * c + a23 * s;
    this.array[8] = a20 * c - a10 * s;
    this.array[9] = a21 * c - a11 * s;
    this.array[10] = a22 * c - a12 * s;
    this.array[11] = a23 * c - a13 * s;
    return this;
  }

  public rotateY(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = this.array[0];
    const a01 = this.array[1];
    const a02 = this.array[2];
    const a03 = this.array[3];
    const a20 = this.array[8];
    const a21 = this.array[9];
    const a22 = this.array[10];
    const a23 = this.array[11];

    this.array[0] = a00 * c - a20 * s;
    this.array[1] = a01 * c - a21 * s;
    this.array[2] = a02 * c - a22 * s;
    this.array[3] = a03 * c - a23 * s;
    this.array[8] = a00 * s + a20 * c;
    this.array[9] = a01 * s + a21 * c;
    this.array[10] = a02 * s + a22 * c;
    this.array[11] = a03 * s + a23 * c;
    return this;
  }

  public rotateZ(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = this.array[0];
    const a01 = this.array[1];
    const a02 = this.array[2];
    const a03 = this.array[3];
    const a10 = this.array[4];
    const a11 = this.array[5];
    const a12 = this.array[6];
    const a13 = this.array[7];

    this.array[0] = a00 * c + a10 * s;
    this.array[1] = a01 * c + a11 * s;
    this.array[2] = a02 * c + a12 * s;
    this.array[3] = a03 * c + a13 * s;
    this.array[4] = a10 * c - a00 * s;
    this.array[5] = a11 * c - a01 * s;
    this.array[6] = a12 * c - a02 * s;
    this.array[7] = a13 * c - a03 * s;
    return this;
  }

  public fromTranslation(v: Vector3): this {
    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = 1;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = 1;
    this.array[11] = 0;
    this.array[12] = v.x;
    this.array[13] = v.y;
    this.array[14] = v.z;
    this.array[15] = 1;
    return this;
  }

  public fromScaling(v: Vector3): this {
    this.array[0] = v.x;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = v.y;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = v.z;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public fromRotation(axis: Vector3, rad: number): this {
    let x = axis.x,
      y = axis.y,
      z = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);

    if (len < glMatrix.EPSILON) {
      return this;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    this.array[0] = x * x * t + c;
    this.array[1] = y * x * t + z * s;
    this.array[2] = z * x * t - y * s;
    this.array[3] = 0;
    this.array[4] = x * y * t - z * s;
    this.array[5] = y * y * t + c;
    this.array[6] = z * y * t + x * s;
    this.array[7] = 0;
    this.array[8] = x * z * t + y * s;
    this.array[9] = y * z * t - x * s;
    this.array[10] = z * z * t + c;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public fromXRotation(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.array[0] = 1;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = c;
    this.array[6] = s;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = -s;
    this.array[10] = c;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public fromYRotation(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.array[0] = c;
    this.array[1] = 0;
    this.array[2] = -s;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = 1;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = s;
    this.array[9] = 0;
    this.array[10] = c;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public fromZRotation(rad: number): this {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    this.array[0] = c;
    this.array[1] = s;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = -s;
    this.array[5] = c;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = 1;
    this.array[11] = 0;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;
    return this;
  }

  public fromRotationTranslation(q: Quaternion, v: Vector3): this {
    const x = q.x,
      y = q.y,
      z = q.z,
      w = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;

    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    this.array[0] = 1 - (yy + zz);
    this.array[1] = xy + wz;
    this.array[2] = xz - wy;
    this.array[3] = 0;
    this.array[4] = xy - wz;
    this.array[5] = 1 - (xx + zz);
    this.array[6] = yz + wx;
    this.array[7] = 0;
    this.array[8] = xz + wy;
    this.array[9] = yz - wx;
    this.array[10] = 1 - (xx + yy);
    this.array[11] = 0;
    this.array[12] = v.x;
    this.array[13] = v.y;
    this.array[14] = v.z;
    this.array[15] = 1;

    return this;
  }

  public fromRotationTranslationScale(
    q: Quaternion,
    translation: Vector3,
    scale: Vector3
  ): this {
    const x = q.x,
      y = q.y,
      z = q.z,
      w = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;

    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const sx = scale.x;
    const sy = scale.y;
    const sz = scale.z;

    this.array[0] = (1 - (yy + zz)) * sx;
    this.array[1] = (xy + wz) * sx;
    this.array[2] = (xz - wy) * sx;
    this.array[3] = 0;
    this.array[4] = (xy - wz) * sy;
    this.array[5] = (1 - (xx + zz)) * sy;
    this.array[6] = (yz + wx) * sy;
    this.array[7] = 0;
    this.array[8] = (xz + wy) * sz;
    this.array[9] = (yz - wx) * sz;
    this.array[10] = (1 - (xx + yy)) * sz;
    this.array[11] = 0;
    this.array[12] = translation.x;
    this.array[13] = translation.y;
    this.array[14] = translation.z;
    this.array[15] = 1;

    return this;
  }

  public getTranslation(): Vector3 {
    return new Vector3(this.array[12], this.array[13], this.array[14]);
  }

  public getScaling(): Vector3 {
    const m11 = this.array[0];
    const m12 = this.array[1];
    const m13 = this.array[2];
    const m21 = this.array[4];
    const m22 = this.array[5];
    const m23 = this.array[6];
    const m31 = this.array[8];
    const m32 = this.array[9];
    const m33 = this.array[10];

    return new Vector3(
      Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
      Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
      Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33)
    );
  }

  public getRotation(): Quaternion {
    const scaling = this.getScaling();

    const is1 = 1 / scaling.x;
    const is2 = 1 / scaling.y;
    const is3 = 1 / scaling.z;

    const sm11 = this.array[0] * is1;
    const sm12 = this.array[1] * is2;
    const sm13 = this.array[2] * is3;
    const sm21 = this.array[4] * is1;
    const sm22 = this.array[5] * is2;
    const sm23 = this.array[6] * is3;
    const sm31 = this.array[8] * is1;
    const sm32 = this.array[9] * is2;
    const sm33 = this.array[10] * is3;

    const trace = sm11 + sm22 + sm33;
    let s = 0;

    const out = new Quaternion();

    if (trace > 0) {
      s = Math.sqrt(trace + 1.0) * 2;
      out.w = 0.25 * s;
      out.x = (sm23 - sm32) / s;
      out.y = (sm31 - sm13) / s;
      out.z = (sm12 - sm21) / s;
    } else if (sm11 > sm22 && sm11 > sm33) {
      s = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out.w = (sm23 - sm32) / s;
      out.x = 0.25 * s;
      out.y = (sm12 + sm21) / s;
      out.z = (sm31 + sm13) / s;
    } else if (sm22 > sm33) {
      s = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out.w = (sm31 - sm13) / s;
      out.x = (sm12 + sm21) / s;
      out.y = 0.25 * s;
      out.z = (sm23 + sm32) / s;
    } else {
      s = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out.w = (sm12 - sm21) / s;
      out.x = (sm31 + sm13) / s;
      out.y = (sm23 + sm32) / s;
      out.z = 0.25 * s;
    }

    return out;
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
    this.array[1] = yx + wz;
    this.array[2] = zx - wy;
    this.array[3] = 0;

    this.array[4] = yx - wz;
    this.array[5] = 1 - xx - zz;
    this.array[6] = zy + wx;
    this.array[7] = 0;

    this.array[8] = zx + wy;
    this.array[9] = zy - wx;
    this.array[10] = 1 - xx - yy;
    this.array[11] = 0;

    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = 0;
    this.array[15] = 1;

    return this;
  }

  public frustum(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): this {
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const nf = 1 / (near - far);
    this.array[0] = near * 2 * rl;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = near * 2 * tb;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = (right + left) * rl;
    this.array[9] = (top + bottom) * tb;
    this.array[10] = (far + near) * nf;
    this.array[11] = -1;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[14] = far * near * 2 * nf;
    this.array[15] = 0;
    return this;
  }

  public perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number | null
  ): this {
    const f = 1.0 / Math.tan(fovy / 2);
    this.array[0] = f / aspect;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = f;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[11] = -1;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[15] = 0;
    if (far !== null && far !== Infinity) {
      const nf = 1 / (near - far);
      this.array[10] = (far + near) * nf;
      this.array[14] = 2 * far * near * nf;
    } else {
      this.array[10] = -1;
      this.array[14] = -2 * near;
    }
    return this;
  }

  public perspectiveZO(
    fovy: number,
    aspect: number,
    near: number,
    far: number | null
  ): this {
    const f = 1.0 / Math.tan(fovy / 2);
    this.array[0] = f / aspect;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = f;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[11] = -1;
    this.array[12] = 0;
    this.array[13] = 0;
    this.array[15] = 0;
    if (far !== null && far !== Infinity) {
      const nf = 1 / (near - far);
      this.array[10] = far * nf;
      this.array[14] = far * near * nf;
    } else {
      this.array[10] = -1;
      this.array[14] = -near;
    }
    return this;
  }

  public ortho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): this {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    this.array[0] = -2 * lr;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = -2 * bt;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = 2 * nf;
    this.array[11] = 0;
    this.array[12] = (left + right) * lr;
    this.array[13] = (top + bottom) * bt;
    this.array[14] = (far + near) * nf;
    this.array[15] = 1;
    return this;
  }

  public orthoZO(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): this {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    this.array[0] = -2 * lr;
    this.array[1] = 0;
    this.array[2] = 0;
    this.array[3] = 0;
    this.array[4] = 0;
    this.array[5] = -2 * bt;
    this.array[6] = 0;
    this.array[7] = 0;
    this.array[8] = 0;
    this.array[9] = 0;
    this.array[10] = nf;
    this.array[11] = 0;
    this.array[12] = (left + right) * lr;
    this.array[13] = (top + bottom) * bt;
    this.array[14] = near * nf;
    this.array[15] = 1;
    return this;
  }

  public lookAt(eye: Vector3, center: Vector3, up: Vector3): this {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    const eyex = eye.x;
    const eyey = eye.y;
    const eyez = eye.z;
    const upx = up.x;
    const upy = up.y;
    const upz = up.z;
    const centerx = center.x;
    const centery = center.y;
    const centerz = center.z;

    if (
      Math.abs(eyex - centerx) < glMatrix.EPSILON &&
      Math.abs(eyey - centery) < glMatrix.EPSILON &&
      Math.abs(eyez - centerz) < glMatrix.EPSILON
    ) {
      return this.identity();
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    this.array[0] = x0;
    this.array[1] = y0;
    this.array[2] = z0;
    this.array[3] = 0;
    this.array[4] = x1;
    this.array[5] = y1;
    this.array[6] = z1;
    this.array[7] = 0;
    this.array[8] = x2;
    this.array[9] = y2;
    this.array[10] = z2;
    this.array[11] = 0;
    this.array[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    this.array[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    this.array[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    this.array[15] = 1;

    return this;
  }

  public targetTo(eye: Vector3, target: Vector3, up: Vector3): this {
    const eyex = eye.x,
      eyey = eye.y,
      eyez = eye.z,
      upx = up.x,
      upy = up.y,
      upz = up.z;

    let z0 = eyex - target.x,
      z1 = eyey - target.y,
      z2 = eyez - target.z;

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    this.array[0] = x0;
    this.array[1] = x1;
    this.array[2] = x2;
    this.array[3] = 0;
    this.array[4] = z1 * x2 - z2 * x1;
    this.array[5] = z2 * x0 - z0 * x2;
    this.array[6] = z0 * x1 - z1 * x0;
    this.array[7] = 0;
    this.array[8] = z0;
    this.array[9] = z1;
    this.array[10] = z2;
    this.array[11] = 0;
    this.array[12] = eyex;
    this.array[13] = eyey;
    this.array[14] = eyez;
    this.array[15] = 1;
    return this;
  }

  public toString(): string {
    return (
      "mat4(" +
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
      ", " +
      this.array[9].toString() +
      ", " +
      this.array[10].toString() +
      ", " +
      this.array[11].toString() +
      ", " +
      this.array[12].toString() +
      ", " +
      this.array[13].toString() +
      ", " +
      this.array[14].toString() +
      ", " +
      this.array[15].toString() +
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
        this.array[8] * this.array[8] +
        this.array[9] * this.array[9] +
        this.array[10] * this.array[10] +
        this.array[11] * this.array[11] +
        this.array[12] * this.array[12] +
        this.array[13] * this.array[13] +
        this.array[14] * this.array[14] +
        this.array[15] * this.array[15]
    );
  }

  public add(b: Matrix4): this {
    this.array[0] = this.array[0] + b.array[0];
    this.array[1] = this.array[1] + b.array[1];
    this.array[2] = this.array[2] + b.array[2];
    this.array[3] = this.array[3] + b.array[3];
    this.array[4] = this.array[4] + b.array[4];
    this.array[5] = this.array[5] + b.array[5];
    this.array[6] = this.array[6] + b.array[6];
    this.array[7] = this.array[7] + b.array[7];
    this.array[8] = this.array[8] + b.array[8];
    this.array[9] = this.array[9] + b.array[9];
    this.array[10] = this.array[10] + b.array[10];
    this.array[11] = this.array[11] + b.array[11];
    this.array[12] = this.array[12] + b.array[12];
    this.array[13] = this.array[13] + b.array[13];
    this.array[14] = this.array[14] + b.array[14];
    this.array[15] = this.array[15] + b.array[15];
    return this;
  }

  public subtract(b: Matrix4): this {
    this.array[0] = this.array[0] - b.array[0];
    this.array[1] = this.array[1] - b.array[1];
    this.array[2] = this.array[2] - b.array[2];
    this.array[3] = this.array[3] - b.array[3];
    this.array[4] = this.array[4] - b.array[4];
    this.array[5] = this.array[5] - b.array[5];
    this.array[6] = this.array[6] - b.array[6];
    this.array[7] = this.array[7] - b.array[7];
    this.array[8] = this.array[8] - b.array[8];
    this.array[9] = this.array[9] - b.array[9];
    this.array[10] = this.array[10] - b.array[10];
    this.array[11] = this.array[11] - b.array[11];
    this.array[12] = this.array[12] - b.array[12];
    this.array[13] = this.array[13] - b.array[13];
    this.array[14] = this.array[14] - b.array[14];
    this.array[15] = this.array[15] - b.array[15];
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
    this.array[9] = this.array[9] * b;
    this.array[10] = this.array[10] * b;
    this.array[11] = this.array[11] * b;
    this.array[12] = this.array[12] * b;
    this.array[13] = this.array[13] * b;
    this.array[14] = this.array[14] * b;
    this.array[15] = this.array[15] * b;
    return this;
  }

  public multiplyScalarAndAdd(b: Matrix4, scale: number): this {
    this.array[0] = this.array[0] + b.array[0] * scale;
    this.array[1] = this.array[1] + b.array[1] * scale;
    this.array[2] = this.array[2] + b.array[2] * scale;
    this.array[3] = this.array[3] + b.array[3] * scale;
    this.array[4] = this.array[4] + b.array[4] * scale;
    this.array[5] = this.array[5] + b.array[5] * scale;
    this.array[6] = this.array[6] + b.array[6] * scale;
    this.array[7] = this.array[7] + b.array[7] * scale;
    this.array[8] = this.array[8] + b.array[8] * scale;
    this.array[9] = this.array[9] + b.array[9] * scale;
    this.array[10] = this.array[10] + b.array[10] * scale;
    this.array[11] = this.array[11] + b.array[11] * scale;
    this.array[12] = this.array[12] + b.array[12] * scale;
    this.array[13] = this.array[13] + b.array[13] * scale;
    this.array[14] = this.array[14] + b.array[14] * scale;
    this.array[15] = this.array[15] + b.array[15] * scale;
    return this;
  }

  public exactEquals(b: Matrix4): boolean {
    return (
      this.array[0] === b.array[0] &&
      this.array[1] === b.array[1] &&
      this.array[2] === b.array[2] &&
      this.array[3] === b.array[3] &&
      this.array[4] === b.array[4] &&
      this.array[5] === b.array[5] &&
      this.array[6] === b.array[6] &&
      this.array[7] === b.array[7] &&
      this.array[8] === b.array[8] &&
      this.array[9] === b.array[9] &&
      this.array[10] === b.array[10] &&
      this.array[11] === b.array[11] &&
      this.array[12] === b.array[12] &&
      this.array[13] === b.array[13] &&
      this.array[14] === b.array[14] &&
      this.array[15] === b.array[15]
    );
  }

  public equals(b: Matrix4): boolean {
    const a0 = this.array[0],
      a1 = this.array[1],
      a2 = this.array[2],
      a3 = this.array[3];
    const a4 = this.array[4],
      a5 = this.array[5],
      a6 = this.array[6],
      a7 = this.array[7];
    const a8 = this.array[8],
      a9 = this.array[9],
      a10 = this.array[10],
      a11 = this.array[11];
    const a12 = this.array[12],
      a13 = this.array[13],
      a14 = this.array[14],
      a15 = this.array[15];

    const b0 = b.array[0],
      b1 = b.array[1],
      b2 = b.array[2],
      b3 = b.array[3];
    const b4 = b.array[4],
      b5 = b.array[5],
      b6 = b.array[6],
      b7 = b.array[7];
    const b8 = b.array[8],
      b9 = b.array[9],
      b10 = b.array[10],
      b11 = b.array[11];
    const b12 = b.array[12],
      b13 = b.array[13],
      b14 = b.array[14],
      b15 = b.array[15];

    return (
      Math.abs(a0 - b0) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
      Math.abs(a4 - b4) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
      Math.abs(a5 - b5) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
      Math.abs(a6 - b6) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
      Math.abs(a7 - b7) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
      Math.abs(a8 - b8) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
      Math.abs(a9 - b9) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
      Math.abs(a10 - b10) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
      Math.abs(a11 - b11) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
      Math.abs(a12 - b12) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
      Math.abs(a13 - b13) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
      Math.abs(a14 - b14) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
      Math.abs(a15 - b15) <=
        glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15))
    );
  }
}
