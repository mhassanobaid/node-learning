// const fs = require('fs');

// console.log("a");
// console.log("b");


// // Return result and take one thread from thread pool since blocking
// // as threads are limited so disconraged

// const res = fs.readFileSync("./file-handling-work/test.txt", "utf-8");

// console.log("Res of Sync Reading File", res);


// console.log("c");
// console.log("d");



const fs = require('fs');

console.log("a");
console.log("b");


// Return result and take one thread from thread pool since blocking
// as threads are limited so disconraged

fs.readFile("./file-handling-work/test.txt", "utf-8", (err, result)=>{
  if(err){
    console.log(err);
  }else{
    console.log(`\nResult of Async readFile ${result}`);
  }
});

console.log("c");
console.log("d");


// to see thread size

const os = require('os');

console.log("CPU cores", os.cpus().length);

console.log("CPU info", os.cpus());

console.log("availableParallelism ", os.availableParallelism());

// to increase thead size
//UV_THREADPOOL_SIZE=32 node benchmark.js

//My Dell: 4 logical processors → Node sees 4 → libuv default pool = 4 → can increase with UV_THREADPOOL_SIZE → benchmark workload before choosing a larger value.

// if your system has maximum 4 threads then increasing via UV_THREAPOOL_SIZE wont affect it