const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => {
  console.log("Connection successful!");
}).catch((err) => {
  console.log(err);
})

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/", (req, res) => {
  res.send("You are at root route");
});

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); // asynchronous function which will return all chats form db and we are storing it in a variable.
  console.log(chats);
  res.render("index.ejs", { chats });
});

// New chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
})
// Create new chat
app.post("/chats", (req, res) => {
  let {from, to, msg} = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });

  newChat.save().then((res) => { // saving new chat to db. But this process is asynchronous but if we are writting .then then there is no need to write await.
    console.log("Chat was saved");
  }).catch((err) => {
    console.log(err);
  });

  res.redirect("/chats");
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs", { chat });
});

// Update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg }, {runValidators: true, new: true});
  console.log(updatedChat);
  res.redirect("/chats");
});

// Delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id, {new: true});
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});