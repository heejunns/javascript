const $tbody = document.querySelector('#table tbody');
const $timer = document.querySelector('#timer');
const $submit = document.querySelector('#submit');
const $result = document.querySelector('#result');
let row; // 줄
let cell; // 칸
let mine; // 지뢰 개수
let openCount;
let startTime;
let interval;
const dev = false; // 개발모드 설정 true 이면 개발 모드

const CODE = {
  NORMAL: -1, // 닫힌 칸 (지뢰 없음)
  QUESTION: -2, // 물음표 칸 (지뢰 없음)
  FLAG: -3, // 깃발 칸(지뢰 없음)
  QUESTION_MINE: -4, // 물음표 칸 (지뢰 있음)
  FLAG_MINE: -5, // 깃발 칸 (지뢰 있음)
  MINE: -6, // 닫힌 칸 (지뢰 있음)
  OPENED: 0, // 0 이상이면 모두 열린 칸
};

let data;

function plantMine() {
  // 지뢰 랜덤으로 심기, 칸의 정보가 담긴 data 배열 생성하기
  let arr = Array(row * cell)
    .fill()
    .map((element, index) => index);

  let randomMine = []; // 랜덤으로 0~99 까지의 숫자중 mine 개수 만큼 꺼내서 저장
  while (arr.length > row * cell - mine) {
    const randomIndex = arr.splice(Math.floor(Math.random() * arr.length), 1);
    randomMine.push(randomIndex);
  }
  data = [];

  for (let i = 0; i < row; ++i) {
    // data 배열 생성
    const rowData = [];
    for (let j = 0; j < cell; ++j) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }

  for (let i = 0; i < randomMine.length; ++i) {
    // data 배열에 지뢰 정보 저장
    let rows = Math.floor(randomMine[i] / cell);
    let cols = randomMine[i] % cell;
    data[rows][cols] = CODE.MINE;
  }
}
function countMine(rowIndex, colIndex) {
  const mineGroup = [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE]; // 지뢰가 있는 칸에 물음표나 깃발이 있어도 개수는 세어야 하니까 각 칸의 data 캆이 mineGroup 안에 있다면 지뢰 개수 +1
  let count = 0;
  // 지뢰의 개수를 세는 것은 클릭한 칸의 앞뒤, 위아래, 대각선에 있는 지뢰의 개수를 세는 것이다.
  // 어떻게 셀 것인가? 그리고 칸에서 잘리는 쪽은 어떻게 짤린것을 구분할 것인가?
  // data 변수로 MINE 인지 확인해야함 경우의 수는 (rowIndex, colIndex-1),  (rowIndex, colIndex+1),  (rowIndex-1, colIndex),  (rowIndex+1, colIndex),
  // (rowIndex-1, colIndex-1),(rowIndex+1, colIndex+1),  (rowIndex-1, colIndex+1),  (rowIndex+1, colIndex-1) 총 8가지 경우다.
  // 논리 연산자를 사용해 아래와 같이 if 문을 생략 할 수 있습니다.
  // 2 3 4
  // 1 클릭 6
  // 9 8 7
  mineGroup.includes(data[rowIndex][colIndex - 1]) && ++count; // 1
  mineGroup.includes(data[rowIndex - 1]?.[colIndex - 1]) && ++count; // 2
  mineGroup.includes(data[rowIndex - 1]?.[colIndex]) && ++count; // 3
  mineGroup.includes(data[rowIndex - 1]?.[colIndex + 1]) && ++count; // 4
  mineGroup.includes(data[rowIndex][colIndex + 1]) && ++count; // 5
  mineGroup.includes(data[rowIndex + 1]?.[colIndex + 1]) && ++count; // 6
  mineGroup.includes(data[rowIndex + 1]?.[colIndex]) && ++count; // 7
  mineGroup.includes(data[rowIndex + 1]?.[colIndex - 1]) && ++count; // 8

  return count;
}

function tagFindIndex(event) {
  // 클릭한 블럭의 위치 인덱스를 찾아주는 함수, 데이터도 바꿔줘야 하기때문에 인덱스를 찾아야함
  let i; // 인덱스 저장할 변수 선언
  tdAll.forEach((element, index) => {
    if (element == event.target) {
      // 모든 td 태그에서 이벤트가 발생한 td 태그와 같은 태그가 있다면
      i = index; // 그 태그의 인덱스를 저장
    }
  });
  return i;
}

