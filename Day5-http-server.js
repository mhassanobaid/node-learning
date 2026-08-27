const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // 1. Get client's IP address
  const ip = req.socket.remoteAddress;

  // 2. Get current date/time
  const now = new Date();

  // Format: 27 Aug 2026 23:15:42
  const dateTime = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // 3. Create log message
  const log = `${dateTime} | IP: ${ip} | Path: ${req.url}\n`;

  // 4. Save request in log.txt
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    console.log(log.trim());

    // 5. Routing
    switch (req.url) {
      case "/":
        res.statusCode = 200;
        res.end("Homepage");
        break;

      case "/about":
        res.statusCode = 200;
        res.end("Ahmed");
        break;

      case "/contact":
        res.statusCode = 200;
        res.end("Contact Page");
        break;

      default:
        res.statusCode = 404;
        res.end("404 Not Found");
    }
  });
});

server.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
