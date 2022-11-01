////*****N-O-M*****////
//--Three main peices of non imported functionality here, two helper functions(reverseIdentity and generatePassword) and a parent function (createANewPassword)--//
//--createANewPassword calls in inquirerQA to get an answer object, the passes the object to generatePassword to actually create the password, and end with writing it to DB--//
////***************////


////**********IMPORTS*************////
const inquirer = require('inquirer');
const fs = require('fs');
const { createANewPasswordQA } = require('./inquirerQA');
const { log, error } = require('console');
const { encryptThis } = require('./encrypt_decryptFunctions');
const isLengthValid = require('../helperFunctions/isLengthValid');
////******************************////


//--Only using this function to reverse the name of the user--//
function reverseIdentity(identity) {
    let stringArray = identity.split("");
    let reverseArray = stringArray.reverse();
    let joinedString = reverseArray.join("");
    return joinedString;
}


function generatePassword(siteLogin, site, pwLength, specialChars, numberChars, upperCaseChars) {
    const specialCharsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "-", "=", "+", "(", ")", "{", "}", "[", "]", "?", "/", ">", "<", ".", ","];
    const numberCharsArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const upperCaseArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const charArrayAvailable = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const generatedPassword = [];
    if (upperCaseChars) {
        charArrayAvailable.push(...specialCharsArray)
    }
    if (specialChars) {
        charArrayAvailable.push(...specialCharsArray)
    }
    if (numberChars) {
        charArrayAvailable.push(...numberCharsArray)
    }
        if (upperCaseChars == 'Yes') {
        generatedPassword.push(upperCaseArray[Math.floor(Math.random() * (upperCaseArray.length - 1))]);
        }
        if (numberChars == 'Yes') {
            generatedPassword.push(numberCharsArray[Math.floor(Math.random() * (numberCharsArray.length - 1))]);
        }
        if (specialChars == "Yes") {
            generatedPassword.push(specialCharsArray[Math.floor(Math.random() * (specialCharsArray.length - 1))]);
        }
        for (let i = generatedPassword.length; i < pwLength; i++) {
            generatedPassword.push(charArrayAvailable[Math.floor(Math.random() * (charArrayAvailable.length - 1))]);
        }

    let generatedPasswordString = generatedPassword.join('');
    return { "login": siteLogin, "site": site, "genPass": generatedPasswordString };
}

async function createANewPassword(userIdentity) {
    const initialDBDirCheck = fs.existsSync(`./db`);
    if(!initialDBDirCheck){
        fs.mkdirSync(`./db`, (err => err ? console.log(err) : ""))
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'Your Password Length is Either Not A Number Or Not Larger Than 0.'+'\n'+'Returning To Main Menu'+'\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
        fs.writeFileSync(`./db/${userIdentity}PWDB.json`,
            JSON.stringify(pwLib, null, 4),
            (err) => err ? console.error(writeErr) : console.info('Success!'));
            return
    }
    const initialPassLibCheck = fs.existsSync(`./db/${userIdentity}PWDB.json`);
    if (initialPassLibCheck) {
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'Your Password Length is Either Not A Number Or Not Larger Than 0.'+'\n'+'Returning To Main Menu'+'\n');
            return
        }
        const PWLib = fs.readFileSync(`./db/${userIdentity}PWDB.json`, 'utf8', (err, data) => {
            err ? console.error("Error @ fs readfile @ beginning createANewPassword function " + err) : data;
        })
        const parsedPWLib = JSON.parse(PWLib)
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        parsedPWLib.push(generatedPasswordObject)

        fs.writeFileSync(`./db/${userIdentity}PWDB.json`,
            JSON.stringify(parsedPWLib, null, 4),
            (err) => err ? console.error(writeErr) : console.info('Success!'));
    } else {
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if(!isLengthValid(createANewPasswordOptions.pwLength)){
            console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'Your Password Length is Either Not A Number Or Not Larger Than 0.'+'\n'+'Returning To Main Menu'+'\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars,createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
        fs.writeFileSync(`./db/${userIdentity}PWDB.json`,
            JSON.stringify(pwLib, null, 4),
            (err) => err ? console.error(writeErr) : console.info('Success!'));
    }

}

////**********CREATEANEWPASSWORD-TESTING*************////
// createANewPassword();
////*************************************************////

module.exports = { createANewPassword, generatePassword }