// GET -> find + no found ko hande
// PUT -> findIndex -> if found -> retain id while update entire body by spreading it
// PATCH -> findIndex -> if found -> retain by spreading existing user and update by spreading body
// DELETE -> filter + findIndex (hadle not found)

// creating rest apis in express and node 
// will create for CRUD but in this day will only demostrate for read, index
// because create, update and delete requires POSTMAN

// BEST PRACTICE IS TO CRAETE HYBRID SERVER means that reposnd to both browsers as well as app means for both SSR(SERVER SIDE HTML) and CSR(JSON)



const users = require("./MOCK_DATA.json");

const express = require("express");
const fs = require("fs");

const app = express();
const port = 8000;

// using middleware is funcion that comes in request pipeline
// request->middleware->route handler->response
// middleware can porcess req, res and can terminate req and perfroms logic 
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res)=>{
  return res.json(users);
});

// app.get("/api/users/:id", (req, res)=>{
//   console.log("Request's PARAMS ", req.params);
  
//   const id = Number(req.params.id);

//   const user = users.find( user=> user.id === id );

//   return res.json(user);
// });

// since api/users/:id will be repeated for
                                          // for edit, delete and post and show 
                                            // to remove reducndancy below is code

app.route("/api/users/:id")
  .get(
    (req, res)=>{
      console.log("Request's PARAMS ", req.params);
  
      const id = Number(req.params.id);

      const user = users.find( user=> user.id === id );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json(user);
    })
    // perferedd way is to use map for both FULL PUT as well as PARTIAL PATCH updates
  .put(
    (req, res)=>{

      // full update PUT

      const id = Number(req.params.id);
      const body = req.body;

      if(!body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({err: "all fields must be present"});
      }

      const userEmailIndex = users.findIndex(user => user.email === body.email);

      if(userEmailIndex > -1){
        return res.status(409).json({ msg: "Conflict occurs" });
      }

      // 422 for validation fail

      // 500 srever side error

      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const updatedUser = {
        id: id,
        ...body
      };

      users[userIndex] = updatedUser;

      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(users, null, 2),
        err => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              success: false,
              message: "Failed to update user"
            });
          }

          return res.status(200).json({
            success: true,
            user: updatedUser
          });
        }
      );
  

    })   // mistake never makeis that params is string so covrt to int
         
        // best practices for doing it
              //  [ mutating original array -> indexOf and then splice ]
              // [ creating new array -> filter and then writing ]
  .patch(
    (req, res) => {
    // PARTIAL UPDATE

      const id = Number(req.params.id);
      const body = req.body;

      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      users[userIndex] = {
        ...users[userIndex],
        ...body
      };

      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(users, null, 2),
        err => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              success: false,
              message: "Failed to update user"
            });
          }

          return res.status(299).json({
            success: true,
            user: users[userIndex]
          });
        }
      );
    }
  )
  .delete(
    (req, res)=>{

      // delete logic

      const id = Number(req.params.id);

                      // APPROACH 1 of MUTATITNG ORINGIANAL ARRAY

              const index = users.findIndex( user => user.id === id );

              if(index>-1){
                // splice(konse index ko target krna, delete ktnee krnee, new itemss .....)
                users.splice(index, 1);

                   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
                  if(err){
                    console.log(err);
                    
                  }else{
                    return res.status(204).json({success: true, id: id});
                  }
                });
              } else {
                return res.status(404).json({success: true, id: id});
              }

                            // PREFERRED APPROAch of CREATING NEW ARRAY

              // const index = users.findIndex( user => user.id === id );
              // if(index>-1){
              //   const updatedArray = users.filter(user => user.id !== id);

              //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedArray), (err, data)=>{
              //     if(err){
              //       console.log(err);
                    
              //     }else{
              //       return res.json({success: true, id: id});
              //     }
              //   });

              // } else{
              //   return res.json({success: false, id: -1});
              // }



      // logging to see data tupe
      // console.log("\nID\n "+ id);

      // console.log("\nType of ID\n "+ typeof(id));
      

    }
  );

// for SSR
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `
        <li>
          ${user.first_name} ${user.last_name}
        </li>
      `).join("")}
    </ul>
  `;

  return res.status(200).send(html);
});

// mistake i made is writing array to file which is not possible only string, buffer, typedarray, dataview are written to file so SOLU is JSON.stringigfy

app.post("/api/users", (req, res)=>{

  const body = req.body;

  console.log(body);

  if(!body.first_name || !body.last_name || !body.email || !body.gender){
    return res.status(400).json({err: "all fields must be present"});
  }

  const userEmailIndex = users.findIndex(user => user.email === body.email);

  if(userEmailIndex > -1){
    return res.status(409).json({ msg: "Conflict occurs" });
  }

  // 422 for validation fail

  // 500 srever side error

  users.push({ ...body, id: (users.length + 1) });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
    if(err){
      console.log(err);
    } else{
      console.log("\nDATA AYA " + JSON.stringify(data));
      
      return res.json({ status: "success", id: users.length });
    }
  })
  
});


app.listen(port, ()=>{
  console.log("Server started at "+ port);
});

// must know status codes
//100- information
//200- success
//300- redirect
// 400- client error
// 500 - server error

// MOSTLY USED

// 200 ok
// 201 created
// 204 nothing toreturn
// 400 BAd request means any field missing
// 401 unauthenticated
// 403 forbidden -> any permission nhn hee
// 404 content not found -> any resouce or path not found
// 409 conflict means any email coming is alreay present
// 422 unprocessiable entity means validation failed
// 500 internal server error
// 503 service unavailable
