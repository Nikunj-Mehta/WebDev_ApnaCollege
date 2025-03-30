const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid"); 

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// For creating connection between database and node.js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "SQL@15112004"
});

// Used to generate random objects to add values in database.
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// Home route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    // It is used to run any query on database. q is the query and data is the values to be added in db.
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch(err) {
    console.log(err);
    res.send("Some error in database"); // There is no need for connection.end(); as it is done by this get call.
  }
});

// Show Route
app.get("/user", (req, res) => {
  let q = `SELECT id, username, email FROM user`;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      const users = result; // this result is an array of objects havind fields id, username and email which we are storing in a variable named data to pass to users.ejs file
      res.render("showuser.ejs", { users });
    });
  } catch(err) {
    console.log(err);
    res.send("Some error in database");
  }
});

// Edit Username Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params; // Now first we need to find the user having this id, the query will be
  let q = `SELECT * FROM user WHERE id = "${ id }"`;

  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0]; // As data is coming in form of array lets take 0th ele of array.
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database.")
  }
});

// Update Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params; // Now first we need to find the user having this id.
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`; // Search user info in db
  
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password) { // Check if password in form matches the password from db.
        res.send("WRONG Password!"); // if not then give this
      }
      else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`; // if correct password update password
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user"); // send the result.
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database.")
  }
});

// Add a new user
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;

  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database.")
  }
});

// Delete a user.
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});


app.listen(port, () => {
  console.log(`Listening through port: ${port}`);
});
