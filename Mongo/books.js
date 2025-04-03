const mongoose = require("mongoose");

main()
.then(() => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String, // this way we write when there are many constraints to apply. This is original way to write.
    required: true, // Meaning NOT NULL in MySQL
    maxLength: 20,
  },
  author: {  // Refer documentations for more constraints
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price is too low for Amazon selling"], // We can throw exact errors if this validation fails
  }, 
  discount: {
    type: Number,
    default: 0,
  },
  catagory: {
    type: String,
    enum: ["fiction", "non-fiction"], // if we give type then it must be in this catagory only and no other catagory
  },
  genre: [String] // We can store array too
});

const Book = mongoose.model("Book", bookSchema);

// Update
Book.findByIdAndUpdate("67ee458cb923b605310bdd3e", {price: -500}, {runValidators: true}) // These constraints does not work with updation, These constraints works only while inserting.
.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err.errors.price.properties.message); // to get the user defined error if constraints fails (custom error).
});

// Create
// const book1 = new Book({
//   title: "Marvel Comics v2",
//   price: 600, // If we send "abcd" then it can't be typecasted into int and will return error, but if we write "2000" in string no error wil occur as it can be converted(parsed) to int.});
//   genre: ["comics", "superheroes", "fiction"],
// });
// book1.save()
// .then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });