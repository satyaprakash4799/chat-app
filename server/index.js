const express = require('express');
const socketio = require('socket.io');

const http = require('http');
const router = require('./router');

const {
  addUser,
  removeUser,
  getUsersInRoom,
  getUser,
  addUsers,
} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 4000;

app.use(router);

io.on('connection', (socket) => {
  console.log('We have a new connection!');

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    // callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (user)
      io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User has left!!!!');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
