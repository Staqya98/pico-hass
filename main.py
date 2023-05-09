import machine
import picozero as pz

# Define pins for RGB LED
red_pin = machine.Pin(5, machine.Pin.OUT)
green_pin = machine.Pin(6, machine.Pin.OUT)
blue_pin = machine.Pin(7, machine.Pin.OUT)

# Set up RGB LED with PicoZed
pwm = machine.PWM
red_pwm = pwm(red_pin)
green_pwm = pwm(green_pin)
blue_pwm = pwm(blue_pin)
rgb = pz.RGBLED(red_pwm, green_pwm, blue_pwm)

# Define function to set RGB color
def set_rgb_color(r, g, b):
    rgb.set(r, g, b)

# Define initial color
set_rgb_color(0, 0, 0)

# Set up web server with Socket.IO
import socketio
sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

@sio.on('set_rgb_led')
def handle_set_rgb_led(sid, data):
    r = int(data['r'])
    g = int(data['g'])
    b = int(data['b'])
    set_rgb_color(r, g, b)
    print('set_rgb_led', r, g, b)

# Run web server
import eventlet
eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
