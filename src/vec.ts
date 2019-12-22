export class Vec2 extends Float32Array {
    static readonly DIM = 2;

    constructor() {
        super(2);
    }

    get x(): number {
        return this[0];
    }

    set x(val: number) {
        this[0] = val;
    }

    get y(): number {
        return this[1];
    }

    set y(val: number) {
        this[1] = val;
    }

    public static clone(arr: Float32Array): Vec2 {
        const out = new Vec2();
        out.set(arr.subarray(0, this.DIM));

        return out;
    }

    public static from(arr: number[]): Vec2 {
        const mat = new Vec2();
        mat.set(arr.slice(0, this.DIM));

        return mat;
    }

    public static fromValues(x: number, y: number, out = new Vec2()): Vec2 {
        out[0] = x;
        out[1] = y;

        return out;
    }

    public static add(a: Vec2, b: Vec2, out = new Vec2()): Vec2 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];

        return out;
    }

    public static subtract(a: Vec2, b: Vec2, out = new Vec2()): Vec2 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];

        return out;
    }
}

export class Vec3 extends Float32Array {
    static readonly DIM = 3;

    constructor() {
        super(3);
    }

    get x(): number {
        return this[0];
    }

    set x(val: number) {
        this[0] = val;
    }

    get y(): number {
        return this[1];
    }

    set y(val: number) {
        this[1] = val;
    }

    get z(): number {
        return this[2];
    }

    set z(val: number) {
        this[2] = val;
    }

    public static clone(arr: Float32Array): Vec3 {
        const out = new Vec3();
        out.set(arr.subarray(0, this.DIM));

        return out;
    }

    public static from(arr: number[]): Vec3 {
        const mat = new Vec3();
        mat.set(arr.slice(0, this.DIM));

        return mat;
    }

    public static fromValues(x: number, y: number, z: number, out = new Vec3()): Vec3 {
        out[0] = x;
        out[1] = y;
        out[2] = z;

        return out;
    }

    public static norm(v: Vec3): number {
        return Math.sqrt(this.normSquared(v));
    }

    public static normSquared(v: Vec3): number {
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    }

    public static normalize(v: Vec3, out = new Vec3()): Vec3 {
        const inorm = 1 / this.norm(v);
        out[0] = v[0] * inorm;
        out[1] = v[1] * inorm;
        out[2] = v[2] * inorm;

        return out;
    }

    public static add(a: Vec3, b: Vec3, out = new Vec3()): Vec3 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];

        return out;
    }

    public static subtract(a: Vec3, b: Vec3, out = new Vec3()): Vec3 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];

        return out;
    }

    public static cross(a: Vec3, b: Vec3, out = new Vec3()): Vec3 {
        const x = a[1] * b[2] - a[2] * b[1];
        const y = a[2] * b[0] - a[0] * b[2];
        out[2] = a[0] * b[1] - a[1] * b[0];
        out[1] = y;
        out[0] = x;

        return out;
    }
}

export class Vec4 extends Float32Array {
    static readonly DIM = 4;

    constructor() {
        super(4);
    }

    get x(): number {
        return this[0];
    }

    set x(val: number) {
        this[0] = val;
    }

    get y(): number {
        return this[1];
    }

    set y(val: number) {
        this[1] = val;
    }

    get z(): number {
        return this[2];
    }

    set z(val: number) {
        this[2] = val;
    }

    get w(): number {
        return this[3];
    }

    set w(val: number) {
        this[3] = val;
    }

    public static clone(arr: Float32Array): Vec4 {
        const out = new Vec4();
        out.set(arr.subarray(0, this.DIM));

        return out;
    }

    public static from(arr: number[]): Vec4 {
        const mat = new Vec4();
        mat.set(arr.slice(0, this.DIM));

        return mat;
    }

    public static fromValues(x: number, y: number, z: number, w: number, out = new Vec4()): Vec4 {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;

        return out;
    }

    public static add(a: Vec4, b: Vec4, out = new Vec4()): Vec4 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];

        return out;
    }

    public static subtract(a: Vec4, b: Vec4, out = new Vec4()): Vec4 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];

        return out;
    }

    public static multiply(a: Vec4, b: Vec4, out = new Vec4()): Vec4 {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];

        return out;
    }

    public static multiplyScalar(a: Vec4, scalar: number, out = new Vec4()): Vec4 {
        out[0] = a[0] * scalar;
        out[1] = a[1] * scalar;
        out[2] = a[2] * scalar;
        out[3] = a[3] * scalar;

        return out;
    }
}
