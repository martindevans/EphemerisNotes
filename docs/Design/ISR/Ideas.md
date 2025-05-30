General ideas for Intelligence Surveillance & Reconnaissance mechanics. Not necessarily _good_ ideas!

## Definitions
- **ISTAR** stands for [intelligence](https://en.wikipedia.org/wiki/Military_intelligence "Military intelligence"), [surveillance](https://en.wikipedia.org/wiki/Surveillance "Surveillance"), [target acquisition](https://en.wikipedia.org/wiki/Target_acquisition "Target acquisition"), and [reconnaissance](https://en.wikipedia.org/wiki/Reconnaissance)
- [Kill Chain](https://en.wikipedia.org/wiki/Kill_chain_(military)) is the phases of an attack:
	1. Identify a target
	2. Dispatch forces to the target
	3. Attack the target
	4. Destroy the target
	5. (Assess damage)
- 

## Intelligence
- SIGINT
	- Detect enemy transmissions (COMINT)
		- Signals from ships to drones/missiles/other ships
		- RADAR emissions (ELINT)
	- EMCOM mode for ships
		- Cannot command missiles or drones
		- Cannot send datalink to other ships
- Spoofing
	- Emit false signals to mislead enemy SIGINT
		- Decoy drone with a ship power radar signature
		- Flares (possibly delayed action)
		- Jamming
			- RADAR jamming
				- Somewhat directional. Narrower direction means longer range.
			- Optical jamming (lasers)
				- Completely directional, you need a perfect lock
- Track identification
	- Tracks may initially be unidentified, with a list of possible identities that's narrowed down over time
	- Track confidence score
		- Confidence score goes down over time while not directly observed. Down very fast if it is occluded.
- AI behaviour profiles
	- Mission briefing gives hints on enemy tactics. e.g. "this captain likes to do retrograde intercepts with guns"
- Pre-battle prep
	- Before the battle starts, players can pick intel. e.g. from a set of 10 "cards", pick 3 intel revelations. Representing intelligence gathering efforts happening in the time leading up to the battle
	- Instead of picking, it could be a randomised part of the mission briefing, giving slightly different versions of the same mission each time you play it
## Surveillance
- Ground stations
	- Very powerful ground based radar, essentially omniscient within their LOS but cannot see over (or near) the horizon
- IRST (Infra Red Search & Track)
	- Detect heat signatures, this gives direction but not range. Tracking position over time starts to give range estimate
- Optical tracking
	- Direct detection
	- Occultation, requires searching an area of sky for a while
- Surveillance zones
	- Like occultation, define a specific area (direct from ship/volume of space) to search
		- Choose between refresh rate and size - wider field is surveyed slower
- Low observability
	- Low thrust burns (e.g. cold gas) are harder for IRST to detect and track
## Reconnaissace
- Single use surveillance drones
	- Send it on a flyby to detect enemies out of LOS
- Narrow high intensity RADAR
	- Like surveillance zones - pick a specific direction to illuminate with high intensity RADAR
- Constellation of microsats with passive sensors
	- Limited lifetime, short range, but wide field if deployed properly by the player
- Large recon satellites
	- Probably deployed before the game starts, vulnerable to being shot down
- Spectrograph
	- Long range spectrographic analysis of enemies to assess battle damage
- Deniable operations
	- "Neutral" unarmed ships with passive sensors, or deploying observation satellites.
	- Must stay within orbital lanes expected of neutral shipping
	- Probably a war crime