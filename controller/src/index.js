const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const robot = require('robotjs')

robot.setMouseDelay(2)

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/../remote/index.html');
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', (socket) => {
  socket.on('coordinates', (msg) => {
    let [movX, movY] = JSON.parse(msg);
    let {x: posX, y: posY} = robot.getMousePos();
    let newX = posX + movX;
    let newY = posY + movY;
    robot.moveMouse(newX, newY);
    console.log("new coords:", newX, newY)
  })
  console.log('a user connected');
});

http.listen(3123, () => {
  console.log('listening on *:3123');
});