const express = require("express");
const fs = require("fs");

const app = express();

const posts = require("./MOCK_POSTS.json");
const port = 8000;
// builtin middleware that bascially changes req object and put body in it 
// so we can do body = req.body;

app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
  req.userName = "MHASSAN";

  next();
  
  // block
  // res.end("Go to HEll");
});

app.use((req, res, next)=>{
  // res.end("Shut up from second middleware");
  console.log("req.userName -> "+ req.userName);
  next();
});

// use case of using middleware -> LOGGING
app.use((req, res, next)=>{
  const date = new Date();
  const req_path = req.path;
  const req_method = req.method;

  fs.appendFile("./logs_middleware.txt", "Date | "+date+" Path | "+req_path+ " Method | "+req_method+"\n", (err, data)=>{
    if(err){
      console.log(err);
    } else{
      next();
    }
  })

});

app.post("/posts", (req, res)=>{

  const body = req.body;

  posts.push(body);

  fs.writeFile("./MOCK_POSTS.json", JSON.stringify(posts), (err, data)=>{
    if(err){
      console.log(err);
    } else{
      res.json({success: true, post: body});
    }
  })

})

app.listen(port, ()=>{
  console.log(`Server started on ${port}`);
});
