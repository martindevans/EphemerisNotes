---
tags:
  - devlog
sidebar_position: 5
---
## Thursday 1st
- Experimenting with ways to indicate multiple contacts aggregated together into one
	- dots like a dice https://medium.com/@thaneheninger/designing-dotted-die-faces-2ae7d39645ac
	- Symbols (dot = 1, triangle = 3, square = 4 etc)
	- Just a number
- Setting up scene for zooming and scaling rings
- Experimenting with distance invariant scaling
	- Scaling rings with distance
	- Placing text on ring/line intersections
	- Scaling text with distance for constant size
	- "Logarithmic rounding" of distance values
- Better string caching
## Friday 2nd
- Experimenting with another way to draw rings, smoothly fading in new distance bands as you zoom out
- Drawing line segments over arc when view angle is straight on, this prevents arcs disappearing when viewed from acute angle
## Tuesday 6th
- Added thickening to arcs when viewed at straight on view. Making it more obvious as the view approaches straight on.
- Experimenting with icons for groups of objects
	- Dots
		- Stacked vertically
			- Show count once max stack size is reached
		- Dice
	- Just numbers
	- Final version:
		- Stacked dots, with number count show for any stack count (i.e. more than 1)
- Showing different outline on hot and hold contacts
	- hot = triangle corners
	- cold = lines
- Started pulling out common drawing methods to `DrawEx` class
## Wednesday 7th
- Adding straight velocity lines as well as projected arc lines
	- This looks very cluttered and is hard to read
- Changing line thickness for velocity lines (noots instead of pixels)
- Extracting some more `DrawEx` methods
	- Ring of outward facing lines
- Split indicator drawing out to a separate class
	- Rewriting indicator drawing to handle groups icons
## Thursday 8th
- Using torus segment instead of arc for drop arcs, this fixes them becoming thin when viewed end on
- Aligned cold indicators with direction of travel
- Updating polyline shader:
	- Pass through distance and time as vertex data
	- Threshold in time (smooth cut-off as time passes)
	- Dashes in distance
	- Also dashes in time (acts as an indicator of speed)
- Updating polyline generation to generate mesh bounds for culling
- Added constant screen size thickness to polyline, adapting width in vertex shader to prevent it becoming too thin
## Friday 9th
- Rewriting polyline generator to fix some winding issues
- Updating tactical view to use pixel thickness
- Moved polyline points data generation into a job
	- [x] Fix generation with deferred arrays
- Added support for tinting/blinking lines
## Monday 12th
- Storing time in polyline vertices
- Testing dashing of velocity lines
- Added caching for text elements in velocity lines
- Handling corner case of arc projection when passing over poles
	- Drawing dropline instead of droparc
	- Tweaking position a tiny amount by velocity, so it's not over the pole
- Fixed generation of invalid bounding box for polylines with no points
- Added "direct" lines (from inner sphere to position)
- Added "inner arc" (arc from XZ plane to projected position on inner sphere)
- Added sphere showing ship orientation
- Text scaling for velocity lines
- Measuring outer radius of rings and clamping velocity lines to end at that point
- Adapting camera near/far plane to radius of tactical view allowing for infinite zoom (and inevitable Z-buffer precision issues in the future)
## Tuesday 13th
- Adding ship attitude indicator
- Building entity system sim for tactical view
	- Adding ship entity
	- Adding contact entities
- Creating components to represent contact data
- Investigating representing track numbers using other bases
## Wednesday 14th
- Generating some ISR ideas [[Design/ISR/Ideas]]
- Experimenting with SIMD in basic `Myriad.Dynamics` integrator
	- There's no 256 bit `fmadd_ps` instruction :(
- Copying contact data out from ECS
- Improved ship attitude indicator
- Fixed string cache returning incorrect strings when large
- More precise timing info for end of path
- Better time formatting for end of path
- Experimenting with kalman filtering to sensors
- Experimenting with particle filters
## Thursday 15th
- More particle filter experiments
	- Using particle filter could work for integrating sensor data, but would be complicated to tune. Probably better to fake it.
