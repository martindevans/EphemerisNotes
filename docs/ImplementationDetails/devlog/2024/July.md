---
tags:
  - devlog
  - OrbitalMechanics
  - Rendering
---
## Monday 1st
- Created "base" scene which contains the various necessary things to make up a scene
	- Skybox config (galaxy)
	- Instanced stars renderer
	- Camera stack (big/little)
	- Postprocessing volume
- Experimented with cinemachine and layered cameras
	- Seems to work as expected
- Adjusted Earth graphics (improving atmospheric scattering)
- Introduced "layer" tag types, which allows distinguishing layers in the type system. These types have a property specifying the scaling for that layer (meters per unit)
	- Changed some Myriad components/systems to require layer tags. This allows multiple to be bound for different layers.
		- `ScenePosition<TLayer>`, `UnityTransform<TLayer>`, `SetScenePositionFromWorldPosition<TLayer>`
- Tested compositing camera layers in SolarSystem scene, setting NBody as focus.
- Investigated feasibility of using Unity job system for scheduling integrator work
## Tuesday 2nd
 - Investigated poor performance with integrator and a large number of NBodies (1000+)
	 - Fixed a bug that was causing excess tasks to be allocated - one task per nbody per frame, even if no work was needed!
	 - Wrote a new version of the integrator based on Unity jobs instead of dotnet tasks
 - Expanded Myriad.ECS query API (adding various overloads which allow not passing some params, or passing them by ref).
 - Added new event type, so the visual origin and the rail relative origin are different things.
 - Started building `CameraStackController` behaviour, to manage everything involved in switching camera modes
## Wednesday 3rd
- Experimented with bloom/lens dirt. URP lens flare asset can't use HDR colour, so interacting with bloom is difficult.
- Worked on `CameraStackController`
	- Mode transition (small vs astronomical)
	- Integration with cinemachine
		- copying appropriate data from cinemachine
		- activating/deactivating vcams on transition
		- changing channel on brain to work with relevant vcams
		- hard cut on transition
	- Developing an orbital camera
	- `NBodyOrbitLine` rendering is broken in small mode, need to think about how to offset that into the right position
- Investigating Unity new Input System (easier to use with Cinemachine, maybe)
## Thursday 4th
- Experimenting with fixing `NBodyOrbitLine` in small mode
	- Added support for transforms to nbody line shader
	- Moving nbody line transform to the same scene position as whatever entity the line is relative to
- Added new layer for `AstronomicalOverlay` - map markers and other things that should only appear in "astronomical" mode
- Improved `Myriad.ECS` Unity editor integration
	- Proper support for nested generic components - showing the full generic type definition in the inspector
## Friday 5th
- Improved `Myriad.ECS` Unity editor integration
	- Added support for generic nested systems - showing the full generic type definition in the inspector
	- Debugging `SerializedObjectNotCreatableException` thrown by Unity when certain inspectors are shown
- Placeholder.Editor.UI
	- Changes to support drawing default editor, which seemed to be the cause of the mysterious `SerializedObjectNotCreatableException`
	- Moving all files into better folder hierarchy
	- General polish (lots of nullability improvements)
- Updated Ephemeris to use new packages
- Experimenting with an entity browser window (construct queries and view result entities)
## Monday 8th
- Build an input controller for Cinemachine which only drives input while right mouse button is clicked
- Tweaked gains to get nice feeling camera controls in astronomical view
- Made `RailIntegrator` properly dispose all in-flight jobs when the system is disposed
- Imported settings file load/save from Ephemeris3
	- Hooked up simulation settings (integrator min/max DT & epsilon)
	- Hooked up audio settings (created some new audio mixers to apply setting to)
- Dug up old prototype code (written 2 years ago) for drawing very large numbers of symbols using instancing, begun porting it to Ephemeris4
	- Rewrite required to make it work with Myriad.ECS
- Total rewrite of parallel query system in Myriad.ECS
	- `ParallelQuery` now runs in approximately 40% of the time!
## Tuesday 9th
- Rewritten `Myriad.ECS` `ParallelChunkQuery` to use the new threading system
	- Improved `Myriad.ECS` threading system to better distribute work across threads by randomising work stealing, leading to less contention.
