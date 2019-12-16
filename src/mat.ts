import { Vec3 } from './vec';

export class Mat2 extends Float32Array {
    static readonly DIM = 2;

    constructor(scale = 1) {
        super(4);
        this[0] = this[3] = scale;
    }

    public static clone(arr: Float32Array): Mat2 {
        const out = new Mat2();
        out.set(arr.subarray(0, this.DIM * this.DIM));

        return out;
    }

    public static from(arr: number[]): Mat2 {
        const out = new Mat2();
        out.set(arr.slice(0, this.DIM * this.DIM));

        return out;
    }

    public static fromValues(m11: number, m21: number, m12: number, m22: number, out = new Mat2()): Mat2 {
        out[0] = m11;
        out[1] = m21;
        out[2] = m12;
        out[3] = m22;

        return out;
    }

    public static identity(out: Mat2): Mat2 {
        out[0] = 1; out[2] = 0;
        out[1] = 0; out[3] = 1;

        return out;
    }

    public static det(mat: Mat2): number {
        return mat[0] * mat[3] - mat[1] * mat[2];
    }

    public static add(a: Mat2, b: Mat2, out = new Mat2()): Mat2 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];

        return out;
    }

    public static subtract(a: Mat2, b: Mat2, out = new Mat2()): Mat2 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];

        return out;
    }

    public static multiply(a: Mat2, b: Mat2, out = new Mat2()): Mat2 {
        // TODO: Fix this from breaking when same array applied to multiple params
        out[0] = (a[0] * b[0]) + (a[2] * b[1]);
        out[1] = (a[1] * b[0]) + (a[3] * b[1]);
        out[2] = (a[0] * b[2]) + (a[2] * b[3]);
        out[3] = (a[1] * b[2]) + (a[3] * b[3]);

        return out;
    }

    public static invert(mat: Mat2, out = new Mat2()): Mat2 {
        // TODO: Fix this from breaking when same array applied to multiple params
        let det = mat[0] * mat[3] - mat[1] * mat[2];

        // It's okay if this throws.
        det = 1.0 / det;

        out[0] =  mat[3] * det;
        out[1] = -mat[1] * det;
        out[2] = -mat[2] * det;
        out[3] =  mat[0] * det;

        return out;
    }
}

export class Mat4 extends Float32Array {
    static readonly DIM = 4;

    constructor(scale = 1) {
        super(16);
        this[0] = this[5] = this[10] = this[15] = scale;
    }

    public static clone(arr: Float32Array): Mat4 {
        const out = new Mat4();
        // TODO: Slice used to be subarray because it is faster.
        //       Works in browser console, but webpack seems to break it.
        //       Cloned identity matrix gets its 1s replaced with NaNs.
        //       If impossible to fix. Delete method, use from instead.
        out.set(arr.slice(0, this.DIM * this.DIM));

        return out;
    }

    public static from(arr: number[]): Mat4 {
        const out = new Mat4();
        out.set(arr.slice(0, this.DIM * this.DIM));

        return out;
    }

    public static fromValues(
        m11: number, m21: number, m31: number, m41: number,
        m12: number, m22: number, m32: number, m42: number,
        m13: number, m23: number, m33: number, m43: number,
        m14: number, m24: number, m34: number, m44: number, out = new Mat4(),
    ): Mat4 {
        out[0] = m11; out[4] = m12; out[8]  = m13; out[12] = m14;
        out[1] = m21; out[5] = m22; out[9]  = m23; out[13] = m24;
        out[2] = m31; out[6] = m32; out[10] = m33; out[14] = m34;
        out[3] = m41; out[7] = m42; out[11] = m43; out[15] = m44;

        return out;
    }

