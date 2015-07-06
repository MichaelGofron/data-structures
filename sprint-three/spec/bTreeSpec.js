describe('b-Tree', function() {
  var bTree;

  beforeEach(function() {
    bTree = BTree(5);
  });

  it('should have methods named "insert" and "delete"', function() {
    expect(bTree.insert).to.be.a("function");
    expect(bTree.delete).to.be.a("function");
  });

  it('should insert values',function(){
  	bTree.insert(10);
  	bTree.insert(20);
  	expect(bTree.contains(10)).to.be(true);
  	expect(bTree.contains(20)).to.be(true);
  });
});
