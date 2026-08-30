// for mongodb
  // install moongoose    X WRONG
       // install mongoose TICK THIS IS CORRECT
                      // schema
                      // model
                      // validations
                      // crud asaan
                      // queries
                      // middleware

    // 1- make a connection
    // 2- schema
    // 3- model
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
  }
}, 
  { 
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

app.use(express.json());

app.use(express.urlencoded({extended: false}));

connectDB();

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { first_name, last_name, email, gender } = req.body;

    if (!first_name || !last_name || !email || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      gender
    });

    return res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { first_name, last_name, email, gender } = req.body;

    if (!first_name || !last_name || !email || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for PUT"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        first_name,
        last_name,
        email,
        gender
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(204).send();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();

  const html = `
    <ul>
      ${users
        .map(
          user => `
            <li>
              ${user.first_name} ${user.last_name}
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  res.send(html);
});

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`);
})
