export function validateInteger(_value){
    return parseInt(_value) >= 0;
}

export function validateHash(_value){
    if("0x" == _value.substring(0,2) && 
    _value.length == 66)return true

    return false
}

export function validateSignature(_value){
    if("0x" == _value.substring(0,2) && 
    _value.length == 132)return true

    return false
}

export function validateAddress(_value){
    if("0x" == _value.substring(0,2) && 
    _value.length == 22)return true

    return false
}

export function validate(obj){
    for(var key in obj) {
        if(!obj[key]) return false;
    }
    return true;
  }

export function resetHighlightsFields(obj){
    var returnedObjHighlights = {};
    var returnedObjErrors = {};
    for(var key in obj) {
        returnedObjHighlights[key] = '';
        returnedObjErrors[key] = true;

    }
    return [returnedObjHighlights, returnedObjErrors];
  }

  export function HighlightsFields(obj){
    var returnedObj = {};
    for(var key in obj) {
        if(!obj[key])returnedObj[key] = Error;
    }
    return returnedObj;
  }


export const Error = "border-danger border-3"
