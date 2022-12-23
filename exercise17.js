// 배열 구조 분해
let [x,y,z] = [1,2];
// z에는 undefined가 들어간다.
console.log(x);
console.log(y);
console.log(z);

// 이때 초기값을 지정해주면 값이 할당되지 않아도 초기값을 가진다.

let [x1=3,y1=3,z1=3] = [1,2];

console.log(x1); // 값 1로 변경  
console.log(y1); // 값 6으로 변경
console.log(z1); // 3 출력

// 배열 구조 분해 : 일부 반환값 무시

let [n, , m] = ["hello","world","hi","soccer"];

// 두번째, 세번째 요소는 할당받을 곳이 없기 때문에 무시된다.

console.log(n); // hello
console.log(m); //  hi

// 다른 언어에서는 두 변수에 할당된 값을 서로 바꿔치기 하기 위해서는 
// let x2 = 3;
// let y2 = 6;
// let c2 = 0;

// let c2 = x2;
// let x2 = y2;
// let y2 = c;
// 위의 방법으로 하나의 변수에 할당된 값을 다른 변수에 옮겨 두어 값을 바꿔치는 방식을 해야했다.
// 하지만 자바스크립트에서는

let x2 = 3;
let y2 = 6;

[x2, y2] = [y2, x2];

// 위의 방식으로 값을 바꿔치기 할수있다.

console.log(x2);
console.log(y2);





