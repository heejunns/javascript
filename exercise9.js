// filter() 사용해보기
let arr = [1,2,3,4,5];

const result = arr.filter((i) => {
    return i%2 === 0;
});

console.log(result); // 2, 4가 반환된다. true값이 나오더라도 배열의 모든 요소를 끝까지 반복한다.

