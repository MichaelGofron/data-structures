Array.prototype.sortedPush = function(value){
	for (var i = 0; i < this.length; i++){
		if (this[i] > value){
			this.splice(i,0,value);
		}
	}
	return this;
}

var getSortedPosition = function (arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > value) break;
	}

	return i;
};

var BTree = function (value, degree) {
	var bTree = Tree([]);
	bTree.degree = degree;
	_.extend(bTree, BTree.prototype);
	bTree.value.sortedPush(value);
	return bTree;
};

BTree.prototype = {
	depth: function (level) { 
		if (this === window) { return 1; }
		level = level + 1 || 1;
		return Math.max(level, BinarySearchTree.prototype.depth.call(this.left, level), BinarySearchTree.prototype.depth.call(this.right, level));
	},

	//contains
	contains: function (value) {
		if (_.contains(this.value,value)){
			return true;
		}

		for (var i = 0; i < this.children.length; i++){
			if (this.children[i].contains(value)){
				return true;
			}
		}
		return false;
	},

	// insert
	insert: function(value) {
		if (this.children.length === 0) {
			this.value.sortedPush(value);
		}

		if (this.value.length === this.degree) {
			var middleNode = this.value[getMedian(this.value)];
			this.value.splice(getMedian(this.value), 1);
			this.propagateUpwards(middleNode);
		}

		// insert on children
		var childIndex = getSortedPosition(this.value, value);
		this.children[childIndex].insert(value); // recurse down



	},

	//propagateUpwards
	propagateUpwards: function (value) {
		// split child array
	},

	// delete
	delete: function(value) {

	}
}