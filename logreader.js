var fs = require('fs');
var ls = require('./logspitter')
function logReader() {
  var HashMap = require('hashmap')
  var errorRegex = /.*(\[error\]).*/g;
  var serviceCheck = /(\[.*\]):/;
  var logOutput = {};
  var array = fs.readFileSync('log.txt').toString().split("\n");
  for(i in array) {
    var logLine = array[i];
    var match = errorRegex.test(logLine);
    if (match) {
      var m2 = serviceCheck.exec(logLine);
      var m2Split = m2[1].replace("[","").replace("]","").split(" ");
      if (m2Split[0] in logOutput) {
        logOutput[m2Split[0]]["instance_ids"].push(m2Split[1]);
      } else {
        logOutput[m2Split[0]] = {};
        logOutput[m2Split[0]]["instance_ids"] = [];
        logOutput[m2Split[0]]["instance_ids"].push(m2Split[1]);
      }
    }
  }
  for (var key in logOutput){
    var serviceObj = logOutput[key]
    serviceObj["error_count"] = serviceObj["instance_ids"].length
    for (i in serviceObj["instance_ids"]){
      var instanceID = serviceObj["instance_ids"][i]
      if (instanceID in serviceObj){
        serviceObj[instanceID]++
      } else {
        serviceObj[instanceID] = 1
      }
    }
  }
  ls.spitLogs(logOutput)
  return logOutput
}
module.exports.logReader = logReader;
