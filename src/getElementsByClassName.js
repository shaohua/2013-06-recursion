// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  // var args=Array.prototype.slice.call(arguments);
  // for (var index in args){
	 //  console.log(args[index]);
  // }
  var that = this;
  console.log(that);

  var results = document.getElementsByClassName(className);
  console.log((typeof results), results);

  console.log('\n');
  console.log('-----------------------');
  // console.log(typeof results, results);
  var tmpParent = document.createElement('div');
  for(var index=0; index<results.length; index++){
  	console.log(index, '---', results[index]);
	tmpParent.appendChild(results[index]);
  }
  console.log('-----------------------');

  var output = document.createElement("div");
  output.innerHTML = tmpParent.innerHTML;
  output = output.firstChild;
  console.log((typeof output), output);
  return output;
};
