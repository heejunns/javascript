const $tbody = document.querySelector('#table tbody');
const $timer = document.querySelector('#timer');
const $submit = document.querySelector('#submit');
const $result = document.querySelector('#result');
let row; // 줄
let cell; // 칸
let mine; // 지뢰 개수
let openCount;
let startTime = new Date();
const interval = setInterval(() => {
  const time = Math.floor((new Date() - startTime) / 1000);
  $timer.textContent = `${time} 초`;
}, 1000);
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
  // 지뢰 랜덤으로 심기
  let arr = Array(row * cell)
    .fill()
    .map((element, index) => index);

  let randomMine = [];
  while (arr.length > row * cell - mine) {
    const randomIndex = arr.splice(Math.floor(Math.random() * arr.length), 1);
    randomMine.push(randomIndex);
  }
  console.log(randomMine);
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
    let rows = Math.floor(randomMine[i] / 10);
    let cols = randomMine[i] % 10;
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
  let i;
  tdAll.forEach((element, index) => {
    if (element == event.target) {
      i = index;
    }
  });
  return i;
}

// tagFinfIndex 함수의 기능을 제로초님은
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
  console.log(openCount);
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
  event.preventDefault();
  const index = tagFindIndex(event);
  const rowIndex = Math.floor(index / 10);
  const colIndex = index % 10;
  let target = event.target;
  if (data[rowIndex][colIndex] == CODE.NORMAL) {
    data[rowIndex][colIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '?';
  } else if (data[rowIndex][colIndex] === CODE.QUESTION) {
    data[rowIndex][colIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '!';
  } else if (data[rowIndex][colIndex] === CODE.FLAG) {
    data[rowIndex][colIndex] = CODE.NORMAL;
    target.className = '';
    target.textContent = '';
  } else if (data[rowIndex][colIndex] === CODE.MINE) {
    data[rowIndex][colIndex] = CODE.QUESTION_MINE;
    target.className = 'question';
    target.textContent = '?';
  } else if (data[rowIndex][colIndex] === CODE.QUESTION_MINE) {
    data[rowIndex][colIndex] = CODE.FLAG_MINE;
    target.className = 'flag';
    target.textContent = '!';
  } else if (data[rowIndex][colIndex] === CODE.FLAG_MINE) {
    data[rowIndex][colIndex] = CODE.MINE;
    target.className = '';
    target.textContent = '*';
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
        cell.textContent = '*';
      }
      row.appendChild(cell);
    });
    $tbody.appendChild(row);
    $tbody.addEventListener('click', clickLeftBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
    $tbody.addEventListener('contextmenu', clickRightBlock); // tbody 태그에 이벤트 리스너 달기 , 이벤트 버블링 이용하기
  });
}
let tdAll;
const onSubmit = function (event) {
  event.preventDefault();
  // 행 입력받기
  row = Number(event.target.row.value);
  // 열 입력받기
  cell = Number(event.target.col.value);
  // 지뢰 개수 입력받기
  mine = Number(event.target.mine.value);
  openCount = 0;

  drawTable();
  tdAll = document.querySelectorAll('td');
};

$submit.addEventListener('submit', onSubmit);
