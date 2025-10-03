---
tags:
  - devlog
  - DamageModel
sidebar_position: 9
---
## Monday 1st
- Cleaning up and publishing August notes
- Updating issue tracker
	- Closing issues for work done
	- New issues for unfinished work
	- Updating tracking issues
	- Sorting out work schedules for the next few months
- Researching [armour penetration](/Design/Damage/Physics/Penetration%20Equations.md)
## Tuesday 2nd
- Implementing various armour penetration equations, carefully gathering test cases online and checking my implementations
- Adding more unit helpers to `HotStuff` units library
- Graphing outputs of Cour-Palais 2 plate penetrator equation
- Experimenting with smoother cour-palais, totally non physical but looks nicer
	- Equations available and well tested:
		- Demarre penetration (< 2km/s)
		- Krupp for crater depth (can also be used for penetration)
			- Uses magic `k` value for materials
		- Schmitt-Holsapple for single plate armour
		- Modified Cour-Palais for double plate armour (whipple)
	- Needs testing:
		- [ ] Fish-Summers crater depth
			- Better than Krupp, still uses magic `k` but a **different** magic `k`!
			- Finding `k` values is very tricky!
		- [ ] Rockwell crater depth
			- Better than Krupp and Fish-Summers
			- Uses Brinell hardness instead of `k`
	- Needed:
		- Replacement for Krupp that doesn't use magic `k` value?
		- Something for multi plate armour
		- Stuffed whipple shield (double plate and more)
## Wednesday 3rd
- Removed Fish-Summers
	- Wasn't well tested, needs magic `K` value
- Implemented Rockwell, calculating ballistic limit and spallation limit in one go
	- Tested from results in NASA paper
	- Slightly lower results than Schmitt-Holsapple
- Considering design of game systems for armour, using these equations
	- Arbitrary stackup of materials and spacings
- Sketching data model for arbitrary stackups
	- Finding some material properties to use for testing
## Thursday 4th
- Building out armour stackup system
	- [x] Single sheet penetration
	- [x] Double/multi layer penetration
	- [x] Bouncing
	- [ ] Spallation
		- [ ] Spall liner
	- [ ] Shattering
	- [ ] Vaporising
	- [x] Penetration
- Slowing down penetrating particle by calculating energy loss with reference to ballistic limit
## Friday 5th
- Calculating fragment size by equally dividing mass between `n_fragments`
- Debugging issue with overmatch formula curve being stepped
- Worked out physics for generating debris clouds from spallation
	- Including spall liner
## Monday 8th
- Debugging shatter regime
- There's a more general issue with stability, probably from the extremely large energy involved
- Prototyping a simpler model, directly applying modified Cour-Palais (when there are >= 2 plates) left or Rockwell (for the last plate).
	- Seems to work and is simpler than the previous system, still needs some "fudge factors" for bits that aren't covered by the pure plate penetration equations
- New way to visualise results, plotting a grid of points coloured by results (penetrate, shatter, melt etc). Much clearer!
## Tuesday 9th
- Creating contour plot from randomised sampling of the velocity/diameter space. Much more readable!
- Testing spall liners
- Adding hot gas propagation
## Wednesday 10th
- Experimenting with UI for armour designer
- UI extensions pack, potentially useful:
	- https://github.com/Unity-UI-Extensions/com.unity.uiextensions?tab=readme-ov-file
- Learning about Unity UI shaders
	- Building crosshatch shader (and variants)
		- Experimenting with more screen space AA techniques
- Prefab for armour plate layer
- Prefabs for spacing measurements
	- Adding input to replace
	- [ ] Add input validation
- Main menu button prefab
	- Auto numbering menu buttons
	- [ ] Add hot key shortcuts
## Thursday 11th
- Button highlights
- Input validator for distances
	- Investigating adding parsing methods to HotStuff.Units
- Settings menu
- Setting up sim
	- Binding test gun angle to sim and back out to UI components
- Angle indicator panel
## Friday 13th
- Creating angle indicator script
- Width indicator script
- Creating entity to hold armour stack
- Scrolling mouse wheel for precise test-shot angle
- Added file browser asset: https://github.com/gkngkc/UnityStandaloneFileBrowser
- Serialization of armour stacks
	- Converter for `Layer`
	- Converter for `PlateMaterial`
- Adding a stack to the UI to show extra stats
- Wired up loading and saving to something that will render the stack
- Added support for alternative fonts to FUI tooltips
## Monday 15th
- Setting up prefabs for layer rendering
- Spawning stack prefabs
- Scroll view for stack display
- Using Re-Orderable Scroll Rect from UI Extensions (see Wednesday 10th)
- Generating unique visual materials for each physical material
- Added "hotkey" button triggers (e.g. Alt+R)
## Tuesday 16th
- Refactoring data model - one entity per armour layer
- Started creating analysis chart
	- Use https://assetstore.unity.com/packages/tools/gui/graph-and-chart-data-visualization-78488 maybe?
- Setting spacing and thickness in ECS fro UI
- Setting UI thickness and width from ECS
- Adding VFX graph to UI, to render analysis scatter graph
## Wednesday 17th
- Adding a panel that shows up over armour plates on hover (move & delete etc)
	- Showing panel on hover
	- Deleting layer entities when button is clicked
		- Fixing up indices
	- Move layers when button is clicked
- Investigating which tooltips aren't working
	- Lazy initialising tooltips, to handle Unity initialising the tooltip canvas after the tooltip
- Started on bulk analysis in job system
	- Sequence:
		1. Generate random projectiles
		2. Generate results for all those
		3. Triangulate in size/velocity space on the results
		4. Place new points inside triangles, more points in triangles where the results are different at the corners
		5. Generate results for those
		6. Maybe repeat from step 3?
	- [Burst Triangulator](https://github.com/andywiecko/BurstTriangulator)
	- Setting up min/max job
	- Storing data in `GraphicsBuffer` (using `VFXTypeAttribute`, see https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@17.1/manual/Operator-SampleBuffer.html)
## Thursday 18th
- Displaying analysis graph results
- Adding colour map to VFX graph (for penetration velocity)
- Adding toggles for different categories of penetration
- Doing a single impact test based on the mouse position within the graph every frame
	- Toggling on and off sections of the graph based on the results
	- Adding panel to show data in text form as well
- Creating a panel to add layers
## Monday 29th
- Back to work after holiday
- Developing with new damage model ideas I had
	- Current system has issues:
		- Uses the reference equations, but in an ad-hoc way. Results are good in the cases where the equations apply, but who knows how well it generalises?
		- You can create totally arbitrary stackups of arbitrary materials, that's a lot of choice for players which is confusing.
	- New idea:
		- Unify all particles into one type with size, dispersion angle and density.
# Tuesday 30th
- Prototyping new energy dissipation based model