// splice() 사용하기
let arr = [1,2,3,4,5,6,7,8,9];

let result = arr.splice(1,0,"hello");
console.log(arr);

let result2 = arr.splice(3,3);

console.log(arr);
console.log(result);
console.log(result2)