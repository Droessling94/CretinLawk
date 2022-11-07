////**********IMPORTS*************////
const { mainMenu} = require('./utils/passwordCrud');
const { chooseUser, initialRun} = require('./utils/profileManagement');
const { existsSync } = require('fs');
const { readAndParseFileFromDB } = require('./helperFunctions/crudHelpers');
const { successAlert, firstIntroAlert, returnIntroAlert, exitAlert } = require('./utils/chalkTalk');
////******************************////



async function onStart() {
    const initialRunCheck = existsSync(`./config.json`)

    if (!initialRunCheck) { 
        firstIntroAlert()
        await initialRun(); 
    } else {  returnIntroAlert()}

    let configFile = readAndParseFileFromDB(`./config.json`)

    let chosenUser = await chooseUser(configFile);
    if (!chosenUser) {
        exitAlert()
        return
    }
    if (chosenUser=='Exit'){
        return exitAlert()
    }

    successAlert(`Successfully Logged In As ${chosenUser.userName}`)

    await mainMenu(chosenUser, configFile);

    exitAlert()

}


////**********SHOWPASSWORDS-TESTING*************////
// mainMenu('Donnie')
////********************************************////


//TODO -- POSSIBLY SET UP HINT SYSTEM
//TODO -- REFACTOR TO LOOK PRETTIER AND BE MORE EFFCIENT


onStart();

