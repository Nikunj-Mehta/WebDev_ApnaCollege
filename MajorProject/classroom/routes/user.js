const express = require("express");
const router = express.Router(); // we need to require router to perform this organization of code.

// One change is to replace all the app.get by router.get or router.post
// Index - users
router.get("/", (req, res) => { // common part nikl kr main file m mention kr do
  res.send("GET for users");
});

// Show - users
router.get("/:id", (req, res) => {
  res.send("GET for users id");
});

// POST - users
router.post("/", (req, res) => {
  res.send("POST for users");
});

// Delete - users
router.delete("/:id", (req, res) => {
  res.send("DELETE for users id");
});

module.exports = router;
