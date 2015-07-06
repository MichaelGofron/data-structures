describe('bloomFilter', function(){
  var bloomFilter;

  beforeEach(function(){
    bloomFilter = new BloomFilter();
  });

  it('should exist',function(){
    expect(bloomFilter).to.equal(bloomFilter);
  });

  it('should have 18 slots and 3 hash functions', function() {
    expect(bloomFilter._storage.length).to.equal(18);
    expect(bloomFilter._hashFunctions.length).to.equal(3);
  });

  it('should be able to tell if a string might be in the set',function(){
    var string = "Bill";
    bloomFilter.add(string);
    expect(bloomFilter.possiblyInSet(string)).to.equal(true);
  });

  // Can sometimes say that a string is maybe in the set just by chance, need more
  // storage to ensure it works properly
  it('should be able to say that a string is definitely not in the set',function(){
    bloomFilter.add("Bill");
    bloomFilter.add("Bob");
    console.log(bloomFilter._storage);
    expect(bloomFilter.possiblyInSet("Yo")).to.equal(false);
  });

});