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
}
