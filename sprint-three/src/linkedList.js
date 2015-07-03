var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var node = Node(value);
    if (list.head === null) {
      list.head = node;
    }

    if (list.tail !== null) {
      list.tail.next = node;
    }
    list.tail = node;
  };

  list.removeHead = function(){
    var removedNode = list.head;
    if (list.head){
      list.head = list.head.next;
    }
    return removedNode.value;
  };

  list.contains = function(target){
    var initialNode = list.head;
    while (initialNode !== null) {
      if (initialNode.value === target) return true;
      initialNode = initialNode.next;
    }
    return false;
  };

  return list;

};

var Node = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

var DoublyLinkedList = function () {
  var list = LinkedList();

  list.addToHead = function (value) {
    var node = Node(value); // add previous,
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.previous = node;
      node.next = this.head;
      this.head = node;
    }
  };

  list.addToTail = function (value) {
    var node = Node(value);
    if (list.head === null) {
      list.head = node;
    }

    if (list.tail !== null) {
      node.previous = list.tail;
      list.tail.next = node;
    }
    
    list.tail = node;
  };

  list.removeTail = function(){
    var removedNode = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;
    return removedNode.value;
  };

  return list; 
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

 // removeHead and addToTail = O(1)
 // contains = O(n)
