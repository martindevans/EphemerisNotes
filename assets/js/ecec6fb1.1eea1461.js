"use strict";(self.webpackChunkephemeris_notes=self.webpackChunkephemeris_notes||[]).push([[4701],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),m=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=m(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=m(n),u=i,h=d["".concat(s,".").concat(u)]||d[u]||c[u]||r;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var m=2;m<r;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4127:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>m});var a=n(7462),i=(n(7294),n(3905));const r={},l=void 0,o={unversionedId:"ImplementationDetails/Rendering/Layers",id:"ImplementationDetails/Rendering/Layers",title:"Layers",description:"Space is really big. Unfortunately this little known fact means that rendering very large things (planets) and very small things (spaceships) leads to some difficulties.",source:"@site/docs/ImplementationDetails/Rendering/Layers.md",sourceDirName:"ImplementationDetails/Rendering",slug:"/ImplementationDetails/Rendering/Layers",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/Layers",draft:!1,editUrl:"https://github.com/martindevans/EphemerisNotes/tree/master/docs/ImplementationDetails/Rendering/Layers.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"GPU Line Rendering",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/GPULines"},next:{title:"Line Grid Rendering",permalink:"/EphemerisNotes/ImplementationDetails/Rendering/LineGridRendering"}},s={},m=[{value:"Camera Modes",id:"camera-modes",level:2},{value:"Astronomical Mode/Map Mode",id:"astronomical-modemap-mode",level:3},{value:"Astronomical Mode Layers",id:"astronomical-mode-layers",level:4},{value:"Ship Mode",id:"ship-mode",level:3},{value:"Ship Mode Layers",id:"ship-mode-layers",level:4}],p={toc:m};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Space is really big. Unfortunately this little known fact means that rendering very large things (planets) and very small things (spaceships) leads to some difficulties."),(0,i.kt)("p",null,"The Ephemeris simulation runs entirely in world space, with Sol at the origin, using double precision numbers. GameObjects in the Unity scene are scaled and offset ([","[SceneScaleTricks]","]) such that one particular entity is at the origin, e.g. Earth during an Earth/Luna combat scenario."),(0,i.kt)("p",null,"Rendering is split into 4 layers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Object"),": planets, moons etc"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Overlay"),": things that should be visible in astronomical mode"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Object"),": ships, stations etc"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Overlay"),": things that should be visible in ship mode")),(0,i.kt)("h2",{id:"camera-modes"},"Camera Modes"),(0,i.kt)("p",null,"Ephemeris has 2 cameras, stacked on top of each other."),(0,i.kt)("h3",{id:"astronomical-modemap-mode"},"Astronomical Mode/Map Mode"),(0,i.kt)("p",null,'In this mode you\'re focusing on planets, orbits etc - this is the "strategic" view.'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Camera"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renders layers: ",(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Object"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Overlay")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Camera"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Disabled")))),(0,i.kt)("h4",{id:"astronomical-mode-layers"},"Astronomical Mode Layers"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Object")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Overlay"))),(0,i.kt)("h3",{id:"ship-mode"},"Ship Mode"),(0,i.kt)("p",null,'In this mode you\'re focused on one single small object (ship, station, maybe asteroids) - this is the "tactical" view.'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Camera"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renders layers: ",(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Object")),(0,i.kt)("li",{parentName:"ul"},"Position: Set to exactly the position of the ship being viewed"),(0,i.kt)("li",{parentName:"ul"},"Rotation: Copied from small camera"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Camera"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renders layers: ",(0,i.kt)("inlineCode",{parentName:"li"},"Small Object"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"Small Overlay"))))),(0,i.kt)("h4",{id:"ship-mode-layers"},"Ship Mode Layers"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Astronomical Object")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Object")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Small Overlay"))))}c.isMDXComponent=!0}}]);