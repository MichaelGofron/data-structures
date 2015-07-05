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

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

 // removeHead and addToTail = O(1)
 // contains = O(n)
