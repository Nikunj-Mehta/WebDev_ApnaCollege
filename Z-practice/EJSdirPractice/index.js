const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.set("view engine", "ejs"); // sets EJS as templating engine
app.set("views", path.join(__dirname, "/views"))

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`)
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/path", (req, res) => {
  res.render("hello.ejs");
});