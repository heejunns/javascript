// reduce() 사용해보기 2

let userList = [
    {name: "son", age:30},
    {name: "tom", age:35},
    {name: "kevin", age:23},
];

let result = userList.reduce((m,now)=> { // 나이가 30이 넘는 사람만 구분하는 로직
    if (now.age >= 30){
        m.push(now.name);
    }
    return m;
},[])

console.log(result);

let result10 = userList.reduce((m,now)=> { // 나이가 30이 넘는 사람의 나이를 모두 더하는 로직
    if (now.age>=30){
        m+=now.age;
    } 
    return m;
    
},0);

console.log(result10);

