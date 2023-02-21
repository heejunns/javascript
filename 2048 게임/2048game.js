const $table = document.getElementById('table');
const $score = document.getElementById('score');

let data = [];
let gameStart = true;
function start() {
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

function randomCreateTwo() {
  // 랜덤한 칸에 2를 생성하는 함수
  const emptyCells = [];
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
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  // data[randomCell[0]][randomCell[1]] = 2;
  data[Math.floor(randomCell / 4)][randomCell % 4] = 2;
}

function draw() {
  // 데이터의 정보를 화면에 그리는 함수
  data.forEach((rowElement, rowIndex) => {
    rowElement.forEach((cellElement, cellIndex) => {
      const $targetBlock = $table.children[rowIndex].children[cellIndex];
      if (cellElement > 0) {
        $targetBlock.textContent = cellElement;
        $targetBlock.className = 'color-' + cellElement;
      } else {
        $targetBlock.textContent = '';
        $targetBlock.className = '';
      }
    });
  });
}

start();

function moveCells(direction) {
  if (direction === 'left') {
    data.forEach((rowElement, index) => {
      const newData = rowElement.filter((element) => element > 0);
      if (newData.length === 4) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          if (newData[2] === newData[3]) {
            newData[1] = newData[2] + newData[3];
            newData[2] = 0;
            newData[3] = 0;
          }
        } else if (newData[1] === newData[2]) {
          newData[1] = newData[1] + newData[2];
          newData[2] = newData[3];
          newData[3] = 0;
        } else if (newData[2] === newData[3]) {
          newData[2] = newData[2] + newData[3];
          newData[3] = 0;
        }
      } else if (newData.length === 3) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          newData[1] = newData[2];
        } else if (newData[1] == newData[2]) {
          newData[1] = newData[1] + newData[2];
          newData[2] = 0;
        }
        newData.push(0);
      } else if (newData.length === 2) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          newData[1] = 0;
        }
        newData.push(0, 0);
      } else if (newData.length === 1) {
        newData.push(0, 0, 0);
      } else if (newData.length === 0) {
        newData.push(0, 0, 0, 0);
      }
      data[index] = newData;
    });
  } else if (direction === 'right') {
    data.forEach((rowElement, index) => {
      const newData = rowElement.filter((element) => element > 0);
      console.log(newData);
      if (newData.length === 4) {
        if (newData[3] === newData[2]) {
          newData[3] = newData[3] + newData[2];
          if (newData[1] === newData[0]) {
            newData[2] = newData[1] + newData[0];
            newData[1] = 0;
            newData[0] = 0;
          }
        } else if (newData[2] === newData[1]) {
          newData[2] = newData[2] + newData[1];
          newData[1] = newData[0];
          newData[0] = 0;
        } else if (newData[1] === newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
      } else if (newData.length === 3) {
        if (newData[2] === newData[1]) {
          newData[2] = newData[2] + newData[1];
          newData[1] = newData[0];
          newData[0] = 0;
        } else if (newData[1] == newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
        newData.unshift(0);
      } else if (newData.length === 2) {
        if (newData[1] === newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
        newData.unshift(0, 0);
      } else if (newData.length === 1) {
        newData.unshift(0, 0, 0);
      } else if (newData.length === 0) {
        newData.unshift(0, 0, 0, 0);
      }
      data[index] = newData;
    });
  } else if (direction === 'up') {
    data.forEach((element, index) => {
      const newData = [
        data[0][index],
        data[1][index],
        data[2][index],
        data[3][index],
      ].filter((element) => element > 0);
      if (newData.length === 4) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          if (newData[2] === newData[3]) {
            newData[1] = newData[2] + newData[3];
            newData[2] = 0;
            newData[3] = 0;
          }
        } else if (newData[1] === newData[2]) {
          newData[1] = newData[1] + newData[2];
          newData[2] = newData[3];
          newData[3] = 0;
        } else if (newData[2] === newData[3]) {
          newData[2] = newData[2] + newData[3];
          newData[3] = 0;
        }
      } else if (newData.length === 3) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          newData[1] = newData[2];
        } else if (newData[1] == newData[2]) {
          newData[1] = newData[1] + newData[2];
          newData[2] = 0;
        }
        newData.push(0);
      } else if (newData.length === 2) {
        if (newData[0] === newData[1]) {
          newData[0] = newData[0] + newData[1];
          newData[1] = 0;
        }
        newData.push(0, 0);
      } else if (newData.length === 1) {
        newData.push(0, 0, 0);
      } else if (newData.length === 0) {
        newData.push(0, 0, 0, 0);
      }
      data[0][index] = newData[0];
      data[1][index] = newData[1];
      data[2][index] = newData[2];
      data[3][index] = newData[3];
    });
  } else if (direction === 'down') {
    data.forEach((element, index) => {
      const newData = [
        data[0][index],
        data[1][index],
        data[2][index],
        data[3][index],
      ].filter((element) => element > 0);
      console.log(newData);
      if (newData.length === 4) {
        if (newData[3] === newData[2]) {
          newData[3] = newData[3] + newData[2];
          if (newData[1] === newData[0]) {
            newData[2] = newData[1] + newData[0];
            newData[1] = 0;
            newData[0] = 0;
          }
        } else if (newData[2] === newData[1]) {
          newData[2] = newData[2] + newData[1];
          newData[1] = newData[0];
          newData[0] = 0;
        } else if (newData[1] === newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
      } else if (newData.length === 3) {
        if (newData[2] === newData[1]) {
          newData[2] = newData[2] + newData[1];
          newData[1] = newData[0];
          newData[0] = 0;
        } else if (newData[1] == newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
        newData.unshift(0);
      } else if (newData.length === 2) {
        if (newData[1] === newData[0]) {
          newData[1] = newData[1] + newData[0];
          newData[0] = 0;
        }
        newData.unshift(0, 0);
      } else if (newData.length === 1) {
        newData.unshift(0, 0, 0);
      } else if (newData.length === 0) {
        newData.unshift(0, 0, 0, 0);
      }
      data[0][index] = newData[0];
      data[1][index] = newData[1];
      data[2][index] = newData[2];
      data[3][index] = newData[3];
    });
  }
  draw();
  setTimeout(() => {
    randomCreateTwo();
    draw();
  }, 1000);

  console.log(data);
}
window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});

let startCoord;

window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY];
});

window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY];

  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left');
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right');
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down');
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up');
  }
});
