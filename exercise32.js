// 값으로서 함수와 콜백

// 함수(메소드)를 반환하기
function calculation(func){
    var funcs = {
        "plus" : function (a,b){
            return a+b;
        },
        "minus" : function (a,b) {
            return a-b;
        },

    }
    return funcs[func];
}

console.log(calculation("plus")(3,6));
console.log(calculation("minus")(3,6));

// 함수를 배열에 저장해 사용하기 

let mode = [
    function(input) {
        return input + 100;
    },
    function(input) {
        return input*100;
    }, 
    function(input) {
        return input/100;
    },

];

for (let i=0; i<mode.length; ++i) {
    console.log(mode[i](100));
}