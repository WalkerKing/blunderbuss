let arr = [682, 925, 118, 813, 888, 734, 748, 254, 986, 183]
// arr = [ 118, 183, 254, 682, 734, 748, 813, 888, 925, 986 ]
// for(let i = 0; i < 10; i++){
//     arr.push(Math.floor(Math.random()*1000))
// }

function bubbleSort(arr) {
    for (let i = arr.length; i > 1; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            // console.log(`i=${i}:${arr}`);
        }
    }
}
// bubbleSort(arr);
// console.log(arr);

// 选择排序从数组的开头开始，将第一个元素和其他元 素进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从 第二个位置继续。这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便 完成了排序。
// 选择排序会用到嵌套循环。外循环从数组的第一个元素移动到倒数第二个元素;内循环从第 二个数组元素移动到最后一个元素，查找比当前外循环所指向的元素小的元素。每次内循环 迭代后，数组中最小的值都会被赋值到合适的位置。
function selectionSort(arr) {
    var min, temp;
    for (let i = 0; i < arr.length - 1; i++) {
        min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}
// selectionSort(arr)
// console.log(arr)

function insertionSort(arr) {
    let temp;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {

        }
    }
}

// 快速排序
let arr = [682, 925, 118, 813, 888, 734, 748, 254, 986, 183]
const quickSort = function (list) {
    if(list.length === 0){
        return []
    }
    let mid = list.pop();
    let lesser = [];
    let greater = [];
    list.forEach(v => {
        if(v > mid){
            greater.push(v)
        }else{
            lesser.push(v)
        }
    })
    
    return [...quickSort(lesser), mid, ...quickSort(greater)]
}

console.log(quickSort(arr));