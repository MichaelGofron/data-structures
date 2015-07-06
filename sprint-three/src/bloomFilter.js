var BloomFilter = function(){
  this._storage = [];
  this._filterSize = 18;
  for (var i = 0; i < this._filterSize; i++){
    this._storage[i] = false;
  }
  this._hashFunctions = [];
  this._numHashes = 3;

  // Push all the different hash functions into an array for easy access
  this._hashFunctions.push(this.originalHash);
  this._hashFunctions.push(this.universalHash);
  this._hashFunctions.push(this.djb2);
}


BloomFilter.prototype = {
  add: function(value){
    var hashIndices = this.multipleHash(value);
    var self = this;
    _.each(hashIndices,function(hashVal){
      self._storage[hashVal] = true;
    });
  },

  multipleHash: function(value){

    var hashedValues = [];
    var self = this;
    _.each(self._hashFunctions,function(hashFunction){
      hashedValues.push(hashFunction(value,self._filterSize));
    });

    return hashedValues;
  },

  possiblyInSet: function(value){
    var hashIndices = this.multipleHash(value);
    var self = this;
    var maybeInSet = true;

    console.log(hashIndices);
    console.log(this._storage);

    _.each(hashIndices,function(i){
      if (!self._storage[i]) 
        maybeInSet = false;
    });
    return maybeInSet;
  },

  // reset readjust
  readjust: function(){
    console.log("readjusting in bloomFilter");
    return undefined;
  },


  originalHash: function(str, max){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash<<5) + hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    return hash % max;
  },

  // 2nd hash function
  /**
   * Universal Hash
   */
  universalHash: function(s, tableSize) {
    var b = 27183, h = 0, a = 31415;

    if (tableSize > 1) {
      for (i = 0; i < s.length; i++) {
        h = (a * h + s[i].charCodeAt()) % tableSize;
        a = ((a % tableSize) * (b % tableSize)) % (tableSize);
      }
    }

    return h;
  },

  /**
   * djb2 Hash
   * Source: http://www.cse.yorku.ca/~oz/hash.html
   */
  djb2: function(s, tableSize) {
    var b = '', i, hash = 5381;

    for (i = 0; i < s.length; i++) {
      b += deciToBin(s[i].charCodeAt());
    }

    for (i = 0; i < b.length; i++) {
      if (b[i] == '1') {
        hash = ((hash << 5) + hash) + 1;
      } else {
        hash = ((hash << 5) + hash) + 0;
      }
    }

    return Math.abs(hash) % tableSize;
  }, 



}

function deciToBin(arg) {
  res1 = 999;
  args = arg;
  while(args>1) {
    arg1 = parseInt(args/2);
    arg2 = args%2;
    args = arg1;
    if(res1 == 999) {
      res1 = arg2.toString();
    } else {
      res1 = arg2.toString()+res1.toString();
    }
  }
  if(args == 1 && res1 != 999) {
    res1 = args.toString()+res1.toString();
  } else if(args == 0 && res1 == 999) {
    res1 = 0;
  } else if(res1 == 999) {
    res1 = 1;
  }
  var ll = res1.length;
  while(ll%4 != 0) {
    res1 = "0"+res1;
    ll = res1.length;
  } 
  return res1;
}