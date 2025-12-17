function majorityElement(nums) {
  let n = [...nums].length;
  let set = new Set([...nums]);
  let arrSet = [...set];

  for (i = 0; i < arrSet.length; i++) {
    const count = nums.filter((x) => x === arrSet[i]).length;
    if (count > Math.floor(n / 2)) {
      return arrSet[i];
    }
  }
}

console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
