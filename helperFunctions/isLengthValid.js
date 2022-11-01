function isLengthValid ( lengthToVerify, conditionalMinimum, conditionalMaximum){
    if (!isNaN(lengthToVerify) && lengthToVerify > 0 ){
        if(conditionalMinimum){
            if(lengthToVerify < conditionalMinimum){
                return false
            }
        }
        if(conditionalMaximum){
            if(lengthToVerify > conditionalMaximum){
                return false
            }
        }
        return true
    } 
    else { return false}
}

module.exports = isLengthValid;