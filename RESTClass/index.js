// Best file refer this whenever you want to lean CRUD commands.
let express = require("express");
let app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // To create random new id s.
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method")); // It is used to allow our form to parse(Understand) PATCH, PUT, DELETE requests. As (form)it only understands GET and POST req by defaule

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding!"
  },
  {
    id: uuidv4(),
    username: "nikunj",
    content: "Hardwork is important to achieve success."
  },
  {
    id: uuidv4(),
    username: "anurag",
    content: "I got selected for my 1st internship!!!"
  },
];

app.listen(port, () => {
  console.log(`Listening to port...${port}`);
});

//View Index
app.get("/posts", (req, res) =>{
  res.render("index.ejs", { posts });
});

//Create (add a new post)
app.get("/posts/new", (req, res) => {
  res.render("new.ejs")
})

app.post("/posts", (req,res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content }); // create an object of given content and push that object in posts array.
  //res.render("index.ejs"); This will give us error, to avoid this express has a very nice functionality
  res.redirect("/posts");
});

//Read (see in detail)
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", {post});
});

// Update (update an existing post)
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post })
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  // console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id); // .filter() Creates a new array and add only those elements for which the callback is true. If id not= p.id it is true so those posts will be added,
  res.redirect("/posts");                  // If id == p.id then condition is false so that post will be filtered or will not be added. 
});