// 생성자 함수 만들어보기, 같은 프로퍼티를 가지는 객체를 필요할때마다 매번 객체 리터럴 방식과 Object 생성자 함수 생석 방식으로 사용하는것은 매우 비효율적이다.

// 객체 리터럴 방식으로 객체 만들기 
let user1 = {
    name :  "mike",
    age : 30,
    hobby : function (){
        console.log("저의 취미는 축구 입니다.");
    }
}

user1.car = "hyudai";
console.log(user1);

console.log(user1.name);
console.log(user1.age);
console.log(user1.hobby); // key 프로퍼티에 있는 value 프로퍼티인 메소드가 실행되지 않는다. 

user1.hobby(); // hobby의 value 메소드 실행

//////////////////

// Object 생성자 함수 이용해서 객체 생성하기 

let user2 = new Object();

user2.name = "son";
user2.age = 123;
user2.hobby = function (){
    console.log("저의 취미는 야구 입니다.");
}

console.log(user2);


// 생성자 함수 만들기 

function UserMade(user, age, hobby){
    this.user = user;
    this.age = age;
    this.hobby = hobby;
}

let user3 = new UserMade("kane", 659,function(){
    console.log("저의 취미는 골프 입니다.");
})

console.log(typeof user3);
console.log(user3);
user3.hobby();
