const crypto = require("crypto");
const os = require("os");
const { performance } = require("perf_hooks");

const CONCURRENT = 32;
const ITERATIONS = 200_000;

console.log("CPU logical processors:", os.cpus().length);

if (os.availableParallelism) {
  console.log("Available parallelism:", os.availableParallelism());
}

console.log(
  "UV_THREADPOOL_SIZE:",
  process.env.UV_THREADPOOL_SIZE || "default (4)"
);

function runJob() {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      "password",
      "salt",
      ITERATIONS,
      64,
      "sha512",
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

async function benchmark() {
  console.log(`Running ${CONCURRENT} concurrent operations...\n`);

  const start = performance.now();

  const jobs = [];

  for (let i = 0; i < CONCURRENT; i++) {
    jobs.push(runJob());
  }

  await Promise.all(jobs);

  const end = performance.now();

  console.log(`Total time: ${(end - start).toFixed(2)} ms`);
}

benchmark().catch(console.error);
