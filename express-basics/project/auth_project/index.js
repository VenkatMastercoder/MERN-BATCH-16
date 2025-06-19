const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var morgan = require('morgan')

const app = express();

app.use(express.json()); // Core Middleware

app.use(morgan('dev')); // Third Party Middleware

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("API is Wokring");
});

// POST - register - Add user to DB
app.post("/register", async (req, res) => {
  try {
    // 1. Data from Frontend
    const data = req.body;

    const is_user_exits = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (is_user_exits) {
      return res.status(401).json({ message: "User Already Exits" });
    } else {
      const hashed_password = await bcrypt.hash(data.password, 10); // Hashing the Password

      // 2. DB Logic
      const new_user = await prisma.user.create({
        data: {
          user_name: data.user_name,
          email: data.email,
          password: hashed_password,
        },
        select: {
          user_id: true,
          email: true,
          user_name: true,
        },
      });

      // 3. Data to Frontend
      return res
        .status(200)
        .json({ message: "New Account Created", data: new_user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST - login - Check user to DB [ email,password ]
app.post("/login", async (req, res) => {
  try {
    // 1. Data from Frontend
    const data = req.body; // email & password

    // 2. DB Logic
    const is_user_exits = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (is_user_exits) {
      const is_pass_vaild = await bcrypt.compare(
        data.password,
        is_user_exits.password
      );

      if (is_pass_vaild) {
        var temp_key = jwt.sign(
          { email: is_user_exits.email }, // Proof
          "hh-room-temp", // key Stamp
          { expiresIn: "1h" } // Expires of Key
        );
        var main_key = jwt.sign(
          { email: is_user_exits.email },
          "hh-room-main",
          { expiresIn: "1d" }
        );

        const payload = {
          user_id: is_user_exits.user_id,
          user_name: is_user_exits.user_name,
          email: is_user_exits.email,
          token: {
            temp_key: temp_key,
            main_key: main_key,
          },
        };

        res.status(200).json({ message: "Login", data: payload });
      } else {
        res.status(404).json({ message: "Wrong Password" });
      }
    } else {
      res.status(404).json({ message: "No Account Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST - refresh - New Key when the old Key Expires
app.post("/refresh", async (req, res) => {
  // 1.Data from Frontend - main key
  const data = req.body;

  // 2.DB Logic or Bussiness Logic
  jwt.verify(data.token, "hh-room-main", function (err, decoded) {
    // err
    console.log(err);
    if (err) {
      res.status(400).json({ message: "Invalid Key" });
    } else {
      console.log(decoded);
      // Temp Key
      var temp_key = jwt.sign({ email: decoded.email }, "hh-room-temp", {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "New Token", data: temp_key });
    }
    // decoded undefined
  });

  // 3.Data to Frontend
});

// Public Route
app.get("/user", (req,res) => {
  res.send("Hii");
});

// Private Route
app.get("/user/:user_id", (req,res) => {
  res.send("Hii");
});


app.listen(3000);
