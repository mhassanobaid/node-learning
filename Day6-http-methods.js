const http = require("http");
const fs = require("fs");
const url = require("url");
const { parse } = require("path");

const server = http.createServer((req, res)=>{

  const parseUrl = url.parse(req.url, true);
  console.log(parseUrl);
  
  if(req.url === "/favicon.ico"){
    return res.end();
  }

  // console.log(`${req.url}`);

  // res.end("Welcome to the text on chrome");

  // console.log(parseUrl.pathname);
  const log = `Date:- ${new Date()} | Addr:- ${req.socket.remoteAddress} | Path:- ${req.url}\n`;
  fs.appendFile("logs.txt", log, (err)=>{

    if(err){
      console.log(err);
      return res.end();
    } else{

      switch (parseUrl.pathname) {
        case "/":
          res.end("Homepage");
          break;
        case "/about-us":
          const name=parseUrl.query.name;
          res.end(`Hi wanna know about ${name}`);
        default:
          res.end(`403 not found`);
      }

    }

  });
  
  
  
})

server.listen(3000, ()=>{
  console.log(`Server listening on 3000`);
  

});
