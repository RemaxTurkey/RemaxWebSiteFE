import{j as e}from"./jsx-runtime-DoEZbXM1.js";import{L as h}from"./link-DnHJH3Ki.js";import"./jsx-runtime-Bw5QeaCk.js";import"./index-xXdZhiDO.js";import"./router-context.shared-runtime-DqsaadHE.js";import"./add-base-path-fySP9q26.js";import"./use-merged-ref-C6sBtgns.js";function f({categories:g}){const k=g||[{id:"konut",label:"Konutlar",href:"/konut"},{id:"luks",label:"Lüks Konutlar",href:"/luks-konutlar"},{id:"ticari",label:"Ticari Gayrimenkuller",href:"/ticari"},{id:"arsa",label:"Arsa ve Arazi",href:"/arsa-arazi"}];return e.jsxs("div",{className:"fast-categories",children:[e.jsx("div",{className:"fast-categories__label",children:"Hızlı Kategori"}),e.jsx("div",{className:"fast-categories__items",children:k.map(t=>e.jsx(h,{href:t.href,className:"fast-categories__item",children:t.label},t.id))})]})}f.__docgenInfo={description:"",methods:[],displayName:"FastCategories",props:{categories:{required:!1,tsType:{name:"Array",elements:[{name:"Category"}],raw:"Category[]"},description:""}}};const K={title:"Components/FastCategories",component:f,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{}},r={args:{categories:[{id:"konut",label:"Konut",href:"/konut"},{id:"luks",label:"Lüks Konutlar",href:"/luks-konutlar"},{id:"ticari",label:"Ticari Gayrimenkuller",href:"/ticari"},{id:"arsa",label:"Arsa ve Arazi",href:"/arsa-arazi"}]}},s={args:{},parameters:{viewport:{defaultViewport:"mobile1"}}};var i,o,n;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(n=(o=a.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var l,c,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    categories: [{
      id: 'konut',
      label: 'Konut',
      href: '/konut'
    }, {
      id: 'luks',
      label: 'Lüks Konutlar',
      href: '/luks-konutlar'
    }, {
      id: 'ticari',
      label: 'Ticari Gayrimenkuller',
      href: '/ticari'
    }, {
      id: 'arsa',
      label: 'Arsa ve Arazi',
      href: '/arsa-arazi'
    }]
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,d,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const j=["Default","WithCustomCategories","Mobile"];export{a as Default,s as Mobile,r as WithCustomCategories,j as __namedExportsOrder,K as default};
