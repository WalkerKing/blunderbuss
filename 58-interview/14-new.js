function newFun(){
    let target = {};
    let [constructor, ...args] = [...arguments];
    Object.setPrototypeOf(target, constructor.prototype);

    let result = constructor.apply(target, args);
    if(result && typeof result === 'object' || typeof result === 'function') {
        return result
    }
    return target   
} 

let Parent = function(a,b,c) {
    this.a = a;
    this.b = b;
    this.c = c;
}
Parent.prototype.d = 'd'

let son = newFun(Parent, 1,3,4)
console.log(son)