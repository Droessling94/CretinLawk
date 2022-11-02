const chalk = require('chalk');

function majorAlert (alertText){
    //make a warning function to be resused for major events like DB deletion and app breaking errors RED
    console.log(chalk.black.underline.bgRed('\n'+"!!!ATTENTION!!!"+'\n')
    + chalk.red.underline(alertText)+chalk.black.underline.bgRed('\n'+"!!!ATTENTION!!!"+'\n'));
}
function minorAlert (alertText){
    //make a warning function to be resused for minor events like invalid passwords length or misinput master password etc YELLOW
    console.log(chalk.black.underline.bgYellowBright('\n'+"!!ALERT!!"+'\n')
    + chalk.yellowBright(alertText)+chalk.black.underline.bgYellowBright('\n'+"!!ALERT!!"+'\n'));
}
function successAlert (alertText){
    //make a alert function to be used on success and good stuff GREEN
    console.log(chalk.black.underline.bgGreenBright('\n'+"!Success!"+'\n')
    + chalk.greenBright(alertText)+chalk.black.underline.bgGreenBright('\n'+"!Success!"+'\n'));
}

// console.log(chalk.red('Hello World!'));
// console.log(chalk.black('Hello World!'));
// console.log(chalk.blackBright('Hello World!'));
// console.log(chalk.redBright('Hello World!'));
// console.log(chalk.blue('Hello World!'));
// console.log(chalk.bgBlueBright('Hello World!'));
// console.log(chalk.red.bgGreenBright('Hello World!'));
// console.log(chalk.green('Hello World!'));
// console.log(chalk.bgYellow('Hello World!'));
// console.log(chalk.bgYellowBright('Hello World!'));
// console.log(chalk.red.bold('Hello World!'));
// console.log(chalk.red.bold.underline('Hello World!'));
// // Nest styles
// console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
// majorAlert('chump')
// minorAlert('wrong password big chungus')
// successAlert('You Did It Yungus')
//bg means background and it goes last

module.exports = {majorAlert,minorAlert,successAlert}
