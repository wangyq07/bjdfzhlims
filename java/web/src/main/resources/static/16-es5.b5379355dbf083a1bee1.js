!function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=c(e);if(t){var r=c(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return o(this,n)}}function o(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"873N":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var i=n("ofXK"),r=n("fXoL"),o=function(){var e=function e(){a(this,e)};return e.\u0275mod=r.Gb({type:e}),e.\u0275inj=r.Fb({factory:function(t){return new(t||e)},imports:[[i.c]]}),e}()},MMwC:function(e,i,o){"use strict";o.r(i),o.d(i,"FlownodeModule",(function(){return z}));var c,u,s,l,f=o("ofXK"),d=o("tyNb"),b=o("vkgz"),p=o("lJxs"),h=o("wTjX"),v=o("bRdP"),m=o("NtM8"),y=o("fXoL"),g=((c=function(e){n(i,e);var t=r(i);function i(e){var n;return a(this,i),(n=t.call(this,e,{controller:{name:"flownodes",servicetype:"flowprocess"}})).http=e,n}return i}(v.a)).\u0275fac=function(e){return new(e||c)(y.Sb(m.a))},c.\u0275prov=y.Eb({token:c,factory:c.\u0275fac,providedIn:"root"}),c),w=o("K7LP"),O=o("M9h8"),k=o("OUFp"),j=o("r3AK"),x=o("TPaT"),I=o("qMpK"),N=o("x6Xy"),G=o("GvSL"),_=o("1uEr"),A=o("Atug"),L=o("kXfN"),C=o("/pOC"),H=o("MOn6"),S=o("hMyc"),E=o("ZQZ3"),P=["treeCom"],X=["form"],M=[{path:"",component:(u=function(e){n(o,e);var i=r(o);function o(e,t,n,r,c,u,s,l,f){var d;return a(this,o),(d=i.call(this,r)).service=e,d.menuservice=t,d.processservice=n,d.indexService=r,d.message=c,d.msgBox=u,d.roleservice=s,d.organization=l,d.cd=f,d.type="info",d.treeLoading=!0,d.data=function(){return d.processservice.getallProcesses().pipe(Object(b.a)((function(){return d.treeLoading=!1})),Object(p.a)((function(e){return e})))},d.treeActions=[{id:"edit",label:"\u4fee\u6539",icon:"fto-edit",handler:function(e){d.action("edit",e)}}],d.controls=[{control:"input",id:"flowid",label:"\u5f53\u524dflowid",hidden:!0},{control:"input",id:"tasknodeid",label:"\u5f53\u524dflowid",hidden:!0},{control:"input",id:"processkey",label:"\u5f53\u524dflowid",hidden:!0},{control:"input",id:"label",label:"\u8282\u70b9\u540d\u79f0",required:!0,readonly:!0,maxlength:20},{control:"find",id:"menu",label:"\u529f\u80fd\u8fde\u63a5",required:!0,multiple:!1,treeData:function(){return d.menuservice.getList(1,Number.MAX_SAFE_INTEGER,{sort:[{field:"pid",value:"asc"},{field:"sort",value:"asc"}]}).pipe(Object(b.a)((function(){return d.treeLoading=!1})),Object(p.a)((function(e){return e.list})))}},{control:"find",id:"roles",label:"\u89d2\u8272",required:!0,multiple:!0,treeData:function(){return d.organization.getList(1,Number.MAX_SAFE_INTEGER).pipe(Object(p.a)((function(e){return e.list})))},tableData:function(e,t,n){return d.roleservice.getList(e,t,n).pipe(Object(p.a)((function(e){var t;return e.list=null===(t=e.list)||void 0===t?void 0:t.map((function(e){return e.label=e.name,e})),e})))},tableColumns:[{id:"index",label:"\u5e8f\u53f7",width:80,left:0,type:"index"},{id:"name",label:"\u89d2\u8272\u540d\u79f0",flex:1,sort:!0}],tableRowHeight:35,treeTableConnect:"organizationId"}],d}return t(o,[{key:"addflow",value:function(){var e=this;this.processservice.deployDiagram("LimsTestProcess").subscribe((function(t){console.log(t),e.processservice.getallProcesses().subscribe((function(t){e.data=t}))}))}},{key:"ngAfterViewInit",value:function(){this.cd.detectChanges(),this.processservice.getallProcesses()}},{key:"setformvalue",value:function(e){var t=this;this.service.getList(1,100,{filter:[{field:"id",value:e.tasknodeid+"",operation:"="},{field:"flowid",value:e.pid+"",operation:"="}]}).subscribe((function(n){var i,r=n;null!=r?(null===(i=r.roles)||void 0===i||i.map((function(e){e.label=e.name})),t.form.formGroup.patchValue(r)):t.form.formGroup.setValue({tasknodeid:e.tasknodeid,label:e.label,flowid:null==e.pid?"":e.pid,processkey:e.processkey,menu:null,roles:[]})}))}},{key:"ngOnInit",value:function(){var e=this;this.treeActions=this.treeActions.filter((function(t){return e.auth[t.id]}))}},{key:"action",value:function(e,t){var n=this;switch(this.cd.detectChanges(),e){case"info":this.type=e,this.selected=t,this.setformvalue(t);break;case"edit":if(null==t.pid){this.action("info",t);break}this.type=e,this.setformvalue(t);break;case"delete":this.msgBox.confirm({title:"\u63d0\u793a",content:"\u6b64\u64cd\u4f5c\u5c06\u6c38\u4e45\u5220\u9664\u6b64\u6761\u6570\u636e\uff1a".concat(t.label,"\uff0c\u662f\u5426\u7ee7\u7eed\uff1f"),type:"warning",callback:function(e){"confirm"===e&&n.service.delete(t.id).subscribe((function(e){n.treeCom.removeNode(t),n.form.formGroup.reset(),n.message.success("\u5220\u9664\u6210\u529f\uff01")}))}});break;case"save":this.service.post(this.form.formGroup.value).subscribe((function(e){n.type="info",n.message.success("\u4fee\u6539\u6210\u529f\uff01")})),console.log(this.form.formGroup.value);break;case"cancel":this.type="info",this.form.formGroup.reset()}}},{key:"disabled",get:function(){return!["edit","add","add-root"].includes(this.type)}}]),o}(w.a),u.\u0275fac=function(e){return new(e||u)(y.Ib(g),y.Ib(O.b),y.Ib(x.a),y.Ib(h.a),y.Ib(I.c),y.Ib(N.c),y.Ib(k.a),y.Ib(j.a),y.Ib(y.h))},u.\u0275cmp=y.Cb({type:u,selectors:[["app-flownode"]],viewQuery:function(e,t){var n;1&e&&(y.Bc(P,!0),y.Bc(X,!0)),2&e&&(y.ic(n=y.Wb())&&(t.treeCom=n.first),y.ic(n=y.Wb())&&(t.form=n.first))},features:[y.vb],decls:15,vars:11,consts:[[1,"au-inner"],[1,"au-panel","au-tree-left",2,"width","22rem",3,"x-loading"],["icon","fto-plus","title","\u66f4\u65b0\u6d41\u7a0b",3,"click"],["au-adaption","","expandedLevel","0",3,"outerHeight","data","activatedId","nodeHeight","actions","activatedChange"],["treeCom",""],[1,"au-form-right"],["top",""],[3,"space"],["icon","fto-save","type","primary","plian","",3,"disabled","click"],["au-adaption","","direction","row","labelSuffix",":","labelWidth","6rem","width","24rem","labelAlign","end","span","20","space","2",1,"au-panel","au-overflow-auto",3,"outerHeight","disabled","controls"],["form",""]],template:function(e,t){if(1&e){var n=y.Pb();y.Ob(0,"x-inner",0),y.Ob(1,"div",1),y.Ob(2,"h4"),y.Ob(3,"span"),y.wc(4,"\u6d41\u7a0b"),y.Nb(),y.Ob(5,"x-link",2),y.Vb("click",(function(){return t.addflow()})),y.Nb(),y.Nb(),y.Ob(6,"x-tree",3,4),y.Vb("activatedChange",(function(e){return t.action("info",e)})),y.Nb(),y.Nb(),y.Ob(8,"div",5),y.Ob(9,"au-tool",6),y.Ob(10,"x-buttons",7),y.Ob(11,"x-button",8),y.Vb("click",(function(){return y.lc(n),!y.jc(14).formGroup.invalid&&!t.disabled&&t.action("save",t.selected)})),y.wc(12," \u4fdd\u5b58 "),y.Nb(),y.Nb(),y.Nb(),y.Jb(13,"x-form",9,10),y.Nb(),y.Nb()}if(2&e){var i=y.jc(14);y.yb(1),y.ec("x-loading",t.treeLoading),y.yb(5),y.ec("outerHeight",131)("data",t.data)("activatedId",t.activatedId)("nodeHeight",1.875)("actions",t.treeActions),y.yb(4),y.ec("space",.5),y.yb(1),y.ec("disabled",i.formGroup.invalid||t.disabled),y.yb(2),y.ec("outerHeight",86)("disabled",t.disabled)("controls",t.controls)}},directives:[_.a,A.a,L.a,C.a,H.a,S.a,G.c,G.a,E.b],styles:[""]}),u)}],R=((s=function e(){a(this,e)}).\u0275mod=y.Gb({type:s}),s.\u0275inj=y.Fb({factory:function(e){return new(e||s)},imports:[[d.i.forChild(M)],d.i]}),s),D=o("gjGi"),T=o("873N"),F=o("iaau"),V=o("hHlV"),z=((l=function e(){a(this,e)}).\u0275mod=y.Gb({type:l}),l.\u0275inj=y.Fb({factory:function(e){return new(e||l)},imports:[[f.c,R,D.a,T.a,F.a,V.a]]}),l)},MOn6:function(e,n,i){"use strict";i.d(n,"a",(function(){return l}));var r=i("XNiG"),o=i("3pM9"),c=i("1G5W"),u=i("ofXK"),s=i("fXoL"),l=function(){var e=function(){function e(t,n,i){a(this,e),this.elementRef=t,this.renderer=n,this.doc=i,this.outerHeight=0,this._unSubject=new r.a}return t(e,[{key:"ngAfterViewInit",value:function(){this.setSubject()}},{key:"ngOnDestroy",value:function(){var e;this._unSubject.next(),this._unSubject.unsubscribe(),null===(e=this._resizeObserver)||void 0===e||e.disconnect()}},{key:"setSubject",value:function(){var e=this;Object(o.A)(this.container,this.doc.documentElement).pipe(Object(c.a)(this._unSubject)).subscribe((function(t){e._resizeObserver=t.resizeObserver,e.setAdaptionHeight()}))}},{key:"setAdaptionHeight",value:function(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}]),e}();return e.\u0275fac=function(t){return new(t||e)(s.Ib(s.l),s.Ib(s.D),s.Ib(u.e))},e.\u0275dir=s.Db({type:e,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),e}()},iaau:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("fXoL"),r=function(){var e=function e(){a(this,e)};return e.\u0275mod=i.Gb({type:e}),e.\u0275inj=i.Fb({factory:function(t){return new(t||e)}}),e}()}}])}();