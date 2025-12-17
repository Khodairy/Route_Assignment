// // =========================== Assignment 2 (NodeJS Basics) ===========================

// // ===================================== Part 1 =======================================

// // 1. What is the difference between forEach and for...of? When would you use each?
// // for...of using for searching in arr or object by elements.
// // forEach using for return new arr and modify part of arr.
// // for(;;) using for searching in arr by index.
// // for...in such as for(;;) searching by index.
// // 1. Write a function that logs the current file path and directory.
// const path = require("node:path");
// console.log(
//   `File:${path.join(
//     path.dirname(__filename),
//     path.basename(__filename)
//   )} & Dir:${path.dirname(__filename)}`
// ); // Output: File:C:\Users\win\Desktop\Route_Assignment\main.js & Dir:C:\Users\win\Desktop\Route_Assignment

// //======================================
// // 2. Write a function that takes a file path and returns its file name.
// console.log(path.basename("/user/files/report.pdf")); // Output: report.pdf

// // 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// // Hoisting: is a javaScript mechanism where variables and function declarations are moved to the top of their containing scope.
// // Ex:
// // hoistingFunction();
// // function hoistingFunction() {
// //   console.log("Hello From Hoisting Function");
// // }
// // TDZ: is the time between the entering of scope and the actual declaration.
// // console.log(tdzVar); // outputCannot access 'tdzVar' before initialization
// // let tdzVar = "I am outside TDZ";
// // 3. Write a function that builds a path from an object.
// console.log(path.format({ dir: "/folder", name: "app", ext: ".js" })); // Output: /folder\app.js

// //======================================
// // 4. Write a function that returns the file extension from a given file path.
// console.log(path.extname("/docs/readme.md")); // Output: .md

// // 3. What are the main differences between == and ===?
// // compare value only.
// //compare value and type.
// // 5. Write a function that parses a given path and returns its name and ext.
// let { name, ext } = path.parse("/home/app/main.js");
// console.log({ name, ext }); // Output: { name: 'main', ext: '.js' }

// //======================================
// // 6. Write a function that checks whether a given path is absolute.
// console.log(path.isAbsolute("/home/user/file.txt")); // Output: true

// // 4. Explain how try-catch works and why it is important in async operations.
// // try-catch is used to handle errors in synchronous and asynchronous code.
// // The code that may throw an error is placed inside the try block. If an error occurs,
// // the control is transferred to the catch block where the error can be handled correctly.
// // 7. Write a function that joins multiple segments.
// console.log(path.join("src", "components", "App.js")); // Output: src\components\App.js

// //======================================
// // 8. Write a function that resolves a relative path to an absolute one.
// console.log(path.resolve(__filename)); // Output: C:\Users\win\Desktop\Route_Assignment\main.js

// // 5. What’s the difference between type conversion and coercion? Provide examples of each.
// // Type conversion is the process of converting a value from one type to another type.
// // Example:
// // let num = "123";
// // let convertedNum = Number(num); // Explicit conversion from string to number
// // console.log(convertedNum); // Output: 123
// // 9. Write a function that joins two paths.
// console.log(path.join("/folder1", "folder2/file.txt")); // Output: \folder1\folder2\file.txt

// // Type coercion is the automatic converting values from one type to another.
// // Example:
// // let coercedNum = "5" - 2; // Implicit conversion from string to number
// // console.log(coercedNum); // Output: 3
// // 10. Write a function that deletes a file asynchronously.
// const fs = require("node:fs");

// // fs.rm(path.resolve("./data.txt"), { recursive: true }, (error) => {
// //   if (error) {
// //     console.log(error);
// //   }
// // });

// // 11. Write a function that creates a folder synchronously.
// fs.mkdirSync("src/folder/images", { recursive: true }, (error) => {
//   if (error) {
//     console.log(error);
//   }
// });

// // 12. Create an event emitter that listens for a "start" event and logs a welcome message.
// const EventEmitter = require("node:events");
// const { encode } = require("node:querystring");
// const { error } = require("node:console");
// const event = new EventEmitter();
// event.on("start", () => {
//   console.log("Welcome event triggered!");
// });
// event.emit("start"); // Output: Welcome event triggered!

// // 13. Emit a custom "login" event with a username parameter.
// event.on("login", (name) => {
//   console.log(`User logged in: ${name}`);
// });
// event.emit("login", "Abdallah"); // Output: User logged in: Abdallah

// // 14. Read a file synchronously and log its contents.

// const data = fs.readFileSync(
//   path.resolve("./data2.txt"),
//   { encoding: "utf8" },
//   (error, data) => {
//     if (error) {
//       return error;
//     } else {
//       return data;
//     }
//   }
// );
// console.log({ data });

// // 15. Write asynchronously to a file.
// fs.writeFile(
//   path.resolve("./data2.txt"),
//   "hello world ",
//   { flag: "a" },
//   (error) => {
//     if (error) {
//       console.log(error);
//     }
//   }
// );

// // 16. Check if a directory exists.

// if (fs.existsSync("./src/folder/images")) {
//   console.log("Directory exists");
// } else {
//   console.log("Directory does not exist");
// }
// // 17. Write a function that returns the OS platform and CPU architecture.

// //=====================================================================================

// // ===================================== Part 2 =======================================

// // solution in bonus.js file

// //=====================================================================================
