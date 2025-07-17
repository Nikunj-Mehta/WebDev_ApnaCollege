const express = require("express");
const app = express(); // it is a function which on executing returns an object which we are storing in a var named app.
// Now this app object contains many functions.
// console.dir(app);

let port = 8080; // 3000

// Listen creates a web server which listens for incoming api requests
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, I am root");
});

// Path Parameters
app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params; // Destructuring the request object and extracting the fields username from URL. As the express converts https text based request to request object.
  let htmlStr = `<h1>Welcome to the page of @${username}, You have ID: ${id}</h1>`
  res.send(htmlStr);
});

//Query String
app.get("/search", (req, res) => {
  let { q } = req.query;
  if(!q) {
    res.send(`<h1>Noting searched</h1>`)
  }
  res.send(`<h1>Search results for query: ${q}</ h1>`);
});


// app.get("/search", (req, res) => {
//   res.send("you contacted search path");
// });

// app.get("/help", (req, res) => {
//   res.send("you contacted help path");
// });

// This is called wildcard route i.e. if a get request comes on any path which is not definer above then this path will catch it and will send the response given below.
// app.get("*", (req, res) => {
//   res.send("This path does not exist.");
// })

// app.post("/", (req, res) => {
//   res.send("you sent a post request to root");
// })


// app.use((req, res) => {
//   // console.log(req);
//   console.log("request received!");
//   let code = `<!DOCTYPE html>
//               <html>
//               <body>

//               <h1>Error - 404</h1>
//               <p>Page not found.</p>

//               </body>
//               </html>`;
//   res.send(code); // We can send string html doc and many things as response.(Refer to doc in npm webpage.)
// });
