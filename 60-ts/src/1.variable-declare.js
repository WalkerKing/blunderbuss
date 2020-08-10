var _a = { a: 123, b: 'abc' }, aa = _a.a, b = _a.b;
console.log(aa);
// function f({ a, b }: C): void {
//     console.log(a, b)
// }
// f({ a: '12' });
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
function f(_a) {
    var _b = _a === void 0 ? { a: '' } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    // ...
    console.log(a, b);
}
f({ a: '123', b: 345 });
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var param = {
    label: 'Name',
    size: 4
};
printLabel(param);
