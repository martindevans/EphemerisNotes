"use strict";(self.webpackChunkephemeris_notes=self.webpackChunkephemeris_notes||[]).push([[3882],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=i.createContext({}),d=function(e){var t=i.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=d(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=d(a),h=n,c=m["".concat(s,".").concat(h)]||m[h]||u[h]||r;return a?i.createElement(c,l(l({ref:t},p),{},{components:a})):i.createElement(c,l({ref:t},p))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,l=new Array(r);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var d=2;d<r;d++)l[d]=a[d];return i.createElement.apply(null,l)}return i.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9208:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=a(7462),n=(a(7294),a(3905));const r={tags:["devlog","OrbitalMechanics","Rendering"]},l=void 0,o={unversionedId:"ImplementationDetails/devlog/2024/July",id:"ImplementationDetails/devlog/2024/July",title:"July",description:"Monday 1st",source:"@site/docs/ImplementationDetails/devlog/2024/July.md",sourceDirName:"ImplementationDetails/devlog/2024",slug:"/ImplementationDetails/devlog/2024/July",permalink:"/EphemerisNotes/ImplementationDetails/devlog/2024/July",draft:!1,editUrl:"https://github.com/martindevans/EphemerisNotes/tree/master/docs/ImplementationDetails/devlog/2024/July.md",tags:[{label:"devlog",permalink:"/EphemerisNotes/tags/devlog"},{label:"OrbitalMechanics",permalink:"/EphemerisNotes/tags/orbital-mechanics"},{label:"Rendering",permalink:"/EphemerisNotes/tags/rendering"}],version:"current",frontMatter:{tags:["devlog","OrbitalMechanics","Rendering"]},sidebar:"tutorialSidebar",previous:{title:"UnityPlugins",permalink:"/EphemerisNotes/ImplementationDetails/UnityPlugins"},next:{title:"June",permalink:"/EphemerisNotes/ImplementationDetails/devlog/2024/June"}},s={},d=[{value:"Monday 1st",id:"monday-1st",level:2},{value:"Tuesday 2nd",id:"tuesday-2nd",level:2},{value:"Wednesday 3rd",id:"wednesday-3rd",level:2},{value:"Thursday 4th",id:"thursday-4th",level:2},{value:"Friday 5th",id:"friday-5th",level:2},{value:"Monday 8th",id:"monday-8th",level:2},{value:"Tuesday 9th",id:"tuesday-9th",level:2},{value:"Wednesday 10th",id:"wednesday-10th",level:2},{value:"Thursday 11th",id:"thursday-11th",level:2},{value:"Friday 12th",id:"friday-12th",level:2},{value:"Saturday 13th",id:"saturday-13th",level:2},{value:"Monday 14th",id:"monday-14th",level:2},{value:"Tuesday 15th",id:"tuesday-15th",level:2},{value:"Wednesday 17th",id:"wednesday-17th",level:2},{value:"Thursday 18th",id:"thursday-18th",level:2},{value:"Monday 22nd",id:"monday-22nd",level:2},{value:"Tuesday 23rd",id:"tuesday-23rd",level:2},{value:"Wednesday 24th",id:"wednesday-24th",level:2}],p={toc:d};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"monday-1st"},"Monday 1st"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},'Created "base" scene which contains the various necessary things to make up a scene',(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Skybox config (galaxy)"),(0,n.kt)("li",{parentName:"ul"},"Instanced stars renderer"),(0,n.kt)("li",{parentName:"ul"},"Camera stack (big/little)"),(0,n.kt)("li",{parentName:"ul"},"Postprocessing volume"))),(0,n.kt)("li",{parentName:"ul"},"Experimented with cinemachine and layered cameras",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Seems to work as expected"))),(0,n.kt)("li",{parentName:"ul"},"Adjusted Earth graphics (improving atmospheric scattering)"),(0,n.kt)("li",{parentName:"ul"},'Introduced "layer" tag types, which allows distinguishing layers in the type system. These types have a property specifying the scaling for that layer (meters per unit)',(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Changed some Myriad components/systems to require layer tags. This allows multiple to be bound for different layers.",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"ScenePosition<TLayer>"),", ",(0,n.kt)("inlineCode",{parentName:"li"},"UnityTransform<TLayer>"),", ",(0,n.kt)("inlineCode",{parentName:"li"},"SetScenePositionFromWorldPosition<TLayer>")))))),(0,n.kt)("li",{parentName:"ul"},"Tested compositing camera layers in SolarSystem scene, setting NBody as focus."),(0,n.kt)("li",{parentName:"ul"},"Investigated feasibility of using Unity job system for scheduling integrator work")),(0,n.kt)("h2",{id:"tuesday-2nd"},"Tuesday 2nd"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Investigated poor performance with integrator and a large number of NBodies (1000+)",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Fixed a bug that was causing excess tasks to be allocated - one task per nbody per frame, even if no work was needed!"),(0,n.kt)("li",{parentName:"ul"},"Wrote a new version of the integrator based on Unity jobs instead of dotnet tasks"))),(0,n.kt)("li",{parentName:"ul"},"Expanded Myriad.ECS query API (adding various overloads which allow not passing some params, or passing them by ref)."),(0,n.kt)("li",{parentName:"ul"},"Added new event type, so the visual origin and the rail relative origin are different things."),(0,n.kt)("li",{parentName:"ul"},"Started building ",(0,n.kt)("inlineCode",{parentName:"li"},"CameraStackController")," behaviour, to manage everything involved in switching camera modes")),(0,n.kt)("h2",{id:"wednesday-3rd"},"Wednesday 3rd"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Experimented with bloom/lens dirt. URP lens flare asset can't use HDR colour, so interacting with bloom is difficult."),(0,n.kt)("li",{parentName:"ul"},"Worked on ",(0,n.kt)("inlineCode",{parentName:"li"},"CameraStackController"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Mode transition (small vs astronomical)"),(0,n.kt)("li",{parentName:"ul"},"Integration with cinemachine",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"copying appropriate data from cinemachine"),(0,n.kt)("li",{parentName:"ul"},"activating/deactivating vcams on transition"),(0,n.kt)("li",{parentName:"ul"},"changing channel on brain to work with relevant vcams"),(0,n.kt)("li",{parentName:"ul"},"hard cut on transition"))),(0,n.kt)("li",{parentName:"ul"},"Developing an orbital camera"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"NBodyOrbitLine")," rendering is broken in small mode, need to think about how to offset that into the right position"))),(0,n.kt)("li",{parentName:"ul"},"Investigating Unity new Input System (easier to use with Cinemachine, maybe)")),(0,n.kt)("h2",{id:"thursday-4th"},"Thursday 4th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Experimenting with fixing ",(0,n.kt)("inlineCode",{parentName:"li"},"NBodyOrbitLine")," in small mode",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Added support for transforms to nbody line shader"),(0,n.kt)("li",{parentName:"ul"},"Moving nbody line transform to the same scene position as whatever entity the line is relative to"))),(0,n.kt)("li",{parentName:"ul"},"Added new layer for ",(0,n.kt)("inlineCode",{parentName:"li"},"AstronomicalOverlay"),' - map markers and other things that should only appear in "astronomical" mode'),(0,n.kt)("li",{parentName:"ul"},"Improved ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," Unity editor integration",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Proper support for nested generic components - showing the full generic type definition in the inspector")))),(0,n.kt)("h2",{id:"friday-5th"},"Friday 5th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Improved ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," Unity editor integration",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Added support for generic nested systems - showing the full generic type definition in the inspector"),(0,n.kt)("li",{parentName:"ul"},"Debugging ",(0,n.kt)("inlineCode",{parentName:"li"},"SerializedObjectNotCreatableException")," thrown by Unity when certain inspectors are shown"))),(0,n.kt)("li",{parentName:"ul"},"Placeholder.Editor.UI",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Changes to support drawing default editor, which seemed to be the cause of the mysterious ",(0,n.kt)("inlineCode",{parentName:"li"},"SerializedObjectNotCreatableException")),(0,n.kt)("li",{parentName:"ul"},"Moving all files into better folder hierarchy"),(0,n.kt)("li",{parentName:"ul"},"General polish (lots of nullability improvements)"))),(0,n.kt)("li",{parentName:"ul"},"Updated Ephemeris to use new packages"),(0,n.kt)("li",{parentName:"ul"},"Experimenting with an entity browser window (construct queries and view result entities)")),(0,n.kt)("h2",{id:"monday-8th"},"Monday 8th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Build an input controller for Cinemachine which only drives input while right mouse button is clicked"),(0,n.kt)("li",{parentName:"ul"},"Tweaked gains to get nice feeling camera controls in astronomical view"),(0,n.kt)("li",{parentName:"ul"},"Made ",(0,n.kt)("inlineCode",{parentName:"li"},"RailIntegrator")," properly dispose all in-flight jobs when the system is disposed"),(0,n.kt)("li",{parentName:"ul"},"Imported settings file load/save from Ephemeris3",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Hooked up simulation settings (integrator min/max DT & epsilon)"),(0,n.kt)("li",{parentName:"ul"},"Hooked up audio settings (created some new audio mixers to apply setting to)"))),(0,n.kt)("li",{parentName:"ul"},"Dug up old prototype code (written 2 years ago) for drawing very large numbers of symbols using instancing, begun porting it to Ephemeris4",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Rewrite required to make it work with Myriad.ECS"))),(0,n.kt)("li",{parentName:"ul"},"Total rewrite of parallel query system in Myriad.ECS",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"ParallelQuery")," now runs in approximately 40% of the time!")))),(0,n.kt)("h2",{id:"tuesday-9th"},"Tuesday 9th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Rewritten ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," ",(0,n.kt)("inlineCode",{parentName:"li"},"ParallelChunkQuery")," to use the new threading system",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Improved ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," threading system to better distribute work across threads by randomising work stealing, leading to less contention.")))),(0,n.kt)("h2",{id:"wednesday-10th"},"Wednesday 10th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Worked on rendering symbols using instanced rendering",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Prototype with ",(0,n.kt)("inlineCode",{parentName:"li"},"DrawInstancedIndirect")),(0,n.kt)("li",{parentName:"ul"},"Rewritten prototype with ",(0,n.kt)("inlineCode",{parentName:"li"},"RenderMeshPrimitives")),(0,n.kt)("li",{parentName:"ul"},"Wrote shader for drawing billboarded icons, with scaling based on distance. Adapted from starfield skybox shader.",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Spent ages debugging ",(0,n.kt)("inlineCode",{parentName:"li"},"ComputeBuffer")," usage"))))),(0,n.kt)("li",{parentName:"ul"},"Further optimisations and improvements to ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," parallel queries",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Main thread steals work when waiting, very slight speedup"),(0,n.kt)("li",{parentName:"ul"},"Catching and collecting exceptions from all parallel workers, instead of deadlocking when an exception is throw.")))),(0,n.kt)("h2",{id:"thursday-11th"},"Thursday 11th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Clean up of ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," threading.",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Considering how to refactor the new system to have a configurable threadpool, such that Unity jobs can act as the backend."))),(0,n.kt)("li",{parentName:"ul"},"Refactoring prototype symbol drawing system",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Support for symbols on different layers"),(0,n.kt)("li",{parentName:"ul"},"Grab data from ECS for rendering")))),(0,n.kt)("h2",{id:"friday-12th"},"Friday 12th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Added ",(0,n.kt)("inlineCode",{parentName:"li"},"ChunkHandle")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," chunk queries. This allows querying of chunk level properties.",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Updated various projects after breaking ",(0,n.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," change"))),(0,n.kt)("li",{parentName:"ul"},"Experimented with putting instanced symbols into scene on layers"),(0,n.kt)("li",{parentName:"ul"},"Started work on overlays - flipbook animated textures added over the top of the base icon")),(0,n.kt)("h2",{id:"saturday-13th"},"Saturday 13th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"More work on flipbook overlay")),(0,n.kt)("h2",{id:"monday-14th"},"Monday 14th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Tidied up symbol rendering code"),(0,n.kt)("li",{parentName:"ul"},"Added a default component renderer to Myriad Unity integration, requiring less custom editors to be written for simple components."),(0,n.kt)("li",{parentName:"ul"},"Created systems to copy position between layers as necessary"),(0,n.kt)("li",{parentName:"ul"},"Added symbols to ",(0,n.kt)("inlineCode",{parentName:"li"},"Astronomical")," layer for ships"),(0,n.kt)("li",{parentName:"ul"},"Tested close flying ships in small view (close enough to see the 3d model of the other ship)"),(0,n.kt)("li",{parentName:"ul"},"Fixed Kepler body line rendering using the wrong camera for LOD",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Slightly increased max point count for Kepler lines"))),(0,n.kt)("li",{parentName:"ul"},"Built prototype script for steering spacecraft using keyboard, testing out rail invalidation and recalculation",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Unsurprisingly, this complex and largely untested system is broken!"),(0,n.kt)("li",{parentName:"ul"},"Fixed up page epochs in the relative rail"),(0,n.kt)("li",{parentName:"ul"},"Discovered the root bug - invalidation of the rail needs to ",(0,n.kt)("em",{parentName:"li"},"discard")," the results on in-flight integration job when it finishes!")))),(0,n.kt)("h2",{id:"tuesday-15th"},"Tuesday 15th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Discarding integrator data if the rail epoch has changed while the job/task was running",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Two remaining issues to fix:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"RelativePagedRail")," ",(0,n.kt)("inlineCode",{parentName:"li"},"BoundingSphere")," calculation (part of nbody line picking) is sometimes trying to write out of bounds"),(0,n.kt)("li",{parentName:"ul"},"Entity jumps position when a burn is scheduled/cancelled"))))),(0,n.kt)("li",{parentName:"ul"},"Debugging why nbody line picking isn't working",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Rewriting nbody picking to use a simpler picking system (simple linear scan, instead of recursive). This fixes the index out of bounds issue."),(0,n.kt)("li",{parentName:"ul"},"Ray appears to be in the wrong space (needs to be relative to the origin to move back into world space)"))),(0,n.kt)("li",{parentName:"ul"},"Debugging entity jumping",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"There are two jumps:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"A single frame jump to a position"),(0,n.kt)("li",{parentName:"ul"},"A persistent offset for the entire duration of the burn"))),(0,n.kt)("li",{parentName:"ul"},"Investigating single frame jump",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Sampling the rail fails because two points are required (one either side of the sample time) but because the rail has been trimmed down to end at ",(0,n.kt)("em",{parentName:"li"},"now")," there's no point after now!"),(0,n.kt)("li",{parentName:"ul"},"Added extrapolation to rail sampler, if two points cannot be found it uses the last known good point and extrapolates. This seems to fix the one frame jump."))),(0,n.kt)("li",{parentName:"ul"},"Investigating shift",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Probably caused by linear interpolation of a non-linear curve. i.e. the sample is some way into an acceleration (changing velocity) but the sampler is linear (assuming constant velocity)")))))),(0,n.kt)("h2",{id:"wednesday-17th"},"Wednesday 17th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Exported some orbital data from live sim, experimenting with it in Python"),(0,n.kt)("li",{parentName:"ul"},"Some possible fixes",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Better interpolation, sticking closer to ground truth so the skip is smaller",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Run an integrator every frame (but lower precision) and re-sync with rails smoothly"),(0,n.kt)("li",{parentName:"ul"},"Fit a curve to the rail points (e.g. bezier) and interpolate along that"))),(0,n.kt)("li",{parentName:"ul"},'"Fixup" step',(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Detect when the rail is modified in the section that interpolation is currently sampling, run an explicit fixup step - interpolate from the last predicted position (even though it's wrong) to the next rail point, then interpolate as usual")))))),(0,n.kt)("h2",{id:"thursday-18th"},"Thursday 18th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Began some work prototyping a new orbit rail sampler, which detects discontinuities."),(0,n.kt)("li",{parentName:"ul"},'Removed "catch-up" mode in integrator - the current implementation can leave large "holes" in the rail since the catch-up work is not added to the rail',(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Modified rail trimming to reset delta time back to min value, it'll rapidly go back up if it needs to."))),(0,n.kt)("li",{parentName:"ul"},"Prototyping cubic bezier interpolation between points, that helps a lot! There's still some drift since cubic bezier is not a perfect approximation."),(0,n.kt)("li",{parentName:"ul"},"Built out a stateful sampler:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Extrapolation phase - best guess when there's no available rail data"),(0,n.kt)("li",{parentName:"ul"},"Interpolation phase - when there's rail data, using cubic bezier"),(0,n.kt)("li",{parentName:"ul"},"Reconciliation phase - when there's rail data but we just recently finished extrapolating. In this case continue extrapolating ",(0,n.kt)("em",{parentName:"li"},"and")," interpolating, and slowly interpolate from one to the other. Lasts 30-60 frames."))),(0,n.kt)("li",{parentName:"ul"},"Noticed that the spacecraft act differently depending upon if the rail was invalidated or not. ",(0,n.kt)("strong",{parentName:"li"},"Even if there's no actual change"),"! Definitely a bug in how invalidation is done, or how recalculation is done.")),(0,n.kt)("h2",{id:"monday-22nd"},"Monday 22nd"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Setup a test project to develop integrator interpolation"),(0,n.kt)("li",{parentName:"ul"},"Integrated the same point forward, but using randomised timesteps, then compared distance between interpolated points"),(0,n.kt)("li",{parentName:"ul"},"Tested 3 methods:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Linear - terrible"),(0,n.kt)("li",{parentName:"ul"},"Bezier - also terrible but it's smoother, so a slight improvement over linear. Still has just as much error though."),(0,n.kt)("li",{parentName:"ul"},"Kinematic - amazing, 30x less error. Also should be smooth. Assumes constant acceleration so not technically correct and still just an approximation."))),(0,n.kt)("li",{parentName:"ul"},"Implementing kinematic interpolation in Ephemeris main project, problem seems to be completely fixed!")),(0,n.kt)("h2",{id:"tuesday-23rd"},"Tuesday 23rd"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},'Removed "catch up" mode from ',(0,n.kt)("inlineCode",{parentName:"li"},"RailIntegrator")," - running integration work on main thread when an entity is behind. Extrapolation mode in the sampler handles this now."),(0,n.kt)("li",{parentName:"ul"},"Added an event the integrator can send when entities are falling behind."),(0,n.kt)("li",{parentName:"ul"},"Tested the (very rough) keyboard controller script, movement now seems to be smooth with no jitter or weird drifting.")),(0,n.kt)("h2",{id:"wednesday-24th"},"Wednesday 24th"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Investigating why ",(0,n.kt)("inlineCode",{parentName:"li"},"NBodyOrbitLine")," renderer picking is broken (it was broken a while ago when switching the camera system).",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Camera ray values coming from Unity seem to be completely wrong. Not attached to mouse, offset is dependent on resolution."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.unity3d.com/ScriptReference/Event-mousePosition.html"},(0,n.kt)("inlineCode",{parentName:"a"},"Event.Current.mousePosition"))," seems to be the wrong scale, using ",(0,n.kt)("a",{parentName:"li",href:"https://docs.unity3d.com/ScriptReference/Input-mousePosition.html"},(0,n.kt)("inlineCode",{parentName:"a"},"Input.mousePosition"))," fixes it."),(0,n.kt)("li",{parentName:"ul"},"Need to offset things by the transform position of the line renderer, to account for the camera being attached to a different thing to what the line is relative to."))),(0,n.kt)("li",{parentName:"ul"},"Optimised nbody orbit picking",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Normalizing ray ahead of time, so distance calculations can just use ",(0,n.kt)("inlineCode",{parentName:"li"},"1.0"),"."),(0,n.kt)("li",{parentName:"ul"},"Replaced many divides in sphere tests with a single ",(0,n.kt)("inlineCode",{parentName:"li"},"1/x")," and using multiplies later."),(0,n.kt)("li",{parentName:"ul"},"Placed a soft limit on the number of points returned.")))))}u.isMDXComponent=!0}}]);