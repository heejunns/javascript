// 클로저 함수

const increase = (function () {
  let i = 0;

  return () => {
    return ++i;
  };
})();

let result = increase();
let result2 = increase();
let result3 = increase();
let result4 = increase();
console.log(result); // 1
console.log(result2); // 2
console.log(result3); // 3
console.log(result4); // 4
