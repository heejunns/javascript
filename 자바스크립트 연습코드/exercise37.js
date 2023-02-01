// 같은 렉시컬 환경을 공유하는 클로저 함수 만들기

function makeCounter() {
  var counter = 0;
  return function (funcName) {
    counter = funcName(counter);
    return counter;
  };
}
function increase(n) {
  // 값 증가 함수
  return ++n;
}
function decrease(n) {
  // 값 감소 함수
  return --n;
}

const hello = makeCounter();
console.log(hello(increase)); // 1
console.log(hello(increase)); // 2
console.log(hello(decrease)); // 1
