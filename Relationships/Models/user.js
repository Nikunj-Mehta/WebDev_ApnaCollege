const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to many approach 1  one to few (Embed Store entire child doc inside parent doc.)
const userSchema = new Schema({
  username: String,
  addresses: [ // child doc. MongoDB will give by default ._id to this doc too even if we didn't defined it's schema.
    {
      _id: false, // if we don't want id for each address.
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "sherlockholmes",
    addresses: [
      {
        location: "221B Baker Street",
        city: "London"
      },
    ]
  });

  user1.addresses.push({location: "P32 WallStreet", city: "London"});
  let result = await user1.save();
  console.log(result);
};

addUsers();