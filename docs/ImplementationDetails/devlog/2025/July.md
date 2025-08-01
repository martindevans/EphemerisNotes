---
tags:
  - devlog
  - guns
sidebar_position: 7
---
## Tuesday 1st
- Cleaning up incomplete work from June (converting to issues)
- Writing system to cull sensor contacts
	- Unifying tracked/tracking entities components
	- Fixing every system that touches those components
	- Automating cleanup on entity destruction
- Debugging issue with angle deviation going to zero over time, causing culling to never run
## Wednesday 2nd
- Fixing camera far plane culling out objects too early in "small" camera (1-to-1 scale)
- Reviewing [Bullet Chain](/ImplementationDetails/devlog/2024/December) prototype.
	- Bullets are simulated with a "point" (integrated with orbital mechanics etc) and links which connect points together. Bullets are distributed along the links.
- Creating new bullet chain setup
	- Point components
	- Link components
	- Setting up ownership so links and points are properly cleaned up
	- Culling of links with no bullets assigned to them
## Thursday 3rd
- Testing out some `Myriad.ECS` optimisation ideas.
	- baseline: 32ms
	- Specialised non-ref version: 33ms
	- `Unsafe.As` cast: 32ms
	- `Unsafe.Add` instead of raw pointers: 32ms
		- Nicer code, so I'm keeping this.
- Finalised culling systems
- Creating test scene
	- Creating simple GameObject based as "ground truth" comparison
	- Creating tracking points and links
	- Drawing links
- Refactoring chain system to remove intermediate entity. It's unnecessary and is making things more complex to work with.
	- Previously 3 entities:
		- Point (Entity) -> Link (Entity) -> Point (Entity)
		- Each point has a reference to the link (forward and backward)
		- Link entity also has forward and backward links
	- Now just two entities
		- Point (Entity) -> Point (Entity)
		- Each point references the next and previous point
- Prototyping a system for easily following complex paths through related entities
## Friday 4th
- Writing codegen for the complete path following system
- Added distance between points to density calculation (culling links once the density of bullets is low enough)
- Offsetting bullets by randomly calculated vector, based on gun spread
- Added support for dynamically switching an entity to linear interpolation (cheaper, but much less accurate)
	- Bullets which are not near colliders can be switched to this
- Setting up a test target in the scene and auto aiming
## Monday 7th
- Reversed order of bullets in memory to make adding new bullets easier
- Split bullet link state calculation to another system, so it can be used in other places
- Editor GUI displaying bullet bitfields
- Tweaking bullets movement
	- Attached one tracking point to the gun barrel, moving it back and forth so it's always in exactly the right spot (the end of the barrel) when the next bullet is spawned. Cutting it loose with integration when there are 255 bullets in the buffer (or the gun has turned)
	- Removed some complexity in the culling system, no longer needed with new system for managing tracking points
- Applying some system changes immediately, to reduce delay between point being created and integrated. Reduces but does not eliminate weird sliding motion as bullets come out of gun
## Tuesday 8th
- Pre-integrating bullet motion for 1 second (just assuming linear motion) before handing off to the proper nbody integrator. This gives the system some time to integrate (on worker threads) before running off the end of the rail.
- Improving auto aim
- Adding more tracking points dynamically
	- Rotation speed
	- Angle between last tracking point and gun forward vector
	- Cumulative error (angle error * number of bullets fired)
- Spinning ship test
	- Loosening up error bounds a bit, to generate less points
