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
  let { username, id } = req.params;
  let htmlStr = `<h1>Welcome to the page of @${username}, You have ID: ${id}</h1>`
  res.send(htmlStr);
});

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

//               <h1>My First Heading</h1>
//               <p>My first paragraph.</p>

//               </body>
//               </html>`;
//   res.send(code); // We can send string html doc and many things as response.(Refer to doc in npm webpage.)
// });
