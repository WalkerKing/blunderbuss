let arr = [1,2,4,5,1,7,4]

// console.log(Array.from(new Set(arr)))

let hash = []
for(let i in arr) {
    hash[arr[i]] = 1
}
let newArr = []
for(let i in hash) {
   newArr.push(i) 
}
console.log(newArr)