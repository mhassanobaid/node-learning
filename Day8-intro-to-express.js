// const http = require("http");
// const url = require("url");

// const requestHandler = (req, res) => {
//   console.log("Request ayes");
  
//     res.end("Go to hell");
    
//   };

// const s = http.createServer(
//   requestHandler
// );

// s.listen(9000, ()=>{
//   console.log(`Srver running on 9000 port`);
// });


// above code is not mdular, clean, more explicitness and for routing maintainablity is not present and scalability is not there

// SOLU is Express framework

const express = require("express");

const app = express();

const port = 10000;

const homePageHandler = (req, res) =>{
  // no need of url package

  if(req.query){
    console.log(req.query);
  }

  return res.end("Welcome to express learning's home page");
};

const aboutMePageHandler = (req, res) => {
  if(req.query.name){
    if(req.query.age){
      return res.end(`Wanna know about me...I am ${req.query.name} and i am ${req.query.age} years old`);
    }
    return res.end(`Wanna know about me...I am ${req.query.name}`);  
  }
  return res.end(`Wanna know about me...`);
}

app.get("/", homePageHandler);

app.get("/about-me", aboutMePageHandler);

// no need of http BUT REMEMBER Express is using THESE http, url and many more IN INNER SELF

app.listen(port, ()=>{
  console.log(`Server running on port: ${port}`);
})
