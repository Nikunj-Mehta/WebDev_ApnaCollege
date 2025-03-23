const apple = require("./apple");
const banana = require("./banana");
const orange = require("./orange");

let fruits = [apple, banana, orange];

module.exports = fruits;

/* If we want to export all the files in a directory ie the entire directory
 then we need to create a special file in that directory and name it "index.js" name must be same and
  import the data of all the files in here and then from here export the data where ever we want.
*/