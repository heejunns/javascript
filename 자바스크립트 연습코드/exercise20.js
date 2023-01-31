// 나머지 매개변수 구문을 사용하고 전달 받은 모든 수를 더해 반환하는 함수 만들기 

function add(...addfile){
    let total = 0;
    for (let i=0; i<addfile.length; ++i){
        total+=addfile[i];
    }
    console.log(total);
}

add(1,2,3,4,5,6,7,8,9);