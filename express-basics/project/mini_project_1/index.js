const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

// Base API
app.get("/", (req, res) => {
  res.send("API is Working");
});

// GET - localhost:3000/students - fetch all the Student in DB
app.get("/students", async (req, res) => {
  // 1. Data from Frontend [ Optional ]

  // 2. DB Logic
  const studentsData = await prisma.user.findMany();

  // 3. Data to Frontend
  res.send(studentsData);
});

// GET - localhost:3000/student/:roll_no - fetch a the Student in DB
app.get("/students/:roll_no", async (req, res) => {
  // 1. Data from Frontend
  const data = req.params; // {roll_no: "1"}

  // 2. DB Logic
  const studentData = await prisma.user.findUnique({
    where: {
      roll_no: data.roll_no,
    },
  });

  // 3. Data to Frontend
  res.send(studentData);
});

// POST - localhost:3000/student/ - Add a the Student in DB
app.post("/students", async (req, res) => {
  // 1. Data from Frontend
  const data = req.body;

  // 2. DB Logic
  const newStudent = await prisma.user.create({
    data: {
      roll_no: data.roll_no,
      name: data.name,
      age: data.age,
      blood_group: data.blood_group,
    },
  });

  // 3. Data to Frontend
  res.send(newStudent);
});

// PUT  - localhost:3000/student/ - Update a the Student in DB
app.put("/students", async (req, res) => {
  // 1. Data from Frontend
  const data = req.body;

  // 2. DB Logic
  const newUpdatedStudent = await prisma.user.update({
    where: {
      roll_no: data.roll_no,
    },
    data: {
      name: data.name,
      age: data.age,
      blood_group: data.blood_group,
    },
  });

  // 3. Data to Frontend
  res.send(newUpdatedStudent);
});

// DEL  - localhost:3000/student/ - Delete a the Student in DB
app.delete("/students", async (req, res) => {
  // 1. Data from Frontend
  const data = req.body;

  // 2. DB Logic
  await prisma.user.delete({
    where: {
      roll_no: data.roll_no,
    },
  });

  // 3. Data to Frontend
  res.send("Delete the Student");
});

app.listen(3000);
