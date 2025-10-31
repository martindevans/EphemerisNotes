---
tags:
  - devlog
  - "#DamageModel"
sidebar_position: 10
---
## Wednesday 1st
- September was cut short by holiday, continuing work on armour model
- Finished penetration path for energy dissipation based armour model
- Designing spallation path
## Thursday 2nd
- Tweaking physics model to better match modified cour-palais reference
- Rewriting test program to be much faster
## Friday 3rd
- Testing other materials
	- Investigating anomalous non-penetration some velocities
	- Switching to calculating some things in areal energy, instead of energy. Fixes anomaly.
- Publishing September dev notes
- Researching switching new model to Wilkinson dispersion angle formula
	- Based on angle not energy, doesn't really fit model
## Saturday 4th
- PC explodes
## Sunday 12th
- Finally have a working PC again
## Monday 13th
- Updating armour system to store list of penetration and spallation events
	- This can be used to update armour "health" over time
- Tracking energy dumped into armour by impacts
	- This can be used to heat the armour until eventual thermal failure
- Updating packages in main project
	- Unity version has that security alert, but I'll wait until 6.3 LTS before upgrading the engine
- Fixing breakage in main project due to changes in `HotStuff` armour model library
- Calculating "score" in armour analysis
	- Calculate based on total percentage of energy which is absorbed
## Tuesday 14th
- COVID :(
- Added temperature tracking to armour layers
## Thursday 16th
- Researching thermal damage
	- Laser
		- Continuous
			- Based on Thermal conductivity, capacity, radiation etc
			- Raising temperature enough to melt surface
		- Pulsed
			- Pulses are very short (nanosecond), too short for thermal conductivity to really matter.
			- Basically a very small explosion on the surface.
	- Nuclear flash
		- Single pulse of heat over a wide area
		- Energy deposited based on distance, surface angle relative to explosion & surface absorptivity
## Monday 27th
- Doing some more research on thermal damage
- Added a "perforation" property to plates, attacks have a chance to skip a plate entirely based on perforation factor
- Writing functions to update the state of a plate based on the event generated in the damage model
	- Remove mass, increase perforation factor
	- Add energy, increase temperature, melt away mass to keep energy less than melting temperature
## Tuesday 28th
- Reducing spallation on "squishy" materials, they deform and absorb energy from the stress wave which reduces energy available for spall generation
- Fixed IMPACT armour tester due to changes in armour system
- Removed test fire panel (analysis panel shows way more detail in a more readable way)
- Added a button to show "add layer" panel
- Adding layer
- Compiling project
	- weird linker error: `Unity CIL LinkerMono.Linker.LinkerFatalErrorException: ILLink: error IL1005`
	- Caused by StandaloneFileBrowser
	- Consider replacing with https://assetstore.unity.com/packages/tools/utilities/file-browser-pro-98713#description
	- Removed for now and disabled load/save functionality
## Wednesday 29th
- Showing mass in analysis/score panel
- Fixing unit suffixes
- Testing some armour stackups
	- Spacing is OP, reduce factor for damage into fragmentation to reduce effectiveness
- Creating scriptable asset for plate materials
- Importing file browser asset
	- Adding assembly definitions
	- Restored load/save functionality
## Thursday 30th
- Adding info box showing material name and mass of plates on hover
	- Don't have material name info currently - need to switch to using the ScriptableAsset
- Modifying layers to use ScriptableAsset
	- Todo:
		- [x] Load (need to find asset references)
		- [x] Save (need to save asset references in a way that can be loaded)
- Testing stuffed armouring with graphite aerogel
	- Fixing damage sim to apply dispersion as shots travel through layers
- Adding GUID to material assets so they can be referenced in load/save
- Playtesting
	- Added attack direction arrow (right to left)
	- Fixed null ref exception when cancelling loading armour stack
	- [ ] Canvas scaling is weird at different screen sizes
## Friday 31st
- Upgrading Sonity package
- Adding SFX
	- Background hum
	- Computer noises during analysis
	- Mouse click
- Creating repo for IMPACT binaries
	- https://github.com/martindevans/IMPACT
- Experimented with a different layout system to fix weird scaling
	- Reverted, didn't work well at most sizes