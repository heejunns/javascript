// 배열 구조 분해 
let [a,b,c] = [1,2,3];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// 배열 구조 분해 2
let names = ['son','kane','tom','mike','davis','kevin'];
let [name1, name2, name3, name4, name5, name6] = names;
// let name1 = names[0]; 과 같다.


console.log(name1);
console.log(name2);
console.log(name3);
console.log(name4);
console.log(name5);
console.log(name6);

// 배열 구조 분해 3

let str = "hello*world*!!!";

let [user1, user2, user3] = str.split("*");

console.log(user1);
console.log(user2);
console.log(user3);



