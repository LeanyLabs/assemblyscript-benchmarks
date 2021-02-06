// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function factorial(i: f64): f64 {
  if (i == 0) return 1;
  return i * factorial(i - 1);
}

export function squareArray(arr: Int32Array): Int32Array {
  const result = new Int32Array(arr.length);
  for (let i = 0; i < arr.length; ++i) {
    unchecked((result[i] = arr[i] * arr[i]));
  }
  return result;
}

export const Int32Array_ID = idof<Int32Array>();

export function calcSinLookup(): Float64Array {
  const max = 6283;
  const result = new Float64Array(max);

  for (let i = 0; i < max; ++i) {
    result[i] = Math.sin(i * 0.001);
  }

  return result;
}

export const Float64Array_ID = idof<Float64Array>();

declare namespace test {
  @external("test", "importCallback")
  export function importCallback(a: i32, b: i32): i32;
}

export function testImport(n: i32): i32 {
  let result: i32 = 0;
  for (let i = 1; i <= n; ++i) {
    result = test.importCallback(result, i);
  }
  return result;
}
