/*var people = [['Steven', 'Tyler'], ['George', 'Harrison'], ['Mr.', 'Doob'], ['Dr.', 'Sunshine'], ['John', 'Resig'], ['Brendan', 'Eich'], ['Alan', 'Turing']];
var hashTable = new HashTable();
_.each(people, function(person) {
  var firstName = person[0], lastName = person[1];
  hashTable.insert(firstName,lastName);
});*/

var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this.cellsOccupied = 0;
  this._readjusting = false;
  this._MAX_OCCUPANCY = .75;
  this._MIN_OCCUPANCY = .25;
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined) { 
  	// add linkedList to empty cell
  	this.cellsOccupied++;
  	this._storage.set(i, createHashLinkedList(k, v));
  	this.adjustSize(); 
  } else {
  	this.cellsOccupied++;
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
	this.adjustSize();
	this.cellsOccupied--;
};

HashTable.prototype.getPercentOccupied = function () {
	return this.cellsOccupied / this._limit;
};

HashTable.prototype.rearrange = function (allNodes) {
	var hashTable = this;
	this.cellsOccupied = 0;
	this._readjusting = true;

	//create new storage
	this._storage = LimitedArray(this._limit);

	// add values to new storage
	_.each(allNodes, function(node){
		hashTable.insert(node.key, node.value);
	});

	this._readjusting = false;
};

HashTable.prototype.adjustSize = function () {
	if (!this._readjusting && this.getPercentOccupied() >= this._MAX_OCCUPANCY) {
		// double hash table size
		var allNodes = this.getAllNodes();
		this._limit *= 2;
		this.rearrange(allNodes);
	} else if (!this._readjusting && this.getPercentOccupied() < this._MIN_OCCUPANCY) {
		// halve hash table size
		var allNodes = this.getAllNodes();
		this._limit /= 2;
		this.rearrange(allNodes);
	}
}

HashTable.prototype.getAllNodes = function(){
	var allNodes = [];
	this._storage.each(function (cell) {
		if (typeof cell === 'object') {
			cell.each(function (node) {
				allNodes.push(node);
			});
	 	}
	});
	return allNodes;
}

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

	linkedList.each = function (cb) {
		var initialNode = this.head;
		while (initialNode !== null){
			cb(initialNode);
			initialNode = initialNode.next;
		}
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
 * each - O(n)
 * searchByKey - O(1)
 * removeNodeByKey - O(1)
 * addToTail - O(1)
 * getAllNodes - O(n)
 * adjustSize - O(n)
 * rearrange - O(n)
 * getPercentOccupied - O(1)
 * remove - O(1)
 * retrieve - O(1)
 * insert - O(1)
 * HashTable - O(1)
 */
