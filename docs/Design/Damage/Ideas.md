General ideas for damage model mechanics. Not necessarily _good_ ideas!

## Impact Weapon Types
- Proximity Trigger (e.g. RPF flak)
	- On detonation, does damage in a cone along velocity vector.
		- AOE damage
		- Spawn lots of rays and test each
	- When the game detects that the bullet has hit the target, spawn explosive VFX back along the approach vector
		- May need a modification to bullet rendering
			- Or a modification to collision system, to do fat raycast
- Contact Explosive Trigger
	- On impact:
		- If shell shatters, apply kinetic damage
		- If intact, apply blast and fragmentation damage
- Armour Penetrating
	- On impact:
		- Compute penetration based on shell/armour characteristics and impact properties (angle, speed)
		- If it penetrates:
			- Trace line through internal colliders, applying the same logic
			- If there's a timed/delayed fuse, detonate that at the right time (depth / speed = fuse time)
		- If it fails to penetrate:
			- Ricochet or shatter
### Examples
#### RPF Flak Shell
- No direct penetration - damage is limited to the surface only
- Fat raycast ahead of the actual bullet location, radius is the proximity distance
- When collision is detected:
	- Spawn VFX back at the bullet location
	- Apply damage within a cone, probability of hit based on fragmentation density, range and angle
	- Each hit generates a small kinetic impact, minor armour damage
		- Pitting on thick armour, possible penetration on thin armour
		- Damage to antennas/sensors/other exposed equipment
#### Contact High Explosive
- When the shell hits, trigger an explosion at the surface (see explosive damage type below)
	- Explosion falls off with distance. Deformation, spalling, breaking a hole all possible.
	- Shrapnel shards fly off at explosive speed, do not slow down with distance.
#### Armour Penetrating
- When a shell hits, calculate penetration results:
	- Shatters, apply minor kinetic damage
	- Fails to penetrate, explodes on surface (see contact explosive)
	- Penetrates, reduce energy of shell and repeat on next layer down
		- After some time, trigger an internal explosion (assuming the shell has a warhead)
## Damage Types
Weapons can apply one or more of the following damage types:
- Kinetic
	- Surface cratering (weaken for future hits)
	- Penetration, repeat call on next layer
- Explosive
	- Shockwave dissipates very rapidly in vacuum
		- If pressure exceeds yield strength, deform
		- If this exceeds some spalling threshold, do damage internally
		- If it exceeds some destruction threshold punch a hole, repeat on the next layer
	- Explosive fragments do not slow down, can cause kinetic damage at range
	- Shaped explosives are a thing, feels like an entirely different damage type
- Thermal
	- Laser: https://www.projectrho.com/public_html/rocket/spacewardefense.php#byronarmor
## Penetration Equations
### DeMarre Equation
Calculates penetration depth of a shell, based on known penetration for another similar shell. Could be used to interpolate between pre-calculated penetration depths (e.g. do expensive depth calculations in ship editor). Ref: https://www.tankarchives.com/2014/10/penetration-equations.html

$$P = \frac{Ref(P) * (V / Ref(V))^{1.4283} * (D/Ref(D))^{1.0714} * (W/D)^{0.7143}}{(Ref(W) / Ref(D))^{0.7143}}$$
Where `Ref(X)` means the value of `X` for some known reference.
- P: Thickness of armour that a shell will penetrate.
- V: Velocity
- D: Diameter
- W: Weight
### Krupp Formula
Estimates penetration depth for battleship armour. If a good `K` value can be calculated (e.g. offline through testing, or just as a material parameter) this could be useful. Ref: https://www.tankarchives.com/2014/10/penetration-equations.html

$$B = \frac{V * \sqrt{P}}{K * \sqrt{D}}$$
- B: Depth of penetration (in decimeters)
- V: Velocity
- P: Mass
- K: Armour resistance constant, default to `2400`.
## Lanz Odermatt Equation
Calculates penetration depth of a long-rod penetrator, used for modern tank shells. Ref: https://www.longrods.ch/perfeq.php