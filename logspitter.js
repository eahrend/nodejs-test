async function spitLogs(jsonBlob){
  var output = ""
  for (key in jsonBlob) {
    output += key + " errors: " + jsonBlob[key]["error_count"] + "\r\n"
    for (serviceKey in jsonBlob[key]) {
      if (serviceKey == "error_count" || serviceKey == "instance_ids")
      {
        continue
      }
      output += key + "/" + serviceKey + " errors: " + jsonBlob[key][serviceKey] + "/" + jsonBlob[key]["error_count"] + "\r\n"
    }
  }
  console.log(output)
}

module.exports = {
  spitLogs
}
