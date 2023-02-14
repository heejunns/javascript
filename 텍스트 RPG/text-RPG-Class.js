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
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, exp: 10 },
      { name: '주황버섯', hp: 40, att: 20, exp: 20 },
      { name: '예티', hp: 60, att: 30, exp: 60 },
      { name: '주니어발록', hp: 100, att: 40, exp: 100 },
    ];
    this.start(name);
  }
  start(name) {
    this.hero = new Hero(this, name);
    this.updateHeroState();
    $gameMenu.addEventListener('click', this.clickGameMenu); // this : Game
    $battleMenu.addEventListener('click', this.clickBattleMenu); // this : Game
    this.changeScreen('game');
  }
  changeScreen(screen) {
    // 화면 변경 메서드
    if (screen === 'start') {
      $startScreen.style.display = 'block'; // 시작 화면 block
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block'; // 일반모드 화면 block
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block'; // 전투모드 화면 block
    }
  }

  updateHeroState() {
    // 캐릭터 정보 화면 업데이트 메서드
    if (this.hero == null) {
      // hero 프로퍼티 값이 null 이라면
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroExp.textContent = '';
      $heroAtt.textContent = '';
    } else {
      $heroName.textContent = `캐릭터 이름: ${this.hero.name}, `; // this : Game
      $heroLevel.textContent = `level : ${this.hero.level}, `; // this : Game
      $heroHp.textContent = `체력 : ${this.hero.hp}/${this.hero.maxHp}, `; // this : Game
      $heroExp.textContent = `경험치 : ${
        // this : Game
        this.hero.exp
      }/${this.hero.levelUpExp}, `;
      $heroAtt.textContent = `공격력 : ${this.hero.att}`; // this : Game
    }
  }

  updateMonsterState() {
    // 몬스터 정보 화면 업데이트 메서드
    if (this.monster == null) {
      // monster 프로퍼티 값이 null 이라면
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterExp.textContent = '';
      $monsterAtt.textContent = '';
    } else {
      $monsterName.textContent = `몬스터 이름 : ${this.monster.name}, `; // this : Game
      $monsterHp.textContent = `체력 : ${this.monster.hp}, `; // this : Game
      $monsterExp.textContent = `경험치 : ${this.monster.exp}, `; // this : Game
      $monsterAtt.textContent = `공격력 : ${this.monster.att}`; // this : Game
    }
  }
  updateMessageState(text) {
    // 메세지 변경 메서드
    $message.textContent = text;
  }

  clickGameMenu = (event) => {
    // 일반 모드에서 버튼을 클릭했을때 호출
    // 화살표 함수가 아닌 함수로 정의하면 this 는 $gameMenu 즉 div 입니다.
    if (event.target.textContent == '모험') {
      this.changeScreen('battle'); // this : Game
      this.clickBattle(); // this : Game
    } else if (event.target.textContent == '휴식') {
      // 일반 모드에서 휴식 선택 => 캐릭터의 체력을 모두 회복한다. 캐릭터의 최대 체력은 100이다.
      this.hero.hp = this.hero.maxHp; // this : Game
      this.updateHeroState(); // hero 정보 화면 업데이트
    } else if (event.target.textContent == '종료') {
      this.clickReset(); // this : Game, 모든 정보 초기화
    }
  };
  // 모험 모드를 선택 했을 때
  clickBattle = () => {
    const randomMonster =
      this.monsterList[Math.floor(Math.random() * this.monsterList.length)]; // this : Game
    this.monster = new Monster( // this : Game
      this,
      randomMonster.name,
      randomMonster.hp,
      randomMonster.att,
      randomMonster.exp
    );
    this.updateMonsterState();
    this.updateMessageState(`${this.monster.name} 의 등장 입니다.`);
  };

  clickReset = () => {
    // 전투에서 패배 했거나, 종료 버튼을 클릭해 모두 초기화하고 시작 화면으로 돌아갈때 호출되는 메서드
    this.hero = null;
    this.monster = null;
    this.changeScreen('start'); // this : Game
    this.updateHeroState();
    this.updateMonsterState();
    this.updateMessageState('');
    $gameMenu.removeEventListener('click', this.clickGameMenu); // this : Game
    $battleMenu.removeEventListener('click', this.clickBattleMenu); // this : Game
    game = null;
  };
  // 도망 버튼 클릭 했을 때 호출
  clickRun = () => {
    this.changeScreen('game');
    this.updateMonsterState();
    this.updateMessageState('');
  };
  clickBattleMenu = (event) => {
    if (event.target.textContent == '공격') {
      this.hero.attack(this.monster); // Game.hero.attack에 (Game.monster)
      this.monster.attack(this.hero);
      if (this.hero.hp <= 0) {
        // hero 의 체력이 0 이하일떄
        this.hero.hp = 0;
        this.updateHeroState();
        this.updateMonsterState();
        this.updateMessageState(
          `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다. 몬스터의 승리로 게임을 다시 시작합니다.`
        );

        setTimeout(this.clickReset, 3000); // 3초 후 게임 시작화면으로 돌아감
        // this.clickReset(); // 게임 시작화면으로 돌아감
      } else if (this.monster.hp <= 0) {
        // monster 의 체력이 0 이하일때
        this.hero.getExp(this.monster.exp);
        this.monster.hp = 0;
        console.log(this.hero.levelUpExp);
        this.updateHeroState();
        this.updateMonsterState();
        this.monster = null;
        setTimeout(this.clickBattle, 3000);
        // this.clickBattle();
      } else if (this.hero.hp > 0 && this.monster.hp > 0) {
        // hero, monster 둘다 체력이 0 이상이여서 살아있을 때
        this.updateHeroState();
        this.updateMonsterState();
        this.updateMessageState(
          `${this.hero.att} 의 데미지를 주고, ${this.monster.att} 의 데미지를 받았습니다.`
        );
      }
    } else if (event.target.textContent == '회복') {
      // 회복 버튼 클릭 했을 때
      this.hero.recover(); // 체력 20 회복
      this.monster.attack(this.hero); // monster 가 hero 공격
      if (this.hero.hp <= 0) {
        // hero 체력이 0 이하일때
        this.hero.hp = 0;
        this.updateHeroState();
        this.updateMessageState(
          `${20} 의 체력을 회복하고, ${
            this.monster.att
          } 의 데미지를 받았습니다. ${
            this.hero.name
          } 님의 패배로 게임을 다시 시작합니다.`
        );
        setTimeout(this.clickReset, 3000); // 3초후 게임 시작 화면으로 이동
        // this.clickReset();
      } else if (this.hero.hp > this.hero.maxHp) {
        // hero 의 체력이 100 이상일때
        this.hero.hp = this.hero.maxHp;
        this.updateHeroState();
        this.updateMessageState(
          `${20} 의 체력을 회복하고, ${
            this.monster.att
          } 의 데미지를 받았습니다.`
        );
      } else if (this.hero.hp > 0) {
        // hero 의 체력이 0 이상일때
        this.updateHeroState();
        this.updateMessageState(
          `${20} 의 체력을 회복하고, ${
            this.monster.att
          } 의 데미지를 받았습니다.`
        );
      }
    } else if (event.target.textContent == '도망') {
      // 도망 버튼을 클릭 하였을때
      this.updateMessageState(
        `몬스터와의 전투에서 도망 갑니다. 일반 모드로 변경 됩니다.`
      );
      this.monster = null;

      setTimeout(this.clickRun, 2000); // 3초 후 일반 모드로 변경
      // this.clickRun();
    }
  };
}

