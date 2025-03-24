// let n = 5;

// for(let i = 0; i < n; i++) {
//   console.log("Hello, ", i);
// }

// console.log("bye!");

console.log(process.argv);
console.log(process.argv.length);

let args = process.argv

for(let i = 2; i < args.length; i++)
{
  console.log("Hello to", args[i])
}