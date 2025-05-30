Takes game entities (in the sim, with perfect information) creates and updates tracks (based on sensors, have a confidence level and a list of possible identifications).

## Sensor Track
Each observer platforms maintains a **sensor track** for every entity it observes:
- Range Deviation (stddev of range from observer in meters)
- Direction Deviation (stddev of direction from observe in radians)
- Position Deviation (stddev of position in world space in meters)

The track can cross reference these values:
- Range/Direction deviation have an upper bound set by position deviation
- 