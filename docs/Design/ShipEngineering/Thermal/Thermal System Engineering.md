A simulation of thermal systems onboard a spaceship. Must be able to be simulated at extremely high speeds (days/second).

## Basic Elements
- **Heat Source**: Anything producing heat (watts)
	- Reactor
	- Weapons
	- General ship systems
- **Heat Sink**: Anything that can "store" heat up to some limit (joules)
	- Phase change heat sink
	- Fuel tanks
- **Radiator**: Radiates away heat (watts)
- **Heat Pump**: Moves heat from one place to another, at the cost of generating some more heat itself.
	- Efficiency is determined by how many joules it is moving, and the temperature difference.
- **Cooling Loop**: Operates at a set temperature, connects together devices
## Layout
- Every heat source is connected to a cooling loop, which has one or more radiators.
	- Optionally, connected through a heat pump
- Cooling loops have a set operating temperature
- Cooling loops can be attached to heat sinks
- Heat sinks can be connected to an output loop, always through a heat pump
## Flow Algorithm
- Every source calculates total joules produced given delta time
- Adds joules to it's cooling loop
	- If there's a heat pump, add extra joules to the cooling loop based on temperatures involved
- If total joules added exceeds the cooling capacity of the radiators in the loop, move heat into attached heat sinks which are currently cooler than the loop operating temperature
- If a loop has spare capacity left, move joules from a heat sink into the loop