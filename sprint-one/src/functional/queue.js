var Queue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var length = 0;
  var head = 0;

  // Implement the methods below
  // size of queue === length - head

  someInstance.enqueue = function(value) {
    storage[length] = value;
    length++;
  };

  someInstance.dequeue = function(){
    if ((length - head) > 0) { // 
      head++;
    }
    return storage[head - 1];
  };

  someInstance.size = function(){
    return length - head;
  };

  return someInstance;
};
