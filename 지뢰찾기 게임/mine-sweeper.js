const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const row = 10; // 줄
const cell = 10; // 칸
const mine = 10; // 지뢰 개수

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
  let count = 0;
  // 지뢰의 개수를 세는 것은 클릭한 칸의 앞뒤, 위아래, 대각선에 있는 지뢰의 개수를 세는 것이다.
  // 어떻게 셀 것인가? 그리고 칸에서 잘리는 쪽은 어떻게 짤린것을 구분할 것인가?
  // data 변수로 MINE 인지 확인해야함 경우의 수는 (rowIndex, colIndex-1),  (rowIndex, colIndex+1),  (rowIndex-1, colIndex),  (rowIndex+1, colIndex),
  // (rowIndex-1, colIndex-1),(rowIndex+1, colIndex+1),  (rowIndex-1, colIndex+1),  (rowIndex+1, colIndex-1) 총 8가지 경우다.
  //   if (
  //     data[rowIndex][colIndex - 1] !== undefined &&
  //     data[rowIndex][colIndex - 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex]?.[colIndex + 1] !== undefined &&
  //     data[rowIndex][colIndex + 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   console.log(data[rowIndex - 1][colIndex]);
  //   if (
  //     data[rowIndex - 1]?.[colIndex] !== undefined &&
  //     data[rowIndex - 1][colIndex] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex + 1]?.[colIndex] !== undefined &&
  //     data[rowIndex + 1][colIndex] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex - 1]?.[colIndex - 1] !== undefined &&
  //     data[rowIndex - 1][colIndex - 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex + 1]?.[colIndex + 1] !== undefined &&
  //     data[rowIndex + 1][colIndex + 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex - 1]?.[colIndex + 1] !== undefined &&
  //     data[rowIndex - 1][colIndex + 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  //   if (
  //     data[rowIndex + 1]?.[colIndex - 1] !== undefined &&
  //     data[rowIndex + 1][colIndex - 1] === CODE.MINE
  //   ) {
  //     count += 1;
  //   }
  // 위의 코드는 내가 작성한 코드다. if 문을 사용하지 않고 코드를 다시 작성해봤다.
  data[rowIndex][colIndex - 1] !== undefined &&
    data[rowIndex][colIndex - 1] === CODE.MINE &&
    ++count;
  data[rowIndex]?.[colIndex + 1] !== undefined &&
    data[rowIndex][colIndex + 1] === CODE.MINE &&
    ++count;
  data[rowIndex - 1]?.[colIndex] !== undefined &&
    data[rowIndex - 1][colIndex] === CODE.MINE &&
    ++count;
  data[rowIndex + 1]?.[colIndex] !== undefined &&
    data[rowIndex + 1][colIndex] === CODE.MINE &&
    ++count;
  data[rowIndex - 1]?.[colIndex - 1] !== undefined &&
    data[rowIndex - 1][colIndex - 1] === CODE.MINE &&
    ++count;
  data[rowIndex + 1]?.[colIndex + 1] !== undefined &&
    data[rowIndex + 1][colIndex + 1] === CODE.MINE &&
    ++count;
  data[rowIndex - 1]?.[colIndex + 1] !== undefined &&
    data[rowIndex - 1][colIndex + 1] === CODE.MINE &&
    ++count;
  data[rowIndex + 1]?.[colIndex - 1] !== undefined &&
    data[rowIndex + 1][colIndex - 1] === CODE.MINE &&
    ++count;

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

// 위의 함수의 기능을 제로초님은
// const rowIndex = event.target.paretNode.rowIndex;
// const cellIndex = event.target.cellIndex;
// 코드로 해결 하셨다... 역시 모르면 몸이 고생한다.
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
    const countM = countMine(rowIndex, colIndex);
    event.target.textContent = countM;
    data[rowIndex][colIndex] = CODE.OPENED;
    event.target.className = 'opened';
  } else if (data[rowIndex][colIndex] == CODE.MINE) {
    // 지뢰일때
    alert('지뢰!!');
  } else if (data[rowIndex][colIndex] == CODE.OPENED) {
    // 이미 열린 칸
    alert('다시 클릭하지마렴');
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

drawTable();

const tdAll = document.querySelectorAll('td');
console.log(tdAll);
