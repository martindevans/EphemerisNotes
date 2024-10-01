---
tags:
  - devlog
  - DockingSim
  - PhysicsEngine
  - TechnicalDetails
---
**Participated in the 2024 Cylon GameJam for all of September up to the 24th.**
## Tuesday 24th
- Expanding out jitter dynamics scene in Ephemeris project
- Debugging torque in jitter
- Compared torques:
	- Standard Unity physics
	- `Unity.Physics` package
	- Jitter
	- A quick prototype using Myriad components
- Jitter just seems to have the wrong inertia tensor?
## Wednesday 25th
- Properly integrating rotations in Myriad
- Experimented with Z3 for solving thruster firing
	- Z3 probably isn't feasible to use in-game, just PoC
- Cleaned up various physics related things in Ephemeris into a single `Dynamics` namespace
- Removed Jitter physics
## Thursday 26th
- Moving `ApplyImpulse` method to `Myriad.Dynamics`
- Added new `GetComponentRef` overloads to Myriad which retrieve many components all at once
- Fixed `Myriad.ECS` GitHub build action failure
- Updated Ephemeris to use new `Myriad.Dynamics` components, instead of ad-hoc mass and orientation components that existed before
- Fixed up docking sim to compile and load properly with new stuff
- Experimented with a basic "aspect" systems for physics
- Replaced default camera blend with "cut" (nothing else really makes sense at this scale)
- Tested Z3 in Unity. It required a native DLL but it does work!
## Friday 27th
- Experimented more with [Zen](https://github.com/microsoft/Zen) in Unity.
	- Issues with creating `Real`: casting `-4` acts different to `new Real(-4)`
	- Timeout failed to prevent a hang when using `Minimize`!
- Spawning player pod and station near each other in docking sim
- Debugging issues with orbital paths
- Modified `NBody` integrator to work for entities with no mass (just assume `mass=1`)
- Setup a test harness for calculating thruster activations
- Fixed various physics issues with torque
- Found article about thruster torques with iterative solving (2D): https://blog.cosmoteer.net/2011/01/starship-builder-idea-thruster-algorithm.html
- Experimented with determining thruster throttle values using matrix inversion (for sets of three thrusters acting as a "virtual thruster gimbal")
## Monday 30th
- Experimenting more with matrix inversion for torques (i.e. including thruster offset as well as direction).
- Built solvers for linear force and angular torque, they seem to work well independently
- Fixed up initial scenario so it always spawns a sensible distance away by inspecting orbital velocity and delaying by a suitable amount of time