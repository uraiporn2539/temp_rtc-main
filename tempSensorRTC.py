import sys
import Adafruit_DHT
import busio
import adafruit_ds3231
import requests

from board import *

rtcI2C=busio.I2C(SCL,SDA)
rtc=adafruit_ds3231.DS3231(rtcI2C)

t=rtc.datetime

while True:
    humidity, temperature = Adafruit_DHT.read_retry(11,24)
    if humidity is not None and temperature is not None:
        tempSensorRTC={
            "temperature": temperature,
            "humidity": humidity,
            "year": t.tm_year,
            "month": t.tm_mon,
            "day": t.tm_mday,
            "hour": t.tm_hour,
            "minute": t.tm_min
        }
        res=requests.post('http://localhost:3000/addData',tempSensorRTC)
        print(res) 
        #print(str(humidity)+"% "+str(temperature)+"*C")
        #print(rtc.datetime)
        break
