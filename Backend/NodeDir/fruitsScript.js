const info = require("./Fruits");

console.log(info);
console.log(info[1].name);

// If we remover the type: "module" in package.json the this will work because if we gave type = module then import will work but require will not.