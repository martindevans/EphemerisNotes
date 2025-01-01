---
tags:
  - devlog
  - TechnicalDetails
  - DockingSim
  - OrbitalMechanics
sidebar_position: 10
---
## Tuesday 1st
- Replaced `Box<T>` with [`NativeReference<T>`](https://docs.unity3d.com/Packages/com.unity.collections@2.5/api/Unity.Collections.NativeReference-1.html). Same functionality, but maintained by Unity.
- Added `DebugDisplayName` component to Myriad
- Showing the display name in the inspector if it exists for an entity
- Better handling of world and system disposal (fixed leaks in rail integrator)
- Made `Myriad.ECS.Entity` contains a back reference to the `World` which contains it. significantly simplifying much of the API!
- Added `EntityId` to `Myriad.ECS` - does _not_ contain the `World` backreference. This can be used in Unity Jobs (which can't hold a reference to managed objects).
- Fixed up Ephemeris to use `EntityId` wherever necessary to successfully compile.
## Wednesday 2nd
- Reimport all to fix missing Myriad scripts (this worked).
- Started work on UI `TextLog` component
- Improving UI scroll view
- Working out how to scroll to bottom reliably
- Worked out links in text
	- https://www.spongehammer.com/link-on-the-ui-using-textmesh-pro-in-unity/
## Thursday 3rd
- Updated nbody integrator to make `EngineBurnSchedule` optional for nbodies
- Added `QueryEntityCount` to some more systems to help with debugging
- Building `NBodyAspect`
	- Constructing helper functions for rail invalidation
- Discovered RKF45 constants may be wrong!
	- Wikipedia page has been updated to state they are wrong
	- [This documentation](https://hanspeterschaub.info/basilisk/_downloads/ff1dec450662e914b8e5eed79a1fc01c/Basilisk-Integrators20170724.pdf) uses different values.
	- Investigate more tomorrow!
- Updated `KeyboardBurnControl` to use new nbody aspect
- Fixed leaks in line renderer (not disposing `ComputeBuffer`)
- Fixed leaks in `RailIntegrator` (not disposing a `NativeReference`)
## Friday 4th
- Investigating integrator issues 
	- Wikipedia page has been updated to state the constants in table 1 don't work
	- References:
		- https://www.johndcook.com/blog/2020/02/19/fehlberg/
		- https://mtchu.math.ncsu.edu/Teaching/Lectures/MA427/By_subjects/27_rkf45_method.pdf
		- https://hanspeterschaub.info/basilisk/_downloads/ff1dec450662e914b8e5eed79a1fc01c/Basilisk-Integrators20170724.pdf
	- Cross referencing with the references, some of the numbers in the Wikipedia tables are wrong
- Added multi-stepping to the integrator - retrying a step up to N times with smaller and smaller timesteps if the error is too high
- Tested in game - quality of orbits is vastly improved!
## Saturday 5th
- Tested using [Kahan](https://en.wikipedia.org/wiki/Kahan_summation_algorithm) and [Neumaier](https://en.wikipedia.org/wiki/Kahan_summation_algorithm#Further_enhancements) summation in the integrator. These are both techniques for summing floating point numbers with very different scales which compensate for the lost precision.
	- Summation is done independently per-axis, so it's just a sum of `Span<double>`
	- This does not seem to help much at all. Test bench shows energy in test scene (which should remain constant, in a perfect integrator) oscillates approximately the same amount.
- Modified integrator to sum all of the derivatives before adding to the state. This means all of the (relatively small) derivatives are added together before being added to the (relatively huge) state vector, at no extra cost.
## Monday 7th
- Added synchronous integration to rail integrator if the rail is very short. This avoids issues with the sampler trying to sample beyond the end of the rail after invalidation (at the cost of doing some of that integration work on the main thread)
- Added an easy way to get a `NativeAccelerationQuery`
- Started building `NBodyBurnAspect` - an aspect for scheduling engine burns on an nbody
- Added `GetComponentRefT<T>` to `Myriad.ECS` - returns `RefT<T>` instead of `ref T`
## Tuesday 8th
- Added method to schedule new burns to `NBodyBurnAspect`
- Updated `KeyboardBurnControl` test script to use `NBodyBurnAspect`
- There's some skipping when creating burns, but it works! Pod and space station move around relative to each other fairly smoothly even when screaming along at 15km/s.
	- Skipping is probably caused by interpolation in position sampling
	- Possibly fixable by crossfading the interpolator (usually done during extrapolation fixup)
## Wednesday 9th
- Investigating jerkiness in position sampling when a new burn is created
- Checked kinematics, they all seem correct
- Forward and backward predictions (starting from one end and predicting the opposite end) have around 45m of error in the current test scene.
	- At 35km/s with 60 seconds between points that's just 0.00214% error!
- Can jerk (i.e. change in acceleration) be derived, to fixup the positional error?
	- Yes!
	- Given: `offset = 1/6 * jerk * pow(duration, 3)`
	- Therefore: `6 * offset / pow(duration, 3) = jerk`
	- This helps (the forward and backward positions of the end points are perfect) but does not entirely eliminate the jerkiness
- Consider adding per-entity max-dt for integrator. This would give me a way to limit the step size for the station and the pod in the docking sim
	- Added this, setting the timestep to 1 seconds totally fixes the jittering
## Thursday 10th
- Added extension methods to setup nbody physics and rail rendering to an entity
- Experimenting with activating sampling fixup when the page current being sampled changes, to smooth out sampling jitter
	- This helps with jerkiness, but ultimately makes overall error worse. The problem is extrapolation is proceeding with old data (i.e. the burn didn't happen) so although there's no skip (because you keep extrapolating and smoothly transition) but there's more error (weird unphysical movements).
- Possible idea: when the rail changes out from underneath points note down the sampling error and fix that over a number of frames, possibly with a cap on how much fake velocity it can introduce.
- Ripped out lots of the rail reconciliation stuff
	- It's really for handling when sampling and there's no rail data, this isn't likely to happen any more since synchronous integration was added
	- I can do better for fixing the actual exact issue (see idea above)
- Implemented the error correction thing, measuring the difference between predicted position and actual position and adding on that offset so there's no jerk, then slowly fixing up that error.
## Friday 11th
- Fixed docking sim menu camera transitions (`cut` -> `ease in out`)
- Controlling error correction based on maximum allowed correction velocity
- Calculating max correction velocity based on distance to nearest visual thing
	- Not actually finding nearest thing yet, just assume it's 1m away which is the worst case
## Monday 14th
- Reading about new input system
	- https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/QuickStartGuide.html
	- https://gamedevbeginner.com/input-in-unity-made-easy-complete-guide-to-the-new-system/
- Setup inputs for docking sim
- Created custom processors to quantize input, this reduces the number of burns that have to be scheduled and cancelled!
- Updated to Unity 2022.3.50f1
- Improved shadow cascades
## Tuesday 15th
- Testing out [GDTK: UI Pro](https://assetstore.unity.com/packages/tools/gui/gdtk-ui-pro-289852?aid=1100lJ2J)
- Added system to find proximity between entities with `HasVisual` and `ClosestVisualProximity` components. Used to calculate error correction velocity (see Friday 11th)
## Wednesday 16th
- Rotating the pod
- Fixing some input bindings
- Experimenting with a new DockingSim main menu, using GDTK
## Thursday 17th
- Fiddled around some more with GDTK
- Updated project to Unity 6
## Friday 18th
- Experimenting with a new indicator system for docking simulator, inspired by [OLS](https://en.wikipedia.org/wiki/Optical_landing_system).
- Tested prototype docking indicator in place on the ISS
## Monday 21st
- Created circular instead of linear optical docking system
## Tuesday 22nd
- Created hexagonal docking ring in blender
- Back and forth working out exactly how to export this to Unity
- Rigged it up with scripts
- Tweaked script for docking lights to pulse when within the docking axis
- Tested in context on ISS
## Wednesday 23rd
- Added new hexagonal lighting system to proper docking sim prefab
- Researched some more about audio assets
- Started designing HUD/UI
- Debugging raycasts
- Added camera shake when thrusters are active
- Started an experimental project for a Myriad driven sound engine
## Thursday 24th
- Added holographic guidance to station
- Designing HUD
- Added velocity indicator to HUD, this is quite noisy because it's just a lerp instead of kinematics
- Implemented kinematic interpolation for velocity too (using the same constant jerk assumption)
	- This has too much noise to show on the UI
- Determining velocity from partial derivate of world positions
	- Less noisy, but still has some jitter
	- Applied frame-to-frame smoothing which cleans it up
- Reduced step size of station and switched back to using the velocity value, it has low enough noise when combined with smoothing
- Investigating modifying settings (audio, rendering, sim etc)
	- URP: https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/quality/quality-settings-through-code.html
## Friday 25th
- Fiddled with velocity calculation, experimenting to see if precision can be improved
	- Found nothing interesting, it's already good enough
- Porting some UI elements from the docking prototype
- Messed around with a singularity in the docking scene
	- Looks cool, totally useless
## Monday 28th
- Started building list of sounds for docking sim
	- Hull creaks
	- Thruster start/loop/stop
	- Background hum
	- Docking capture clunk
- Purchased [Sonity](https://assetstore.unity.com/packages/tools/audio/sonity-audio-middleware-229857)
- Experimented with Sonity, building some test SFX
- Imported Sonity into Ephemeris
- Refactored some docking some menu UI (moving it to FUI framework)
## Tuesday 29th
- Debugging issues with burn controller
	- Weird jiggling sometimes
	- Ignoring some inputs when the inputs change mid burn
- Added [Hot Reload](https://assetstore.unity.com/packages/tools/utilities/hot-reload-edit-code-without-compiling-254358)
- Splitting game logic out from prototype scripts (keyboard controller) and into ECS systems
- Added an enum to Myriad setting how to handle duplicate sets on a new entity (discard the second one, overwrite the first one, throw an exception)
## Wednesday 30th
- Updated things to latest version of Myriad
- Updated Myriad+Unity integration to set the entity name from the GameObject name
- Tweak velocity indicator to fix weird drift when turning
- Fuel gauge
- Low fuel warning
- Testing out new assets
	- [CW Orbit](https://assetstore.unity.com/packages/3d/environments/sci-fi/cw-orbit-modular-backgrounds-233531)
	- [CW Gas Giant](https://assetstore.unity.com/packages/3d/environments/sci-fi/cw-gas-giant-modular-backgrounds-246973)
- Started creating FUI Dropdown box
## Thursday 31st
- FUI dropdown