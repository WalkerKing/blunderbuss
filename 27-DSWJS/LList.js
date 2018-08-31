/*
设计一个基于对象的链表
包含两个类，Node类用来表示节点，LinkedList类提供了插入节点、删除节点、显示列表元素的方法，以及一些辅助方法
*/

/*
Node类：
包含两个属性：element用来保存节点上的数据，next用来保存指向下一个节点的链接
*/
class Node {
	constructor(element){
		this.element = element;
		this.next = null;
	}	
}
/*
LinkedList类：
LList类提供了对链表进行操作的方法。该类的功能包括插入删除节点、在列表中查找给定的值。
该类也有一个构造函数，链表只能有一个属性，那就是使用一个Node对象来保存该链表的头节点。
*/
class LList {
	constructor() {
		this.head = new Node('head');
	}
	//首先实现find方法
	find(item) {
		let currNode = this.head;

		while(currNode.element != item){
			currNode = currNode.next;
		}
		return currNode;
	}
	//实现insert方法
	insert(newElement, item) {
		let newNode = new Node(newElement);
		let current = this.find(item);
		newNode.next = current.next;
		current.next = newNode;
	}
	//实现display方法
	display() {
		let currNode = this.head;
		while(!(currNode.next === null)){
			console.log(currNode.next.element);
			currNode = currNode.next;
		}
	}
	//实现删除方法
	remove(item) {
		var prevNode = this.findPrevious(item);
		if(!(prevNode.next === null)){
			prevNode.next = prevNode.next.next;
		}
	}
	//为配合删除方法实现一个查找给定节点前一个节点的方法
	findPrevious(item) {
		var currNode = this.head;
		while(!(currNode.next === null) && 
				!(currNode.next.element === item)){
			currNode = currNode.next;
		}
		return currNode;
	}
}


/******以下是测试代码******/
let cities = new LList();
cities.insert('Conway', 'head');
cities.insert('Beijing', 'Conway');
cities.insert('Zhengzhou', 'Beijing');
cities.insert('Shanghai', 'Beijing');
cities.insert('Changsha', 'Shanghai');
cities.display();
console.log('-----------------');
cities.remove('Changsha');
cities.display();