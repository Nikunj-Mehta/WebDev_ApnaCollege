const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

// For creating connection between database and node.js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "SQL@15112004"
});

try {
  // It is used to run any query on database.
  connection.query("SHOW TABLES", (err, result) => {
    if(err) throw err;
    console.log(result);
  })
} catch(err) {
  console.log(err);
}

connection.end(); // We always need to end connection.

// Used to generate random objects to add values in database.
let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

// console.log(getRandomUser());