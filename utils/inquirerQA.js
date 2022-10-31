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
            type: 'confirm',
            name:'numberChars',
            message: 'Allow numbers?',
        },
        {
            type: 'confirm',
            name:'specialChars',
            message: 'Allow special characters?',
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
            message: "Select User Profile",
            choices: [...userArray, "Add New User Profile", "Delete User Profile With Passwords"]
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
                message: "Deleting a User Profile will also delete their associated passwords, due to this being such a costly mistake you will need to input your password thrice. What is this User's master password?",
            },            {
                type: 'input',
                name:'passwordDoubleCheck',
                message: "What is this User's master password?",
            },            {
                type: 'input',
                name:'passwordTripleCheck',
                message: "What is this User's master password?",
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