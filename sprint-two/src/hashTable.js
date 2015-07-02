var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === null || this._storage.get(i) === undefined){
  	this._storage.set(i, createHashLinkedList(k, v));
  } else {
  	this._storage.get(i).addToTail(k, v);
  }
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(i).searchByKey(k);
};

HashTable.prototype.remove = function(k){
	var i = getIndexBelowMaxForKey(k, this._limit);
	this._storage.get(i).removeNodeByKey(k);
};

var hashLinkedList = function () {
	var linkedList = LinkedList();
	
	linkedList.addToTail = function (key, value) {
		var node = hashNode(key, value);
	  	if (this.head === null) {
      		this.head = node;
    	}

    	if (this.tail !== null) {
      		this.tail.next = node;
    	}
    	this.tail = node;
	};

	linkedList.removeNodeByKey = function (key) {
		var initialNode = this.head;
		if (initialNode.next === null) {
			this.removeHead();
			return;
		}
		while (initialNode !== null && inititalNode.next && initialNode.next.key !== key){
			initialNode = initialNode.next;
		}
		if (initialNode.next !== null) {
			initialNode.next = initialNode.next.next;
		} 
	};

	linkedList.searchByKey = function(key){
		var initialNode = this.head;
		while (initialNode !== null){
			if (initialNode.key === key){
				return initialNode.value;
			}
			initialNode = initialNode.next;
		}
		return initialNode;
	};

	return linkedList;
};


var createHashLinkedList = function (key, value) {
  var list = hashLinkedList();
  list.addToTail(key, value);
  return list;
};

var hashNode = function (key, value) {
	var node = Node(value);
	node.key = key;
	return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 *
 * hashNode - O(1)
 * createHasLinkedList - O(1)
 * searchByKey - O(1)
 * removeNodeByKey - O(1)
 * addToTail - O(1)
 * remove - O(1)
 * retrieve - O(1)
 * insert - O(1)
 */
