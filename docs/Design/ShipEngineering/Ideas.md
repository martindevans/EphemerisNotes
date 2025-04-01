General ideas for ship design mechanics. Not necessarily _good_ ideas!
## Resources
Management of various resources which are either used up (fuel is burned) or just used at the moment (e.g. 90% of the crew is currently dedicated to doing X).
- Heat
	- Radiators
	- Heat sinks
- Electricity
	- Generation
	- Storage
	- Multiple power circuits
		- Different voltages
		- Breakers trip out circuits
		- Battle short
- Fuel
	- Propellant
	- Reactor fuel
- Crew
	- Number of crew
	- Crew "time" spent doing tasks
	- Mental state
		- Entertainment
		- Stress/morale
- Ammo
	- Total number of bullets
	- Bullets loaded into guns in magazines, slow reloading required once magazine is empty
	- Partial reloads (forced reloading before magazine is expended)
		- Bullets in partial magazines are wasted
		- Bullets in partial magazines require crew time to extract and reload into another magazine
- Life Support
	- Heat
	- Consumables
		- Food
		- Oxygen
## Armouring/Damage Model
Resolving how a weapon hitting the ship is converted into damage.
- Spaced armour
- Angled armour
	- Bounce angles
	- Overmatch
- Overpenetration
	- i.e. hits that pass right through armour and the entire ship without exploding
	- Only applies to impact fused ammunition?
- Lasers
	- Reflection
	- Heating/melting/ablating
		- Phase change physics
- Internal damage
	- Choosing what's damage
		- Based on location of hit
		- Random selection
	- What is damage
		- Reduce system functionality
		- Remove from HP pool for system
	- Don't damage modules - just subtract from a HP pool for the whole ship
## Budget
- Mass budget
	- High mass is a natural cost, so probably don't need to impose extra costs
- Money
	- Could impose a cost limit for scenarios
	- Requires components/modules to have a monetary cost