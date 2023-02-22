const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $restart = document.getElementById('restart');
const $back = document.getElementById('back');

let data = []; // 데이터 배열
let rememberData = []; // 데이터를 기록하는 배열
let rememberScore = []; // score 값을 기록하는 배열
let totalScore = 0; // score 값을 저장하는 변수

function gameStart() {
  // 게임을 시작하는 함수
  // 게임이 시작되면 화면에 4*4 크기의 테이블을 그립니다.
  // fragment 를 사용하면 딱 한번만 그려도 되서 성능이 매우 좋아진다. table 에 그릴거를 fragment 에 모두 그리고 한번에 table에 fragment 를 그리고 fragment 는 사라지기 때문 입니다.
  //  fragment 는 화면에 그리지는 않고 메모리에만 저장 됩니다.
  // table > fragment > tr > td 태그로 구성된다.
  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < 4; ++i) {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    for (let j = 0; j < 4; ++j) {
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.appendChild($td);
    }
    $fragment.appendChild($tr);
  }
  $table.appendChild($fragment);

  randomCreateTwo();
  randomCreateTwo();
  draw();
}
function clickRestart() {
  // 새로운 게임 다시 시작하기 버튼을 클릭하면 호출되는 콜백 함수
  $table.innerHTML = ''; // table 태그 자식 태그 모두 지우기
  data = []; // data 배열 초기화
  totalScore = 0; // totalScore 지우기
  rememberData = []; // rememberData 배열 초기화
  rememberScore = []; // rememberScore 배열 초기화
  gameStart(); // 게임 다시 시작
  window.addEventListener('keyup', checkKey); // 방향키 이벤트 켜기
}

$restart.addEventListener('click', clickRestart);
function clickBack() {
  // 되돌리기 버튼을 클릭하면 호출되는 콜백 함수
  if (rememberData.length > 0 || rememberScore.length > 0) {
    data = rememberData.pop(); // rememberData 배열에서 하나 꺼내 data 에 저장
    totalScore = rememberScore.pop(); // rememberScore 배열에서 하나 꺼내 totalScore 에 저장
    draw(); // 화면 업데이트
  } else {
    alert('모두 되돌려서 되돌리기를 할 수 없습니다. 게임을 진행 해 주세요.');
  }
}

$back.addEventListener('click', clickBack);

