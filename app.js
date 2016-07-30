var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("Client connected ...");
  client.on('messages', function(data) {
    console.log(data);
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/mychat_style.css', function(req, res) {
  res.sendFile(__dirname + '/mychat_style.css');
});

server.listen(8080);
