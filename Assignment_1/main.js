// // ========================= Assignment 1 (JavaScript Basics) =========================

// // ===================================== Part 1 =======================================

// // 1. Convert the string "123" to a number and add 7.
// let strNum = "123";
// console.log(Number(strNum) + 7); // Output: 130

// // 2. Check if the given variable is falsy and return "Invalid" if it is.
// let value = 0;
// if (value == true) {
//   console.log("Valid");
// } else {
//   console.log("Invalid");
// } // Output: "Invalid"

// // 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
// let arrOddNumbers = [];
// for (let i = 1; i <= 10; i++) {
//   if (i % 2 === 0) {
//     continue;
//   }
//   arrOddNumbers.push(i);
// }
// console.log(arrOddNumbers); // Output: [1, 3, 5, 7, 9]

// // 4. Create an array of numbers and return only the even numbers using filter method.
// let allNumbers = [1, 2, 3, 4, 5];
// let arrEvenNumbers = allNumbers.filter((num) => {
//   return num % 2 === 0;
// });
// console.log(arrEvenNumbers); // Output: [2, 4]

// // 5. Use the spread operator to merge two arrays, then return the merged array.
// let array1 = [1, 2, 3];
// let array2 = [4, 5, 6];
// console.log([...array1, ...array2]); // Output: [1, 2, 3, 4, 5, 6]

// // 6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday).
// let dayNumber = 2;
// switch (dayNumber) {
//   case 1:
//     console.log("Sunday");
//     break;
//   case 2:
//     console.log("Monday");
//     break;
//   case 3:
//     console.log("Tuesday");
//     break;
//   case 4:
//     console.log("Wednesday");
//     break;
//   case 5:
//     console.log("Thursday");
//     break;
//   case 6:
//     console.log("Friday");
//     break;
//   case 7:
//     console.log("Saturday");
//     break;
//   default:
//     console.log("Invalid day number");
// }

// // 7. Create an array of strings and return their lengths using map method
// let stringArray = ["a", "ab", "abc"];
// let lengthsArray = stringArray.map((e) => {
//   return e.length;
// });
// console.log(lengthsArray); // Output: [1, 2, 3]

// // 8. Write a function that checks if a number is divisible by 3 and 5.
// function isDivisibleBy3And5(num) {
//   if (num % 3 === 0 && num % 5 === 0) {
//     return "Divisible by both";
//   } else {
//     return "not Divisible by both";
//   }
// }
// console.log(isDivisibleBy3And5(15)); // Output: "Divisible by both"

// // 9. Write a function using arrow syntax to return the square of a number
// let square = (e) => {
//   return e ** 2;
// };
// console.log(square(5)); // Output: 25

// // 10.Write a function that destructures an object to extract values and returns a formatted string.
// const person = { name: "John", age: 25 };
// function personInfo() {
//   console.log(`${person.name} is ${person.age} years old.`);
// }
// personInfo(); // Output: "John is 25 years old."

// // 11.Write a function that accepts multiple parameters (two or more) and returns their sum.
// function sum(...nums) {
//   return nums.reduce((a, b) => a + b, 0);
// }
// console.log(sum(1, 2, 3, 4, 5)); // Output: 15

// // 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.
// function delayedSuccess() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Success");
//     }, 3000);
//   });
// }
// delayedSuccess(); // output: "Success" (after 3 seconds)

// // 13. Write a function to find the largest number in an array.
// function findLargesNumber(nums) {
//   console.log(Math.max(...nums)); // Output: 9
// }
// findLargesNumber([1, 3, 7, 2, 4]); // Output: 7

// // 14. Write a function that takes an object and returns an array containing only its keys.
// let keysArray = [];
// function getObjectKeys(obj) {
//   for (ele in obj) {
//     keysArray.push(ele);
//   }
//   return keysArray;
// }
// console.log(getObjectKeys({ name: "John", age: 30 })); // Output: ["name", "age"]

// // 15. Write a function that splits a string into an array of words based on spaces.
// function splitStringToWords(str) {
//   console.log(str.split(" "));
// }
// splitStringToWords("The quick brown fox"); // Output: ['The', 'quick', 'brown', 'fox'

// //=====================================================================================

// // ===================================== Part 2 =======================================

// // 1. What is the difference between forEach and for...of? When would you use each?
// // for...of using for searching in arr or object by elements.
// // forEach using for return new arr and modify part of arr.
// // for(;;) using for searching in arr by index.
// // for...in such as for(;;) searching by index.

// //======================================

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

// //======================================

// // 3. What are the main differences between == and ===?
// // compare value only.
// //compare value and type.

// //======================================

// // 4. Explain how try-catch works and why it is important in async operations.
// // try-catch is used to handle errors in synchronous and asynchronous code.
// // The code that may throw an error is placed inside the try block. If an error occurs,
// // the control is transferred to the catch block where the error can be handled correctly.

// //======================================

// // 5. What’s the difference between type conversion and coercion? Provide examples of each.
// // Type conversion is the process of converting a value from one type to another type.
// // Example:
// // let num = "123";
// // let convertedNum = Number(num); // Explicit conversion from string to number
// // console.log(convertedNum); // Output: 123

// // Type coercion is the automatic converting values from one type to another.
// // Example:
// // let coercedNum = "5" - 2; // Implicit conversion from string to number
// // console.log(coercedNum); // Output: 3

// //=====================================================================================

// // ===================================== Part 3 =======================================

// // solution in bonus.js file

// //=====================================================================================
