////*****N-O-M*****////
//--Three main peices of non imported functionality here, two helper functions(reverseIdentity and generatePassword) and a parent function (createANewPassword)--//
//--createANewPassword calls in inquirerQA to get an answer object, the passes the object to generatePassword to actually create the password, and end with writing it to DB--//
////***************////


////**********IMPORTS*************////
const fs = require('fs');
const { createANewPasswordQA } = require('./inquirerQA');
const { encryptThis } = require('./encrypt_decryptFunctions');
const {isLengthValid} = require('../helperFunctions/validityHelpers');
const {writeFileToDB, writeDB, readAndParseFileFromDB} = require('../helperFunctions/crudHelpers');
////******************************////


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

async function createANewPassword(userIdentity) {
    const initialDBDirCheck = fs.existsSync(`./db`);
    if(!initialDBDirCheck){
        writeDB(`./db`)
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+'Returning To Previous Menu'+'\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
            writeFileToDB(`./db/${userIdentity}PWDB.json`,pwLib)
            return
    }
    const initialPassLibCheck = fs.existsSync(`./db/${userIdentity}PWDB.json`);
    if (initialPassLibCheck) {
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+'Returning To Previous Menu'+'\n');
            return
        }
        const parsedPWLib = readAndParseFileFromDB(`./db/${userIdentity}PWDB.json`)
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        parsedPWLib.push(generatedPasswordObject)
            writeFileToDB(`./db/${userIdentity}PWDB.json`,parsedPWLib)
    } else {
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+'Returning To Previous Menu'+'\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
        writeFileToDB(`./db/${userIdentity}PWDB.json`, pwLib)
    }

}

////**********CREATEANEWPASSWORD-TESTING*************////
// createANewPassword();
////*************************************************////

module.exports = { createANewPassword, generatePassword }