## Wednesday 10th
- Worked on rendering symbols using instanced rendering
	- Prototype with `DrawInstancedIndirect`
	- Rewritten prototype with `RenderMeshPrimitives`
	- Wrote shader for drawing billboarded icons, with scaling based on distance. Adapted from starfield skybox shader.
		- Spent ages debugging `ComputeBuffer` usage
- Further optimisations and improvements to `Myriad.ECS` parallel queries
	- Main thread steals work when waiting, very slight speedup
	- Catching and collecting exceptions from all parallel workers, instead of deadlocking when an exception is throw.
## Thursday 11th
- Clean up of `Myriad.ECS` threading.
	- Considering how to refactor the new system to have a configurable threadpool, such that Unity jobs can act as the backend.
- Refactoring prototype symbol drawing system
	- Support for symbols on different layers
	- Grab data from ECS for rendering
## Friday 12th
- Added `ChunkHandle` to `Myriad.ECS` chunk queries. This allows querying of chunk level properties.
	- Updated various projects after breaking `Myriad.ECS` change
- Experimented with putting instanced symbols into scene on layers
- Started work on overlays - flipbook animated textures added over the top of the base icon
## Saturday 13th
- More work on flipbook overlay
## Monday 14th
- Tidied up symbol rendering code
- Added a default component renderer to Myriad Unity integration, requiring less custom editors to be written for simple components.
- Created systems to copy position between layers as necessary
- Added symbols to `Astronomical` layer for ships
- Tested close flying ships in small view (close enough to see the 3d model of the other ship)
- Fixed Kepler body line rendering using the wrong camera for LOD
	- Slightly increased max point count for Kepler lines
- Built prototype script for steering spacecraft using keyboard, testing out rail invalidation and recalculation
	- Unsurprisingly, this complex and largely untested system is broken!
	- Fixed up page epochs in the relative rail
	- Discovered the root bug - invalidation of the rail needs to _discard_ the results on in-flight integration job when it finishes!
## Tuesday 15th
- Discarding integrator data if the rail epoch has changed while the job/task was running
	- Two remaining issues to fix:
		- `RelativePagedRail` `BoundingSphere` calculation (part of nbody line picking) is sometimes trying to write out of bounds
		- Entity jumps position when a burn is scheduled/cancelled
- Debugging why nbody line picking isn't working
	- Rewriting nbody picking to use a simpler picking system (simple linear scan, instead of recursive). This fixes the index out of bounds issue.
	- Ray appears to be in the wrong space (needs to be relative to the origin to move back into world space)
- Debugging entity jumping
	- There are two jumps:
		- A single frame jump to a position
		- A persistent offset for the entire duration of the burn
	- Investigating single frame jump
		- Sampling the rail fails because two points are required (one either side of the sample time) but because the rail has been trimmed down to end at _now_ there's no point after now!
		- Added extrapolation to rail sampler, if two points cannot be found it uses the last known good point and extrapolates. This seems to fix the one frame jump.
	- Investigating shift
		- Probably caused by linear interpolation of a non-linear curve. i.e. the sample is some way into an acceleration (changing velocity) but the sampler is linear (assuming constant velocity)