- Tested with slowly moving ship (~20m/s relative to target)
- Randomly choosing targets from a list and aiming at them
- Refactoring to a max of 128 bullets per link. It's quite rare to fill the entire buffer, so this is an easy memory saving.
## Wednesday 9th
- Setting up scene with planets for testing guns in orbital space instead of free space
- Spawning test ship, setting up ECS bindings for it
- Porting gun logic from prototype MonoBehaviour to ECS components/systems
- Basic test with GameObjects handling positions, while ECS system handles gun logic
## Thursday 10th
- Investigating possible relational bug in Myriad to do with a relation with a dead entity
- Updating new tracking point generation to include changes in speed as well as angle
- Inheriting velocity from parent platform (i.e. the ship)
- Experimenting with bullet rendering
	- Use [Shapes](https://acegikmo.com/shapes/) for batched line rendering
	- Pass tracking points to GPU, compute per-bullet positions on GPU
## Friday 11th
- Refactoring prototype bullet rendering code
	- Moved bullet drawing to an ECS system
- Optimising bullet `GetRays` method
	- Pre-calculating part of lerp outside of loop
	- Replacing [Box-Muller](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) (true gaussians) with [Irwin–Hall](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution) (very cheap approximate gaussians)
	- Using double gaussians to generate unbiased directions in 2D
- Implemented simple RNG for GPU, pre for moving some of this `GetRays` work to the GPU
## Monday 14th
- Researching correct use of Unity `ComputeBuffer`
	- `SetData` is easy but incurs extra copies
	- Use `BeginWrite`/`EndWrite` instead with double buffering
- For now just debug rendering all the sim points through this new technique
	- Fixing many _many_ data alignment issues between CPU, Computer Kernel and Vertex Shader.
## Tuesday 15th
- Porting bullet position calculation from CPU to compute kernel
- Fixed issue causing bullets just fired to jitter position (until the next sim point is emitted)
- Orienting quads along line
- Stretching along line
- Passing more metadata through pipeline (colour/thickness)
## Wednesday 16th
- Billboarding bullet quads so they maintain a constant thickness when viewed from the side
- Adjusting thickness based on screen space depth, so bullet lines are never thinner than 1.5 pixels
	- Removed minimum thickness, it's not working correctly
	- Trying alpha fading based on thinness factor. Thinner lines fade alpha to near zero.
	- Added a more robust implementation of minimum thickness
- Adding fading based on distance, this should replace lines getting thinner with them fading out instead
	- Replaced with fading based on scaling factor - as lines are artificially made thicker (to keep their minimum screen size) they fade out
## Thursday 17th
- Created inspector for GPU bullet drawing system to help with debugging
- Setting up octree to index all bullet points
- Using octree to find nearby bullets for rendering
- Dynamically adjusting query range based on number of bullets within range, to ensure the max buffer size is not exceeded
		- Linear growth/shrink. Too slow to adapt, sometimes renders nothing due to not finding a suitable distance.
		- Binary search. Converges faster, but still ends up doing several expensive octree queries per frame.
		- Added limiting to octree to queries, so they will abort if they hit a limit. This means I can get a result I **know** will fit in the buffer (and slowly reduce range when it happens).
## Friday 18th
- Test scene for target leading
- Find intercept point. Solve:
	- $(t_{pos} + t_{vel} \cdot t) - s_{pos} = s \cdot t$
	- $t_{pos}$: Target position
	- $t_{vel}$: Target velocity
	- $t$: time
	- $s$: projectile speed
- Also implemented intercepting "boosted" projectile - i.e. an acceleration phase after initial launch
	- Built a general purpose binary chop based root finder
	- Investigating upgrading root finder to Brent's method: https://en.wikipedia.org/wiki/Brent%27s_method
		- Seems very complicated, mixing in some Secant method instead (https://en.wikipedia.org/wiki/Secant_method)
- Updated Myriad delegate queries to support chunk querying
## Monday 21st
- Tweaking target leading/intercept scene
- Remaking bullet geometry in blender to add UV coordinates
- Creating bullet texture
- Rewriting system for filling GPU buffers to use a more efficient querying method (chunks)
- Updating dependencies, fixed long standing depth buffer issue with gas giants
- Began setting up test scene, shooting gallery in Lunar orbit
## Tuesday 22nd
- Adding guns to shooting gallery ship
- Fixing rendering layer
- Fixing issue with `NaN`s due to zero angular velocity
- Debugging issues with bullet rendering at scale
	- Line length is too long, because the camera floating origin is moving (effectively doubling that velocity). Just render length based on bullet speed.
	- Mix up between world space and local space creating too many tracking points
	- [x] Bullet lines point in the wrong direction
		- Same problem with floating origin, same fix
	- [ ] When a point is detached it jerks off to one side
		- Maybe an issue with system order? Only happens for one single frame
		- Caused by the point being set to the wrong position _after_ the system that would set it correctly. It's always fixed next frame.
- Redesigning how system order is specified in the Unity/Myriad binding package, to make this kind of thing easier to handle
	- Added `Enabled` property to system groups, so they can be more easily managed "top down"
## Wednesday 23rd
- Finishing system order redesign
- Resampling position of bullet points when they're "cut free", to put them at the right position for the current time.
	- This fixes the jerk issue from yesterday.
- Added instanced rendering for bullet sim points
- Refactoring settings for various gun systems into settings classes
	- Generally a better pattern for system settings I'll adopt everywhere
- Joining together orientation from physics system to general transform system
- Improving system for deciding when a new point gets created
	- There are still visible straight "segments" in the bullet stream at the moment, this needs improving!
		- Consider curving along segments instead of linear interpolation
			- Experimented with hermite interpolation, not quite the right shape.
			- Catmull-rom is an alternative, but would need more metadata (next+1 and prev-1 points)
## Thursday 24th
- Try to retrieve data for catmull-rom splines
	- Replacing HashMap with direct lookups on entities
	- Getting the extra edge data is going to be somewhat expensive and this is very hot system!
- Switching to designing collision resolution system
	- Broadphase:
		- Build an octree of bullet edges, treating edges as a sphere encompassing both ends.
	- Created basic broadphase collision component (bounding sphere)
## Friday 25th
- Building a new octree that can store volumetric objects instead of just points
	- Refactoring point octree instead of building a new one
- Creating tests scene for volumetric objects in octree
## Monday 28th
- I don't need full volumes, just line segments. Much simpler.
- Researching Bresenham's Algorithm for determining voxels along a line
	- That's not what I need. I need every voxel the ray passes through. "voxel supercover"
	- https://github.com/cgyurgyik/fast-voxel-traversal-algorithm/blob/master/overview/FastVoxelTraversalOverview.md
	- Implemented Amanatides & Woo Fast Voxel Traversal algorithm
- Inserting lines into octree
- Built a system to build an octree with bullet lines
	- Probably need to multithread this better, to scale up to lots of bullet edges
- Tested collisions with rough broadphase (just remove bullets impacting broadphase bodies)
- Added a system to copy link position from next entity to "this" entity. This system has incoherent data access, but all following systems can have coherent access
	- Updating systems to use this cache
## Tuesday 29th
- Improving `HasComponent` check in `Myriad.ECS` to simplify some uses in bullet systems
- Adjusted bullet mesh so it grows a tail behind point, instead of equally either side. This makes collisions look better
- Shortening length of bullet trails for first 100ms, improves look around gun
- Reduced octree depth for bullet points and lines. Large depth is good for very large queries, which isn't really relevant for bullets (colliders are all quite small).
- Investigating culling not removing points quickly enough
	- Overcounting on the bit field
	- Fixed this
- Investigating some bullets not being removed after impact
	- Index in ray generation does not match index in bitset!
	- Fixed this
- Optimised ECS line insertion slightly, calculating things during recursion instead of ahead of time (skipping work if recursion exits early)
## Wednesday 30th
- Experimenting with world velocity relative rendering, to draw better aligned bullets
	- Transforming velocity into local space on the CPU
	- It works!
	- Trying to move that transform to GPU
		- Vulkan+Unity doesn't support double precision!
## Thursday 31st
- Modifying broadphase collision system
	- Parallel queries
	- Sweep broadphase collider based on elapsed time and velocity
	- Ideally bullet rays would be fat rays, but this is expensive, can compensate by making broadphase spheres larger than necessary
- Experimenting with hermite interpolation for bullet rendering again
	- Subtracting newer velocity off older velocity - so the curve is based on the change in velocity over the length of the line
	- Hermite Playground: https://www.desmos.com/calculator/uwmhib3hlr
	- Still doesn't look good
- Added dirty flag to bitfield, needed for multiplayer sync