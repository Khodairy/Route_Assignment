function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) {
    return "";
  }
  let result = "";
  for (let i = 0; i < strs[0].length; i++) {
    let currentChar = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (currentChar !== strs[j][i]) {
        return result;
      }
    }
    result += currentChar;
  }
  return result;
}

console.log(longestCommonPrefix([""])); // "fl"
