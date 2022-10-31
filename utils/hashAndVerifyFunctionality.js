////*****N-O-M*****////
//--Using this module for functions involving hashing a password and verifying it later--//
////***************////

const { log } = require('console');
const crypto = require('crypto');


async function hashText(text, dbSalt){
    const salt = dbSalt || crypto.randomBytes(16).toString('hex');
    let hashedText = crypto.pbkdf2Sync(text, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hashedText}`;
}

async function verifyHash(dbHash, textToVerify){
    let [salt, userHashedText] = dbHash.split(':');
    let hashedSaltNTextToVerify = await hashText(textToVerify, salt);

    let [throwAwaySalt, hashTextToVerifyPreBuffer] = hashedSaltNTextToVerify.split(':');
    if(userHashedText == hashTextToVerifyPreBuffer ){
        return true
    } else { 
        return false
    }
}

////**********HASHTEXT-TESTING*************////
// async function localTestWrapper(){
//     let testHash = await hashText('test123')
//     console.log(testHash);
// }
// localTestWrapper()
////**************************************************////

////**********VERIFYHASH-TESTING*************////
// async function localTestWrapper(){
//     let testHash = await hashText('test')
//     console.log(testHash);
//     await verifyHash(testHash, 'test1254')
// }
// localTestWrapper()
////**************************************************////

module.exports = { hashText, verifyHash}