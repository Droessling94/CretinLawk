function generatePassword(siteLogin, site, pwLength, specialCharsOption, numberCharsOption, upperCaseCharsOption) {
    const specialCharsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "=", "+", "(", ")", "{", "}", "[", "]", "?", "/", ">", "<", ".", ","];
    const numberCharsArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const upperCaseArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const charArrayAvailableDuringGen = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const generatedPasswordCharArray = [];
//--Each If Pushes Associated Array's Contents Into charArrayAvailableDuringGen And Pushes One Random Char From The Associate Array To The Generated Password--//
    if (upperCaseCharsOption == 'Yes') { charArrayAvailableDuringGen.push(...upperCaseArray);generatedPasswordCharArray.push(upperCaseArray[Math.floor(Math.random() * (upperCaseArray.length - 1))]);}
    if (specialCharsOption == 'Yes')   { charArrayAvailableDuringGen.push(...specialCharsArray);generatedPasswordCharArray.push(numberCharsArray[Math.floor(Math.random() * (numberCharsArray.length - 1))]);}
    if (numberCharsOption == 'Yes')    { charArrayAvailableDuringGen.push(...numberCharsArray);generatedPasswordCharArray.push(specialCharsArray[Math.floor(Math.random() * (specialCharsArray.length - 1))]);}
    for (let i = generatedPasswordCharArray.length; i < pwLength; i++) {
        generatedPasswordCharArray.push(charArrayAvailableDuringGen[Math.floor(Math.random() * (charArrayAvailableDuringGen.length - 1))]);
    }
    let generatedPassword = generatedPasswordCharArray.join('');
    return { "login": siteLogin, "site": site, "genPass": generatedPassword };
}

module.exports = {generatePassword} 