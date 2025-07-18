const express = require("express");
const app = express();
const path = require("path"); 

const port = 8080;

// app.use matlab ye kaam harr req k liyea hona chaiyea, These are called middlewares.
app.use(express.urlencoded({extended: true})); // This is a standard line which we write everytime, so that express can parse or understand what data was send in URL encoded post req.
app.use(express.json()); // This is a standard line which we write everytime, so that express can parse or understand what data was send in JSON format post req.

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/register", (req, res) => {
  let {user, password} = req.query;
  res.send(`Standard GET response. Welcome ${user}!`);
});

app.post("/register", (req, res) => {
  let {user, password} = req.body; // the data sent through a post req is in req.body.
  res.send(`Standard POST response. Welcome ${user}!`);
});