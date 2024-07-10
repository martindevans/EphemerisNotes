"use strict";(self.webpackChunkephemeris_notes=self.webpackChunkephemeris_notes||[]).push([[784],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>c});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=d(n),c=i,y=u["".concat(s,".").concat(c)]||u[c]||m[c]||r;return n?a.createElement(y,l(l({ref:t},p),{},{components:n})):a.createElement(y,l({ref:t},p))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5774:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const r={},l=void 0,o={unversionedId:"ImplementationDetails/devlog/July",id:"ImplementationDetails/devlog/July",title:"July",description:"Monday 1st",source:"@site/docs/ImplementationDetails/devlog/July.md",sourceDirName:"ImplementationDetails/devlog",slug:"/ImplementationDetails/devlog/July",permalink:"/EphemerisNotes/ImplementationDetails/devlog/July",draft:!1,editUrl:"https://github.com/martindevans/EphemerisNotes/tree/master/docs/ImplementationDetails/devlog/July.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"UnityPlugins",permalink:"/EphemerisNotes/ImplementationDetails/UnityPlugins"},next:{title:"June",permalink:"/EphemerisNotes/ImplementationDetails/devlog/June"}},s={},d=[{value:"Monday 1st",id:"monday-1st",level:2},{value:"Tuesday 2nd",id:"tuesday-2nd",level:2},{value:"Wednesday 3rd",id:"wednesday-3rd",level:2},{value:"Thursday 4th",id:"thursday-4th",level:2},{value:"Friday 5th",id:"friday-5th",level:2},{value:"Monday 8th",id:"monday-8th",level:2},{value:"Tuesday 9th",id:"tuesday-9th",level:2},{value:"Wednesday 10th",id:"wednesday-10th",level:2}],p={toc:d};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"monday-1st"},"Monday 1st"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'Created "base" scene which contains the various necessary things to make up a scene',(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Skybox config (galaxy)"),(0,i.kt)("li",{parentName:"ul"},"Instanced stars renderer"),(0,i.kt)("li",{parentName:"ul"},"Camera stack (big/little)"),(0,i.kt)("li",{parentName:"ul"},"Postprocessing volume"))),(0,i.kt)("li",{parentName:"ul"},"Experimented with cinemachine and layered cameras",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Seems to work as expected"))),(0,i.kt)("li",{parentName:"ul"},"Adjusted Earth graphics (improving atmospheric scattering)"),(0,i.kt)("li",{parentName:"ul"},'Introduced "layer" tag types, which allows distinguishing layers in the type system. These types have a property specifying the scaling for that layer (meters per unit)',(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Changed some Myriad components/systems to require layer tags. This allows multiple to be bound for different layers.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ScenePosition<TLayer>"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"UnityTransform<TLayer>"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"SetScenePositionFromWorldPosition<TLayer>")))))),(0,i.kt)("li",{parentName:"ul"},"Tested compositing camera layers in SolarSystem scene, setting NBody as focus."),(0,i.kt)("li",{parentName:"ul"},"Investigated feasibility of using Unity job system for scheduling integrator work")),(0,i.kt)("h2",{id:"tuesday-2nd"},"Tuesday 2nd"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Investigated poor performance with integrator and a large number of NBodies (1000+)",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Fixed a bug that was causing excess tasks to be allocated - one task per nbody per frame, even if no work was needed!"),(0,i.kt)("li",{parentName:"ul"},"Wrote a new version of the integrator based on Unity jobs instead of dotnet tasks"))),(0,i.kt)("li",{parentName:"ul"},"Expanded Myriad.ECS query API (adding various overloads which allow not passing some params, or passing them by ref)."),(0,i.kt)("li",{parentName:"ul"},"Added new event type, so the visual origin and the rail relative origin are different things."),(0,i.kt)("li",{parentName:"ul"},"Started building ",(0,i.kt)("inlineCode",{parentName:"li"},"CameraStackController")," behaviour, to manage everything involved in switching camera modes")),(0,i.kt)("h2",{id:"wednesday-3rd"},"Wednesday 3rd"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Experimented with bloom/lens dirt. URP lens flare asset can't use HDR colour, so interacting with bloom is difficult."),(0,i.kt)("li",{parentName:"ul"},"Worked on ",(0,i.kt)("inlineCode",{parentName:"li"},"CameraStackController"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Mode transition (small vs astronomical)"),(0,i.kt)("li",{parentName:"ul"},"Integration with cinemachine",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"copying appropriate data from cinemachine"),(0,i.kt)("li",{parentName:"ul"},"activating/deactivating vcams on transition"),(0,i.kt)("li",{parentName:"ul"},"changing channel on brain to work with relevant vcams"),(0,i.kt)("li",{parentName:"ul"},"hard cut on transition"))),(0,i.kt)("li",{parentName:"ul"},"Developing an orbital camera"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NBodyOrbitLine")," rendering is broken in small mode, need to think about how to offset that into the right position"))),(0,i.kt)("li",{parentName:"ul"},"Investigating Unity new Input System (easier to use with Cinemachine, maybe)")),(0,i.kt)("h2",{id:"thursday-4th"},"Thursday 4th"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Experimenting with fixing ",(0,i.kt)("inlineCode",{parentName:"li"},"NBodyOrbitLine")," in small mode",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Added support for transforms to nbody line shader"),(0,i.kt)("li",{parentName:"ul"},"Moving nbody line transform to the same scene position as whatever entity the line is relative to"))),(0,i.kt)("li",{parentName:"ul"},"Added new layer for ",(0,i.kt)("inlineCode",{parentName:"li"},"AstronomicalOverlay"),' - map markers and other things that should only appear in "astronomical" mode'),(0,i.kt)("li",{parentName:"ul"},"Improved ",(0,i.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," Unity editor integration",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Proper support for nested generic components - showing the full generic type definition in the inspector")))),(0,i.kt)("h2",{id:"friday-5th"},"Friday 5th"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Improved ",(0,i.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," Unity editor integration",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Added support for generic nested systems - showing the full generic type definition in the inspector"),(0,i.kt)("li",{parentName:"ul"},"Debugging ",(0,i.kt)("inlineCode",{parentName:"li"},"SerializedObjectNotCreatableException")," thrown by Unity when certain inspectors are shown"))),(0,i.kt)("li",{parentName:"ul"},"Placeholder.Editor.UI",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Changes to support drawing default editor, which seemed to be the cause of the mysterious ",(0,i.kt)("inlineCode",{parentName:"li"},"SerializedObjectNotCreatableException")),(0,i.kt)("li",{parentName:"ul"},"Moving all files into better folder hierarchy"),(0,i.kt)("li",{parentName:"ul"},"General polish (lots of nullability improvements)"))),(0,i.kt)("li",{parentName:"ul"},"Updated Ephemeris to use new packages"),(0,i.kt)("li",{parentName:"ul"},"Experimenting with an entity browser window (construct queries and view result entities)")),(0,i.kt)("h2",{id:"monday-8th"},"Monday 8th"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Build an input controller for Cinemachine which only drives input while right mouse button is clicked"),(0,i.kt)("li",{parentName:"ul"},"Tweaked gains to get nice feeling camera controls in astronomical view"),(0,i.kt)("li",{parentName:"ul"},"Made ",(0,i.kt)("inlineCode",{parentName:"li"},"RailIntegrator")," properly dispose all in-flight jobs when the system is disposed"),(0,i.kt)("li",{parentName:"ul"},"Imported settings file load/save from Ephemeris3",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Hooked up simulation settings (integrator min/max DT & epsilon)"),(0,i.kt)("li",{parentName:"ul"},"Hooked up audio settings (created some new audio mixers to apply setting to)"))),(0,i.kt)("li",{parentName:"ul"},"Dug up old prototype code (written 2 years ago) for drawing very large numbers of symbols using instancing, begun porting it to Ephemeris4",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Rewrite required to make it work with Myriad.ECS"))),(0,i.kt)("li",{parentName:"ul"},"Total rewrite of parallel query system in Myriad.ECS",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ParallelQuery")," now runs in approximately 40% of the time!")))),(0,i.kt)("h2",{id:"tuesday-9th"},"Tuesday 9th"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Rewritten ",(0,i.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," ",(0,i.kt)("inlineCode",{parentName:"li"},"ParallelChunkQuery")," to use the new threading system",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Improved ",(0,i.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," threading system to better distribute work across threads by randomising work stealing, leading to less contention.")))),(0,i.kt)("h2",{id:"wednesday-10th"},"Wednesday 10th"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Worked on rendering symbols using instanced rendering",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Prototype with ",(0,i.kt)("inlineCode",{parentName:"li"},"DrawInstancedIndirect")),(0,i.kt)("li",{parentName:"ul"},"Rewritten prototype with ",(0,i.kt)("inlineCode",{parentName:"li"},"RenderMeshPrimitives")),(0,i.kt)("li",{parentName:"ul"},"Wrote shader for drawing billboarded icons, with scaling based on distance. Adapted from starfield skybox shader.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Spent ages debugging ",(0,i.kt)("inlineCode",{parentName:"li"},"ComputeBuffer")," usage"))))),(0,i.kt)("li",{parentName:"ul"},"Further optimisations and improvements to ",(0,i.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," parallel queries",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Main thread steals work when waiting, very slight speedup"),(0,i.kt)("li",{parentName:"ul"},"Catching and collecting exceptions from all parallel workers, instead of deadlocking when an exception is throw.")))))}m.isMDXComponent=!0}}]);