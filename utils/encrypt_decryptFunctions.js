////*****N-O-M*****////
//--We will be using Symetric encryption/decryption because we will only have one key--//
//--An Initiliazation vector(initV) is salt (random data) added the beginning of ecrypted text, it also is part of the process to encrypting/decrypting text--//
//--This makes sure that the same text ecrypted multiple times will have different outcomes everytime--///
//--We'll be using AES-256-cbc for the algorithm, very secure and apparently would take billions of years to brute force--//
////***************////


////**********IMPORTS*************////
let crypto = require('crypto');
////******************************////


function encryptThis(text){
    const initV = crypto.randomBytes(16);
    const key = crypto.randomBytes(32);
//--creates a readable cipher that is using aes-26-cbc to encrypt with our key and IV--//
    const cipher = crypto.createCipheriv("aes-256-cbc", key , initV)
//--create a variable to hold our new encrypted data as we encrypt it block by block--//
    let encryptedData = cipher.update(text, 'utf-8', 'hex')
//--cipher.final is used to end the encryption and return our encrypted data--//
    encryptedData += cipher.final('hex')
//--return encryptedData because it IS our encrypted password--//
    return `${initV.toString("hex")}:${key.toString("hex")}:${encryptedData}`;
}


function decryptThis(text){
//--destructure our text by splitting it between colons (May need to change later--//
    let [initVForPass, keyForPass, encryptedData] = text.split(":")
//--turn the destructured initV and key used to encrypt into their hex values--//
    let initV = Buffer.from(initVForPass, "hex");
    let key = Buffer.from(keyForPass, "hex")
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, initV);
//--With key and initV used to gen pass known and dechipher started we actually decrypt the data--//
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
//--return decryptedData because it IS our decrypted text or password--//
    return decryptedData;
}


////**********ENCRYPTION-FUNCTION-TESTING*************////
// var gmailpassencry = encryptThis('0gniterC.');
// console.log(gmailpassencry);
////*************************************************////


////**********DECRYPTION-FUNCTION-TESTING*************////
// var gmailpassdecry = decryptThis(gmailpassencry);
// console.log(gmailpassdecry);
////**************************************************////

module.exports = { encryptThis , decryptThis }