from machine import Pin
from picozed import PicoZed

# Define pins for RGB LED
red_pin = Pin(5, Pin.OUT)
green_pin = Pin(6, Pin.OUT)
blue_pin = Pin(7, Pin.OUT)

# Set up PicoZed for RGB LED
rgb_led = PicoZed(red_pin, green_pin, blue_pin)

# Define function to set RGB color
def set_rgb_color(r, g, b):
    rgb_led.set_rgb(r, g, b)

# Define initial color
set_rgb_color(0, 0, 0)

# Loop to test RGB LED
while True:
    set_rgb_color(255, 0, 0)
    time.sleep(1)
    set_rgb_color(0, 255, 0)
    time.sleep(1)
    set_rgb_color(0, 0, 255)
    time.sleep(1)
