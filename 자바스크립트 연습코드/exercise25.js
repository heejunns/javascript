// 익명함수를 사용하기, 익명함수란 변수나 상수에 할당되지 않아 이름이 없는 함수를 말한다. 

function doing(func, repeat, a,b){ // 익명함수를 받아 값을 반복해서 연산하기

    let total = a;

    for (let i=0; i<repeat; i++){
        total = func(total,b);
    }

    return total;

}

console.log(doing((a,b)=> a+b,3,3,6)); // 값을 더하는 익명함수를 인자로 넣기 
console.log(doing((a,b)=>a/b,3,3,6)); // 값을 나누는 익명함수를 인자로 넣기
