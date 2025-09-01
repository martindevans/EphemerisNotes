---
tags:
  - devlog
  - multiplayer
sidebar_position: 8
---
## Monday 4th
- Reading over multiplayer related code, applying minor cleanup and comments
- Split up some bullet systems into more atomic systems, this will be easier to rearrange for multiplayer things later
- Setting seed once when bullet points are created and storing it instead of deterministically generating it every frame, this means it can be transmitted
- Experimenting with bullet impact VFX
## Tuesday 5th
- Researching bullet damage/armouring models
	- WoWs armour penetration mechanics: https://wiki.wargaming.net/en/Ship:Armor_Penetration
		- Damage saturation: lots of damage to one area reduces damage taken (no point shooting something that's already damaged/destroyed)
		- HE shells hitting armour they can't penetrate shatter, no damage
		- AP shells arm on impact and explode shortly after, doing internal damage. Failing to penetrate, or over penetrating massively reduces damage.
		- Ricochet chance based on armour angle
			- Overmatch means that very large shells hitting very thin armour can't ricochet
		- Shell normalization: if there are multiple layers of armour the shell path gets bent slightly towards perpendicular every time it penetrates. This makes subsequent layers easier to penetrate.
	- Atomic rockets, armour formulas: https://www.projectrho.com/public_html/rocket/spacewardefense.php#byronarmor
- Added `BulletDamage` and `BulletDamageContainer`, passing these through from gun entity to bullet entities. Collision system can use these for applying damage.
- Sketching out gun sync script
- Improved rotational transform sync script (mostly just as a reminder how this stuff works!)
## Wednesday 6th
- More experiments with bullet VFX
- Developing generic system for per-ship network comms
	- A ship is a collection of entities
		- One root "ship" entity has the comms objects attached
		- Child entities use those comms objects to send a receive ship specific messages
- Attached gun to network spaceship entity
	- Debugging issue with transform hierarchy for network components (bullets were spawning at the origin)
- Added "delayed resolve" to `Myriad.ECS`, to help with building hierarchies of entities
- Using delayed resolve to assign ownership of guns hierarchy to the root ship entity
## Thursday 7th
- Multiplayer backpressure is triggering when bullets are spawned due to the very short rails, investigating.
	- Added extra check if sampler is trying to sample past the end of a rail. In this case immediately apply backpressure.
	- Added a grace period, short (but non-error) rails are acceptable so long as they were created within the last 2 seconds. This gives the integrator some time to generate data.
	- Prevented backpressure from sometimes **speeding up** time speed! Jumping from paused to 1x.
- Add a system for limiting the maximum time speed, can potentially use this to ban very high time speeds during active combat
	- Disabling time request buttons which are over the max
	- Checking and clamping to max allowed speed on server time sync system
	- Replicating max speed from server to clients
- Syncing gun trigger
	- Components to mark entity for sending
	- System to drive that
	- System to toggle trigger on and off for testing
	- It works!
## Friday 8th
- Redesigning bullet collision system, it's taking too much time at high time speeds
	- Add colliders instead of bullets to octree?
	- Use Sweep and Prune instead?
	- Experimenting with a sweep and prune system
- Creating primitive DI system for systems to share resources
## Monday 11th
- Prototyping a new type of `Myriad.ECS` query that bulk copies data into arrays. Ideally this would never be used, but it's going to be needed to copy data into a form that can be used in a Unity job.
- Implementing jobbified Sweep & Prune
	- Unit testing
	- Fixing various bugs
## Tuesday 12th
- Sweep & Prune
	- More tests
	- Improving how capacity grows (exponential when small, linear when large)
	- Started on bipartite sweep - comparing one sorted list of bounds to another to find overlaps from one to the other
		- Unit tests
		- Fuzzing fails, need to add more specific tests to narrow it down
## Wednesday 13th
- Refactoring bipartite sweep and prune to reduce complexity
- Begun setting up system to fill sweep & prune with bullet data
	- [x] Caching velocity from next bullet point (improves cache locality)
	- [ ] Add a system to calculate swept bounds and store them in a component
		- [ ] Create a component for that
## Thursday 14th
- Creating system to calculate bounds for bullets and store it in component
- Creating a new system group for general collision systems
	- Added a system to index broadphase spheres
- Tested bullets vs broadphase spheres with S&P, seems to work
	- [ ] Strip out of collisions and test more
## Friday 15th
- Removed octree based collisions, replaced with SAP
	- It works!
## Monday 18th
- Developing bullet impact VFX
	- Sparks fly off in bullet direction reflected around surface normal
		- Lifetime is random float, multiplied by random int. Splits particle lifetimes up into "bands" which looks better than all fading off together.
	- Sparks in hemisphere around surface normal
		- Same trick with lifetime bands
		- Multiply brightness by sine curve (random frequency per particle) to make them twinkle (as if spinning and catching the light)
	- Puff of smoke particles
	- "Shatter" parameter switch number of ricochet particles (1 when not shattering, random N when shattering)
	- "Ricochet" parameter disables ricochet particles entirely
- Testing multiplayer bullets
	- When firing stops bullet chain jumps to the side
	- Same happens in single player test scene, much easier to reproduce!
		- Offsetting the final point an appropriate amount of time into the past and finding the correct position there
- Improving debugging tools for ECS
	- Hiding empty archetypes
	- Filtering archetypes by component type
## Tuesday 19th
- Cleanup on Sweep & Prune job management
	- Forcing job scheduling to happen right away, we're going to wait on these jobs so we don't want any extra scheduling delay
- Considered swapping octree for S&P in rendering
	- Could be made to work, but the rendering query would have to be split out to give the job time to run. Could schedule in `Update` and wait in `LateUpdate`?
- Experimenting with attaching bullet impact VFX to ships
	- They can just be attached directly to the small body and simulated in world space
	- VFX must be cleared when the floating origin changes!
- Considering design for narrow phase collision system
	- Unity colliders or custom colliders?
		- `Unity.Physics` colliders look like they can be used standalone (i.e. without `Unity.ECS`)
		- Built a test scene for this, slightly awkward but they can be used standalone
	- Hierarchy in GameObjects or entities?
		- Wherever it is built from ultimately we want to store a `List<(Entity, Collider)>` in the root entity. That way Broadphase against root, then check all children.
- Fixed a whole load of Burst compiler related warnings and errors that suddenly appeared, probably due to a change in the Burst version when installing `Unity.Physics`
	- Genuine problems that didn't have warnings before, so this is a good thing!
## Wednesday 20th
- Cleaning up some more Burst related warnings
- Experimenting with decals on objects (bullet damage)
- Investigating `Unity.Physics.CompoundCollider`, this can be used as a wrapper around all other collider types (effectively dynamic dispatch)
## Thursday 21st
- Testing a system scheduling jobs using `BlobAssetReference<Collider>` in the job. This seems to be fine.
- Simplifying Sweep & Prune return results to make it easier to schedule dependent jobs
- Storing more metadata in S&P results, copying out relevant data for scheduling chained jobs
## Friday 22nd
- Refactored ray generator to a separate struct that copies all relevant data, this means it can be passed into a job
- Creating job to do narrow phase collision detection between each individual bullet ray and the `CompoundCollider`. This is a parallel for each job over all broadphase collision pairs.
## Monday 25th
- Testing out new collider pipeline (Jobs & Unity physics for narrow phase)
	- Some collisions are being missed
	- It seems as if the entire chain link is not detecting a collision in the broadphase
	- Growing boxes by bullet divergence
	- Cleaning up some chain link behaviours during culling
	- Added a fixed margin (5m) to all boxes, to ensure they're never too small (e.g. if both points are perfectly aligned on an axis)
	- Inflated broadphase colliders (5m)
	- Creating visualisers for bullet line boxes and collider bodies
	- Noticed indexing error in the fill query, not accounting for chunk offset!
	- Fixed!!!
- Better ECS debugging
	- Displaying names and IDs in inspector
	- Caps invariant filtering
## Tuesday 26th
- Attaching VFX to hit GameObject
- Fixing VFX to only do a single burst
- Debugging why hit points are not on the surface of the object
	- Creating bullet visualiser gizmo
	- Scaling issue
- Adding some more fields to the hit struct
	- Normal
	- Hit Dir
- Building a pool to store VFX instances
	- Installed `https://github.com/ayellowpaper/SerializedDictionary`. Didn't work.
## Wednesday 27th
- Building pooling system for VFX gameobjects
## Thursday 28th
- Finishing VFX pooling system
- Using VFX pooling in bullet system (still a temporary setup until proper damage model is in place)
- Setting up framework for damage model
	- `DamageModel` component attached to entities, which contains an `IDamageModel` interface
## Friday 29th
- Considering more damage model things (see [Ideas](Design/Damage/Ideas.md))
	- Proximity Trigger (e.g. RPF flak) - bullet collision needs to be "fat", VFX and damage needs to be spawned back from the actual collision point
	- Contact Explosive - spawn an explosion at the point of contact, but only if the shell does not shatter (or otherwise destroyed)
	- Armour penetrating - damage model needs to re-run collision tracing all colliders along path, until either energy is low (shell stops) or timed fuse (explode and do internal damage)