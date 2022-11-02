////**********IMPORTS*************////
const { mainMenu} = require('./utils/passwordCrud');
const { chooseUser, initialRun} = require('./utils/profileManagement');
const { existsSync } = require('fs');
const { readAndParseFileFromDB } = require('./helperFunctions/crudHelpers');
////******************************////



async function onStart() {
    const initialRunCheck = existsSync(`./config.json`)
    if (!initialRunCheck) { await initialRun(); }
    let configFile = readAndParseFileFromDB(`./config.json`)
    let userProfile = await chooseUser(configFile);
    if (!userProfile) {
        console.log('\n' + "Thank you for using CretinLawk!" + '\n');
        return
    }
    if (userProfile=='Exit'){
        return console.log('\n' + "Thank you for using CretinLawk!" + '\n');
    }
    console.log('\n' + `Successfully Logged In As ${userProfile}` + '\n');
    await mainMenu(userProfile, configFile);
    console.log('\n' + "Thank you for using CretinLawk!" + '\n');
}


////**********SHOWPASSWORDS-TESTING*************////
// mainMenu('Donnie')
////********************************************////



//TODO -- COPY TO CLIPBOARD OPTION
//TODO -- README FILE ADDITION WITH SOME VERBOSE INSTRUCTIONS
//TODO -- POSSIBLY SET UP HINT SYSTEM
//TODO -- CLEAN UP QUESTIONS AND COMMAND LINE OUTPUT TO LOOK NICE(getting There)
//TODO -- INTERGRATE NPMCHALK FOR BETTER APP READABLIITY
//BIGTODO -- HARMING OR HAMMING TABLE OR HUFFMAN TREE -- WAY OF ENCODING
//BIGTODO -- REFACTOR THIS BITCH TO MAKE SENSE(getting there)
onStart();