// tagFinfIndex 함수의 기능을 제로초님은
// const rowIndex = event.target.paretNode.rowIndex;
// const cellIndex = event.target.cellIndex;
// 코드로 해결 하셨다... 역시 모르면 몸이 고생한다.

function open(rowIndex, colIndex) {
  // 칸을 여는 함수
  if (data[rowIndex]?.[colIndex] >= 0) return; // 이미 연 곳을 또 다시 열면 수 많은 연산을 해야 한다. 그것을 방지하기 위해 이미 칸을 연 곳은 함수를 다시 열지 않고 종료
  const target = $tbody.children[rowIndex]?.children[colIndex];
  if (!target) {
    // 범위를 벗어나서 undefined 가 나온다면 함수 종료
    return;
  }
  const countM = countMine(rowIndex, colIndex); // 현재 오픈을 진행하고 있는 칸의 주변 8 칸 중에 지뢰의 개수 세는 함수 호출
  target.textContent = countM || ''; // 지뢰의 개수가 0 이라면
  // 0 을 표현하고 싶다면 ?? 사용, null, undefined 일때만
  openCount += 1; // 오픈한 칸의 개수 +1
  data[rowIndex][colIndex] = countM; // 오픈한 지뢰의 개수 data 배열에 기록
  target.className = 'opened'; // 오픈한 칸의 클래스 opened 로 변경
  if (openCount === row * cell - mine) {
    // 오픈한 칸의 개수와 총 칸에서 지뢰 칸의 개수를 뺀 개수가 같다면
    const time = (new Date() - startTime) / 1000; // 모든 칸을 오픈할때까지의 소요 시간 계산하기
    $tbody.removeEventListener('click', clickLeftBlock);
    $tbody.removeEventListener('contextmenu', clickRightBlock);
    clearInterval(interval); // 시간 화면에서 멈추기
    setTimeout(() => {
      alert(`게임 승리! 총 걸린 시간은 ${time} 초 입니다.`);
    }, 0);
  }
  return countM;
}
function openAround(rI, cI) {
  // 클릭한 칸을 열었을때 주변에 지뢰가 없어서 0 이면 주변 8칸도 모두 열기 위한 함수
  setTimeout(() => {
    // 한번에 너무 많은 연산을 막기 위해서 비동기 함수인 setTimeout 메서드 사용
    const count = open(rI, cI); // open 함수 호출
    if (count === 0) {
      // 클릭한 칸이 0 이라면
      openAround(rI, cI - 1); // openAround 함수에 인자로 넘어온 r1,c1 값의 주변 8 칸을 모두 재귀 함수로 찾기
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI + 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI - 1);
    }
  }, 0);
}
const clickLeftBlock = function (event) {
  // 블럭을 클릭하면 발생하는 함수
  const index = tagFindIndex(event);
  console.log(index);
  const rowIndex = Math.floor(index / 10);
  const colIndex = index % 10;
  const questionAndFlag = [
    CODE.FLAG,
    CODE.FLAG_MINE,
    CODE.QUESTION,
    CODE.QUESTION_MINE,
  ];
  if (questionAndFlag.includes(data[rowIndex][colIndex])) {
    // 칸에 물음표나 깃발이 그려져 있다면 종료
    return;
  } else if (data[rowIndex][colIndex] == CODE.NORMAL) {
    // 칸이 아무것도 없는 닫힌 칸이라면
    openAround(rowIndex, colIndex);
  } else if (data[rowIndex][colIndex] == CODE.MINE) {
    // 지뢰일때
    event.target.className = 'opened';
    $tbody.removeEventListener('click', clickLeftBlock);
    $tbody.removeEventListener('contextmenu', clickRightBlock);
    alert('지뢰!!');
    clearInterval(interval);
  }
};

