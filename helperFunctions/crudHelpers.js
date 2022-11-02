const fs = require('fs');

function writeFileToDB(path, preStringifiedData){
    fs.writeFileSync(path, JSON.stringify(preStringifiedData, null, 4),
    (err) => err ? console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'File Was Unable To Be Saved'+'\n') 
                 : console.log('\n'+"File Saved."+'\n'));
};

function readAndParseFileFromDB(path){
    const fileContents = fs.readFileSync(path, 'utf8', (err, data) => 
        err ? console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'File Was Unable To Be Read'+'\n') : data)
    const parsedFileContents = JSON.parse(fileContents)
        return parsedFileContents;
}

function writeDB(path){
    fs.mkdirSync(path, (err) => err ? console.log('\n'+"!!!ERROR!!!---!!!ERROR!!!---!!!ERROR!!!"+'\n'+'\n'+'File Was Unable To Be Saved'+'\n') 
    : console.log('\n'+"Database Intialized."+'\n'))
}

function findBySite(pWLib, siteName) {
    const foundSiteList = pWLib.filter(Obj => {
        return Obj.site == siteName
    })
    const foundSite = foundSiteList[0]
    return foundSite;
}

module.exports = {writeFileToDB,writeDB,readAndParseFileFromDB,findBySite}