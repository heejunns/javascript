const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroExp = document.querySelector('#hero-exp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterExp = document.querySelector('#monster-exp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');
const $menu1 = document.querySelector('#menu-1');

const hero = {
  name: '',
  level: 1,
  maxHp: 100,
  hp: 100,
  exp: 0,
  levelUpExp: function () {
    return this.level * 15;
  },
  att: 10,
  attack: function (monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  recover: function (monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
  levelUp: function (monster) {
    this.exp += monster.exp - this.levelUpExp();
    this.level += 1;
    this.att += 5 * this.level;
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
  $heroExp.textContent = `경험치 : ${hero.exp}/${hero.levelUpExp()}, `;
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
};

const clickRun = () => {
  $battleMenu.style.display = 'none';
  $gameMenu.style.display = 'block';
  monster = null;
  $monsterName.textContent = '';
  $monsterHp.textContent = '';
  $monsterExp.textContent = '';
  $monsterAtt.textContent = '';
  $message.textContent = '';
};
const gameLose = () => {
  $battleMenu.style.display = 'none';
  clickReset();
  monster = null;
  $monsterName.textContent = '';
  $monsterHp.textContent = '';
  $monsterExp.textContent = '';
  $monsterAtt.textContent = '';
  $message.textContent = '';
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
  $monsterExp.textContent = `경험치 : ${monster.exp}, `;
  $monsterAtt.textContent = `공격력 : ${monster.att}`;
  $message.textContent = '';
};
const clickBattleMenu = (event) => {
  if (event.target.textContent == '공격') {
    hero.attack(monster);
    if (hero.hp <= 0) {
      $heroHp.textContent = `체력 : ${0}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : ${monster.hp}, `;
      $message.textContent = `${hero.att} 의 데미지를 주고, ${monster.att} 의 데미지를 받았습니다. 몬스터의 승리로 게임을 다시 시작합니다.`;
      alert('몬스터의 승리!');
      gameLose();
    } else if (monster.hp <= 0) {
      if (hero.exp + monster.exp >= hero.levelUpExp()) {
        hero.levelUp(monster);
        $heroLevel.textContent = `level : ${hero.level}, `;
        $heroAtt.textContent = `공격력 : ${hero.att}`;
        $message.textContent = `${hero.att} 의 데미지를 주고, ${monster.att} 의 데미지를 받았습니다. ${hero.name} 님의 승리 입니다. levelup 하셨습니다. 다음 몬스터가 등장 합니다.`;
      } else if (hero.exp + monster.exp < hero.levelUpExp()) {
        hero.exp += monster.exp;
        $message.textContent = `${hero.att} 의 데미지를 주고, ${monster.att} 의 데미지를 받았습니다. ${hero.name} 님의 승리 입니다. 다음 몬스터가 등장 합니다.`;
      }
      hero.hp = hero.maxHp;
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : 0 `;
      $heroExp.textContent = `경험치 : ${hero.exp}/${hero.levelUpExp()}, `;
      monster = null;
      clickBattle();
    } else if (hero.hp > 0 && monster.hp > 0) {
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $monsterHp.textContent = `체력 : ${monster.hp}, `;
      $message.textContent = `${hero.att} 의 데미지를 주고, ${monster.att} 의 데미지를 받았습니다.`;
    }
  } else if (event.target.textContent == '회복') {
    hero.recover(monster);
    if (hero.hp <= 0) {
      $heroHp.textContent = `체력 : ${0}/${hero.maxHp}, `;
      $message.textContent = `${20} 의 체력을 회복하고, ${
        monster.att
      } 의 데미지를 받았습니다. ${
        hero.name
      } 님의 패배로 게임을 다시 시작합니다.`;
      alert('monster의 승리!');
      gameLose();
    } else if (hero.hp > 100) {
      hero.hp = hero.maxHp;
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $message.textContent = `${20} 의 체력을 회복하고, ${
        monster.att
      } 의 데미지를 받았습니다.`;
    } else if (hero.hp > 0) {
      $heroHp.textContent = `체력 : ${hero.hp}/${hero.maxHp}, `;
      $message.textContent = `${20} 의 체력을 회복하고, ${
        monster.att
      } 의 데미지를 받았습니다.`;
    }
  } else if (event.target.textContent == '도망') {
    $message.textContent = `몬스터와의 전투에서 도망 갑니다. 일반 모드로 변경 됩니다.`;

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
    clickReset();
  }
};
$gameMenu.addEventListener('click', clickGameMenu);

// 일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 이벤트를 못 읽도록 만든다.
