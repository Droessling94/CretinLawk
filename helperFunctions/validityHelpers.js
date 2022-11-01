function isLengthValid(lengthToVerify, conditionalMinimum, conditionalMaximum) {
    if (!isNaN(lengthToVerify) && lengthToVerify > 0) {
        if (conditionalMinimum) {
            if (lengthToVerify < conditionalMinimum) {
                console.log('\n' + "!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!" + '\n' + 'Your Password Length Is Too Short.' + '\n');
                return false
            }
        }
        if (conditionalMaximum) {
            if (lengthToVerify > conditionalMaximum) {
                console.log('\n' + "!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!" + '\n' + 'Your Password Length Is Too Long.' + '\n');
                return false
            }
        }
        return true
    }
    else {
        console.log('\n' + "!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!" + '\n' + 'You Need To Use A Number To Specify A Password Length.' + '\n');
        return false
    }
}


module.exports = {isLengthValid}