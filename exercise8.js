// find, findIndex 사용해보기
let arr = [1,2,3,4,5];

const result = arr.find((i) => {
    return i%2 === 0;
});

console.log(result); // 2가 반환된다. 이렇게 arr 안에 요소들을 2로 나눈 나머지가 2 말고 4도 있지만 첫번째 true 값만 반환하고 종료된다.

let userList = [
    {name : "mike", age : 23},
    {name: "son", age : 32},
    {name: "tom", age : 53},
]

const result2 = userList.findIndex((user)=> {
    if (user.age > 10){
        return true;
    }
    return false;

})

console.log(result2)