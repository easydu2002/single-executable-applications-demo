const { defaultValue } = require("./depend");

console.log(`Hello, ${process.argv[2] ?? defaultValue}!`);