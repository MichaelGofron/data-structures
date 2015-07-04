describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a("function");
    expect(binarySearchTree.contains).to.be.a("function");
    expect(binarySearchTree.depthFirstLog).to.be.a("function");
  });

  it('should insert values at the correct location in the tree', function(){
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree = binarySearchTree.insert(7);
    binarySearchTree = binarySearchTree.insert(6);
    
    // expect(binarySearchTree.value).to.equal(5);
    // expect(binarySearchTree.right.right.value).to.equal(7);
  
    expect(binarySearchTree.value).to.equal(5);
    expect(binarySearchTree.right.left.value).to.equal(6);
    
  });

  it('should have a working "contains" method', function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([3,2,5]);
  });

  it('should log nodes contained in the tree using a breadth-first approach', function () {
    var string = "";
    binarySearchTree = binarySearchTree.insert(4);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(1);
    binarySearchTree = binarySearchTree.breadthFirstLog(function (tree) {
      string += tree.value;
    });
    expect(string).to.equal('32514');
  });

  it('should rebalance a tree as soon as the max depth is more than twice the minimum depth',function(){
    binarySearchTree.insert(1);
    binarySearchTree.insert(10);
    binarySearchTree.insert(20);
    binarySearchTree.insert(30);
    binarySearchTree.insert(40);
    binarySearchTree.insert(50);

    expect(binarySearchTree.depth()).to.equal(2);
  });
});
