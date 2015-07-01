var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = Object.create(stackMethods);
  someInstance.storage = {};
  someInstance.length = 0;

  return someInstance;
};

var stackMethods = {
	size: function(){
		return this.length;
	},
	push: function(val){
		this.storage[this.length] = val;
		this.length++;
	},
	pop: function(){
		if (this.length > 0){
			this.length--;
		}
		return this.storage[this.length];
	}
};


