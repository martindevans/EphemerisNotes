---
tags:
  - devlog
  - TechnicalDetails
  - DockingSim
sidebar_position: 11
---
## Friday 1st
- Finished off developing FUI dropdown menu
- Working on docking sim settings menu
## Saturday 2nd
- Experimented with SQLite in Unity
	- Very painful to setup
	- There are some Unity specific libraries, but Myriad isn't Unity specific so can't depend on them!
- [LiteDB](https://www.nuget.org/packages/LiteDB/) seems like a good pure C# alternative
	- Immediately works in Unity
- Fiddling with Entity serialization in Myriad.ECS
## Monday 4th
- More dropdown container work!
	- Auto resizing as options are added and removed
	- Way to add options from editor as well as scripts
- Started on button hierarchy/tree view
- Put together audio settings menu
- Worked out how to apply content size fitting to the FUI panel hierarchy
	- Still need to integrate this into the prefab so it works with all panels
- Added support to the FUI panel for auto resizing based on content size
## Tuesday 5th
- Fixed up some minor bits of broken UI due to the panel change
- Binding audio settings UI to the actual audio settings
	- Loading from serialized settings into UI
	- Applying UI changes to audio system and saving them to file
- Upgraded FUI project to Unity 6
- Started experimenting with a "treeview" of buttons
## Wednesday 6th
- Continued with TreeView experiment
- Improved test coverage for Myriad.ECS
	- Removed some APIs that I didn't really like when coming back to them a second time
## Thursday 7th
- Cleaning up TreeView prototype code, moving to permanent location
- Added a method to Myriad.ECS to bulk delete entities which match a `QueryDescription`
- Updated main project packages, fixed some minor Unity 6 issues in 3rd party packages
- Started setting up the docking menu with tree view
- Modified some event handler behaviours to targets arrays of things instead of just 1 thing, easier to work with than adding lots of duplicate behaviours
	- Fixing breakage caused by this in FUI project
	- Fixing it in main project
- Investigated how to rebind input actions in the UI
- Debugging issue with audio setting defaulting back to `Mono`
	- Appears to be an issue with Carousel initialisation, always reverting back to zero
## Friday 8th
- Fixed Carousel initialisation
- Setting up other panels with treeview
- Investigating how to do custom graphics settings
	- https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/quality/quality-settings-through-code.html
- Building graphics settings menu
## Saturday 9th
- Playing around with internal ballistics prototype
## Monday 11th
- Added `RenderingSettings.PropertyChanged` callback
- Added `AudioSettings.PropertyChanged` callback
- Created a simple UI binding system
- Used that binding system in the audio menu, much neater
- Removed overrides (eg. render scale) from graphics menu for now, they're a pain to work with
- Added screen mode (full screen exclusive, borderless, window)
- Fixing some z-order issues with dropdown
	- Making the pop out options box ignore layout flow and draw over everything else
- Creating a player build to test screen resolution settings (which don't apply in editor)
	- Fixed various minor issues blocking player build
- Begun implementing input binding menu
## Tuesday 12th
- Adapting rebinding UI example to work with TextMeshPro
- Modifying rebinding prefabs to work with FUI framework
## Wednesday 13th
- Work on rebinding UI (making it fit the FUI style)
- Reworking input actions to have separate Yaw/Pitch/Roll actions, easier to understand when rebinding which axis means what
## Thursday 14th
- Improving FUI dropdown to fix some issue discovered while using it in the GFX settings menu
- Tweaking layout of input bindings menu
- Fixing scaling of canvas with resolution
- Implemented resetting back to default for input bindings
- Saving/loading input bindings
- Fixing velocity indicator
	- Offset by half a canvas size
## Friday 15th
- Modified smoothing on velocity indicator to apply less smoothing when burning and more when not burning.
- Changing velocity indicator when velocity is offscreen, and clamping to edge
- Rotating velocity indicator to point towards true position when off screen
- Experimented with moving lines (getting bigger and small) to indicate velocity
- Discovered velocity indicator is broken in certain resolutions
	- Using in-world indicators instead of canvas based, sidestepping the whole issue
## Monday 18th
- Showing speed and range meters on HUD
- Experimenting with various ways to style text in `TextMeshPro`
- Working out how to best format the text with zero allocations
- Debugging issues with `TextMeshPro` not setting text as I expect
- Investigated issue with z-fighting, caused by depth priming
	- Probably related to camera near/far planes being very far apart
	- Worked around by disabling depth priming
## Tuesday 19th
- Setting up docking axis for station
- Adding MET clock
	- Play/Pause
	- Fast Forward
	- Menu
	- Toggling icons when changing states
	- Blink elements to indicate state
	- Showing time based on sim time
- Adding tooltips to some HUD elements
- Started on victory system
## Wednesday 20th
- Removing GDTK from FUI project (it's been deprecated from asset store)
- Building new tooltip system for FUI system (to replace GDTK one)
- Found some music to use royalty free
	- 'At The End Of All Things' by Scott Buckley - released under CC-BY 4.0. www.scottbuckley.com.au
- Created a playlist in the menu which cycles through tracks
- Tweaked audio settings menu range
- Fixed bug in `Myriad.ECS` integration advancing time too fast (due to getting tick data twice in a frame)
## Thursday 21st
- Experimenting with [Rayfire](https://assetstore.unity.com/packages/tools/game-toolkits/rayfire-for-unity-148690), for potential spacecraft destruction (e.g. solar panels on ISS in docking sim collisions)
- Removing GDTK tools from main project
- Replacing GDTK tooltip usage with my own FUI tooltip
- Fixed some usability issues with FUI tooltip
## Friday 22nd
- Various tooltip tweaks
- Experimented with victory monitoring system
- Build docking axis system, generating stats (distance, speed, angle) for every docking pod with it's closest docking target
- Discussed some potential UI improvements with Recatek
	- Make panel background transparent with UI blur
	- Remove diagonals (or make them more subtle, maybe also transparent)
	- Corner crosses are too dominant (remove them?)
	- Use more colour and iconography to combat how spartan the basic design is
## Saturday 23rd
- Experimenting with https://github.com/lukakldiashvili/Unified-Universal-Blur
- Prototyping chunk fragmentation in `Myriad.ECS` with a defrag pass at the end. In theory this should speed up `CommandBuffer` deletions and structural changes.
## Sunday 24th
- More chunk fragmentation prototyping.
	- Reverted it all. The expected speedup wasn't materialising and it was adding a lot of incidental complexity (and even some more work in some cases, which could slow it down)
## Monday 25th
- Testing UI blur on FUI in docking sim
- Modified panels to disable blue effect if any parent gameobject in a panel, this prevents stacking of the effect which looks weird
- Adding angle/rate to docking UI
- Began working on HUD elements to show up after docking successfully
	- docking clamps locking in place one by one
## Tuesday 26th
- Animated docking clamp
- Started creating system to align pod with axis once soft captured
## Wednesday 27th
- Tested purchased dragon capsule model in Unity
	- Bad geometry :(
- Purchased another dragon model and added it to scene
- Using dragon in pod prefab
- Reworking docking ECS systems
	- Removing auto alignment
- Installed Mirror in Ephemeris
## Thursday 28th
- Experimenting with Netcode for GameObjects in another project
	- Steam backends available [here](https://github.com/Unity-Technologies/multiplayer-community-contributions)
	- Trying out menu -> lobby -> game flow
	- Testing multiplayer play mode
	- Implementing network connection approval
	- Basic chat system
## Friday 29th
- Basic pong game using NfGO and GameObjects
	- Spawning paddles and ball when loaded
	- Physics bounciness
- Using tags to auto configure other players