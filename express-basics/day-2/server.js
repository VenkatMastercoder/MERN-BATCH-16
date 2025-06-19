const express = require("express");

// We now Creating an HTTP Server Instances
const app = express();

// API -> GET : localhost:3000/ -> Hello World from Express
app.get("/", (req, res) => {
  // 1. Data from frontend

  // 2. DB Logic

  // 3. Data to Frontend
  res.send("Hello World from Express");
});

// API -> GET : localhost:3000/car -> Car Hello from Express - 1
app.get("/car", (req, res) => {
  // 1. Data from Frontend

  // 2. DB Logic

  // 3. Data to Frontend
  res.send("Car Hello from Express - 1");
});

// API -> GET : localhost:3000/car -> Car Hello from Express - 2
app.get("/car", (req, res) => {
  // 1. Data from Frontend

  // 2. DB Logic

  // 3. Data to Frontend
  res.send("Car Hello from Express - 2");
});

app.post("/car", (req, res) => {
  // 1. Data from Frontend

  // 2. DB Logic

  // 3. Data to Frontend
  res.send("Car Hello from Express - 1");
});

app.listen(3000);
