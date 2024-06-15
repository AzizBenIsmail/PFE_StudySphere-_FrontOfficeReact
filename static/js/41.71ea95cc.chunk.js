/*!

=========================================================
* Notus React - v1.1.0 based on Tailwind Starter Kit by Creative Tim
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
(this.webpackJsonpStudySphere=this.webpackJsonpStudySphere||[]).push([[41],{124:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return u}));var n=c(1),r=c(12),a=c(38),s=c.n(a),l=c(42),o=c(63),i=c(49),d=c(0);function u(){const[e,t]=Object(n.useState)([]),[c,a]=Object(n.useState)(1),[u,x]=Object(n.useState)(""),[b,m]=Object(n.useState)([]),[j,h]=Object(n.useState)(""),p=s.a.get("jwt_token"),f=Object(n.useMemo)((()=>({headers:{Authorization:"Bearer ".concat(p)}})),[p]),g=Object(n.useCallback)((async()=>{try{const e=await Object(i.d)(f);t(e.data.formations)}catch(e){console.error("Error loading formations:",e)}}),[f]);Object(n.useEffect)((()=>{g()}),[g]),Object(n.useEffect)((()=>{const t=e.filter((e=>e.titre.toLowerCase().includes(u.toLowerCase())||e.competences.toLowerCase().includes(u.toLowerCase())||e.typeContenu.toLowerCase().includes(u.toLowerCase())||e.styleEnseignement.toLowerCase().includes(u.toLowerCase())||e.sujetInteret.toLowerCase().includes(u.toLowerCase())||e.description.toLowerCase().includes(u.toLowerCase()))).sort(((e,t)=>"asc"===j?e.Prix-t.Prix:"desc"===j?t.Prix-e.Prix:0));m(t)}),[e,u,j]);const w=6*c,O=w-6,y=b.slice(O,w),N=e=>a(e),v=[];for(let n=1;n<=Math.ceil(b.length/6);n++)v.push(n);const C=e=>new Date(e).toLocaleTimeString("fr-FR",{hour:"numeric",minute:"numeric"}),B=(e,t)=>{const c=e.split(" ");let n=0,a=!1;return c.map(((e,c)=>n>=15&&!a?(a=!0,Object(d.jsx)(r.b,{to:"/landing/detailscours/".concat(t),children:"(... voir plus)"},c)):n>=15?null:(n++,n%4===0?Object(d.jsxs)("span",{children:[e," ",Object(d.jsx)("br",{})]},c):Object(d.jsxs)("span",{children:[e," "]},c))))},S=e=>{const t=Math.floor(e/60),c=e%60;return"".concat(t,"H").concat(c,"Min")};return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("section",{className:"pb-20 bg-blueGray-200 -mt-24",children:Object(d.jsxs)("div",{className:"container mx-auto px-4",children:[Object(d.jsxs)("div",{className:"flex flex-wrap",children:[Object(d.jsx)("div",{className:"pt-6 w-full md:w-2/12 px-4 text-center",children:Object(d.jsx)("div",{className:"relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg",children:Object(d.jsxs)("div",{className:"px-4 py-5 flex-auto",children:["Trouvez des Formations par Nom ou par competences !",Object(d.jsx)("br",{}),Object(d.jsx)("input",{type:"text",placeholder:"Nom , Competences ...",value:u,onChange:e=>x(e.target.value),className:"  rounded-lg px-12 py-2"})]})})}),Object(d.jsx)("div",{className:"pt-6 w-full md:w-2/12 px-4 text-center",children:Object(d.jsx)("div",{className:"relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg",children:Object(d.jsxs)("div",{className:"px-4 py-5 mt-1 flex-auto",children:["Trier les formations par !",Object(d.jsx)("br",{}),Object(d.jsx)("button",{className:"bg-bleu-500 hover:bg-blue-700 text-orange-500 font-bold py-2 px-4 mt-5 rounded transition duration-300 mr-2",onClick:()=>h("asc"),children:"Prix croissant"}),Object(d.jsx)("button",{className:"bg-bleu-500 hover:bg-blue-700 text-orange-500 font-bold py-2 px-4 rounded transition duration-300",onClick:()=>h("desc"),children:"Prix d\xe9croissant"})]})})}),Object(d.jsx)("div",{className:"pt-6 w-full md:w-2/12 px-4 text-center",children:Object(d.jsx)("div",{className:"relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg",children:Object(d.jsx)("div",{className:"px-4 py-5 flex-auto",children:"Trouvez des Formation par un center !"})})})]}),Object(d.jsx)("div",{className:"grid grid-cols-1",children:y.map((e=>{return Object(d.jsx)("div",{className:"pt-6 w-full px-4 ",children:Object(d.jsxs)("div",{className:"relative flex flex-row items-center justify-between min-w-0 break-words bg-centre w-full mb-8 shadow-lg rounded-lg",onMouseEnter:e=>e.currentTarget.style.boxShadow="0px 0px 30px 0px rgba(0,0,0,0.3)",onMouseLeave:e=>e.currentTarget.style.boxShadow="none",children:[Object(d.jsx)("div",{className:"p-4",children:Object(d.jsx)("div",{className:"",children:Object(d.jsx)(r.b,{to:"/landing/detailscours/".concat(e._id),children:Object(d.jsx)("img",{onMouseEnter:e=>e.currentTarget.style.boxShadow="0px 0px 30px 0px rgba(0,0,0,0.3)",onMouseLeave:e=>e.currentTarget.style.boxShadow="none",alt:"...",className:"align-middle border-none max-w-full h-auto rounded-lg",src:"http://localhost:5000/images/Formations/".concat(e.image_Formation),style:{width:"350px",height:"220px"}})})})}),Object(d.jsxs)("div",{className:"px-4 py-5 flex-auto",children:[Object(d.jsx)("div",{className:"flex pb-6 flex-wrap",children:e.competences.split(",").map(((t,c)=>Object(d.jsx)("span",{style:{border:"2px solid rgba(226, 232, 240, 1)",marginRight:c===e.competences.split(",").length-1?"0":"5px"},className:"text-xs font-semibold inline-block text-blueGray-500 py-1 px-2 uppercase rounded-full text-black bg-white uppercase last:mr-0 mr-1",children:t.trim()},c)))}),Object(d.jsx)("h6",{className:"text-xl font-semibold",children:e.titre}),Object(d.jsx)("p",{className:"mt-2 mb-4 text-blueGray-500",children:B(e.description,e._id)}),Object(d.jsxs)("div",{className:"flex items-center mb-4",children:[Object(d.jsx)(r.b,{to:"/profile/ProfileCenter/".concat(e.centre._id),children:Object(d.jsx)("img",{onMouseEnter:e=>e.currentTarget.style.boxShadow="0px 0px 30px 0px rgba(0,0,0,0.3)",onMouseLeave:e=>e.currentTarget.style.boxShadow="none",alt:"...",className:"shadow rounded-full max-w-full h-auto align-middle border-none bg-indigo-500",src:"http://localhost:5000/images/Users/".concat(e.centre.image_user),style:{width:"25px"}})}),Object(d.jsxs)("p",{className:"text-xs text-blueGray-400 ml-2 ",children:["post\xe9 par ",e.centre.nom]}),Object(d.jsx)(r.b,{to:"/profile/ProfileFormateur/".concat(e.formateur._id),children:Object(d.jsx)("img",{onMouseEnter:e=>e.currentTarget.style.boxShadow="0px 0px 30px 0px rgba(0,0,0,0.3)",onMouseLeave:e=>e.currentTarget.style.boxShadow="none",alt:"...",className:"shadow ml-2 rounded-full max-w-full h-auto align-middle border-none bg-indigo-500",src:"http://localhost:5000/images/Users/".concat(e.formateur.image_user),style:{width:"25px"}})}),Object(d.jsxs)("p",{className:"text-xs text-blueGray-400 ml-2",children:["post\xe9 par ",e.formateur.nom]})]})]}),Object(d.jsxs)("div",{className:"px-4 py-5 flex-auto",children:[Object(d.jsx)("h6",{className:"text-xl font-semibold",children:"Date"}),Object(d.jsxs)("div",{className:"flex items-center",children:[Object(d.jsx)("p",{className:"mt-2 mb-4 text-blueGray-500",children:(t=e.dateDebut,new Date(t).toLocaleDateString("fr-FR",{year:"numeric",month:"long",day:"numeric"}))}),Object(d.jsx)(o.a,{style:{fontSize:"25px"}}),Object(d.jsx)("p",{className:"mt-2 mb-4 text-blueGray-500",children:C(e.dateDebut)})]})]}),Object(d.jsxs)("div",{className:"px-4 py-5 flex-auto",children:[Object(d.jsx)("h6",{className:"text-xl font-semibold",children:"Duree"}),Object(d.jsx)("p",{className:"mt-2 mb-4 text-blueGray-500",children:S(e.duree)})]}),Object(d.jsxs)("div",{className:"px-4 py-5 flex-auto",children:[Object(d.jsx)("h6",{className:"text-xl font-semibold",children:"Prix"}),Object(d.jsxs)("p",{className:"mt-2 mb-4 text-blueGray-500",children:[e.Prix," DT"]})]})]})},e._id);var t}))}),Object(d.jsx)("div",{className:"flex justify-center mt-8",children:Object(d.jsx)("nav",{className:"block",children:Object(d.jsxs)("ul",{className:"flex pl-0 rounded list-none flex-wrap",children:[Object(d.jsx)("li",{children:Object(d.jsxs)("button",{onClick:()=>N(1),className:"text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ".concat(1===c?"bg-lightBlue-500":"bg-white text-lightBlue-500"),children:[Object(d.jsx)(l.d,{}),Object(d.jsx)(l.d,{})]})}),Object(d.jsx)("li",{children:Object(d.jsx)("button",{onClick:()=>N(c-1),disabled:1===c,className:"text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ".concat(1===c?"bg-lightBlue-500":"bg-white text-lightBlue-500"),children:Object(d.jsx)(l.d,{})})}),v.map((e=>Object(d.jsx)("li",{children:Object(d.jsx)("button",{onClick:()=>N(e),className:"text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ".concat(c===e?"bg-lightBlue-500":"bg-white text-lightBlue-500"),children:e})},e))),Object(d.jsx)("li",{children:Object(d.jsx)("button",{onClick:()=>N(c+1),disabled:c===Math.ceil(e.length/6),className:"text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ".concat(c===Math.ceil(e.length/6)?"bg-lightBlue-500":"bg-white text-lightBlue-500"),children:Object(d.jsx)(l.e,{})})}),Object(d.jsx)("li",{children:Object(d.jsxs)("button",{onClick:()=>N(Math.ceil(e.length/6)),className:"text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-200 text-white ".concat(c===Math.ceil(e.length/6)?"bg-lightBlue-500":"bg-white text-lightBlue-500"),children:[Object(d.jsx)(l.e,{}),Object(d.jsx)(l.e,{})]})})]})})})]})})})}},49:function(e,t,c){"use strict";c.d(t,"b",(function(){return a})),c.d(t,"f",(function(){return s})),c.d(t,"e",(function(){return l})),c.d(t,"g",(function(){return o})),c.d(t,"h",(function(){return i})),c.d(t,"l",(function(){return d})),c.d(t,"c",(function(){return u})),c.d(t,"d",(function(){return x})),c.d(t,"j",(function(){return b})),c.d(t,"k",(function(){return m})),c.d(t,"i",(function(){return j})),c.d(t,"a",(function(){return h}));var n=c(143);const r="http://localhost:5000/formation";async function a(e,t){return await n.a.post(r,e,t)}async function s(e,t){return await n.a.get("".concat(r,"/").concat(e),t)}async function l(e){return await n.a.get("".concat(r,"/FormationByCentre"),e)}async function o(e,t){return await n.a.get("".concat(r,"/FormationByIdCentre/").concat(e),t)}async function i(e,t){return await n.a.get("".concat(r,"/FormationByIdFormateur/").concat(e),t)}async function d(e,t,c){return await n.a.put("".concat(r,"/").concat(e),t,c)}async function u(e,t){return await n.a.delete("".concat(r,"/").concat(e),t)}async function x(e){return await n.a.get(r,e)}async function b(e,t){return await n.a.get("".concat(r,"/searchemplacement?emplacements=").concat(e),t)}async function m(e){return await n.a.get("".concat(r,"/RecommandationParLocation"),e)}async function j(e,t){return await n.a.get("".concat(r,"/FormationByDomaine?sujetInteret=").concat(e),t)}async function h(e,t,c){return await n.a.get("".concat(r,"/FormationByDayAndTime?jours=").concat(e,"&tranchesHoraires=").concat(t),c)}}}]);
//# sourceMappingURL=41.71ea95cc.chunk.js.map