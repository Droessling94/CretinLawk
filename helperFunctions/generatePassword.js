const { createANewManualPasswordQA, createANewRandomizedPasswordQA, updatePassRandomQA,updatePassManualQA} = require('../utils/inquirerQA');
const { encryptThis } = require('../utils/security');
const { isLengthValid } = require('./validityHelpers');

function generateRandomPassword(siteLogin, site, pwLength, specialCharsOption, numberCharsOption, upperCaseCharsOption) {
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
async function manuallyGeneratePassword() {
    let createANewManualPasswordAnswer = await createANewManualPasswordQA();
    if (!createANewManualPasswordAnswer.login) {
        console.log('\n' + 'No Login Or Username' + '\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    if (!createANewManualPasswordAnswer.site) {
        console.log('\n' + 'No Website Or Service Name Given' + '\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    if (!isLengthValid(createANewManualPasswordAnswer.userPassword.length)) {
        console.log('\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    createANewManualPasswordAnswer.userPassword = encryptThis(createANewManualPasswordAnswer.userPassword);
    return { "login": createANewManualPasswordAnswer.login, "site": createANewManualPasswordAnswer.site, "genPass": createANewManualPasswordAnswer.userPassword };
}
async function manuallyUpdatePassword() {
    let updatePassManualAnswer = await updatePassManualQA()
    if (!isLengthValid(updatePassManualAnswer.userPassword.length)) {
        console.log('\n' + 'Entered Nothing For Password, Please Re-Enter Password' + '\n');
        return await manuallyUpdatePassword()
    }
 
    return { "login": 'updatePassManualAnswer.login', "site": 'updatePassManualAnswer.site', "genPass": updatePassManualAnswer.userPassword };
}

async function randomlyGeneratePassword() {
    let createANewRandomizedPasswordAnswer = await createANewRandomizedPasswordQA()
        if (!isLengthValid(createANewRandomizedPasswordAnswer.pwLength)) {
        console.log('\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    if (!createANewRandomizedPasswordAnswer.login) {
        console.log('\n' + 'No Login Or Username' + '\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    if (!createANewRandomizedPasswordAnswer.site) {
        console.log('\n' + 'No Website Or Service Name Given' + '\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    const randomlyGeneratedPassword = generateRandomPassword(createANewRandomizedPasswordAnswer.login, createANewRandomizedPasswordAnswer.site,
        createANewRandomizedPasswordAnswer.pwLength, createANewRandomizedPasswordAnswer.specialChars,
        createANewRandomizedPasswordAnswer.numberChars, createANewRandomizedPasswordAnswer.upperCaseChars);

        randomlyGeneratedPassword.genPass = encryptThis(randomlyGeneratedPassword.genPass);
    return randomlyGeneratedPassword;
}
async function randomlyUpdatePassword() {
    let updatePassRandomAnswer = await updatePassRandomQA()
        if (!isLengthValid(updatePassRandomAnswer.pwLength)) {
        console.log('\n' + 'Returning To Previous Menu' + '\n');
        return
    }
    const randomlyGeneratedPassword = generateRandomPassword(updatePassRandomAnswer.login, 'fixthis',
    updatePassRandomAnswer.pwLength, updatePassRandomAnswer.specialChars,
    updatePassRandomAnswer.numberChars, updatePassRandomAnswer.upperCaseChars);

    
    return randomlyGeneratedPassword;
}



module.exports = {manuallyGeneratePassword,randomlyGeneratePassword,randomlyUpdatePassword,manuallyUpdatePassword} 


