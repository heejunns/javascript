// 나머지 매개변수 구문을 사용하고 전달 받은 모든 수를 더해 반환하는 함수 만들기 2

function User(name, age, ...skills){ // 나머지 매개변수는 항상 마지막에 적어 주어야 한다.
    this.name = name;
    this.age = age;
    this.skills = skills;

}

const user1 = new User("son",30,"soccer");
const user2 = new User("tom",37,"baseball","swimming");
const user3 = new User("kane",49,"running");

console.log(user1);
console.log(user2);
console.log(user3);
