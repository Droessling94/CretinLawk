////**********IMPORTS*************////
const fs = require('fs');
const { encryptThis, decryptThis } = require('./utils/encrypt_decryptFunctions');
const { updatePWLibs } = require('./utils/updatePWLibsFunction');
const { mainMenuOptionsQA, showPassMainQA } = require('./utils/inquirerQA');
const { createANewPassword } = require('./utils/createANewPasswordFunctionality');
const { log } = require('console');
const { showPassWordsBySite, showAllPassWords, updatePassWord, deletePassword } = require('./utils/findAndShowPass');
const { loadConfigFile, initUserConfigSet } = require('./utils/configLoadNSetFunctionality');
////******************************////


async function mainMenu(user) {
    let menu = await mainMenuOptionsQA();

    if (menu.destination == 'Create a New Password') {
        await createANewPassword(user);
    }
    if (menu.destination == "Show Passwords") {
        menu = await showPassMainQA()
        if (menu.destination == "Find By Site Name") {
            await showPassWordsBySite(user)
        }
        if (menu.destination == "Show All") {
            await showAllPassWords(user)
        }
    }
    if (menu.destination == 'Update Password') {
            await updatePassWord(user)
    }
    if (menu.destination == 'Delete Password') {
            await deletePassword(user)
    }
    if (menu.destination == 'Change User Profile') {
        user = await loadConfigFile();
    }
    if (menu.destination == 'Exit') {
            return 
    }

    mainMenu(user);
}

async function onStart() {
    let userProfile = await loadConfigFile();
    await mainMenu(userProfile);
    console.log("Thank you for using CretinLawk!");
}


////**********SHOWPASSWORDS-TESTING*************////
// mainMenu('Donnie')
////********************************************////

//TODO -- ADD PACKAGE-LOCK.JSON TO GIT IGNORE AND FIX GIT HUB
//TODO -- ADD AN OPTION TO CHOOSE TO WANT NUMBERS AND SYMBOLS IF NAME IS TOO LONG IN INPUT
//TODO -- README FILE ADDITION WITH SOME VERBOSE INSTRUCTIONS
//TODO -- CAN CURRENTLY CHOOSE TO NOT ASSIGN A NAME TO USER PROFILE -- QA INPUT VALIDATION
//TODO -- POSSIBLY SET UP HINT SYSTEM
//TODO -- CLEAN UP QUESTIONS AND COMMAND LINE OUTPUT TO LOOK NICE
//BIGTODO -- REFACTOR THIS BITCH TO MAKE SENSE

onStart();


