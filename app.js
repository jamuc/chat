var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("Client connected ...");

  client.on('join', function(name) {
    client.name = name;
  });

  client.on('messages', function(data) {
    console.log(data);
    client.emit('messages', "<li>" + client.name + ": <span>" + data + "</span></li>");
    client.broadcast.emit('messages', "<li>" + client.name + ": <span>" + data + "</span></li>");
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/mychat_style.css', function(req, res) {
  res.sendFile(__dirname + '/mychat_style.css');
});

server.listen(8080);
