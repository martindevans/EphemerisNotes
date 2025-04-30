---
tags:
  - devlog
sidebar_position: 4
---
## Tuesday 1st
- Fixed names not syncing in lobby on first join
- Adding visuals to networked entity
- Moving some scripts from `SolarSystem` test scene into main project
- Modified network spawn script to pick a random body in the system and generate a random orbit around it
- Moved some of the networking sync load into a job
- Improved `HotStuff` units codegen
	- Unified codegen for To/From conversions (e.g. `Metre.ToLightyear`), define once for both directions
	- Added codegen for auto metric conversions (e.g. `Metre.ToKiloMetre`)
## Wednesday 2nd
- Improved test coverage on `HotStuff` (100% coverage on everything except generated code)
- Refactoring multiplayer systems into one single system group
- Investigating `LockBufferForWrite: Multiple uploads in flight for buffer` error
	- Maybe this can be solved with `AsyncGPUReadback` to test if requests are in flight
- Creating a system of heartbeat messages sending server time to clients every frame
	- Detecting when sim is ahead/behind. This is very sensitive at high time speeds (errors amplified by 86400x)
	- Using network time to get a better time measurement is a lost cause, jitter variance is amplified on top!
	- Created a simple PID script, considering using this for time control
## Thursday 3rd
- Creating systems to sync time as it drifts out of sync
	- When behind, increase time speed such that we would be perfectly back in sync in some period (e.g. 0.5s)
	- When ahead, decrease time (aggressively)
- Adding a delegate based overload to map/reduce queries in `Myriad.ECS`
- Moved `TimeSpeedControlSystem` to be server only
- Started designing new sync system based on a "soft lockstep"
	- When a speed change is requested, server _schedules_ the change a small amount of time in the future (currently 0.25s)
	- Clients apply these changes. When they're approaching a change (within one frame) they adjust time speed to land **exactly** at the right time for the change
## Friday 4th
- Refactored shader properties into one common class
- Modified `BaseDrawInstancedSymbols` to take a direct reference to world host, instead of finding it
- Refactored world/sim host setup in `Myriad Unity Integration`
	- `BaseWorldHost` (contains a world) -> `BaseSimulationHost` (adds a system list) -> `GameTimeWorldHost` (automatically updates those systems)
	- This can be used in main project to add something akin to `GameTimeWorldHost` which schedules time changes from the network
	- Fixed lots of breakage in main project from this change
