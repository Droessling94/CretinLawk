////**********IMPORTS*************////
const fs = require('fs');
const { decryptThis, encryptThis } = require('./security');
const { findBySiteQA, updatePassQA, showPassMainQA, mainMenuOptionsQA, deletePasswordQA, typeOfPasswordQA } = require('./inquirerQA');
const { generatePassword, randomlyGeneratePassword, manuallyGeneratePassword, randomlyUpdatePassword, manuallyUpdatePassword } = require('./../helperFunctions/generatePassword');
const { writeFileToDB, writeDB, readAndParseFileFromDB, findBySite } = require('../helperFunctions/crudHelpers');
const { changeUser } = require('./profileManagement.js');
////******************************////


async function createANewPassword(userIdentity) {
    const initialDBDirCheck = fs.existsSync(`./db`);
    if (!initialDBDirCheck) {
        writeDB(`./db`)
    }
    let newGeneratedPassword

    let typeOfPasswordAnswer = await typeOfPasswordQA();

    if (typeOfPasswordAnswer.type == 'Manually Entered'){
        newGeneratedPassword = await manuallyGeneratePassword()
    }
    else {
        newGeneratedPassword = await randomlyGeneratePassword()
    }

    const initialPassLibCheck = fs.existsSync(`./db/${userIdentity}PWDB.json`);
    if (!initialPassLibCheck) {
        let pwLib = [];
        pwLib.push(newGeneratedPassword);
        writeFileToDB(`./db/${userIdentity}PWDB.json`, pwLib);
        return
    }
    const parsedPWLib = readAndParseFileFromDB(`./db/${userIdentity}PWDB.json`)
    parsedPWLib.push(newGeneratedPassword)
    writeFileToDB(`./db/${userIdentity}PWDB.json`, parsedPWLib)
}

async function showPasswordBySite(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`)
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            decryptedPasswordBySite = decryptThis(searchedSiteObj.genPass);
            console.log('\n' + `${user}'s Login For ${qaAnswer.siteName} is ${searchedSiteObj.login}` + '\n' + `${user}'s Password For ${qaAnswer.siteName} is ${decryptedPasswordBySite}` + '\n');
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else { console.log("No Saved Passwords"); }
}

function showAllPasswords(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
        const passWordLeak = parsedPWLib.map(obj => `${user}'s Login For ${obj.site} Is ${obj.login} And The Password Is ${decryptThis(obj.genPass)}`)
        if (passWordLeak[0]) {
            console.table(passWordLeak);
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

//--TODO -- refactor this
async function updatePassWord(user) {
    if(!fs.existsSync(`./db/${user}PWDB.json`)){
        console.log("No Saved Passwords");
        return
    }
    const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
    const findBySiteAnswer = await findBySiteQA()
    const foundPassword = findBySite(parsedPWLib, findBySiteAnswer.siteName)
    if(!foundPassword){
        console.log("No Site Found By That Name, No Password Found");
        return
    }
    let newGeneratedPassword;
    let typeOfPasswordAnswer = await typeOfPasswordQA();
    if (typeOfPasswordAnswer.type == 'Manually Entered'){
        newGeneratedPassword = await manuallyUpdatePassword();
    }
    else {
        newGeneratedPassword = await randomlyUpdatePassword();
    }
    foundPassword.genPass = encryptThis(newGeneratedPassword.genPass)
    writeFileToDB(`./db/${user}PWDB.json`, parsedPWLib)
}


async function deletePassword(user) {
    const initialPWFileCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (!initialPWFileCheck) {
        console.log('\n' + 'No Saved Passwords' + '\n' + 'Returning To Previous Menu');
        return;
    }
    const parsedPWLib = readAndParseFileFromDB(`./db/${user}PWDB.json`);
    const findBySiteAnswer = await findBySiteQA()
    const foundSite = findBySite(parsedPWLib, findBySiteAnswer.siteName)
    if (!foundSite) {
        console.log("No Site Found By That Name, No Password Found");
        return
    }
    const deletePasswordAnswer = await deletePasswordQA(foundSite.site)
    if (deletePasswordAnswer.confirmation == 'No') {
        return
    }
    const pwIndex = await parsedPWLib.findIndex(object => object.site === foundSite.site)
    parsedPWLib.splice(pwIndex, 1)
    writeFileToDB(`./db/${user}PWDB.json`, parsedPWLib)
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