////*****N-O-M*****////
//--The idea here is to load up config file to set previous user and previous user password--//
//--If it cannot find a config file we will ask the user their info and make one--//
////***************////

const { newUserQA, selectUserMenuQA, masterPasswordVerificationQA } = require("./inquirerQA");
const { deleteUserProfile, createUserProfile } = require('../utils/crudUtility')
const { hashText, verifyHash } = require("./hashAndVerifyFunctionality");
const { isLengthValid } = require('../helperFunctions/validityHelpers');
const { writeFileToDB } = require("../helperFunctions/crudHelpers");

async function initialRun() {
  const userArray = [];
  let newUserInfoObj = await newUserQA();
  if (!isLengthValid(newUserInfoObj.masterPassword.length)) {
    console.log('\n' + 'Returning To Previous Menu' + '\n');
    return await initialRun()
  }
  newUserInfoObj.masterPassword = hashText(newUserInfoObj.masterPassword)
  userArray.push(newUserInfoObj)
  writeFileToDB(`./config.json`, userArray)
}


async function userSelection(configFile) {
  let userNameArrayForQA = await configFile.map(obj => obj.user);
  let selectUserMenuAnswer = await selectUserMenuQA(userNameArrayForQA);
  let userSelected = configFile.filter((obj) => obj.user == selectUserMenuAnswer.destination ? obj : "");
  if (selectUserMenuAnswer.destination == 'Add New User Profile') {
    let newUser = await createUserProfile(configFile)
    return newUser ? newUser
      : await userSelection(configFile)
  }
  else if (selectUserMenuAnswer.destination == "Delete User Profile With Passwords") {
    await deleteUserProfile(userNameArrayForQA, configFile)
    await userSelection(configFile)
  }
  else if (selectUserMenuAnswer.destination == 'Exit') {
    return false
  }
  else {
    let masterPasswordVerifyAnswer = await masterPasswordVerificationQA();
    return !verifyHash(userSelected[0].masterPassword, masterPasswordVerifyAnswer.password)
      ? await userSelection(configFile)
      : userSelected[0].user
  }
}


async function loginUser(configFile) {
  let userProfile = await userSelection(configFile)
  return !userProfile
    ? false
    : userProfile
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

module.exports = { initialRun, userSelection, loginUser }