    public static fromMat2s(m11: Mat2, m21: Mat2, m12: Mat2, m22: Mat2, out = new Mat4()): Mat4 {
        out[0] = m11[0]; out[4] = m11[2]; out[8]  = m12[0]; out[12] = m12[2];
        out[1] = m11[1]; out[5] = m11[3]; out[9]  = m12[1]; out[13] = m12[3];
        out[2] = m21[0]; out[6] = m21[2]; out[10] = m22[0]; out[14] = m22[2];
        out[3] = m21[1]; out[7] = m21[3]; out[11] = m22[1]; out[15] = m22[3];

        return out;
    }

    public static equals(a: Mat4, b: Mat4): boolean {
        return a[0] === b[0] && a[4] === b[4] && a[8]  === b[8]  && a[12] === b[12] &&
               a[1] === b[1] && a[5] === b[5] && a[9]  === b[9]  && a[13] === b[13] &&
               a[2] === b[2] && a[6] === b[6] && a[10] === b[10] && a[14] === b[14] &&
               a[3] === b[3] && a[7] === b[7] && a[11] === b[11] && a[15] === b[15];
    }

    public static perspectiveMatrix(xFov: number, aspect: number, near: number, far: number): Mat4 {
        // TODO: Is there an equivalent formula for xFov without conversion to yFov?
        //       http://ogldev.atspace.co.uk/www/tutorial12/tutorial12.html
        const out = new Mat4();
        const aspectInv = 1 / aspect;
        const yFovHalved = xFov * aspectInv / 2;
        out[5] = 1 / Math.tan(yFovHalved);
        out[0] = out[5] * aspectInv;
        const nearFarDiffInv = 1 / (near - far);
        out[10] = (near + far) * nearFarDiffInv;
        out[11] = -1;
        out[14] = 2 * near * far * nearFarDiffInv;
        out[15] = 0;

        return out;
    }

    public static identity(out: Mat4): Mat4 {
        out[0] = 1; out[4] = 0; out[8]  = 0; out[12] = 0;
        out[1] = 0; out[5] = 1; out[9]  = 0; out[13] = 0;
        out[2] = 0; out[6] = 0; out[10] = 1; out[14] = 0;
        out[3] = 0; out[7] = 0; out[11] = 0; out[15] = 1;

        return out;
    }

    public static scaleMatrix(x: number, y: number, z: number): Mat4 {
        return Mat4.fromValues(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1,
        );
    }

    public static scale(mat: Mat4, x: number, y: number, z: number, out = new Mat4()): Mat4 {
        out[0]  = mat[0]  * x;
        out[5]  = mat[5]  * y;
        out[10] = mat[10] * z;

        if (out !== mat) {
            out[1]  = mat[1];
            out[2]  = mat[2];
            out[3]  = mat[3];
            out[4]  = mat[4];
            out[6]  = mat[6];
            out[7]  = mat[7];
            out[8]  = mat[8];
            out[9]  = mat[9];
            out[11] = mat[11];
            out[12] = mat[12];
            out[13] = mat[13];
            out[14] = mat[14];
            out[15] = mat[15];
        }

        return out;
    }

    public static translationMatrix(x: number, y: number, z: number): Mat4 {
        return Mat4.fromValues(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1,
        );
    }

    /**
     * Translates the x, y, z components of the matrix. If the projection row
     * of the matrix is not [0, 0, 0, w], then this will not act like a left-
     * multiplication of a translation matrix.
     * @param mat
     * @param x
     * @param y
     * @param z
     * @param out
     */
    public static translateWorld(mat: Mat4, x: number, y: number, z: number, out = new Mat4()): Mat4 {
        out[12] = mat[12] + mat[15] * x;
        out[13] = mat[13] + mat[15] * y;
        out[14] = mat[14] + mat[15] * z;

        if (out !== mat) {
            out[0] = mat[0]; out[4] = mat[4]; out[8]  = mat[8];
            out[1] = mat[1]; out[5] = mat[5]; out[9]  = mat[9];
            out[2] = mat[2]; out[6] = mat[6]; out[10] = mat[10];
            out[3] = mat[3]; out[7] = mat[7]; out[11] = mat[11]; out[15] = mat[15];
        }

        return out;
    }

