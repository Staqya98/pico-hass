const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Board, Led } = require("johnny-five");

const board = new Board({ repl: false });

board.on("ready", () => {
    const led = new Led.RGB({ pins: { red: 5, green: 6, blue: 7 } });
    led.color("#000000");
  
    io.on('connection', (socket) => {
      console.log('a user connected');
  
      socket.on('set_rgb_led', (data) => {
        console.log('set_rgb_led', data);
        led.color(data.r, data.g, data.b);
      });
    });
  });
  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
