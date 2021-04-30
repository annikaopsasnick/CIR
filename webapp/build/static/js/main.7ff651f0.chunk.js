(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],{28:function(e,t,i){},29:function(e,t,i){},56:function(e,t,i){"use strict";i.r(t);var n=i(3),c=i.n(n),s=i(21),r=i.n(s),a=(i(28),i(4)),l=(i(29),i(22)),o=i.n(l),j=i(10),d=i(0),b=function(e){var t=e.inputs,i=e.setInputs,n=e.handleSubmit;function c(e){var n=e.target.name,c=e.target.value;t[n]=c,i(Object(j.a)({},t)),console.log(t)}return Object(d.jsxs)("form",{onSubmit:n,children:[Object(d.jsx)("div",{class:"input-pair",children:Object(d.jsxs)("label",{children:["Search:",Object(d.jsx)("input",{type:"text",name:"query_string",placeholder:"Ex: fruity fun lemon",onChange:c})]})}),Object(d.jsxs)("div",{class:"filter-container",children:[Object(d.jsx)("label",{children:"Filters:"}),Object(d.jsxs)("div",{class:"input-pair",children:[Object(d.jsx)("label",{children:"Base Spirit:"}),Object(d.jsxs)("select",{id:"base_spirit",name:"base_spirit",onChange:c,children:[Object(d.jsx)("option",{value:"nopref",selected:"selected",children:"No Preference"}),Object(d.jsx)("option",{value:"vodka",children:"Vodka"}),Object(d.jsx)("option",{value:"tequila",children:"Tequila"}),Object(d.jsx)("option",{value:"gin",children:"Gin"}),Object(d.jsx)("option",{value:"rum",children:"Rum"}),Object(d.jsx)("option",{value:"whiskey",children:"Whiskey"}),Object(d.jsx)("option",{value:"brandy",children:"Brandy"}),Object(d.jsx)("option",{value:"liqueur",children:"Liqueur"}),Object(d.jsx)("option",{value:"wine",children:"Wine"}),Object(d.jsx)("option",{value:"lowalc",children:"Low Alcohol"})]})]}),Object(d.jsxs)("div",{class:"input-pair",children:[Object(d.jsx)("label",{for:"temp",children:"Temperature: "}),Object(d.jsxs)("select",{name:"temp",id:"temp",onChange:c,children:[Object(d.jsx)("option",{value:"iced",children:"Iced"}),Object(d.jsx)("option",{value:"hot",children:"Hot"}),Object(d.jsx)("option",{value:"nopref",selected:"selected",children:"No Preference"})]})]}),Object(d.jsxs)("div",{class:"input-pair",children:[Object(d.jsx)("label",{for:"season",children:"Season: "}),Object(d.jsxs)("select",{name:"season",id:"season",onChange:c,children:[Object(d.jsx)("option",{value:"winter",children:"Winter"}),Object(d.jsx)("option",{value:"spring",children:"Spring"}),Object(d.jsx)("option",{value:"summer",children:"Summer"}),Object(d.jsx)("option",{value:"fall",children:"Fall"}),Object(d.jsx)("option",{value:"nopref",selected:"selected",children:"No Preference"})]})]})]}),Object(d.jsx)("button",{type:"submit",value:"Submit",children:"Submit"})]})},u=function(e){return Object(d.jsx)("li",{children:Object(d.jsxs)("button",{onClick:function(){e.ViewCocktail(e.name)},children:[Object(d.jsx)("h2",{children:e.name}),Object(d.jsx)("img",{src:e.image_source,alt:"cocktail"}),Object(d.jsx)("p",{children:e.ingredients}),Object(d.jsx)("p",{children:e.rating})]})})},h=function(e){var t=e.cocktails,i=e.ViewCocktail,n=e.isList;return Object(d.jsx)("div",{className:"CocktailList",children:Object(d.jsx)("ul",{className:"list",children:t.map((function(e,t){return Object(d.jsx)(u,{ingredients:e.ingredients,name:e.name,image_source:e.image,rating:e.rating,ViewCocktail:i,isList:n},t)}))})})},O=i(23),x=i.n(O),m=i(9),p=i(8),g=function(e){var t=e.ingredients.replace(/[\[\]']+/g,"").split(",").map((function(e,t){return Object(d.jsx)("li",{children:e},t)})),i="no_data"==e.rating?0:Number(e.rating);return Object(d.jsxs)("div",{className:"Cocktail",children:[Object(d.jsx)("button",{onClick:function(){return e.setIsList(!0)},type:"button",children:Object(d.jsxs)("span",{className:"fa-layers fa-fw",children:[Object(d.jsx)(p.a,{icon:m.a,size:"2x",transform:"down-1 left-1"}),Object(d.jsx)(p.a,{icon:m.a,size:"2x",color:"rgb(242, 253, 230)"})]})}),Object(d.jsx)("div",{className:"Cocktail-layout",children:Object(d.jsxs)("div",{className:"column",children:[Object(d.jsx)("div",{className:"col-item",children:Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"Cocktail_title",children:[Object(d.jsx)("h1",{className:"Cocktail_name",children:e.name}),Object(d.jsxs)("span",{className:"Cocktail_rating",children:[Object(d.jsx)(x.a,{rating:i,starRatedColor:"rgb(228, 104, 61)",numberOfStars:5,starDimension:"14px",starSpacing:"2px",name:"rating"}),"Rating: ",e.rating," \xb7 \u200e",e.num_reviews," reviews"]})]}),Object(d.jsx)("div",{className:"image-container",children:Object(d.jsx)("img",{className:"Cocktail_image",src:e.image_source,alt:"cocktail"})})]})}),Object(d.jsx)("div",{className:"col-item",children:Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"text-box",id:"Ingredients",children:[Object(d.jsx)("h2",{className:"Cocktail_sub_title",children:"Ingredients"}),Object(d.jsx)("ul",{className:"Cocktail_ingredients",children:t})]}),Object(d.jsxs)("div",{className:"text-box",id:"Description",children:[Object(d.jsx)("h2",{className:"Cocktail_sub_title",children:"Description"}),Object(d.jsx)("p",{children:e.description}),Object(d.jsx)("a",{href:e.url,target:"_blank",children:"go to recipe"})]})]})})]})})]})},v=function(e){var t,i=e.cocktails,c=e.isList,s=Object(n.useState)({ingredients:"",description:"",name:"",url:"",image_source:"",rating:0,num_reviews:0}),r=Object(a.a)(s,2),l=r[0],o=r[1],j=Object(n.useState)(c),b=Object(a.a)(j,2),u=b[0],O=b[1];return t=u?Object(d.jsx)(h,{cocktails:i,ViewCocktail:function(e){O(!1);var t=i.find((function(t){return t.name==e}));o(t)},isList:u}):Object(d.jsx)(g,{ingredients:l.ingredients,description:l.description,name:l.name,url:l.url,image_source:l.image,rating:l.rating,num_reviews:l.num_reviews,setIsList:O}),Object(d.jsx)(d.Fragment,{children:t})};var f=function(){var e=Object(n.useState)({temp:"nopref",query_string:"",base_spirit:"nopref",ingredients:[],season:"nopref"}),t=Object(a.a)(e,2),i=t[0],c=t[1],s=Object(n.useState)([]),r=Object(a.a)(s,2),l=r[0],j=r[1],u=Object(n.useState)(!0),h=Object(a.a)(u,2),O=h[0],x=h[1],m=0!=l.length&!O?Object(d.jsx)(v,{cocktails:l,isList:!0}):O?Object(d.jsx)("div",{className:"first-render"}):Object(d.jsx)("div",{className:"no-results",children:"No cocktails found. Try a different search! "});return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("body",{children:Object(d.jsxs)("section",{className:"container",children:[Object(d.jsxs)("div",{className:"left",children:[Object(d.jsx)("h1",{id:"title",children:"What is your cocktail order?"}),Object(d.jsx)("div",{className:"form-container",children:Object(d.jsx)(b,{inputs:i,setInputs:c,handleSubmit:function(e){e.preventDefault(),""===i.query_string&"nopref"===i.temp&"nopref"===i.base_spirit&"nopref"===i.season&&alert("Please enter a search term or filter."),o.a.post("/query",i).then((function(e){console.log(e),console.log("it works!");var t=JSON.parse(e.data.cocktails);x(!1),j(t,(function(){return console.log("results",l)}))}),(function(e){console.log(e)}))}})})]}),Object(d.jsx)("div",{className:"right",children:Object(d.jsx)("div",{className:"results-container",children:m})})]})})})},N=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,57)).then((function(t){var i=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;i(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(f,{})}),document.getElementById("root")),N()}},[[56,1,2]]]);
//# sourceMappingURL=main.7ff651f0.chunk.js.map