## Trackable Entities
- Actual entities are (e.g. a missile) are entities with `SensorTrackable` component.
- Other components include sensor specific data (e.g. `Sensors.Radar.RadarCrossSection`)
## Sensor Platform
- A sensor platform (e.g. a ship) is a parent for multiple sensors.
- Has a `TrackCollection` which holds a reference to all tracks this platform has
- Has a `SensorChildrenRef` which contains a set of all sensor entities attached to this platform
## Sensor
- A child of a platform, updates tracks
## Sensor Track
- Owned by a `TrackCollection`
- Represents the relationship between a `SensorTrackable` (i.e. a real thing) and a platform (i.e. what that platform knows about it)
- Components:
	- `TrackingEntities` references both entities
	- `LastUpdate` the time any sensor last updated this track
	- `RangeFromTrackingToTracked`
	- `WorldPositionCacheRefs` references the `WorldPosition` of both entities
	- `WorldPositionCache` stores a copy of the `WorldPosition` of both entities
	- `HasLineOfSight` stores a flag indicating if a kepler body is blocking LoS
	- `PositionDeviation`/`RangeDeviation`/`AngleDeviation`
		- In reality we know the actual position of this tracked object, these store how much deviation from the ground truth should be added when accessing the data. Sensors generally improve one or more of these values.

