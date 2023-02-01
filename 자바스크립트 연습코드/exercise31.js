// 메소드 내부의 this는 메소드를 소유한 객체에 바인딩 된다.

let obj1 = {
    name : "son",
    sayName : function (){
        console.log(this.name);
    } , 

}

let obj2 = {
    name : "kane",
}

obj2.sayName = obj1.sayName;

obj2.sayName(); // kane 출력 