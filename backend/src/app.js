const express = require('express')
const cors = require('cors')
const prisma = require("./prisma");

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  const user = await prisma.user.create({
    data: { name, email, role },
  });

  res.status(201).json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    where: { deletedAt: null },
  });

  res.json(users);
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  res.json(user);
});

module.exports = app