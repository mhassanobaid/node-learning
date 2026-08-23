// package.json is not only used to run scripts 
console.log("\n");
console.log("Hi hello world 3 utube of Piyush");

// without . for node built in or external packages importing

// const math = require("http");

// for current directory packages

const math = require("./math");

console.log(math);

const readline = require("readline/promises");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const n1 = Number(await r1.question("Enter first number: "));
  const n2 = Number(await r1.question("Enter second number: "));

  console.log(`\nSum of ${n1} and ${n2} is ${math.add(n1,n2)}`);

  console.log(`Sub of ${n1} and ${n2} is ${math.sub(n1,n2)}`);

  r1.close();
}

main();
