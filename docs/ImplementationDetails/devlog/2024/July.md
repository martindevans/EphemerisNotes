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