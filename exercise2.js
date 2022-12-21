// 문자열 내에 특정 문자열이 있는지 판단하기, indexOf() 사용하기

function isChicken(str) {
    if (str.indexOf("치킨") > -1){
        console.log("문자열에 치킨이 포함되어 있습니다.");
    } else {
        console.log("문자열에 치킨이 포함되어 있지 않습니다.");
    }

}

isChicken("나는 치킨을 좋아합니다.");
isChicken("저는 피자를 좋아합니다.");
isChicken("저는 치킨과 피자를 좋아합니다.");