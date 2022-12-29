// 생성자 만들기 

function MakeIntro(name){
    this.name = name;
    this.introduce = function (){
        console.log("저의 이름은 "+this.name+" 입니다.");
    }

}

const person1 = new MakeIntro("kane");
console.log(person1);
console.log(person1.name);
person1.introduce();
