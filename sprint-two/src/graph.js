var Vertex = function(value){
	this.edges = [];
	this.value = value;
};

var Graph = function(){
	this.nodes = [];
};

Graph.prototype.addNode = function(node){
	this.nodes.push(new Vertex(node));
};

Graph.prototype.contains = function(node){
	for (var i = 0; i < this.nodes.length; i++){
		if (this.nodes[i].value === node) return true;
	}
	return false;
};

Graph.prototype.removeNode = function(node){
	this.nodes = _.reject(this.nodes, function(element){
		return element.value === node;
	});
};

Graph.prototype.findVertex = function (value) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].value === value) return this.nodes[i];
	}
};

Graph.prototype.hasEdge = function(fromNode, toNode){
	fromNode = this.findVertex(fromNode);
	toNode = this.findVertex(toNode);
	return _.contains(fromNode.edges, toNode);
};

Graph.prototype.addEdge = function(fromNode, toNode){
	fromNode = this.findVertex(fromNode);
	toNode = this.findVertex(toNode);
	toNode.edges.push(fromNode);
	fromNode.edges.push(toNode);
};

Graph.prototype.removeEdge = function(fromNode, toNode){
	fromNode = this.findVertex(fromNode);
	toNode = this.findVertex(toNode);
	fromNode.edges = _.reject(fromNode.edges, function(edge){
		return edge === toNode;
	});
	toNode.edges = _.reject(toNode.edges, function(edge){
		return edge === fromNode;
	});
};

Graph.prototype.forEachNode = function(cb){
	_.each(this.nodes, function (node) {
		cb(node.value);
	});
};

/*
 * Complexity: What is the time complexity of the above functions?
 * 
 * forEachNode - O(n)
 * removeEdge - O(n)
 * addEdge - O(n)
 * hasEdge - O(n)
 * findVertex - O(n)
 * removeNode - O(n)
 * contains - O(n)
 * addNode - O(1)
 */



