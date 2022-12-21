// map() 사용해보기

let userList = [
    {name : "mike", age : 23},
    {name: "son", age : 32},
    {name: "tom", age : 53},
]

const result = userList.map((user) => {
    if (user.age > 30){
        return true;
    }
    return false;
})

console.log(result);

const result3 = userList.map((user,index) => {
    return Object.assign({},user,{adult : user.age >30,});
});

console.log(result3);
console.log(userList);
