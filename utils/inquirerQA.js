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


function createANewPasswordQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'site',
            message: 'What site is this a password for?'
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
            message: 'What website or service do you need the password for?'
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
            choices: ['Find By Site Name', 'Show All']
        }

    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function initUserQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'user',
            message: "What is the User's name"
        },
        {
            type: 'input',
            name:'masterPassword',
            message: "What would you like the User's master password to be? This is very VERY important to remember, If you cannot remember this password there is no decrypting your saved passwords",
        }

    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function loadUserQA(userArray){

    return inquirer
    .prompt([
        {
            type: 'list',
            name:'user',
            message: "Pleas Select Which User To Login As, Or You Can Add A User, Delete A User Or Exit The Application",
            choices: [...userArray, "Add New User Profile", "Delete User Profile With Passwords", "Exit"]
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}

function masterPasswordVerifyQA(){
    
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'password',
            message: "What is this User's master password?",
        }
    ])
    .then((menuAnswers) =>{
        return menuAnswers
    })
}
function updatePassQA(){
    return inquirer
    .prompt([
        {
            type: 'input',
            name:'pwLength',
            message: 'How long should this password be?'
        },
        {
            type: 'confirm',
            name:'numberChars',
            message: 'Allow numbers?',
        },
        {
            type: 'confirm',
            name:'specialChars',
            message: 'Allow special characters?',
        }
    ])
    .then((passOptionAnswers) => {
        return passOptionAnswers;
    })
}
function verifyDeleteQA(userArray){
        return inquirer
        .prompt([
            {
                type: 'list',
                name:'user',
                message: "Select User Profile To Delete",
                choices: [...userArray]
            },
            {
                type: 'input',
                name:'password',
                message: "Deleting A User Profile Will Delete All Passwords, Please Confirm Your Masterpassword",
            },            {
                type: 'input',
                name:'passwordDoubleCheck',
                message: "Confirm The Password A Second Time",
            },            {
                type: 'input',
                name:'passwordTripleCheck',
                message: "Confirm The Password A Third Time, You're About To Blow Up All Of Your Passwords",
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
//         await createANewPasswordQA();
//     }
// }
// mainMenu();
////*************************************************////


module.exports = { mainMenuOptionsQA , verifyDeleteQA, updatePassQA, createANewPasswordQA, findBySiteQA,showPassMainQA,initUserQA ,loadUserQA,masterPasswordVerifyQA}