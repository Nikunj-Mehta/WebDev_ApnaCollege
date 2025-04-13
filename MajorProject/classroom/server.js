const express = require("express");
const app = express();
const users = require("./routes/user.js"); // we have required but we need to use them
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
  res.cookie("made-in", "India", {signed: true}); // the reason behind sending signed cookie is their integrity is mantained no one is able to alter it.
  res.send("Signed cookie sent");
});

app.get("/verify", (req, res) => {
  console.log(req.cookies); // the signed cookie will not be printed but if we manually add any cookie then it will be displayed.
  console.log(req.signedCookies); // to get the signed cookies. If we change then we can't see anything in here.
  res.send("verified");
});

app.get("/getcookies", (req, res) => {
  res.cookie("greet", "hello"); // cookies exist in name(greet) - value(hello) pair.
  res.cookie("madein", "India"); // we can send multiple cookies.
  res.send("sent you some cookies!")
});

app.get("/greet", (req, res) => {
  let { name="anonymous" } = req.cookies;
  res.send(`Hi, ${name}`);
})

app.get("/", (req, res) => {
  console.dir(req.cookies); // will give undefined for now because directly we can't parse cookies, we need middleware named cookie-parse to do it.
  res.send("Hi! I am root");
});

// users /user to write the common path
app.use("/users", users); // Hum chate hai jitne bhi humere routes h jo "/" se start hote hai vo phale check honge ki khi vo users m defined kisi route se match to nhi kr rhe.

// Posts
app.use("/posts", posts); // Hum chate hai jitne bhi humere routes h jo "/" se start hote hai vo phale check honge ki khi vo pathss m defined kisi route se match to nhi kr rhe.

// If we want we can define more paths.

app.listen(3000, () => {
  console.log("Server is listening to port: 3000");
})