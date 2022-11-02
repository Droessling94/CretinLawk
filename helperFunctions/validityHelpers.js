const { minorAlert } = require("../utils/chalkTalk");

function isLengthValid(lengthToVerify, conditionalMinimum, conditionalMaximum) {
    if (!isNaN(lengthToVerify) && lengthToVerify > 0) {
        if (conditionalMinimum) {
            if (lengthToVerify < conditionalMinimum) {
                minorAlert('Your Password Length Is Too Short.')
                return false
            }
        }
        if (conditionalMaximum) {
            if (lengthToVerify > conditionalMaximum) {
                minorAlert('Your Password Length Is Too Long.')
                return false
            }
        }
        return true
    }
    else {
        minorAlert('You Need To Use A Number To Specify A Password Length.')
        return false
    }
}


module.exports = {isLengthValid}