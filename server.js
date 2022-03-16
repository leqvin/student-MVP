"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // }
});

app.use(express.json()); // for parsing application/json
app.use(express.static("public"));

app.get("/exercises", (req, res) => {
  pool
    .query(
      "SELECT *, to_char(date, 'yyyy-MM-dd') as date FROM exercises ORDER BY id ASC"
    )
    .then((result) => res.send(result.rows));
});

app.get("/exercises/:id?", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query(
      "SELECT *, to_char(date, 'yyyy-MM-dd') as date FROM exercises WHERE id = $1",
      [id]
    )
    .then((result) => res.send(result.rows));
});

app.delete("/exercises/:id?", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query("DELETE FROM exercises WHERE id = $1 RETURNING *", [id])
    .then((result) => res.send(result.rows[0]));
});

app.patch("/exercises/:id?", (req, res) => {
  const id = Number(req.params.id);
  const { date, sets, weight, reps, name } = req.body;
  const query =
    "UPDATE exercises SET name = COALESCE($1, name), date = COALESCE($2, date), sets = COALESCE($3, sets), reps = COALESCE($4, reps), weight = COALESCE($5, weight) WHERE id = $6 RETURNING *";

  pool
    .query(query, [name, date, sets, reps, weight, id])
    .then((data) => {
      res.status(200).json(data.rows[0]);
    })
    .catch((err) => console.error("Error executing query", err.stack));
});

app.post("/", (req, res) => {
  const { date, sets, weight, reps, name } = req.body;
  console.log(req.body)
  pool
    .query(
      "INSERT INTO exercises (name, date, sets, weight, reps) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, date, sets, weight, reps]
    )
    .then((data) => {
      res.status(201).json(data.rows[0]);
    })
    .catch((err) => console.error("Error executing query", err.stack));
});

app.listen(process.env.PORT, () => {
  console.log("Server Running on port, ", process.env.PORT);
});
