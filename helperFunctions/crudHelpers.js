const fs = require('fs');
const {minorAlert, successAlert, majorAlert} = require('../utils/chalkTalk');

function writeFileToDB(path, preStringifiedData){
    fs.writeFileSync(path, JSON.stringify(preStringifiedData, null, 4),
    (err) => err ? minorAlert('File Was Unable To Be Saved')
                 : successAlert("File Saved."))
};

function readAndParseFileFromDB(path){
    const fileContents = fs.readFileSync(path, 'utf8', (err, data) => 
        err ? majorAlert('File Was Unable To Be Read') : data)
    const parsedFileContents = JSON.parse(fileContents)
        return parsedFileContents;
}

function writeDB(path){
    fs.mkdirSync(path, (err) => err ? majorAlert('File Was Unable To Be Saved')
    : successAlert("Database Intialized."))
}

function findBySite(pWLib, siteName) {
    const foundSiteList = pWLib.filter(Obj => {
        return Obj.site == siteName
    })
    const foundSite = foundSiteList[0]
    return foundSite;
}

module.exports = {writeFileToDB,writeDB,readAndParseFileFromDB,findBySite}