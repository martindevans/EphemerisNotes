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