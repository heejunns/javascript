const makeCounter = function (functionName) {
  // 함수를 인자로 전달 받아 함수를 반환하는 고차 함수, 인자로 전달 받는 함수에 따라서 반환 하는 함수의 동작이 달라진다.
  let counter = 0;
  return () => {
    counter = functionName(counter);
    return counter;
  };
};

const increase = (counter) => {
  return ++counter;
};

const decrease = (counter) => {
  return --counter;
};

const increaser = makeCounter(increase);

console.log(increaser()); // 1

console.log(increaser()); // 2

console.log(increaser()); // 3

const decreaser = makeCounter(decrease);

console.log(decreaser()); // -1

console.log(decreaser()); // -2

console.log(decreaser()); // -3

// makeCounter 함수를 호출했을때 반환되는 클로저 함수는 반환할때 렉시컬 함수를 기억한다. 위의 increaser , decreaser 변수는 각각 makeCounter 함수를 호출해서 클로저 함수를 반환 받았기 때문에 각각의 렉시컬 환경을 기억한다.
// 그래서 counter 값을 공유하지 않는다.

//  그럼 counter 값을 공유하도록 만들어 보자.

const makeCounters = function () {
  let counter = 0;
  return (functionName) => {
    counter = functionName(counter);
    return counter;
  };
};

const cal = makeCounters();

console.log(cal(increase)); // 1
console.log(cal(increase)); // 2
console.log(cal(decrease)); // 1
console.log(cal(increase)); // 2
console.log(cal(decrease)); // 1
console.log(cal(decrease)); // 1

// makeCounter 함수는 호출할때 인자로 반환받는 클로저 함수가 어떤 동작을 할지 전달 받는다. 하지만 makeCounters 함수는 반환 하는 클로저 함수에 인자를 전달해 동작을 하도록 코드를 작성하였다.
// 내가 원하는 동작을 클로저 함수에 인자로 전달해주면 그에 맞는 동작을 하고 counter 값을 반환 받을 수 있다.
