import sys
import json
import serial
from time import sleep

serial_port = sys.argv[1]  # Replace this with your Pico's serial port
baud_rate = 9600

# Connect to the Pico's serial port
pico = serial.Serial(serial_port, baud_rate)
sleep(2)  # Give some time for the connection to establish

# Read commands from stdin (coming from the Node.js server)
for line in sys.stdin:
    data = json.loads(line.strip())
    command = f'set_rgb_color({data["r"]}, {data["g"]}, {data["b"]})\r\n'
    pico.write(command.encode())
