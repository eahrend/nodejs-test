var fs = require('fs')

function getLogs(){
  var logInfo = fs.readFileSync('log.txt')
  return logInfo
}

function newLog(logBody){
  return fs.writeFile('log.txt',logBody,(err) => {
    if (err) throw err;
  });
}



module.exports = {
  getLogs,
  newLog
}
