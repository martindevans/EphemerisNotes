---
tags:
  - devlog
sidebar_position: 7
---
## Wednesday 1st
- Cleaning up June notes
- Cleaning up `ReadLast`/`ReadFirst` jobs
	- Unify into `ReadIndex`
	- Test coverage
- Started sketching framework for vectorised lambert solver (solve 4 problems simultaneously with SIMD)
	- Creating simd4 helpers, for operating on 4 x double3s simultaneously
- Added a default ship to storage
- Setting up UI to display budget
	- [ ] Mass
	- [ ] Money
	- [ ] RPC event when budget changes
	- [ ] Dynamically disable items in dropdown when they're over budget
		- https://stackoverflow.com/questions/55297626/disable-an-options-in-a-dropdown-unity
## Thursday 2nd
- More SIMD4 maths helpers (with tests)
	- [x] sqrt
	- [x] rsqrt
	- [x] radians
	- [x] degrees
	- [x] log
	- [x] sin/asin
	- [x] cos/acos
	- [x] cosh/acosh
	- [x] cinh/asinh
	- [x] sincos
- Fixing issue with serialisation code passing writers by copy instead of ref
	- Works with current usage, but fragile if a different type of writer was ever used
- Setting up dropdown menu to allow individual items to be disabled
- Fixing `ShipsStorage` loading on the wrong thread
- Passing selected ship up to spawn button
## Friday 3rd
- Spawning
	- [x] Get focused planet
	- [x] Get orbit
	- [x] Send ship spec on click
	- [ ] Send back confirm/deny
	- [ ] Send back budget
		- Temporarily setting random budget every frame to test things
	- [ ] Mark player as "done"
		- Added overlay when local player clicks done
		- [ ] Send event to server when local player clicks done
		- [ ] Send event to all clients when player clicks done
		- [ ] Show indicator on overlay for who is done
	- [ ] Switch game mode when all players are done
- Removed budget stuff from lobby
- Slightly optimised bullet collision sweeps (early out when there are either no bullets or no colliders)
## Saturday 4th
- Weekend project - completing SIMD port of lambert solver
	- Porting iterative methods, same approach for all:
		- Calculate which lanes are "active"
			- Exit if all lanes are inactive
		- Compute for all lanes
		- Update loop state only for active lanes
	- Porting tests
		- They all work first time!?
		- Adding fuzz test to compare with baseline
	- Updating porkchop generator to use new method
