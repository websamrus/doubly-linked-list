const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if(!this._head) {
            this._head = node;
            this._tail = node;
            this.length++;
          } else {
            if (this._tail) this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
            this.length++;
          } 
          return this;
    }

    head() {
        return (this._head != null)?this._head.data:null;
    }

    tail() {
        return (this._tail != null)?this._tail.data:null;
    }

    at(index) {
        let currentIndex = this._head;
        for (let i = 0; i < index; i++) {
            currentIndex = currentIndex.next;
        }
        return currentIndex.data;
    }

    insertAt(index, data) {
        let node = new Node(data);
        let indexNext = this._head;

        if(index == 0){
            if(!indexNext) return this;
            this._head.prev = node;
            node.next =  this._head
            this._head=node;
            this.length++;
            return this;
        }
        for (let i = 0; i < index; i++) {
            indexNext = indexNext.next;
        }
        if(indexNext){
            node.prev = indexNext.prev
            indexNext.prev.next=node;
            node.next=indexNext;
            indexNext.prev=node;
            this.length++;
        }
        return this;
    }

    

    isEmpty() {
        return this.length < 1
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let indexCurrent = this._head;
        
        if(index == 0){
            if(indexCurrent)return this;
            this._head =  this._head.next;
            this._head.prev =  null;
            this.length--;
            return this;
        }
        if(index == this.length-1){
            this._tail = this._tail.prev;
            this._tail.next =  null;
            this.length--;
            return this;
        }
        for (let i = 0; i < index; i++) {
            indexCurrent = indexCurrent.next;
        }
        if (!indexCurrent) return this;
        indexCurrent.next.prev = indexCurrent.prev;
        indexCurrent.prev.next = indexCurrent.next;
        this.length--;
        return this;
    }

    reverse() {
        let temp =  new LinkedList();
        for (let i = this.length - 1; i >= 0; i--) {
            temp.append(this.at(i));
        }
        this._head = temp._head;
        this._tail = temp._tail;

        return this;
    }

    indexOf(data) {
        let indexCurrent = this._head;
        for (let i = 0; i < this.length; i++) {
            if(indexCurrent.data === data) return i;
            indexCurrent = indexCurrent.next;
        }
        return -1;
    }


}

module.exports = LinkedList;