    public static translate(mat: Mat4, x: number, y: number, z: number, out = new Mat4()): Mat4 {
        this.translateWorld(mat, x * mat[0], x * mat[1], x * mat[2], out);
        this.translateWorld(out, y * mat[4], y * mat[5], y * mat[6], out);
        this.translateWorld(out, z * mat[8], z * mat[9], z * mat[10], out);

        return out;
    }

    public static rotationXMatrix(radians: number): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        return Mat4.fromValues(
            1, 0, 0, 0,
            0, cos, sin, 0,
            0, -sin, cos, 0,
            0, 0, 0, 1,
        );
    }

    public static rotateX(mat: Mat4, radians: number, out = new Mat4()): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        // Written with the possibility mat === out in mind.
        let matTmp = mat[1];
        out[1]  = mat[1]  * cos - mat[2]  * sin;
        out[2]  = matTmp  * sin + mat[2]  * cos;

        matTmp  = mat[5];
        out[5]  = mat[5]  * cos - mat[6]  * sin;
        out[6]  = matTmp  * sin + mat[6]  * cos;

        matTmp  = mat[9];
        out[9]  = mat[9]  * cos - mat[10] * sin;
        out[10] = matTmp  * sin + mat[10] * cos;

        matTmp  = mat[13];
        out[13] = mat[13] * cos - mat[14] * sin;
        out[14] = matTmp  * sin + mat[14] * cos;

        if (out !== mat) {
            out[0]  = mat[0];
            out[3]  = mat[3];
            out[4]  = mat[4];
            out[7]  = mat[7];
            out[8]  = mat[8];
            out[11] = mat[11];
            out[12] = mat[12];
            out[15] = mat[15];
        }

        return out;
    }

    public static rotationYMatrix(radians: number): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        return Mat4.fromValues(
            cos, 0, -sin, 0,
            0, 1, 0, 0,
            sin, 0, cos, 0,
            0, 0, 0, 1,
        );
    }

    public static rotateY(mat: Mat4, radians: number, out = new Mat4()): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        // Written with the possibility mat === out in mind.
        let matTmp = mat[0];
        out[0]  = mat[0]  * cos + mat[2]  * sin;
        out[2]  = mat[2]  * cos - matTmp  * sin;

        matTmp  = mat[4];
        out[4]  = mat[4]  * cos + mat[6]  * sin;
        out[6]  = mat[6]  * cos - matTmp  * sin;

        matTmp  = mat[8];
        out[8]  = mat[8]  * cos + mat[10] * sin;
        out[10] = mat[10] * cos - matTmp  * sin;

        matTmp  = mat[12];
        out[12] = mat[12] * cos + mat[14] * sin;
        out[14] = mat[14] * cos - matTmp  * sin;

        if (out !== mat) {
            out[1]  = mat[1];
            out[3]  = mat[3];
            out[5]  = mat[5];
            out[7]  = mat[7];
            out[9]  = mat[9];
            out[11] = mat[11];
            out[13] = mat[13];
            out[15] = mat[15];
        }

        return out;
    }


    public static rotationZMatrix(radians: number): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        return Mat4.fromValues(
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        );
    }

    public static rotateZ(mat: Mat4, radians: number, out = new Mat4()): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        // Written with the possibility mat === out in mind.
        let matTmp = mat[0];
        out[0]  = mat[0]  * cos - mat[1]  * sin;
        out[1]  = matTmp  * sin + mat[1]  * cos;

        matTmp  = mat[4];
        out[4]  = mat[4]  * cos - mat[5]  * sin;
        out[5]  = matTmp  * sin + mat[5]  * cos;

        matTmp  = mat[8];
        out[8]  = mat[8]  * cos - mat[9]  * sin;
        out[9]  = matTmp  * sin + mat[9]  * cos;

        matTmp  = mat[12];
        out[12] = mat[12] * cos - mat[13] * sin;
        out[13] = matTmp  * sin + mat[13] * cos;

        if (out !== mat) {
            out[2]  = mat[2];
            out[3]  = mat[3];
            out[6]  = mat[6];
            out[7]  = mat[7];
            out[10] = mat[10];
            out[11] = mat[11];
            out[14] = mat[14];
            out[15] = mat[15];
        }

        return out;
    }

    public static rotationMatrix(radians: number, axis: Vec3): Mat4 {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const com = 1 - cos;
        Vec3.normalize(axis, axis);
        const x = axis[0];
        const y = axis[1];
        const z = axis[2];
        const xSin = x * sin;
        const ySin = y * sin;
        const zSin = z * sin;
        const xCom = x * com;
        const xxCom = x * xCom;
        const xyCom = y * xCom;
        const xzCom = z * xCom;
        const yCom = y * com;
        const yyCom = y * yCom;
        const yzCom = z * yCom;
        const zzCom = z * z * com;

        return Mat4.fromValues(
            cos + xxCom, xyCom + zSin, xzCom - ySin, 0,
            xyCom - zSin, cos + yyCom, yzCom + xSin, 0,
            xzCom + ySin, yzCom - xSin, cos + zzCom, 0,
            0, 0, 0, 1,
        );
    }

    public static rotate(mat: Mat4, radians: number, axis: Vec3, out = new Mat4()): Mat4 {
        return Mat4.multiply(Mat4.rotationMatrix(radians, axis), mat, out);
    }

    public static det(mat: Mat4): number {
        /**
         * Optimized for the fact that the last row is likely [0, 0, 0, 1]
         */
        const m11 = mat[0]; const m12 = mat[4]; const m13 = mat[8];  const m14 = mat[12];
        const m21 = mat[1]; const m22 = mat[5]; const m23 = mat[9];  const m24 = mat[13];
        const m31 = mat[2]; const m32 = mat[6]; const m33 = mat[10]; const m34 = mat[14];
        const m41 = mat[3]; const m42 = mat[7]; const m43 = mat[11]; const m44 = mat[15];

        const a = (m13 * m24) - (m14 * m23);
        const b = (m12 * m24) - (m14 * m22);
        const c = (m12 * m23) - (m13 * m22);
        const d = (m11 * m24) - (m14 * m21);
        const e = (m11 * m23) - (m13 * m21);
        const f = (m11 * m22) - (m12 * m21);

        return m44 * (m31 * c - m32 * e + m33 * f) -
               m43 * (m31 * b - m32 * d + m34 * f) +
               m42 * (m32 * a - m33 * d + m34 * e) -
               m41 * (m32 * a - m33 * b + m34 * c);
    }

    public static multiply(a: Mat4, b: Mat4, out = new Mat4()): Mat4 {
        // TODO: Is there a point of making this an in place operation if
        //       a bunch of variables are being assigned temporarily?
        const out0  = (a[0] * b[0])  + (a[4] * b[1])  + (a[8]  * b[2])  + (a[12] * b[3]);
        const out1  = (a[1] * b[0])  + (a[5] * b[1])  + (a[9]  * b[2])  + (a[13] * b[3]);
        const out2  = (a[2] * b[0])  + (a[6] * b[1])  + (a[10] * b[2])  + (a[14] * b[3]);
        const out3  = (a[3] * b[0])  + (a[7] * b[1])  + (a[11] * b[2])  + (a[15] * b[3]);

        const out4  = (a[0] * b[4])  + (a[4] * b[5])  + (a[8]  * b[6])  + (a[12] * b[7]);
        const out5  = (a[1] * b[4])  + (a[5] * b[5])  + (a[9]  * b[6])  + (a[13] * b[7]);
        const out6  = (a[2] * b[4])  + (a[6] * b[5])  + (a[10] * b[6])  + (a[14] * b[7]);
        const out7  = (a[3] * b[4])  + (a[7] * b[5])  + (a[11] * b[6])  + (a[15] * b[7]);

        const out8  = (a[0] * b[8])  + (a[4] * b[9])  + (a[8]  * b[10]) + (a[12] * b[11]);
        const out9  = (a[1] * b[8])  + (a[5] * b[9])  + (a[9]  * b[10]) + (a[13] * b[11]);
        const out10 = (a[2] * b[8])  + (a[6] * b[9])  + (a[10] * b[10]) + (a[14] * b[11]);
        const out11 = (a[3] * b[8])  + (a[7] * b[9])  + (a[11] * b[10]) + (a[15] * b[11]);

        const out12 = (a[0] * b[12]) + (a[4] * b[13]) + (a[8]  * b[14]) + (a[12] * b[15]);
        const out13 = (a[1] * b[12]) + (a[5] * b[13]) + (a[9]  * b[14]) + (a[13] * b[15]);
        const out14 = (a[2] * b[12]) + (a[6] * b[13]) + (a[10] * b[14]) + (a[14] * b[15]);
        const out15 = (a[3] * b[12]) + (a[7] * b[13]) + (a[11] * b[14]) + (a[15] * b[15]);

        out[0]  = out0;
        out[1]  = out1;
        out[2]  = out2;
        out[3]  = out3;
        out[4]  = out4;
        out[5]  = out5;
        out[6]  = out6;
        out[7]  = out7;
        out[8]  = out8;
        out[9]  = out9;
        out[10] = out10;
        out[11] = out11;
        out[12] = out12;
        out[13] = out13;
        out[14] = out14;
        out[15] = out15;

        return out;
    }

    public static invert(mat: Mat4, out = new Mat4()): Mat4 {
        const out0 =
            mat[5]  * mat[10] * mat[15] -
            mat[5]  * mat[11] * mat[14] -
            mat[9]  * mat[6]  * mat[15] +
            mat[9]  * mat[7]  * mat[14] +
            mat[13] * mat[6]  * mat[11] -
            mat[13] * mat[7]  * mat[10];
        const out4 =
           -mat[4]  * mat[10] * mat[15] +
            mat[4]  * mat[11] * mat[14] +
            mat[8]  * mat[6]  * mat[15] -
            mat[8]  * mat[7]  * mat[14] -
            mat[12] * mat[6]  * mat[11] +
            mat[12] * mat[7]  * mat[10];
        const out8 =
            mat[4]  * mat[9]  * mat[15] -
            mat[4]  * mat[11] * mat[13] -
            mat[8]  * mat[5]  * mat[15] +
            mat[8]  * mat[7]  * mat[13] +
            mat[12] * mat[5]  * mat[11] -
            mat[12] * mat[7]  * mat[9];
        const out12 =
           -mat[4]  * mat[9]  * mat[14] +
            mat[4]  * mat[10] * mat[13] +
            mat[8]  * mat[5]  * mat[14] -
            mat[8]  * mat[6]  * mat[13] -
            mat[12] * mat[5]  * mat[10] +
            mat[12] * mat[6]  * mat[9];
        const out1 =
           -mat[1]  * mat[10] * mat[15] +
            mat[1]  * mat[11] * mat[14] +
            mat[9]  * mat[2]  * mat[15] -
            mat[9]  * mat[3]  * mat[14] -
            mat[13] * mat[2]  * mat[11] +
            mat[13] * mat[3]  * mat[10];
        const out5 =
            mat[0]  * mat[10] * mat[15] -
            mat[0]  * mat[11] * mat[14] -
            mat[8]  * mat[2]  * mat[15] +
            mat[8]  * mat[3]  * mat[14] +
            mat[12] * mat[2]  * mat[11] -
            mat[12] * mat[3]  * mat[10];
        const out9 =
           -mat[0]  * mat[9]  * mat[15] +
            mat[0]  * mat[11] * mat[13] +
            mat[8]  * mat[1]  * mat[15] -
            mat[8]  * mat[3]  * mat[13] -
            mat[12] * mat[1]  * mat[11] +
            mat[12] * mat[3]  * mat[9];
        const out13 =
            mat[0]  * mat[9]  * mat[14] -
            mat[0]  * mat[10] * mat[13] -
            mat[8]  * mat[1]  * mat[14] +
            mat[8]  * mat[2]  * mat[13] +
            mat[12] * mat[1]  * mat[10] -
            mat[12] * mat[2]  * mat[9];
        const out2 =
            mat[1]  * mat[6]  * mat[15] -
            mat[1]  * mat[7]  * mat[14] -
            mat[5]  * mat[2]  * mat[15] +
            mat[5]  * mat[3]  * mat[14] +
            mat[13] * mat[2]  * mat[7]  -
            mat[13] * mat[3]  * mat[6];
        const out6 =
           -mat[0]  * mat[6]  * mat[15] +
            mat[0]  * mat[7]  * mat[14] +
            mat[4]  * mat[2]  * mat[15] -
            mat[4]  * mat[3]  * mat[14] -
            mat[12] * mat[2]  * mat[7]  +
            mat[12] * mat[3]  * mat[6];
        const out10 =
            mat[0]  * mat[5]  * mat[15] -
            mat[0]  * mat[7]  * mat[13] -
            mat[4]  * mat[1]  * mat[15] +
            mat[4]  * mat[3]  * mat[13] +
            mat[12] * mat[1]  * mat[7]  -
            mat[12] * mat[3]  * mat[5];
        const out14 =
           -mat[0]  * mat[5]  * mat[14] +
            mat[0]  * mat[6]  * mat[13] +
            mat[4]  * mat[1]  * mat[14] -
            mat[4]  * mat[2]  * mat[13] -
            mat[12] * mat[1]  * mat[6]  +
            mat[12] * mat[2]  * mat[5];
        const out3 =
           -mat[1]  * mat[6]  * mat[11] +
            mat[1]  * mat[7]  * mat[10] +
            mat[5]  * mat[2]  * mat[11] -
            mat[5]  * mat[3]  * mat[10] -
            mat[9]  * mat[2]  * mat[7] +
            mat[9]  * mat[3]  * mat[6];
        const out7 =
            mat[0]  * mat[6]  * mat[11] -
            mat[0]  * mat[7]  * mat[10] -
            mat[4]  * mat[2]  * mat[11] +
            mat[4]  * mat[3]  * mat[10] +
            mat[8]  * mat[2]  * mat[7]  -
            mat[8]  * mat[3]  * mat[6];
        const out11 =
           -mat[0]  * mat[5]  * mat[11] +
            mat[0]  * mat[7]  * mat[9]  +
            mat[4]  * mat[1]  * mat[11] -
            mat[4]  * mat[3]  * mat[9]  -
            mat[8]  * mat[1]  * mat[7]  +
            mat[8]  * mat[3]  * mat[5];
        const out15 =
            mat[0]  * mat[5]  * mat[10] -
            mat[0]  * mat[6]  * mat[9]  -
            mat[4]  * mat[1]  * mat[10] +
            mat[4]  * mat[2]  * mat[9]  +
            mat[8]  * mat[1]  * mat[6]  -
            mat[8]  * mat[2]  * mat[5];

        let det = mat[0] * out[0] + mat[1] * out[4] + mat[2] * out[8] + mat[3] * out[12];

        // It's okay if this throws.
        det = 1.0 / det;

        out[0]  = out0 * det;
        out[1]  = out1 * det;
        out[2]  = out2 * det;
        out[3]  = out3 * det;
        out[4]  = out4 * det;
        out[5]  = out5 * det;
        out[6]  = out6 * det;
        out[7]  = out7 * det;
        out[8]  = out8 * det;
        out[9]  = out9 * det;
        out[10] = out10 * det;
        out[11] = out11 * det;
        out[12] = out12 * det;
        out[13] = out13 * det;
        out[14] = out14 * det;
        out[15] = out15 * det;

        return out;
    }
}
