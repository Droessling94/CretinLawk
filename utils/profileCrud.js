const { deleteUserMenuQA, newUserQA } = require("./inquirerQA");
const { verifyHash, hashText } = require("./security");
const { writeFileToDB } = require("../helperFunctions/crudHelpers");
const { existsSync, unlinkSync } = require("fs");
const { isLengthValid } = require("../helperFunctions/validityHelpers");
const { minorAlert, successAlert, majorAlert } = require("./chalkTalk");


async function createUserProfile(configFile){
    let newUserInfoAnswer = await newUserQA();
    if(!newUserInfoAnswer.userName){
        minorAlert("You Must Provide The User's name! Returning to Previous Menu")
        return false
      }
    if(!isLengthValid(newUserInfoAnswer.masterPassword.length)){
        minorAlert('Password Was An Invalid Length! Returning To Previous Menu')
        return false
    }
    newUserInfoAnswer.masterPassword = hashText(newUserInfoAnswer.masterPassword)
    configFile.push(newUserInfoAnswer)
    writeFileToDB(`./config.json`,configFile)
    return newUserInfoAnswer.userName
}

async function deleteUserProfile(userNameArray, configFile){
    let deleteUserMenuAnswer = await deleteUserMenuQA(userNameArray);
    console.log(deleteUserMenuAnswer);
        if(deleteUserMenuAnswer.destination == 'Exit To Previous Menu'){
            successAlert('Exiting To Previous Menu')
            return false;
        }
    let chosenUser = await configFile.filter( (obj) => obj.userName == deleteUserMenuAnswer.destination ? obj : "")
    let isValidFirst = verifyHash(chosenUser[0].masterPassword,deleteUserMenuAnswer.password);
    let isValidSecond = verifyHash(chosenUser[0].masterPassword,deleteUserMenuAnswer.passwordDoubleCheck);
        if(!isValidFirst || !isValidSecond ){
            minorAlert('Your Passwords Either Did Not Match Your MasterPassword Or Did Not Match Each Other! Returning To Previous Menu')
            return false;
        }
    const userIndex = await configFile.findIndex(object => object.user == deleteUserMenuAnswer.destination)
    configFile.splice(userIndex, 1);
    writeFileToDB(`./config.json`,configFile)
    const userPasswords = existsSync(`./db/${chosenUser[0].user}PWDB.json`);
        if(userPasswords){
            unlinkSync(`./db/${chosenUser[0].user}PWDB.json`, (err => {if (err) majorAlert(err);else {""}}));
            successAlert('User Profile And Associated Passwords Deleted! Returning To Previous Menu')
            return true;
        } else {
            minorAlert('User Profile Deleted But Password File Remains, Please Manually Delete This From Your DB Folder')
        }
}




module.exports = { deleteUserProfile, createUserProfile}