import{f as A,j as o,k as p,p as m,o as u,c as h,a as y,w as r,g as t,F as g,i as l,t as f}from"./vendor.4452b2fb.js";import{A as b}from"./AppSidebar.1e627848.js";import{m as w,s as C,M as E,l as _}from"./maplibre-gl-directions.es.713169d1.js";import"./index.f056bdef.js";var B="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKRJREFUOE+lkkEOAVEQRF9tJBwCZxhHEFYOIXMWNuIynIOFI7B3hpKeDBFh0ub/ddfrX10lCp8K9aQAtsexSNLtc2EWsANqYC7p8g7JAobAEZgBS0mnJyQFiGHbXyFpwC+IbE+BDTBIJhI/WQH3sBSACbDtCahKLCwkndMA2yPg0CbRiJtuZHy34oixAl7ifwB7YF1SpDh0VPnaq8pdNlM36AI8AK1AOkjqIJazAAAAAElFTkSuQmCC";const I=t("p",null,"Another example that demonstrates the ease of extending the original styles provided by the plugin.",-1),F=t("p",null,'This time a "symbol" layer is added that shows the direction the selected route goes in.',-1),S=t("small",null,[t("strong",null,"Note"),l(" that you have to manually load and add the images you intend to use for the custom layers you add")],-1),D=A({setup(x){const c=o(p().matched[0].name),n=o(),s=o();return m(()=>{const e=new w.Map({container:s.value,style:C,center:[-74.1197632,40.6974034],zoom:11});e.loadImage(B,(d,i)=>{!d&&i&&e.addImage("direction-arrow",i)});const a=_();a.push({id:"maplibre-gl-directions-routeline-direction-arrow",type:"symbol",source:"maplibre-gl-directions",layout:{"symbol-placement":"line-center","icon-image":"direction-arrow","icon-size":["interpolate",["exponential",1.5],["zoom"],12,.85,18,1.4]},paint:{"icon-opacity":.5},filter:["all",["in","$type","LineString"],["in","route","SELECTED"]]}),e.on("load",()=>{n.value=new E(e,{requestOptions:{alternatives:"true"},layers:a}),n.value.interactive=!0})}),(e,a)=>(u(),h(g,null,[y(b,null,{title:r(()=>[l(f(c.value),1)]),default:r(()=>[I,F,S]),_:1}),t("div",{ref_key:"mapRef",ref:s,class:"shadow-xl"},null,512)],64))}});export{D as default};
