const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');


const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.use('/client', (req, res) => {
  res.sendFile(__dirname, '/client/index.html')
})

app.use((req, res) => {
  res.status(404).send({message: 'NOT FOUND 404'});
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  let me = {};

  socket.on('login', (name) => {
    console.log(name + ' has logged in!');
    me = {name: name, id: socket.id}

    users.push(me);
    socket.broadcast.emit('botmsg', name + ' has joined the conversation :)');
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message',  message);
  });

  socket.on('disconnect', () => {
    console.log('You\'ve got disconnected from the server');
    socket.broadcast.emit('botmsg', me.name + ' has left :(')
    let user = users.indexOf(me);
    users.splice(user, 1);
  });
});