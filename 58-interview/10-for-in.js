let arr = [1,3,4,5]
arr.abc = 'abc'
/*
for(let i in arr){
    console.log(arr[i])
}

for(let item of arr){
    console.log(item)
}

*/


let obj = {
    a: 1,
    b: 2,
    c: 3
}
obj[Symbol.iterator] = function* () {
    yield 4;
    yield 5;
    yield 6;
}
// console.log(...obj)
for(let item of obj){
//    console.log(item)
}

