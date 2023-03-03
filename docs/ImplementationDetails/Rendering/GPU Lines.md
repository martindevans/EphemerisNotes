Ephemeris needs to draw a lot of lines (orbital paths) with a lot of points (e.g. 2 weeks of orbital movement) with interpolation between the points (non linear) with double precision positions.

https://github.com/johannesugb/VolumetricLinesUnity
 - See `universal_render_pipeline` branch

Non GPU
 - Use `ShapesMeshGen.GenPolylineMesh`
	 - Run it a Job/Task
	 - Not double precision?

GPU
 - Store points in `ComputeBuffer`
 - Interpolate points in compute shader (when line changes)
 - Geometry shader to emit linestrip ([forum](https://forum.unity.com/threads/geometry-shader-with-meshtopology-linestrip.684643/))
	 - [Geometry shader grass](https://medium.com/chenjd-xyz/using-the-geometry-shader-in-unity-to-generate-countless-of-grass-on-gpu-4ca6d78b3de6)
	 - [General geometry shader tutorial](https://gamedevbill.com/unity-vertex-shader-and-geometry-shader-tutorial/)
 - https://web.archive.org/web/20150930205745/http://sebastien.hillaire.free.fr/index.php?option=com_content&view=article&id=54&Itemid=56
 - https://web.archive.org/web/20111202022753/http://sebastien.hillaire.free.fr/index.php?option=com_content&view=article&id=57&Itemid=74

Investigate more:
 - https://mattdesl.svbtle.com/drawing-lines-is-hard
	 - Send mesh to GPU
	 - Push to width in vertex shader (constant screen width)

LineRenderer
Do we render line with the LineRenderer!?
 - Shader can smoothly cut out pixels based on elapsed time
 - Displays blocks of data, trimmed by shader to exact positions

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