function getServices(jsonBlob) {
  var services = Object.keys(jsonBlob)
  return services
}

function getService(serviceID,jsonBlob) {
  var service = jsonBlob[serviceID]
  return service
}

function getErrors(serviceID,jsonBlob){
  var errors = jsonBlob[serviceID]["error_count"]
  return errors
}

function getInstances(serviceID,jsonBlob){
  var instances = jsonBlob[serviceID]["instance_ids"]
  return instances
}

function getInstance(serviceID,instanceID,jsonBlob){
  var outputObj = {}
  outputObj["instance_id"] = instanceID
  outputObj["error_count"] = jsonBlob[serviceID][instanceID]
  outputObj["service_id"] = serviceID
  return outputObj
}

module.exports = {
   getServices,
   getService,
   getErrors,
   getInstances,
   getInstance
}
