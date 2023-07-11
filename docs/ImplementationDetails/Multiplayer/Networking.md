---
title: Networking Notes
tags:
    - TechnicalDetails
    - Multiplayer
---

- All objects are on "rails" which can be sampled at points in time.
	- Planets are on [[Kepler]] rails. They can be sampled at any point in time just by solving Keplers equation.
	- Ships/Missiles are N-Body-ish - they are pulled by everything that's on a Kepler rail but not by each other.
		- These rails must be [integrated](../Physics/Integration.md) step by step.
- Types of objects:
	- Planets/Moons (Kepler)
	- Missiles (N-Body)
	- Ships (N-Body)

### Planets/Moons
Orbital elements are part of the scenario, initialised at the start of the game and sampled independently by every client every frame.

### Ships/Missiles
Each client calculates 2 rails:
 - True rail. This is where the ship will actually be, taking into account all engine burns
	 - Only ever needs to be recalculated if an unexpected force happens (e.g. an impact)
	 - Sometimes must be cut back to a certain time, if an engine burn is added or removed from the schedule.
 - Estimated rail. This is where the ship will be, simply based on extrapolating out from current position and velocity.
	 - Needs to be recalculated if the position diverges too much.
	 - Can just "copy the homework" of the true rail up until the first engine burn.

Both rails are sent over the network. Other clients _display_ the estimated rail, but sample from the true rail.