function randomCreateTwo() {
  // 빈칸에 랜덤으로 2를 생성하는 함수
  const emptyCells = []; // 빈칸의 위치 정보를 기록하느 배열
  // data.forEach((rowElement, i) => {
  //   rowElement.forEach((cellElement, j) => {
  //     if (cellElement === 0) {
  //       emptyCells.push([i, j]);
  //     }
  //   });
  // });
  data.flat().forEach((element, index) => {
    if (element === 0) {
      emptyCells.push(index);
    }
  });
  if (emptyCells.length == 0) {
    // 빈칸의 위치 정보를 가지고 있는 emptyCells 배열의 길이가 0 이라면 2 를 화면에 생성할수 없다는 뜻이니까 게임 종료
    alert('게임종료');
    window.removeEventListener('keyup', checkKey); // 아무키도 못누르게 하기
    return;
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // emptyCells 배열에서 랜덤으로 빈칸 위치 꺼내기
  // data[randomCell[0]][randomCell[1]] = 2;
  data[Math.floor(randomCell / 4)][randomCell % 4] = 2; // data 에 빈칸 위치였던 곳에 2 생성
  window.addEventListener('keyup', checkKey); // 방향키 이벤트 달기
}

function draw() {
  // 데이터의 정보를 화면에 그리는 함수
  data.forEach((rowElement, rowIndex) => {
    rowElement.forEach((cellElement, cellIndex) => {
      const $targetBlock = $table.children[rowIndex].children[cellIndex];
      if (cellElement > 0) {
        $targetBlock.textContent = cellElement; // data 의 요소들을 화면에 그리기
        $targetBlock.className = 'color-' + cellElement; // class 변경
      } else {
        // data 의 요소가 0 이라면 빈칸이니까
        $targetBlock.textContent = '';
        $targetBlock.className = '';
      }
      $score.textContent = totalScore; // 현재 스코어 업데이트
    });
  });
}
33;

gameStart();
// 게임 테스트 data
// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();

function upAndLeftSort(newData) {
  // 위,왼쪽 키 이벤트 발생했을때 호출하는 함수

  if (newData.length === 4) {
    // newData 배열의 길이가 4 라면
    if (newData[0] === newData[1]) {
      // 0,1 인덱스 자리의 값이 같다면
      newData[0] = newData[0] * 2; // 둘 중 하나의 값의 2를 곱한 값을 0번 인덱스에 저장
      totalScore += newData[0];
      if (newData[2] === newData[3]) {
        // 2,3 인덱스 자리의 값이 같다면
        newData[1] = newData[2] * 2; // 둘 중 하나의 값의 2를 곱한 값을 1번 인덱스에 저장
        newData[2] = 0; // 2,3 번 인덱스 자리는 비어있기 때문에 0 을 저장
        newData[3] = 0;
        totalScore += newData[1];
      } else {
        // 2,3 인덱스 자리의 값이 다르다면 값을 한칸씩 왼쪽으로 이동
        newData[1] = newData[2];
        newData[2] = newData[3];
        newData[3] = 0;
      }
    } else if (newData[1] === newData[2]) {
      // 1,2 번 인덱스 자리가 같다면
      newData[1] = newData[1] * 2; // 둘 중 하나의 값의 2를 곱한 값을 1번 인덱스에 저장
      newData[2] = newData[3]; // 2번 인덱스 자리에 3번 인덱스 자리의 값을 이동
      newData[3] = 0; // 3번 인덱스 자리에는 빈자리이기 때문에 0 을 저장
      totalScore += newData[1];
    } else if (newData[2] === newData[3]) {
      newData[2] = newData[2] * 2; // 둘 중 하나의 값의 2를 곱한 값을 2번 인덱스에 저장
      newData[3] = 0; // 3번 인덱스 자리에는 빈자리이기 때문에 0 을 저장
      totalScore += newData[2];
    }
  } else if (newData.length === 3) {
    // newData 배열의 길이가 3 이라면
    if (newData[0] === newData[1]) {
      // 0,1 인덱스 자리의 값이 같다면
      newData[0] = newData[0] * 2; // 둘 중 하나의 값의 2를 곱한 값을 0번 인덱스에 저장
      newData[1] = newData[2]; // 1번 인덱스 자리에 2번 인덱스 값 이동
      newData[2] = 0; // 2번 인덱스 자리는 빈칸이기 때문에 0 저장
      totalScore += newData[0];
    } else if (newData[1] == newData[2]) {
      // 1,2 인덱스 자리의 값이 같다면
      newData[1] = newData[1] * 2; // 둘 중 하나의 값의 2를 곱한 값을 1번 인덱스에 저장
      newData[2] = 0; // 2번 인덱스 자리는 빈칸이기 때문에 0 저장
      totalScore += newData[1];
    }
    newData.push(0); // newData 배열의 길이를 4로 만들어야 하기 때문에 나머지 1개 빈칸 만들기 위해서 0 추가
  } else if (newData.length === 2) {
    // newData 배열의 길이가 2 이면
    if (newData[0] === newData[1]) {
      // 0,1 인덱스 자리의 값이 같다면
      newData[0] = newData[0] * 2; // 둘 중 하나의 값의 2를 곱한 값을 0번 인덱스에 저장
      newData[1] = 0; // 1번 인덱스 자리는 빈칸이기 때문에 0 저장
      totalScore += newData[0];
    }
    newData.push(0, 0); // newData 배얄의 길이를 4로 만들어야 하기 떄문에 나머지 2개 빈칸을 만들기 위해서 0 추가
  } else if (newData.length === 1) {
    newData.push(0, 0, 0); // newData 배열의 길이를 4로 만들어야 하기 때문에 나머지 빈칸 3개 만들기 위해서 0 추가
  } else if (newData.length === 0) {
    newData.push(0, 0, 0, 0); // newData 배열의 길이를 4로 만들어야 하기 때문에 나머지 빈칸 4개 만들기 위해서 0 추가
  }

  return newData; // newData 배열 반환
}
function downAndRightSort(newData) {
  // 아래,오른쪽 이벤트 발생했을떄 호출하는 함수
  if (newData.length === 4) {
    // newData 배열의 길이가 4일떄
    if (newData[3] === newData[2]) {
      // 2,3 번 인덱스 자리의 값이 같을 때
      newData[3] = newData[3] * 2; // 둘 중 하나의 값의 2를 곱한 값을 3번 인덱스에 저장
      totalScore += newData[3];
      if (newData[1] === newData[0]) {
        // 0, 1 번 인덱스 자리의 값이 같을 때
        newData[2] = newData[1] * 2; // 둘 중 하나의 값의 2를 곱한 값을 2번 인덱스로 값 이동해서 저장
        newData[1] = 0; // 0,1 번 자리의 인덱스 값은 빈자리이기 때문에 0 저장
        newData[0] = 0;
        totalScore += newData[2];
      } else {
        // 0,1 번 인덱스 값 오른쪽으로 한칸씩 이동
        newData[2] = newData[1];
        newData[1] = newData[0];
        newData[0] = 0;
      }
    } else if (newData[2] === newData[1]) {
      // 1,2 번 인덱스 자리의 값이 같다면
      newData[2] = newData[2] * 2; // 둘 중 하나의 값의 2를 곱한 값을 2번 인덱스로 값 이동해서 저장
      newData[1] = newData[0]; // 0번 인덱스 값 1번 인덱스 자리로 이동
      newData[0] = 0; // 0번 인덱스는 빈칸이니까 0 저장
      totalScore += newData[2];
    } else if (newData[1] === newData[0]) {
      // 0,1 번 인덱스 자리의 값이 같다면
      newData[1] = newData[1] * 2; // 둘 중 하나의 값의 2를 곱한 값을 1번 인덱스로 값 이동해서 저장
      newData[0] = 0; // 0번 인덱스는 빈칸이니까 0 저장
      totalScore += newData[1];
    }
  } else if (newData.length === 3) {
    // newData 배열의 길이가 3 이라면
    if (newData[2] === newData[1]) {
      // 1,2 번 인덱스 자리의 값이 같다면
      newData[2] = newData[2] * 2; // 둘 중 하나의 값의 2를 곱한 값을 2번 인덱스로 값 이동해서 저장
      newData[1] = newData[0]; // 1번 인덱스 자리에 0번 인덱스 값 이동
      newData[0] = 0; // 0번 인덱스는 빈칸이니까 0 저장
      totalScore += newData[2];
    } else if (newData[1] == newData[0]) {
      // 0,1 번 인덱스 자리의 값이 같다면
      newData[1] = newData[1] * 2; //  둘 중 하나의 값의 2를 곱한 값을 1번 인덱스로 값 이동해서 저장
      newData[0] = 0; // 0번 인덱스는 빈칸이니까 0 저장
      totalScore += newData[1];
    }
    newData.unshift(0); // newData 배열의 길이를 4로 만들어야 하기 때문에 빈칸 1개 추가
  } else if (newData.length === 2) {
    // newData 배열의 길이가 2라면
    if (newData[1] === newData[0]) {
      // 0,1 번 인덱스 자리의 값이 같다면
      newData[1] = newData[1] * 2; // 둘 중 하나의 값의 2를 곱한 값을 1번 인덱스로 값 이동해서 저장
      newData[0] = 0; // 0번 인덱스는 빈칸이니까 0 저장
      totalScore += newData[1];
    }
    newData.unshift(0, 0); // newData 배열의 길이를 4로 만들어야 하기 때문에 빈칸 2개 추가
  } else if (newData.length === 1) {
    newData.unshift(0, 0, 0); // newData 배열의 길이를 4로 만들어야 하기 때문에 빈칸 3개 추가
  } else if (newData.length === 0) {
    newData.push(0, 0, 0, 0); // newData 배열의 길이를 4로 만들어야 하기 때문에 빈칸 4개 추가
  }

  return newData; // newData 배열 반환
}
function moveCells(direction) {
  // 인자로 넘겨 받은 direction 값에 따라서 연산하는 함수
  rememberData.push(JSON.parse(JSON.stringify(data))); // data 배열을 깊은 복사 후 rememberData 배열에 추가
  rememberScore.push(totalScore); // rememberScore 배열에 현재 totalScore 값 추가
  // 이벤트에 따라서 연산이 일어나기 전의 data, totalScore 를 저장
  if (direction === 'left') {
    // direction 의 값이 left 라면
    data.forEach((Element, index) => {
      // data 배열의 각각의 요소 배열을 돌기
      const newData = Element.filter((element) => element > 0); // filter 메서드를 사용하여 각각의 배열에서 0 을 뺀 배열을 반환하기 0 은 빈칸이기 때문에 빈칸을 뺴고 배열을 반환 받으면
      // 반환 받은 newData 배열은 왼쪽으로 정렬한 효과와 같은 배열이 된다. 원래 data 각각의 배열의 길이는 4 이니까 newData 의 길이가 4보다 작다면 0 을 추가해서 빈칸 데이터를 추가 해주면 된다.
      data[index] = upAndLeftSort(newData); // upAndLeftSort 함수에 newData 를 전달하여 호출 그러면 배열을 정렬하고 빈칸 데이터를 채워서 반환해준다. 그 배열을 다시 data 배열에 저장
    });
  } else if (direction === 'right') {
    // direction 의 값이 right 라면
    data.forEach((rowElement, index) => {
      // data 배열의 각각의 요소 배열을 돌기
      const newData = rowElement.filter((element) => element > 0); // 각각의 배열을 filter 메서드를 사용하여 0 이 아닌 요소들로만 구성된 newData 생성

      data[index] = downAndRightSort(newData); // downAndRightSort 함수에 newData 를 전달하여 호출
    });
  } else if (direction === 'up') {
    // direction 의 값이 up 이라면
    data.forEach((element, index) => {
      // data 배열의 각각의 요소 배열을 돌기
      let newData = [
        // 각각의 배열의 같은 인덱스 값으로 생성
        data[0][index],
        data[1][index],
        data[2][index],
        data[3][index],
      ].filter((element) => element > 0); // 각각의 배열을 filter 메서드를 사용하여 0 이 아닌 요소들로만 구성된 newData 생성
      newData = upAndLeftSort(newData); // upAndLeftSort 함수에 newData 를 전달하여 호출
      // 각각의 배열 index 위치에 upAndLeftSort 함수를 호출 후 반환 받은 newData 값을 저장
      data[0][index] = newData[0];
      data[1][index] = newData[1];
      data[2][index] = newData[2];
      data[3][index] = newData[3];
    });
  } else if (direction === 'down') {
    // direction 의 값이 down 이라면
    data.forEach((element, index) => {
      // data 배열의 각각의 요소배열을 돌기
      let newData = [
        // 각각의 배열의 같은 인덱스 값으로 배열 생성
        data[0][index],
        data[1][index],
        data[2][index],
        data[3][index],
      ].filter((element) => element > 0); // 각각의 배열을 filter 메서드를 사용하여 0 이 아닌 요소들로만 구성된 newData 생성
      newData = downAndRightSort(newData); // downAndRightSort 함수에 newData 를 전달하여 호출
      // 각각의 배열 index 위치에 downAndRightSort 함수를 호출 후 반환 받은 newData 값을 저장
      data[0][index] = newData[0];
      data[1][index] = newData[1];
      data[2][index] = newData[2];
      data[3][index] = newData[3];
    });
  }
  draw();
  window.removeEventListener('keyup', checkKey);

  if (data.flat().includes(2048)) {
    // data 배열의 각각의 요소들에서 2048 이 있다면 게임 승리
    setTimeout(() => {
      alert('게임 승리!!');
    }, 100);
    return;
  }

  setTimeout(() => {
    // 랜덤으로 2가 생성되고 화면에 그려질때 바로 생성되지 않고 조금 시간차를 두기 위해서 setTimeout 메서드 사용
    randomCreateTwo();
    draw();
  }, 500);
}

function checkKey(event) {
  // 방향키를 누르면 호출되는 콜백 함수
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
}

window.addEventListener('keyup', checkKey);

// let startCoord;

// window.addEventListener('mousedown', (event) => {
//   startCoord = [event.clientX, event.clientY];
// });

// window.addEventListener('mouseup', (event) => {
//   const endCoord = [event.clientX, event.clientY];

//   const diffX = endCoord[0] - startCoord[0];
//   const diffY = endCoord[1] - startCoord[1];
//   if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
//     moveCells('left');
//   } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
//     moveCells('right');
//   } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
//     moveCells('down');
//   } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
//     moveCells('up');
//   }
// });
