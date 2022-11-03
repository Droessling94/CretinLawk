////*****N-O-M*****////
//--The idea here is to load up config file to set previous user and previous user password--//
//--If it cannot find a config file we will ask the user their info and make one--//
////***************////

const { newUserQA, selectUserMenuQA, masterPasswordVerificationQA } = require("./inquirerQA");
const { deleteUserProfile, createUserProfile } = require('./profileCrud')
const { hashText, verifyHash } = require("./security");
const { isLengthValid } = require('../helperFunctions/validityHelpers');
const { writeFileToDB } = require("../helperFunctions/crudHelpers");
const { successAlert, postQuestionSpacer } = require("./chalkTalk");

async function initialRun() {
  const initialDB = [];
  return !await createUserProfile(initialDB) ? await initialRun() : ""
}


async function loginUser(configFile) {

  let userNameArrayForQA = await configFile.map(obj => obj.userName );
  let selectUserMenuAnswer = await selectUserMenuQA(userNameArrayForQA);
  postQuestionSpacer();
  if (selectUserMenuAnswer.destination == 'Add New User Profile') {
    let newUser = await createUserProfile(configFile)
    return newUser ? newUser
      : await loginUser(configFile)
  }
  else if (selectUserMenuAnswer.destination == "Delete User Profile With Passwords") {
    await deleteUserProfile(userNameArrayForQA, configFile)
    return await loginUser(configFile)
  }
  else if (selectUserMenuAnswer.destination == 'Exit') {
    return 'Exit'
  }
  else {
    let masterPasswordVerifyAnswer = await masterPasswordVerificationQA();
    postQuestionSpacer();
    let userSelected = configFile.filter((obj) => obj.userName == selectUserMenuAnswer.destination ? obj : "");
    return !verifyHash(userSelected[0].masterPassword, masterPasswordVerifyAnswer.password)
      ? await loginUser(configFile)
      : userSelected[0].userName
  }
}


async function chooseUser(configFile) {
  let userProfile = await loginUser(configFile)
  return !userProfile ? await chooseUser(configFile) 
    : userProfile == 'Exit' ? 'Exit' 
    : userProfile
}

async function changeUser(user, configFile){
  replacementUser = await chooseUser(configFile);
  if(replacementUser == 'Exit') {
      return user
  }
  successAlert(`Logged In As ${replacementUser}`)
  return replacementUser
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

module.exports = { initialRun, loginUser, chooseUser, changeUser }