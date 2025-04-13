const express = require("express");
const router = express.Router(); // we need to require router to perform this organization of code.

// One change is to replace all the app.get by router.get or router.post

// Posts
// Index 
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// Show
router.get("/:id", (req, res) => {
  res.send("GET for posts id");
});

// POST
router.post("/", (req, res) => {
  res.send("POST for posts");
});

// Delete
router.delete("/:id", (req, res) => {
  res.send("DELETE for posts id");
});

module.exports = router;