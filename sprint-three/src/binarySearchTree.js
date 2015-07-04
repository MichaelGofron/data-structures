

var BinarySearchTree = function(value){
	var bst = {};

	bst.value = value;
	bst.left;
	bst.right;
	bst.head;

	return _.extend(bst, BinarySearchTree.prototype);
};

BinarySearchTree.prototype = {
	insert: function (tree, readjust) {
		if (typeof tree !== 'object') {
			tree = BinarySearchTree(tree);
		}

		if (this.value > tree.value){
			if (this.left === undefined) {
				this.left = tree;
			} else {
				this.left.insert(tree, true);
			}
		} else {
			if (this.right === undefined){
				this.right = tree;
			} else{
				this.right.insert(tree, true);
			}
		}
		
		if (!readjust){
			return this.rebalance();
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
		if (this === window) { return 1; }
		level = level + 1 || 1;
		return Math.max(level, BinarySearchTree.prototype.depth.call(this.left, level), BinarySearchTree.prototype.depth.call(this.right, level));
	},

	rebalance: function () {
		var depthOfLeft = BinarySearchTree.prototype.depth.call(this.left);
		var depthOfRight = BinarySearchTree.prototype.depth.call(this.right);
		var self = this;

		if ((depthOfLeft / depthOfRight) >= 2 || (depthOfRight / depthOfLeft) >= 2) { //check
			var balancedTree;
			var getMedian = function(array){
				return Math.floor(array.length / 2);
			};
			var sortTrees = function () {
				var trees = [];
				self.breadthFirstLog(function (tree) {
					trees.push(tree);
				});
				return _.sortBy(trees, function (tree) {
					return tree.value;
				});
			}

			var insertMedians = function(array){
				if (array.length === 0) {
					return;
				}

				if (balancedTree === undefined) {
					balancedTree = array[getMedian(array)];
				} else {
					balancedTree.insert(array[getMedian(array)], true); // add boolean
				}
				insertMedians(array.slice(0, getMedian(array)));
				insertMedians(array.slice(getMedian(array) + 1));
			};

			var trees = sortTrees();
			_.each(trees,function(tree){
				tree.left = undefined;
				tree.right = undefined;
			});
			
			insertMedians(trees);
			return balancedTree;
		};
		return this;
	}
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

/*
var tree = new BinarySearchTree(5);
tree.insert(1);
tree.insert(10);
tree.insert(20);
//tree.insert(1);
 
var t20 = new BinarySearchTree();
var t15 = new BinarySearchTree();
var t18 = new BinarySearchTree();
var t19 = new BinarySearchTree();
var t21 = new BinarySearchTree();
var t17 = new BinarySearchTree();
var t16 = new BinarySearchTree();
*/
/*
var tree = BinarySearchTree(20)
treeaddLeaf(10)
treeaddLeaf(25)
var root = BinarySearchTree(15)
treeaddLeaf(root)
treeaddLeaf(13)
*/