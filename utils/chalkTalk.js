const chalk = require('chalk');

function majorAlert (alertText){
    //make a warning function to be resused for major events like DB deletion and app breaking errors RED
    console.log('\n'+'\n'+chalk.black.underline.bgRed('\n'+"↓↓↓↓↓↓↓↓ !!!ATTENTION!!! ↓↓↓↓↓↓↓↓"+'\n')
    +'\n'+chalk.red.underline(alertText)+'\n'+chalk.black.underline.bgRed('\n'+"↑↑↑↑↑↑↑↑ !!!ATTENTION!!! ↑↑↑↑↑↑↑↑"+'\n')+'\n'+'\n');
}
function minorAlert (alertText){
    //make a warning function to be resused for minor events like invalid passwords length or misinput master password etc YELLOW
    console.log('\n'+'\n'+chalk.black.underline.bgYellowBright('\n'+"↓↓↓↓↓↓↓↓ !!ALERT!! ↓↓↓↓↓↓↓↓"+'\n')
    + '\n'+chalk.yellowBright(alertText)+'\n'+chalk.black.underline.bgYellowBright('\n'+"↑↑↑↑↑↑↑↑ !!ALERT!! ↑↑↑↑↑↑↑↑"+'\n')+'\n'+'\n');
}
function successAlert (alertText){
    //make a alert function to be used on success and good stuff GREEN
    console.log('\n'+'\n'+chalk.black.underline.bgGreenBright('\n'+"↓↓↓↓↓↓↓↓ !Success! ↓↓↓↓↓↓↓↓"+'\n')
    + '\n'+chalk.greenBright(alertText)+'\n'+chalk.black.underline.bgGreenBright('\n'+"↑↑↑↑↑↑↑↑ !Success! ↑↑↑↑↑↑↑↑"+'\n')+'\n'+'\n');
}

function returnIntroAlert(){
    console.log(chalk.black.bgGreenBright('\n'+"Welcome!"+'\n')
    + chalk.greenBright('CRETINLAWK v1.1')+chalk.black.bgGreenBright('\n'+"↓↓↓↓↓↓↓↓"+'\n'));
 }
function firstIntroAlert(){
    console.log(chalk.black.bgGreenBright('\n'+"Welcome!"+'\n')
    + chalk.greenBright('CRETINLAWK v1.1')+'\n'+chalk.greenBright('Welcome To CretinLawk! Please Provide A Username And Masterpassword For Your Initial User Profile.')+chalk.black.bgGreenBright('\n'+"↓↓↓↓↓↓↓↓"+'\n'));
}

function postQuestionSpacer(){
    console.log('\n'+'\n'+'\n'+chalk.greenBright('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')+'\n'+'\n'+'\n')
}

function exitAlert(){
    // console.log('\n' + "Thank you for using CretinLawk!" + '\n');
    console.log(chalk.black.bgGreenBright('\n'+"~~~~~~~~~~~~~~Thank You!~~~~~~~~~~~~~~"+'\n')
    + chalk.greenBright('Hope To See You Again, And Dont Forget That Password!')+chalk.black.bgGreenBright('\n'+"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"+'\n'));
}

module.exports = {majorAlert,minorAlert,successAlert,returnIntroAlert,firstIntroAlert,postQuestionSpacer,exitAlert}
