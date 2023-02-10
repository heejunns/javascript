const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $reset = document.querySelector('#reset');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroExp = document.querySelector('#hero-exp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

const hero = {
  name: '',
  level: 1,
  maxHp: 100,
  hp: 0,
  exp: 0,
  att: 10,
};

let monster;

const monsterList = [
  { name: '슬라임', hp: 25, att: 10, exp: 10 },
  { name: '주황버섯', hp: 40, att: 20, exp: 20 },
  { name: '예티', hp: 100, att: 40, exp: 60 },
  { name: '주니어발록', hp: 150, att: 60, exp: 100 },
];

$startScreen.addEventListener('submit', (event) => {
  // 캐릭터 이름 생성 단계
  event.preventDefault();

  hero.name = event.target['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = hero.name;
  $heroLevel.textContent = hero.level;
  $heroHp.textContent = hero.hp;
  $heroExp.textContent = hero.exp;
  $heroAtt.textContent = hero.att;
});
const clickReset = () => {
  $startScreen.style.display = 'block';
  $gameMenu.style.display = 'none';
  $heroName.textContent = '';
  $heroLevel.textContent = '';
  $heroHp.textContent = '';
  $heroExp.textContent = '';
  $heroAtt.textContent = '';
  hero.name = '';
  hero.hp = 100;
  hero.level = 1;
  hero.exp = 0;
  hero.att = 10;
};

// const gameMenuSubmit

$gameMenu.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target['menu-input'].value === '휴식') {
    // 일반 모드에서 휴식 선택 => 캐릭터의 체력을 모두 회복한다. 캐릭터의 최대 체력은 100이다.
    hero.hp = hero.maxHp;
    $heroHp.textContent = hero.hp;
  } else if (event.target['menu-input'].value === '모험') {
  } else if (event.target['menu-input'].value === '종료') {
    //  일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 그리고 모두 초기화 하고 캐릭터 생성 화면으로 돌아간다.
    // $gameMenu.removeEventListener('click');
    $reset.addEventListener('click', clickReset);
    alert('게임을 다시 시작하기 버튼을 클릭 해주세요');
  }
});

// 일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 이벤트를 못 읽도록 만든다.
