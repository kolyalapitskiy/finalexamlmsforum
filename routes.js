const express = require("express");
const router = express.Router();

// Переключение базы: true = MongoDB, false = PostgreSQL
const USE_MONGO = false;

const repository = USE_MONGO
  ? require("./repositories/mongoRepository")
  : require("./repositories/postgresRepository");

// GET all
router.get("/items", async (req, res) => {
  const data = await repository.getAll();
  res.json(data);
});

// GET by id
router.get("/items/:id", async (req, res) => {
  const data = await repository.getById(req.params.id);
  res.json(data);
});

// POST
router.post("/items", async (req, res) => {
  await repository.create(req.body);
  res.sendStatus(201);
});

// PUT
router.put("/items/:id", async (req, res) => {
  await repository.update(req.params.id, req.body);
  res.sendStatus(200);
});

// DELETE
router.delete("/items/:id", async (req, res) => {
  await repository.delete(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
