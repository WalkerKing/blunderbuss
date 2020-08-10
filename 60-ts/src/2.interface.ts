// 可索引类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];
let myStr: string = myArray['0'];
console.log(myStr)

// 类类型
// interface ClockInterface {
//     currentTime: Date;
//     setTime(d: Date);
// }
// class Clock implements ClockInterface {
//     currentTime: Date;
//     setTime(d: Date) {
//         this.currentTime = d;
//     }
//     constructor(h: number, m: number) {

//     }
// }

// 类静态部分与示例部分的区别

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

// 继承接口
interface Shape {
    color: string;
}
// interface Square extends Shape {
//     sideLength: number;
// }
// let square = <Square>{};
// square.color = 'blue';
// square.sideLength = 10;
interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square = <Square>{};
square.color = 'blue';
square.penWidth = 10;
square.sideLength = 2;

// 一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {};
    counter.interval = 1;
    counter.reset = function() {}; 
    return counter;
}

let c = getCounter();
c(10);
console.log(c.interval)

// 接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {}
}
class TextBox extends Control {
    select() {}
}
// class Image implements SelectableControl {
//     select() {}
// }