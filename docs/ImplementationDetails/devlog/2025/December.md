---
tags:
  - devlog
sidebar_position: 12
---
## Monday 1st
- Removed `WetMass` component, just having the one `FuelTank` component as the wet mass instead
- Built method to calculate mass consumed by burns in a given timespan
- Building script to create test entity for gizmo
- Publishing dev notes
## Tuesday 2nd
- Researching nav computer ideas
	- Experimenting with CMA-ES (https://github.com/yn-cloud/CMAES.NET)
	- Particle Swarm Optimisation (https://github.com/adamstirtan/ParticleSwarmSharp)
	- Building job based particle swarm optimisation
	- Optimisations:
		- Parallelising more bits
		- Splitting accumulators into batches of work (accumulating into a local accumulator) which accumulate into a per-thread accumulator. Next job in the chain sums together all the per-thread accumulators to get the final result.
			- Must batch work in first stage to use that local accumulator, avoids false sharing!
		- SIMD for `MinIndex(Span<double>)`
## Wednesday 3rd
- Cleaning up PSO
	- Switching to "Bare Bones PSO" - more iterations to converge but with less magic parameters to tweak. Also significantly simpler so should run each iteration _much_ faster.
- Cleaning up utility jobs that were used while developing this
- Creating system to attach orbit gizmo to selection points
	- Setting up components to position gizmo at selection point
	- Attaching gizmo directly to the selection entity so it inherits position
		- [ ] Need to handle rotation
## Thursday 4th
- Investigating how to determine rotation for orbit lines
	- ~~Generate it during integration?~~
	- ~~Guess it during sampling from the acceleration?~~
	- Calculate it based on major body where it's needed?
- Hacked rotation calculation into position setting system
	- [ ] Need to work out where it should really go
## Friday 5th
- Working out correct rotations for gizmo on orbit when relative to another planet
	- Experimenting with a few different orientations
- Cleaned up code for rotations
## Monday 8th
- Fixing gizmo grab handles when rotated and translated
- Fixing gizmo scaling issues when rotated and translated
- Fixing issue with picking canvas coming before physics picks, making prograde handle almost impossible to grab (it would always pick the orbit line instead)
	- Made picking canvas a screen space overlay on the astro camera (it uses that for picking)
	- Made picking canvas raycaster blocked by 3D objects on astro layers
- [ ] Making canvas screen space: overlay broke picking?
- Hooking up gizmo inputs to burn scheduler
	- It works! Kinda!
		- [x] Orbit flickers constantly when dragging handles
		- [ ] Sensitivity is all wrong
		- [x] Cancel button doesn't work
- Investigating nbody orbit line redraws from the start when modified
	- Conversion from world space -> relative space:
		- Rolled back too far
		- Did extra work after rollback which is immediately wasted
		- Exactly the same issues in conversion to GPU buffers
## Tuesday 9th
- Testing orbit gizmo
- Applying changes less often (4 times a second) when dragging handle
- Fixing issue with `NaN` in burn config (caused by zero duration burns)
- Fixing depth/stencil issues with gizmo when occluded by planet
- Adding smaller dashes to the gizmo dash ring (large dash every 30 degrees, small every 10)
- Fixing overlay canvas issues
	- Must be on a layer the camera is rendering
	- 0.1 is too close
	- `ScreenPointToWorldPointInRectangle` seems to be wrong in this mode?
## Wednesday 10th
- Continuing to investigate canvas issues
	- Passing event camera, fixed positioning errors
	- Switching back to overlay instead camera canvas
- Adding a physics raycast when picking, rejecting pick points which are behind the first hit.
## Thursday 11th
- Investigating adding a "boost" mode to the integrator, which generates more than one page of data per frame
	- Annoying to implement chaining of these jobs (need to know the end state of one before starting the next)
- Fixing a longstanding issue in Mirror, causing spurious warnings in console
- Creating Jovian moon
	- Using textures from: https://bjj.mmedia.is/data/ganymede/index.html
		- Bit low res, but it'll do for now!
	- Ganymede
	- Io
	- Callisto
## Friday 11th
- Updating rail integrator to run in all three update phases.
	- If work finishes fast this will complete it and start more work sooner.
	- Debugging why Early/Late update seem to be slower
- Tweaking Io cloud layer
	- Denser
	- More unpleasant colour around rim
- Debugging an allocation in Myriad `CommandBuffer`
- Optimising orbit ray picking a little
	- [ ] Ideally move this work to a job
		- [x] Add job support to relative paged rail
- Improving Ganymede surface texture
## Monday 22nd
- Expanded maximum integration page size (256 -> 1024)
- Fixed bug in picking system due to larger pages