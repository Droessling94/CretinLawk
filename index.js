////**********IMPORTS*************////
const { mainMenuOptionsQA, showPassMainQA } = require('./utils/inquirerQA');
const { createANewPassword } = require('./utils/createANewPasswordFunctionality');
const { showPassWordsBySite, showAllPassWords, updatePassWord, deletePassword } = require('./utils/findAndShowPass');
const { loginUser, initialRun } = require('./utils/configLoadNSetFunctionality');
const {existsSync} = require('fs');
const { readAndParseFileFromDB } = require('./helperFunctions/crudHelpers');
////******************************////

async function mainMenu(user, configFile) {
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
        user = await loginUser(configFile);
    }
    if (menu.destination == 'Exit') {
            return 
    }

    mainMenu(user, configFile);
}

async function onStart() {

    //set up initial run check to add db if not added
    const initialRunCheck = existsSync(`./config.json`)
    if(!initialRunCheck) { await initialRun(); }
    let configFile =  readAndParseFileFromDB(`./config.json`)
    let userProfile = await loginUser(configFile);
    if(!userProfile) {
        console.log('\n'+"Thank you for using CretinLawk!"+'\n');
        return
    }
    console.log('\n'+`Successfully Logged In As ${userProfile}`+'\n');
    await mainMenu(userProfile, configFile);
    console.log('\n'+"Thank you for using CretinLawk!"+'\n');
}


////**********SHOWPASSWORDS-TESTING*************////
// mainMenu('Donnie')
////********************************************////



//TODO -- COPY TO CLIPBOARD OPTION
//TODO -- CONFIRMATION FOR INPUT VALIDITY
//TODO -- README FILE ADDITION WITH SOME VERBOSE INSTRUCTIONS
//TODO -- CAN CURRENTLY CHOOSE TO NOT ASSIGN A NAME TO USER PROFILE -- QA INPUT VALIDATION
//TODO -- POSSIBLY SET UP HINT SYSTEM
//TODO -- CLEAN UP QUESTIONS AND COMMAND LINE OUTPUT TO LOOK NICE
//TODO -- ENCRYPT CODE THAT ONLY RUNS WITH A KEY POSSIBLY
//TODO -- INTERGRATE NPMCHALK FOR BETTER APP READABLIITY
//TODO -- CHANGE START MENU TO HAVE USER SELECTION - EXIT APP FUNCTIONALITY
//TODO -- CHANGE EXIT IN USER SELECTION TO MEAN EXIT BACK TO MAIN MENU OR APP START SCREEN DEPENDING ON WHERE YOU CAME FROM
//BIGTODO -- HARMING OR HAMMING TABLE OR HUFFMAN TREE -- WAY OF ENCODING
//BIGTODO -- REFACTOR THIS BITCH TO MAKE SENSE
onStart();

