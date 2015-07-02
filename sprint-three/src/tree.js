var Tree = function(value){
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me

  return _.extend(newTree, treeMethods);
};





var treeMethods = {};

treeMethods.addChild = function(value){
	this.children.push(Tree(value));
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


/*
 * Complexity: What is the time complexity of the above functions?
 * addChild - O(1)
 * contains - O(n)
 */

