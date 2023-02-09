const $table = document.createElement('table'); // table 태그 생성
const $result = document.createElement('div'); // div 태그 생성
const $resultChange = document.createElement('span'); // span 태그 생성
const $reset = document.createElement('button'); // button 태그 생성
const $fieldset = document.createElement('fieldset'); // fieldset 태그 생성
const $legend = document.createElement('legend'); // legend 태그 생성
$reset.textContent = '게임 다시 시작하기'; // button 태그에 "게임 다시 시작하기" 콘첸츠값 넣기
$result.textContent = '게임 결과 : '; // div 태그에 "게임 결과 : " 콘텐츠값 넣기
$legend.textContent = '틱택토 게임'; // legend 태그에 "틱택토 게임" 콘텐츠값 넣기
$result.append($resultChange); // div 태그 안에 자식 요소로 span 태그 넣기
$fieldset.append($legend); // fieldset 태그 안에 자식 요소로 legend 태그 넣기
$fieldset.append($result); // fieldset 태그 안에 자식 요소로 div 태그 넣기
$fieldset.append($reset); // fieldset 태그 안에 자식 요소로 button 태그 넣기
let turn = 'o'; // 턴 초기화
const data = []; // td 태그를 넣기 위한 배열 생성
let rows = []; // td 태그를 행별로 묶어서 저장하기 위한 배엻 생성
const winOrDraw = (target) => {
  // 아래의 코드로 사용자가 클릭한 태그인 td 의 위치 인덱스를 알아낼수 있는데
  // let rowIndex = event.target.parentNode.rowIndex;
  // let colIndex = event.target.cellIndex;
  // 코드로 대체할수 있습니다. parentNode 는 현재 태그의 부모 태그를 선택하는 속성이며 현재 태그는 td 니까 부모 태그는 tr 태그로 tr 태그는 rowIndex 속성을 가지고 있습니다.
  // td 태그는 cellIndex 속성을 가지고 있습니다. parentNode 의 반대 개념인 childeren 은 현재 태그의 자식 태그를 선택하는 속성 입니다.
  $table.removeEventListener('click', clickBlock);
  let rowIndex;
  let colIndex;
  data.forEach((row, indexr) => {
    row.forEach((element, indexc) => {
      if (element == target) {
        rowIndex = indexr;
        colIndex = indexc;
      }
    });
  });
  // 게임 결과 확인 , 게임 결과를 확인할 것인가?
  // 게임의 결과를 결정하는 조건을 확인
  // 1. 같은 행 또는 같은 열이 모두 같은 사용자가 클릭 하였을때
  // 2. (0,0), (1,1), (2,2) 을 같은 사용자가 클릭 하였을때, 대각선
  // 3. (0,2), (1,1), (2,0) 을 같은 사용자가 클릭 하였을때, 대각선
  // 그럼 어떻게 데이터를 배열에 넣어서 어떻게 이 조건들을 확인할 것인가?
  // data[i][l]
  if (
    // 열이 같은 그림인지 판단
    data[rowIndex][0].textContent === turn &&
    data[rowIndex][1].textContent === turn &&
    data[rowIndex][2].textContent === turn
  ) {
    $resultChange.textContent = `${turn} 님의 승`;
    return true;
  } else if (
    // 행이 같은 그림인지 판단.
    data[0][colIndex].textContent === turn &&
    data[1][colIndex].textContent === turn &&
    data[2][colIndex].textContent === turn
  ) {
    $resultChange.textContent = `${turn} 님의 승`;
    return true;
  } else if (
    // 대각선 판단
    data[0][0].textContent === turn &&
    data[1][1].textContent === turn &&
    data[2][2].textContent === turn
  ) {
    $resultChange.textContent = `${turn} 님의 승`;
    return true;
  } else if (
    // 대각선 판단
    data[0][2].textContent === turn &&
    data[1][1].textContent === turn &&
    data[2][0].textContent === turn
  ) {
    $resultChange.textContent = `${turn} 님의 승`;
    return true;
  } else {
    // 위의 조건들에 부합하지 않는다면
    let drawCount = 0;
    //   data.forEach((row) => {
    //     row.forEach((element) => {
    //       if (element.textContent) {
    //         drawCount += 1;
    //       }
    //     });
    //   });
    draw: for (let i = 0; i < 3; ++i) {
      // 위의 forEach 로 모든 태그들을 돌아다니며 컨텐츠값을 확인하는것은 매우 비효율적이다. for문을 돌다가 만약 빈칸이 나온다면 더이상 체크하지 않고 2중 for 문을 탈출하도록 만든다.
      for (let j = 0; j < 3; ++j) {
        if (data[i][j].textContent == '') {
          break draw;
        } else {
          drawCount += 1;
        }
      }
    }

    // 위의 코드보다 더 짧게 할수있는 방법은 every 메서드를 사용하는것이다. true, false 를 반환한다.
    // let drawCount = data.flat().every((element)=>element.textContent)
    if (drawCount == 9) {
      // 모든 td 태그의 콘텐츠값이 o, x 가 있다면
      $resultChange.textContent = '무승부';
      return true;
    }
  }

  turn = turn === 'o' ? 'x' : 'o';
};

const clickBlock = (event) => {
  // 생성한 td 태그의 클릭 이벤트가 발생했을때 함수 정의
  // 칸을 클릭 하였을때  이미 글자가 있는가? 확인
  if ($resultChange.textContent) return; // 게임 결과가 화면에 보여지고 있다면 return
  if (event.target.textContent) return; // 글자가 있다면 return
  $table.removeEventListener('click', clickBlock);
  event.target.textContent = turn; // 선택한 td 태그에 turn 그리기, 여기서 만약 td 태그를 클릭한것이 아니라 table 태그를 클릭한것이라면 event.currentTarget 사용하면 된다.
  let gameResult = winOrDraw(event.target);
  if (gameResult == true) {
    return;
  }
  // 컴퓨터가 남은 칸중에 무작위로 선택하는 기능 추가
  // 어떻게 비어 있는 칸들을 찾아내서 무작위로 선택할것인가?
  if (turn == 'x') {
    setTimeout(() => {
      const emptyArr = data.flat().filter((element) => !element.textContent);
      let computerChoice =
        emptyArr[Math.floor(Math.random() * emptyArr.length)];
      computerChoice.textContent = 'x';
      winOrDraw(event.target);
      $table.addEventListener('click', clickBlock);
    }, 2000);
  }
};

for (let i = 0; i < 3; ++i) {
  // 2중 for 문으로 3*3 table 만들기
  const $tr = document.createElement('tr');
  rows = []; // 행 배열 초기화
  for (let j = 0; j < 3; ++j) {
    const $td = document.createElement('td');
    rows.push($td); // td 태그 넣기

    $tr.append($td); // tr 태그 안에 자식 요소로 td 태그 넣기
  }

  $table.append($tr); // table 태그 안에 자식 요소로 tr 태그 넣기
  data.push(rows); // data 배열에 rows 배열 넣기
}
$table.addEventListener('click', clickBlock); // 이벤트 버블링 현상으로 자식 태그를 클릭해도 부모 태그로 올라가면 이벤트 발생
document.body.append($table); // body 태그 안에 자식 요소로 table 태그 넣기
document.body.append($fieldset); // body 태그 안에 자식 요소로 field 태그 넣기

const clickReset = () => {
  // 게임 다시 시작하기 버튼을 클릭하였을때 호출
  $resultChange.textContent = '';
  turn = 'o';
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      data[i][j].textContent = '';
    }
  }
  $table.addEventListener('click', clickBlock);
};
$reset.addEventListener('click', clickReset);
