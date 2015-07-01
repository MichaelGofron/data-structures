var Queue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  var someInstance = {
  	storage: {},
  	head: 0,
  	tail: 0
  };

  return _.extend(someInstance, queueMethods);
};

var queueMethods = {
	size: function(){
		return this.tail - this.head;
	},
	enqueue: function(value){
		this.storage[this.tail] = value;
		this.tail++;
	},
	dequeue: function(){
		if (this.size() > 0){
			this.head++;
		}
		return this.storage[this.head-1];
	}
};




