# The locator
Locator is a PCF tool that uses the Device.GetCurrentPosition on a timer.
Every second, the current location is being retrieved.
If a target latitude and longitude is given, via the Haversine function a distance is calculated between the current position and the target.

## Inputs
target_latitude - The latitude of a potential area
target_longitude - The longitude of a potential area
## Outputs
latitude - The current latitude value of your position
longitude - The current longitude value of your position
distance - The distance between the current location and the target, calculated via the Haversine function.
distance_miles - The distance in miles
