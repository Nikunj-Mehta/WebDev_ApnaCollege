const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/a-winding-river-flows-through-a-canyon-MY-sETnOzzo",
    set: (v) => v === "" ? 
    "https://unsplash.com/photos/a-winding-river-flows-through-a-canyon-MY-sETnOzzo"
    : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;