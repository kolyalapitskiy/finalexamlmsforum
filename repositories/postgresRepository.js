const pool = require("../db");

module.exports = {
  getAll: () => pool.query("SELECT * FROM discussion_posts").then(res => res.rows),
  getById: (id) => pool.query("SELECT * FROM discussion_posts WHERE id=$1", [id]).then(res => res.rows[0]),
  create: ({ title, author, content }) => pool.query(
    "INSERT INTO discussion_posts (title, author, content) VALUES ($1, $2, $3)",
    [title, author, content]
  ),
  update: (id, { title, author, content }) => pool.query(
    "UPDATE discussion_posts SET title=$1, author=$2, content=$3 WHERE id=$4",
    [title, author, content, id]
  ),
  delete: (id) => pool.query(
    "DELETE FROM discussion_posts WHERE id=$1",
    [id]
  )
};
