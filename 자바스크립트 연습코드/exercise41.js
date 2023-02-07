// 프로토타입 객체에 메소드 정의하기

// const User = function (name) {
//   this.name = name;

//   this.setName = function () {
//     this.name = name;
//   };

//   this.getName = function () {
//     return this.name;
//   };
// };

// const user = new User('kane');
// const user1 = new User('son');
// const user2 = new User('ronny');

// console.log(user);
// console.log(user1);
// console.log(user2);

// 위와 같이 생성자 함수를 만들어 객체를 생성하게 되면 각각의 객체를 만들때마다 똑같은 메서드를 만드는것은 메모리 낭비이다.

// 이 방법을 해결하기 위해 생성자 함수가 가리키고 있는 프로토타입 객체에 메소드를 정의하는 것이다.

// 프로토타입 객체에 setName, getName 메서드를 정의해 생성자 함수로 생성한 객체로 프로토타입 객체에 정의한 메소드를 참조할수 있다.

const User = function (name) {
  this.name = name;
};

User.prototype.setName = function (name) {
  this.name = name;
};

User.prototype.getName = function () {
  return this.name;
};

const user = new User('kane');
const user1 = new User('son');
const user2 = new User('ronny');

console.log(User.prototype);
console.log(user);
console.log(user1);
console.log(user2);

// { setName: [Function (anonymous)], getName: [Function (anonymous)] }
// User { name: 'kane' }
// User { name: 'son' }
// User { name: 'ronny' }
