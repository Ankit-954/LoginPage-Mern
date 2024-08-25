const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = 8000;
const connectiondb = require("./Database/DatabaseConnect");
const user = require("./Database/user");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);  // Generates a salt with a cost factor of 10
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = new user({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await user.findOne({ username });

    if (!existingUser) {
      return res.status(401).json("Invalid username");
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json("Invalid password");
    }

    res.status(200).json("User logged in successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Login failed");
  }
});

// Connect to the database
connectiondb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
