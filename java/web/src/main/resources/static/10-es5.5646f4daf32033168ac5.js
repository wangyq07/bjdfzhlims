!function(){function t(e,n){return(t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(e,n)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var c,o=r(t);if(e){var i=r(this).constructor;c=Reflect.construct(o,arguments,i)}else c=o.apply(this,arguments);return n(this,c)}}function n(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"873N":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("ofXK"),c=n("fXoL"),o=function(){var t=function t(){i(this,t)};return t.\u0275mod=c.Gb({type:t}),t.\u0275inj=c.Fb({factory:function(e){return new(e||t)},imports:[[r.c]]}),t}()},MOn6:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var r=n("XNiG"),c=n("3pM9"),a=n("1G5W"),s=n("ofXK"),u=n("fXoL"),b=function(){var t=function(){function t(e,n,c){i(this,t),this.elementRef=e,this.renderer=n,this.doc=c,this.outerHeight=0,this._unSubject=new r.a}return o(t,[{key:"ngAfterViewInit",value:function(){this.setSubject()}},{key:"ngOnDestroy",value:function(){var t;this._unSubject.next(),this._unSubject.unsubscribe(),null===(t=this._resizeObserver)||void 0===t||t.disconnect()}},{key:"setSubject",value:function(){var t=this;Object(c.A)(this.container,this.doc.documentElement).pipe(Object(a.a)(this._unSubject)).subscribe((function(e){t._resizeObserver=e.resizeObserver,t.setAdaptionHeight()}))}},{key:"setAdaptionHeight",value:function(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}]),t}();return t.\u0275fac=function(e){return new(e||t)(u.Ib(u.l),u.Ib(u.D),u.Ib(s.e))},t.\u0275dir=u.Db({type:t,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),t}()},aMyR:function(t,e,n){"use strict";n.d(e,"a",(function(){return v}));var r=n("ofXK"),c=n("gjGi"),o=n("GvSL"),a=n("oJeN"),s=n("/pOC"),u=n("l5Yv"),b=n("qN0K"),l=n("4h90"),d=n("P0lq"),f=n("Prn+"),h=n("hHlV"),p=n("873N"),g=n("iaau"),y=n("fXoL"),v=function(){var t=function t(){i(this,t)};return t.\u0275mod=y.Gb({type:t}),t.\u0275inj=y.Fb({factory:function(e){return new(e||t)},imports:[[r.c,c.a,o.b,h.a,p.a,g.a,a.b,s.b,u.b,b.b,l.b,d.b,f.b],r.c]}),t}()},iaau:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("fXoL"),c=function(){var t=function t(){i(this,t)};return t.\u0275mod=r.Gb({type:t}),t.\u0275inj=r.Fb({factory:function(e){return new(e||t)}}),t}()},jA2P:function(n,r,c){"use strict";c.r(r),c.d(r,"ContactauditModule",(function(){return E}));var a=c("ofXK"),s=c("tyNb"),u=c("wTjX"),b=c("TPaT"),l=c("pDPc"),d=c("LZRM"),f=c("Puy/"),h=c("K7LP"),p=c("fXoL"),g=c("SfH5"),y=c("GvSL"),v=c("P0lq"),m=c("MOn6"),O=c("yO6f"),w=c("3Pt+"),C=["tablecom"];function x(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.samplename,"")}}function N(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.price,"")}}function M(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.testproject,"")}}function P(t,e){if(1&t&&(p.Mb(0),p.uc(1,M,3,1,"ng-container",19),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.ec("ngForOf",n.testprojects)}}function _(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.methodname,"")}}function j(t,e){if(1&t&&(p.Mb(0),p.uc(1,_,3,1,"ng-container",19),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.ec("ngForOf",n.testprojects)}}function k(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.isextern,"")}}function R(t,e){if(1&t&&(p.Mb(0),p.uc(1,k,3,1,"ng-container",19),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.ec("ngForOf",n.testprojects)}}function S(t,e){if(1&t&&(p.Mb(0),p.wc(1),p.Jb(2,"br"),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.yc(" ",n.testcount,"")}}function L(t,e){if(1&t&&(p.Mb(0),p.uc(1,S,3,1,"ng-container",19),p.Lb()),2&t){var n=e.$implicit;p.yb(1),p.ec("ngForOf",n.testprojects)}}function F(t,e){if(1&t&&(p.Ob(0,"tr"),p.Ob(1,"td",16),p.wc(2),p.Nb(),p.Ob(3,"td",17),p.wc(4),p.Nb(),p.Ob(5,"td",16),p.wc(6),p.Nb(),p.Ob(7,"td",16),p.uc(8,x,3,1,"ng-container",19),p.Nb(),p.Ob(9,"td",17),p.uc(10,N,3,1,"ng-container",19),p.Nb(),p.Ob(11,"td",16),p.uc(12,P,2,1,"ng-container",19),p.Nb(),p.Ob(13,"td",18),p.uc(14,j,2,1,"ng-container",19),p.Nb(),p.Ob(15,"td",17),p.uc(16,R,2,1,"ng-container",19),p.Nb(),p.Ob(17,"td",17),p.uc(18,L,2,1,"ng-container",19),p.Nb(),p.Nb()),2&t){var n=e.$implicit,r=p.Yb();p.yb(2),p.xc(n.projectnumber),p.yb(2),p.xc(n.reportcount),p.yb(2),p.xc(n.domain.label),p.yb(1),p.rc("display",r.showtablecel),p.yb(1),p.ec("ngForOf",n.samples),p.yb(1),p.rc("display",r.showtablecel),p.yb(1),p.ec("ngForOf",n.samples),p.yb(2),p.ec("ngForOf",n.samples),p.yb(2),p.ec("ngForOf",n.samples),p.yb(2),p.ec("ngForOf",n.samples),p.yb(2),p.ec("ngForOf",n.samples)}}var H,I,J,z=[{path:"",component:(H=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(c,n);var r=e(c);function c(t,e,n,o,a,s,u){var b;i(this,c),(b=r.call(this,t)).indexService=t,b.flowservice=e,b.roleauditservice=n,b.contactservice=o,b.actroute=a,b.router=s,b.globalaudit=u,b.index=1,b.size=1e4,b.total=0,b.query={},b.columns=[{id:"index",label:"\u5e8f\u53f7",width:80,type:"index"},{id:"name",label:"\u4efb\u52a1",width:100,sort:!0},{id:"customername",label:"\u5ba2\u6237",width:150,sort:!0},{id:"preuser",label:"\u524d\u7f6e\u5904\u7406\u4eba",width:200,sort:!0},{id:"createtime",label:"\u521b\u5efa\u65e5\u671f",width:200,sort:!0},{id:"from",label:"\u4e0a\u4e00\u8282\u70b9",width:100,sort:!0}],b.taskid="",b.delegatecustomer="",b.testcustomer="",b.paycustomer="",b.servicetype="",b.ispanding="",b.seal="",b.reportcount=2,b.samplesource="",b.businessfee=0,b.collectionfee=0,b.testfee=0,b.standfee=0,b.externfee=0,b.discount=0,b.totalfee=0,b.showprice=!1,b.showtablecel="none",b.auditaddvice="",b.projects=[],b.CurrentContact={},null==a?b.getData():a.params.subscribe((function(t){b.taskid=t.taskid,b.getData()})),console.log(t);for(var l=0;l<t.auth.user.organizations.length;l++)if(1==t.auth.user.organizations[l].checkprice){b.showprice=!0,b.showtablecel="table-cell";break}return b}return o(c,[{key:"acction",value:function(t){var e=this;this.roleauditservice.getauditvariable(this.indexService.auth.user.roles,t,this.auditaddvice).subscribe((function(t){if(null!=e.tablecom.activatedRow){var n=e.tablecom.activatedRow;null!=n&&(t.username=e.indexService.auth.user.name,t.userid=e.indexService.auth.user.id,t.contactid=n.contactid,t.qupricediscount=e.CurrentContact.discount,t.customername=n.customername,t.standardfee=e.CurrentContact.standardfee,t.roles=e.indexService.auth.user.roles,e.flowservice.excutetask(n.taskid+"",t).subscribe((function(t){e.getData(),e.globalaudit.sendAuditResult("\u6210\u529f")})))}}))}},{key:"ngAfterViewInit",value:function(){}},{key:"ngOnInit",value:function(){}},{key:"getroundvalue",value:function(t,e){var n=Math.round(t/e*100)/100;return null!=this.CurrentContact&&(this.CurrentContact.standardfee=e,this.CurrentContact.discount=n),n}},{key:"setproject",value:function(t){var e=this;this.projects=[],this.servicetype="",this.seal="",this.samplesource="",this.delegatecustomer="",this.paycustomer="",this.testcustomer="",this.standfee=0,this.totalfee=0,this.testfee=0,this.discount=0,this.externfee=0,this.businessfee=0,this.contactservice.getcontactproject(t.contactid+"").subscribe((function(t){var n,r;if(console.log(t),e.CurrentContact=t.contact,e.projects=t.projects,null!=e.CurrentContact&&null!=e.CurrentContact.contactcustomers){e.delegatecustomer="",e.testcustomer="",e.paycustomer="";var c=e.CurrentContact.contactcustomers.filter((function(t){return 1==t.customertype}));if(c.length>0)for(var o=0;o<c.length;o++)0!=o&&(e.delegatecustomer=e.delegatecustomer+","),e.delegatecustomer=e.delegatecustomer+c[o].customername;var i=e.CurrentContact.contactcustomers.find((function(t){return 2==t.customertype}));if(e.paycustomer=(null==i?void 0:i.customername)+"",i=e.CurrentContact.contactcustomers.find((function(t){return 3==t.customertype})),e.testcustomer=(null==i?void 0:i.customername)+"",e.servicetype="",e.servicetype=(null===(n=e.CurrentContact.service)||void 0===n?void 0:n.label)+"",e.ispanding=1==e.CurrentContact.isjudgement?"\u662f":"\u5426",e.seal="",null!=e.CurrentContact.seal)for(o=0;o<e.CurrentContact.seal.length;o++)e.seal=e.seal+e.CurrentContact.seal[o].label+",";e.samplesource=(null===(r=e.CurrentContact.samplesource)||void 0===r?void 0:r.label)+"",e.businessfee=Number(e.CurrentContact.businessfee),e.collectionfee=Number(e.CurrentContact.collectionfee),e.testfee=Number(e.CurrentContact.testfee),e.standfee=Number(e.CurrentContact.standardfee),e.discount=Number(e.CurrentContact.discount),e.totalfee=Number(e.CurrentContact.totalfee),e.externfee=Number(e.CurrentContact.externfee)}}))}},{key:"activatedRow",value:function(t){this.setproject(t)}},{key:"getData",value:function(){var t=this;null!=this.indexService.auth.user.roles&&this.flowservice.getTaskListByRoleId(this.indexService.auth.user.roles).subscribe((function(e){var n;if(n=[e.list.filter((function(t){return"task_customerserviceaudit"==t.taskdefinid})),e.list.length],t.data=n[0],t.total=n[1],null!=t.taskid&&""!=t.taskid){var r=t.data.findIndex((function(e){return e.taskid==t.taskid}));-1!=r?(t.tablecom.activatedRow=t.data[r],t.setproject(t.data[r])):t.data.length>0&&(t.tablecom.activatedRow=t.data[0],t.setproject(t.data[0]))}else t.data.length>0&&(t.tablecom.activatedRow=t.data[0],t.setproject(t.data[0]))}))}},{key:"indexChange",value:function(t){this.index=t,this.getData()}},{key:"sortChange",value:function(t){this.query.sort=t,this.getData()}}]),c}(h.a),H.\u0275fac=function(t){return new(t||H)(p.Ib(u.a),p.Ib(b.a),p.Ib(l.a),p.Ib(d.a),p.Ib(s.a),p.Ib(s.e),p.Ib(f.a))},H.\u0275cmp=p.Cb({type:H,selectors:[["app-contactaudit"]],viewQuery:function(t,e){var n;1&t&&p.Bc(C,!0),2&t&&p.ic(n=p.Wb())&&(e.tablecom=n.first)},features:[p.vb],decls:71,vars:27,consts:[["span","8",2,"display","inline"],["au-adaption","",1,"au-panel","au-content",3,"outerHeight"],["loading","",3,"columns","data","index","size","total","virtualScroll","bodyHeight","indexChange","sizeChange","sortChange","activatedRowChange"],["tablecom",""],["span","16"],[2,"height","20px"],["span","5"],["icon","ado-check","plain","","type","primary",2,"color","green",3,"click"],["span","12"],["span","6"],["span","4"],[2,"height","20"],[3,"hidden"],["label","\u6807\u51c6\u68c0\u6d4b\u8d39","direction","row",3,"ngModel","ngModelChange"],["span","24"],["id","sampledata","border","1",2,"height","100%","width","100%"],[2,"width","10%","text-align","center"],[2,"width","5%","text-align","center"],[2,"width","40%","text-align","center"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(p.Ob(0,"x-row"),p.Ob(1,"x-col",0),p.Ob(2,"div",1),p.Ob(3,"x-table",2,3),p.Vb("indexChange",(function(t){return e.index=t}))("sizeChange",(function(t){return e.size=t}))("indexChange",(function(t){return e.indexChange(t)}))("sortChange",(function(t){return e.sortChange(t)}))("activatedRowChange",(function(t){return e.activatedRow(t)})),p.Nb(),p.Nb(),p.Nb(),p.Ob(5,"x-col",4),p.Ob(6,"div",1),p.Jb(7,"x-row",5),p.Ob(8,"x-row"),p.Ob(9,"x-col",6),p.Ob(10,"x-button",7),p.Vb("click",(function(){return e.acction(1)})),p.wc(11,"\u63d0\u4ea4"),p.Nb(),p.Nb(),p.Nb(),p.Jb(12,"x-row",5),p.Ob(13,"x-row"),p.Ob(14,"x-col",8),p.wc(15),p.Nb(),p.Ob(16,"x-col",9),p.wc(17),p.Nb(),p.Ob(18,"x-col",9),p.wc(19),p.Nb(),p.Nb(),p.Jb(20,"x-row",5),p.Ob(21,"x-row"),p.Ob(22,"x-col",10),p.wc(23),p.Nb(),p.Ob(24,"x-col",10),p.wc(25),p.Nb(),p.Ob(26,"x-col",10),p.wc(27),p.Nb(),p.Ob(28,"x-col",10),p.wc(29),p.Nb(),p.Nb(),p.Jb(30,"x-row",11),p.Ob(31,"x-row",12),p.Ob(32,"x-col",10),p.wc(33),p.Nb(),p.Ob(34,"x-col",10),p.wc(35),p.Nb(),p.Ob(36,"x-col",10),p.wc(37),p.Nb(),p.Ob(38,"x-col",10),p.wc(39),p.Nb(),p.Nb(),p.Ob(40,"x-row"),p.Ob(41,"x-col",10),p.wc(42),p.Nb(),p.Ob(43,"x-col",10),p.Ob(44,"x-input",13),p.Vb("ngModelChange",(function(t){return e.standfee=t})),p.Nb(),p.Nb(),p.Ob(45,"x-col",10),p.wc(46),p.Nb(),p.Nb(),p.Jb(47,"x-row",5),p.Ob(48,"x-row"),p.Ob(49,"x-col",14),p.Ob(50,"table",15),p.Ob(51,"thead"),p.Ob(52,"td",16),p.wc(53,"\u9879\u76ee"),p.Nb(),p.Ob(54,"td",17),p.wc(55,"\u62a5\u544a"),p.Nb(),p.Ob(56,"td",16),p.wc(57,"\u9886\u57df"),p.Nb(),p.Ob(58,"td",16),p.wc(59,"\u6837\u54c1"),p.Nb(),p.Ob(60,"td",17),p.wc(61,"\u68c0\u6d4b\u8d39"),p.Nb(),p.Ob(62,"td",16),p.wc(63,"\u9879\u76ee"),p.Nb(),p.Ob(64,"td",18),p.wc(65,"\u65b9\u6cd5"),p.Nb(),p.Ob(66,"td",17),p.wc(67,"\u5916\u5305"),p.Nb(),p.Ob(68,"td",17),p.wc(69,"\u6b21\u6570"),p.Nb(),p.Nb(),p.uc(70,F,19,13,"tr",19),p.Nb(),p.Nb(),p.Nb(),p.Nb(),p.Nb(),p.Nb()),2&t&&(p.yb(2),p.ec("outerHeight",50),p.yb(1),p.ec("columns",e.columns)("data",e.data)("index",e.index)("size",e.size)("total",e.total)("virtualScroll",!0)("bodyHeight",750),p.yb(3),p.ec("outerHeight",50),p.yb(9),p.yc("\u59d4\u6258\u5ba2\u6237:",e.delegatecustomer,""),p.yb(2),p.yc("\u4ed8\u6b3e\u5ba2\u6237:",e.paycustomer,""),p.yb(2),p.yc("\u53d7\u68c0\u5ba2\u6237:",e.testcustomer,""),p.yb(4),p.yc("\u6837\u54c1\u6765\u6e90:",e.samplesource,""),p.yb(2),p.yc("\u662f\u5426\u5224\u5b9a:",e.ispanding,""),p.yb(2),p.yc("\u8d44\u8d28\u76d6\u7ae0:",e.seal,""),p.yb(2),p.yc("\u670d\u52a1\u7c7b\u578b:",e.servicetype,""),p.yb(2),p.ec("hidden",e.showprice),p.yb(2),p.yc("\u603b\u8d39\u7528:",e.totalfee,""),p.yb(2),p.yc("\u4e1a\u52a1\u8d39:",e.businessfee,""),p.yb(2),p.yc("\u91c7\u6837\u8d39:",e.collectionfee,""),p.yb(2),p.yc("\u5916\u5305\u8d39:",e.externfee,""),p.yb(3),p.yc("\u6210\u4ea4\u4ef7\u683c:",e.testfee,""),p.yb(2),p.ec("ngModel",e.standfee),p.yb(2),p.yc("\u6298\u6263:",e.getroundvalue(e.testfee,e.standfee),""),p.yb(14),p.rc("display",e.showtablecel),p.yb(10),p.ec("ngForOf",e.projects))},directives:[g.c,g.a,m.a,O.a,y.a,v.a,w.q,w.t,a.s],styles:["[_nghost-%COMP%]   table[_ngcontent-%COMP%]{width:100%;background:var(--x-background);border-collapse:collapse;border:.0625rem solid var(--x-border-200)}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border-bottom:.0625rem solid var(--x-border-200);text-align:left;padding:.5rem 1rem}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%], [_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%]{border-width:1px}[_nghost-%COMP%]   table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{white-space:nowrap;color:var(--x-text-300)}[_nghost-%COMP%]   div.solid[_ngcontent-%COMP%]{border-top:.0625rem solid var(--x-border)}[_nghost-%COMP%]   div.dashed[_ngcontent-%COMP%]{border-top:.0625rem dashed var(--x-border)}"]}),H)}],D=((I=function t(){i(this,t)}).\u0275mod=p.Gb({type:I}),I.\u0275inj=p.Fb({factory:function(t){return new(t||I)},imports:[[s.i.forChild(z)],s.i]}),I),G=c("gjGi"),X=c("fl1B"),$=c("hHlV"),q=c("aMyR"),A=c("873N"),V=c("iaau"),E=((J=function t(){i(this,t)}).\u0275mod=p.Gb({type:J}),J.\u0275inj=p.Fb({factory:function(t){return new(t||J)},imports:[[a.c,D,G.a,v.b,X.b,$.a,q.a,V.a,A.a]]}),J)}}])}();