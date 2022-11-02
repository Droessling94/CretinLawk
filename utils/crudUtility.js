const { deleteUserMenuQA, newUserQA } = require("../utils/inquirerQA");
const { verifyHash, hashText } = require("../utils/hashAndVerifyFunctionality");
const { writeFileToDB } = require("../helperFunctions/crudHelpers");
const { existsSync, unlinkSync } = require("fs");
const { isLengthValid } = require("../helperFunctions/validityHelpers");


async function createUserProfile(configFile){
    let newUserInfoAnswer = await newUserQA();
    if(!isLengthValid(newUserInfoAnswer.masterPassword.length)){
        console.log('\n'+ "!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!" + '\n'+'Password Was An Invalid Length'+'\n'+'Returning To Previous Menu'+'\n');
        return false
    }
    newUserInfoAnswer.masterPassword = hashText(newUserInfoAnswer.masterPassword)
    configFile.push(newUserInfoAnswer)
    writeFileToDB(`./config.json`,configFile)
    return newUserInfoAnswer.user
}

async function deleteUserProfile(userNameArray, configFile){
    let deleteUserMenuAnswer = await deleteUserMenuQA(userNameArray);
        if(deleteUserMenuAnswer.destination == 'Exit To Previous Menu'){
            console.log("\n"+'Returning To Previous Menu'+'\n');
            return false;
        }
    let chosenUser = await configFile.filter( (obj) => obj.user == deleteUserMenuAnswer.destination ? obj : "")
    let isValidFirst = verifyHash(chosenUser[0].masterPassword,deleteUserMenuAnswer.password);
    let isValidSecond = verifyHash(chosenUser[0].masterPassword,deleteUserMenuAnswer.passwordDoubleCheck);
        if(!isValidFirst || !isValidSecond ){
            console.log('\n' + "!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!" + '\n' + 'Your Passwords Either Did Not Match Your MasterPassword Or Did Not Match Each Other' + '\n' + 'Returning To Previous Menu');
            return false;
        }
    const userIndex = await configFile.findIndex(object => object.user == deleteUserMenuAnswer.user)
    configFile.splice(userIndex, 1);
    writeFileToDB(`./config.json`,configFile)
    const userPasswords = existsSync(`./db/${chosenUser[0].user}PWDB.json`);
        if(userPasswords){
            unlinkSync(`./db/${chosenUser[0].user}PWDB.json`, (err => {if (err) console.log(err);else {console.log("\nDeleted file: example_file.txt");}}));
            console.log('\n'+'User Profile And Associated Passwords Deleted' + '\n' + 'Returning To Previous Menu')
            return true;
        }
}




module.exports = { deleteUserProfile, createUserProfile}