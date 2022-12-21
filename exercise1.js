// 배열안에 각각의 요소들의 slice()를 통해서 특정 문자열만 출력하기.


let list  = [
    "01. 들어가며",
    "02. JS의 역사",
    "03. 자료형",
    "04. 함수",
    "05. 배열",
]; 
let x = [];
for (let i=0; i<list.length; ++i){
    console.log(list[i].slice(4)); 
    x.push(list[i].slice(4));
}
console.log(x); 