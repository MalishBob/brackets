module.exports = function check(str, bracketsConfig) {
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    let bracketObj = getTypeObj(str[i], bracketsConfig);
    if(stack.length === 0 && bracketObj.currentType === "end") {
      return false;
    } else {
      if((bracketObj.isTwin && stack[stack.length-1] === bracketObj.currentBracket) || (stack[stack.length-1] === bracketObj.startBracket && bracketObj.currentType === "end")) {
        stack.pop();
      } else {
        stack.push(str[i]);
      }
    }
  }

  if(stack.length === 0){ 
    return true;
  } else {
    return false;
  }

}

function getTypeObj(bracket, bracketsConfig) {
  let obj = new Object();
  let isTwin = false;

  bracketsConfig.forEach(([start, end]) => {
    if(bracket == start || bracket == end) {
      if(bracket == start) {
        currentType = "start";
        currentBracket = start;
      } else if(bracket == end) {
        currentType = "end";
        currentBracket = end;
      }

      startBracket = start;
      if(start === end) isTwin = true;
    }
  });

  obj.currentType = currentType;
  obj.startBracket = startBracket;
  obj.isTwin = isTwin;
  obj.currentBracket = currentBracket;

  return obj;
}