class commonProperties {
  // Hero, Monster 클래스에 공통되는 프로퍼티
  constructor(game, name, hp, exp, att) {
    this.game = game; // 서로 상호 작용을 하기 위해서 Game 클래스로 생성한 객체의 this 를 전달
    this.name = name; // hero, monster 이름
    this.hp = hp; // 체력
    this.exp = exp; // 경험치
    this.att = att; // 공격력

    this.attack = function (target) {
      // 공격 메서드
      target.hp -= this.att; // 인수로 넘어오는 hero, monster 의 체력에서 호출한 객체의 공격력을 빼기
    };
  }
}
class Hero extends commonProperties {
  constructor(game, name) {
    super(game, name, 100, 0, 10); // commonProperties 클래스를 호출해 생성
    this.level = 1; // 레벨 프로퍼티
    this.maxHp = 100; // 최대 체력 프로퍼티
    this.levelUpExp = this.level * 15; // 다음 레벨업을 하기위한 얻어야 하는 경험치, 현재 레벨에서 15 곱한 값
    // attack 메서드는 commonProperties 클래스에게 상속받기 떄문에 Hero 클래스로 생성한 객체에서 사용 가능
    this.recover = function () {
      // 회복 메서드, hero 의 체력을 20 회복 하는 메서드
      this.hp += 20;
    };
    this.getExp = function (monsterExp) {
      // 몬스터와의 전투에서 승리해 경험치를 얻으면 호출하는 메서드
      // monsterExp : this.monster.exp 를 인수로 받는다.
      this.exp += monsterExp; // hero 객체 경험치 + monster 객체 경험치
      if (this.exp >= this.levelUpExp) {
        // hero 의 경험치 값이 현재 다음 레벨로 레벨업 할수 있는 경험치 기준보다 크거나 같으면 레벨업!
        this.exp -= this.levelUpExp; // 레벨업에 필요한 경험치를 빼고 남은 나머지 경험치를 계산
        this.level += 1; // 레벨업 +1
        this.att += 5 * this.level; // 공격력은 다음 레벨 곱하기 5 를 한 값을 더합니다.
        this.hp = this.maxHp; // 레벨업을 하면 체력은 다시 100으로 변경됩니다.
        this.levelUpExp = this.level * 15; // 다음 레벨업에 필요한 경험치의 값을 변경된 레벨에 의해서 변경 합니다.
        this.game.updateMessageState(
          // 메세지 업데이트 메서드 호출
          `${this.name} 님의 승리 입니다. levelup 하셨습니다. 3초 후 다음 몬스터가 등장 합니다.`
        );
      } else if (this.exp < this.levelUpExp) {
        // 현재 hero 의 경험치와 잡은 monster 의 경험치의 합이 레벨업을 할 수 있는 경험치 기준을 못넘었을때
        this.game.updateMessageState(
          // 메세지 업데이트 메서드 호출
          `${this.name} 님의 승리 입니다. 3초 후 다음 몬스터가 등장 합니다.`
        );
      }
    };
  }
}
class Monster extends commonProperties {
  constructor(game, name, hp, att, exp) {
    super(game, name, hp, exp, att);
    // attack 메서드 상속
  }
}

let game = null;

$startScreen.addEventListener('submit', (event) => {
  // 캐릭터 이름 생성 단계
  event.preventDefault();
  const name = event.target['name-input'].value; // form 태그 내의 name-input 이름의 태그의 value 값 ,  input 태그에 입력되는 값 name 변수에 저장
  $startScreen.style.display = 'none'; // 시작 화면 none
  $gameMenu.style.display = 'block'; // 일반 모드 화면 block
  game = new Game(name); // game 변수에 new Game 함수에 인수로 name 을 넘겨주면서 객체 생성
});
