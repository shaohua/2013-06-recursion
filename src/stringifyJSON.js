// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {

  // your code goes here
  if(typeof obj === 'object'){
    console.log('---object------------------', obj);
    var output='';

    ////check for null
    if(obj===null){
      output = "null";
      return output;
    }

    ////check for array
    if(obj instanceof Array){
      //check for empty array
      if(obj.length===0){
        output = "[]";
        return output;
      }

      //for non-empty array
      for(var ind in obj){
        output+=stringifyJSON( obj[ind] ) + ',';
      }
      //remove extra , in the end
      output = output.slice(0,output.length-1);
      output = '['+output+']';
      return output;

      
    } else {
    ////check for objects

      //for empty obj
      //inline function to check whether an ojb is empty or not
      function isEmpty(input){
        for (var prop in input){
          if(input.hasOwnProperty(prop)){
            return false;
          }
        }
        return true;
      }

      if(isEmpty(obj)){
        output = "{}";
        return output;
      }

      //for non-empty obj
      for(var pro in obj){
        if(obj.hasOwnProperty(pro)){
          if(stringifyJSON(obj[pro])){ //deal with undefined value
            output += stringifyJSON(pro) + ':' + stringifyJSON(obj[pro]) + ',';
          }
        }
      }
      //remove extra , in the end
      output = output.slice(0,output.length-1);
      output = '{'+output+'}';
      return output;

    }



  } else {
    console.log('---not-obj------------------', obj);
    var output='';

    //string
    if(typeof obj ==='string'){
      output = '"'+obj+'"';
      return output;
    }

    //undefined
    if(typeof obj ==='undefined'){
      output = undefined;
      return output;
    }

    //function, return as undefined
    if(typeof obj ==='function'){
      output = undefined;
      return output;
    }

    //others
    output = obj.toString();
    return output;
  }
};
