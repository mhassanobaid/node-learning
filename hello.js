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

const fs = require("fs");

                                                // MAKING a director
const letsMakeDir = fs.mkdirSync("file-handling-work", {recursive: true});

                                                // WRITING TO A FILE

// remember that asynch operations like writeFile takes a callback and does not return a result but handle success or error in callback
fs.writeFile("./file-handling-work/testFileAsync.txt", "Writing to testFileAsync.txt Asynchronously", (err, result)=>{
  if(err){
    console.log(`Error ${err}`);
  }else{
    console.log(`Success ${result}`);
  }
});

// BUT sync operations does not take a callback 
// and return result and handle success and failure via try, catch

const createFile = fs.writeFileSync("./file-handling-work/test.txt", "Writing to test.txt synchronously");

console.log("Logging after creating a file");

                                                // READING FROM A FILE

fs.readFile("./file-handling-work/testFileAsync.txt", "utf-8", (err, result)=>{
  if(err){
    console.log(`Error ${err}`);
  } else{
    console.log(`\n\nSuccess Async Reading -> ${result}`);
  }
});

const readTestFileSync = fs.readFileSync("./file-handling-work/test.txt", "utf-8");

console.log(`\n\nSuccess Sync Reading -> ${readTestFileSync}`);

                                                        // APPENDING FROM A FILE

const appendtoFileSync = fs.appendFileSync("./file-handling-work/test.txt", "\nWord appended");

const appendtoFileSync2 = fs.appendFileSync("./file-handling-work/test.txt", "\nWord appended");

fs.appendFile("./file-handling-work/testFileAsync.txt", "\nWord appended async", (err, result)=>{
  if(err){
    console.log(`Error ${err}`);
  } else{
    console.log(`\n\nSuccess of appening to file async -> ${result}`);
  }
});

fs.appendFile("./file-handling-work/testFileAsync.txt", "\nWord appended async", (err, result)=>{
  if(err){
    console.log(`Error ${err}`);
  } else{
    console.log(`\n\nSuccess of appening to file async -> ${result}`);
  }
});

                                      // COPYING a file
fs.mkdirSync("./file-handling-work/copy-files", { recursive: true });

const copyFileSync = fs.cpSync("./file-handling-work/test.txt", "./file-handling-work/copy-files/copyTestSync.txt");

fs.cp("./file-handling-work/testFileAsync.txt", "./file-handling-work/copy-files/copyTestFileAsync.txt", (err, result)=>{
  if(err){
    console.log(err);
  } else {
    console.log(result);

    // CHAINING async dependent operations
    fs.stat("./file-handling-work/copy-files/copyTestFileAsync.txt", (err, res)=>{
      if(err){
        console.log(err);
      } else {
        console.log(res);

        // CHAINING async dependent operations
        fs.unlink("./file-handling-work/copy-files/copyTestFileAsync.txt", (err, res)=>{
          if(err){
            console.log(err);
          } else {
            console.log(res);
          }
        });
      }
    });
  }
});

                                    // SEE STATS of a file

const seeStats = fs.statSync("./file-handling-work/copy-files/copyTestSync.txt");

console.log(seeStats);

                                      // Delete (unlinking a file)

const delFile = fs.unlinkSync("./file-handling-work/copy-files/copyTestSync.txt");

// ERROR OF ENOENT occurs means file does not exist because copy creation is async and since its creattion is not guaranteed so whenever async operations depend on each other try to link them using chaining means

// cp completes
//      ↓
// stat
//      ↓
// stat completes
//      ↓
// unlink 

// thats why doing refactoring as cp->success ->stats->success->unlink [[[CHAINING]]]

