---
tags:
  - devlog
  - OrbitalMechanics
  - DockingSim
sidebar_position: 8
---
## Thursday 1st
- Adapted docking sim to use Unity physics
	- Lots of small fixes to work with the more complicated physics
- Added 3d rings in space, showing docking axis
## Friday 2nd
- Fixed control inputs when craft is rotated
- Fixed kill rot/kill lar when craft is rotated
- Properly wrapping angles in displays
- Discovered that the FUI framework uses a deprecated Unity component (`Animation`).
	- Investigating the newer replacement (`Animator`)
## Monday 5th
- Changed `Panel` to use an `Animator` for expanding and collapsing
- Modified `OverlayMessage` to use the new `Panel` expand/collapse animation
- Added numerical readouts of rotation and position offset
- Adding more sfx:
	- Humming
	- Computer noise
	- Creaks
- Playtesting (Graham):
	- [x] Rotate approach boxes
	- [x] Swap number boxes
	- [x] Make computer noises louder
	- [x] Remove static crosshair lines
	- [x] Brighten mobile crosshair
	- [x] Replace static central crosshair
	- [x] Make creaks quieter
	- [x] "SONAR"
## Tuesday 6th
- Rewrite theme system to use explicit method calls instead of Unity message broadcasts
- Added debugging aids to theme system (showing the node a colour came from)
- Theme system custom editors
- Added "Theme Debugger" in `ThemeNode` inspector
- Docking sim difficulty modes:
	- Easy: nothing changes
	- Medium: random impact - costs about 40% fuel to scrub off
	- Hard: fuel leak - constant fuel drain and torque
- Adjusting volume based on thruster power
- More playtesting:
	- Avril:
		- Roll is confusing (which button is which)
		- "Fine control" toggle
		- [x] Add black outline to position offset indicator so it can be seen against bright background
	- Solon
		- Click on the text log to select difficulty
			- just add menus tbh
		- Ignoring the tutorial prompts
			- [x] Maybe show things the tutorial is expecting you to do and cross them off as they're done
		- Some indicator of which is positive and negative
		- [x] Enter to kill rot, space to kill lat
		- [x] Fix kill mode eating fuel forever (rotational thrusters fire continuously)
			- [x] It's due to high frame rates!
		- [x] Run in background mode
	- IHave
		- Inverted controls (pitch only)
		- Q/E for roll
		- [x] Ignoring the tutorial prompts
			- [x] Maybe show things the tutorial is expecting you to do and cross them off as they're done
		- Indicator when you're looking away from the station
		- [x] Click Kill Rot/Kill Lat indicators to activate it
		- Limited oxygen, to force a bit of speed
		- [x] UI blocking things
			- Intentional - see weds notes
		- [x] Misinterpreted red lines as excess lateral offset, not speed
		- Audio alarm for some warnings
		- [x] "No Prop" text on the right is broken/wrong colour
	- Hourd
		- [x] Thruster "bang" too loud
		- [x] Text log too small, can't scrollback
		- [x] Misread speed indicator bars as thrust indicators
		- Unsure of roll keys (which is which)
		- [x] Unsure of how reticule works for positioning
		- Trying to prevent angular velocity, instead of zeroing it
		- Units on numbers
		- Consider IJKL for rotation and UO for roll
		- Mouse wheel for thrust power
		- Mouse for angle steering?
		- Show key inputs on screen
## Wednesday 7th
- Fixing corner case leaks of `IDisposableComponent` in `CommandBuffer` (Myriad.ECS)
- Swap `Kill Rot`/`Kill Lat` indicators so they're on the same side as the controls for that axis
- Made `kill Rot`/`Kill Lat` indicators clickable to toggle independent kill modes
- Deliberately made tutorial UI overlap _more_ of the HUD, to make it harder to ignore!
- Moved later speed indicators to be attached to the moving reticule, less overcrowding in the middle of the screen
- Added more control over panel theming from scripts
- Added actual target model (ISS)
- Made various parts of the panel not raycast targets
- Added collision geometry to station and ship
## Thursday 8th
 - Added separate buttons for kill rot/lat (enter/space respectively)
 - Modified tutorial to add separate prompt for kill rot/kill lat
 - Added a skip mode to tutorial in editor
 - Gave the spacecraft an initial "kick" for some lateral movement
 - Given a little more starting fuel, to account for that
 - Collision handling
	 - win condition
	 - loss condition
## Friday 9th
- Experimenting with a new "text log" component
- Learning more about Unity layout system
- Created `ScrollView` and `ScrollViewPanel` prefabs
- Created a few experimental "callout" panels
## Monday 12th
- Experimented with callout panel layout. Walking back up the tree adding up margins, so that the root can be resized such that the leaves are the target size.
- Experiment with multiple scenes for menu loading
	- One "background" scene, with multiple menu scenes being loaded and unloaded on top:
		- Sim
		- Main Menu
		- Game HUD
