const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const robot = require('robotjs')

const factor = 10;
robot.setMouseDelay(2);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('coordinates', ([movX, movY]) => {
    movX = parseInt(movX)/factor;
    movY = -parseInt(movY)/factor;
    let {x: posX, y: posY} = robot.getMousePos();
    let newX = posX + movX;
    let newY = posY + movY;
    robot.moveMouse(newX, newY);
    console.log(movX, movY, '->', newX, newY)
  });
  socket.on('left click', (_) => {
    console.log('left click');
    robot.mouseClick('left');
  });
  socket.on('right click', (_) => {
    console.log('right click');
    robot.mouseClick('right');
  });
  console.log('a user connected');
});

http.listen(3123, () => {
  console.log('listening on *:3123');
});