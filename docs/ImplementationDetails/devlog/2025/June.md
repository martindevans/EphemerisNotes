---
tags:
  - devlog
sidebar_position: 6
---
## Monday 2nd
- Creating a system to specify lists of orbits in scenario files
	- Serialization extension to specify types, in a safe way
	- Extending system asset to easily find planets
	- System to specify numbers (constant, gaussian, uniform etc)
## Tuesday 3rd
- Converter for `BaseNumberGenerator` which allows just specifying a plain constant value
- Added more generator types
- Added a "blackboard" that stores generated values by ID, allowing later values to reference it
- Experimented with more cloud layers on Earth
- Experimenting with generating intersecting orbits
	- Specify intercept speed
	- Calculate required intercept angle for that to happen
	- Rotate by that angle
- Spawning ship on generated orbit
- Helper function converting state vector to kepler elements
	- https://space.stackexchange.com/questions/19322/converting-orbital-elements-to-cartesian-state-vectors
	- https://web.archive.org/web/20160418175843/https://ccar.colorado.edu/asen5070/handouts/cart2kep2002.pdf
	- https://downloads.rene-schwarz.com/download/M002-Cartesian_State_Vectors_to_Keplerian_Orbit_Elements.pdf
## Wednesday 4th
- Finishing state vector -> kepler elements function
	- Function works, but uses wrong handedness compared to rest of game
	- Fixed handedness, accuracy is terrible.
		- This seems to be due to the fast but low quality velocity calculation in `StateAtTime`
- Added ability to specify multiple IDs for one orbit in scenario file, generating multiple from the same generator
## Thursday 5th
- Introduced new `VelocityAtTrueAnomaly` function, instead of using finite differences.
	- This fixes the accuracy issues
	- Tightened up epsilons on unit tests
- Refactored kepler related code to introduce `GravitationalParameter` (mass * G) as a field
	- Lots of downstream places need updating to pass the mass
	- Spent a long time debugging issues with incorrect mass being passed around
- Removed `PositionAtTime` function, replaced all uses with `StateAtTime`
## Friday 6th
- Further tightening error bounds
- Test function was unintentionally allowing larger errors than I thought
- Debugging issues with `ArgumentOfPeriapsis` exposed by tighter bounds
- Reviewed all code in kepler state conversion to tighten up numerical precision
- Tested spawning some entities on intersecting orbits - they now pass nearby!
## Monday 9th
- Testing intercepts created with orbit generation system
- Fixing gaussian generation with min/max limits
- Rebuild serialisation system for orbit generation
	- Added spawns list
	- Referencing orbits by name
	- Refactoring `OrbitSet` to no longer be needed
	- Removed spawns list (there's a lot of complexity here with e.g. teams I don't want to address yet)
- Investigating making zoom exponential
	- Custom `InputAxisControllerBase` implementation
	- Using `ReadControlValueOverride` to inject into normal `CinemachineInputAxisController`
		- Kinda ugly, but a lot simpler!
	- Added to large and small cameras
## Tuesday 10th
- Symbol drawing double buffering
	- Attempting to eliminate laggy symbol rendering at high time speed
	- No improvement
- Implementing byte-oriented reading from bit reader, speeding up `SmallInt` methods
- Building an octree-ish data structure to accelerate position lookups (e.g. sensor scans)
## Wednesday 11th
- Fixing some octree issues
- Generalising bounding box query to any bounding volume
- Adding convenience wrappers for AABB and Sphere queries
- Implementing `BoundsCone`
- Implementing cone queries for octree
	- collision primitives for cone
		- Cone/AABB is very complex, but I can get away with an approximate check
- Added debugging to queries, showing visited nodes
- Added early-out to simply exhaustively search octree nodes if the number of items in the node is low
## Thursday 12th
- Building ECS systems to clear and repopulate octree every frame
- Updating octree test scene to be ECS driven
- Building tree with 10,000 items takes about 400ms, too slow!
	- Removed separate `key_count` map: 230ms
	- Caching hash code: 230ms
	- Better hash code: 220ms
	- Simpler hash: 124ms
	- Burst: 125ms
		- Possibly not showing up properly in profiler
	- Simplified node calculations (integer math instead of double flops): 88ms
- No longer storing current position in octree
- Added partial/lazy updating of items in octree
- Added removing from octree
## Friday 13th
- Creating system to update octree (rather than rebuilding every frame)
- Cleaning up dead entities from Octree
	- Fixing bugs with this (leaking phantom entities)
- Debugging issues with some incorrect object being detected
- Fixing AABB/Sphere test
	- SIMD Optimising it
- Changing octree update to be incremental (max N entities per update)
	- Fixing Myriad incremental queries
## Saturday 14th
- Optimising Octree memory usage.
	- Instead of storing every item at every level, split tree into two parts:
		- Smallest levels store the items in nodes
		- Largest levels just store the count
	- In principle could makes queries slightly slower because they have to recurse more levels sometimes. In practice because handling the count is faster queries are slightly faster!
	- Makes building/updating the tree a lot faster!
