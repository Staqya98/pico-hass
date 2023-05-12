const express = require('express');
const path = require('path');
const WebSocket = require('websocket').client;
const app = express();
const port = process.env.PORT || 3000;

// Connect to the Pico using WebSocket
const picoWebSocketUrl = 'ws://your-pico-ip-address:8266';
const wsClient = new WebSocket();

wsClient.on('connectFailed', (error) => {
  console.error(`Connection Error: ${error.toString()}`);
});

wsClient.on('connect', (connection) => {
  console.log('Connected to Pico WebSocket.');

  connection.on('error', (error) => {
    console.error(`Connection Error: ${error.toString()}`);
  });

  connection.on('close', () => {
    console.log('Connection closed.');
  });

  app.post('/api/color', (req, res) => {
    const { r, g, b } = req.body;
    const command = `set_rgb_color(${r}, ${g}, ${b})\r\n`;
    connection.sendUTF(command);
    res.json({ success: true });
  });
});

wsClient.connect(picoWebSocketUrl);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
