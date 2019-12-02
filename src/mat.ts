// interface Mat {
// }

export class Mat4 extends Float32Array {
    constructor() {
        super(16);
        this[0] = this[5] = this[10] = this[15] = 1;
    }

    public static from(arr: Float32Array): Mat4 {
        const mat = new Mat4();
        mat.set(arr.subarray(0, 16));
        return mat;
    }

    public static identity(out: Mat4): Mat4 {
        out[0] = 1; out[4] = 0; out[8]  = 0; out[12] = 0;
        out[1] = 0; out[5] = 1; out[9]  = 0; out[13] = 0;
        out[2] = 0; out[6] = 0; out[10] = 1; out[14] = 0;
        out[3] = 0; out[7] = 0; out[11] = 0; out[15] = 1;
        return out;
    }

    public static copyTranslation(mat: Mat4, out: Mat4 = new Mat4()): Mat4 {
        out.set(mat.subarray(12, 15), 12);
        return out;
    }

    public static invert(mat: Mat4, out: Mat4 = new Mat4()): Mat4 {
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

        if (det === 0) {
            throw new Error('Matrix is not invertible');
        }

        det = 1.0 / det;

        for (let i = 0; i < 16; i++) {
            out[i] *= det;
        }

        return out;
    }
}
