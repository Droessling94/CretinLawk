////*****N-O-M*****////
//--The idea here is to load up config file to set previous user and previous user password--//
//--If it cannot find a config file we will ask the user their info and make one--//
////***************////

const { initUserQA, selectUserQA, masterPasswordVerifyQA, verifyDeleteQA } = require("./inquirerQA");
const {unlink,existsSync} = require('fs');
const { hashText, verifyHash } = require("./hashAndVerifyFunctionality");
const {isLengthValid} = require('../helperFunctions/validityHelpers');
const {writeFileToDB, readAndParseFileFromDB} = require("../helperFunctions/crudHelpers");

async function initialRun(){
    const userArray = [];
    let newUserInfoObj = await initUserQA();
    if(!isLengthValid(newUserInfoObj.masterPassword.length)){
      console.log('\n'+'Returning To Previous Menu'+'\n');
      return await initialRun()
    }
    newUserInfoObj.masterPassword = await hashText(newUserInfoObj.masterPassword)
    userArray.push(newUserInfoObj)
    writeFileToDB(`./config.json`,userArray)

}

//--currently also holding delete user functionality, move out in refactor--//
async function userConfigSelection(parsedConfigFile){
    let userArrayforQA = await parsedConfigFile.map( obj => obj.user)
    let selectUserAnswer = await selectUserQA(userArrayforQA)
    let userArrayforLogin = await parsedConfigFile.filter( (obj) => obj.user == selectUserAnswer.destination ? obj : "")
  // console.log(userArrayforQA);
    if(selectUserAnswer.destination=='Exit'){
      return false
    }
    if(selectUserAnswer.destination == 'Add New User Profile'){
      let newUserInfoObj = await initUserQA();
      if(!isLengthValid(newUserInfoObj.masterPassword.length)){
        console.log('\n'+'Returning To Previous Menu'+'\n');
        return await userConfigSelection(parsedConfigFile)
      }
    // console.log(newUserInfoObj);
    newUserInfoObj.masterPassword = await hashText(newUserInfoObj.masterPassword)
    // console.log(newUserInfoObj);
    parsedConfigFile.push(newUserInfoObj)
    writeFileToDB(`./config.json`,parsedConfigFile)
    return newUserInfoObj.user
    } 
    else if(selectUserAnswer.destination=="Delete User Profile With Passwords") {
      let passWordTripleCheck = await verifyDeleteQA(userArrayforQA)
      let userArrayforDeletion = await parsedConfigFile.filter( (obj) => obj.user == passWordTripleCheck.user ? obj : "")
      // console.log(passWordTripleCheck);
      // console.log(userArrayforDeletion);
      let isValidFirst= await verifyHash(userArrayforDeletion[0].masterPassword,passWordTripleCheck.password);
      let isValidSecond = await verifyHash(userArrayforDeletion[0].masterPassword,passWordTripleCheck.passwordDoubleCheck);
      let isValidThird = await verifyHash(userArrayforDeletion[0].masterPassword,passWordTripleCheck.passwordTripleCheck);
      if(!isValidFirst || !isValidSecond || !isValidThird){
        console.log('One of the password confirmations you supplied do not match');
        return await userConfigSelection(parsedConfigFile);
      }
      if(isValidFirst && isValidSecond && isValidThird){
        //set up removal of user from config.json
        const userIndex = await parsedConfigFile.findIndex(object => object.user == passWordTripleCheck.user)
        parsedConfigFile.splice(userIndex, 1);
        writeFileToDB(`./config.json`,parsedConfigFile)
        //deletes PWDB.JSON
        const fileExistsCheck = existsSync(`./db/${userArrayforDeletion[0].user}PWDB.json`);
        if(fileExistsCheck){
          unlink(`./db/${userArrayforDeletion[0].user}PWDB.json`, (err => {
            if (err) console.log(err);
            else {
              console.log("\nDeleted file: example_file.txt");
            }
          }));
          console.log('User and Password Deleted!');
          return await userConfigSelection(parsedConfigFile);
        } else{ console.log("User did not have a DB! User Profile Deleted From Config.json"); return await userConfigSelection(parsedConfigFile);}


      }
    } else {

      // console.log(userArrayforQA);
      // console.log(userArrayforLogin);
      // console.log(selectUserAnswer);
      let masterPasswordVerifyAnswer = await masterPasswordVerifyQA()
      let isValid = await verifyHash(userArrayforLogin[0].masterPassword, masterPasswordVerifyAnswer.password)
       if(isValid){
         return userArrayforLogin[0].user
       } else{ 
        console.log('Wrong Password!');
         return await userConfigSelection(parsedConfigFile);
      }
    }

}

async function loadConfigFile(){
    const intialUserCheck = existsSync(`./config.json`);
    if(intialUserCheck){
      let configFileParsed =  readAndParseFileFromDB(`./config.json`)
      let userProfile = await userConfigSelection(configFileParsed)
      if(!userProfile){
        return false
      } else {
        return userProfile
      }

    } else {
        return await initialRun()
    }

//-- we use the map function to return the user in each object within config file--//
}

////**********INITUSERCONFIGSET-TESTING*************////
// initUserConfigSet();
////************************************************////

////**********LOADCONFIGFILE-TESTING*************////
// async function localTestWrapper(){
//     let user = await loadConfigFile()
//     console.log(user + ' this is the user in testWrapper');
// }
// localTestWrapper()
////*********************************************////

module.exports = {initialRun,userConfigSelection,loadConfigFile}