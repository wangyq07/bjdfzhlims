!function(){function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,i){if(!t)return;if("string"==typeof t)return e(t,i);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(t,i)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function n(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,n=r(t);if(e){var a=r(this).constructor;i=Reflect.construct(n,arguments,a)}else i=n.apply(this,arguments);return o(this,i)}}function o(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,i){return e&&c(t.prototype,e),i&&c(t,i),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{K7LP:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n=function(){function t(e){var i=this;a(this,t),this.indexService=e,this.auth={};var n=this.indexService.menuChange.subscribe((function(t){i.baseInit(),n.unsubscribe()}))}return u(t,[{key:"baseInit",value:function(){var t,e,i,n,o,r=this;this.menu=null===(e=null===(t=this.indexService.auth.user.permissions)||void 0===t?void 0:t.menus)||void 0===e?void 0:e.find((function(t){return t.router==r.indexService.session.activatedPage})),this.actions=null===(n=null===(i=this.indexService.auth.user.permissions)||void 0===i?void 0:i.actions)||void 0===n?void 0:n.filter((function(t){var e;return t.menuId==(null===(e=r.menu)||void 0===e?void 0:e.id)})),null===(o=this.actions)||void 0===o||o.forEach((function(t){return r.auth[t.code]=!0}))}},{key:"unAuth",value:function(t){return!this.auth[t]}}]),t}()},OewA:function(e,o,r){"use strict";r.r(o),r.d(o,"InputproductModule",(function(){return W}));var c=r("ofXK"),l=r("tyNb"),s=r("vkgz"),d=r("lJxs"),b=r("wTjX"),f=r("OROO"),h=r("K7LP"),p=r("BzWU"),v=r("K7Nf"),y=r("fXoL"),m=r("qMpK"),g=r("x6Xy"),N=r("l5Yv"),w=r("SfH5"),x=r("GvSL"),O=r("P0lq"),q=r("1uEr"),k=r("Atug"),j=r("kXfN"),C=r("/pOC"),S=r("MOn6"),I=r("hMyc"),M=r("3Pt+"),A=r("yO6f"),H=["tableCom"],P=["selqual"],V=["treeCom"];function B(t,e){if(1&t){var i=y.Pb();y.Ob(0,"div",21),y.Ob(1,"x-link",22),y.Vb("click",(function(){y.lc(i);var t=e.$row,n=y.Yb();return!n.disabled&&n.auth.delete&&n.action("delete",t)})),y.Nb(),y.Nb()}if(2&t){var n=y.Yb();y.yb(1),y.ec("disabled",!n.auth.delete||n.disabled)}}var J,L,R,_=function(t){return{actions:t}},E=[{path:"",component:(J=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,e);var o=n(r);function r(t,e,i,n){var c;return a(this,r),(c=o.call(this,t)).indexService=t,c.productService=e,c.message=i,c.msgBox=n,c.index=1,c.query={filter:[]},c.data=[],c.activatedId="",c.treeLoading=!0,c.treeData=function(){return c.productService.getproduct().pipe(Object(s.a)((function(){return c.treeLoading=!1})),Object(d.a)((function(t){return t.list})))},c.inputtestcount="none",c.columns=[{id:"index",label:"\u5e8f\u53f7",width:80,type:"index"},{id:"actions",label:"\u64cd\u4f5c",width:100},{id:"testprojectname",label:"\u9879\u76ee",width:100,sort:!0},{id:"standardname",label:"\u6807\u51c6"},{id:"methodname",label:"\u65b9\u6cd5"}],c.total=0,c.qvisible=!1,c.type="info",c.currentNode={},c.treeActions=[{id:"edit",label:"\u4fee\u6539",icon:"fto-edit",handler:function(t){c.treeaction("edit",t)}},{id:"delete",label:"\u5220\u9664",icon:"fto-trash-2",handler:function(t){c.treeaction("delete",t)}}],c.invalidstring="",c.invalidvisible="none",c}return u(r,[{key:"quaconfirm",value:function(){for(var t=this,e=[],i=0;i<this.qualificationcomponent.selquali.length;i++)e.push({id:p.a.JsNewGuid(),productid:this.currentNode.id+"",qualificationid:this.qualificationcomponent.selquali[i].id+"",testprojectname:this.qualificationcomponent.selquali[i].testproject,methodname:this.qualificationcomponent.selquali[i].methodname,standardprice:this.qualificationcomponent.selquali[i].price,standardname:this.qualificationcomponent.selquali[i].standardname});this.data=[],this.currentNode.testprojects=[],e.map((function(e){var i;null===(i=t.currentNode.testprojects)||void 0===i||i.push(e),t.data.push(e)})),this.total=this.data.length}},{key:"treeaction",value:function(t,e){var i=this;switch(t){case"info":this.type=t,null!=e&&(this.selected=e,this.currentNode=e,this.data=null!=e.testprojects?e.testprojects:[]);break;case"add-root":this.type=t,this.data=[],this.currentNode={id:p.a.JsNewGuid(),pid:void 0,label:"",testprojects:this.data};break;case"edit":this.treeaction("info",e),this.type=t;break;case"delete":this.msgBox.confirm({title:"\u63d0\u793a",content:"\u6b64\u64cd\u4f5c\u5c06\u6c38\u4e45\u5220\u9664\u6b64\u6761\u6570\u636e\uff1a".concat(null==e?void 0:e.label,"\uff0c\u662f\u5426\u7ee7\u7eed\uff1f"),type:"warning",callback:function(t){"confirm"===t&&null!=e&&i.productService.deleteproduct(e.id).subscribe((function(t){null!=e&&(i.treeCom.removeNode(e),i.message.success("\u5220\u9664\u6210\u529f\uff01"))}))}});break;case"save":"add-root"===this.type?this.productService.addproduct(this.currentNode).subscribe((function(t){i.type="info",i.treeCom.addNode(t),i.message.success("\u65b0\u589e\u6210\u529f\uff01")})):"edit"===this.type&&this.productService.updateproduct(this.currentNode).subscribe((function(t){i.type="info",i.treeCom.updateNode(i.currentNode,i.currentNode),i.message.success("\u4fee\u6539\u6210\u529f\uff01")}));break;case"cancel":this.type="info"}}},{key:"action",value:function(e,i){var n=this;switch(e){case"add":this.qvisible=!0,this.qualificationcomponent.selquali=[],this.data.forEach((function(t){n.qualificationcomponent.selquali.push({id:Number(t.qualificationid),testproject:t.testprojectname,testcount:1})})),this.qualificationcomponent.refreshdata();break;case"delete":this.deleteprojectmethod((null==i?void 0:i.id)+"",this.data),this.data=t(this.data)}}},{key:"deleteprojectmethod",value:function(t,e){var i=null==e?void 0:e.findIndex((function(e){return e.id===t}));null==e||e.splice(Number(i),1)}},{key:"disabled",get:function(){return"info"==this.type}},{key:"invalidsave",get:function(){return this.invalidvisible="none",this.invalidstring="",null==this.currentNode||null==this.currentNode.label||""==this.currentNode.label?(this.invalidvisible="inline",this.invalidstring="\u540d\u79f0\u4e3a\u7a7a",!0):(null==this.currentNode||null==this.currentNode.testprojects||this.currentNode.testprojects.length<=1)&&(this.invalidvisible="inline",this.invalidstring="\u68c0\u6d4b\u9879\u76ee\u4e3a\u7a7a",!0)}}]),r}(h.a),J.\u0275fac=function(t){return new(t||J)(y.Ib(b.a),y.Ib(v.a),y.Ib(m.c),y.Ib(g.c))},J.\u0275cmp=y.Cb({type:J,selectors:[["app-inputproduct"]],viewQuery:function(t,e){var i;1&t&&(y.Bc(H,!0),y.Bc(P,!0),y.Bc(V,!0)),2&t&&(y.ic(i=y.Wb())&&(e.tableCom=i.first),y.ic(i=y.Wb())&&(e.qualificationcomponent=i.first),y.ic(i=y.Wb())&&(e.treeCom=i.first))},features:[y.vb],decls:37,vars:34,consts:[["width","80%","height","50%","placement","top",3,"visible","backdropClose","hasBackdrop","visibleChange","confirm"],["dialogqulification",""],[2,"width","100%","height","100%",3,"modify","tablespan","treespan","inputtestcount"],["selqual",""],[1,"au-inner"],[1,"au-panel","au-tree-left",2,"width","22rem",3,"x-loading"],["icon","fto-plus","title","\u589e\u52a0\u6839\u8282\u70b9",3,"click"],["au-adaption","","expandedLevel","0",3,"outerHeight","data","activatedId","nodeHeight","actions","activatedChange"],["treeCom",""],[1,"au-table-right"],["top",""],["span","4"],["type","primary","icon","fto-plus","plain","",3,"disabled","click"],["type","primary","icon","fto-save","plain","",3,"disabled","click"],[2,"color","crimson","font-size","10pt"],[2,"height","20px"],["label","\u4ea7\u54c1\u540d\u79f0","direction","row",3,"readonly","ngModel","ngModelChange"],["label","\u6253\u5305\u4ef7","direction","row",3,"readonly","ngModel","ngModelChange"],["virtualScroll","","loading","",3,"columns","rowHeight","data","total","size","index","query","bodyHeight","bodyColumnTpl","adaptionHeight","indexChange"],["tableCom",""],["actionsTpl",""],[1,"au-table-actions"],["icon","fto-trash-2","title","\u5220\u9664",3,"disabled","click"]],template:function(t,e){if(1&t&&(y.Ob(0,"x-dialog",0,1),y.Vb("visibleChange",(function(t){return e.qvisible=t}))("confirm",(function(){return e.quaconfirm()})),y.Jb(2,"app-qualification",2,3),y.Nb(),y.Ob(4,"x-inner",4),y.Ob(5,"div",5),y.Ob(6,"h4"),y.Ob(7,"span"),y.wc(8,"\u4ea7\u54c1\u6811"),y.Nb(),y.Ob(9,"x-link",6),y.Vb("click",(function(){return e.treeaction("add-root",e.selected)})),y.Nb(),y.Nb(),y.Ob(10,"x-tree",7,8),y.Vb("activatedChange",(function(t){return e.treeaction("info",t)})),y.Nb(),y.Nb(),y.Ob(12,"div",9),y.Ob(13,"x-row"),y.Ob(14,"au-tool",10),y.Ob(15,"x-row"),y.Ob(16,"x-col",11),y.Ob(17,"x-button",12),y.Vb("click",(function(){return!e.disabled&&e.auth.add&&e.action("add")})),y.wc(18,"\u6dfb\u52a0\u9879\u76ee"),y.Nb(),y.Nb(),y.Ob(19,"x-col",11),y.Ob(20,"x-button",13),y.Vb("click",(function(){return!e.invalidsave&&!e.disabled&&e.auth.add&&e.treeaction("save")})),y.wc(21,"\u4fdd\u5b58"),y.Nb(),y.Nb(),y.Ob(22,"x-col",11),y.Ob(23,"div",14),y.wc(24),y.Nb(),y.Nb(),y.Nb(),y.Nb(),y.Nb(),y.Jb(25,"x-row",15),y.Ob(26,"x-row"),y.Ob(27,"x-col",11),y.Ob(28,"x-input",16),y.Vb("ngModelChange",(function(t){return e.currentNode.label=t})),y.Nb(),y.Nb(),y.Ob(29,"x-col",11),y.Ob(30,"x-input",17),y.Vb("ngModelChange",(function(t){return e.currentNode.price=t})),y.Nb(),y.Nb(),y.Nb(),y.Jb(31,"x-row",15),y.Ob(32,"x-row"),y.Ob(33,"x-table",18,19),y.Vb("indexChange",(function(t){return e.index=t})),y.Nb(),y.Nb(),y.Nb(),y.Nb(),y.uc(35,B,2,1,"ng-template",null,20,y.vc)),2&t){var i=y.jc(36);y.ec("visible",e.qvisible)("backdropClose",!1)("hasBackdrop",!1),y.yb(2),y.ec("modify",1)("tablespan",15)("treespan",5)("inputtestcount",e.inputtestcount),y.yb(3),y.ec("x-loading",e.treeLoading),y.yb(5),y.ec("outerHeight",131)("data",e.treeData)("activatedId",e.activatedId)("nodeHeight",1.875)("actions",e.treeActions),y.yb(7),y.ec("disabled",!e.auth.add||e.disabled),y.yb(3),y.ec("disabled",!e.auth.add||e.disabled||e.invalidsave),y.yb(3),y.rc("display",e.invalidvisible),y.yb(1),y.xc(e.invalidstring),y.yb(4),y.ec("readonly",e.disabled)("ngModel",e.currentNode.label),y.yb(2),y.ec("readonly",e.disabled)("ngModel",e.currentNode.price),y.yb(3),y.ec("columns",e.columns)("rowHeight",35)("data",e.data)("total",e.total)("size",20)("index",e.index)("query",e.query)("bodyHeight",100)("bodyColumnTpl",y.gc(32,_,i))("adaptionHeight",138)}},directives:[N.a,f.a,q.a,k.a,j.a,C.a,S.a,w.c,I.a,w.a,x.a,O.a,M.q,M.t,A.a],styles:[""]}),J)}],T=((L=function t(){a(this,t)}).\u0275mod=y.Gb({type:L}),L.\u0275inj=y.Fb({factory:function(t){return new(t||L)},imports:[[l.i.forChild(E)],l.i]}),L),G=r("gjGi"),z=r("hHlV"),K=r("aMyR"),X=r("873N"),D=r("iaau"),W=((R=function t(){a(this,t)}).\u0275mod=y.Gb({type:R}),R.\u0275inj=y.Fb({factory:function(t){return new(t||R)},imports:[[c.c,G.a,z.a,K.a,X.a,D.a,w.b,O.b,C.b,x.b,A.b,N.b,T]]}),R)}}])}();