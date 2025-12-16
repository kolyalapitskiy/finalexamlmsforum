const express = require("express");
const router = express.Router();
const pool = require("./db");

// GET all
router.get("/items", async (req, res) => {
  const result = await pool.query("SELECT * FROM discussion_posts");
  res.json(result.rows);
});

// GET by id
router.get("/items/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM discussion_posts WHERE id = $1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// POST
router.post("/items", async (req, res) => {
  const { title, content, author } = req.body;
  await pool.query(
    "INSERT INTO discussion_posts (title, content, author) VALUES ($1, $2, $3)",
    [title, content, author]
  );
  res.sendStatus(201);
});

// PUT
router.put("/items/:id", async (req, res) => {
  const { title, content, author } = req.body;
  await pool.query(
    "UPDATE discussion_posts SET title=$1, content=$2, author=$3 WHERE id=$4",
    [title, content, author, req.params.id]
  );
  res.sendStatus(200);
});

// DELETE
router.delete("/items/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM discussion_posts WHERE id=$1",
    [req.params.id]
  );
  res.sendStatus(200);
});

module.exports = router;
