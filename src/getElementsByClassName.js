// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here

  //inline function
  // needs to access a gloal variable matchedNodes
  function parseDOM(input){
  	//check for class name of input
  	if( input.classList.contains(className) ){
  		matchedNodes.push(input);
  	}

  	//loop through all children, NOT childNodes, recursively
  	for(var index=0; index<input.children.length; index++){
 		parseDOM(input.children[index]);
  	}

  }

  var matchedNodes = [];
  parseDOM(document.body);

  console.log(matchedNodes);

  return matchedNodes;
};
