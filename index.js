const fs = require("fs");
const loader = require("@assemblyscript/loader");

function importCallback(a, b) {
  return a + b;
}

const imports = {
  test: {
    importCallback,
  },
};

const wasmModule = loader.instantiateSync(
  fs.readFileSync(__dirname + "/build/optimized.wasm"),
  imports
);

function squareArrayWrap(array) {
  const {
    __newArray,
    __getInt32Array,

    Int32Array_ID,
    squareArray,
  } = wasmModule.exports;

  const arr = __newArray(Int32Array_ID, array);

  const result = __getInt32Array(squareArray(arr));

  return result;
}

function calcSinLookupWrap() {
  const {
    __getFloat64Array,

    calcSinLookup,
  } = wasmModule.exports;
  return __getFloat64Array(calcSinLookup());
}

module.exports = {
  ...wasmModule.exports,
  squareArrayWrap,
  calcSinLookupWrap,
  importCallback,
};
