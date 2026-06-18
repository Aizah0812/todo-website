
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "./models/sign.js";
// import Todo from "./models/Todo.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// /* ------------------------------
//    MONGODB CONNECTION
// -------------------------------- */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected ✅"))
//   .catch((error) => console.log("MongoDB connection error:", error));

// /* ------------------------------
//    BASIC ROUTE
// -------------------------------- */
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// /* ------------------------------
//    SIGNUP ROUTE
// -------------------------------- */
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // create new user
//     // const newUser = new User({
//     //   name,
//     //   email,
//     //   password,
//     // });
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "Signup successful 🎉",
//       user: {
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.log("SIGNUP ROUTE ERROR:", error);
//     res.status(500).json({
//       message: "Signup failed",
//       error: error.message,
//     });
//   }
// });

// /* ------------------------------
//    LOGIN ROUTE
// -------------------------------- */
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validation
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password required",
//       });
//     }

//     console.log("Login body:", req.body);

//     // find user
//     const user = await User.findOne({ email });
//     console.log("Found user:", user);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // check password
//     // if (user.password !== password) {
//     //   return res.status(400).json({
//     //     message: "Incorrect password",
//     //   });
//     // }

//     // check password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Incorrect password",
//       });
//     }

//     // res.status(200).json({
//     //   message: "Login successful ✅",
//     //   user: {
//     //     name: user.name,
//     //     email: user.email,
//     //   },
//     // });
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" },
//     );

//     res.status(200).json({
//       message: "Login successful ✅",
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });



    
//   } catch (error) {
//     console.log("LOGIN ROUTE ERROR:", error);
//     res.status(500).json({
//       message: "Login failed",
//       error: error.message,
//     });
//   }
// });

// /* ------------------------------
//    GET ALL TODOS FOR LOGGED-IN USER
// -------------------------------- */
// app.get("/todos/:email", verifyToken, async (req, res) => {
//   try {
//     const todos = await Todo.find({ userEmail: req.params.email }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json(todos);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error fetching todos",
//     });
//   }
// });

// /* ------------------------------
//    ADD NEW TODO
// -------------------------------- */
// app.post("/todos", verifyToken, async (req, res) => {
//   try {
//     const { text, dueDate, priority, category, notes, completed, userEmail } =
//       req.body;

//     if (!text || !userEmail) {
//       return res.status(400).json({
//         message: "Task text and user email are required",
//       });
//     }

//     const newTodo = new Todo({
//       text,
//       dueDate,
//       priority,
//       category,
//       notes,
//       completed,
//       userEmail,
//     });

//     const savedTodo = await newTodo.save();

//     res.status(201).json(savedTodo);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error adding todo",
//     });
//   }
// });

// /* ------------------------------
//    UPDATE TODO
// -------------------------------- */
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!updatedTodo) {
//       return res.status(404).json({
//         message: "Todo not found",
//       });
//     }

//     res.status(200).json(updatedTodo);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error updating todo",
//     });
//   }
// });

// /* ------------------------------
//    DELETE TODO
// -------------------------------- */
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

//     if (!deletedTodo) {
//       return res.status(404).json({
//         message: "Todo not found",
//       });
//     }

//     res.status(200).json({
//       message: "Todo deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error deleting todo",
//     });
//   }
// });

// /* ------------------------------
//    START SERVER
// -------------------------------- */
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import User from "./models/sign.js";
// import Todo from "./models/Todo.js";
import User from "./sign.js";
import Todo from "./Todo.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ------------------------------
   MIDDLEWARE - VERIFY JWT TOKEN
-------------------------------- */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

/* ------------------------------
   MONGODB CONNECTION
-------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((error) => console.log("MongoDB connection error:", error));

/* ------------------------------
   BASIC ROUTE
-------------------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ------------------------------
   SIGNUP ROUTE
-------------------------------- */
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful 🎉",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("SIGNUP ROUTE ERROR:", error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
});

/* ------------------------------
   LOGIN ROUTE
-------------------------------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ROUTE ERROR:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

/* ------------------------------
   GET ALL TODOS FOR LOGGED-IN USER
-------------------------------- */
app.get("/todos/:email", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userEmail: req.params.email }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching todos",
    });
  }
});

/* ------------------------------
   ADD NEW TODO
-------------------------------- */
app.post("/todos", verifyToken, async (req, res) => {
  try {
    const { text, dueDate, priority, category, notes, completed, userEmail } =
      req.body;

    if (!text || !userEmail) {
      return res.status(400).json({
        message: "Task text and user email are required",
      });
    }

    const newTodo = new Todo({
      text,
      dueDate,
      priority,
      category,
      notes,
      completed,
      userEmail,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding todo",
    });
  }
});

/* ------------------------------
   UPDATE TODO
-------------------------------- */
app.put("/todos/:id", verifyToken, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating todo",
    });
  }
});

/* ------------------------------
   DELETE TODO
-------------------------------- */
app.delete("/todos/:id", verifyToken, async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting todo",
    });
  }
});

/* ------------------------------
   START SERVER
-------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