## Monday 6th
- My monitor died :(
- Created a script to populate a dropdown with planets
	- [ ] Filter based on scenario and team
	- [ ] Store scenario in ECS
## Tuesday 7th
- Investigating styling issue in Dropdown
	- [x] Need to specify a theme key for `white`
- Raising planet selection event
- Added camera controller locking, preventing switching focus
	- [x] Use in spawn controller
	- Auto configuring orbit when planet is selected
## Wednesday 8th
- Investigating broken drag axis for orbit editor
	- It's fine, just weird due to trying to render scene view and game view at the same time!
- Fixing issue with grabbing editor handles causing orbit to change slightly
	- Capturing initial value and offset from mouse cursor, maintaining that error. This prevents an initial "jump" when first clicking
	- [x] Apoapsis
	- [x] Periapsis
	- [x] Ascending node
	- [x] Descending node
	- Slightly reducing the captured error every time the user inputs a change, hiding the error reduction inside the genuine input
		- Removed this
- Debugging network serialisation issue
	- Bad Magic number on ship serialisation
- Setting up spawning for ships
	- Track budgets on server
	- Check budget
	- Checking if planet is allowed for spawning for this team
	- Adding list of allowed planets per-team to scenario
## Thursday 9th
- Expanding list of spawn planets in scenario into a proper spawn point spec
- Spending ship value from team budget
- Sending budget update
- Sending initial message to set budgets at startup
- Spawning a ship!!!!
	- Integrator error - missing planet?
	- NaN orbit pos/vel
	- [x] Orbit elements are not serialised correctly
	- [ ] Now the sanity check on orbit data is failing?
		- [x] More units tests
		- [x] Check serializer byte alignment
		- [ ] Velocity data is position data!?
			- Not always. but velocity seems to be the one that's often/always broken
## Friday 10th
- Adding `TimeAtTrueAnomaly` function
- Using correct true anomaly for spawning
	- Correcting position calculation: parent state at time 0, orbiter state at time TA
- HotStuff units are not network serialised properly
	- Writing serialisers for every one
	- Added a unit test that fails if a new type is added without a serialiser
- Investigating orbit serialisation error
	- double sequences serialisers are heavily tested
	- Fuzzing orbit data roundtrip
		- [x] No events
		- [x] Events
	- Potential double free to array pool?
		- Yes! Fixed
## Monday 13th
- Setting orbit relative to parent planet during spawning
- Adding `Done Spawning` tracking
	- Checking all players
	- Exempting spectators (treat them as implicitly done)
	- Switch gameplay mode when done
	- It works!
## Tuesday 14th
- Cleaning up some todos
- Adding client side handling for refused spawn requests
- Experimenting with Unity `Animator` to control UI error states
## Wednesday 15th
- Continuing experiments with `Animator` for UI
	- Events are not reliable?
		- Layer weight must not be zero!
- Building a card to show who we're waiting for during spawning
	- [ ] Spawn cards
	- [ ] Bind to players
	- [x] Toggle card when player becomes ready
- Adding `PlayerAvatarTexture` component
	- System to load avatars (e.g. from Steam) asynchronously
## Thursday 16th
- Spawning cards
- Binding cards to players
- Learning about shader graph custom functions
	- https://docs.unity3d.com/Packages/com.unity.shadergraph@5.16/manual/Custom-Function-Node.html
- Investigating raymarching rendering for volumetrics
	- https://adrianb.io/2016/10/01/raymarching.html
	- https://github.com/hecomi/uRaymarching
	- https://github.com/bshishov/UnityVolumetric
	- https://github.com/aniketrajnish/Raymarching-Engine-Unity/blob/main/Assets/Shaders/Raymarcher/Include/DFs.cginc
## Friday 17th
- More raymarching
	- https://www.digitalsalmon.co.uk/blog/raymarching-celestial-phenomena
- Experimental plume renderer
	- Render only back faces of proxy geometry
	- Analytically calculate front face position per-pixel
	- Jitter start positions to fix banding
## Saturday 18th/Sunday 19th
- Messing with more raymarching plumes
## Monday 20th
- Testing lobby with Unsteam lobby
	- Lobby is broken - probably an Unsteam bug?
	- Host is not added to their own lobby!
	- Fixing spawning panels disabling themselves and then never re-enabling themselves
- Investigating index-out-of-range in integrator (major body)
	- tidal force calculating is returning NaN!
	- NaN in integrator due to bad engine burn, test ship has zero thrust!
	- Fixed burn scheduler to not create a burn if force or mass flow is zero
- Fixing Unsteam lobby unable to set member data key
- Cannot connect to KCP session
	- ~~Auth problem?~~
	- Wrong address encoding
		- [x] Steam uses user ID as address, this doesn't work for KCP!
	- [ ] Once in the game never loads - waiting for `netid!=0` forever
		- This won't ever happen, because it's only zero after a player object is created
	- Need better handling for failure to connect:
		- [x] Client needs to not hang forever
			- Returning to main menu
		- [ ] Server needs to notice someone failed to connect
- Fixed lobby "ready" indicator showing the state for the local player for all players
- Added an offline scene to the network manager - failing to connect moves to this scene
## Tuesday 21st
- Refactoring connection process:
	- Moving spawn player process into custom network manager
- Building a custom network manager for new spawn process
## Wednesday 22nd
- Creating campaign/scenario list for lobby
	- [x] Campaign element
	- [x] Scenario element
	- [x] Spawn scenario elements
	- [x] Campaign title
	- [x] Scenario title
	- [x] Figuring out layout rules to list scenarios inside campaigns
	- [ ] Click scenarios
	- [ ] Scenario search
- Big refactor, splitting campaigns and scenarios into separate assets
	- [x] Fixing breakage
	- [x] Creating `scenario.json` files
## Thursday 23rd
- Refactoring campaign list UI to just be a scenario list
- Adding filtering to scenario list
- Using new scenario list in lobby
- Creating some campaign files
	- Experimenting with procedural generation for NATO style tasking
## Friday 24th
- Improving lobby
	- Scenario list panel outlines
	- Scenario title
	- Scenario briefing
- Adding orbit preview for spawning
	- [x] Create nbody rail behaviour
## Monday 27th
- Investigating feasibility of weekend idea for `Myriad.ECS` foreign key entity joins: allow command buffer to sort archetypes/chunks. This might optimise data locality.
	- Implemented chunk sorting, but not exposed public API yet
## Tuesday 28th
- Improving test coverage on HotStuff physics library
- Investigating fast approximate assignment problem for gunnery
	- N guns, M targets, assign guns to targets to minimise chance of impact
	- https://en.wikipedia.org/wiki/Weapon-target_assignment_problem
- Adding dashed lines to NBody spawning preview
	- Line times are specified with `soft_double` (emulated f64 on GPU)
## Wednesday 29th
- Building a simple missile/PD gun simulation, to test gunnery assignments
	- Full target assignment probably not needed
		- Missile PD can fire a salvo and wait to see if it works
		- Lasers fire until the target explodes (no travel time)
		- PD guns are always extremely short range, suboptimal but fast algorithm is ok
- New UI base panel design
## Thursday 30th
- Finishing panel v2
- Updating packages
	- Burst
	- Unity Physics
	- UniTask
	- HotStuff
- Build for LAN multiplayer testing
	- Debugging issue with entity binding in build
		- Reproducible in editor
		- Time control UI is rebinding when entering gameplay phase
			- Binding created in `OnEnable`, never torn down!
	- [ ] Multiple uploads issue
	- [ ] Tidal force is NaN (caused by zero thrust)
	- [ ] No default ship file created
	- [ ] Old lobby doesn't disappear with steam?
	- [ ] Client had all planets loaded (Steam only? Client only?)
- Reduced size of some files (excessive textures)
- Considering chunk sorting API while build runs
	- [ ] `CommandBuffer.SortChunks(Archetype, SortKeyBuilder)`
	- [ ] `CommandBuffer.SortChunks(QueryDescription, SortKeyBuilder)`
	- [ ] `CommandBuffer.SortArchetpe(Archetype, SortKeyBuilder)`
	- [ ] `CommandBuffer.SortArchetpes(QueryDescription, SortKeyBuilder)`
## Friday 31st
- Added "NPCs" section to scenario file (empty for now)
- Building new ship storage system:
	- Multiple source:
		- Streaming assets (shipped with game)
		- Persistent data (writeable folder for saves)
		- Steamworks

