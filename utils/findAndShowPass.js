////**********IMPORTS*************////
const fs = require('fs');
const { decryptThis, encryptThis } = require('../utils/encrypt_decryptFunctions');
const { findBySiteQA, updatePassQA } = require('./inquirerQA');
const { generatePassword } = require('./createANewPasswordFunctionality');
////******************************////



function findBySite(pWLib, siteName) {
    const foundSiteList = pWLib.filter(Obj => {
        return Obj.site == siteName
    })
    const foundSite = foundSiteList[0]
    return foundSite;
}

async function showPassWordsBySite(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
    const PWLib = fs.readFileSync(`./db/${user}PWDB.json`, 'utf8', (err, data) => {
        err ? console.error("Error @ showPasswords() with fsread for PWLIB " + err) : console.log(data);
    })
    const parsedPWLib = await JSON.parse(PWLib)
    // console.log('Parsed Library Of Passwords Below');
    // console.log(parsedPWLib);
    const qaAnswer = await findBySiteQA()
    // console.log('QA Answers Below');
    // console.log(qaAnswer);
    const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
    // console.log('SearchedSiteObject Below');
    // console.log(searchedSiteObj);
    if (searchedSiteObj) {
        decryptedPasswordBySite = decryptThis(searchedSiteObj.genPass);
        console.log(`${user}'s Password For ${qaAnswer.siteName} is ${decryptedPasswordBySite}`);
    } else { console.log("No Site Found By That Name, No Password Found"); }
    } else {console.log("No Saved Passwords"); }
}

async function showAllPassWords(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck){
    const PWLib = fs.readFileSync(`./db/${user}PWDB.json`, 'utf8', (err, data) => {
        err ? console.error("Error @ showPasswords() with fsread for PWLIB " + err) : console.log(data);
    })
    const parsedPWLib = await JSON.parse(PWLib)
    const passWordLeak = await parsedPWLib.map(obj => `${user}'s Password For ${obj.site} is ${decryptThis(obj.genPass)}`)
    if (passWordLeak[0]) {
        console.log(passWordLeak);
    } else {
        console.log("No Saved Passwords");
    }
    } else {
        console.log("No Saved Passwords");
    }
}


async function updatePassWord(user) {
    const initialDBCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialDBCheck) {
        const PWLib = fs.readFileSync(`./db/${user}PWDB.json`, 'utf8', (err, data) => {
            err ? console.error("Error @ showPasswords() with fsread for PWLIB " + err) : console.log(data);
        })
        const parsedPWLib = await JSON.parse(PWLib)
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            let createANewPasswordOptions = await updatePassQA()
            const generatedPasswordObject = generatePassword(user, searchedSiteObj.site,
                createANewPasswordOptions.pwLength, createANewPasswordOptions.specialChars,
                createANewPasswordOptions.numberChars
            );
            searchedSiteObj.genPass = encryptThis(generatedPasswordObject.genPass)
            fs.writeFileSync(`./db/${user}PWDB.json`, JSON.stringify(parsedPWLib, null, 4),
                (err) => err ? console.error(writeErr) : console.info('Success!'));
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else {console.log("No Saved Passwords");}
}


async function deletePassword(user) {
    const initialUserCheck = fs.existsSync(`./db/${user}PWDB.json`);
    if (initialUserCheck) {
        const PWLib = fs.readFileSync(`./db/${user}PWDB.json`, 'utf8', (err, data) => {
            err ? console.error("Error @ showPasswords() with fsread for PWLIB " + err) : console.log(data);
        })
        const parsedPWLib = await JSON.parse(PWLib)
        const qaAnswer = await findBySiteQA()
        const searchedSiteObj = findBySite(parsedPWLib, qaAnswer.siteName)
        if (searchedSiteObj) {
            const pwIndex = await parsedPWLib.findIndex(object => object.site === searchedSiteObj.site)
            parsedPWLib.splice(pwIndex, 1)
            fs.writeFileSync(`./db/${user}PWDB.json`, JSON.stringify(parsedPWLib, null, 4),
                (err) => err ? console.error(writeErr) : console.info('Success!'));
        } else { console.log("No Site Found By That Name, No Password Found"); }
    } else {console.log("No Saved Passwords");
}
}

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

module.exports = { showPassWordsBySite, showAllPassWords, updatePassWord, deletePassword }