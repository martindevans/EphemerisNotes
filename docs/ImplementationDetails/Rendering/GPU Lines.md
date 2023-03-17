---
tags:
    - TechnicalDetails
    - Rendering
    - GPU
    - Shaders
---

Ephemeris needs to draw a lot of lines to show orbital paths. In fact most of the important information in the game is communicated entirely with lines and UI elements!

Orbital paths have several requirements:
	- They have a **lot** of points (e.g. 2+ weeks of orbital movement)
	- Position data between points should be interpolated non-linearly (specially when zooming in)
	- Scale of positions is literally astronomical (double precision may be required).
		- The line may even go beyond the camera far plane and should still be visible!
	- Extra information should be able to be shown (e.g. engine burn start/end times).
	- UI elements (e.g. markers of special events) should be able to "interact" visually with lines.
	- Line should be constant screen size so that it is visible at vast distances.

## The Goal

Here is an example image, showing everything required.
 - Note the border around the marker sphere where the line disappears.
 - Red sections indicate engine burns, these should be pixel perfect.
 - Everything in this image could be beyond the camera far plane!

![](Images/Unity_2023-03-17_16-56-31.png)

## Research
While working on line rendering I came across several other approaches for rendering lines. Here's an unordered list:
 - [Unity LineRenderer](https://docs.unity3d.com/Manual/class-LineRenderer.html)
	 - Does not handle huge scale
	 - Cannot render with constant screen width
 - [Volumetric Lines - Unity Asset](https://github.com/johannesugb/VolumetricLinesUnity)
	 - Make sure to use the `universal_render_pipeline` branch!
	 - Uses shader tricks to render the line, maybe be useful down later with other line rendering techniques
		 -  https://web.archive.org/web/20150930205745/http://sebastien.hillaire.free.fr/index.php?option=com_content&view=article&id=54&Itemid=56
		 - https://web.archive.org/web/20111202022753/http://sebastien.hillaire.free.fr/index.php?option=com_content&view=article&id=57&Itemid=74
 - [Shapes Asset](https://assetstore.unity.com/packages/tools/particles-effects/shapes-173167)
	 - Great asset, highly recommended!
	 - Does not handle huge scale.
	 - Recomputing line mesh when position changes seems to be expensive (not jobified).
	 - `ShapesMeshGen.GenPolylineMesh` helper generates mesh, potentially this could be used directly to generate the mesh from inside a parallel `Task`.

## Approach 1: Pure GPU
My first approach to solving this problem was intended as a "pure GPU" solution:
1. Dump the orbital position data straight from the sim into a `ComputeBuffer`
2. Run a compute shader to create vertices along the line - adding extra vertices to interpolate the data.
3. Draw line-strip vertices
4. In geometry shader, emit new vertices to make the line wider (constant screen size).

This approach has a few problems. First of all, I'm not very familiar with compute shaders, and while I am learning more about using them for Ephemeris this would be tricky to implement (for me). Secondly, and maybe more importantly, geometry shaders are slow:
 - https://gamedev.stackexchange.com/questions/187584/has-the-geometry-shader-been-abandonded
 - http://www.joshbarczak.com/blog/?p=667

Maybe they're not slow enough to be a problem, but I don't want to put in all the effort to implement this approach only to discover it's not fast enough to actually use!

While researching this technique, I researched some geometry shader related things:
 - [Geometry shader grass](https://medium.com/chenjd-xyz/using-the-geometry-shader-in-unity-to-generate-countless-of-grass-on-gpu-4ca6d78b3de6)
 - [General geometry shader tutorial](https://gamedevbill.com/unity-vertex-shader-and-geometry-shader-tutorial/)
 - [LineStrip+GeometryShader](https://forum.unity.com/threads/geometry-shader-with-meshtopology-linestrip.684643/)

## Approach 2: No Compute
The problems with the previous approach were compute shaders (i'm not very familiar with them) and geometry shaders (should be avoided because they're slow). My second approach tries to solve both of these problems.

The first step happens in the editor - procedurally generating lines with fixed numbers of vertices and storing these as assets. The lines are tubes, with 4 vertices around each point, this will be used later to give the line constant on screen size.

My approach to procedurally generating the lines is to use a [`ScriptedImporter`](https://docs.unity3d.com/Manual/ScriptedImporters.html). Procedural generation parameters are stored in a file with a unique file extension (`.procline`) and then a scripted importer can pickup that file and run the generation in-editor. See more details [here](../ProceduralGeneration/EditorProceduralGeneration.md).

todo:write up the rest





Investigate more:
 - https://mattdesl.svbtle.com/drawing-lines-is-hard
	 - Send mesh to GPU
	 - Push to width in vertex shader (constant screen width)


## Final?
1. Generate line mesh
	- Scripted Importer to generate mesh (`MeshData` API)
2. Pass position/timestamp in computer buffer
	- Position/timestamp in float64 (straight from sim)
3. In vertex shader
	- Read position
	- Convert to smaller scale (and then convert into single precision)
	- Clamp to near/far plane
		- https://www.vertexfragment.com/ramblings/unity-prevent-object-culling/
	- Generate tangent frames from change in position
	- Apply offset from mesh vertex to position
6. In pixel shader
	- clip out pixels with timestep < now
	- clip out vertices which have no timestamp data at all (past end of time)