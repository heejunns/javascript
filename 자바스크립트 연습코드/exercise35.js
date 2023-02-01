// 클로져
let z = 100;
function outeFunc (){
    //let x = 10;
    function innerFunc(){
        console.log(z);
    }

    innerFunc();

}

outeFunc();
