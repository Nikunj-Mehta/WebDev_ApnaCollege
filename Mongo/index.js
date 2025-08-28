const mongoose = require("mongoose");

main()
.then(() => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
  name: String, // this method is used when only 1(datatype) constrainst is used.
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema); // Creating an actual collection named User with schema defined above.

//Delete
// User.deleteOne({name: "Batman"})
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// User.deleteMany({name: "Shawn"})
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// If we want to delete and get what is deleted
// User.findByIdAndDelete("68b0157174f779ce563f2e16")
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.findOneAndDelete({age: {$gt: 20}})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });


// Update
// User.updateOne({name: "Bruce"}, {age: 49})
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })

// User.updateMany({age: 48}, {age: 29})
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

//If we want to update and get the updated value
// User.findOneAndUpdate({name: "Bruce"}, {age: 35}, {new: true}) // this will print the previous value before updation. To avoid that we use new key: value pair, to get the updated value.
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.findByIdAndUpdate("68b0157174f779ce563f2e17", {name: "Batman"}, {new: true}) // this will print the previous value before updation. To avoid that we use new key: value pair, to get the updated value.
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.findByIdAndUpdate("68b0157174f779ce563f2e17", {name: "Batman", age: 46}, {new: true}) // this will print the previous value before updation. To avoid that we use new key: value pair, to get the updated value.
// .then((res) => {                                 // To update multiple fields.
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });


// Read
// User.find({})
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// User.findOne({age: {$gt: 47}})
// .then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err)
// });

// User.find({age: {$gt: 47}})
// .then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err)
// });

// User.findById("67ee2b30d0a97bde8e34283b")
// .then((res) => {
//   console.log(res);
// }).catch(err => {
//   console.log(err)
// });


// Create
// const user1 = new User({ // delete if the code is executed once.
//   name: "Adam",
//   email: "adam@yahoo.in",
//   age: 48,
// });  // Document is created but not added to mongodb yet.

// user1.save(); // Now this doc is added to mongodb. This method returns a promise

// const user2 = new User({
//   name: "Eve",
//   email: "eve@yahoo.in",
//   age: 48,
// });

// user2.save()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// User.insertMany([
//   {name: "Tony", email: "tony@gmail.com", age: 50},
//   {name: "Peter", email: "peter@gmail.com", age: 30},
//   {name: "Bruce", email: "bruce@gmail.com", age: 47},
// ]).then((res) => {
//   console.log(res);
// });

// User.insertMany([
//   {name: "Shawn", email: "shawn@email.com", age: 43},
// ]);
