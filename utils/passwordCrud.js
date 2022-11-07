////**********IMPORTS*************////
const fs = require('fs');
const { decryptThis, encryptThis } = require('./security');
const { findBySiteQA, updatePassQA, showPassMainQA, mainMenuOptionsQA, deletePasswordQA, typeOfPasswordQA } = require('./inquirerQA');
const { generatePassword, randomlyGeneratePassword, manuallyGeneratePassword, randomlyUpdatePassword, manuallyUpdatePassword } = require('./../helperFunctions/generatePassword');
const { writeFileToDB, writeDB, readAndParseFileFromDB, findBySite } = require('../helperFunctions/crudHelpers');
const { changeUser } = require('./profileManagement.js');
const { minorAlert, successAlert, postQuestionSpacer } = require('./chalkTalk');
////******************************////


async function createANewPassword(userObject,configFile) {

    let newGeneratedPassword

    let typeOfPasswordAnswer = await typeOfPasswordQA();
    postQuestionSpacer();
    if (typeOfPasswordAnswer.type == 'Manually Entered'){
        
        newGeneratedPassword = await manuallyGeneratePassword()
    }
    else {
        newGeneratedPassword = await randomlyGeneratePassword()
    }
    userObject.passwords.push(newGeneratedPassword)
    const userIndex = await configFile.findIndex(object => object.userName == userObject.userName)
    configFile.splice(userIndex, 1);
    configFile.push(userObject)
    writeFileToDB(`./config.json`,configFile)
}

async function showPasswordBySite(userObject, configFile) {
        const qaAnswer = await findBySiteQA()
        postQuestionSpacer();
        const searchedSiteObj = findBySite(userObject.passwords, qaAnswer.siteName)
        if (searchedSiteObj) {
            decryptedPasswordBySite = decryptThis(searchedSiteObj.genPass);
            successAlert(`${userObject.userName}'s ${qaAnswer.siteName} Login:${searchedSiteObj.login} -- Password:${decryptedPasswordBySite}`)
        } else { minorAlert("No Site Found By That Name, No Password Found"); }
}

function showAllPasswords(userObject, configFile) {
        const passWordLeak = userObject.passwords.map(obj => `${userObject.userName}'s Login For ${obj.site} Is ${obj.login} And The Password Is ${decryptThis(obj.genPass)}`)
        if (passWordLeak[0]) {
            console.table(passWordLeak);
        } else {
            minorAlert("No Saved Passwords");
        }
}

async function showPasswords(userObject, configFile) {
    menu = await showPassMainQA()
    postQuestionSpacer();
    if (menu.destination == "Find By Site Name") {
        await showPasswordBySite(userObject, configFile)
    }
    if (menu.destination == "Show All") {
        showAllPasswords(userObject, configFile)
    }
}

//--TODO -- refactor this
async function updatePassWord(userObject, configFile) {
    if(!userObject.passwords){
        minorAlert("No Saved Passwords");
        return
    }
    const findBySiteAnswer = await findBySiteQA()
    postQuestionSpacer();
    const foundPassword = findBySite(userObject.passwords, findBySiteAnswer.siteName)
    if(!foundPassword){
        minorAlert("No Site Found By That Name, No Password Found");
        return
    }
    let newGeneratedPassword;
    let typeOfPasswordAnswer = await typeOfPasswordQA();
    postQuestionSpacer();
    if (typeOfPasswordAnswer.type == 'Manually Entered'){
        newGeneratedPassword = await manuallyUpdatePassword();
    }
    else {
        newGeneratedPassword = await randomlyUpdatePassword();
    }
    foundPassword.genPass = encryptThis(newGeneratedPassword.genPass)
    const passwordIndex = await userObject.passwords.findIndex(object => object.site == findBySiteAnswer.siteName)
    userObject.passwords.splice(passwordIndex, 1);
    userObject.passwords.push(foundPassword)
    const userIndex = await configFile.findIndex(object => object.userName == userObject.userName)
    configFile.splice(userIndex, 1);
    configFile.push(userObject)
    writeFileToDB(`./config.json`,configFile)
}


async function deletePassword(userObject, configFile) {
    if (!userObject.passwords) {
        minorAlert('No Saved Passwords, Returning To Previous Menu');
        return;
    }
    const findBySiteAnswer = await findBySiteQA()
    postQuestionSpacer();
    const foundSite = findBySite(userObject.passwords, findBySiteAnswer.siteName)
    if (!foundSite) {
        minorAlert("No Site Found By That Name, No Password Found")
        return
    }
    const deletePasswordAnswer = await deletePasswordQA(foundSite.site)
    postQuestionSpacer();
    if (deletePasswordAnswer.confirmation == 'No') {
        return
    }
    const pwIndex = await userObject.passwords.findIndex(object => object.site === foundSite.site)
    userObject.passwords.splice(pwIndex, 1)
    const userIndex = await configFile.findIndex(object => object.userName == userObject.userName)
    configFile.splice(userIndex, 1);
    configFile.push(userObject)
    writeFileToDB(`./config.json`,configFile)
}

async function mainMenu(user, configFile) {
    let menu = await mainMenuOptionsQA();
    postQuestionSpacer();
    if (menu.destination == 'Create a New Password') {
        await createANewPassword(user,configFile);
    }
    if (menu.destination == 'Show Passwords') {
        await showPasswords(user,configFile);
    }
    if (menu.destination == 'Update Password') {
        await updatePassWord(user,configFile);
    }
    if (menu.destination == 'Delete Password') {
        await deletePassword(user,configFile);
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