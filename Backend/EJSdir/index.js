const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/css")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); 
/* If we start our server from anywhere then it will always search for "views" folder only in EJSdir folder.
 If we do not write this line then it will search the "views" folder in the directory we started the server.
__dirname consists the path of index.js ie backend/EJSdir aur iske aage we are joining views
so we are telling express not to search for "views" where the server is started instead
always search for "views" in the path we give.
*/

/* How does this happen ?
Express js By default searches in the "views" folder for the file name given and it display it as we are usign res.render.
*/
app.get("/", (req, res) => {
  res.render("home.ejs"); // .ejs is not necessary
});

app.get("/hello", (req, res) => {
  res.send(`Hello`);
});

app.get("/rolldice", (req, res) =>{
    let diceVal = Math.floor(Math.random() * 6) + 1; // Assume value coming form database.
  res.render("rolldice.ejs", { diceVal }); // this value we are storing in a var and passing it through an object along with filename.
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  if(data) {
    res.render("instagram.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});