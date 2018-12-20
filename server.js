'use strict';

const express = require('express');
const lr = require('./logreader');
const jp = require('./jsonparser')
const logger = require('./logs')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}


app.use(rawBody);

app.get('/', (req, res) => {
  var jsonLog = lr.logReader()
  res.send(JSON.stringify(jsonLog))
});

app.get('/service_ids',(req,res) => {
  var jsonLog = lr.logReader()
  var service_ids = jp.getServices(jsonLog)
  res.send(JSON.stringify(service_ids))
});


app.get('/service_ids/:service_id',(req,res) => {
  var jsonLog = lr.logReader()
  var service_id = req.params.service_id
  var service_ids = jp.getService(service_id,jsonLog)
  res.send(JSON.stringify(service_ids))
});

app.get('/service_ids/:service_id/:errors',(req,res) => {
  var jsonLog = lr.logReader()
  var service_id = req.params.service_id
  var error_count = jp.getErrors(service_id,jsonLog)
  res.send(error_count)
});

app.get('/service_ids/:service_id/instances',(req,res) => {
  var jsonLog = lr.logReader()
  var service_id = req.params.service_id
  var instances = jp.getInstances(service_id)
  res.send(JSON.stringify(instances))
});

app.get('/service_ids/:service_id/:instance_id',(req,res) => {
  var jsonLog = lr.logReader()
  var service_id = req.params.service_id
  var instance_id = req.params.instance_id
  var instance = jp.getInstance(service_id,instance_id,jsonLog)
  res.send(JSON.stringify(instance))
});

app.get('/log',(req,res) => {
  var logs = logger.getLogs()
  res.send(logs)
});

app.post('/log',(req,res) => {
  var logInfo = req.rawBody
  logger.newLog(logInfo)
  res.send("updated")
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
