---
tags:
  - devlog
sidebar_position: 3
---
## Monday 3rd
- Setting up test harness for thermal systems
- Creating component for simulating phase change heating/cooling
	- Basic system tracking only one phase change
	- Rough system tracking all 3 phases
	- Better system tracking all three phases
	- Sanity checking against real values for a kettle of water
- Setting up formula to calculate boiling point of liquid at different pressures
	- https://en.wikipedia.org/wiki/Clausius%E2%80%93Clapeyron_relation
- Set up basic framework for code generation of units structs (kg, kelvin, mole etc)
	- Rewriting test code to use strongly typed units
	- Worked through all the unit relations setting up operators and sub units
## Tuesday 4th
- Adding pressure calculation to boiling
- Sub stepping adding energy, updating the boiling temperature as pressure changes. Not _technically_ correct since the temperature doesn't change as that energy is added, but simplifies things a lot.
- Updating units system to remove alt units (e.g. Celsius vs Kelvin)
- Creating `Material` struct with all material properties
- Researching heat exchangers
## Wednesday 5th
- Refactoring units system so it can be completely turned off by a compiler switch
	- Ok that's not really practical without losing much of the benefits
- Investigating serialization for Unity/non-Unity projects
	- [MemoryPack](https://github.com/Cysharp/MemoryPack) claims to be fast, compact and has both Unity and non-Unity support
- Created a simple serializable table which can store multiple series of data
- Generating a static table of data from a phase change simulation, this can be generated at edit time (ship design) and used at runtime (during combat)
- Writing a system to linearly simplify a dataset, removing points which can be predicted from the points on either side
	- Rewritten to ensure it can't flatten out subtle curves
- Implementing radiators
	- https://en.wikipedia.org/wiki/Stefan%E2%80%93Boltzmann_law
	- https://space.stackexchange.com/questions/51450/how-does-a-radiator-work-fast-enough-on-a-space-craft
	- Plotting absorbed energy over complete range for a spacecraft in LEO
- Further fiddling with modifying code generator to completely compile out units
	- Overloads are a problem, e.g.
		- `Pascal IdealGasLaw(Kelvin temperature, MetreCube volume, Kilogram gas)`
		- `Pascal IdealGasLaw(Kelvin temperature, MetreCube volume, Mole gas)`
		- These become the same signature!
## Thursday 6th
- Cleaning up Steradian code
- Testing absorption from Earth and Sol
- Rewritten linear simplification again to fix the issue with sometimes flattening out curves (testing against the baseline, so it can't drift)
- Added `GameTime` class to `Myriad.ECS` (instead of defining it in basically every project that uses Myriad)
	- Updated Myriad+Unity package
- Design work on thermal management algorithm
## Friday 7th
- Finding a graph package to use for testing
- Using [QuikGraph](https://github.com/KeRNeLith/QuikGraph)
- Investigating [MSAGL](https://github.com/microsoft/automatic-graph-layout) for debug drawing
	- This sample seems to show what I want: https://github.com/microsoft/automatic-graph-layout/tree/master/GraphLayout/Samples/DrawingFromGeometryGraphSample
- Simulating heat pump COP
	- https://en.wikipedia.org/wiki/Thermal_efficiency
## Monday 10th
- Setting up basic thermal sim
	- Starship fuel quantities
	- 2MW reactor (waste heat)
	- 1MW laser (waste heat)
	- 44m high temp radiator
	- 8m low temp radiator
- Find thermophysical properties of oxygen
- System for heating phase change sinks to a set temperature
- Adapted heating function to have temp/pressure/joule limits
- Thermal simulation algorithm
	- Move joules from source to loop
	- Subtract joules from loop through radiators
	- Move excess joules into attached sinks which are cooler than the loop
	- Move joules from sinks into cooling loops which have spare capacity (through heat pump) until sink is at preferred temperature
## Tuesday 11th
- Implementing cooling for phase change materials
- Implementing moving heat out of sinks into cooling loops (down to the preferred temperature)
- Solving for total work in heat pumps
- Refactoring prototype sim code
- Working out a new algorithm for distributing heat from sinks to cooling loops with spare capacity
	- In order, from coldest to hottest loop
		- Work out how many sinks target this loop = N
			- For each of those sinks, take at most `SpareLoopCapacity / N`
			- Repeat this step, removing sinks which have had their max cooling applied
			- Break out once all sinks have been removed or the `SpareLoopCapacity == 0`
	- Implemented that
- Testing an idea for simplifying phase change sim - record a big table of data from a heating cycle then just lookup values in that.
	- Seems reasonable, and it should allow for higher fidelity simulation of curves in large steps.
## Wednesday 12th
- Investigating better linear simplification
	- [Ramer–Douglas–Peucker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
	- [Visvalingam–Whyatt algorithm](https://en.wikipedia.org/wiki/Visvalingam%E2%80%93Whyatt_algorithm)
	- For now, just hacked in a smaller error bound so I can continue working on other things
- Data table idea (mentioned yesterday) has some issues:
	- It's only valid for a fixed volume and quantity of material
		- Can't support pressure relief
		- Can't remove material (e.g. fuel) from tanks
- Fixed some bugs in phase change material with heating/cooling breaking limits
- Test runs with different step sizes and counts (always multiplying to the same amount of time):
	- 1000x1s: `0J Temps: [96.524773K, 67.925144K]`
	- 100x10s: `0J Temps: [96.524775K, 67.925146K]`
	- 10x100s: `0J Temps: [96.524797K, 67.925157K]`
	- 1x1000s: `0J Temps: [96.525013K, 67.925271K]`
- Implementing Ramer Douglas Peucker
- Created new `HotStuff` library to clean up prototype sim code
	- Porting over parts one by one and writing tests with 100% coverage
## Thursday 13th
- Porting `PhaseChange` material
	- Struggling to find an efficient way to implement boiling due to change in boiling point as pressure changes
	- Using a constant boiling point instead
	- Implemented a new system for heating with limits, binary searching the energy range to find the amount of energy to add
	- Implemented cooling using the same binary search system
## Friday 14th
- Fixing some edge case bugs in search system (e.g. wasting time searching below zero kelvin)
- Simplified unit naming conventions
- Porting thermal sim
	- Extra safety checks during setup
	- Unifying heat sources and pumped heat sources into common interface
	- Fixed issue with extracting heat from sinks still checking sinks that are already at preferred temperature
- Writing covering tests for thermal sim
- Added calculation of "load factor" for each cooling loop
## Sunday 16th
- Improved test coverage on thermal simulation
- JSON serialization for unit types (Newtonsoft)
- JSON serialization for other types
- Setting up package ready for import into Unity
## Monday 17th
- Brainstorming more ideas for ship design (areas besides thermals)
- Minor cleanup of thermal sim library
- Getting more material properties (Hydrogen)
- Working on radiator absorption from sky (sun, planets, other radiators)
- Tried moving project to Unity package
	- Sucks to work with: Old C# version, t4 templates don't work.
- More work on sky system
	- Simplified overlap test - if the vector to the further object is within the area of the closer one, the further one is totally obscured. For space scenes where the distances involved are so huge this shouldn't make much difference.
- Finished absorbing heat from sky sources
## Tuesday 18th
- Documenting usage of `HotStuff` thermal simulation library
- Importing `HotStuff` into Unity again
	- Removed file scope namespace
	- Removed `record struct`
	- Removed `ref readonly`
	- Removed collection constructors (`[]`)
	- Removed primary constructors
	- Dependency on Newtonsoft JSON
	- Removed `ImplicitUsings` (https://learn.microsoft.com/en-gb/dotnet/core/project-sdk/overview#implicit-using-directives)
	- Added `IsExternalInit` shim
	- Not using `double.Min` etc
	- Removed `string.Create`
	- Renamed `Material` to `Substance` just prevent name collision with `Material` in a rendering context
	- It finally works!
- Setting up a scene to run `HotStuff` sim in Unity
	- Testing sphere obscurance visually
## Wednesday 19th
- Investigating t4 templates in Unity
	- https://github.com/deniszykov/t4-templates-unity3d
- Modifying `HotStuff` to work with Unity serialisation
	- Unit structs no longer read-only
	- Serialization attributes when necessary
	- Property drawer
- Building an end-to-end tests scene with a mock ship and some heat sources in the sky
	- Fixed hydrogen temperatures
	- Removing heat sinks from candidate list once their heat pumps are at capacity instead of re-checking and discovering it is still zero
## Thursday 20th
- Adding more bits to thermal test scene
	- Secondary loop
	- More radiators
	- More pumps
- Not capping capacity factor calculation at 1, this gives an indication just how much over capacity a loop is
- Automatically disregarding radiators that are absorbing more than they are emitting
- More live stats added to bits of cooling system
- Automatically deriving more unit relationships
	- e.g. `A = B * C` -> `A = C * B`, `B = A / C` etc
- Started work on ECS bits for thermal system
## Friday 21st
- Added `Collect` queries to `Myriad.ECS` - collecting results from a query into a list
- Implemented system to gather heat sources from sky and update thermal simulation
- Experimented with other ships acting as heat sources
	- Sun at 1au: 1361W
	- Ship at 1km, 10m radius radiator, 3000C: 650W
	- That's extremely hot and very close, and it's still not significant. Can safely ignore ships as heat sources
- Replacing Ephemeris Unit structs with HotStuff structs
	- Metre
	- Kilogram
	- Second
	- Radian
## Saturday 22nd
- Experimental hierarchical transform system for `Myriad.ECS`
- Handy reference: https://gabormakesgames.com/transforms.html
## Monday 24th
- Fixed issue with orbit rail visuals breaking if changed at the wrong time (while a conversion job was in flight)
- `Myriad.ECS`
	- Transform system optimisations
		- Directly using some internal/unsafe APIs, to skip some checks
	- Fixed potential issue with clearing command buffers
- Reviewing assets in project
	- Updated `Shapes`
	- Updated `Hot Reload`
	- Updated `Mirror`
- Fixed error with UI blur feature
- Investigating `can't AddPlayer before being ready` error
	- Not really an issue, just a false alarm from Mirror
- Working out best way to pass data from lobby to game scene
	- [x] Persist lobby player between scenes
	- [x] Update handler to _replace_ player object in game scene instead of spawn new one
	- [x] Copy data from old to new player object
	- This kind of sucks, it's very sensitive to initialisation order and is very fragile!
	- Implemented new system, with a one-time copying of data off the old object. Triggered by the server.
## Tuesday 25th
- Modified network loading system to request scenario from server
- Compacted tree view some more
- Created `NetworkBarrier` which blocks clients until all clients are blocked.
## Wednesday 26th
- Refactoring system groups into one common location
- Started creating systems to sync entity creation from server to client
## Thursday 27th
- Experimenting with creating a system to sync entities using Mirror & GameObjects - almost all synced entities will have a GameObject representation, so why not just sync that using classic Mirror (and create the entity when the GO is instantiated).
	- Setup spawning from server
	- And from client
	- Syncing initial values (i.e. setting data _before_ spawning)
- Fixed time speed sync being broken, due to change in spawning players
- Using `Singleton` for `GameTimeWorldHost`
- Splitting NBody physics (position sampling, rails etc) out from integration (extending rails with new data). Needed for spawning NBodies which are remote integrated
- Experimenting with compression for orbit data pages
	- Benchmarks (extremely rough):
		- GZIP: 0.77x
		- Brotli: 0.82x
		- DEFLATE: 0.76x
		- XOR: 0.79x ([here](https://github.com/martindevans/HandySerialization/blob/master/HandySerialization/Extensions/Sequences.cs#L98))
			- Tried some variations of this, e.g. deriving velocity from position and storing the errors to the actual velocity value, to reduce the magnitude of the numbers involved. This made it _worse_!
			- This is the simplest, fastest and is nearly the smallest.
## Friday 28th
- Building comms system to sync nbody rail data
- Rough prototype of syncing
	- [x] Packet encoding allocates lots (takes temp copy of data arrays)
	- [x] Rail trimmer (removing pages before current time) interferes with sync
		- Running on both client and server
		- Not syncing changes to the first page, unless _all_ pages are removed
- [ ] At very high time speeds the current time can get rapidly out of sync
	- Need frequent "pulse" message informing everyone of the current game time
	- Clients can speed up or slow down their time rate to stay in perfect sync
- Refactored `PagedRail` to publish events when paged are added/removed
## Monday 31st
- Started setting up a "work queue" of things that the rail system needs to sync, this can be driven by the events
- Rewriting sync system to use events
	- Indices are tricky, they get offset by various things. Need to only use them as a "hint" everywhere they're used.
	- Written system to find a page by ID, using a hint index. We know pages are always in order, so based on the ID of the page at the hint we know which direction to search.
- Updated `RailTrimmer` to not run on remotely integrated entities. The owner will trim the rail as appropriate.
- Written custom serializer, using pooled arrays to avoid allocations
- Refactored custom serializer to use XOR compression in position/velocity/timestamp data streams
	- Interleaving the X/Y/Z streams instead of writing them out one after the other. This simplifies decoding (and should speed it up too).
- Added unit tests for serialization
- Written Bool8 serialization extensions (8 bools as a byte)