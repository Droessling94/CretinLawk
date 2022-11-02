////**********IMPORTS*************////
const fs = require('fs');
const { decryptThis, encryptThis } = require('./security');
const { findBySiteQA, updatePassQA, createANewPasswordQA, showPassMainQA, mainMenuOptionsQA } = require('./inquirerQA');
const { generatePassword } = require('./../helperFunctions/generatePassword');
const { writeFileToDB, writeDB, readAndParseFileFromDB, findBySite } = require('../helperFunctions/crudHelpers');
const { isLengthValid } = require('../helperFunctions/validityHelpers');
const { changeUser } = require('./profileManagement.js');
////******************************////


async function createANewPassword(userIdentity) {
    const initialDBDirCheck = fs.existsSync(`./db`);
    if (!initialDBDirCheck) {
        writeDB(`./db`)
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if (!isLengthValid(createANewPasswordOptions.pwLength)) {
            console.log('\n' + 'Returning To Previous Menu' + '\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars, createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
        writeFileToDB(`./db/${userIdentity}PWDB.json`, pwLib)
        return
    }
    const initialPassLibCheck = fs.existsSync(`./db/${userIdentity}PWDB.json`);
    if (initialPassLibCheck) {
        let createANewPasswordOptions = await createANewPasswordQA();
        if (!isLengthValid(createANewPasswordOptions.pwLength)) {
            console.log('\n' + 'Returning To Previous Menu' + '\n');
            return
        }
        const parsedPWLib = readAndParseFileFromDB(`./db/${userIdentity}PWDB.json`)
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars, createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        parsedPWLib.push(generatedPasswordObject)
        writeFileToDB(`./db/${userIdentity}PWDB.json`, parsedPWLib)
    } else {
        let pwLib = []
        let createANewPasswordOptions = await createANewPasswordQA();
        if (!isLengthValid(createANewPasswordOptions.pwLength)) {
            console.log('\n' + 'Returning To Previous Menu' + '\n');
            return
        }
        const generatedPasswordObject = generatePassword(createANewPasswordOptions.login, createANewPasswordOptions.site,
            createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
            createANewPasswordOptions.numberChars, createANewPasswordOptions.upperCaseChars);

        generatedPasswordObject.genPass = encryptThis(generatedPasswordObject.genPass)
        pwLib.push(generatedPasswordObject)
        writeFileToDB(`./db/${userIdentity}PWDB.json`, pwLib)
    }

}

async function showPasswordBySite(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`)
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            decryptedPasswordBySite = decryptThis(searchedSiteObj.genPass);
            console.log(`${user}'s Password For ${qaAnswer.siteName} is ${decryptedPasswordBySite}`);
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else { console.log("No Saved Passwords"); }
}

function showAllPasswords(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
        const passWordLeak = parsedPWLib.map(obj => `${user}'s Password For ${obj.site} is ${decryptThis(obj.genPass)}`)
        if (passWordLeak[0]) {
            console.log(passWordLeak);
        } else {
            console.log("No Saved Passwords");
        }
    } else {
        console.log("No Saved Passwords");
    }
}

async function showPasswords(user) {
    menu = await showPassMainQA()
    if (menu.destination == "Find By Site Name") {
        await showPasswordBySite(user)
    }
    if (menu.destination == "Show All") {
        showAllPasswords(user)
    }
}


async function updatePassWord(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            let createANewPasswordOptions = await updatePassQA()
            const generatedPasswordObject = generatePassword(searchedSiteObj.login, searchedSiteObj.site,
                createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
                createANewPasswordOptions.numberChars, createANewPasswordOptions.upperCaseChars
            );
            searchedSiteObj.genPass = encryptThis(generatedPasswordObject.genPass)
            writeFileToDB(`./db/${user}PWDB.json`, parsedPWLib)
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else { console.log("No Saved Passwords"); }
}


async function deletePassword(user) {
    const initialUserCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialUserCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            const pwIndex = await parsedPWLib.findIndex(object => object.site === searchedSiteObj.site)
            parsedPWLib.splice(pwIndex, 1)
            writeFileToDB(`./db/${user}PWDB.json`, parsedPWLib)
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else {
        console.log("No Saved Passwords");
    }
}

async function mainMenu(user, configFile) {
    let menu = await mainMenuOptionsQA();
    if (menu.destination == 'Create a New Password') {
        await createANewPassword(user);
    }
    if (menu.destination == 'Show Passwords') {
        await showPasswords(user);
    }
    if (menu.destination == 'Update Password') {
        await updatePassWord(user);
    }
    if (menu.destination == 'Delete Password') {
        await deletePassword(user);
    }
    if (menu.destination == 'Change User Profile') {
        user = await changeUser(user, configFile);
    }
    return menu.destination == 'Exit' ? "" : await mainMenu(user, configFile);
}

////**********CREATEANEWPASSWORD-TESTING*************////
// createANewPassword();
////*************************************************////

////**********SHOWPASSWORDS-TESTING*************////
//--Need to change db path in fs.readFile for unit testing, double .. instead of one .--//
// showPassWordsBySite('Donnie')
////********************************************////

////**********SHOWPASSWORDS-TESTING*************////
//--Need to change db path in fs.readFile for unit testing, double .. instead of one .--//
// showAllPassWords('Donnie')
////********************************************////

////**********UPDATEPASSWORD-TESTING*************////
//--Need to change db path in fs.readFile for unit testing, double .. instead of one .--//
// updatePassWord('Donnie')
////********************************************////

////**********DELETEPASSWORD-TESTING*************////
//--Need to change db path in fs.readFile for unit testing, double .. instead of one .--//
// deletePassword('Donnie')
////********************************************////

module.exports = { createANewPassword, showPasswords, updatePassWord, deletePassword, mainMenu }