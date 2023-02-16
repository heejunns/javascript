const $wrapper = document.querySelector('#wrapper'); // id wrapper 이름을 가진 div 태그 선택
const outLine = document.createElement('fieldset'); // fieldset 태그 생성
const title = document.createElement('legend'); // legend 태그 생성
const screen = document.createElement('div');
const changeScreen = document.createElement('span');
const button = document.createElement('button'); // button 태그 생성
screen.append('소요된 시간 : ');
screen.id = 'screenResult';
screen.appendChild(changeScreen);
button.append('게임 다시 시작하기'); // button 태그의 컨텐츠 값 넣기
title.append('카드 짝맞추기 게임'); // legend 태그의 컨텐츠 값 넣기
outLine.appendChild(title); // fieldset 자식 태그로 legend 태그 추가
outLine.appendChild($wrapper); // fieldset 자식 태그로 id wrapper 이름을 가진 div 태그 추가
document.body.appendChild(outLine); // 바디 태그의 자식태그로 fieldset 태그 추가
let total;
while (true) {
  total = Number(
    prompt(
      '몇 개의 카드로 게임을 진행 하시겠습니까? 짝수만 입력 해주세요.(최대 20개)'
    )
  ); // 카드의 총 개수
  if (total % 2 == 0) {
    break;
  } else if (total % 2 != 0) {
    alert('카드의 수는 짝수만 입력 가능 합니다.');
  }
}

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'white',
  'pink',
  'chartreuse',
  'brown',
  'purple',
  'aqua',
]; // 카드의 색깔
const RealColors = colors.slice(0, total / 2);
let colorCopy = RealColors.concat(RealColors); // 같은 색깔의 카드가 두개씩 있어야 하니까 colors 배열을 두개 합치기
let randomColors = []; // 섞은 카드들을 저장할 배열
let startTime;

// 피셔, 에이츠 셔플 , 카드의 색을 무작위로 섞기
function shuffle() {
  for (let i = 0; colorCopy.length > 0; ++i) {
    const randomColor = Math.floor(Math.random() * colorCopy.length);
    randomColors.push(colorCopy.splice(randomColor, 1));

    // randomColors = randomColors.concat(colorCopy.splice(randomColor,1)); 위의 코드와 같은 기능을 한다.
  }
}

function createCard(i) {
  // 카드를 생성하는 메서드
  // div.card > div.card-inner > (div.card-front + div.card-back) 태그로 구성된다.
  const card = document.createElement('div');
  card.className = 'card'; // 클래스 card 이름을 가진 div 태그 생성
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // 클래스 card-inner 이름을 가진 div 태그 생성
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // 클래스 card-front 이름을 가진 div 태그 생성
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // 클래스 card-back 이름을 가진 div 태그 생성
  cardBack.style.backgroundColor = randomColors[i]; // 랜덤으로 색깔이 섞인 배열의 i 번째 색을 backgroundColor 색으로 지정
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card; // 클래스 card 이름을 가진 div 태그 반환
}

let choiceCard = []; // 선택한 카드를 저장할 배열
let completeCard = []; // 선택한 카드 두개가 같은 색깔이어서 완료한 카드를 저장할 배열

