// Trie must go through strings as keys

// generate tree with empty string
// then append to children each trie and each character
// When it reaches the end return the value if possible
var Trie = function(value){
  var tree = Tree("");

  return _.extend(tree,trieMethods);
}