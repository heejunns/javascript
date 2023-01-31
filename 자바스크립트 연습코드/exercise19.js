// 매개변수, 자바스크립트에서 함수에 전달하는 매개변수의 개수는 제한이 없다. 아무것도 전달하지 않아도 에러는 발생하지 않는다.

// arguments 사용 
function showName(name){ 
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
}

showName("son","tom");

// 나머지 매개변수 구문 사용, 정해지지 않은 개수의 인수를 배열로 나타낼수 있게 한다. 입력된 인수를 배열로 반환한다.


function showName1(...names){
    console.log(names);
}

showName1();
showName1("son");
showName1("tom","kane");


