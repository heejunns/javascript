// reduce() 사용해보기, 인수를 함수로 받는다. (누적 계산값, 현재값) => { return 계산값}; 이런식으로 함수를 만들어 인수로 넣어준다.

let arr = [1,2,3,4,5,6,7,8,9];

const result8 = arr.reduce((m,now) => {
    return m+now;
},0)

console.log(result8);