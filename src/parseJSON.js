// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {

  //inline function 1
  //determine substring
  function startWith(fullstring, substring){
    if(substring === fullstring.slice(0,substring.length)){
      return true;
    } else {
      return false;
    }
  }

  //inline function 2
  //find comma locations to split
  function findComma(obj){
    var comma_loc = [];
    var nest_flag = 0;
    var obj_nest_flag = 0;
    var str_nest_flag = 0;
    for(var index = 1; index < obj.length - 1; index++){
      //console.log(index, obj[index]);


      if(obj[index]==='['){
        nest_flag +=1;
      }
      if(obj[index]===']'){
        nest_flag -=1;
      }

      if(obj[index]==='{'){
        obj_nest_flag +=1;
      }
      if(obj[index]==='}'){
        obj_nest_flag -=1;
      }

      if(obj[index]==='"'){
        str_nest_flag +=1;
      }

      if(obj[index]===',' && nest_flag===0 && obj_nest_flag===0 &&
          (str_nest_flag%2 === 0) ){
        comma_loc.push(index);
      }
    }
    //console.log(comma_loc);
    return comma_loc;
  }

  //inline function 3
  //parse one element of obj
  //example input is "k1:value1"
  function parseObj(input){
    var out ={};
    var colon_loc = input.indexOf(':');
    out['key1'] = parseJSON( input.slice(0,colon_loc) );
    out['value1'] = parseJSON( input.slice(colon_loc+1, input.length) );
    return out;
  }  



  if(startWith(json, '[')){
    console.log('-------------------------',json);
    var output=[];

    //empty []
    if(json==='[]'){
      return output;
    }

    var comma_loc = findComma(json);

    if(comma_loc.length===0){
      output.push( parseJSON(json.slice(1,json.length-1)) );
      return output;
    } else if(comma_loc.length===1){
      output.push( parseJSON(json.slice(1, comma_loc[0])) );
      output.push( parseJSON(json.slice(comma_loc[0]+1, json.length-1)) );
      return output;
    } else{
      //first element
      output.push( parseJSON(json.slice(1, comma_loc[0])) );
      //all other elements, hence cindex starts at 1
      for(var cindex=1; cindex < comma_loc.length; cindex++){
        output.push( parseJSON(json.slice(comma_loc[cindex-1]+1, comma_loc[cindex] )) );
      }
      //last element
      output.push( parseJSON(json.slice( comma_loc[comma_loc.length-1]+1, json.length-1 )) );
      return output;
    }




  } else if (startWith(json, '{')){
    console.log('------------{-------------',json);
    var output={};

    //check for empty{}
    if(json==='{}'){
      return output;
    }

    //find locations of , to split
    var comma_loc = findComma(json);



    if(comma_loc.length===0){
      //no nesting
      //remove leading { and trailing }
      json=json.slice(1,json.length-1);

      var kv = parseObj(json);
      output[kv.key1] = kv.value1;
      return output;
    } else if(comma_loc.length===1){
      var firstEle = json.slice(1,comma_loc[0]);
      var kv = parseObj(firstEle);
      output[kv.key1] = kv.value1;

      var secondEle = json.slice(comma_loc[0]+1,json.length-1);
      var kv = parseObj(secondEle);
      output[kv.key1] = kv.value1;
    } else{
      //first element
      var firstEle = json.slice(1,comma_loc[0]);
      var kv = parseObj(firstEle);
      output[kv.key1] = kv.value1;
      //middle elements, hence cindex starts at 1
      for(var cindex=1; cindex<comma_loc.length; cindex++){
        var element = json.slice(comma_loc[cindex-1]+1, comma_loc[cindex]);
        var kv = parseObj(element);
        output[kv.key1] = kv.value1;
      }
      //last element
      var lastEle = json.slice(comma_loc[comma_loc.length-1]+1, json.length-1);
      var kv = parseObj(lastEle);
      output[kv.key1] = kv.value1;
      return output;
    }


  } else{
    console.log('------------no-obj-no-array--------',json);
    var output='';

    if(isNaN(json)){
      switch(json){
        case 'null':
          output = null;
          return output;
          break;
        case 'undefined':
          output = undefined;
          return output;
          break;
        case 'true':
          output = true;
          return output;
          break;
        case 'false':
          output = false;
          return output;
          break;        
      }

      //string, remove " "
      if(startWith(json, '"')){
        output = json.slice(1,json.length);
        if(output.slice(output.length-1,output.length) === '"'){
          output = output.slice(0,output.length-1);
        }
        return output;
      }

    }else{
      output = Number(json);
      return output;
    }

  }
  
};
