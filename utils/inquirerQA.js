////*****N-O-M*****////

////***************////


////**********IMPORTS*************////
const inquirer = require('inquirer');
////******************************////


////**********GLOBALS*************////
let menu = {}
////******************************////


function mainMenuOptionsQA() {
    return inquirer
    .prompt([
        {
            type: 'list',
            name:'destination',
            message: 'What would you like to do?',
            choices: ['Create a New Password', "Show Passwords", "Update Password" ,"Delete Password", "Change User Profile", "Exit"]
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}


function createANewRandomizedPasswordQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'site',
            message: 'What site or serivce is this a password for?'
        },
        {
            type: 'input',
            name:'login',
            message: "What is the site's login or username?"
        },
        {
            type: 'input',
            name:'pwLength',
            message: 'How long should this password be?'
        },
        {
            type: 'list',
            name:'numberChars',
            message: 'Allow numbers?',
            choices:["Yes","No"]
        },
        {
            type: 'list',
            name:'specialChars',
            message: 'Allow special characters?',
            choices:["Yes","No"]
        },
        {
            type: 'list',
            name:'upperCaseChars',
            message: 'Allow uppercased letters?',
            choices:["Yes","No"]
        },
    ])
    .then((passOptionAnswers) => {
        return passOptionAnswers;
    })
}

function findBySiteQA() {
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'siteName',
            message: "What Website's Password Do You Need To Access?"
        }
    ])
    .then((answers) =>{
        return answers
    })
}

function showPassMainQA() {
    return inquirer
    .prompt([
        {
            type: 'list',
            name:'destination',
            message: 'Which Password?',
            choices: ['Show All', 'Find By Site Name']
        }

    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function newUserQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'userName',
            message: "What is the User's name"
        },
        {
            type: 'password',
            name:'masterPassword',
            message: "What would you like the User's master password to be? This is very VERY important to remember, If you cannot remember this password there is no decrypting your saved passwords",
            mask: "*"
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function selectUserMenuQA(userArray){

    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'destination',
            message: "Pleas Select Which User To Login As, Or You Can Add A User, Delete A User Or Exit The Application",
            choices: [...userArray, "Add New User Profile", "Delete User Profile With Passwords", "Exit"]
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function masterPasswordVerificationQA(){
    
    return inquirer
    .prompt([
        {
            type: 'password',
            name:'password',
            message: "What is this User's master password?",
            mask: '*'
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}
function updatePassRandomQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'pwLength',
            message: 'How long should this password be?'
        },
        {
            type: 'list',
            name:'numberChars',
            message: 'Allow numbers?',
            choices:["Yes","No"]
        },
        {
            type: 'list',
            name:'specialChars',
            message: 'Allow special characters?',
            choices:["Yes","No"]
        },
        {
            type: 'list',
            name:'upperCaseChars',
            message: 'Allow uppercased letters?',
            choices:["Yes","No"]
        }])
        .then((passOptionAnswers) => {
        return passOptionAnswers;
    })
}
function updatePassManualQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'userPassword',
            message: 'What Would You Like Your New Password To Be?'
        }])
        .then((passOptionAnswers) => {
        return passOptionAnswers;
    })
}
function deleteUserMenuQA(userArray){
        return inquirer
        .prompt([
            {
                type: 'list',
                name:'destination',
                message: "Select User Profile To Delete",
                choices: [...userArray, 'Exit To Previous Menu']
            },
            {
                type: 'password',
                name:'password',
                message: "Deleting A User Profile Will Delete All Passwords, Please Confirm Your Masterpassword",
                mask: "*"
            },            {
                type: 'password',
                name:'passwordDoubleCheck',
                message: "Are You Sure? You Are About To Nuke Your Passwords, Re-Type Your Password A Second Time To Confirm",
                mask: "*"
            }
        ])
        .then((menuAnswers) =>{
            return menuAnswers
        })
}

function deletePasswordQA(site){
    return inquirer
    .prompt([
        {
            type: 'list',
            name:'confirmation',
            message: `You Are About To Delete ${site}'s Password From Your Database. Are You Sure?`,
            choices:["No","Yes"]
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function typeOfPasswordQA(){
    return inquirer
    .prompt([
        {
            type: 'list',
            name:'type',
            message: `What Type Of Password Would You Like?`,
            choices:["Fully Randomized [RECCOMMENDED]","Manually Entered"]
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}
function createANewManualPasswordQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'site',
            message: 'What site or serivce is this a password for?'
        },
        {
            type: 'input',
            name:'login',
            message: "What is the site's login or username?"
        },
        {
            type: 'input',
            name:'userPassword',
            message: 'What Would You Like To Set For This Password?'
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}



////**********MAIN-MENU-TESTING*************////
// async function mainMenu() {
//     await mainMenuOptionsQA();
//     if(menu.destination == 'Create a New Password'){
//         await createANewRandomizedPasswordQA();
//     }
// }
// mainMenu();
////*************************************************////



module.exports = { mainMenuOptionsQA , deleteUserMenuQA, updatePassRandomQA,updatePassManualQA, createANewManualPasswordQA, createANewRandomizedPasswordQA, findBySiteQA,showPassMainQA,newUserQA ,selectUserMenuQA,masterPasswordVerificationQA,deletePasswordQA,typeOfPasswordQA}