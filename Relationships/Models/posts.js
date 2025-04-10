const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to many method 3 (Store a ref of parent doc inside child doc as many child(posts) will have one single parent(user).)
const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//   const user = await User.findOne({username: "rahulkumar"});

//   let post2 = new Post({
//     content: "Bye Bye",
//     likes:23,
//   });

//   post2.user = user;
//   await post2.save();
// };

// addData();

const getData = async () => {
  let result = await Post.findOne({}).populate("user", "username"); // specific info with id.
  console.log(result);
};

getData();