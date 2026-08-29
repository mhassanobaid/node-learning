// creating rest apis in express and node 
// will create for CRUD but in this day will only demostrate for read, index
// because create, update and delete requires POSTMAN

// BEST PRACTICE IS TO CRAETE HYBRID SERVER means that reposnd to both browsers as well as app means for both SSR(SERVER SIDE HTML) and CSR(JSON)



const users = require("./MOCK_DATA.json");

const express = require("express");

const app = express();
const port = 8000;

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
   .get((req, res)=>{
  console.log("Request's PARAMS ", req.params);
  
  const id = Number(req.params.id);

  const user = users.find( user=> user.id === id );

  return res.json(user);
})
  .put((req, res)=>{

    // edit logic
    return res.json({pending: true});

  })
  .delete(()=>{

    // delete logic
    return res.json({pending: true});
  });

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

  return res.send(html);
});

app.listen(port, ()=>{
  console.log("Server started at "+ port);
});