## Wednesday 17th
- Exported some orbital data from live sim, experimenting with it in Python
- Some possible fixes
	- Better interpolation, sticking closer to ground truth so the skip is smaller
		- Run an integrator every frame (but lower precision) and re-sync with rails smoothly
		- Fit a curve to the rail points (e.g. bezier) and interpolate along that
	- "Fixup" step
		- Detect when the rail is modified in the section that interpolation is currently sampling, run an explicit fixup step - interpolate from the last predicted position (even though it's wrong) to the next rail point, then interpolate as usual
## Thursday 18th
- Began some work prototyping a new orbit rail sampler, which detects discontinuities.
- Removed "catch-up" mode in integrator - the current implementation can leave large "holes" in the rail since the catch-up work is not added to the rail
	- Modified rail trimming to reset delta time back to min value, it'll rapidly go back up if it needs to.
- Prototyping cubic bezier interpolation between points, that helps a lot! There's still some drift since cubic bezier is not a perfect approximation.
- Built out a stateful sampler:
	- Extrapolation phase - best guess when there's no available rail data
	- Interpolation phase - when there's rail data, using cubic bezier
	- Reconciliation phase - when there's rail data but we just recently finished extrapolating. In this case continue extrapolating _and_ interpolating, and slowly interpolate from one to the other. Lasts 30-60 frames.
- Noticed that the spacecraft act differently depending upon if the rail was invalidated or not. **Even if there's no actual change**! Definitely a bug in how invalidation is done, or how recalculation is done.
## Monday 22nd
- Setup a test project to develop integrator interpolation
- Integrated the same point forward, but using randomised timesteps, then compared distance between interpolated points
- Tested 3 methods:
	- Linear - terrible
	- Bezier - also terrible but it's smoother, so a slight improvement over linear. Still has just as much error though.
	- Kinematic - amazing, 30x less error. Also should be smooth. Assumes constant acceleration so not technically correct and still just an approximation.
- Implementing kinematic interpolation in Ephemeris main project, problem seems to be completely fixed!
## Tuesday 23rd
- Removed "catch up" mode from `RailIntegrator` - running integration work on main thread when an entity is behind. Extrapolation mode in the sampler handles this now.
- Added an event the integrator can send when entities are falling behind.
- Tested the (very rough) keyboard controller script, movement now seems to be smooth with no jitter or weird drifting.
## Wednesday 24th
- Investigating why `NBodyOrbitLine` renderer picking is broken (it was broken a while ago when switching the camera system).
	- Camera ray values coming from Unity seem to be completely wrong. Not attached to mouse, offset is dependent on resolution.
	- [`Event.Current.mousePosition`](https://docs.unity3d.com/ScriptReference/Event-mousePosition.html) seems to be the wrong scale, using [`Input.mousePosition`](https://docs.unity3d.com/ScriptReference/Input-mousePosition.html) fixes it.
	- Need to offset things by the transform position of the line renderer, to account for the camera being attached to a different thing to what the line is relative to.
- Optimised nbody orbit picking
	- Normalizing ray ahead of time, so distance calculations can just use `1.0`.
	- Replaced many divides in sphere tests with a single `1/x` and using multiplies later.
	- Placed a soft limit on the number of points returned.
	- Considered using ray/cylinder tests, these are more expensive to evaluate but will have a tighter fit. Not implemented, it's fast enough at the moment with the soft limit preventing edge cases getting too extreme.
## Thursday 25th
- Experimenting with importing Decal Machine decals from Blender to Unity
- Experimenting with settings (audio, graphics, sim fidelity etc)
- Cleaned up some experimental scripts (migrated most of them to the main scripts folder)
- Began updating `RailIntegrator` to stop integrating when an orbit intersects a Kepler body
- Added collision detection to integrator - rails which impact a Kepler body are terminated and not integrated further.
## Friday 26th
- Deleting an entity when it reaches the end of it's orbit
- Creating an symbol at the impact point of an orbit
- Updating `Myriad.ECS` to have basic relationship support
- Debugging symbol not appearing where it should
## Sunday 28th
- Updated `Myriad.ECS` to have proper disposable component support, auto disposing any `IDisposableComponent` when it is destroyed.
- Updated Ephemeris to new `Myriad.ECS` version, this exposed a bug in the integrator which was not properly disposing jobs and thus leaked memory.
## Monday 29th
 - Tweaked postprocessing colour curves to make dark side of planets darker (but not as extreme as ACES, which wipes out half of the skybox).
 - Tweak Luna material to have more close-in detail (normals as well as albedo)
 - Added a stack of objects which the camera focuses on. When the camera focus object is destroyed it transitions to the previous objects on the stack.
	 - Not quite a stack:
		 - Only keeps the top-most instance of a thing
		 - Dead items are removed from the stack
		 - There is a max size, removes oldest objects when exceeded
 - Updated systems that used phantom components to use disposable components where applicable
 - Improved some orbital elements for Saturnian moons
 - Imported ISS to replace boring test sphere
	 - Worked out out to export textures from blender
 - Improved shadow quality
## Tuesday 30th
- Working on FUI for docking sim
- Updated `MyriadUnityIntegration` package
## Wednesday 31st
- Finding some SFX to use for thrusters
- Setting up basic SFX playback in demo scene
- Designing more FUI for docking sim