const clickRightBlock = function (event) {
  // 오른쪽 클릭 이벤트
  event.preventDefault(); // 브라우저 메뉴를 띄우는 것을 막기 위해 preventDefalult 메서드 호출
  const index = tagFindIndex(event);
  const rowIndex = Math.floor(index / 10);
  const colIndex = index % 10;
  let target = event.target;
  if (data[rowIndex][colIndex] == CODE.NORMAL) {
    // 클릭한 칸의 데이터가 지뢰 없고 닫힌 칸이면
    data[rowIndex][colIndex] = CODE.QUESTION; // 지뢰없는 물음표 칸으로 데이터 변경
    target.className = 'question'; // 칸의 색을 변경해줘야하기 떄문에 클래스 변경
    target.textContent = '?'; // 화면에서도 칸의 내용을 물음표로 변경
  } else if (data[rowIndex][colIndex] === CODE.QUESTION) {
    // 클릭한 칸의 데이터가 지뢰없고 물음표 칸이면
    data[rowIndex][colIndex] = CODE.FLAG; // 데이터를 지뢰없는 깃발 칸으로 데이터 변경
    target.className = 'flag'; // 칸의 색을 변경해줘야하기 때문에 클래스 변경
    target.textContent = '!'; // 화면에서도 칸의 내용을 깃발로 변경
  } else if (data[rowIndex][colIndex] === CODE.FLAG) {
    // 클릭한 칸의 데이터가 지뢰없고 깃발 칸이면
    data[rowIndex][colIndex] = CODE.NORMAL; // 데이터를 지뢰없고 닫힌 칸으로 데이터 변경
    target.className = ''; // 칸의 색을 변경해줘야하기 떄문에 클래스 변경, 닫힌 칸으로 색을 변경하기 위해 클래스 지우기
    target.textContent = ''; // 화면에서도 칸의 내용을 지뢰없는 닫힌 칸으로 변경
  } else if (data[rowIndex][colIndex] === CODE.MINE) {
    // 클릭한 칸의 데이터가 지뢰 있는 닫힌 칸이면
    data[rowIndex][colIndex] = CODE.QUESTION_MINE; // 지뢰 있는 물음표 칸으로 데이터 변경
    target.className = 'question'; // 칸의 색을 변경해줘야하기 때문에 클래스 변경
    target.textContent = '?'; // 화면에서도 칸의 내용을 물음표로 변경
  } else if (data[rowIndex][colIndex] === CODE.QUESTION_MINE) {
    // 클릭한 칸의 데이터가 지뢰 있고 물음표 칸이면
    data[rowIndex][colIndex] = CODE.FLAG_MINE; // 데이터를 지뢰 있는 깃발 칸으로 변경
    target.className = 'flag'; // 칸의 색을 변경해줘야하기 때문에 클래스 변경
    target.textContent = '!'; // 화면에서도 칸의 내용을 깃발로 변경
  } else if (data[rowIndex][colIndex] === CODE.FLAG_MINE) {
    // 클릭한 칸의 데이터가 지뢰 있고 깃발 칸이면
    data[rowIndex][colIndex] = CODE.MINE; // 지뢰 있는 닫힌 칸으로 변경
    target.className = ''; // 칸의 색을 변경해줘야하기 떄문에 클래스 변경, 닫힌 칸으로 색을 변경하기 위해 클래스 지우기
    target.textContent = dev ? '*' : ''; // 화면에서도 칸의 내용을 지뢰 있는 닫힌 칸으로 변경
  }
};

function drawTable() {
  plantMine();

  data.forEach((rowElement) => {
    // tr 태그 생성하고 row 개수만큼 tbody 태그 자식태그로 추가하기
    const row = document.createElement('tr');
    rowElement.forEach((colElement) => {
      // tr 태그에 자식태그로 td 태그 생성 후 cell 의 개수만큼 추가하기
      const cell = document.createElement('td');
      if (colElement === CODE.MINE) {
        cell.textContent = dev ? '*' : '';
      }
      row.appendChild(cell);
    });
    $tbody.appendChild(row);
    $tbody.addEventListener('click', clickLeftBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
    $tbody.addEventListener('contextmenu', clickRightBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
  });
}
let tdAll; // 모든 td 태그를 선택해 저장할 변수
const onSubmit = function (event) {
  // 게임 생성 버튼을 클릭하면 호출되는 콜백 함수
  event.preventDefault(); // 안하면 페이지 새로고침됨
  // 행 입력받기
  row = Number(event.target.row.value);
  // 열 입력받기
  cell = parseInt(event.target.col.value);
  // 지뢰 개수 입력받기
  mine = Number(event.target.mine.value);
  openCount = 0; // 오픈한 칸을 기록하는 변수의 값 초기화
  $tbody.innerHTML = ''; // tbody 의 자식 태그 모두 제거
  drawTable();
  // 행,열,지뢰개수 선택 후 화면에 테이블을 그린 후 시간 카운트 시작
  startTime = new Date(); // 시작 시간 기록
  interval = setInterval(() => {
    // 화면에 1초 간격으로 시간이 흐르고 있는 것을 보여주기
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time} 초`;
  }, 1000);
  tdAll = document.querySelectorAll('td'); // 모든 td 태그 선택
};

$submit.addEventListener('submit', onSubmit);