## Monday 16th
- Dynamically switching to cursor queries only when entity count is high
- Setting up system groups for managing octree
- Modified octree system to find new entities and add them to the tree automatically
- Integrating octree into main orbital systems group
- Fixed leak in octree system
## Tuesday 17th
- Designing components for sensors
- Editor inspector for sensor track component
- Researching RADAR maths ([[Design/ISR/RADAR]])
- Added Hertz to `HotStuff` units library
## Wednesday 18th
- More RADAR research
- Setting up components for AESA radar
- Begun sketching system for AESA radar
- Researching packing of cones into a larger cone, choosing where to place scanning beams
	- Can simplify:
		- Make scan area a square
		- Place circles covering square (edges touching, leaving gaps)
		- Place circles in middle of each gap
## Thursday 19th
- Mocking up beam placement stuff
- Updating Unity/Myriad integration package to expose transform system
- Setting up transforms for sensors, relative to ship
	- `RigidTransformDouble` and associated functions
## Friday 20th
- Setting up sensor test scene
	- Creating platform
	- Creating sensor (child entity)
	- Creating detectable things
- Experimenting with visualising radar coverage over a sphere
	- Added some more unit safety to RADAR helper functions
	- Fixed issue with PropertyDrawers for unit types
## Monday 23rd
- Experimenting with spherical harmonics (possible use for storing RCS)
- Linked up radar tracking
	- Detect entities from octree
	- Filter by bounds
	- Get existing track entity and update
	- Create new track entity
- Cleaning up scan time calculation
	- Added explicit beam assignment. N beams to scanning, M beams to tracking.
	- Removed all tracking work from scan system, split into a separate tracking system
- Working on tracking
	- Assigning beams to tracks
	- Finding tracks in cone
	- Calculating power loss, angular resolution, distance resolution
	- [ ] Find jammers in beam
	- [x] Calculate SNR
	- [x] Reject objects with low SNR, degrade resolution for mid SNR
	- [x] Update track
	- [x] Decay track
	- [x] Cross reference track data
## Tuesday 24th
- Adding a frequency based modifier to radar cross section, this allows longer wavelength radars to have better capability to see through stealth. Approximated with a curve (no directionality).
- Investigating `SharedDisposable<T>` (https://github.com/jacksondunstan/NativeCollections/tree/master?tab=readme-ov-file#shareddisposablet) for better native memory management.
	- Interesting, worth investigating more. Unclear how compatible this is with jobs.
- Adding visualisation for detections
- Debugging terrible SNR (-70dB)
	- Fixed incorrect constant (Stefan-Boltzmann vs Boltzmann)
## Wednesday 25th
- Refactoring various bits of prototype sensor code into a sensible file structure
- Decaying sensor track data over time
- Inspector
	- [x] Show sensor track data in tracking computer inspector
	- [x] Show sensor data in ship sensor collection inspector
- Cross referencing track data so e.g. range & angle info is converted into position info
## Thursday 26th
- Refactoring Unity/Myriad editor integration to make drawing component editors easier in nested editors
- Creating editor for phased array radar
- Added movement to radar test scene
- Radar Jammer
	- [x] Visualisation
	- [x] Components
	- [x] Octree for search
	- [ ] Jammer systems
	- [ ] Update radar to find jammers
	- [x] Working out maths for received power
## Friday 27th
- Adjusting octree indexing for jammers
	- Parent has pos, jammer has offset (same for sensors). This sucks to work with.
	- [x] Introduce hierarchical transform system
- Created `HierarhicalTransformSystem`
	- Scheduled after orbital mechanics and physics dynamics
	- Replaced sensor transforms with general purpose transform
	- It just works :O
- Optimising cross reference systems a bit
	- Using fast arctan
## Monday 30th
- Cleaning up [RADAR](/Design/ISR/RADAR) notes
- Messing with zoom camera fx
	- Render texture
	- Separate rendering layer
	- Separate postprocessing volume
	- New skybox shader (just for zoom cameras) with 1px size stars, no matter how much you zoom
		- Tried [NoisyNodes](https://github.com/JimmyCushnie/Noisy-Nodes/blob/master/NoiseShader/HLSL/NoiseUtils.hlsl), it has a seam in the 3d noise
		- Went back to [my ancient shadertoy experiment](https://www.shadertoy.com/view/XlfGDS) for RNG. Basically the same as `NoisyNodes`.
		- Wrote a new RNG based on hashing, no more seams.
	- This is going to have a scale problem. Small objects are rendered in 1-to-1 scale with floating origin (i.e. if it's 1000km away it's actually 100,000 units away). This is fine because you only look at things near the origin, except the entire purpose of this is to look at things not at the origin!
- Cleaning up sensor data systems
- Finding jammers in RADAR cones
- Refactoring position indexing octree to use `WorldTransform` instead of `WorldPosition`
- Jammers jamming!