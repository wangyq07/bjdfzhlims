(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"873N":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var i=n("ofXK"),s=n("fXoL");let c=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(e){return new(e||t)},imports:[[i.c]]}),t})()},MOn6:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("XNiG"),s=n("3pM9"),c=n("1G5W"),o=n("ofXK"),r=n("fXoL");let a=(()=>{class t{constructor(t,e,n){this.elementRef=t,this.renderer=e,this.doc=n,this.outerHeight=0,this._unSubject=new i.a}ngAfterViewInit(){this.setSubject()}ngOnDestroy(){var t;this._unSubject.next(),this._unSubject.unsubscribe(),null===(t=this._resizeObserver)||void 0===t||t.disconnect()}setSubject(){Object(s.A)(this.container,this.doc.documentElement).pipe(Object(c.a)(this._unSubject)).subscribe(t=>{this._resizeObserver=t.resizeObserver,this.setAdaptionHeight()})}setAdaptionHeight(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}return t.\u0275fac=function(e){return new(e||t)(r.Ib(r.l),r.Ib(r.D),r.Ib(o.e))},t.\u0275dir=r.Db({type:t,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),t})()},aMyR:function(t,e,n){"use strict";n.d(e,"a",(function(){return m}));var i=n("ofXK"),s=n("gjGi"),c=n("GvSL"),o=n("oJeN"),r=n("/pOC"),a=n("l5Yv"),b=n("qN0K"),u=n("4h90"),l=n("P0lq"),h=n("Prn+"),d=n("hHlV"),f=n("873N"),g=n("iaau"),p=n("fXoL");let m=(()=>{class t{}return t.\u0275mod=p.Gb({type:t}),t.\u0275inj=p.Fb({factory:function(e){return new(e||t)},imports:[[i.c,s.a,c.b,d.a,f.a,g.a,o.b,r.b,a.b,b.b,u.b,l.b,h.b],i.c]}),t})()},iaau:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var i=n("fXoL");let s=(()=>{class t{}return t.\u0275mod=i.Gb({type:t}),t.\u0275inj=i.Fb({factory:function(e){return new(e||t)}}),t})()},jA2P:function(t,e,n){"use strict";n.r(e),n.d(e,"ContactauditModule",(function(){return G}));var i=n("ofXK"),s=n("tyNb"),c=n("wTjX"),o=n("TPaT"),r=n("pDPc"),a=n("LZRM"),b=n("Puy/"),u=n("K7LP"),l=n("fXoL"),h=n("SfH5"),d=n("GvSL"),f=n("P0lq"),g=n("MOn6"),p=n("yO6f"),m=n("3Pt+");const y=["tablecom"];function O(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.samplename,"")}}function C(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.price,"")}}function w(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.testproject,"")}}function v(t,e){if(1&t&&(l.Mb(0),l.uc(1,w,3,1,"ng-container",19),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.ec("ngForOf",t.testprojects)}}function x(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.methodname,"")}}function N(t,e){if(1&t&&(l.Mb(0),l.uc(1,x,3,1,"ng-container",19),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.ec("ngForOf",t.testprojects)}}function M(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.isextern,"")}}function P(t,e){if(1&t&&(l.Mb(0),l.uc(1,M,3,1,"ng-container",19),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.ec("ngForOf",t.testprojects)}}function _(t,e){if(1&t&&(l.Mb(0),l.wc(1),l.Jb(2,"br"),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.yc(" ",t.testcount,"")}}function j(t,e){if(1&t&&(l.Mb(0),l.uc(1,_,3,1,"ng-container",19),l.Lb()),2&t){const t=e.$implicit;l.yb(1),l.ec("ngForOf",t.testprojects)}}function k(t,e){if(1&t&&(l.Ob(0,"tr"),l.Ob(1,"td",16),l.wc(2),l.Nb(),l.Ob(3,"td",17),l.wc(4),l.Nb(),l.Ob(5,"td",16),l.wc(6),l.Nb(),l.Ob(7,"td",16),l.uc(8,O,3,1,"ng-container",19),l.Nb(),l.Ob(9,"td",17),l.uc(10,C,3,1,"ng-container",19),l.Nb(),l.Ob(11,"td",16),l.uc(12,v,2,1,"ng-container",19),l.Nb(),l.Ob(13,"td",18),l.uc(14,N,2,1,"ng-container",19),l.Nb(),l.Ob(15,"td",17),l.uc(16,P,2,1,"ng-container",19),l.Nb(),l.Ob(17,"td",17),l.uc(18,j,2,1,"ng-container",19),l.Nb(),l.Nb()),2&t){const t=e.$implicit,n=l.Yb();l.yb(2),l.xc(t.projectnumber),l.yb(2),l.xc(t.reportcount),l.yb(2),l.xc(t.domain.label),l.yb(1),l.rc("display",n.showtablecel),l.yb(1),l.ec("ngForOf",t.samples),l.yb(1),l.rc("display",n.showtablecel),l.yb(1),l.ec("ngForOf",t.samples),l.yb(2),l.ec("ngForOf",t.samples),l.yb(2),l.ec("ngForOf",t.samples),l.yb(2),l.ec("ngForOf",t.samples),l.yb(2),l.ec("ngForOf",t.samples)}}const L=[{path:"",component:(()=>{class t extends u.a{constructor(t,e,n,i,s,c,o){super(t),this.indexService=t,this.flowservice=e,this.roleauditservice=n,this.contactservice=i,this.actroute=s,this.router=c,this.globalaudit=o,this.index=1,this.size=1e4,this.total=0,this.query={},this.columns=[{id:"index",label:"\u5e8f\u53f7",width:80,type:"index"},{id:"name",label:"\u4efb\u52a1",width:100,sort:!0},{id:"customername",label:"\u5ba2\u6237",width:150,sort:!0},{id:"preuser",label:"\u524d\u7f6e\u5904\u7406\u4eba",width:200,sort:!0},{id:"createtime",label:"\u521b\u5efa\u65e5\u671f",width:200,sort:!0},{id:"from",label:"\u4e0a\u4e00\u8282\u70b9",width:100,sort:!0}],this.taskid="",this.delegatecustomer="",this.testcustomer="",this.paycustomer="",this.servicetype="",this.ispanding="",this.seal="",this.reportcount=2,this.samplesource="",this.businessfee=0,this.collectionfee=0,this.testfee=0,this.standfee=0,this.externfee=0,this.discount=0,this.totalfee=0,this.showprice=!1,this.showtablecel="none",this.auditaddvice="",this.projects=[],this.CurrentContact={},null==s?this.getData():s.params.subscribe(t=>{this.taskid=t.taskid,this.getData()}),console.log(t);for(var r=0;r<t.auth.user.organizations.length;r++)if(1==t.auth.user.organizations[r].checkprice){this.showprice=!0,this.showtablecel="table-cell";break}}acction(t){this.roleauditservice.getauditvariable(this.indexService.auth.user.roles,t,this.auditaddvice).subscribe(t=>{if(null!=this.tablecom.activatedRow){var e=this.tablecom.activatedRow;null!=e&&(t.username=this.indexService.auth.user.name,t.userid=this.indexService.auth.user.id,t.contactid=e.contactid,t.qupricediscount=this.CurrentContact.discount,t.customername=e.customername,t.standardfee=this.CurrentContact.standardfee,t.roles=this.indexService.auth.user.roles,this.flowservice.excutetask(e.taskid+"",t).subscribe(t=>{this.getData(),this.globalaudit.sendAuditResult("\u6210\u529f")}))}})}ngAfterViewInit(){}ngOnInit(){}getroundvalue(t,e){var n=Math.round(t/e*100)/100;return null!=this.CurrentContact&&(this.CurrentContact.standardfee=e,this.CurrentContact.discount=n),n}setproject(t){this.projects=[],this.servicetype="",this.seal="",this.samplesource="",this.delegatecustomer="",this.paycustomer="",this.testcustomer="",this.standfee=0,this.totalfee=0,this.testfee=0,this.discount=0,this.externfee=0,this.businessfee=0,this.contactservice.getcontactproject(t.contactid+"").subscribe(t=>{var e,n;if(console.log(t),this.CurrentContact=t.contact,this.projects=t.projects,null!=this.CurrentContact&&null!=this.CurrentContact.contactcustomers){this.delegatecustomer="",this.testcustomer="",this.paycustomer="";var i=this.CurrentContact.contactcustomers.filter(t=>1==t.customertype);if(i.length>0)for(var s=0;s<i.length;s++)0!=s&&(this.delegatecustomer=this.delegatecustomer+","),this.delegatecustomer=this.delegatecustomer+i[s].customername;var c=this.CurrentContact.contactcustomers.find(t=>2==t.customertype);if(this.paycustomer=(null==c?void 0:c.customername)+"",c=this.CurrentContact.contactcustomers.find(t=>3==t.customertype),this.testcustomer=(null==c?void 0:c.customername)+"",this.servicetype="",this.servicetype=(null===(e=this.CurrentContact.service)||void 0===e?void 0:e.label)+"",this.ispanding=1==this.CurrentContact.isjudgement?"\u662f":"\u5426",this.seal="",null!=this.CurrentContact.seal)for(s=0;s<this.CurrentContact.seal.length;s++)this.seal=this.seal+this.CurrentContact.seal[s].label+",";this.samplesource=(null===(n=this.CurrentContact.samplesource)||void 0===n?void 0:n.label)+"",this.businessfee=Number(this.CurrentContact.businessfee),this.collectionfee=Number(this.CurrentContact.collectionfee),this.testfee=Number(this.CurrentContact.testfee),this.standfee=Number(this.CurrentContact.standardfee),this.discount=Number(this.CurrentContact.discount),this.totalfee=Number(this.CurrentContact.totalfee),this.externfee=Number(this.CurrentContact.externfee)}})}activatedRow(t){this.setproject(t)}getData(){null!=this.indexService.auth.user.roles&&this.flowservice.getTaskListByRoleId(this.indexService.auth.user.roles).subscribe(t=>{if([this.data,this.total]=[t.list.filter(t=>"task_customerserviceaudit"==t.taskdefinid),t.list.length],null!=this.taskid&&""!=this.taskid){var e=this.data.findIndex(t=>t.taskid==this.taskid);-1!=e?(this.tablecom.activatedRow=this.data[e],this.setproject(this.data[e])):this.data.length>0&&(this.tablecom.activatedRow=this.data[0],this.setproject(this.data[0]))}else this.data.length>0&&(this.tablecom.activatedRow=this.data[0],this.setproject(this.data[0]))})}indexChange(t){this.index=t,this.getData()}sortChange(t){this.query.sort=t,this.getData()}}return t.\u0275fac=function(e){return new(e||t)(l.Ib(c.a),l.Ib(o.a),l.Ib(r.a),l.Ib(a.a),l.Ib(s.a),l.Ib(s.e),l.Ib(b.a))},t.\u0275cmp=l.Cb({type:t,selectors:[["app-contactaudit"]],viewQuery:function(t,e){var n;1&t&&l.Bc(y,!0),2&t&&l.ic(n=l.Wb())&&(e.tablecom=n.first)},features:[l.vb],decls:71,vars:27,consts:[["span","8",2,"display","inline"],["au-adaption","",1,"au-panel","au-content",3,"outerHeight"],["loading","",3,"columns","data","index","size","total","virtualScroll","bodyHeight","indexChange","sizeChange","sortChange","activatedRowChange"],["tablecom",""],["span","16"],[2,"height","20px"],["span","5"],["icon","ado-check","plain","","type","primary",2,"color","green",3,"click"],["span","12"],["span","6"],["span","4"],[2,"height","20"],[3,"hidden"],["label","\u6807\u51c6\u68c0\u6d4b\u8d39","direction","row",3,"ngModel","ngModelChange"],["span","24"],["id","sampledata","border","1",2,"height","100%","width","100%"],[2,"width","10%","text-align","center"],[2,"width","5%","text-align","center"],[2,"width","40%","text-align","center"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(l.Ob(0,"x-row"),l.Ob(1,"x-col",0),l.Ob(2,"div",1),l.Ob(3,"x-table",2,3),l.Vb("indexChange",(function(t){return e.index=t}))("sizeChange",(function(t){return e.size=t}))("indexChange",(function(t){return e.indexChange(t)}))("sortChange",(function(t){return e.sortChange(t)}))("activatedRowChange",(function(t){return e.activatedRow(t)})),l.Nb(),l.Nb(),l.Nb(),l.Ob(5,"x-col",4),l.Ob(6,"div",1),l.Jb(7,"x-row",5),l.Ob(8,"x-row"),l.Ob(9,"x-col",6),l.Ob(10,"x-button",7),l.Vb("click",(function(){return e.acction(1)})),l.wc(11,"\u63d0\u4ea4"),l.Nb(),l.Nb(),l.Nb(),l.Jb(12,"x-row",5),l.Ob(13,"x-row"),l.Ob(14,"x-col",8),l.wc(15),l.Nb(),l.Ob(16,"x-col",9),l.wc(17),l.Nb(),l.Ob(18,"x-col",9),l.wc(19),l.Nb(),l.Nb(),l.Jb(20,"x-row",5),l.Ob(21,"x-row"),l.Ob(22,"x-col",10),l.wc(23),l.Nb(),l.Ob(24,"x-col",10),l.wc(25),l.Nb(),l.Ob(26,"x-col",10),l.wc(27),l.Nb(),l.Ob(28,"x-col",10),l.wc(29),l.Nb(),l.Nb(),l.Jb(30,"x-row",11),l.Ob(31,"x-row",12),l.Ob(32,"x-col",10),l.wc(33),l.Nb(),l.Ob(34,"x-col",10),l.wc(35),l.Nb(),l.Ob(36,"x-col",10),l.wc(37),l.Nb(),l.Ob(38,"x-col",10),l.wc(39),l.Nb(),l.Nb(),l.Ob(40,"x-row"),l.Ob(41,"x-col",10),l.wc(42),l.Nb(),l.Ob(43,"x-col",10),l.Ob(44,"x-input",13),l.Vb("ngModelChange",(function(t){return e.standfee=t})),l.Nb(),l.Nb(),l.Ob(45,"x-col",10),l.wc(46),l.Nb(),l.Nb(),l.Jb(47,"x-row",5),l.Ob(48,"x-row"),l.Ob(49,"x-col",14),l.Ob(50,"table",15),l.Ob(51,"thead"),l.Ob(52,"td",16),l.wc(53,"\u9879\u76ee"),l.Nb(),l.Ob(54,"td",17),l.wc(55,"\u62a5\u544a"),l.Nb(),l.Ob(56,"td",16),l.wc(57,"\u9886\u57df"),l.Nb(),l.Ob(58,"td",16),l.wc(59,"\u6837\u54c1"),l.Nb(),l.Ob(60,"td",17),l.wc(61,"\u68c0\u6d4b\u8d39"),l.Nb(),l.Ob(62,"td",16),l.wc(63,"\u9879\u76ee"),l.Nb(),l.Ob(64,"td",18),l.wc(65,"\u65b9\u6cd5"),l.Nb(),l.Ob(66,"td",17),l.wc(67,"\u5916\u5305"),l.Nb(),l.Ob(68,"td",17),l.wc(69,"\u6b21\u6570"),l.Nb(),l.Nb(),l.uc(70,k,19,13,"tr",19),l.Nb(),l.Nb(),l.Nb(),l.Nb(),l.Nb(),l.Nb()),2&t&&(l.yb(2),l.ec("outerHeight",50),l.yb(1),l.ec("columns",e.columns)("data",e.data)("index",e.index)("size",e.size)("total",e.total)("virtualScroll",!0)("bodyHeight",750),l.yb(3),l.ec("outerHeight",50),l.yb(9),l.yc("\u59d4\u6258\u5ba2\u6237:",e.delegatecustomer,""),l.yb(2),l.yc("\u4ed8\u6b3e\u5ba2\u6237:",e.paycustomer,""),l.yb(2),l.yc("\u53d7\u68c0\u5ba2\u6237:",e.testcustomer,""),l.yb(4),l.yc("\u6837\u54c1\u6765\u6e90:",e.samplesource,""),l.yb(2),l.yc("\u662f\u5426\u5224\u5b9a:",e.ispanding,""),l.yb(2),l.yc("\u8d44\u8d28\u76d6\u7ae0:",e.seal,""),l.yb(2),l.yc("\u670d\u52a1\u7c7b\u578b:",e.servicetype,""),l.yb(2),l.ec("hidden",e.showprice),l.yb(2),l.yc("\u603b\u8d39\u7528:",e.totalfee,""),l.yb(2),l.yc("\u4e1a\u52a1\u8d39:",e.businessfee,""),l.yb(2),l.yc("\u91c7\u6837\u8d39:",e.collectionfee,""),l.yb(2),l.yc("\u5916\u5305\u8d39:",e.externfee,""),l.yb(3),l.yc("\u6210\u4ea4\u4ef7\u683c:",e.testfee,""),l.yb(2),l.ec("ngModel",e.standfee),l.yb(2),l.yc("\u6298\u6263:",e.getroundvalue(e.testfee,e.standfee),""),l.yb(14),l.rc("display",e.showtablecel),l.yb(10),l.ec("ngForOf",e.projects))},directives:[h.c,h.a,g.a,p.a,d.a,f.a,m.q,m.t,i.s],styles:["[_nghost-%COMP%]   table[_ngcontent-%COMP%]{width:100%;background:var(--x-background);border-collapse:collapse;border:.0625rem solid var(--x-border-200)}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border-bottom:.0625rem solid var(--x-border-200);text-align:left;padding:.5rem 1rem}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%]{border-width:1px}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{white-space:nowrap;color:var(--x-text-300)}[_nghost-%COMP%]   div.solid[_ngcontent-%COMP%]{border-top:.0625rem solid var(--x-border)}[_nghost-%COMP%]   div.dashed[_ngcontent-%COMP%]{border-top:.0625rem dashed var(--x-border)}"]}),t})()}];let S=(()=>{class t{}return t.\u0275mod=l.Gb({type:t}),t.\u0275inj=l.Fb({factory:function(e){return new(e||t)},imports:[[s.i.forChild(L)],s.i]}),t})();var F=n("gjGi"),R=n("fl1B"),H=n("hHlV"),I=n("aMyR"),J=n("873N"),z=n("iaau");let G=(()=>{class t{}return t.\u0275mod=l.Gb({type:t}),t.\u0275inj=l.Fb({factory:function(e){return new(e||t)},imports:[[i.c,S,F.a,f.b,R.b,H.a,I.a,z.a,J.a]]}),t})()}}]);