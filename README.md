# gl-transform

A matrix math library geared towards game development.
Why reinvent the wheel? [gl-matrix](https://www.npmjs.com/package/gl-matrix) exists. Besides being a good learning
exercise, but I have a few problems with gl-matrix:

1. It is not written in typescript. This makes compatibility tedious.
   [Community-made](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/gl-matrix) types exist but it
   was last updated a whole version ago.
   
2. The api is verbose and unwieldy. Each function has an `out` parameter that gets modified in-place. This is nice from
   from a performance and memory perspective but `out` always comes first in the parameter list. This means if you are
   not doing in-place operations, each call looks something like `Vec3.multiply(Vec3.create(), vectorA, vectorB);`. I
   would much prefer `out` be placed at the end with a default set to a new instance. The previous call would then look
   like `Vec3.multiply(vectorA, vectorB);`.


The code here is written solely to support Pogonia so features are only added when they become necessary.
When I have time to work on it directly I will add tests, docs, and better organization as a whole.

Here be dragons. If you do venture forth, keep in mind the underlying arrays use OpenGL's column-major format
(e.g. [row_1_col_1, row_2_col_1, ...]) but the library exposes a row-major api as that is the most taught format when it
comes to linear algebra.
