(function(e){function t(t){for(var r,a,c=t[0],s=t[1],l=t[2],u=0,h=[];u<c.length;u++)a=c[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return s.p+"static/js/"+({}[e]||e)+"."+{"chunk-2777e08e":"e79f3aef","chunk-2b08adc2":"d9714864","chunk-2d22d746":"6c3c9b5c","chunk-4252beaa":"7acbdf7a","chunk-72280caa":"44c408ae","chunk-dc9baa84":"8240510f"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-2777e08e":1,"chunk-2b08adc2":1,"chunk-4252beaa":1,"chunk-72280caa":1,"chunk-dc9baa84":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="static/css/"+({}[e]||e)+"."+{"chunk-2777e08e":"6a1bb6fe","chunk-2b08adc2":"71df2d13","chunk-2d22d746":"31d6cfe0","chunk-4252beaa":"e6d4fa9a","chunk-72280caa":"7e049dd6","chunk-dc9baa84":"261582f9"}[e]+".css",o=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===o))return t()}var h=document.getElementsByTagName("style");for(c=0;c<h.length;c++){l=h[c],u=l.getAttribute("data-href");if(u===r||u===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],d.parentNode.removeChild(d),n(i)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=c(e);var h=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;h.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",h.name="ChunkLoadError",h.type=r,h.request=a,n[1](h)}o[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var h=0;h<l.length;h++)t(l[h]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"3bf4":function(e,t,n){},4280:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.wrapClass,attrs:{id:"app"}},[n("router-view"),n("div",{attrs:{id:"app_bg_layer"}})],1)},o=[],i={computed:{wrapClass:function(){var e=this.$store.getters.getTheme;return["theme-"+String(e).toLowerCase()]}}},c=i,s=(n("7c55"),n("2877")),l=Object(s["a"])(c,a,o,!1,null,null,null),u=l.exports,h=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"main"}},[n("div",{staticClass:"mr-left"},[n("sideBar")],1),n("div",{staticClass:"mr-right"},[n("myHeader",{attrs:{hasBorder:!0}}),n("div",{attrs:{id:"routeWrap"}},[n("router-view")],1)],1)])},f=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mr-sidebar"},[n("div",[n("div",{staticClass:"mr-avatar"}),n("p",{staticClass:"mr-name"},[e._v(e._s(e.$t("myName")))]),n("p",{staticClass:"mr-position"},[e._v(e._s(e.$t("myPosition")))]),n("ul",{staticClass:"mr-contact-ul"},[n("li",[n("Icon",{attrs:{type:"ios-mail"}}),n("span",[e._v("sa612250@mail.ustc.edu.cn")])],1),n("li",[n("i",{staticClass:"fa fa-map-marker"}),n("span",[e._v(e._s(e.$t("myPlace")))])]),e._m(0),e._m(1),n("li",[n("i",{staticClass:"fa fa-heart"}),n("span",[e._v(e._s(e.$t("marrige")))])])])]),n("div",[n("ul",{staticClass:"mr-link-list"},[n("li",[n("a",{attrs:{href:"https://github.com/David-Shi-1989",target:"_blank"}},[n("Icon",{attrs:{type:"logo-github"}})],1)]),e._m(2),e._m(3),e._m(4)]),e._m(5)]),n("div",{staticClass:"mr-sidebar-bg"})])},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("i",{staticClass:"fa fa-phone"}),n("span",[e._v("+86-15821850559")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("i",{staticClass:"fa fa-birthday-cake"}),n("span",[e._v("1989/08/29")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"https://weibo.com/davidshi1989",target:"_blank"}},[n("i",{staticClass:"fa fa-weibo"})])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"/static/image/wechat-code.jpg",target:"_blank"}},[n("i",{staticClass:"fa fa-wechat"})])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"https://segmentfault.com/u/davidshi",target:"_blank"}},[n("i",{staticClass:"fa fa-wordpress"})])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticClass:"mr-copyright"},[n("i",{staticClass:"fa fa-copyright"}),e._v(" 2020 shiwang.wang"),n("br"),e._v("All Rights Reserved."),n("br"),e._v(" 备案/许可证编号："),n("br"),n("a",{attrs:{href:"https://beian.miit.gov.cn",target:"_blank"}},[e._v("皖ICP备19022141号")])])}],p={},v=p,b=(n("f727"),Object(s["a"])(v,m,g,!1,null,"156ec607",null)),_=b.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"mr-header":!0,"mr-header-border":e.hasBorder}},[n("div",[n("headerMenu")],1),n("div",[n("Dropdown",{attrs:{trigger:"click"},on:{"on-click":e.onLangChange}},[n("a",{directives:[{name:"color",rawName:"v-color",value:e.MIXIN_ColorObj.textContent,expression:"MIXIN_ColorObj.textContent"}],staticClass:"mr-dp-text",attrs:{href:"javascript:void(0)"}},[e._v(" "+e._s(e.getLangStr)+" "),n("Icon",{attrs:{type:"ios-arrow-down"}})],1),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{selected:"zhCN"==e.$store.getters.getLang,name:"zhCN"}},[e._v(e._s(e.$t("lang_cn")))]),n("DropdownItem",{attrs:{selected:"enUS"==e.$store.getters.getLang,name:"enUS"}},[e._v(e._s(e.$t("lang_en")))])],1)],1),n("Dropdown",{attrs:{trigger:"click"},on:{"on-click":e.onThemeChange}},[n("a",{directives:[{name:"color",rawName:"v-color",value:e.MIXIN_ColorObj.textContent,expression:"MIXIN_ColorObj.textContent"}],staticClass:"mr-dp-text",attrs:{href:"javascript:void(0)"}},[e._v(" "+e._s(e.getThemeName)+" "),n("Icon",{attrs:{type:"ios-arrow-down"}})],1),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},e._l(e.$store.getters.getThemeList,(function(t){return n("DropdownItem",{key:t.name,attrs:{selected:e.$store.getters.getTheme==t.name,name:t.name}},[n("span",[e._v(e._s(t.name))]),n("i",{staticClass:"mr-dot",style:{background:t.color,marginLeft:".5rem"}})])})),1)],1)],1)])},w=[],C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"mr-header-menu"},[e._l(e.list,(function(t,r){return n("li",{key:"menu"+r,class:{active:r===e.activeIndex,"mr-menu-item":!0},on:{click:function(n){return e.onMenuItemClick(t,r)}}},[n("span",[e._v(e._s(t.title))])])})),n("li",{staticClass:"mr-header-menu-bg",style:{left:e.bgLeft}})],2)},k=[],j=n("ed08"),x={data:function(){return{activeIndex:0,list:[{title:Object(j["c"])("homePage"),url:"/home"},{title:Object(j["c"])("careerPage"),url:"/career"},{title:Object(j["c"])("projectPage"),url:"/project"},{title:Object(j["c"])("demoPage"),url:"/demo"}]}},created:function(){this.calActiveIndex()},methods:{onMenuItemClick:function(e,t){this.activeIndex=t,this.$router.push({path:e.url})},calActiveIndex:function(){for(var e=this.$route.path,t=0;t<this.list.length;t++)if(this.list[t].url===e)return void(this.activeIndex=t)}},computed:{bgLeft:function(){return 5.5*this.activeIndex+"rem"}},watch:{"$route.path":function(){this.calActiveIndex()}}},$=x,E=(n("725f"),Object(s["a"])($,C,k,!1,null,"5904f25e",null)),O=E.exports,I={props:{hasBorder:{type:Boolean,default:!1}},components:{headerMenu:O},methods:{onLangChange:function(e){this.$store.commit("setLang",e)},onThemeChange:function(e){this.$store.commit("setTheme",e)}},computed:{getLangStr:function(){var e=this.$store.getters.getLang;return"enUS"===e?this.$i18n.t("langEn"):"zhCN"===e?this.$i18n.t("langCn"):"Null"},getThemeName:function(){var e=String(this.$store.getters.getTheme).toLowerCase();return"light"===e?this.$i18n.t("themeLight"):"dark"===e?this.$i18n.t("themeDark"):"NULL"}}},L=I,P=(n("d9bf"),Object(s["a"])(L,y,w,!1,null,"15975d86",null)),N=P.exports,S={components:{sideBar:_,myHeader:N}},M=S,D=(n("8520"),Object(s["a"])(M,d,f,!1,null,"0f728c26",null)),T=D.exports;r["default"].use(h["a"]);var A=[{path:"/about",name:"About",component:function(){return n.e("chunk-2d22d746").then(n.bind(null,"f820"))}},{path:"/",component:T,redirect:"/home",children:[{path:"home",name:"Home",component:function(){return n.e("chunk-2777e08e").then(n.bind(null,"bb51"))}},{path:"career",name:"Career",component:function(){return n.e("chunk-2b08adc2").then(n.bind(null,"96bb"))}},{path:"project",name:"Project",component:function(){return n.e("chunk-4252beaa").then(n.bind(null,"616c"))}},{path:"demo",name:"Demo",component:function(){return n.e("chunk-dc9baa84").then(n.bind(null,"46a4"))}},{path:"demo/log-animate",name:"Demo_Animate",component:function(){return n.e("chunk-72280caa").then(n.bind(null,"70e9"))}}]}],B=new h["a"]({mode:"hash",base:"",routes:A});B.beforeEach((function(e,t,n){var r=document.getElementById("routeWrap");r&&(r.scrollTop=0),n()}));var z=B,R=n("2f62"),U=(n("c975"),n("45fc"),n("b0c0"),{lang:j["b"].get("lang")||"zhCN",theme:{list:[{name:"Light",color:"#ddd"},{name:"Dark",color:"#101b3b"}],current:j["b"].get("theme")||"Light"}}),H={getLang:function(e){return e.lang},getThemeList:function(e){return e.theme.list},getTheme:function(e){return e.theme.current}},X={},F={setLang:function(e,t){["zhCN","enUS"].indexOf(t)>-1?(e.lang=t,j["b"].set("lang",t),window.location.reload()):console.error("unmatched lang ",t)},setTheme:function(e,t){e.theme.list.some((function(e){return e.name===t}))&&(j["b"].set("theme",t),e.theme.current=t)}},J={namespaved:!0,state:U,getters:H,actions:X,mutations:F};r["default"].use(R["a"]);var W=new R["a"].Store({state:{lang:"zhCN"},mutations:{},actions:{},modules:{configModule:J}}),q=n("a925"),Y={myName:"施旺旺",myPosition:"高级前端开发",myPlace:"中国-安徽-合肥",language:"语言",lang_cn:"中文",lang_en:"英文",homePage:"主页",marrige:"已婚",hometown:"安徽-黄山",careerPage:"工作经历",projectPage:"项目经历",demoPage:"作品集",theme:"主题",langEn:"英文",langCn:"中文",themeLight:"浅色",themeDark:"深色",article:"文章",demo:"作品"},K={myName:"David Shi",myPosition:"Advanced Front End Development",myPlace:"Hefei-Anhui-China",language:"Language",lang_cn:"CN",lang_en:"EN",homePage:"Index",marrige:"Married",careerPage:"Career",projectPage:"Project",demoPage:"Demo",theme:"Theme",langEn:"English",langCn:"Chinese",themeLight:"Light",themeDark:"Dark",article:"Article",demo:"Demo"};r["default"].use(q["a"]);var G=W.getters.getLang,Q={zhCN:Y,enUS:K},Z=new q["a"]({locale:G,messages:Q,silentTranslationWarn:!0}),V=n("cffa"),ee=(n("3bf4"),n("f825")),te=n.n(ee),ne=(n("f8ce"),n("1f54"),n("4160"),n("caad"),n("ac1f"),n("466d"),n("5319"),n("159b"),["primary","success","error","text-title","text-content","text-sub","disabled","border","warning","background"]),re={};ne.forEach((function(e){if(e.indexOf("-")>-1){var t=e;e.match(/-\w/g).forEach((function(e){t=t.replace(e,e[1].toUpperCase())})),re[t]=e}else re[e]=e})),r["default"].directive("color",{bind:function(e,t,n){var r=t.value;ne.includes(r)?e.style.color="var(--color-".concat(r,")"):console.error("unknow color ",r)}}),r["default"].mixin({data:function(){return{MIXIN_ColorObj:re}}}),r["default"].config.productionTip=!1,r["default"].use(te.a),r["default"].use(Z),r["default"].prototype.$gsap=V["a"],window.vm=new r["default"]({router:z,i18n:Z,store:W,render:function(e){return e(u)}}).$mount("#app")},"725f":function(e,t,n){"use strict";var r=n("9052"),a=n.n(r);a.a},"7c55":function(e,t,n){"use strict";var r=n("2395"),a=n.n(r);a.a},8520:function(e,t,n){"use strict";var r=n("f93b"),a=n.n(r);a.a},9052:function(e,t,n){},c6e9:function(e,t,n){},d9bf:function(e,t,n){"use strict";var r=n("c6e9"),a=n.n(r);a.a},ed08:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));n("4d63"),n("ac1f"),n("25f0"),n("5319");var r=n("53ca"),a={key:"mr-ls",getObj:function(){var e=window.localStorage.getItem(this.key)||"{}";return JSON.parse(e)},get:function(e){var t=this.getObj();return e?t[e]:t},set:function(e,t){var n=this.getObj();n[e]=t,window.localStorage.setItem(this.key,JSON.stringify(n))}};function o(e,t){return t?window.vm.$i18n.t(e,t):window.vm.$i18n.t(e)}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy/MM/dd hh:mm:ss",n=null;return"object"===Object(r["a"])(e)&&e.getFullYear?n=e:"number"===typeof e&&(n=new Date(e)),n.format(t)}Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e},String.prototype.random=function(e,t){for(var n=e||32,r="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",a=r.length,o="",i=0;i<n;i++)o+=r.charAt(Math.floor(Math.random()*a));return o}},f727:function(e,t,n){"use strict";var r=n("4280"),a=n.n(r);a.a},f93b:function(e,t,n){}});
//# sourceMappingURL=app.20a39c21.js.map