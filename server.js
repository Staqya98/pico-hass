const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const SerialPort = require('serialport');

// Replace "COM4" with the correct serial port for your Pico
const port = new SerialPort("COM4", { baudRate: 9600 });

port.on("open", () => {
  console.log("Serial port opened");

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('set_rgb_led', (data) => {
    console.log('set_rgb_led', data);
    const message = `r${data.r}g${data.g}b${data.b}\n`;
    port.write(message, (err) => {
      if (err) {
        console.log("Error writing to serial port:", err);
        }
      }); 
    });
  });
});
  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
