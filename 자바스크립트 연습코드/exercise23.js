// 배열에 객체 넣기
let arthmetics = [
    (a,b) => a+b,
    (a,b) => a-b,
    (a,b) => a/b,
    (a,b) => a%b,
]; 

for (i of arthmetics) {
    console.log(i(3,6));
}

