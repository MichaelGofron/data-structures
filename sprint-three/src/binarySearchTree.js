// for console debugging

_ = {};
_.extend = function (obj) {
	for (var i = 0; i < arguments.length; i++) {
		for (var key in arguments[i]) {
			obj[key] = arguments[i][key];
		}
	}
	return obj;
};

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
	},

	breadthFirstLog: function (cb) {
		var queue = [];
		var children = [this];
		var getChildrenOf = function (array) {
			return _.reject(
					_.flatten(
						_.map(children, function (tree) {
							return [tree.left, tree.right];
						})
					), function (value) {
						return value === undefined
					});
		};

		while (children.length > 0) {
			queue = queue.concat(children);
			children = getChildrenOf(children);
		}

		_.each(queue, function (tree) {
			cb(tree);
		});

	},

	depth: function (level) {
		if (this === window) { return 0; }
		level = level + 1 || 1;
		return Math.max(level, BinarySearchTree.prototype.depth.call(this.left, level), BinarySearchTree.prototype.depth.call(this.right, level));
	},

	getMaxLeftOrRight: function (side) { 
		var node = this;
		while (node[side] !== undefined) {
			node = node[side];
		}
		return node;
	},

	getMax: function () {
		return this.getMaxLeftOrRight('right');
	},

	getMin: function () {
		return this.getMaxLeftOrRight('left');
	},

	getParent: function (value) {
		if (this.left.value === value || this.right.value === value) {
			return this;
		}
		if (this.value > value && this.left !== undefined) {
			return this.left.getParent(value);
		}

		if (this.value > value && this.right !== undefined) {
			return this.right.getParent(value);
		}
	},

	rebalance: function () {
		if ((this.left.depth() / this.right.depth()) >= 2) {
			var newRoot = this.left.getMax(),
				newRootParent = this.getParent(newRoot.value);
			// remove newRoot as a leaf
			newRootParent.right = undefined;

			// add left and this to newRoot
			newRoot.left = this.left;
			newRoot.right = this;

			// remove left from this
			this.left = undefined;

			if ((newRoot.left.depth() / newRoot.right.depth()) > 1) {
				newRoot.rebalance();
			}
		}

		if ((this.right.depth() / this.left.depth()) >= 2) {
			var newRoot = this.right.getMin(),
				newRootParent = this.getParent(newRoot.value);

			// remove newRoot as a leaf
			newRootParent.left = undefined;

			// add right and this to newRoot
			newRoot.right = this.right;
			newRoot.left = this;

			// remove right from this
			this.right = undefined;

			if ((this.right.depth() / this.left.depth()) > 1) {
				newRoot.rebalance();
			}
		}
	}
};

/*
	 [10]
   [5     14]
  [3 8][12   18]
 	 [11 13 16	19]	
*/


/*
 * Complexity: What is the time complexity of the above functions?
 */
