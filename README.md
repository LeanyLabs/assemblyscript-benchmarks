# Simple AssemblyScript vs JavaScript benchmarks

Run the benchmarks locally:

```sh
npm i
npm run asbuild
npm start
```

Results on i5-8250, 16Gb RAM running Ubuntu 20.04 LTS:

```sh
Benchmarking add:
AssemblyScript x 125,765,014 ops/sec ±0.37% (96 runs sampled)
JavaScript x 697,262,505 ops/sec ±0.05% (99 runs sampled)
JavaScript is faster

Benchmarking factorial:
AssemblyScript x 14,076,129 ops/sec ±0.38% (97 runs sampled)
JavaScript x 6,483,418 ops/sec ±0.39% (94 runs sampled)
AssemblyScript is faster

Benchmarking squareArray:
AssemblyScript x 432,270 ops/sec ±1.32% (87 runs sampled)
JavaScript x 822,068 ops/sec ±2.31% (85 runs sampled)
JavaScript is faster

Benchmarking calcSinLookup:
AssemblyScript x 11,450 ops/sec ±0.68% (94 runs sampled)
JavaScript x 11,417 ops/sec ±1.35% (96 runs sampled)
AssemblyScript,JavaScript is faster

Benchmarking importCallback:
AssemblyScript x 24,366 ops/sec ±0.10% (96 runs sampled)
JavaScript x 351,545 ops/sec ±0.12% (95 runs sampled)
JavaScript is faster

Benchmarking averageIfLess:
AssemblyScript x 294 ops/sec ±0.95% (87 runs sampled)
JavaScript x 338 ops/sec ±0.48% (89 runs sampled)
JavaScript is faster
```

Understanding the tests:

* ``add`` is a simple function that shows the cost of crossing the JavaScript - WASM boundary to invoke a function in WASM.
* ``factorial`` is somewhat computation heavy and recursive with simple arguments and return type. Tests performance difference with even simple computations.
* ``squareArray`` receives the array and returns another array with every element squared. Shows the cost of passing data between WASM and JavaScript runtime.
* ``calcSinLookup`` returns the lookup table for ``sin`` function with resolution of 1000. Somewhat computation heavy, but returns an array 6283 elements back to JavaScript.
* ``importCallback`` just calculated the sum of 1...5000, but invokes the JavaScript imported function to add numbers. Tests the performance of invoking imported functions in WASM.
* ``averageIfLess`` calculates the average of all elements less than argument in the pre-initialized Float64Array. 80% of two million elements in the array will count.


Read more about the benchmarks and [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) on [our blog.](https://leanylabs.com/blog/assemblyscript-intro/)