- Added lots of helper functions over spans for statistics
## Friday 16th
- Experimenting with noise generators for sensor simulation
	- Pink noise - Random walk with smoothing, strong low frequency components
	- White noise - pure random gaussian, thermal noise
	- [Shot noise](https://en.wikipedia.org/wiki/Shot_noise) - White noise correlated with `sqrt(signal)`.
	- Quantisation noise - Round to nearest N, simulating limited sensor resolution
	- Dropout - Set readings to zero
	- [Impulse Noise](https://en.wikipedia.org/wiki/Impulse_noise_(acoustics)) - generate occasional spikes in noise which last for a short duration.
	- Sensor modelling
		- e.g. instead of adding noise to XYZ position, convert into bearing/azimuth/range from sensor, add noise, then convert back to position
- Building a system to fake sensor data for a radar dish
	- Sensors can generate a probability distribution from a reading
	- Propagating that into the future can use ground truth for position, and widen the stddev a bit. No need to do true extrapolation.
	- Combine multiple readings somehow
		- True sensor fusion?
## Thursday 22nd
- Back from holiday!
- Experimenting with new/simplified sensor model
	- Core values tracked:
		- Range Deviation
		- Direction Deviation
		- Position Deviation
	- Sensors can improve any of the values
	- Values decay over time
## Friday 23rd
- Drawing gizmos for new sensor model
- Investigating library for UI animations
	- https://github.com/DhafinFawwaz/Unity-AnimationUI
- Added exponential growth in measured deviations as time passes
	- Sensor systems can improve these values
	- Some "sensors" can simply be cross referencing values
		- Created functions to calculate core values from other core values
		- Applying this to all values every frame and taking the best value, emulating "sensor fusion"
## Monday 24th
- Added a function for integrating new readings (e.g. from radar)
	- Position sense (RADAR)
	- Direction sense (IRST)
- Added assembly definitions for sensor and DRADIS prototypes
- Improved zooming acceleration/deceleration curves in close view (looking at a ship)
## Tuesday 25th
- Improved camera pan/rotation (made them less sloppy with appropriate damping values)
- Normalising mouse inputs by screen size, to make panning/rotation have a sensible speed at different resolutions
- Building out ECS data model for visual sensor tracks (i.e. the data needed to drive the tactical display)
- Building systems to fill in visual model from sim model
## Wednesday 26th
- Removed support for grouped contacts (one icon representing more than one entity), this removes a _lot_ of complexity
	- Simpler one-to-one data model between visuals, tracks and entities
	- No need to group and ungroup based on camera view
	- No need for UI to force splitting/grouping
- Finished systems for calculating tactical view data
- Tweaked appearance of icon (shrinking them slightly)
- Added changing of direct line (dash and alpha) based on if the contact is currently locked
- Changed confidence from an enum to a factor from zero to one
- Using blinking less in the tactical view, too distracting
- Experimented with dashes for velocity lines
	- Set offset to `Time.Time % (DashLength * 2)` to "fix" the dashes in place, as if the object is moving along a fixed line
	- Set offset to zero to have the dashes move with the object (i.e. first dash always starts at object)
	- **Best option**: Set offset to `-Time.time * N` to have dashes emerge from object and move along track, in direction of movement
		- This gives an indication of speed, even when sim time is frozen
## Thursday 27th
- Added instanced symbol rendering to tactical view scene
- Investigating how to make symbols clickable
	- Create GO, add collider sphere, use `OnMouseDown`
	- Create GO, add collider sphere, use `IPointerClickHandler`
		- Needs Physics raycaster on camera.
			- This is already setup for other things like clicking on planets
	- Explicit raycasting in ECS
		- Custom `BaseRaycaster` implementation
			- Needs to output a `GameObject` as the hit target, not a very good fit
- Added components to visual track necessary for syncing GameObject position
- Updated to Unity 6.1
- Fixed bug in `TextElementPool`, reusing items that were still in use
- Added tooltips when hovering over tactical display icon
## Friday 28th
- Added support for dash ratio to polyline shader
- Experimented with generating polyline paths backwards, to stabilise shaking. Doesn't seem to help.
	- Using dashes in distance instead of time, this is much more stable
		- Setting dash length based on speed, so faster things are visually obvious even when paused
- Improved appearance of perimeters (alternating dashes)