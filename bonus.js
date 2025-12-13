// ================================= first bonus task =================================
// var createCounter = function (init) {
//   let count = init;
//   return {
//     increment: () => {
//       count += 1;
//       return count;
//     },
//     decrement: () => {
//       count -= 1;
//       return count;
//     },
//     reset: () => {
//       count = init;
//       return count;
//     },
//   };
// };

// const counter = createCounter(5);
// console.log(counter.increment()); // 6
// console.log(counter.reset()); // 5
// console.log(counter.decrement()); // 4
// ====================================================================================

// ================================= Second bonus task =================================

var findKthPositive = function (arr, k) {
  let missingCount = 0;
  let index = 0;
  let currentCount = 1;

  while (true) {
    if (index < [...arr].length && arr[index] == currentCount) {
      index++;
    } else {
      missingCount++;
      if (missingCount === k) return currentCount;
    }
    currentCount++;
  }
};

let x = findKthPositive([1, 2, 3, 11], 5);
console.log(x);

// ====================================================================================
