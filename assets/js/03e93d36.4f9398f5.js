"use strict";(self.webpackChunkephemeris_notes=self.webpackChunkephemeris_notes||[]).push([[9322],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>u});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=i.createContext({}),d=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},h=function(e){var t=d(e.components);return i.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),p=d(n),u=a,m=p["".concat(o,".").concat(u)]||p[u]||c[u]||r;return n?i.createElement(m,s(s({ref:t},h),{},{components:n})):i.createElement(m,s({ref:t},h))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=p;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var d=2;d<r;d++)s[d]=n[d];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},7751:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=n(7462),a=(n(7294),n(3905));const r={title:"Line Grid Renfering",tags:["TechnicalDetails","Rendering","GPU","Shaders"]},s=void 0,l={unversionedId:"ImplementationDetails/Rendering/LineGridRendering",id:"ImplementationDetails/Rendering/LineGridRendering",title:"Line Grid Renfering",description:'Ephemeris has an "infinite" grid which acts as a reference to help understand the position of things within 3D space. This reference plane should have lines as thin as possible (1 pixel) without suffering from aliasing at any angle or distance.',source:"@site/docs/ImplementationDetails/Rendering/LineGridRendering.md",sourceDirName:"ImplementationDetails/Rendering",slug:"/ImplementationDetails/Rendering/LineGridRendering",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/LineGridRendering",draft:!1,editUrl:"https://github.com/martindevans/EphemerisNotes/tree/master/docs/ImplementationDetails/Rendering/LineGridRendering.md",tags:[{label:"TechnicalDetails",permalink:"/EphemerisNotes/tags/technical-details"},{label:"Rendering",permalink:"/EphemerisNotes/tags/rendering"},{label:"GPU",permalink:"/EphemerisNotes/tags/gpu"},{label:"Shaders",permalink:"/EphemerisNotes/tags/shaders"}],version:"current",frontMatter:{title:"Line Grid Renfering",tags:["TechnicalDetails","Rendering","GPU","Shaders"]},sidebar:"tutorialSidebar",previous:{title:"GPU Line Rendering",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/GPULines"},next:{title:"Scene Scale Tricks",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/SceneScaleTricks"}},o={},d=[{value:"What Is Aliasing?",id:"what-is-aliasing",level:2},{value:"Geometry",id:"geometry",level:2},{value:"Signed Distance Fields",id:"signed-distance-fields",level:2},{value:"Grid Sampling",id:"grid-sampling",level:2}],h={toc:d};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,i.Z)({},h,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,'Ephemeris has an "infinite" grid which acts as a reference to help understand the position of things within 3D space. This reference plane should have lines as thin as possible (1 pixel) without suffering from aliasing at any angle or distance.'),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(9640).Z,width:"1440",height:"810"})),(0,a.kt)("h2",{id:"what-is-aliasing"},"What Is Aliasing?"),(0,a.kt)("p",null,"In signal processing ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Aliasing"},"aliasing")," occurs when the signal has a higher frequency than the sample rate of a sensor measuring that signal. In graphics this manifests in two ways: temporal aliasing (the image changes faster than 60 fps) and spatial aliasing (there are details in the image smaller than 1 pixel)."),(0,a.kt)("p",null,"For the line rendering on the grid the lines should be as thin as possible. This presents a problem when choosing the width of the lines, whatever width they are they will be too wide close to the camera and too thin far from the camera! The solution to this is to draw the lines ",(0,a.kt)("em",{parentName:"p"},"exactly")," 1 pixel thick no matter the distance from the camera. To give the illusion that the lines disappear into the distance they should fade out to become more transparent in the distance."),(0,a.kt)("h2",{id:"geometry"},"Geometry"),(0,a.kt)("p",null,"The basic setup for rendering this grid is that it is a huge quad, stretched out far beyond the camera far-plane. The entire grid plane is just 4 vertices and 2 triangles! A custom shader shades pixels where required to draw the gridlines."),(0,a.kt)("h2",{id:"signed-distance-fields"},"Signed Distance Fields"),(0,a.kt)("p",null,"A classic approach to rendering things using just pixels shaders is to describe the shape of the thing using a ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Signed_distance_function"},"signed distance field"),". Many of the amazing scenes on ",(0,a.kt)("a",{parentName:"p",href:"https://www.shadertoy.com/"},"shadertoy")," use this technique to great effect. Unity itself uses SDF techniques to render smooth text (a.k.a. ",(0,a.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/FontAssetsSDF.html"},"TextMeshPro"),")."),(0,a.kt)("p",null,"A signed distance field is simply a function that tells you the distance to the surface from any point in space. Points which are outside the shape return positive distances, points which are inside the shape return negative distance. You can find a much more in depth explanation of 2D SDF ",(0,a.kt)("a",{parentName:"p",href:"https://www.ronja-tutorials.com/post/034-2d-sdf-basics/"},"here"),"."),(0,a.kt)("p",null,"Defining a signed distance field for a 2D 1x1 grid looks like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c#"},"float sdGrid(float2 position)\n{\n    float2 gridDist = abs(frac(position) - 0.5);\n    return min(gridDist.x, gridDist.y);\n}\n")),(0,a.kt)("p",null,"A pixel shader to sample this could look like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-C#"},"float g = sdGrid(i.uv);\nif (g < WIDTH)\n{\n    return float4(1, 0, 0, 1);\n}\nelse\n{\n    return float4(0, 0, 0, 0);\n}\n")),(0,a.kt)("p",null,"However, as discussed above this looks terrible due to aliasing. There is no single ",(0,a.kt)("inlineCode",{parentName:"p"},"WIDTH")," value that looks good at all distances."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(8823).Z,width:"1201",height:"610"})),(0,a.kt)("p",null,"The width could be dynamically selected, such that it is always 1 pixel wide. The best way to do this is to measure the change in the position from one pixel to the next and to constrain the width to that value."),(0,a.kt)("p",null,"The HLSL ",(0,a.kt)("inlineCode",{parentName:"p"},"ddx")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"ddy"),' values are somewhat "magical". Calling ',(0,a.kt)("inlineCode",{parentName:"p"},"ddx(value)")," Tells you the change in that value from this pixel to the next pixel over (in the x and y axes respectively)."),(0,a.kt)("p",null,"Armed with this knowledge a function to select the line width might select a width which is the maximum in either axis:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"float width = max(ddx(i.uv.x) + ddy(i.uv.y));\n")),(0,a.kt)("p",null,"However, this ends up with lines that are too wide in the distance. Scaling the width down by any factor results in aliasing at certain distances."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(4128).Z,width:"1181",height:"626"})),(0,a.kt)("p",null,"There are various other tricks for antialiasing 2D signed distance fields, for example you can find more ",(0,a.kt)("a",{parentName:"p",href:"https://drewcassidy.me/2020/06/26/sdf-antialiasing/"},"documented here"),". However I found that none of these techniques worked well for single pixel lines."),(0,a.kt)("h2",{id:"grid-sampling"},"Grid Sampling"),(0,a.kt)("p",null,"Since Signed Distance Fields did not seem to be the solution, I came up with a new technique. Given some function to determine a unique ID for a grid cell each pixel can simple calculate all the IDs nearby and if they are not all equal shade itself. The ",(0,a.kt)("inlineCode",{parentName:"p"},"ddx"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"ddy")," function can be used to determine how far away to sample (always sampling exactly 1 pixel over)."),(0,a.kt)("p",null,"The function to generate a unique ID for each grid cell can cheat slightly. We don't actually need a unique ID for every grid cell because we're only comparing adjacent cells, so only adjacent cells need to be different. Here's the function for that:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"float2 gridIndex(float2 position)\n{\n    return round(frac(position));\n}\n")),(0,a.kt)("p",null,"The function for sampling this looks quite intimidating at first, but really isn't too bad:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},'float max2(float2 v)\n{\n    return max(v.x, v.y);\n}\n\nfloat isLine(float2 position)\n{\n    // Determine the change in pixel coordate from this pixel to the next one over in x and y axes\n    float2 duvx = ddx(position);\n    float2 duvy = ddy(position);\n\n    // Where do we want to sample the grid?\n    // This is structed as an array to make it easy to add and remove new samples.\n    float2 taps[] = {\n        float2(1, 1),\n        float2(-1, 1),\n    };\n\n    // Determine the grid index at "this" pixel\n    float2 center = gridIndex(position);\n\n    // Loop over the "taps" array. This is unrolled by the HLSL compiler.\n    float accumulator = 0;\n    [unroll(taps.Length)] for (uint idx = 0; idx < taps.Length; idx++)\n    {\n        // Sample the grid at this offset.\n        float2 tap = taps[idx];\n        float2 gridSample = gridIndex(position + duvx * tap.x + duvy * tap.y);\n\n        // take the absolute difference between samples.\n        // Then take the max value of those two.\n        // Then take the max of that and the accumulator.\n        accumulator = max(accumulator, max2(abs(gridSample - center)));\n    }\n\n    // This will be zero if all taps were the same value.\n    return accumulator;\n}\n\nfloat4 frag(v2f i) : SV_Target\n{\n    float line = isLine(i.uv);\n\n    float4 col = float4(1, 0, 0, 1);\n\n    // "line" will be zero if it is the middle of a grid cell, otherwise it will have some other value >= 1.\n    col.a *= saturate(line);\n\n    return col;\n}\n')),(0,a.kt)("p",null,"Finally this looks pretty good, except for the hard cut off in the distance (at the camera far plane):"),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(6158).Z,width:"1244",height:"609"})),(0,a.kt)("p",null,"Adding in distance based fading gets us the nice soft fadeout in the distance instead, which also gives the illusion that the lines are getting even thinner in the distance:"),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(9640).Z,width:"1440",height:"810"})))}c.isMDXComponent=!0},9640:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ReferencePlane-b7ba6462ca905e8177ab4f837d470ee2.jpg"},8823:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ReferencePlaneAliased1-a55c588ae46df9a959ec11704ab888b1.png"},6158:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ReferencePlaneSharp-6fae06568099e261fd9a3376f208c030.png"},4128:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/ReferencePlaneTooWide-a948971529cfe5f3260aba61e5d5bcd9.png"}}]);