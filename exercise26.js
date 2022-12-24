// 함수를 리턴 값으로 반환 할수도 있다.

function introFun(name,isBoolean){

    return isBoolean ? function (){
        console.log(`안녕하세요 저의 이름은 ${name} 입니다.`);
    }: function (){
        console.log(`안녕하세요 저의 이름은 ${name} 입니다!!! 반갑습니다!!!`);
    }
}

const mikeIntro = introFun("mike",true);
const sonIntro = introFun("son",false);

mikeIntro();
sonIntro();