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
    __getArray,

    Int32Array_ID,
    squareArray,
  } = wasmModule.exports;

  const arr = __newArray(Int32Array_ID, array);

  const result = __getArray(squareArray(arr));

  return result;
}

function calcSinLookupWrap() {
  const {
    __getArray,

    calcSinLookup,
  } = wasmModule.exports;

  const result = __getArray(calcSinLookup());

  return result;
}

module.exports = {
  ...wasmModule.exports,
  squareArrayWrap,
  calcSinLookupWrap,
  importCallback,
};
