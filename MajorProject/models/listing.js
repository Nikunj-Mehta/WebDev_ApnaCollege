const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === "" ? 
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [ // listing k andr reviews ki id show hogi.
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Mongoose middleware if we run findOneAndDelete on listing then after doing it's work and before returning control it will execute the code below, which is, if a listing gets deleted then all the reviews related to that listing also deletes.
listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}}); // agar koi listing delete huye to uske andr reviews collection m se vo db docs delete ho jynge jinki id uss listings doc m review[] m the.
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;