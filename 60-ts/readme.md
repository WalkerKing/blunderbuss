1. 类静态部分与示例部分的区别

```
interface ClockInterface {
    tick();
}

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

2. 接口继承类
```
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。 为什么这里报错?如果私有变量必须实现,那其他继承自Control的实例为什么没有报错
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```
3. 以下两种方式创建的对象有何区别
```
let sam = new Snake('Sammy the python');
let tom: Animal = new Horse('Tommy the Palomino');
```