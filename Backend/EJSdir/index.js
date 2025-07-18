const express = require("express");
const app = express();
const path = require("path"); // Always use this when working with EJS or templating because it helps server in finding path of views folder where our ejs templates resides.

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

app.use(express.static(path.join(__dirname, "public/js"))); // Serve static JS files from public/js   .By default express takes the static files from public folder only.
app.use(express.static(path.join(__dirname, "public/css"))); // Serve static CSS files from public/css

app.set("view engine", "ejs"); // Set EJS as the templating engine

// Tell Express to always look for .ejs files in the "views" folder,
// regardless of where the server is started from
app.set("views", path.join(__dirname, "/views")); // we want to say the folder named views will not be found from where the server is running, but it will be found using path.join
// The path.join joins the path __dirname give the current working directory of index.js(backend/EJSdir) and in it we are joining this views path. We get constant path
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

/*  
EJS is a templating engine, not just a style.
Express uses EJS to render dynamic content as HTML.
Express handles the logic, EJS handles the display.
*/