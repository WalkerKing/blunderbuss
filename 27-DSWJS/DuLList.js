/*
尽管从链表的头节点遍历到尾节点很简单，但反过来，从后向前遍历则没那么简单。通过给Node对象增加一个属性，该属性存储指向前驱节点的链接，这样就容易多了。此时向链表插入一个节点需要更多的工作，我们需要指出该节点正确的前驱和后继。但是在从链表中删除节点时效率提高了，不需要再查找待删除节点的前驱节点了。

*/
//先写一个工具方法
const print = str => {
	console.log(str);
}
//双向链表的实现
//注意这明显是一个有bug的双向链表实现

class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
		this.previous = null;
	}
}

class DuLList {
	constructor() {
		this.head = new Node('head');
	}

	//插入方法
	insert(newElement, item) {
		let newNode = new Node(newElement);
		let currNode = this.find(item);
		newNode.next = currNode.next;
		newNode.previous = currNode;
		// currNode.next.previous = newNode;	//p77 为什么没有这一步？
		currNode.next = newNode;
	}

	//查找方法
	find(element) {
		let currNode = this.head;
		while(!(currNode.element === element)) {
			currNode = currNode.next;
		}
		return currNode;
	}

	//display方法
	display() {
		let currNode = this.head;
		while(!(currNode.next === null)){
			print(currNode.next.element);
			currNode = currNode.next;
		}
	}

	//删除节点方法
	remove(item) {
		let currNode = this.find(item);
		if(!(currNode.next === null)){
			currNode.next.previous = currNode.previous;
			currNode.previous.next = currNode.next;
			currNode.previous = null;
			currNode.next = null;
		}
	}

	//查找最后一个节点
	findLast() {
		let currNode = this.head;
		while(!(currNode.next === null)) {
			currNode = currNode.next;
		}
		return currNode;
	}

	//反序显示双向链表的元素
	dispReverse() {
		let currNode = this.findLast();
		while(!(currNode.previous === null)) {
			print(currNode.element);
			currNode = currNode.previous;
		}
	}
}


/*以下是测试代码*/

let cities = new DuLList();
cities.insert('Conway', 'head');
cities.insert('Beijing', 'Conway');
cities.insert('Zhengzhou', 'Conway');
debugger;
// print(cities.find());
// cities.insert('Shanghai', 'Beijing');
// cities.insert('Changsha', 'Shanghai');
cities.display();
print('--------------');
cities.dispReverse();