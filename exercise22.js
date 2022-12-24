// 전개 구문 : 배열

let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [7,8,9];

let bigArr = [1,2,3,...arr1,...arr2,31.23,42,...arr3];

console.log(bigArr);

// 전개 구문 : 객체

let  user = {name:"son",hobby:"soccer",};
let son = {...user, age :30,};

console.log(son);

// 전개 구문 : 복제 

let user2 = {name:"tom", age: 56,};
let user3 = {...user2};

// user3의 name을 바꿔도 user2 name은 바뀌지 않는다. 
user3.name = "kane";

console.log(user2);
console.log(user3);

