(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"873N":function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var s=i("ofXK"),n=i("fXoL");let r=(()=>{class e{}return e.\u0275mod=n.Gb({type:e}),e.\u0275inj=n.Fb({factory:function(t){return new(t||e)},imports:[[s.c]]}),e})()},K7LP:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));class s{constructor(e){this.indexService=e,this.auth={};let t=this.indexService.menuChange.subscribe(e=>{this.baseInit(),t.unsubscribe()})}baseInit(){var e,t,i,s,n;this.menu=null===(t=null===(e=this.indexService.auth.user.permissions)||void 0===e?void 0:e.menus)||void 0===t?void 0:t.find(e=>e.router==this.indexService.session.activatedPage),this.actions=null===(s=null===(i=this.indexService.auth.user.permissions)||void 0===i?void 0:i.actions)||void 0===s?void 0:s.filter(e=>{var t;return e.menuId==(null===(t=this.menu)||void 0===t?void 0:t.id)}),null===(n=this.actions)||void 0===n||n.forEach(e=>this.auth[e.code]=!0)}unAuth(e){return!this.auth[e]}}},MOn6:function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var s=i("XNiG"),n=i("3pM9"),r=i("1G5W"),o=i("ofXK"),a=i("fXoL");let c=(()=>{class e{constructor(e,t,i){this.elementRef=e,this.renderer=t,this.doc=i,this.outerHeight=0,this._unSubject=new s.a}ngAfterViewInit(){this.setSubject()}ngOnDestroy(){var e;this._unSubject.next(),this._unSubject.unsubscribe(),null===(e=this._resizeObserver)||void 0===e||e.disconnect()}setSubject(){Object(n.A)(this.container,this.doc.documentElement).pipe(Object(r.a)(this._unSubject)).subscribe(e=>{this._resizeObserver=e.resizeObserver,this.setAdaptionHeight()})}setAdaptionHeight(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}return e.\u0275fac=function(t){return new(t||e)(a.Ib(a.l),a.Ib(a.D),a.Ib(o.e))},e.\u0275dir=a.Db({type:e,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),e})()},iaau:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var s=i("fXoL");let n=(()=>{class e{}return e.\u0275mod=s.Gb({type:e}),e.\u0275inj=s.Fb({factory:function(t){return new(t||e)}}),e})()},v4D5:function(e,t,i){"use strict";i.r(t),i.d(t,"RolediscountModule",(function(){return H}));var s=i("ofXK"),n=i("tyNb"),r=i("vkgz"),o=i("lJxs"),a=i("wTjX"),c=i("K7LP"),d=i("BzWU"),l=i("r3AK"),u=i("OUFp"),h=i("eIN6"),b=i("fXoL"),f=i("qMpK"),p=i("x6Xy"),m=i("GvSL"),v=i("1uEr"),g=i("Atug"),y=i("/pOC"),x=i("MOn6"),w=i("hMyc"),O=i("ZQZ3");const I=["treeCom"],j=["form"],G=[{path:"",component:(()=>{class e extends c.a{constructor(e,t,i,s,n,a,c){super(t),this.service=e,this.indexService=t,this.message=i,this.msgBox=s,this.roleservice=n,this.organization=a,this.cd=c,this.type="info",this.treeLoading=!0,this.data=()=>this.service.getdiscounts().pipe(Object(r.a)(()=>this.treeLoading=!1),Object(o.a)(e=>e)),this.treeActions=[{id:"add",label:"\u65b0\u589e",icon:"fto-plus-square",handler:e=>{this.action("add",e)}},{id:"edit",label:"\u4fee\u6539",icon:"fto-edit",handler:e=>{this.action("edit",e)}},{id:"delete",label:"\u5220\u9664",icon:"fto-trash-2",handler:e=>{this.action("delete",e)}}],this.controls=[{control:"find",id:"role",label:"\u89d2\u8272",required:!0,multiple:!1,treeData:()=>this.organization.getList(1,Number.MAX_SAFE_INTEGER).pipe(Object(o.a)(e=>e.list)),tableData:(e,t,i)=>this.roleservice.getList(e,t,i).pipe(Object(o.a)(e=>{var t;return e.list=null===(t=e.list)||void 0===t?void 0:t.map(e=>(e.label=e.name,e)),e})),tableColumns:[{id:"index",label:"\u5e8f\u53f7",width:80,left:0,type:"index"},{id:"name",label:"\u89d2\u8272\u540d\u79f0",flex:1,sort:!0}],tableRowHeight:35,treeTableConnect:"organizationId"},{control:"input",id:"pid",hidden:!0},{control:"input",id:"label",hidden:!0},{control:"input",required:!0,label:"\u6298\u6263\u503c",id:"discount"}]}get disabled(){return!["edit","add","add-root"].includes(this.type)}addflow(){}ngAfterViewInit(){this.cd.detectChanges()}setformvalue(e){var t;this.service.getrolediscountbyid(e.pid+"",(null===(t=e.role)||void 0===t?void 0:t.id)+"").subscribe(t=>{var i,s,n=t;null!=n?(n.label=null===(i=n.role)||void 0===i?void 0:i.name,this.form.formGroup.patchValue({lable:n.label,pid:n.pid,role:{label:n.label,id:null===(s=n.role)||void 0===s?void 0:s.id},discount:n.discount})):this.form.formGroup.setValue({label:"",pid:e.id,discount:1,role:null})})}ngOnInit(){this.treeActions=this.treeActions.filter(e=>this.auth[e.id])}action(e,t){this.cd.detectChanges();var i=this.form.controls.findIndex(e=>"role"==e.id);switch(-1!=i&&(this.form.controls[i].hidden=!0),e){case"info":this.type=e,this.selected=t,this.setformvalue(t);break;case"add":null==t.pid&&(this.type=e,this.selected=t,-1!=i&&(this.form.controls[i].hidden=!1),this.form.formGroup.patchValue({id:d.a.JsNewGuid(),pid:t.id,role:null,discount:1}));break;case"edit":if(this.type=e,null==t.pid){this.action("info",t);break}this.setformvalue(t),this.form.formGroup.reset();break;case"delete":if(null==t.pid){this.message.error(`\u4e0d\u80fd\u5220\u9664:${t.label},\u56e0\u4e3a\u5b83\u662f\u6839\u8282\u70b9`);break}this.msgBox.confirm({title:"\u63d0\u793a",content:`\u6b64\u64cd\u4f5c\u5c06\u6c38\u4e45\u5220\u9664\u6b64\u6761\u6570\u636e\uff1a${t.label}\uff0c\u662f\u5426\u7ee7\u7eed\uff1f`,type:"warning",callback:e=>{"confirm"===e&&this.service.deleterolediscount(t).subscribe(e=>{this.treeCom.removeNode(t),this.form.formGroup.reset(),this.message.success("\u5220\u9664\u6210\u529f\uff01")})}});break;case"save":"add"===this.type||"add-root"===this.type?this.service.addrolediscount(this.form.formGroup.value).subscribe(e=>{this.type="info",this.treeCom.addNode(e),this.message.success("\u65b0\u589e\u6210\u529f\uff01")}):"edit"===this.type&&this.service.updaterolediscount(this.form.formGroup.value).subscribe(e=>{this.type="info",this.treeCom.updateNode(t,e),this.message.success("\u4fee\u6539\u6210\u529f\uff01")});break;case"cancel":this.type="info",this.form.formGroup.reset()}}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(h.a),b.Ib(a.a),b.Ib(f.c),b.Ib(p.c),b.Ib(u.a),b.Ib(l.a),b.Ib(b.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["app-rolediscount"]],viewQuery:function(e,t){var i;1&e&&(b.Cc(I,!0),b.Cc(j,!0)),2&e&&(b.jc(i=b.Wb())&&(t.treeCom=i.first),b.jc(i=b.Wb())&&(t.form=i.first))},features:[b.vb],decls:14,vars:11,consts:[[1,"au-inner"],[1,"au-panel","au-tree-left",2,"width","22rem",3,"x-loading"],["au-adaption","","expandedLevel","0",3,"outerHeight","data","activatedId","nodeHeight","actions","activatedChange"],["treeCom",""],[1,"au-form-right"],["top",""],[3,"space"],["icon","fto-save","type","primary","plain","",3,"disabled","click"],["au-adaption","","direction","row","labelSuffix",":","labelWidth","6rem","width","24rem","labelAlign","end","span","20","space","2",1,"au-panel","au-overflow-auto",3,"outerHeight","disabled","controls"],["form",""]],template:function(e,t){if(1&e){const e=b.Pb();b.Ob(0,"x-inner",0),b.Ob(1,"div",1),b.Ob(2,"h4"),b.Ob(3,"span"),b.xc(4,"\u89d2\u8272\u6298\u6263"),b.Nb(),b.Nb(),b.Ob(5,"x-tree",2,3),b.Vb("activatedChange",(function(e){return t.action("info",e)})),b.Nb(),b.Nb(),b.Ob(7,"div",4),b.Ob(8,"au-tool",5),b.Ob(9,"x-buttons",6),b.Ob(10,"x-button",7),b.Vb("click",(function(){return b.mc(e),!b.kc(13).formGroup.invalid&&!t.disabled&&t.action("save",t.selected)})),b.xc(11," \u4fdd\u5b58 "),b.Nb(),b.Nb(),b.Nb(),b.Jb(12,"x-form",8,9),b.Nb(),b.Nb()}if(2&e){const e=b.kc(13);b.yb(1),b.ec("x-loading",t.treeLoading),b.yb(4),b.ec("outerHeight",131)("data",t.data)("activatedId",t.activatedId)("nodeHeight",1.875)("actions",t.treeActions),b.yb(4),b.ec("space",.5),b.yb(1),b.ec("disabled",e.formGroup.invalid||t.disabled),b.yb(2),b.ec("outerHeight",86)("disabled",t.disabled)("controls",t.controls)}},directives:[v.a,g.a,y.a,x.a,w.a,m.c,m.a,O.b],styles:[""]}),e})()}];let N=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(t){return new(t||e)},imports:[[n.i.forChild(G)],n.i]}),e})();var C=i("gjGi"),S=i("873N"),k=i("iaau"),A=i("hHlV");let H=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(t){return new(t||e)},imports:[[s.c,N,C.a,S.a,k.a,A.a]]}),e})()}}]);