function clickRestartGame() {
  // 게임 다시 시작하기 버튼을 클릭하면 호출되는 콜백함수

  document.querySelectorAll('.card').forEach((element) => {
    // 카드 다시 뒤집어두기
    element.classList.remove('flipped');
  });

  setTimeout(() => {
    // 카드 뒤집고 0.5 초 후 새로운 게임 진행
    $wrapper.innerHTML = ''; // id wrapper 이름을 가진 div 태그의 자손태그 모두 초기화
    colorCopy = colors.concat(colors); // 6개 종류로 구성된 색의 12개의 요소를 배열로 다시 생성
    randomColors = []; // 카드의 색을 무작위로 섞은 배열 초기화
    completeCard = []; // 12개의 완료된 카드를 저장한 배열 초기화
    startGame(); // 다시 게임 시작
  }, 500);
}
// const clickRestart = function () { 태그들은 그대로 두고 바꿔야될 데이터들만 바꾸기
//     setTimeout(() => {
//         document.querySelectorAll('.card').forEach((element) => {
//           element.classList.remove('flipped');
//         });
//       }, 100);
//   setTimeout(() => {
//     randomColors.splice(0);
//     choiceCard.splice(0);
//     completeCard.splice(0);
//     colorCopy = colors.concat(colors);
//     console.log(randomColors);
//     shuffle();
//     console.log(randomColors);
//     document.querySelectorAll('.card').forEach((element, index) => {
//       element.querySelector('.card-back').style.backgroundColor =
//         randomColors[index];
//       element.addEventListener('clcik', clickCard);
//     });
//   }, 1000);

//   document.querySelectorAll('.card').forEach((element, index) => {
//     setTimeout(() => {
//       element.classList.add('flipped');
//     }, 1000 + 100 * index);
//   });

//   setTimeout(() => {
//     document.querySelectorAll('.card').forEach((element) => {
//       element.classList.remove('flipped');
//     });
//   }, 5000);
// };

button.addEventListener('click', clickRestartGame);

const checkSameCard = function () {
  //
  // 선택한 두개의 카드가 같은지 판단하는 함수
  if (
    choiceCard[0].querySelector('.card-back').style.backgroundColor ===
    choiceCard[1].querySelector('.card-back').style.backgroundColor
  ) {
    completeCard = completeCard.concat(choiceCard);
    choiceCard.splice(0);
    if (completeCard.length === total) {
      // 길이가 12 개라면 전부 카드를 뒤집었으니까 다시 카드를 클릭 못하도록 이벤트를 제거한다.
      //   document.querySelectorAll('.card').forEach((element) => {
      //     element.removeEventListener('click', clickCard);
      //   });
      const endTime = new Date();
      changeScreen.textContent = `${(endTime - startTime) / 1000} 초`;
      alert('축하합니다! 카드를 모두 맞췄습니다!');
      return;
    }
  } else {
    choiceCard[0].classList.remove('flipped');
    choiceCard[1].classList.remove('flipped');
    choiceCard[0].addEventListener('click', clickCard);
    choiceCard[1].addEventListener('click', clickCard);
    choiceCard.splice(0);
  }
};

const clickCard = function () {
  console.log('클릭!!');
  if (choiceCard.length < 2) {
    this.removeEventListener('click', clickCard);
    choiceCard.push(this);
    this.classList.toggle('flipped');
  } else if (choiceCard.length == 2) {
    return;
  }
  if (choiceCard.length == 2) {
    // checkSameCard();
    setTimeout(checkSameCard, 1000); // 이렇게 해야 2개의 카드가 모두 뒤집힌 후에야 카드 색을 판단한 결과를 확인할 수 있음. 사용하지 않으면 두번째 카드는 뒤집히는거 보지도 못하고 카드색의 판단 결과에 따라서 프로그램 실행된다.
  }
};

function startGame() {
  // 게임 시작하는 함수
  shuffle(); // 색들을 섞기
  for (let i = 0; i < total; ++i) {
    const card = createCard(i); // 카드를 만들어서
    // card.addEventListener('click', clickCard);
    $wrapper.appendChild(card); // id 값이 wrapper 인 div 태그에 자식태그로 추가
  }
  $wrapper.appendChild(screen);
  $wrapper.appendChild(button);

  // 게임 처음에 3초동안 모든 카드를 보여주기
  document.querySelectorAll('.card').forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    // 카드 모두 뒤집기
    document.querySelectorAll('.card').forEach((element) => {
      element.classList.remove('flipped');
    });
  }, 3000);
  setTimeout(() => {
    // 모든 카드들에 이벤트 달기
    document.querySelectorAll('.card').forEach((element) => {
      element.addEventListener('click', clickCard);
    });
    startTime = new Date();
  }, 5000);
}

startGame();
