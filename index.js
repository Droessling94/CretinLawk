////**********IMPORTS*************////
const { mainMenu} = require('./utils/passwordCrud');
const { chooseUser, initialRun} = require('./utils/profileManagement');
const { existsSync } = require('fs');
const { readAndParseFileFromDB } = require('./helperFunctions/crudHelpers');
const { successAlert } = require('./utils/chalkTalk');
////******************************////



async function onStart() {

    //INTRO CHALK PROMPT
    const initialRunCheck = existsSync(`./config.json`)
    if (!initialRunCheck) { await initialRun(); }
    let configFile = readAndParseFileFromDB(`./config.json`)
    let chosenUser = await chooseUser(configFile);
    if (!chosenUser) {
        console.log('\n' + "Thank you for using CretinLawk!" + '\n');
        return
    }
    if (chosenUser=='Exit'){
        return console.log('\n' + "Thank you for using CretinLawk!" + '\n');
    }
    successAlert(`Successfully Logged In As ${chosenUser}`)
    await mainMenu(chosenUser, configFile);
    console.log('\n' + "Thank you for using CretinLawk!" + '\n');
    //OUTRO CHALK PROMPT
}


////**********SHOWPASSWORDS-TESTING*************////
// mainMenu('Donnie')
////********************************************////

//TODO -- IF USER DELETES SELF IT AND EXITS IT WILL BRING THEM BACK TO MENU AS DELETED USER WITH FULL FUNCTIONALITY
//TODO -- WRITE A SMALL PROMPT ADVISING THE USER ALWAYS USE RANDOMLY GEND PASSWORDS AND TO WRITE DOWN AND NEVER FORGET MASTERPASS.
//TODO -- README FILE ADDITION WITH SOME VERBOSE INSTRUCTIONS
//TODO -- POSSIBLY SET UP HINT SYSTEM
//TODO -- UNLINK NOT ACTUALLY DELETING PW FILE FOR SOME REASON, REQUIRING MANUAL DELETION
//TODO -- CLEAN UP QUESTIONS AND COMMAND LINE OUTPUT TO LOOK NICE(getting There)
//BIGTODO -- HARMING OR HAMMING TABLE OR HUFFMAN TREE -- WAY OF ENCODING
//BIGTODO -- REFACTOR THIS BITCH TO MAKE SENSE(getting there)

onStart();

