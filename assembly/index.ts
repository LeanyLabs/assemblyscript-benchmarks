// The entry file of your WebAssembly module.

export const Int32Array_ID = idof<Int32Array>();
export const Float64Array_ID = idof<Float64Array>();

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1);
}

export function squareArray(arr: Int32Array): Int32Array {
  const len = arr.length;
  const result = new Int32Array(len);
  for (let i = 0; i < len; ++i) {
    const e = unchecked(arr[i]);
    unchecked(result[i] = e * e);
  }
  return result;
}


export function calcSinLookup(): Float64Array {
  const max = 6283;
  const result = new Float64Array(max);

  for (let i = 0; i < max; ++i) {
    unchecked(result[i] = Math.sin(i * 0.001));
  }

  return result;
}

const sourceCount = 2000000;
const source = new Float64Array(sourceCount);

for (let i = 0; i < sourceCount; ++i){
  source[i] = i % 1000 + 1 / (i + 1);
}

export function averageIfLess(upper: f64): f64{
  let sum: f64 = 0;
  let count = 0;
  for (let i = 0; i < sourceCount; ++i){
    const e = unchecked(source[i]);
    if (e < upper){
      sum += e;
      ++count; 
    }
  }

  return count == 0 ? 0 : (sum / count);
}


declare namespace test {
  @external("test", "importCallback")
  export function importCallback(a: i32, b: i32): i32;
}

export function testImport(n: i32): i32 {
  let result = 0;
  for (let i = 1; i <= n; ++i) {
    result = test.importCallback(result, i);
  }
  return result;
}
