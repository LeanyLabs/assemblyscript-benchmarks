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
    return arr.map((x) => x * x);
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

addTest();
factorialTest();
squareArrayTest();
calcSinLookupTest();
importTest();
