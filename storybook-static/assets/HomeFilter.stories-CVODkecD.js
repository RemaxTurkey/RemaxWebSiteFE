import{j as t}from"./jsx-runtime-DoEZbXM1.js";import{r as s}from"./index-BKg73hAG.js";import{u as B,_ as j,s as k}from"./index-skLTiDtz.js";import{L as H}from"./link-DnHJH3Ki.js";import{r as P}from"./index-DXlFzhcM.js";import"./jsx-runtime-Bw5QeaCk.js";import"./index-xXdZhiDO.js";import"./router-context.shared-runtime-DqsaadHE.js";import"./add-base-path-fySP9q26.js";import"./use-merged-ref-C6sBtgns.js";import"./index-DPWZeXMU.js";function K(e,r){var o=e.values,l=j(e,["values"]),n=r.values,i=j(r,["values"]);return k(n,o)&&k(l,i)}function V(e){var r=B(),o=r.formatMessage,l=r.textComponent,n=l===void 0?s.Fragment:l,i=e.id,d=e.description,p=e.defaultMessage,m=e.values,c=e.children,u=e.tagName,h=u===void 0?n:u,_=e.ignoreTag,x={id:i,description:d,defaultMessage:p},a=o(x,m,{ignoreTag:_});return typeof c=="function"?c(Array.isArray(a)?a:[a]):h?s.createElement(h,null,s.Children.toArray(a)):s.createElement(s.Fragment,null,a)}V.displayName="FormattedMessage";var O=s.memo(V,K);O.displayName="MemoizedFormattedMessage";function Y(){const e=B();return{t:(r,o)=>e.formatMessage({id:r},o)}}const W=e=>t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24",strokeWidth:2,className:"lucide lucide-map",...e,children:t.jsx("path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0zM15 5.764v15M9 3.236v15"})});W.__docgenInfo={description:"",methods:[],displayName:"SvgComponent"};const q=e=>t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,className:"lucide lucide-search",viewBox:"0 0 24 24",...e,children:[t.jsx("circle",{cx:11,cy:11,r:8}),t.jsx("path",{d:"m21 21-4.3-4.3"})]});q.__docgenInfo={description:"",methods:[],displayName:"SvgComponent"};/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),z=(...e)=>e.filter((r,o,l)=>!!r&&r.trim()!==""&&l.indexOf(r)===o).join(" ").trim();/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=s.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:n="",children:i,iconNode:d,...p},m)=>s.createElement("svg",{ref:m,...Z,width:r,height:r,stroke:e,strokeWidth:l?Number(o)*24/Number(r):o,className:z("lucide",n),...p},[...d.map(([c,u])=>s.createElement(c,u)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=(e,r)=>{const o=s.forwardRef(({className:l,...n},i)=>s.createElement(G,{ref:i,iconNode:r,className:z(`lucide-${X(e)}`,l),...n}));return o.displayName=`${e}`,o};/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],U=J("ChevronDown",Q),C=({defaultCategory:e="konut"})=>{var x;const{t:r}=Y(),[o,l]=s.useState(e),[n,i]=s.useState(!1),d=s.useRef(null),[p,m]=s.useState(!1),c=[{id:"konut",label:"Konut"},{id:"isyeri",label:"İş Yeri"},{id:"arsa",label:"Arsa"},{id:"bina",label:"Bina"},{id:"devremulk",label:"Devremülk"}];s.useEffect(()=>(m(!0),()=>m(!1)),[]),s.useEffect(()=>{const a=f=>{d.current&&!d.current.contains(f.target)&&!f.target.closest(".dropdown-menu-portal")&&i(!1)};return n&&document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[n]);const u=()=>{i(!n)},h=a=>{l(a),i(!1)},_=()=>{var f;if(!n||!p)return null;const a=(f=d.current)==null?void 0:f.getBoundingClientRect();return a?P.createPortal(t.jsx("div",{className:"dropdown-menu-portal",style:{position:"fixed",top:`${a.bottom+window.scrollY+5}px`,left:`${a.left+window.scrollX}px`,width:"120px",backgroundColor:"white",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.15)",zIndex:9999,padding:"5px 0"},children:c.map(g=>t.jsx("div",{style:{padding:"0.75rem 1.25rem",fontSize:"0.875rem",cursor:"pointer",backgroundColor:o===g.id?"#f0f0f0":"transparent",fontWeight:o===g.id?500:400,color:"#333"},onClick:()=>h(g.id),children:g.label},g.id))}),document.body):null};return t.jsx("div",{className:"home-filter",children:t.jsxs("div",{className:"home-filter__filter",children:[t.jsxs("div",{className:"home-filter__filter-category",children:[t.jsxs("button",{ref:d,className:"home-filter__filter-category-dropdown",onClick:u,"aria-expanded":n,children:[t.jsx("span",{className:"home-filter__filter-category-selected",children:(x=c.find(a=>a.id===o))==null?void 0:x.label}),t.jsx(U,{className:`home-filter__filter-category-icon ${n?"open":""}`})]}),_()]}),t.jsx("div",{className:"home-filter__filter-city-search",children:t.jsx("input",{type:"text",placeholder:r("home.filter.search-by-city-placeholder"),className:"home-filter__filter-city-search-input"})}),t.jsxs("div",{className:"home-filter__filter-buttons",children:[t.jsxs("button",{className:"btn-search",children:[t.jsx(q,{}),t.jsx("span",{className:"btn-search__text",children:t.jsx(O,{id:"app.search"})})]}),t.jsx("button",{className:"btn-map-link",children:t.jsx(H,{href:"/map",children:t.jsx(W,{stroke:"white",width:12,height:12})})})]})]})})};C.__docgenInfo={description:"",methods:[],displayName:"HomeFilter",props:{defaultCategory:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"konut"',computed:!1}}}};const me={title:"Components/HomeFilter",component:C,parameters:{layout:"centered"},tags:["autodocs"]},w={args:{}},v={args:{defaultCategory:"isyeri"},render:e=>t.jsx(C,{...e})},b={args:{},parameters:{viewport:{defaultViewport:"mobile1"}}},y={args:{},parameters:{viewport:{defaultViewport:"tablet"}}};var N,M,E;w.parameters={...w.parameters,docs:{...(N=w.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {}
}`,...(E=(M=w.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var S,L,A;v.parameters={...v.parameters,docs:{...(S=v.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    defaultCategory: 'isyeri'
  },
  render: args => {
    return <HomeFilter {...args} />;
  }
}`,...(A=(L=v.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var D,F,I;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(I=(F=b.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var R,T,$;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}`,...($=(T=y.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};const ue=["Default","WithPreselectedCategory","Mobile","Tablet"];export{w as Default,b as Mobile,y as Tablet,v as WithPreselectedCategory,ue as __namedExportsOrder,me as default};
