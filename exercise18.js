// 객체 구조 분해

let user4 = { name: "son", age:38,};

let {name, age} = user4;
// let {age, name} = user4; 순서를 바꿔도 상관없다.
// let name = user4.name; 과 위의 코드는 같다.
console.log(name);
console.log(age);

let {name:hello, age: hi} = user4; // 변수의 이름을 바꿀수도 있다.


console.log(hello);
console.log(hi);

// 객체 구조 분해 : 기본값 

let user5 = {name1: 'son', age1:30,};

let {name1,age1,gender=3} = user5;
// gender는 undefined가 저장된다.
// 배열처럼 초기값을 지정해줄수 있다.

console.log(name1);
console.log(age1);
console.log(gender);

// 기본값은 값이 undefined일때만 사용된다.

