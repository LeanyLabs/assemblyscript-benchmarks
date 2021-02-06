# Simple AssemblyScript vs JavaScript benchmarks

Run the benchmarks locally:

```sh
npm i
npm start
```

Results on i5-8250, 16Gb RAM running Ubuntu 20.04 LTS:

```sh
Benchmarking add:
AssemblyScript x 126,216,731 ops/sec ±0.60% (94 runs sampled)
JavaScript x 696,689,118 ops/sec ±0.06% (97 runs sampled)
JavaScript is faster

Benchmarking factorial:
AssemblyScript x 14,204,553 ops/sec ±0.50% (97 runs sampled)
JavaScript x 6,478,385 ops/sec ±0.27% (94 runs sampled)
AssemblyScript is faster

Benchmarking squareArray:
AssemblyScript x 278,733 ops/sec ±0.32% (99 runs sampled)
JavaScript x 1,868,924 ops/sec ±0.22% (95 runs sampled)
JavaScript is faster

Benchmarking calcSinLookup:
AssemblyScript x 10,187 ops/sec ±0.46% (94 runs sampled)
JavaScript x 11,922 ops/sec ±0.20% (96 runs sampled)
JavaScript is faster

Benchmarking importCallback:
AssemblyScript x 24,419 ops/sec ±0.16% (95 runs sampled)
JavaScript x 351,606 ops/sec ±0.16% (97 runs sampled)
JavaScript is faster

```

Understanding the tests:

* ``add`` is a simple function that shows the cost of crossing the JavaScript - WASM boundary to invoke a function in WASM.
* ``factorial`` is somewhat computation heavy and recursive with simple arguments and return type. Tests performance difference with even simple computations.
* ``squareArray`` receives the array and returns another array with every element squared. Shows the cost of passing data between WASM and JavaScript runtime.
* ``calcSinLookup`` returns the lookup table for ``sin`` function with resolution of 1000. Somewhat computation heavy, but returns an array 6283 elements back to JavaScript.
* ``importCallback`` just calculated the sum of 1...5000, but invokes the JavaScript imported function to add numbers. Tests the performance of invoking imported functions in WASM.


Read more about the benchmarks and [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) on [our blog.](https://leanylabs.com/blog/assemblyscript-intro/)

