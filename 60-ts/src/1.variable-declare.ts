let { a: aa, b }: { a: number, b: string } = { a: 123, b: 'abc' };
console.log(aa);

// 函数声明
type C = { a: string, b?: number }
// function f({ a, b }: C): void {
//     console.log(a, b)
// }
// f({ a: '12' });

function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

function f({ a, b = 0 }: C = { a: '' }): void {
    // ...
    console.log(a, b)
}
f({ a: '123', b: 345 })

function printLabel(labelledObj: {label: string}): void {
    console.log(labelledObj.label)
}
let param = {
    label: 'Name',
    size: 4
}
printLabel(param)