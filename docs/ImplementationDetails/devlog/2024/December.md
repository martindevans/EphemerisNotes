---
tags:
  - devlog
  - OrbitalMechanics
  - Rendering
sidebar_position: 12
---
## Sunday 1st
- Cleaned up `MyriadDynamics` and moved to a more permanent location
- Installed https://github.com/starikcetin/Eflatun.SceneReference
- Added AssemblyDefinitions to project
## Monday 2nd
- Added [UniTask](https://github.com/Cysharp/UniTask) to project
- Using UniTask in solar system loader
- Rewritten loader to use scenes to load planets
	- Reference the scene, instead of the prefab
	- Async loading
	- Doesn't load all of the planet content ahead of time (which it would with prefabs)
	- It's like addressables, but less buggy
- Updated scenes to use new loading system
- Messing with realtime super-resolution ideas (to make enormous planetary textures usable)
	- Idea:
		- Train a (very) small neural network to upscale one specific image, overfit as much as possible. Train it on the high res textures.
		- Use that NN in the shaders, sampling the texture and upscaling it on the fly.
- Started setting up new NFGO menu/lobby/game scene, using Myriad this time
## Tuesday 3rd
- NFGO lobby connection approval
- Lobby sync (names, ready state, starting game etc)
## Wednesday 4th
- Started on game systems for networked pong (in Myriad)
- Improving method docs for Myriad queries
- Exposed `GetCachedQuery` in public Myriad API
- Experimenting with message/event processing for network spawning of entities
## Thursday 5th
- Spawning objects (the ball) with a "GameObject lead" system:
	- Spawn a GameObject
	- GO creates the relevant `Entity` locally
	- RPCs for this specific Entity can be sent through that GameObject
- Wrestling with sync issues (servers spawns ball in game scene, but client hasn't loaded that scene yet)
	- Can't find a good way around this that isn't messy
	- Consider a totally different approach (custom messaging)
## Friday 6th
- Setting up Mirror test project
- Setup very basic Mirror lobby
## Monday 9th
- Updating Myriad integration packages to handle some breaking changes made over the weekend (removing `BaseSystem`)
- Updated Ephemeris for the same breaking changes
- Mirror lobby using code from ECOM
- Setting up lobby with a Myriad world, to hold per-player data (e.g. ready state, name)
	- This can be synced just like normal game data
## Tuesday 10th
- Spawning player objects, putting them into ECS
- Setup local only paddle movement
## Wednesday 11th
- Synchronising object spawning using Mirror
	- Developed a pattern to spawn things with Myriad entities and GameObjects
## Thursday 12th
- Cleaning up sim setup across clients and server
- Setting up some pong gameplay systems
## Friday 13th
- Fixed SolarSystem test scene (some changes made in the docking sim development broke it)
- Developing editor visualisers for some ECS components:
	- ScenePosition
	- UnityTransform
	- WorldVelocity
- Reviewing existing code to see where `[BurstCompile]` can be added
## Monday 16th
- Updating query caching system in `Myriad.ECS`
- Designing debris clouds
	- Modelling debris from an impact as a single entity, with a position and spread that expands over time. This way debris can be fully nbody simulated without simulating thousands of objects.
	- This has problems:
		- What's it for? only for spherical expanding clouds of debris. That doesn't actually fit very much. e.g. an impact on a ship creates a _cone_ of debris not a sphere!
- Designing bullet chains
	- Modelling a lot of bullets as a "chain" of entities with full nbody simulation and bullets evenly distributed along the links in the chain. At the cost of just 2 entities in the integrator this can simulate lots of bullets.
	- Store a bitfield of which bullets are missing, to account for bullets hitting things and being removed.
	- Calculate a random "divergence" for each bullet, away from the perfect centre line to account for spread when firing.
## Tuesday 17th
- Tweaking bullet chain visualisation
- Added in velocity of chain links to individual bullets
- Investigating Unity gizmos for `Myriad.ECS` entities
- Messing with VFX graph to display bullets
	- Probably not going to use this - too hard to make the bullets in the VFX line up with the actual sim bullets
- Investigating randomness generation in shaders
	- Began developing a simple RNG that can be implemented on CPU and GPU, this can be used to generate shot positions in a shader using the seed
	- Is this actually necessary? Can probably compute it once on CPU and write the necessary data to a `ComputeBuffer`
- Learning more about compute shaders in combination with VFX graph
	- https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@17.0/manual/Operator-SampleBuffer.html
	- https://github.com/keijiro/VfxGraphGraphicsBufferTest
	- https://docs.unity3d.com/ScriptReference/ComputeShader.html
	- https://catlikecoding.com/unity/tutorials/basics/compute-shaders/
	- https://stackoverflow.com/questions/36260528/unity-detect-compute-shader-completion
	- https://www.reedbeta.com/blog/quick-and-easy-gpu-random-numbers-in-d3d11/
## Wednesday 18th
- Considering curves for bullet chains
	- Experimented with cubic bezier, this is easy to implement but not particularly accurate
- Setup a test scene to test bullets at true orbital scale
- Cleaning up some spawning code used in previous test scenes