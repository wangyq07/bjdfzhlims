(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"873N":function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("ofXK"),a=i("fXoL");let s=(()=>{class e{}return e.\u0275mod=a.Gb({type:e}),e.\u0275inj=a.Fb({factory:function(t){return new(t||e)},imports:[[n.c]]}),e})()},K7LP:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));class n{constructor(e){this.indexService=e,this.auth={};let t=this.indexService.menuChange.subscribe(e=>{this.baseInit(),t.unsubscribe()})}baseInit(){var e,t,i,n,a;this.menu=null===(t=null===(e=this.indexService.auth.user.permissions)||void 0===e?void 0:e.menus)||void 0===t?void 0:t.find(e=>e.router==this.indexService.session.activatedPage),this.actions=null===(n=null===(i=this.indexService.auth.user.permissions)||void 0===i?void 0:i.actions)||void 0===n?void 0:n.filter(e=>{var t;return e.menuId==(null===(t=this.menu)||void 0===t?void 0:t.id)}),null===(a=this.actions)||void 0===a||a.forEach(e=>this.auth[e.code]=!0)}unAuth(e){return!this.auth[e]}}},MOn6:function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var n=i("XNiG"),a=i("3pM9"),s=i("1G5W"),r=i("ofXK"),o=i("fXoL");let c=(()=>{class e{constructor(e,t,i){this.elementRef=e,this.renderer=t,this.doc=i,this.outerHeight=0,this._unSubject=new n.a}ngAfterViewInit(){this.setSubject()}ngOnDestroy(){var e;this._unSubject.next(),this._unSubject.unsubscribe(),null===(e=this._resizeObserver)||void 0===e||e.disconnect()}setSubject(){Object(a.A)(this.container,this.doc.documentElement).pipe(Object(s.a)(this._unSubject)).subscribe(e=>{this._resizeObserver=e.resizeObserver,this.setAdaptionHeight()})}setAdaptionHeight(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}return e.\u0275fac=function(t){return new(t||e)(o.Ib(o.l),o.Ib(o.D),o.Ib(r.e))},e.\u0275dir=o.Db({type:e,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),e})()},iaau:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i("fXoL");let a=(()=>{class e{}return e.\u0275mod=n.Gb({type:e}),e.\u0275inj=n.Fb({factory:function(t){return new(t||e)}}),e})()},sRtM:function(e,t,i){"use strict";i.r(t),i.d(t,"UsersModule",(function(){return M}));var n=i("ofXK"),a=i("tyNb"),s=i("9Dsi"),r=i("vkgz"),o=i("lJxs"),c=i("r3AK"),l=i("wTjX"),d=i("K7LP"),u=i("fXoL"),b=i("qMpK"),h=i("x6Xy"),f=i("1uEr"),p=i("Atug"),v=i("/pOC"),m=i("MOn6"),g=i("hMyc"),y=i("GvSL"),x=i("yO6f"),w=i("kXfN");const O=["tableCom"];function I(e,t){if(1&e){const e=u.Pb();u.Ob(0,"div",10),u.Ob(1,"x-link",11),u.Vb("click",(function(){u.lc(e);const i=t.$row,n=u.Yb();return n.auth.info&&n.action("info",i)})),u.Nb(),u.Ob(2,"x-link",12),u.Vb("click",(function(){u.lc(e);const i=t.$row,n=u.Yb();return n.auth.edit&&n.action("edit",i)})),u.Nb(),u.Ob(3,"x-link",13),u.Vb("click",(function(){u.lc(e);const i=t.$row,n=u.Yb();return n.auth.delete&&n.action("delete",i)})),u.Nb(),u.Nb()}if(2&e){const e=u.Yb();u.yb(1),u.ec("disabled",!e.auth.info),u.yb(1),u.ec("disabled",!e.auth.edit),u.yb(1),u.ec("disabled",!e.auth.delete)}}const k=function(e){return{actions:e}};let N=(()=>{class e extends d.a{constructor(e,t,i,n,a,s,c){super(t),this.service=e,this.indexService=t,this.organization=i,this.router=n,this.activatedRoute=a,this.message=s,this.msgBox=c,this.index=1,this.query={filter:[]},this.data=(e,t,i)=>this.service.getList(e,t,i).pipe(e=>e),this.treeLoading=!0,this.treeData=()=>this.organization.getList(1,Number.MAX_SAFE_INTEGER).pipe(Object(r.a)(()=>this.treeLoading=!1),Object(o.a)(e=>e.list)),this.columns=[{id:"index",label:"\u5e8f\u53f7",width:80,left:0,type:"index"},{id:"actions",label:"\u64cd\u4f5c",width:100,left:80},{id:"account",label:"\u7528\u6237",width:100,left:180,sort:!0},{id:"name",label:"\u59d3\u540d",width:80,sort:!0},{id:"email",label:"\u90ae\u7bb1",flex:1},{id:"phone",label:"\u7535\u8bdd",flex:1}]}action(e,t){var i,n;switch(e){case"add":let a={};this.selected&&(a={selectedId:null===(i=this.selected)||void 0===i?void 0:i.id,selectedLabel:null===(n=this.selected)||void 0===n?void 0:n.label}),this.router.navigate(["./"+e,a],{relativeTo:this.activatedRoute});break;case"info":case"edit":this.router.navigate([`./${e}/${t.id}`],{relativeTo:this.activatedRoute});break;case"delete":this.msgBox.confirm({title:"\u63d0\u793a",content:`\u6b64\u64cd\u4f5c\u5c06\u6c38\u4e45\u5220\u9664\u6b64\u6761\u6570\u636e\uff1a${t.account}\uff0c\u662f\u5426\u7ee7\u7eed\uff1f`,type:"warning",callback:e=>{"confirm"===e&&this.service.delete(t.id).subscribe(e=>{this.tableCom.change(this.index),this.message.success("\u5220\u9664\u6210\u529f\uff01")})}});break;case"tree-info":this.selected=t;let s={field:"id",value:t.id,operation:"=",relation:"organizations"};if(this.query.filter&&0!=this.query.filter.length){let e=this.query.filter.find(e=>"id"===e.field&&"organizations"===e.relation);e?e.value=s.value:this.query.filter=[...this.query.filter,s]}else this.query.filter=[s];this.tableCom.change(1)}}}return e.\u0275fac=function(t){return new(t||e)(u.Ib(s.a),u.Ib(l.a),u.Ib(c.a),u.Ib(a.e),u.Ib(a.a),u.Ib(b.c),u.Ib(h.c))},e.\u0275cmp=u.Cb({type:e,selectors:[["app-users"]],viewQuery:function(e,t){var i;1&e&&u.Bc(O,!0),2&e&&u.ic(i=u.Wb())&&(t.tableCom=i.first)},features:[u.vb],decls:14,vars:16,consts:[[1,"au-inner"],[1,"au-panel","au-tree-left",3,"x-loading"],["au-adaption","","expandedLevel","0",3,"outerHeight","data","nodeHeight","activatedChange"],["treeCom",""],[1,"au-table-right"],["top",""],["type","primary","icon","fto-plus",3,"disabled","click"],["virtualScroll","","loading","",3,"columns","rowHeight","data","size","index","query","bodyHeight","bodyColumnTpl","adaptionHeight","indexChange"],["tableCom",""],["actionsTpl",""],[1,"au-table-actions"],["icon","fto-eye","title","\u67e5\u770b",3,"disabled","click"],["icon","fto-edit","title","\u4fee\u6539",3,"disabled","click"],["icon","fto-trash-2","title","\u5220\u9664",3,"disabled","click"]],template:function(e,t){if(1&e&&(u.Ob(0,"x-inner",0),u.Ob(1,"div",1),u.Ob(2,"h4"),u.wc(3,"\u7ec4\u7ec7\u673a\u6784"),u.Nb(),u.Ob(4,"x-tree",2,3),u.Vb("activatedChange",(function(e){return t.action("tree-info",e)})),u.Nb(),u.Nb(),u.Ob(6,"div",4),u.Ob(7,"au-tool",5),u.Ob(8,"x-button",6),u.Vb("click",(function(){return t.auth.add&&t.action("add")})),u.wc(9,"\u65b0\u589e"),u.Nb(),u.Nb(),u.Ob(10,"x-table",7,8),u.Vb("indexChange",(function(e){return t.index=e})),u.Nb(),u.Nb(),u.Nb(),u.uc(12,I,4,3,"ng-template",null,9,u.vc)),2&e){const e=u.jc(13);u.yb(1),u.ec("x-loading",t.treeLoading),u.yb(3),u.ec("outerHeight",132)("data",t.treeData)("nodeHeight",1.875),u.yb(4),u.ec("disabled",!t.auth.add),u.yb(2),u.ec("columns",t.columns)("rowHeight",35)("data",t.data)("size",20)("index",t.index)("query",t.query)("bodyHeight",100)("bodyColumnTpl",u.gc(14,k,e))("adaptionHeight",138)}},directives:[f.a,p.a,v.a,m.a,g.a,y.a,x.a,w.a],encapsulation:2}),e})();var j=i("zM0U"),z=i("vtiB"),H=i("OUFp"),A=i("ZQZ3");const C=["form"];let S=(()=>{class e{constructor(e,t,i,n,a,s,r,c){this.service=e,this.organization=t,this.roles=i,this.setting=n,this.activatedRoute=a,this.message=s,this.nav=r,this.cdr=c,this.config={labelWidth:"6rem"},this.controls=[{control:"input",id:"account",label:"\u7528\u6237",required:!0,maxlength:16,pattern:/^[A-Za-z0-9]{4,16}$/,message:"\u53ea\u80fd\u5305\u62ec\u6570\u5b57\u3001\u5b57\u6bcd\u7684\u7ec4\u5408\uff0c\u957f\u5ea6\u4e3a4-16\u4f4d"},{control:"input",id:"password",label:"\u5bc6\u7801",type:"password",required:!0,maxlength:16,pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/,message:"\u5bc6\u7801\u4e2d\u5fc5\u987b\u5305\u542b\u5b57\u6bcd\u548c\u6570\u5b57\uff0c\u957f\u5ea6\u4e3a6-16\u4f4d"},{control:"input",id:"name",label:"\u59d3\u540d",required:!0},{control:"find",id:"organizations",label:"\u7ec4\u7ec7\u673a\u6784",required:!0,multiple:!0,treeData:()=>this.organization.getList(1,Number.MAX_SAFE_INTEGER).pipe(Object(o.a)(e=>e.list))},{control:"find",id:"roles",label:"\u89d2\u8272",required:!0,multiple:!0,treeData:()=>this.organization.getList(1,Number.MAX_SAFE_INTEGER).pipe(Object(o.a)(e=>e.list)),tableData:(e,t,i)=>this.roles.getList(e,t,i).pipe(Object(o.a)(e=>{var t;return e.list=null===(t=e.list)||void 0===t?void 0:t.map(e=>(e.label=e.name,e)),e})),tableColumns:[{id:"index",label:"\u5e8f\u53f7",width:80,left:0,type:"index"},{id:"name",label:"\u89d2\u8272\u540d\u79f0",flex:1,sort:!0}],tableRowHeight:35,treeTableConnect:"organizationId"},{control:"input",id:"email",label:"\u90ae\u7bb1"},{control:"input",id:"phone",label:"\u7535\u8bdd"},{control:"input",id:"id",hidden:!0,value:this.setting.guid()}],this.activatedRoute.paramMap.subscribe(e=>{this.id=e.get("id"),this.type=e.get("type"),this.selected={id:e.get("selectedId"),label:e.get("selectedLabel")},this.selected.id&&(this.controls.find(e=>"organizations"===e.id).value=[this.selected])})}get formInvalid(){var e,t;return null===(t=null===(e=this.form)||void 0===e?void 0:e.formGroup)||void 0===t?void 0:t.invalid}get disabled(){return"info"===this.type}ngOnInit(){this.action(this.type)}ngAfterViewInit(){this.cdr.detectChanges()}action(e){switch(e){case"info":this.service.get(this.id).pipe(Object(o.a)(e=>{var t;return e.roles=null===(t=e.roles)||void 0===t?void 0:t.map(e=>(e.label=e.name,e)),e})).subscribe(e=>{this.form.formGroup.patchValue(e)});break;case"edit":this.action("info");break;case"save":if("add"===this.type)this.service.post(this.setForm(this.form.formGroup.value)).subscribe(e=>{this.message.success("\u65b0\u589e\u6210\u529f\uff01"),this.nav.back(!0)});else if("edit"===this.type){var t=this.setForm(this.form.formGroup.value);this.service.put(t).subscribe(e=>{this.message.success("\u4fee\u6539\u6210\u529f\uff01"),this.nav.back(!0)})}break;case"cancel":this.nav.back()}}setForm(e){return this.setFind(e,"organizations","roles"),e}setFind(e,...t){for(let i of t){let t=e[i];e[i]=Array.isArray(t)?t.map(e=>({id:e.id,label:e.label})):[{id:t.id,label:t.label}]}return e}}return e.\u0275fac=function(t){return new(t||e)(u.Ib(s.a),u.Ib(c.a),u.Ib(H.a),u.Ib(j.a),u.Ib(a.a),u.Ib(b.c),u.Ib(z.a),u.Ib(u.h))},e.\u0275cmp=u.Cb({type:e,selectors:[["app-user-detail"]],viewQuery:function(e,t){var i;1&e&&u.Bc(C,!0),2&e&&u.ic(i=u.Wb())&&(t.form=i.first)},decls:9,vars:5,consts:[[1,"au-inner","au-column"],["top",""],[3,"space"],["icon","fto-chevron-left",3,"click"],["icon","fto-save","type","primary",3,"disabled","click"],["au-adaption","","direction","row","labelSuffix",":","labelWidth","6rem","width","24rem","labelAlign","end","span","20","space","2",1,"au-panel","au-overflow-auto",3,"outerHeight","disabled","controls"],["form",""]],template:function(e,t){1&e&&(u.Ob(0,"x-inner",0),u.Ob(1,"au-tool",1),u.Ob(2,"x-buttons",2),u.Ob(3,"x-button",3),u.Vb("click",(function(){return t.action("cancel")})),u.wc(4,"\u8fd4\u56de"),u.Nb(),u.Ob(5,"x-button",4),u.Vb("click",(function(){return!t.formInvalid&&t.action("save")})),u.wc(6," \u4fdd\u5b58 "),u.Nb(),u.Nb(),u.Nb(),u.Jb(7,"x-form",5,6),u.Nb()),2&e&&(u.yb(2),u.ec("space",.5),u.yb(3),u.ec("disabled",t.formInvalid||t.disabled),u.yb(2),u.ec("outerHeight",86)("disabled",t.disabled)("controls",t.controls))},directives:[f.a,g.a,y.c,y.a,A.b,m.a],encapsulation:2,changeDetection:0}),e})();const L=[{path:"",component:N},{path:":type",component:S},{path:":type/:id",component:S}];let q=(()=>{class e{}return e.\u0275mod=u.Gb({type:e}),e.\u0275inj=u.Fb({factory:function(t){return new(t||e)},imports:[[a.i.forChild(L)],a.i]}),e})();var G=i("gjGi"),E=i("873N"),X=i("iaau"),F=i("hHlV");let M=(()=>{class e{}return e.\u0275mod=u.Gb({type:e}),e.\u0275inj=u.Fb({factory:function(t){return new(t||e)},imports:[[n.c,G.a,F.a,E.a,X.a,q]]}),e})()}}]);