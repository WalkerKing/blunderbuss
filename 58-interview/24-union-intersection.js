let arr1 = [1,3,4,5,6,5,2,2]
let arr2 = [-1,3,5,2,10]

// 1. 求并集
console.group('并集计算')
const getUnion1 = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]))
const getUnion2 = (arr1, arr2) => Array.from(new Set(arr1.concat(arr2)))
const getUnion3 = (arr1, arr2) => arr1.concat(arr2.filter(v => !arr1.includes(v)))
console.log(getUnion1(arr1, arr2)) // [ 1, 3, 4, 5, 6, 2, -1, 10 ]
console.log(getUnion2(arr1, arr2)) // [ 1, 3, 4, 5, 6, 2, -1, 10 ]
console.log(getUnion3(arr1, arr2)) // [ 1, 3, 4, 5, 6, 2, 2, -1, 10 ]
console.groupEnd()

// 2. 求交集
console.group('交集计算')
const getIntersection1 = (arr1, arr2) => arr1.filter(v => arr2.includes(v))
const getIntersection2 = (arr1, arr2) => arr1.filter(v => new Set(arr2).has(v))
console.log(getIntersection1(arr1, arr2)) // [ 3, 5, 5, 2, 2 ]
console.log(getIntersection2(arr1, arr2)) // [ 3, 5, 5, 2, 2 ]
console.groupEnd()

// 3. 求差集
console.group('差集计算')
const getSubstraction = (arr1, arr2) => {
    return arr1.concat(arr2).filter(v => {
        if(!arr2.includes(v) || !arr1.includes(v)) {
            return true
        }
    })
}
console.log(getSubstraction(arr1, arr2))
console.groupEnd('差集计算')