---
title: CPU Line Rendering
tags:
    - TechnicalDetails
    - Rendering
    - GPU
---

In [part 1](GPULines.md) we looked at how to take a buffer of positions and the render them on the GPU with all kinds of helpful features such as constant screen size, double precision and stencil support. But where do we get the positions to go in that buffer?

:::danger
todo: write article!
:::

problems to solve:
 - can we reduce vertex count when rendering long orbits
	 - http://blog.johannesmp.com/2022/06/30/KSP2-Dev-Diary_Orbit-Tessellation/
 - closed orbits
	 - just set the start and end point to the same position seems to look fine
 - stacked lines when the orbit isn't _quite_ closed
	 - Can probably detect this on CPU and cut off the orbit at the approx overlap point
	 - Maybe we don't need to solve it - make orbit markers be dragged _along_ the line and you don't need to be able to click on a specific line
 - more detail (approximated from interpolation) to smooth curves
	 - Could probably do this in the vertex shader
		 - Each orbit data point also stores normal
		 - Vertices are tagged with index of data _and_ interpolation factor
		 - Vertex shader samples 2 data points and uses normal data to do a smooth curved interpolation
	 - Probably not necessary if reduced count out of camera view works - start with max detail and reduce.

### Solution #1
1. Takes raw data from sim
2. Job inserts interpolated points where camera is looking
3. Job remove points where camera is not looking
4. Render using normal [GPULines](GPULines.md), with inteprolated data put into the buffer