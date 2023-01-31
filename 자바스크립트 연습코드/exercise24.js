// 인자로 전달 받기, 함수가 다른 함수를 인자로 전달 받는다.
// 전달받는 함수를 고차 함수, 전달되는 함수를 콜백 함수라고 한다.

let arr = [1,2,3,4,5,6,7,8,9]

function doIn (array, func){
    for (i of array){
        func(i);
    }
}

doIn(arr,console.log); // console이라는 객체에 포함하는 log라는 키에 할당된 함수를 전달
