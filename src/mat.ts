export class Mat2 extends Float32Array {
    static readonly DIM = 2;

    constructor() {
        super(4);
        this[0] = this[3] = 1;
    }

    public static clone(arr: Float32Array): Mat2 {
        const out = new Mat2();
        out.set(arr.subarray(0, this.DIM * this.DIM));

        return out;
    }

    public static from(arr: Float32Array): Mat2 {
        const out = new Mat2();
        out.set(arr.subarray(0, this.DIM * this.DIM));

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

    public static copyTranslation(mat: Mat2, out = new Mat2()): Mat2 {
        out.set(mat.subarray(2, 4), 2);

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
        out[0] = (a[0] * b[0]) + (a[2] * b[1]);
        out[1] = (a[1] * b[0]) + (a[3] * b[1]);
        out[2] = (a[0] * b[2]) + (a[2] * b[3]);
        out[3] = (a[1] * b[2]) + (a[3] * b[3]);

        return out;
    }

    public static invert(mat: Mat2, out = new Mat2()): Mat2 {
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

    constructor() {
        super(16);
        this[0] = this[5] = this[10] = this[15] = 1;
    }

    public static clone(arr: Float32Array): Mat4 {
        const out = new Mat4();
        out.set(arr.subarray(0, this.DIM * this.DIM));

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

    public static identity(out: Mat4): Mat4 {
        out[0] = 1; out[4] = 0; out[8]  = 0; out[12] = 0;
        out[1] = 0; out[5] = 1; out[9]  = 0; out[13] = 0;
        out[2] = 0; out[6] = 0; out[10] = 1; out[14] = 0;
        out[3] = 0; out[7] = 0; out[11] = 0; out[15] = 1;

        return out;
    }

    public static copyTranslation(mat: Mat4, out = new Mat4()): Mat4 {
        out.set(mat.subarray(12, 15), 12);

        return out;
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
        out[0]  = (a[0] * b[0])  + (a[4] * b[1])  + (a[8]  * b[2])  + (a[12] * b[3]);
        out[1]  = (a[1] * b[0])  + (a[5] * b[1])  + (a[9]  * b[2])  + (a[13] * b[3]);
        out[2]  = (a[2] * b[0])  + (a[6] * b[1])  + (a[10] * b[2])  + (a[14] * b[3]);
        out[3]  = (a[3] * b[0])  + (a[7] * b[1])  + (a[11] * b[2])  + (a[15] * b[3]);

        out[4]  = (a[0] * b[4])  + (a[4] * b[5])  + (a[8]  * b[6])  + (a[12] * b[7]);
        out[5]  = (a[1] * b[4])  + (a[5] * b[5])  + (a[9]  * b[6])  + (a[13] * b[7]);
        out[6]  = (a[2] * b[4])  + (a[6] * b[5])  + (a[10] * b[6])  + (a[14] * b[7]);
        out[7]  = (a[3] * b[4])  + (a[7] * b[5])  + (a[11] * b[6])  + (a[15] * b[7]);

        out[8]  = (a[0] * b[8])  + (a[4] * b[9])  + (a[8]  * b[10]) + (a[12] * b[11]);
        out[9]  = (a[1] * b[8])  + (a[5] * b[9])  + (a[9]  * b[10]) + (a[13] * b[11]);
        out[10] = (a[2] * b[8])  + (a[6] * b[9])  + (a[10] * b[10]) + (a[14] * b[11]);
        out[11] = (a[3] * b[8])  + (a[7] * b[9])  + (a[11] * b[10]) + (a[15] * b[11]);

        out[12] = (a[0] * b[12]) + (a[4] * b[13]) + (a[8]  * b[14]) + (a[12] * b[15]);
        out[13] = (a[1] * b[12]) + (a[5] * b[13]) + (a[9]  * b[14]) + (a[13] * b[15]);
        out[14] = (a[2] * b[12]) + (a[6] * b[13]) + (a[10] * b[14]) + (a[14] * b[15]);
        out[15] = (a[3] * b[12]) + (a[7] * b[13]) + (a[11] * b[14]) + (a[15] * b[15]);

        return out;
    }

    public static invert(mat: Mat4, out = new Mat4()): Mat4 {
        out[0] =
            mat[5]  * mat[10] * mat[15] -
            mat[5]  * mat[11] * mat[14] -
            mat[9]  * mat[6]  * mat[15] +
            mat[9]  * mat[7]  * mat[14] +
            mat[13] * mat[6]  * mat[11] -
            mat[13] * mat[7]  * mat[10];
        out[4] =
           -mat[4]  * mat[10] * mat[15] +
            mat[4]  * mat[11] * mat[14] +
            mat[8]  * mat[6]  * mat[15] -
            mat[8]  * mat[7]  * mat[14] -
            mat[12] * mat[6]  * mat[11] +
            mat[12] * mat[7]  * mat[10];
        out[8] =
            mat[4]  * mat[9]  * mat[15] -
            mat[4]  * mat[11] * mat[13] -
            mat[8]  * mat[5]  * mat[15] +
            mat[8]  * mat[7]  * mat[13] +
            mat[12] * mat[5]  * mat[11] -
            mat[12] * mat[7]  * mat[9];
        out[12] =
           -mat[4]  * mat[9]  * mat[14] +
            mat[4]  * mat[10] * mat[13] +
            mat[8]  * mat[5]  * mat[14] -
            mat[8]  * mat[6]  * mat[13] -
            mat[12] * mat[5]  * mat[10] +
            mat[12] * mat[6]  * mat[9];
        out[1] =
           -mat[1]  * mat[10] * mat[15] +
            mat[1]  * mat[11] * mat[14] +
            mat[9]  * mat[2]  * mat[15] -
            mat[9]  * mat[3]  * mat[14] -
            mat[13] * mat[2]  * mat[11] +
            mat[13] * mat[3]  * mat[10];
        out[5] =
            mat[0]  * mat[10] * mat[15] -
            mat[0]  * mat[11] * mat[14] -
            mat[8]  * mat[2]  * mat[15] +
            mat[8]  * mat[3]  * mat[14] +
            mat[12] * mat[2]  * mat[11] -
            mat[12] * mat[3]  * mat[10];
        out[9] =
           -mat[0]  * mat[9]  * mat[15] +
            mat[0]  * mat[11] * mat[13] +
            mat[8]  * mat[1]  * mat[15] -
            mat[8]  * mat[3]  * mat[13] -
            mat[12] * mat[1]  * mat[11] +
            mat[12] * mat[3]  * mat[9];
        out[13] =
            mat[0]  * mat[9]  * mat[14] -
            mat[0]  * mat[10] * mat[13] -
            mat[8]  * mat[1]  * mat[14] +
            mat[8]  * mat[2]  * mat[13] +
            mat[12] * mat[1]  * mat[10] -
            mat[12] * mat[2]  * mat[9];
        out[2] =
            mat[1]  * mat[6]  * mat[15] -
            mat[1]  * mat[7]  * mat[14] -
            mat[5]  * mat[2]  * mat[15] +
            mat[5]  * mat[3]  * mat[14] +
            mat[13] * mat[2]  * mat[7]  -
            mat[13] * mat[3]  * mat[6];
        out[6] =
           -mat[0]  * mat[6]  * mat[15] +
            mat[0]  * mat[7]  * mat[14] +
            mat[4]  * mat[2]  * mat[15] -
            mat[4]  * mat[3]  * mat[14] -
            mat[12] * mat[2]  * mat[7]  +
            mat[12] * mat[3]  * mat[6];
        out[10] =
            mat[0]  * mat[5]  * mat[15] -
            mat[0]  * mat[7]  * mat[13] -
            mat[4]  * mat[1]  * mat[15] +
            mat[4]  * mat[3]  * mat[13] +
            mat[12] * mat[1]  * mat[7]  -
            mat[12] * mat[3]  * mat[5];
        out[14] =
           -mat[0]  * mat[5]  * mat[14] +
            mat[0]  * mat[6]  * mat[13] +
            mat[4]  * mat[1]  * mat[14] -
            mat[4]  * mat[2]  * mat[13] -
            mat[12] * mat[1]  * mat[6]  +
            mat[12] * mat[2]  * mat[5];
        out[3] =
           -mat[1]  * mat[6]  * mat[11] +
            mat[1]  * mat[7]  * mat[10] +
            mat[5]  * mat[2]  * mat[11] -
            mat[5]  * mat[3]  * mat[10] -
            mat[9]  * mat[2]  * mat[7] +
            mat[9]  * mat[3]  * mat[6];
        out[7] =
            mat[0]  * mat[6]  * mat[11] -
            mat[0]  * mat[7]  * mat[10] -
            mat[4]  * mat[2]  * mat[11] +
            mat[4]  * mat[3]  * mat[10] +
            mat[8]  * mat[2]  * mat[7]  -
            mat[8]  * mat[3]  * mat[6];

        out[11] =
           -mat[0]  * mat[5]  * mat[11] +
            mat[0]  * mat[7]  * mat[9]  +
            mat[4]  * mat[1]  * mat[11] -
            mat[4]  * mat[3]  * mat[9]  -
            mat[8]  * mat[1]  * mat[7]  +
            mat[8]  * mat[3]  * mat[5];

        out[15] =
            mat[0]  * mat[5]  * mat[10] -
            mat[0]  * mat[6]  * mat[9]  -
            mat[4]  * mat[1]  * mat[10] +
            mat[4]  * mat[2]  * mat[9]  +
            mat[8]  * mat[1]  * mat[6]  -
            mat[8]  * mat[2]  * mat[5];

        let det = mat[0] * out[0] + mat[1] * out[4] + mat[2] * out[8] + mat[3] * out[12];

        // It's okay if this throws.
        det = 1.0 / det;

        for (let i = 0; i < 16; i++) {
            out[i] *= det;
        }

        return out;
    }
}
