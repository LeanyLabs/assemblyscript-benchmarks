const Benchmark = require("benchmark");
const wasm = require(".");

function runSuite(suite) {
  console.log(`\nBenchmarking ${suite.name}:`);

  suite
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log(this.filter("fastest").map("name") + " is faster");
    })
    .run();
}

function addTest() {
  function addJs(a, b) {
    return a + b;
  }
  const addAs = wasm.add;

  const test = new Benchmark.Suite("add");

  test
    .add("AssemblyScript", function () {
      addAs(1, 2);
    })
    .add("JavaScript", function () {
      addJs(1, 2);
    });
  runSuite(test);
}

function factorialTest() {
  function factorialJs(i) {
    return i == 0 ? 1 : i * factorialJs(i - 1);
  }
  const factorialAs = wasm.factorial;

  const test = new Benchmark.Suite("factorial");

  // console.log(factorialAs(20));

  test
    .add("AssemblyScript", function () {
      factorialAs(20);
    })
    .add("JavaScript", function () {
      factorialJs(20);
    });
  runSuite(test);
}

function squareArrayTest() {
  function squareArrayJs(arr) {
    const len = arr.length;
    const result = new Int32Array(len);
    for (let i = 0; i < len; ++i) {
      const e = arr[i];
      result[i] = e * e;
    }
    return result;
  }
  const squareArrayAs = wasm.squareArrayWrap;

  const test = new Benchmark.Suite("squareArray");

  const array = new Int32Array(200).fill(2);

  // console.log(squareArrayAs(array));

  test
    .add("AssemblyScript", function () {
      squareArrayAs(array);
    })
    .add("JavaScript", function () {
      squareArrayJs(array);
    });
  runSuite(test);
}

function calcSinLookupTest() {
  function calcSinLookupJs() {
    const max = 6283;
    const result = new Float64Array(max);

    for (let i = 0; i < max; ++i) {
      result[i] = Math.sin(i * 0.001);
    }

    return result;
  }
  const calcSinLookupAs = wasm.calcSinLookupWrap;

  const test = new Benchmark.Suite("calcSinLookup");

  // console.log(calcSinLookupAs());

  test
    .add("AssemblyScript", function () {
      calcSinLookupAs();
    })
    .add("JavaScript", function () {
      calcSinLookupJs();
    });
  runSuite(test);
}

function importTest() {
  const { importCallback } = wasm;

  function testImportJs(n) {
    let result = 0;
    for (let i = 1; i <= n; ++i) {
      result = importCallback(result, i);
    }
    return result;
  }

  const testN = 5000;
  const testImportAs = wasm.testImport;

  const test = new Benchmark.Suite("importCallback");

  // console.log(testImportAs(20));

  test
    .add("AssemblyScript", function () {
      testImportAs(testN);
    })
    .add("JavaScript", function () {
      testImportJs(testN);
    });
  runSuite(test);
}

function averageIfLessTest() {
  const sourceCount = 2000000;
  const source = new Float64Array(sourceCount);

  for (let i = 0; i < sourceCount; ++i) {
    source[i] = (i % 1000) + 1 / (i + 1);
  }

  function averageIfLessJs(upper) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < sourceCount; ++i) {
      const e = source[i];
      if (e < upper) {
        sum += e;
        ++count;
      }
    }

    return count == 0 ? 0 : sum / count;
  }

  const averageIfLessAs = wasm.averageIfLess;
  const testNum = 800;

  const test = new Benchmark.Suite("averageIfLess");

  // console.log(averageIfLessAs(testNum), averageIfLessJs(testNum));

  test
    .add("AssemblyScript", function () {
      averageIfLessAs(testNum);
    })
    .add("JavaScript", function () {
      averageIfLessJs(testNum);
    });
  runSuite(test);
}

addTest();
factorialTest();
squareArrayTest();
calcSinLookupTest();
importTest();
averageIfLessTest();
