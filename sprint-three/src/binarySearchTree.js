var BinarySearchTree = function(value){
	var bst = {};

	bst.value = value;
	bst.left;
	bst.right;

	return _.extend(bst, BinarySearchTree.prototype);
};

BinarySearchTree.prototype = {
	insert: function (value) {
		if (this.value > value){
			if (this.left === undefined) {
				this.left = BinarySearchTree(value);
			} else {
				this.left.insert(value);
			}
		} else {
			if (this.right === undefined){
				this.right = BinarySearchTree(value);
			} else{
				this.right.insert(value);
			}
		}
	},
	contains: function (value) {
		if (this.value === value) {
			return true;
		}
		if (this.value > value) {
			return (this.left !== undefined) ? this.left.contains(value) : false;
		} else {
			return (this.right !== undefined) ? this.right.contains(value) : false;
		}
	},
	depthFirstLog: function (cb) {
		cb(this.value);
		if (this.left !== undefined){
			this.left.depthFirstLog(cb);
		}
		if (this.right !== undefined){
			this.right.depthFirstLog(cb);
		}
	}
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
