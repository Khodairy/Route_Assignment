var romanToInt = function (s) {
  let values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let current = values[s[i]];
    let nextValue = values[s[i + 1]] || 0;
    if (current >= nextValue) {
      result += current;
    } else {
      result -= current;
    }
  }
  console.log(result);
  return result;
};

romanToInt("MCMXCIV");
