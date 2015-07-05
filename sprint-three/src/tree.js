var Tree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;

  newTree.children = []; 

  return _.extend(newTree, treeMethods);
};





var treeMethods = {};

treeMethods.addChild = function(value){
	var childTree = Tree(value);
	childTree.parent = this;
	this.children.push(childTree);
};

treeMethods.contains = function(target){
	var isIn = false;
	if (this.value === target) {
		return true;
	}

	_.each(this.children, function (tree) {
		if (tree.contains(target)) {
			isIn = true;
		};
	});

	return isIn;
};

treeMethods.removeFromParent = function () {
	var self = this;
	this.parent.children = _.reject(self.parent.children, function (child) {
		return child === self;
	});
	this.parent = null;
};

treeMethods.traverse = function(cb) {
	var self = this;
	cb(this.value);
	_.each(self.children, function (child) {
		child.traverse(cb);
	});
};

/*
 * Complexity: What is the time complexity of the above functions?
 * addChild - O(1)
 * contains - O(n)
 */

