'use strict';

class listNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {

    constructor() {
        this._length = 0;
        this.head = null;
    }

    //Remove element in position at(index)
    removeAt(index) {
        let node = this.head,
            count = 0,
            prevNode,
            nextNode = node.next;

        while (node !== null) {


            if (count === index) {
                if (prevNode) {
                    prevNode.next = nextNode;
                } else {
                    this.head = nextNode;
                }
                this._length -= 1;
                break;
            }
            prevNode = node;
            node = node.next;
            nextNode = node.next;
            count += 1;
        }
        return node.value;
    }

    //Return element in position at(index) or change it with value at(index, value)
    at(index, value) {
        let node = this.head,
            count = 0;

        while (node !== null) {

            if (count === index) {
                if (typeof value === 'undefined') {
                    return node.value;
                } else {
                    node.value = value;
                    return this;
                }
            }
            node = node.next;
            count += 1;
        }

    }

    //Print like a Array
    toArray() {
        let arr = [],
            node = this.head;

        while (node !== null) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }

    //Print like a Linked List
    toString() {
        let toStr = '',
            node = this.head;

        while (node !== null) {
            toStr += node.value;

            node = node.next;
            if (node !== null) {
                toStr += ' -> ';
            }

        }
        return toStr;
    }

    //Add elements to index of LinkedList
    insert(...args) {
        let index = args.shift(0),
            count = 0,
            prevNode,
            nextNode,
            node = this.head;

        if (index === 0) {
            return this.prepend(...args);
        }

        while (node !== null) {
            if (count === index - 1) {
                prevNode = node;
                nextNode = node.next;
                break;
            }
            node = node.next;
            count += 1;
        }

        for (let i = 0, len = args.length; i < len; i += 1) {
            node = new listNode(args[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        prevNode.next = nextNode;

        return this;
    }

    //Add elements to end of LinkedList
    append(...elements) {
        let listLength = this.length,
            node = new listNode(elements[0]),
            prevNode;

        if (listLength > 0) {
            this.lastNode.next = node;
        } else {
            this.head = node;
        }

        this._length += 1;
        prevNode = node;

        for (let i = 1, len = elements.length; i < len; i += 1) {
            node = new listNode(elements[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        return this;
    }

    //Add elements to Start of LinkedList
    prepend(...elements) {
        let oldHeadNode,
            node = new listNode(elements[0]),
            prevNode;

        if (this.length > 0) {
            oldHeadNode = this.head;
        }

        this.head = node;
        this._length += 1;
        prevNode = node;

        for (let i = 1, len = elements.length; i < len; i += 1) {
            node = new listNode(elements[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        prevNode.next = oldHeadNode;

        return this;
    }

    get length() {
        return this._length;
    }

    get first() {
        return this.head.value;
    }


    get last() {
        let node = this.head,
            lastElem;

        while (node !== null) {
            lastElem = node.value;
            node = node.next;
        }

        return lastElem;
    }

    //Last node in Linked List
    get lastNode() {
        let node = this.head,
            lastNode;

        while (node !== null) {
            lastNode = node;
            node = node.next;
        }
        return lastNode;
    }
}

module.exports = LinkedList;