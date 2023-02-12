// 텍스트 RPG 게임 클래스 사용해서 만들기

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

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = new Hero(this, name);
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, exp: 10 },
      { name: '주황버섯', hp: 40, att: 20, exp: 20 },
      { name: '예티', hp: 60, att: 30, exp: 60 },
      { name: '주니어발록', hp: 100, att: 40, exp: 100 },
    ];
    this.start();
  }
  start() {
    $heroName.textContent = `캐릭터 이름: ${this.hero.name}, `; // this : Game
    $heroLevel.textContent = `level : ${this.hero.level}, `; // this : Game
    $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `; // this : Game
    $heroExp.textContent = `경험치 : ${
      // this : Game
      this.hero.exp
    }/${this.hero.levelUpExp()}, `;
    $heroAtt.textContent = `공격력 : ${this.hero.att}`; // this : Game
    $gameMenu.addEventListener('click', this.clickGameMenu); // this : Game
    $battleMenu.addEventListener('click', this.clickBattleMenu); // this : Game
    this.changeScreen('game');
  }
  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  clickGameMenu = (event) => {
    // 화살표 함수가 아닌 함수로 정의하면 this 는 $gameMenu 즉 div 입니다.
    if (event.target.textContent == '모험') {
      console.log(this); // Game
      this.changeScreen('battle'); // this : Game
      this.clickBattle(); // this : Game
    } else if (event.target.textContent == '휴식') {
      // 일반 모드에서 휴식 선택 => 캐릭터의 체력을 모두 회복한다. 캐릭터의 최대 체력은 100이다.
      this.hero.hp = this.hero.maxHp; // this : Game
      $heroHp.textContent = `체력 : ${this.hero.hp}/ ${this.hero.maxHp}, `; // this : Game
    } else if (event.target.textContent == '종료') {
      //  일반 모드에서 종료 선택 => 종료 메세지를 보여주며 게임 다시 시작하기 버튼 말고는 아무것도 할 수 없게 만든다. 그리고 모두 초기화 하고 캐릭터 생성 화면으로 돌아간다.
      this.clickReset(); // this : Game
    }
  };
  // 모험 모드를 선택 했을때
  clickBattle = () => {
    console.log(this); // this : Game
    const randomMonster =
      this.monsterList[Math.floor(Math.random() * this.monsterList.length)]; // this : Game
    this.monster = new Monster( // this : Game
      this,
      randomMonster.name,
      randomMonster.hp,
      randomMonster.att,
      randomMonster.exp
    );
    $monsterName.textContent = `몬스터 이름 : ${this.monster.name}, `; // this : Game
    $monsterHp.textContent = `체력 : ${this.monster.hp}, `; // this : Game
    $monsterExp.textContent = `경험치 : ${this.monster.exp}, `; // this : Game
    $monsterAtt.textContent = `공격력 : ${this.monster.att}`; // this : Game
    $message.textContent = `${this.monster.name}이 등장했습니다.`; // this : Game
  };
  // 게임 다시 시작하기 버튼 클릭하면 호출
  clickReset = () => {
    this.changeScreen('start'); // this : Game
    $heroName.textContent = '';
    $heroLevel.textContent = '';
    $heroHp.textContent = '';
    $heroExp.textContent = '';
    $heroAtt.textContent = '';
    this.hero.name = ''; // this : Game
    this.hero.hp = 100; // this : Game
    this.hero.level = 1; // this : Game
    this.hero.exp = 0; // this : Game
    this.hero.att = 10; // this : Game
  };
  // 도망 버튼 클릭 했을때 호출
  clickRun = () => {
    this.changeScreen('game');
    this.monster = null;
    $monsterName.textContent = '';
    $monsterHp.textContent = '';
    $monsterExp.textContent = '';
    $monsterAtt.textContent = '';
    $message.textContent = '';
  };
  gameLose = () => {
    this.clickReset();
    monster = null;
    $monsterName.textContent = '';
    $monsterHp.textContent = '';
    $monsterExp.textContent = '';
    $monsterAtt.textContent = '';
    $message.textContent = '';
  };
  clickBattleMenu = (event) => {
    if (event.target.textContent == '공격') {
      this.hero.attack(this.monster); // Game.hero.attack에 (Game.monster)
      this.monster.attack(this.hero);
      if (this.hero.hp <= 0) {
        this.hero.hp = 0;
        $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `;
        $monsterHp.textContent = `체력 : ${this.monster.hp}, `;
        $message.textContent = `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다. 몬스터의 승리로 게임을 다시 시작합니다.`;
        alert('몬스터의 승리!');
        this.gameLose();
      } else if (this.monster.hp <= 0) {
        if (this.hero.exp + this.monster.exp >= this.hero.levelUpExp()) {
          this.hero.levelUp(this.monster);
          $heroLevel.textContent = `level : ${this.hero.level}, `;
          $heroAtt.textContent = `공격력 : ${this.hero.att}`;
          $message.textContent = `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다. ${this.hero.name} 님의 승리 입니다. levelup 하셨습니다. 다음 몬스터가 등장 합니다.`;
        } else if (this.hero.exp + this.monster.exp < this.hero.levelUpExp()) {
          this.hero.exp += this.monster.exp;
          $message.textContent = `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다. ${this.hero.name} 님의 승리 입니다. 다음 몬스터가 등장 합니다.`;
        }
        this.hero.hp = this.hero.maxHp;
        $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `;
        $monsterHp.textContent = `체력 : 0 `;
        $heroExp.textContent = `경험치 : ${
          this.hero.exp
        }/${this.hero.levelUpExp()}, `;
        this.monster = null;
        this.clickBattle();
      } else if (this.hero.hp > 0 && this.monster.hp > 0) {
        $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `;
        $monsterHp.textContent = `체력 : ${this.monster.hp}, `;
        $message.textContent = `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다.`;
      }
    } else if (event.target.textContent == '회복') {
      this.hero.recover();
      this.monster.attack(this.hero);
      if (this.hero.hp <= 0) {
        $heroHp.textContent = `체력 : ${0}/${this.hero.maxHp}, `;
        $message.textContent = `${20} 의 체력을 회복하고, ${
          this.monster.att
        } 의 데미지를 받았습니다. ${
          this.hero.name
        } 님의 패배로 게임을 다시 시작합니다.`;
        alert('monster의 승리!');
        this.gameLose();
      } else if (this.hero.hp > 100) {
        this.hero.hp = this.hero.maxHp;
        $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `;
        $message.textContent = `${20} 의 체력을 회복하고, ${
          this.monster.att
        } 의 데미지를 받았습니다.`;
      } else if (this.hero.hp > 0) {
        $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `;
        $message.textContent = `${20} 의 체력을 회복하고, ${
          this.monster.att
        } 의 데미지를 받았습니다.`;
      }
    } else if (event.target.textContent == '도망') {
      $message.textContent = `몬스터와의 전투에서 도망 갑니다. 일반 모드로 변경 됩니다.`;

      this.clickRun();
    }
  };
}
class Hero {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.level = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.exp = 0;
    this.levelUpExp = function () {
      return this.level * 15;
    };
    this.att = 10;
    this.attack = function (target) {
      target.hp -= this.att;
    };
    this.recover = function () {
      this.hp += 20;
    };
    this.levelUp = function (target) {
      this.exp += target.exp - this.levelUpExp();
      this.level += 1;
      this.att += 5 * this.level;
    };
  }
}
class Monster {
  constructor(game, name, hp, att, exp) {
    this.game = game;
    this.name = name;
    this.hp = hp;
    this.att = att;
    this.exp = exp;
    this.attack = function (target) {
      // Game.monster
      target.hp -= this.att; // monster.att
    };
  }
}

let game = null;

$startScreen.addEventListener('submit', (event) => {
  // 캐릭터 이름 생성 단계
  event.preventDefault();
  const name = event.target['name-input'].value;
  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  game = new Game(name);
});
