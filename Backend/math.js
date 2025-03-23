export const  sum = (a, b) => a + b;
export const mul = (a, b) => a * b;
export const g = 9.8;
export const PI = .14; // one more way

/* But it fails when
exports = 5;  this will be treated as a var instead of exports
therefor we use
module.exports = 5;
*/
// module.exports = {
//   sum: sum,
//   mul: mul,
//   g: g,
//   PI, PI,
//   greet: "Hello"
// }

