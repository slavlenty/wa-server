const express = require('express');
const http = require('http');
const fs = require('fs');
const readline = require('readline');
var cors = require('cors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const app = express();
const server = http.createServer(app);


const io = require('socket.io')(server
, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
  },
  serveClient: false,
  pingTimeout: 5000,
  pingInterval: 10000
});



function isValidJwt(token) {
    //todo validate token here
  console.log(token)
  return true;  
};


io.use((socket, next) => {
  if (isValidJwt(socket.handshake.query['token'])) {
    return next();
  }
  return next(new Error('connection denied'));
});

io.on('connection', (socket) => {
  console.log('hi: ' + socket.id);

  socket.join('agents');
  socket.on("disconnect", (reason) => {
    console.log('disconnected: ' + socket.id + ' because ' + reason); 
  });
  socket.on("agent", (aid) => {
    console.log(aid)
    socket.join(aid);
    console.log("agent: " + aid);
  });
  socket.on("event", (details) => {
    console.log("event: " + details)
  })
});
 
rl.on('line', (line) => {
  if(line == 'rooms') {
    console.log(io.sockets.adapter.rooms);
    return;
  }
  params = line.split(",");
  if(params[0] == "a")
    io.to(params[1]).emit("event", params[2]);
  else if(params[0] == "b")
    io.emit("event", params[1]);
 
});
 
server.listen(59080, () => {
  console.log('goto http://localhost:59080');
});
 
