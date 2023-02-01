// let arr = ['seoel','busan','ulsan','london',"paris",'tokyo'];

// function randomcity(arr){s
//     let result =  Math.floor((Math.random()*arr.length));
//     return arr[result]

// }

// for(let i=0; i<5; ++i) {
//     console.log(randomcity(arr))
// }

// 표준내장객체 Array에 prototype을 이용해서 random 함수 기능 추가

Array.prototype.randomcity = function (){
    let result = Math.floor(Math.random()*this.length);
    return this[result];
}

let arr = new Array('seoel','busan','ulsan','london',"paris",'tokyo');

console.log(arr.randomcity());