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

    insert(...args) { //Add elements to index of LinkedList
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

    append(...elements) { //Add elements to end of LinkedList
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

    prepend(...elements) { //Add elements to Start of LinkedList
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