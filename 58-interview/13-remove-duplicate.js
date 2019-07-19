let arr = [1, 2, 4, 5, 1, 7, 4]
// 第一种方法:
// console.log(Array.from(new Set(arr)))
// 第二种方法:
// let hash = []
// for(let i in arr) {
//     hash[arr[i]] = 1
// }
// let newArr = []
// for(let i in hash) {
//    newArr.push(i) 
// }
// console.log(newArr)
let newArr = []
// 第三种方法
// 1. 遍历arr,取出一个元素
// 2. 拿到这个元素,遍历其后的数组元素
// 3. 如果发现有与这个元素相同的元素,那么i++,继续执行外层遍历
// for (let i in arr) {
//     let flag = true;
//     for (let j = i + 1; j < arr.length; j++) {
//         if (arr[i] === arr[j]) {
//             i++;
//             flag = false;
//             break;
//         }
//     }
//     if (flag) {
//         newArr.push(arr[i])
//     }
// }

function removeDuplicate(arr) {
    return arr.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur] 
    }, [])
}

console.log(removeDuplicate(arr))
console.log(arr)