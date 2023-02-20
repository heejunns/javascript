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
const dev = flase; // 개발모드 설정 true 이면 개발 모드

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

function plantMine(index) {
  // 지뢰 랜덤으로 심기
  let arr = Array(row * cell)
    .fill()
    .map((element, index) => index);
  arr.splice(index, 1);
  let randomMine = [];
  while (arr.length > row * cell - mine) {
    const randomIndex = arr.splice(Math.floor(Math.random() * arr.length), 1);
    randomMine.push(randomIndex);
  }
  data = [];
  for (let i = 0; i < row; ++i) {
    const rowData = [];
    for (let j = 0; j < cell; ++j) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }
  console.log(data);

  for (let i = 0; i < randomMine.length; ++i) {
    let rows = Math.floor(randomMine[i] / cell);
    let cols = randomMine[i] % cell;
    data[rows][cols] = CODE.MINE;
  }
  // 화면에 지뢰 심기
  const dataFlat = data.flat();
  tdAll.forEach((element, index) => {
    if (dataFlat[index] == CODE.MINE) {
      console.log('코드가 돌긴 도냐?'); // 돈다.
      element.textContent = '*';
    }
  });
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
  let i;
  tdAll.forEach((element, index) => {
    if (element == event.target) {
      i = index;
    }
  });
  return i;
}

// tagFindfIndex 함수의 기능을 제로초님은
// const rowIndex = event.target.paretNode.rowIndex;
// const cellIndex = event.target.cellIndex;
// 코드로 해결 하셨다... 역시 모르면 몸이 고생한다.

function open(rowIndex, colIndex) {
  if (data[rowIndex]?.[colIndex] >= 0) return;
  const target = $tbody.children[rowIndex]?.children[colIndex];
  if (!target) {
    return;
  }
  const countM = countMine(rowIndex, colIndex);
  target.textContent = countM || '';
  // 0 을 표현하고 싶다면 ?? 사용, null, undefined 일때만
  openCount += 1;
  data[rowIndex][colIndex] = countM;
  target.className = 'opened';
  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    $tbody.removeEventListener('click', clickLeftBlock);
    $tbody.removeEventListener('contextmenu', clickRightBlock);
    clearInterval(interval);
    setTimeout(() => {
      alert(`게임 승리! 총 걸린 시간은 ${time} 초 입니다.`);
    }, 0);
  }
  return countM;
}
function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      // 클릭한 칸이 0 이라먄
      openAround(rI, cI - 1);
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
  plantMine(index);
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
  for (let i = 0; i < row; ++i) {
    // tr 태그 생성하고 row 개수만큼 tbody 태그 자식태그로 추가하기
    const row = document.createElement('tr');

    for (let j = 0; j < cell; ++j) {
      // tr 태그에 자식태그로 td 태그 생성 후 cell 의 개수만큼 추가하기
      const cell = document.createElement('td');
      row.appendChild(cell);
    }
    $tbody.appendChild(row);
    $tbody.addEventListener('click', clickLeftBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
    $tbody.addEventListener('contextmenu', clickRightBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
  }
}
let tdAll;
const onSubmit = function (event) {
  event.preventDefault(); // 안하면 페이지 새로고침됨
  // 행 입력받기
  row = Number(event.target.row.value);
  // 열 입력받기
  cell = parseInt(event.target.col.value);
  // 지뢰 개수 입력받기
  mine = Number(event.target.mine.value);
  openCount = 0;
  $tbody.innerHTML = '';
  drawTable();
  // 행,열,지뢰개수 선택 후 화면에 테이블을 그린 후 시간 카운트 시작
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time} 초`;
  }, 1000);
  tdAll = document.querySelectorAll('td');
};

$submit.addEventListener('submit', onSubmit);
