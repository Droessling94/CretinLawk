////*****N-O-M*****////
//--Function is meant to read pwDB and update the local array of passwords on start--//
////***************////


////**********IMPORTS*************////
const fs = require('fs');
////******************************////


function updatePWLibs (identity, pwLib){
//--We feed the identity to the function to know whichfile to read from--//
    let rawdata = fs.readFileSync(`./db/${identity}PWDB.json`);
    let pwLibUpdate = JSON.parse(rawdata);
//--We feed the specific PWLib we want to update--//
    pwLib.push(...pwLibUpdate)
}


////**********UPDATEPWLIBS-FUNCTION-TESTING*************////
// const cretinPasswordLibrary = [];
// const donniePasswordLibrary = [];
//-- updatePWLibs function needs to be changed between local and module testing --//
// updatePWLibs('cretin', cretinPasswordLibrary);
// updatePWLibs('donnie', donniePasswordLibrary);
// console.log(cretinPasswordLibrary);
// console.log(donniePasswordLibrary);
////*************************************************////


module.exports = updatePWLibs