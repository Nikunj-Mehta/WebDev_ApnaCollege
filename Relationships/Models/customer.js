const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(() => {
  console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to many method 2 (Store a ref of child doc inside parent doc)
const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [ // mongodb k andr sirf object ki id hai jo actual db k andr jati hai.
    {
       type: Schema.Types.ObjectId, // customer schema has order as ref id for type of  id we need to write this.
       ref: "Order", // Where to take reference from which model?
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

const Customer = mongoose.model("Customer", customerSchema);

// Functions
const findCustomer = async () => {
  // let cust1 = new Customer ({
  //   name: "Rahul Kumar"
  // });

  // let order1 = await Order.findOne({item: "Chips"});
  // let order2 = await Order.findOne({item: "Chocolate"});

  // cust1.orders.push(order1);
  // cust1.orders.push(order2);

  // const result = await cust1.save();

  // console.log(result);

  let result = await Customer.find().populate("orders"); // orders k andr bs objectid hai poora data nhi.
  console.log(result[0]);
}

findCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     {item: "Samosa", price: 12},
//     {item: "Chips", price: 10},
//     {item: "Chocolate", price: 40},
//   ]);
//   console.log(res);
// };

// addOrders();

const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun"
  });


  let newOrder = new Order({
    item: "Pizza",
    price: 250
  });

  newCust.orders.push(newOrder);
  await newOrder.save();
  await newCust.save();

  console.log("added new Customer");
};

addCust();