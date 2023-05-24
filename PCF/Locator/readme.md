# The locator
Locator is a PCF tool that uses the Device.GetCurrentPosition on a timer.
Every second, the current location is being retrieved.
If a target latitude and longitude is given, via the Haversine function a distance is calculated between the current position and the target.
