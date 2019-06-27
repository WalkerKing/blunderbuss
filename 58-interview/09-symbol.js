// Symbol.hasInstance
class MyClass {
    [Symbol.hasInstance](foo) {
        console.log('调用了Symbol.hasIntance属性指向的方法')
        return foo instanceof Array;
    }
}
console.log([1,2,3] instanceof new MyClass())


