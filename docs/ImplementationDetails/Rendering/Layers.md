Space is really big. Unfortunately this little known fact means that rendering very large things (planets) and very small things (spaceships) leads to some difficulties.

The Ephemeris simulation runs entirely in world space, with Sol at the origin, using double precision numbers. GameObjects in the Unity scene are scaled and offset ([[SceneScaleTricks]]) such that one particular entity is at the origin, e.g. Earth during an Earth/Luna combat scenario.

Rendering is split into 4 layers:
- `Astronomical Object`: planets, moons etc
- `Astronomical Overlay`: things that should be visible in astronomical mode
- `Small Object`: ships, stations etc
- `Small Overlay`: things that should be visible in ship mode
## Camera Modes
Ephemeris has 2 cameras, stacked on top of each other.
### Astronomical Mode/Map Mode
In this mode you're focusing on planets, orbits etc - this is the "strategic" view.
 - `Astronomical Camera`
	 - Renders layers: `Astronomical Object`, `Astronomical Overlay`
 - `Small Camera`:
	 - Disabled
#### Final Layers
- `Astronomical Object`
- `Astronomical Overlay`
### Ship Mode
In this mode you're focused on one single small object (ship, station, maybe asteroids) - this is the "tactical" view.
- `Astronomical Camera`
	- Renders layers: `Astronomical Object`
	- Position: Set to exactly the position of the ship being viewed
	- Rotation: Copied from small camera
- `Small Camera`
	- Renders layers: `Small Object`, `Small Overlay`

#### Final Layers
- `Astronomical Object`
- `Small Object`
- `Small Overlay`