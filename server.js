const express = require('express');
const path = require('path');
const SerialPort = require('serialport');
const app = express();
const port = process.env.PORT || 3000;

// Connect to the Pico's serial port
const picoSerialPort = 'COM4'; // Change this to the correct port for your system
const pico = new SerialPort(picoSerialPort, { baudRate: 9600 });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/color', (req, res) => {
  const { r, g, b } = req.body;
  const command = `set_rgb_color(${r}, ${g}, ${b})\r\n`;
  pico.write(command);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
