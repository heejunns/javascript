const $hint = document.querySelector('#hint'); // id = hint 태그 선택
const $screen = document.querySelector('#screen'); // id = screen 태그 선택
const $input = document.querySelector('input'); // input 태그 선택
const $button = document.querySelector('button'); // button 태그 선택
const $start = document.querySelector('#start'); // id = start 태그 선택
const $counter = document.querySelector('#counter'); // id = counter 태그 선택
let inputWord; // 입력되는 숫자
let strike = 0; // 숫자의 위치와 숫자의 값이 모두 일치하는 개수
let same = 0; // 위치와 상관없이 숫자의 값이 같은 개수
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 1부터 9까지 무작위로 숫자를 뽑을 배열
let answer; // 정답을 저장할 변수
let count = 10; // 도전 횟수 제한 개수
let tries = []; // 입력한 숫자를 저장할 배열
const onClickStart = () => {
  // 처음 게임시작 버튼 또는 게임을 진행하다가 새로운 게임을 시작할려고 할때 버튼
  // 변수들 초기화
  strike = 0;
  same = 0;
  answer = '';
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  count = 10;
  tries = [];
  // 태그 내용들 초기화
  $screen.textContent = '';
  $hint.textContent = '';
  $counter.textContent = count;
  $input.value = '';
  $input.focus();
  for (let i = 0; i <= 3; ++i) {
    // 새로운 정답 만들기
    shuffle(numbers);
    let choice = numbers.pop();
    answer += choice;
  }
};
function shuffle(array) {
  // 배열의 원소들을 랜덤으로 섞는 함수
  array.sort(() => Math.random() - 0.5);
}

const onClickButton = () => {
  console.log(answer);
  if (
    // 입력된 숫자의 길이가 4이고 count의 개수가 0이 아니고 입력된 숫자의 중복되는 숫자가 있는지 확인후 사이즈가 4인지 확인 입력된 숫자가 tries에 포함되어있지 않은지 확인
    inputWord.length === 4 &&
    count &&
    new Set(inputWord).size === 4 &&
    !tries.includes(inputWord)
  ) {
    for (let i = 0; i <= 3; ++i) {
      // 정답 숫자와 입력한 숫자의 같은 위치에 같은 숫자 값이 몇개 있는지 확인
      if (answer[i] === inputWord[i]) {
        strike += 1;
      }
    }
    for (let i = 0; i <= 3; ++i) {
      // 위치와 상관없이 같은 값의 숫자가 몇개 있는지 확인
      for (let l = 0; l <= 3; ++l) {
        if (answer[i] === inputWord[l]) same += 1;
      }
    }
    count -= 1; // 제출 버튼을 클릭 할때마다 -1
    $screen.textContent = inputWord; // 화면에 입력한 숫자 보여주기
    $counter.textContent = count; // 화면에 남은 도전 횟수 보여주기
    tries.push(inputWord); // tries 배열에 입력한 숫자 저장하기
    if (strike === 0 && same === 0) {
      $hint.textContent = 'out';
      $input.value = '';
      $input.focus();
    } else if (strike === 4) {
      $hint.textContent = `strike : ${strike} 개`;
      $input.value = '';
      $input.focus();
      alert('HomeRun!!! 정답 입니다!');
    } else if (strike === 0 && same) {
      $hint.textContent = `ball : ${same} 개`;
      $input.value = '';
      $input.focus();
    } else if (strike && same) {
      $hint.textContent = `strike : ${strike} 개, ball : ${Math.abs(
        strike - same
      )} 개`;
      $input.value = '';
      $input.focus();
    }
    strike = 0;
    same = 0;
  } else if (inputWord.length !== 4) {
    alert('제출 형식이 맞지 않습니다. 숫자4개를 입력해주세요.');
    $input.value = '';
    $input.focus();
  } else if (!count) {
    alert('제출기회가 모두 소진되었습니다. 게임을 다시 시작 해주세요.');
    $input.value = '';
    $input.focus();
  } else if (new Set(inputWord).size !== 4) {
    alert('숫자가 중복되지 않게 입력해주세요.');
    $input.value = '';
    $input.focus();
  } else if (tries.includes(inputWord)) {
    alert('이미 입력한 숫자 입니다.');
    $input.value = '';
    $input.focus();
  }
};
const onInput = (event) => {
  inputWord = event.target.value;
};

$input.addEventListener('input', onInput);
$button.addEventListener('click', onClickButton);
$start.addEventListener('click', onClickStart);
