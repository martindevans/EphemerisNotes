"use strict";(self.webpackChunkephemeris_notes=self.webpackChunkephemeris_notes||[]).push([[6904],{3905:(e,t,i)=>{i.d(t,{Zo:()=>m,kt:()=>c});var n=i(7294);function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function o(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):l(l({},t),e)),i},m=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var i=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=p(i),c=a,h=d["".concat(s,".").concat(c)]||d[c]||u[c]||r;return i?n.createElement(h,l(l({ref:t},m),{},{components:i})):n.createElement(h,l({ref:t},m))}));function c(e,t){var i=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=i.length,l=new Array(r);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var p=2;p<r;p++)l[p]=i[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,i)}d.displayName="MDXCreateElement"},6206:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=i(7462),a=(i(7294),i(3905));const r={tags:["devlog","DockingSim","PhysicsEngine","TechnicalDetails"],sidebar_position:9},l=void 0,o={unversionedId:"ImplementationDetails/devlog/2024/September",id:"ImplementationDetails/devlog/2024/September",title:"September",description:"Sunday 1st",source:"@site/docs/ImplementationDetails/devlog/2024/September.md",sourceDirName:"ImplementationDetails/devlog/2024",slug:"/ImplementationDetails/devlog/2024/September",permalink:"/EphemerisNotes/ImplementationDetails/devlog/2024/September",draft:!1,editUrl:"https://github.com/martindevans/EphemerisNotes/tree/master/docs/ImplementationDetails/devlog/2024/September.md",tags:[{label:"devlog",permalink:"/EphemerisNotes/tags/devlog"},{label:"DockingSim",permalink:"/EphemerisNotes/tags/docking-sim"},{label:"PhysicsEngine",permalink:"/EphemerisNotes/tags/physics-engine"},{label:"TechnicalDetails",permalink:"/EphemerisNotes/tags/technical-details"}],version:"current",sidebarPosition:9,frontMatter:{tags:["devlog","DockingSim","PhysicsEngine","TechnicalDetails"],sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"August",permalink:"/EphemerisNotes/ImplementationDetails/devlog/2024/August"},next:{title:"October",permalink:"/EphemerisNotes/ImplementationDetails/devlog/2024/October"}},s={},p=[{value:"Sunday 1st",id:"sunday-1st",level:2},{value:"Tuesday 24th",id:"tuesday-24th",level:2},{value:"Wednesday 25th",id:"wednesday-25th",level:2},{value:"Thursday 26th",id:"thursday-26th",level:2},{value:"Friday 27th",id:"friday-27th",level:2},{value:"Monday 30th",id:"monday-30th",level:2}],m={toc:p};function u(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},m,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"sunday-1st"},"Sunday 1st"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Participated in the 2024 Cylon GameJam for all of September up to the 24th."))),(0,a.kt)("h2",{id:"tuesday-24th"},"Tuesday 24th"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Expanding out jitter dynamics scene in Ephemeris project"),(0,a.kt)("li",{parentName:"ul"},"Debugging torque in jitter"),(0,a.kt)("li",{parentName:"ul"},"Compared torques:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Standard Unity physics"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Unity.Physics")," package"),(0,a.kt)("li",{parentName:"ul"},"Jitter"),(0,a.kt)("li",{parentName:"ul"},"A quick prototype using Myriad components"))),(0,a.kt)("li",{parentName:"ul"},"Jitter just seems to have the wrong inertia tensor?")),(0,a.kt)("h2",{id:"wednesday-25th"},"Wednesday 25th"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Properly integrating rotations in Myriad"),(0,a.kt)("li",{parentName:"ul"},"Experimented with Z3 for solving thruster firing",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Z3 probably isn't feasible to use in-game, just PoC"))),(0,a.kt)("li",{parentName:"ul"},"Cleaned up various physics related things in Ephemeris into a single ",(0,a.kt)("inlineCode",{parentName:"li"},"Dynamics")," namespace"),(0,a.kt)("li",{parentName:"ul"},"Removed Jitter physics")),(0,a.kt)("h2",{id:"thursday-26th"},"Thursday 26th"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Moving ",(0,a.kt)("inlineCode",{parentName:"li"},"ApplyImpulse")," method to ",(0,a.kt)("inlineCode",{parentName:"li"},"Myriad.Dynamics")),(0,a.kt)("li",{parentName:"ul"},"Added new ",(0,a.kt)("inlineCode",{parentName:"li"},"GetComponentRef")," overloads to Myriad which retrieve many components all at once"),(0,a.kt)("li",{parentName:"ul"},"Fixed ",(0,a.kt)("inlineCode",{parentName:"li"},"Myriad.ECS")," GitHub build action failure"),(0,a.kt)("li",{parentName:"ul"},"Updated Ephemeris to use new ",(0,a.kt)("inlineCode",{parentName:"li"},"Myriad.Dynamics")," components, instead of ad-hoc mass and orientation components that existed before"),(0,a.kt)("li",{parentName:"ul"},"Fixed up docking sim to compile and load properly with new stuff"),(0,a.kt)("li",{parentName:"ul"},'Experimented with a basic "aspect" systems for physics'),(0,a.kt)("li",{parentName:"ul"},'Replaced default camera blend with "cut" (nothing else really makes sense at this scale)'),(0,a.kt)("li",{parentName:"ul"},"Tested Z3 in Unity. It required a native DLL but it does work!")),(0,a.kt)("h2",{id:"friday-27th"},"Friday 27th"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Experimented more with ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/microsoft/Zen"},"Zen")," in Unity.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Issues with creating ",(0,a.kt)("inlineCode",{parentName:"li"},"Real"),": casting ",(0,a.kt)("inlineCode",{parentName:"li"},"-4")," acts different to ",(0,a.kt)("inlineCode",{parentName:"li"},"new Real(-4)")),(0,a.kt)("li",{parentName:"ul"},"Timeout failed to prevent a hang when using ",(0,a.kt)("inlineCode",{parentName:"li"},"Minimize"),"!"))),(0,a.kt)("li",{parentName:"ul"},"Spawning player pod and station near each other in docking sim"),(0,a.kt)("li",{parentName:"ul"},"Debugging issues with orbital paths"),(0,a.kt)("li",{parentName:"ul"},"Modified ",(0,a.kt)("inlineCode",{parentName:"li"},"NBody")," integrator to work for entities with no mass (just assume ",(0,a.kt)("inlineCode",{parentName:"li"},"mass=1"),")"),(0,a.kt)("li",{parentName:"ul"},"Setup a test harness for calculating thruster activations"),(0,a.kt)("li",{parentName:"ul"},"Fixed various physics issues with torque"),(0,a.kt)("li",{parentName:"ul"},"Found article about thruster torques with iterative solving (2D): ",(0,a.kt)("a",{parentName:"li",href:"https://blog.cosmoteer.net/2011/01/starship-builder-idea-thruster-algorithm.html"},"https://blog.cosmoteer.net/2011/01/starship-builder-idea-thruster-algorithm.html")),(0,a.kt)("li",{parentName:"ul"},'Experimented with determining thruster throttle values using matrix inversion (for sets of three thrusters acting as a "virtual thruster gimbal")')),(0,a.kt)("h2",{id:"monday-30th"},"Monday 30th"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Experimenting more with matrix inversion for torques (i.e. including thruster offset as well as direction)."),(0,a.kt)("li",{parentName:"ul"},"Built solvers for linear force and angular torque, they seem to work well independently"),(0,a.kt)("li",{parentName:"ul"},"Fixed up initial scenario so it always spawns a sensible distance away by inspecting orbital velocity and delaying by a suitable amount of time")))}u.isMDXComponent=!0}}]);