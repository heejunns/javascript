// 함수에서 배열로 반환받기

function getSize(width, heigth, depth){
    let area = width * heigth;
    let volume = width * heigth* depth;

    return [area, volume];
}

console.log("area and volume "+ getSize(3,3,3));