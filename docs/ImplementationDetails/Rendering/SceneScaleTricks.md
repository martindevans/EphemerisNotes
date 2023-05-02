---
title: Scene Scale Tricks
tags:
    - TechnicalDetails
    - Rendering
---

The Ephemeris simulation is completely double precision and uses SI units, 1unit = 1meter. However, this simulation must be displayed in the Unity scene. This is a problem - the Unity scene uses single precision coordinates for position, there is a fundamental part of the engine and there is no way to change this. As mentioned in [Precision & Scale](../PrecisionScale/PrecisionScale.md) Unity recommends a maximum scene size of 50km (i.e. 50,000 units) at most. To fix this Ephemeris uses three tricks: **scale**, **floating origin** and **offsetting**.

## Scale
The Earth is larger than 50km. To bring the planets back into a reasonable scale and distance from each other Ephemeris uses a scale of **1 unit == 1000km**. This scale makes individual planets reasonably small (Jupiter is only 139.8 units), but not _too_ small (Luna is 3.5 units). Planetary systems are within a reasonable range (e.g. Io is just 421.7 units from Jupiter).

However, this does not solve the entire problem! The simulation is centered on the sun, so if that data was loaded into the scene (scaled appropriately) Jupiter would be placed at 741,070 units (5AU)! If the scenario has combat happening around Jupiter the precision would be terrible!

## Floating Origin
To fix this problem Ephemeris also uses a floating origin. A specific body is chosen as the "origin" point and is locked into the scene at `(0,0,0)`, all other bodies have the position of this body subtracted off them before they are put into the scene (all in double precision). Now if a scenario has combat around Jupiter then Jupiter can be chosen as the origin point in the scene, all moon and spaceships will be rendered in the scene relative to Jupiter.

Doing this is quite simple:

```csharp
double3 pos;
if (entity == origin) {
    pos = double3.zero;
} else {
    pos -= GetPositionFromSim(entity) - GetPositionFromSim(origin)
}

transform.position = (float3)(pos / 1000000.0);
```

## Offsetting
We've now got planets rendered at reasonable scales and combat happening in the outer reaches of the solar system with stable rendering. There's one last thing to fix: if Jupiter is the origin then the sun is 741,070 units away, but it still needs to be visible! The limit here is the "far plane" of the camera - things beyond the far plane at not rendered at all.

To fix this position of the sun is offset to be just inside the far plane, to make it visible. The sun is then scaled down to make it appear the correct size.

First we need to calculate the vector from the sun to the camera and move the sun:

```csharp
// Get the vector from the sun to the camera
var v = camera.Position - position;
var worldDistance = math.length(v);

// Normalize `v`
v /= worldDistance;

// Do nothing if it's close enough
if (worldDistance < camera.FarClip) {
	return;
}

// Calculate how much the position needs to be offset to being it back to the far clip plane
offset = v * (worldDistance - camera.FarClip);

// Move the sun by that offset
new_position = position + offset;
```

Now the sun will be far too big! To scale it down:

```csharp
// Calculate the new distance from the camera to the sun
var actualDistance = math.distance(new_position, camera.Position);

// Scale down by the ratio between the actual distance and the "correct" distance
scale = (float)(actualDistance / worldDistance);
```