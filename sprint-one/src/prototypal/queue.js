var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = Object.create(queueMethods);
  someInstance.storage = {};
  someInstance.head = 0;
  someInstance.tail = 0;

  return someInstance;
};

var queueMethods = {
	size: function () {
		return this.tail - this.head;
	},
	enqueue: function (value) {
		this.storage[this.tail] = value;
		this.tail++;
	},
	dequeue: function () {
		if (this.size() > 0) {
			this.head++;
		}
		return this.storage[this.head - 1];
	}
};


