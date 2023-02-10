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
const $menu1 = document.querySelector('#menu-1');

const hero = {
  name: '',
  level: 1,
  maxHp: 100,
  hp: 100,
  exp: 0,
  att: 10,
  attack: function (monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  recover: function (monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
};

let monster;

const monsterList = [
  { name: '슬라임', hp: 25, att: 10, exp: 10 },
  { name: '주황버섯', hp: 40, att: 20, exp: 20 },
  { name: '예티', hp: 60, att: 30, exp: 60 },
  { name: '주니어발록', hp: 100, att: 40, exp: 100 },
];

$startScreen.addEventListener('submit', (event) => {
  // 캐릭터 이름 생성 단계
  event.preventDefault();

  hero.name = event.target['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = `캐릭터 이름: ${hero.name}, `;
  $heroLevel.textContent = `level : ${hero.level}, `;
  $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
  $heroExp.textContent = `경험치 : ${hero.exp}, `;
  $heroAtt.textContent = `공격력 : ${hero.att}`;
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
  $reset.removeEventListener('click', clickReset);
  $gameMenu.addEventListener('click', clickGameMenu);
};

const clickRun = () => {
  $battleMenu.style.display = 'none';
  $gameMenu.style.display = 'block';
  monster = null;
  $monsterName.textContent = '';
  $monsterHp.textContent = '';
  $monsterAtt.textContent = '';
};
// 모험 모드를 선택 했을때
const clickBattle = () => {
  $gameMenu.style.display = 'none';
  $battleMenu.style.display = 'block';
  monster = JSON.parse(
    JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
  );
  $monsterName.textContent = `몬스터 이름 : ${monster.name}, `;
  $monsterHp.textContent = `체력 : ${monster.hp}, `;
  $monsterAtt.textContent = `공격력 : ${monster.att}`;
};
const clickBattleMenu = (event) => {
  console.log('함수 호출 되나?');
  if (event.target.textContent == '공격') {
    console.log('공격!');
    hero.attack(monster);
    console.log('공격함수 호출!');
    if (hero.hp <= 0) {
      alert('monster의 승리!');
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : ${monster.hp}, `;
    } else if (monster.hp < 0) {
      alert('hero의 승리!');
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : ${monster.hp}, `;
    } else if (hero.hp > 0 && monster.hp > 0) {
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : ${monster.hp}, `;
    }
  } else if (event.target.textContent == '회복') {
    hero.recover(monster);
    if (hero.hp < 0) {
      alert('monster의 승리!');
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
    } else if (hero.hp > 100) {
      hero.hp = hero.maxHp;
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
    } else if (hero.hp > 0) {
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
    }
  } else if (event.target.textContent == '도망') {
    clickRun();
  }
};
$battleMenu.addEventListener('click', clickBattleMenu);

const clickGameMenu = (event) => {
  if (event.target.textContent == '모험') {
    clickBattle();
  } else if (event.target.textContent == '휴식') {
    // 일반 모드에서 휴식 선택 => 캐릭터의 체력을 모두 회복한다. 캐릭터의 최대 체력은 100이다.
    hero.hp = hero.maxHp;
    $heroHp.textContent = `체력 : ${hero.hp}/ ${hero.maxHp}, `;
  } else if (event.target.textContent == '종료') {
    //  일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 그리고 모두 초기화 하고 캐릭터 생성 화면으로 돌아간다.
    // $gameMenu.removeEventListener('click');
    $reset.addEventListener('click', clickReset);
    $gameMenu.removeEventListener('click', clickGameMenu);
    alert('게임을 다시 시작하기 버튼을 클릭 해주세요');
  }
};
$gameMenu.addEventListener('click', clickGameMenu);

// 일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 이벤트를 못 읽도록 만든다.
