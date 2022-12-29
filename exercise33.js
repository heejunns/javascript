// arguments 
function sum(){
    let sum = 0;
    for(let i=0; i<arguments.length; ++i){
        console.log(arguments[i]);
        sum+=arguments[i];
    }
    return sum;
}

const result = sum(1,2,3,4,5,6);

console.log(result);

 