- Added "tinting" to the theme system
- Building a button prefab (using tinting to show when the button is hovered over)
- Added theme support for inverting colours fetched from a redirect
- Created FUI button prefab
## Tuesday 13th
- Fixed button background animator
- Added `Remove` to Myriad `DyanmicSystemGroup`
- Added `GameTime` and `WorldHost` to `MyriadUnityIntegration` package
- Updated main Ephemeris project
- Installed FUI in Ephemeris project
- Begun creating `DockingSimulator` scene in Ephemeris
- Added support for system groups owned by a `MonoBehaviour` to Myriad integration package
- Improved "system providers" in `Myriad.ECS` integration package
## Wednesday 14th
- Added editor display to `WorldSystemGroup` in `MyriadUnityIntegration`
- Moved orbital systems into a separate `WorldSystemGroup` in docking scene
- Created a Phobos moon mesh
	- Phobos is _really_ small, this may have been a waste of time.
	- Might need to consider special handling for very small astronomical bodies (e.g. asteroids)
- Creating docking sim menu
- Investigating Unity audio assets
	- [Master Audio](https://assetstore.unity.com/packages/tools/audio/master-audio-2024-aaa-sound-287785)
	- [Sonity](https://assetstore.unity.com/packages/tools/audio/sonity-audio-middleware-229857)
## Thursday 15th
- Fixed script reference error
- Phobos normal map
- Modified `SolarSystemLoader` to activate child scripts when loading is done, allowing further subsequent loading to proceed
- Tripped up during initialisation by one frame delay on `MyriadEntity` binding to `Entity`
## Friday 16th
- Investigating `AssetBundle` for streaming scene content (planet by planet)
- Developed a prototype for content loading using scenes
	- Each planet is in a scene, with the planet having the same name as the scene
		- Other GameObjects can exist
	- System loader can load those scenes (additive, async), transfer the GameObject to the main scene, and then unload the holding scene
		- Unloading ensures that other objects in the scene (lights, cameras etc) do not get loaded in the main scene.
## Monday 19th
- Started creating Docking Sim menu
	- Initially using split scenes, with the full scale solar system
	- Switched to a hand built scene with the planets all very close together. This makes composing the camera shots and transitions easier
	- Built a colour slider for `TextMeshPro` text
	- Switched to simpler Lerp, it looks better anyway
- Updated `SpaceGraphicsToolkit`
- Improved Europa normal map
- Built Ceres using NASA data
## Tuesday 20th
- Updated Myriad "count" queries to accept an optional query description
- Built out docking sim menu (buttons from FUI framework)
- Improving panel show/hide animation in FUI library
- Adding settings/custom difficulty panel
- Improved handling of `Panel` elements starting in hidden (collapsed) state
## Wednesday 21st
- Added show/hide events to panel
- Set up orbit for Ceres
- Created a way to pass info between scenes when they are loaded
- Loading `DockingSimulator` scene from menu
- Modified game setup script to use the difficulty/location info sent from menu
- Added support for vertex colour to `BackgroundStripes` shader
## Thursday 22nd
- Improving Kepler orbit calculation usability
- Generating a random orbit for target + player
- Constructing `DockingSimulator` scene, ensuring all the various components works together
	- Camera focus
	- Instanced icons
	- Planets
- Adjusted atmospheric scattering on Earth
## Friday 23rd
- Rewriting how entities are resolved after creation in `Myriad.ECS`, simplifying setup code
- Updating everything based on `Myriad.ECS`
	- Protologic
	- Unity integration
	- Ephemeris
## Monday 26th
- Bank holiday
- Investigated [BEPU physics](https://github.com/bepu/bepuphysics2)
	- Used it before with Heist
	- Unfortunately not compatible with netstandard2.1
- [Jitter2](https://github.com/notgiven688/jitterphysics2)
	- Also no support for netstandard2.1
- Jitter1
	- Third party port to netstandard: [Jitter.Core](https://www.nuget.org/packages/Jitter.Core#readme-body-tab)
	- `JVector` and `JQuaternion` instead of standard vector/quaternion will get annoying, but it's usable.
		- Forked and refactored [here](https://github.com/martindevans/Jitterphysics.Core)
## Tuesday 27th
- More Jitter.Core refactoring
- Imported Jitter.Core into Unity, making some tweaks to make it work
- A lot of cleanup work:
	- Removed soft bodies
		- Removed `IBroadphaseEntity`, previously this was the abstraction layer between rigid and soft bodies, so it's no longer necessary
	- Removed multithreading
	- Removed terrain
	- Rewritten a lot of the vector internals (preparing to remove custom `JVector` type entirely)
	- Removed `JQuaternion` (using `System.Numerics.Quaternion`)
	- Replaced `JVector` type with `System.Numerics.Vector3`
	- Enabled nullability checks in some files and fixed nullability issues
	- Detailed clean up in `RigidBody`
## Wednesday 28th
- Moved `Jitter.Core` into a Unity package so it can be easily installed in Unity
- Fixed subtle bugs with pooled resources in `Arbiter`/`ArbiterMap`
- Started basic implementation of `Jitter.Core` with `Myriad.ECS`
	- Bound to Myriad, using a shared world for all entities
- Endless cleanup
## Thursday 29th
- Further cleanup on `Jitter.Core` constraints
- Imported `Jitter.Core` into main Ephemeris project
- Started building systems for having many small worlds (owned by specific entities)
- Reimport all, attempting to fix a unity error ("inconsistent result on import" whatever that means)
- Setup basic systems to copy from Jitter `RigidBody` into Unity transform
- Written a quick test script to apply forces to the `RigidBody` when an input is pressed
## Friday 30th
- Rewritten some of `Jitter.Core` to remove support for mass points
- Built Unity inspector for Jitter `World`
- Built systems for copying orientations into ECS (from Jitter) and from ECS (into Unity)