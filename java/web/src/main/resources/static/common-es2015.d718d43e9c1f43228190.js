(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{GTjD:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var i=o("bRdP"),r=o("NtM8"),n=o("fXoL");let s=(()=>{class t extends i.a{constructor(t){super(t,{controller:{name:"samples",servicetype:"businessprocess"}}),this.http=t}supplimentupdatesamples(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/supplimentupdatesamples",{sampledatas:t},null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}getsamplestandardprice(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getsamplestandardprice",{testprojects:t},null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(r.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},IOW9:function(t,e,o){"use strict";o.d(e,"a",(function(){return N}));var i=o("M9h8"),r=o("vkgz"),n=o("lJxs"),s=o("3Pt+"),a=o("3pM9"),c=o("K7LP"),l=o("wTjX"),d=o("fXoL"),u=o("tyNb"),p=o("qMpK"),v=o("x6Xy"),h=o("1uEr"),b=o("Atug"),f=o("kXfN"),m=o("/pOC"),y=o("MOn6"),g=o("hMyc"),w=o("GvSL"),x=o("ZQZ3");const k=["treeCom"];let N=(()=>{class t extends c.a{constructor(t,e,o,i,a,c){super(e),this.service=t,this.indexService=e,this.router=o,this.activatedRoute=i,this.message=a,this.msgBox=c,this.formGroup=new s.j({}),this.type="info",this.treeLoading=!0,this.data=()=>this.service.getList(1,Number.MAX_SAFE_INTEGER,{sort:[{field:"pid",value:"asc"},{field:"sort",value:"asc"}]}).pipe(Object(r.a)(()=>this.treeLoading=!1),Object(n.a)(t=>t.list)),this.treeActions=[{id:"add",label:"\u65b0\u589e",icon:"fto-plus-square",handler:t=>{this.action("add",t)}},{id:"edit",label:"\u4fee\u6539",icon:"fto-edit",handler:t=>{this.action("edit",t)}},{id:"actions",label:"\u64cd\u4f5c\u8bbe\u7f6e",icon:"fto-list",handler:t=>{this.action("actions",t)}},{id:"delete",label:"\u5220\u9664",icon:"fto-trash-2",handler:t=>{this.action("delete",t)}}],this.controls=[{controls:[{control:"input",id:"label",label:"\u540d\u79f0",required:!0},{control:"input",id:"icon",label:"\u56fe\u6807"},{control:"input",id:"router",label:"\u8def\u7531"},{control:"input",id:"sort",label:"\u987a\u5e8f"}]},{hidden:!0,controls:[{control:"input",id:"id"},{control:"input",id:"pid"}]}]}get disabled(){return!["edit","add","add-root"].includes(this.type)}ngOnInit(){this.treeActions=this.treeActions.filter(t=>this.auth[t.id])}action(t,e){switch(t){case"info":this.type=t,this.selected=e,this.service.get(null==e?void 0:e.id).subscribe(t=>{this.formGroup.patchValue(t)});break;case"add":this.type=t,this.selected=e,this.formGroup.reset(),this.formGroup.patchValue({id:Object(a.M)(),pid:e.id,type:"department"});break;case"add-root":this.type=t,this.formGroup.reset(),this.formGroup.patchValue({id:Object(a.M)(),pid:null,type:""});break;case"edit":this.type=t,this.service.get(null==e?void 0:e.id).subscribe(t=>{this.formGroup.patchValue(t)});break;case"delete":this.msgBox.confirm({title:"\u63d0\u793a",content:`\u6b64\u64cd\u4f5c\u5c06\u6c38\u4e45\u5220\u9664\u6b64\u6761\u6570\u636e\uff1a${e.label}\uff0c\u662f\u5426\u7ee7\u7eed\uff1f`,type:"warning",callback:t=>{"confirm"===t&&this.service.delete(e.id).subscribe(t=>{this.treeCom.removeNode(e),this.formGroup.reset(),this.message.success("\u5220\u9664\u6210\u529f\uff01")})}});break;case"save":"add"===this.type||"add-root"===this.type?this.service.post(this.formGroup.value).subscribe(t=>{this.type="info",this.treeCom.addNode(t),this.message.success("\u65b0\u589e\u6210\u529f\uff01")}):"edit"===this.type&&this.service.put(this.formGroup.value).subscribe(t=>{this.type="info",this.treeCom.updateNode(e,this.formGroup.value),this.message.success("\u4fee\u6539\u6210\u529f\uff01")});break;case"cancel":this.type="info",this.formGroup.reset();break;case"actions":this.router.navigate(["./actions/"+e.id],{relativeTo:this.activatedRoute})}}}return t.\u0275fac=function(e){return new(e||t)(d.Ib(i.b),d.Ib(l.a),d.Ib(u.e),d.Ib(u.a),d.Ib(p.c),d.Ib(v.c))},t.\u0275cmp=d.Cb({type:t,selectors:[["app-menus"]],viewQuery:function(t,e){var o;1&t&&d.Cc(k,!0),2&t&&d.jc(o=d.Wb())&&(e.treeCom=o.first)},features:[d.vb],decls:14,vars:12,consts:[[1,"au-inner"],[1,"au-panel","au-tree-left",2,"width","22rem",3,"x-loading"],["icon","fto-plus","title","\u589e\u52a0\u6839\u8282\u70b9",3,"click"],["au-adaption","","expandedLevel","0",3,"outerHeight","data","activatedId","nodeHeight","actions","activatedChange"],["treeCom",""],[1,"au-form-right"],["top",""],[3,"space"],["icon","fto-save","type","primary",3,"disabled","click"],["au-adaption","","direction","row","labelSuffix",":","labelWidth","6rem","width","24rem","labelAlign","end","span","20","space","2",1,"au-panel","au-overflow-auto",3,"outerHeight","formGroup","controls","disabled"]],template:function(t,e){1&t&&(d.Ob(0,"x-inner",0),d.Ob(1,"div",1),d.Ob(2,"h4"),d.Ob(3,"span"),d.xc(4,"\u83dc\u5355\u6811"),d.Nb(),d.Ob(5,"x-link",2),d.Vb("click",(function(){return e.action("add-root",e.selected)})),d.Nb(),d.Nb(),d.Ob(6,"x-tree",3,4),d.Vb("activatedChange",(function(t){return e.action("info",t)})),d.Nb(),d.Nb(),d.Ob(8,"div",5),d.Ob(9,"au-tool",6),d.Ob(10,"x-buttons",7),d.Ob(11,"x-button",8),d.Vb("click",(function(){return!e.formGroup.invalid&&!e.disabled&&e.action("save",e.selected)})),d.xc(12," \u4fdd\u5b58 "),d.Nb(),d.Nb(),d.Nb(),d.Jb(13,"x-form",9),d.Nb(),d.Nb()),2&t&&(d.yb(1),d.ec("x-loading",e.treeLoading),d.yb(5),d.ec("outerHeight",131)("data",e.data)("activatedId",e.activatedId)("nodeHeight",1.875)("actions",e.treeActions),d.yb(4),d.ec("space",.5),d.yb(1),d.ec("disabled",e.formGroup.invalid||e.disabled),d.yb(2),d.ec("outerHeight",138)("formGroup",e.formGroup)("controls",e.controls)("disabled",e.disabled))},directives:[h.a,b.a,f.a,m.a,y.a,g.a,w.c,w.a,x.b,s.r,s.k],encapsulation:2,changeDetection:0}),t})()},OUFp:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var i=o("bRdP"),r=o("NtM8"),n=o("fXoL");let s=(()=>{class t extends i.a{constructor(t){super(t,{controller:{name:"roles",servicetype:"userprivilage"}}),this.http=t}getActions(t,e){var o;return this.http.get(`${null===(o=this.option.controller)||void 0===o?void 0:o.name}/actions/${t}/${e}`)}putActions(t,e,o){var i;return this.http.put(`${null===(i=this.option.controller)||void 0===i?void 0:i.name}/actions/${t}/${e}`,{actions:o})}deleteActionmap(t,e){var o;return this.http.delete(`${null===(o=this.option.controller)||void 0===o?void 0:o.name}/actions/${t}/${e}`)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(r.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},eIN6:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var i=o("bRdP"),r=o("NtM8"),n=o("fXoL");let s=(()=>{class t extends i.a{constructor(t){super(t,{controller:{name:"rolediscount",servicetype:"flowprocess"}}),this.http=t}getdiscounts(){var t,e;return this.http.post((null===(t=this.option.controller)||void 0===t?void 0:t.name)+"/getdiscounts",{},null===(e=this.option.controller)||void 0===e?void 0:e.servicetype)}getrolediscountbyid(t,e){var o,i;return this.http.post((null===(o=this.option.controller)||void 0===o?void 0:o.name)+"/getrolediscountbyid",{domainid:null==t?"":t,roleid:null==e?"":e},null===(i=this.option.controller)||void 0===i?void 0:i.servicetype)}addrolediscount(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/addrolediscount",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}updaterolediscount(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updaterolediscount",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}deleterolediscount(t){var e,o;return this.http.delete((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/deleterolediscount",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}getrolediscountvaluebyid(t,e){var o,i;return this.http.post((null===(o=this.option.controller)||void 0===o?void 0:o.name)+"/getrolediscountvaluebyid",{area:t,roles:e},null===(i=this.option.controller)||void 0===i?void 0:i.servicetype)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(r.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},hMyc:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var i=o("fXoL");const r=["*"];let n=(()=>{class t{ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Cb({type:t,selectors:[["au-tool"]],ngContentSelectors:r,decls:1,vars:0,template:function(t,e){1&t&&(i.dc(),i.cc(0))},styles:["au-tool{display:flex;justify-content:space-between}au-tool[top]{margin-bottom:.875rem}au-tool[bottom]{margin-top:.875rem}"],encapsulation:2}),t})()},pDPc:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var i=o("NtM8"),r=o("bRdP"),n=o("fXoL");let s=(()=>{class t extends r.a{constructor(t){super(t,{controller:{name:"roleauditsetting",servicetype:"flowprocess"}}),this.http=t}getallsetings(){var t,e;return this.http.post((null===(t=this.option.controller)||void 0===t?void 0:t.name)+"/getsettings",{},null===(e=this.option.controller)||void 0===e?void 0:e.servicetype)}getsettingbyid(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getsettingbyid",{roleid:t},null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}addsetting(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/addsetting",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}updatesetting(t){var e,o;return this.http.put((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updatesetting",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}deletesetting(t){var e,o;return this.http.delete((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/deletesetting",t,null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}getauditvariable(t,e,o){var i,r;return this.http.post((null===(i=this.option.controller)||void 0===i?void 0:i.name)+"/getauditvariable",{roles:t,audit:e,addvice:o},null===(r=this.option.controller)||void 0===r?void 0:r.servicetype)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(i.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},r3AK:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var i=o("bRdP"),r=o("NtM8"),n=o("fXoL");let s=(()=>{class t extends i.a{constructor(t){super(t,{controller:{name:"organization",servicetype:"userprivilage"}}),this.http=t}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(r.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},x2e1:function(t,e,o){"use strict";o.d(e,"a",(function(){return s})),o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return c})),o.d(e,"d",(function(){return l}));var i=o("NtM8"),r=o("bRdP"),n=o("fXoL");let s=(()=>{class t extends r.a{constructor(t){super(t,{controller:{name:"contactprojects",servicetype:"businessprocess"}}),this.http=t}getprojects(t){var e,o;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getprojects",{id:t},null===(o=this.option.controller)||void 0===o?void 0:o.servicetype)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(i.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),a=(()=>{class t extends r.a{constructor(t){super(t,{controller:{name:"recievesampleforms",servicetype:"businessprocess"}}),this.http=t}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(i.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),c=(()=>{class t extends r.a{constructor(t){super(t,{controller:{name:"seals",servicetype:"businessprocess"}}),this.http=t}gettesttype(){var t;return this.http.post("testtype",{},null===(t=this.option.controller)||void 0===t?void 0:t.servicetype)}getsamplestatus(){var t;return this.http.post("samplestatus",{},null===(t=this.option.controller)||void 0===t?void 0:t.servicetype)}getsamplestore(){var t;return this.http.post("samplestore",{},null===(t=this.option.controller)||void 0===t?void 0:t.servicetype)}getsampleprocess(){var t;return this.http.post("sampleprocess",{},null===(t=this.option.controller)||void 0===t?void 0:t.servicetype)}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(i.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),l=(()=>{class t extends r.a{constructor(t){super(t,{controller:{name:"servicetypes",servicetype:"businessprocess"}}),this.http=t}}return t.\u0275fac=function(e){return new(e||t)(n.Sb(i.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);