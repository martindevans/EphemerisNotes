## Monday 17th
 - Blender
	 - Exporting to Unity
	 - UV mapping
	 - Texturing
 - `Myriad.ECS`
	 - Added `Archetype.Entities` property
	 - Unity integration, show entities for archetype
 - `HandyNetworking`
	 - Experimenting with `SyncVar`
	 - Fixed peers not seeing themselves in lobby
	 - Better handling of connection timeouts
 - Breakout (multiplayer testbed)
	 - Lobby handling of connecting/disconnecting
## Tuesday 18th
- Discussed on Discord
	- Component design
	- Scenarios/campaign structure
	- Rules of engagement
	- Tech research/unlocks
- Experimented with `Myriad.ECS.Networking` library
- Debugging FUI framework buttons
- Restructured scene loading
	- Trying to find a good approach to passing "arguments" between scenes that doesn't end up with a `DontDestroyOnLoad` based mess.
## Wednesday 19th
 - Experimented with `Myriad.ECS` auto parallel system groups
	 - Declarative component dependencies
	 - Updated Myriad Unity integration
 - Learning blender (particularly [ND](https://extensions.blender.org/add-ons/nd/))
## Thursday 20th
 - Learning more blender (space station fuel depot)
## Friday 21st
 - `SceneManager` wrapper, allowing passing "parameters" through scene load
 - Updating test lobby to use new scene loading system
## Monday 24th
- Breakout lobby state sync (ready status)
	- Developing pattern for server managed state
		- Send request to change state from client
		- Send out new state from server
		- Send initial state to client on join
- `HandyNetworking` enhancements
	- Checking header ID to prevent spoofing
	- Removed packet relaying to simplify things, remove the possibility of spoofing altogether
	- Better handling of `OnPeerConnected` event
- Experimented with splitting scene in multiple layers
	- `Astronomical Object` layer for planets, moons, orbits, map markers etc
	- `Small Object` layer for things like spaceships and asteroids
	- Two layers can be composited to have very large things (planets) and very small things (spaceships) in the same view
## Tuesday 25th
 - Began experimenting with compositing cameras
 - Experimented with scalable resolution management
	 - Requires DX12
	 - DX12 seems to be painfully slow/stuttery (in editor) and there are reports that it is slow in builds too
 - Stacking cameras with different postprocessing effects
	 - Allows for ships and planets to have different processing
	 - Copy rotation and FoV from "small" camera to "astronomical" camera
	 - Place `astronomical` exactly at the position of the ship (with planet scene scaling)
	 - Allow `small` camera to move freely around ship, with normal scene scaling (1u == 1m).
	 - Illusion of infinite distance to planet