////*****N-O-M*****////
//--The idea here is to load up config file to set previous user and previous user password--//
//--If it cannot find a config file we will ask the user their info and make one--//
////***************////

const { initUserQA, loadUserQA, masterPasswordVerifyQA, verifyDeleteQA } = require("./inquirerQA");
const fs = require('fs');
const { hashText, verifyHash } = require("./hashAndVerifyFunctionality");

async function initUserConfigSet(){
    const userArray = [];
    let newUserInfoObj = await initUserQA();
    // console.log(newUserInfoObj);
    newUserInfoObj.masterPassword = await hashText(newUserInfoObj.masterPassword)
    // console.log(newUserInfoObj);
    userArray.push(newUserInfoObj)
    fs.writeFileSync(`./config.json`,
      JSON.stringify(userArray, null, 4),
      (err) => err ? console.error(writeErr) : console.info('Success!'));

    return newUserInfoObj.user
}

//--currently also holding delete user functionality, move out in refactor--//
async function userConfigSelection(parsedConfigFile){
    let userArrayforQA = await parsedConfigFile.map( obj => obj.user)
    let userSelection = await loadUserQA(userArrayforQA)
    let userArrayforLogin = await parsedConfigFile.filter( (obj) => obj.user == userSelection.user ? obj : "")
  // console.log(userArrayforQA);
    if(userSelection.user == 'Add New User Profile'){
      let newUserInfoObj = await initUserQA();
    // console.log(newUserInfoObj);
    newUserInfoObj.masterPassword = await hashText(newUserInfoObj.masterPassword)
    // console.log(newUserInfoObj);
    parsedConfigFile.push(newUserInfoObj)
    fs.writeFileSync(`./config.json`,
      JSON.stringify(parsedConfigFile, null, 4),
      (err) => err ? console.error(writeErr) : console.info('Success!'));

    return newUserInfoObj.user
    } 
    else if(userSelection.user=="Delete User Profile With Passwords") {
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
        fs.writeFileSync(`./config.json`, JSON.stringify(parsedConfigFile, null, 4),
                (err) => err ? console.error(writeErr) : console.info('Success!'));
        //deletes PWDB.JSON
        const fileExistsCheck = fs.existsSync(`./db/${userArrayforDeletion[0].user}PWDB.json`);
        if(fileExistsCheck){
          fs.unlink(`./db/${userArrayforDeletion[0].user}PWDB.json`, (err => {
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
      // console.log(userSelection);
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
    const intialUserCheck = fs.existsSync(`./config.json`);
    if(intialUserCheck){
      const configFileStringified = fs.readFileSync(`./config.json`, 'utf8', (err,data) => {
        err ? console.error("Error @ fs readfile @ beginning createANewPassword function " + err) : data;
      })
      let configFileParsed = await JSON.parse(configFileStringified)
      let userProfile = await userConfigSelection(configFileParsed)
        return userProfile
    } else {
        return await initUserConfigSet()
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

module.exports = {initUserConfigSet,userConfigSelection,loadConfigFile}