- Writing some more serialization routines
	- Rice coding
	- Small ints (i.e. with a fixed number of bits)
	- [Elias Gamma coding](https://en.wikipedia.org/wiki/Elias_gamma_coding)
	- Elias Delta Gamma coding
- Created new world host `NetworkScheduledGameTimeSimulationHost`
	- Swapped network scene to use new world host
## Saturday/Sunday 5th/6th
- Experimenting with more compression of orbit data
	- Encoding exponents/signs separately as a stream of deltas, with gamma encoding. Exponent rarely changes, so most of the deltas are 1 single bit.
	- Encoding mantissas as a stream of deltas, with (bytewise) variable length encoding.
		- Higher order encoding (delta of delta etc) can compress more. But going too far explodes in size.
		- After 4th order differences, most values (in a test set of orbit data) are in the 0-10,000 range (i.e. 1-2 bytes). Hard to beat this with bitwise encoding, overhead for storing the length kills any gains.
## Monday 7th
- Updated packages
- Testing `NetworkScheduledGameTimeSimulationHost`
	- Fixed issue with converging on exactly the right time
	- Fixed time trying to run backwards for one frame
	- Tested with terrible simulated latency (500ms base + 500ms jitter). Time change is perfect!
- Experimented with some in-world HUD ideas (aka DRADIS)
## Tuesday 8th
- Writing a script to create DRADIS view
- Investigating why `Shapes` asset does not render with instancing enabled
	- https://shapes.userecho.com/communities/1/topics/367-instancing-breaking-because-of-disablebatching-tag
	- deleting the `"Library/ShaderCache"` folder fixes the issue
- Adding billboarded text to show distance
- Deciding on symbols for above/below plane
	- [x] Need to implement these in script
- Droplines
- Droparcs
## Wednesday 9th
- Velocity paths
	- Projecting down to plane with arc
	- Resampling path for acceptable curvature
	- Gathering metadata for extra iconography (crossing point, impact point)
	- Ensuring line does not go beyond distance bounds
- Not drawing shapes to cameras with mismatched layer mask
- Researching better polyline drawing (caching, trimming off start points)
	- In theory could do it with a shader, but modifying `Shapes` shaders is basically unsupported?
	- Can't remove points (invalidates the entire mesh)
- Building a pooling system for TextMeshes
	- Reverted to using the shapes text caching
	- Need something better in the future, this doesn't work for rapidly changing text (e.g. distances)
- Created treeview prefab
	- Added it to the multiplayer game scene
	- Also added crosshair canvas
- Created editor inspector for `NetworkScheduledGameTimeSimulationHost`
## Thursday 10th
- Setting up display for network stats
- Creating build
	- Debugging null reference in build only
	- Lockup in build! Seems to be an issue with UniTask not working
		- No, UniTask was working fine, I forgot to `await`
- Tested over LAN
	- Traffic seems fine
	- GPU load (2080S) is high (70%) but that's with the entire system loaded, not terrible
	- CPU load seems fine (about 50% all cores)
	- [x] treeview not showing bodies spawned remotely
		- Doesn't matter which side spawned, other side doesn't seem them
		- It's querying for `NBody` which remote entities don't have
	- [ ] TreeView in build is misaligned
## Friday 11th
- Investigating `LockBufferForWrite` issue in `BaseDrawInstancedSymbols`
	- Creating a reproduction scene
	- Scheduling a `AsyncGPUReadback` request just after the write seems to work as a way to monitor the upload
	- Added readbacks to `BaseDrawInstancedSymbols`
- Added rendering setting to disable particle stars in skybox
- Put together system for estimating clock skew
- Creating "auto scheduler" which reschedules the current time speed every so often
	- Changing time speed already has a very good sync system, so we can just do this to ensure minor clock skew is corrected.
- Removed skew detection altogether
## Monday 14th
- Writing docs for Myriad collect and cursor queries
	- Also adding some tests
- Fixed lobby not decrementing ready count when a player leaves
- Switched some lobby buttons to FUI
- Testing deleting entities over network
- Fixed one symbol being rendered even when instance count is zero
- Adding [HandySerialization](https://github.com/martindevans/HandySerialization/tree/master) wrapper around Mirror writer
	- Writing a new encoding system in `HandySerialization` using delta encoding and a higher order predictor ([here](https://github.com/martindevans/HandySerialization/blob/master/HandySerialization/Extensions/DeltaSequences.cs)).
- Rewritten orbit data encoding in game to use delta compressed sequences. Should be about 34% of the size.
	- Debugging deserialization errors
	- It works!
		- But only achieves about 50%, which is a bit worse than the 34% achieved on a selection of real data during development.
		- Could consider adding deflate, should get down to about 15% (according to that same test data)
	- Dropping frames when spamming the spawn button
		- [ ] Move serialisation work off main thread
		- [ ] Throttle the amount of orbit data pages sent per frame
## Tuesday 15th
- Cleaned up serialization for orbit data
- Creating new writer structs for Unity "native" memory
- Converting sending of rail data to encode into bytes in a job, then send the raw bytes once that's done
	- Lots of extensions to serialization to support this
		- Sending/receiving native memory
		- Working with spans in serialization
		- Converting between spans and native memory
		- General pattern for sending an `OwnedList` struct, which is written to the network writer and immediately disposed
	- Debugging issue with decoding crashing
		- Adding extra sync bytes
		- Refactoring how bit writing is handled in `HandySerialization`
- Refactoring `RailPage` to have separate accessors for read/write access
- Quick experiment with bending text mesh
	- Looks ok, but distorts text at high bends
## Wednesday 16th
- Fixed droparcs on dradis view sometimes curving the wrong way
- Testing large number of multiplayer synced entities (profiling jobbified encoding from yesterday)
	- Investigating message sent to dead entity
		- Entities are destroyed by impact on server, but not on client
	- Setting up system for lifetime management
		- Entity is kept alive as a phantom even when destroyed
		- When the owner GO detects the entity is dead, it sends a message to the server requesting destruction (of the GO)
		- When the GO is destroyed, the phantom keeping it alive is removed
- Moved some multiplayer related stuff into the main project
## Thursday 17th
- Fixed orbital lines not being relative to the right body when first created
- Fixed some references to dead entities in relative orbits (just during initial setup)
- Moved some work in `rail` -> `relative rail` conversion into jobs (copying all of the position data)
- Improving loading screen infrastructure
	- Investigating https://github.com/LeiQiaoZhi/Easy-Text-Effects-for-Unity/tree/main
	- Showing scenario title
- Investigating Mirror hybrid transform
- Setup integrator for linear/angular physics (small scale)
- Rotation works in MP
	- Using `NetworkTransformHybrid`, seems quite new in Mirror so we'll see how stable it is
- Fixed an issue where entities that are destroyed by impact too quickly (e.g. created inside a planet) never properly initialise
- Fixed issue in `CopyOrientationToUnityTransform` system accessing destroyed transform
## Friday 18th
- Working on a new binding system for GameObject <-> Entity, should be more robust to very short lived entities (destroying the entity before the binding is even created)
## Monday 21st
- Finishing rewrite of binding system
- Pulled into main project, fixed breaking changes, tested in docking sim scene
## Tuesday 22nd
- Researching post on https://www.reddit.com/r/spaceships/comments/1k51vjd/what_would_spaceship_battles_actually_be_like/
- Unit tests for new binding systems
- Prototyping idea for a better binding system (new one works, but it's complex)
	- Get a notification from Myriad when an entity becomes a phantom
	- Developing `IPhantomNotifierComponent`
## Wednesday 23rd
- Finalising notifier components
- Updating Myriad/Unity binding package
	- Not using new notifiers in binding system yet, what I've got works
- Investigating multiplayer spawning issues discovered on Friday
	- Reproduced by just spamming create
		- Doing this in single player is fine
	- The bound entity on the receiving end has become a phantom
	- Looks like the rail is desynced, it has already ended in an impact
	- A remote page is being created with negative time, and an incorrect sample count
		- Negative time probably just comes from reading empty data
		- Wrong sample count came from sending the entire data array, not just the valid slice!
		- Fixing this has fixed the issue
- Rewritten rail sender system to have a bytes/second send limit. Working through rails in order (shortest first) sending data each frame until the budget is exceeded.
	- Fixed budget scaling with sim speed (using `Time.unscaledDeltaTime`)
- Fixed issue with accessing disposed collection
- Experimenting with Steam achievements
## Thursday 24th
- Returning sub arrays of the correct size, making out of bounds access of orbit data impossible
- Tested at high time speed for 2 years
	- Entity positions remained synced
	- Time sync when pausing was slightly off (2 seconds)
		- Reduced re-schedule time to combat this
- Fixed mirror network stats GUI
	- Not counting packets from latency sim
	- Not rebinding when backend is changed
- Written new orientation sync behaviour, replacing mirror sync which doesn't work well at high time speeds
## Friday 25th
- More testing of new rotation sync
	- For some reason the error estimate rapidly diverges, sending more updates than necessary
	- Using better integrator which is more stable over long timesteps
- `NBodyOrbitLine` improvements
	- Fixed visible jagged line for one frame when the first page of data is converted
		- LOD selection was picking lowest detail (because there's nothing to show) so when the first page was added it took a frame to update
	- Moved some more LOD work into the job off the main thread
	- Fixed single frame showing a line going to the origin when first created
	- Implemented the GPU side of a new LOD system
		- Allowing runs of vertices to render at the same LOD, with multiple runs. This means that just the relevant bit can be drawn at a higher LOD.
	- Started implementing CPU side, selecting parameters for GPU to draw from
## Sunday 27th
- Had an idea for the CPU side of the adaptive LOD
	- It didn't work
- Fixed error in shader, misinterpreting indices
- It works!
## Monday 28th
- Investigating burst compiling packet encoding
- Testing adaptive LOD more
- Plotting out work for next couple of months
- Working on tactical overlay
	- Drawing a mark at impact point
	- Gathering closest point
	- Drawing a circle at closest point
	- Adding toggles for various elements, basis for future user customisation
- Tested networking on LAN
	- [ ] Steam connection is not working
		- Seems like Mirror doesn't like switching backends in this way
## Tuesday 29th
- Splitting out drawing of on-plane icons for contacts
	- Changing icons for "hot" and "cold" contacts
- Different colours for contact boxes based on alignment (friendly, neutral, hostile)
- Added randomisation to integrator in test scene
- Creating a job to convert polyline points into a mesh
	- Shapes package includes this, but it's not in a job and allocates a lot
	- Also I can add a feature to store "time" per vertex, allowing for smooth cut-off at the start in the pixel shader as time progresses
## Wednesday 30th
- Modifying polyline importer to emit more vertex data
- Created polyline shader which smoothly interpolates values and discards those pixels if they're out of range
- Tested with rainbow colours
- Better error handling in Shapes drawing
- Swapping all thickness values from `Pixels` to `Noots`
- Aligning "hot" icon with approach vector
- Experimenting with ways to indicate multiple contacts aggregated together into one