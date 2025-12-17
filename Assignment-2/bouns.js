// var findKthPositive = function (arr, k) {
//   let missingCount = 0;
//   let index = 0;
//   let currentCount = 1;

//   while (true) {
//     if (index < [...arr].length && arr[index] == currentCount) {
//       index++;
//     } else {
//       missingCount++;
//       if (missingCount === k) return currentCount;
//     }
//     currentCount++;
//   }
// };

// const counter = createCounter(5);
// console.log(counter.increment()); // 6
// console.log(counter.reset()); // 5
// console.log(counter.decrement()); // 4
// let x = findKthPositive([1, 2, 3, 11], 5);
// console.log(x);
