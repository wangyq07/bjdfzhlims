!function(){function t(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&e(t,n)}function e(t,n){return(e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,n)}function n(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,c=o(t);if(e){var i=o(this).constructor;n=Reflect.construct(c,arguments,i)}else n=c.apply(this,arguments);return r(this,n)}}function r(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"873N":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("ofXK"),o=n("fXoL"),c=function(){var t=function t(){a(this,t)};return t.\u0275mod=o.Gb({type:t}),t.\u0275inj=o.Fb({factory:function(e){return new(e||t)},imports:[[r.c]]}),t}()},BzWU:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("LvDl"),o=function(){var t=function(){function t(){a(this,t)}return i(t,null,[{key:"JsNewGuid",value:function(){for(var t="",e=1;e<=32;e++)t+=Math.floor(16*Math.random()).toString(16),8!=e&&12!=e&&16!=e&&20!=e||(t+="-");return t}},{key:"setafterdelete",value:function(t,e){var n=e.findIndex((function(e){return e.id==t}));return e.splice(n,1),n}},{key:"cloneobject",value:function(t){var e={};for(var n in t)e[n]=t[n];return e}},{key:"deepClone",value:function(e){var n={};if(e&&"object"==typeof e)for(var o in e)null!=e[o]&&e.hasOwnProperty(o)&&(n[o]=Object(r.isArray)(e[o])?t.deepcloneobjectarray(e[o]):e[o]&&"object"==typeof e[o]?t.deepClone(e[o]):e[o]);return n}},{key:"deepcloneobjectarray",value:function(e){for(var n=[],r=0;r<e.length;r++)n.push(t.deepClone(e[r]));return n}},{key:"cloneobjectarray",value:function(e){for(var n=[],r=0;r<e.length;r++)n.push(t.cloneobject(e[r]));return n}},{key:"GetRandomStr",value:function(t,e,n){var r="",o=e,c=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];t&&(o=Math.round(Math.random()*(n-e))+e);for(var i=0;i<o;i++)r+=c[Math.round(Math.random()*(c.length-1))];return r}},{key:"RndNum",value:function(t){for(var e="",n=0;n<t;n++)e+=Math.floor(10*Math.random());return e}}]),t}();return t.num=t.RndNum(5),t}()},GTjD:function(e,r,o){"use strict";o.d(r,"a",(function(){return l}));var c=o("bRdP"),s=o("NtM8"),u=o("fXoL"),l=function(){var e=function(e){t(o,e);var r=n(o);function o(t){var e;return a(this,o),(e=r.call(this,t,{controller:{name:"samples",servicetype:"businessprocess"}})).http=t,e}return i(o,[{key:"supplimentupdatesamples",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/supplimentupdatesamples",{sampledatas:t},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"getsamplestandardprice",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getsamplestandardprice",{testprojects:t},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}}]),o}(c.a);return e.\u0275fac=function(t){return new(t||e)(u.Sb(s.a))},e.\u0275prov=u.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},K7LP:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){function t(e){var n=this;a(this,t),this.indexService=e,this.auth={};var r=this.indexService.menuChange.subscribe((function(t){n.baseInit(),r.unsubscribe()}))}return i(t,[{key:"baseInit",value:function(){var t,e,n,r,o,c=this;this.menu=null===(e=null===(t=this.indexService.auth.user.permissions)||void 0===t?void 0:t.menus)||void 0===e?void 0:e.find((function(t){return t.router==c.indexService.session.activatedPage})),this.actions=null===(r=null===(n=this.indexService.auth.user.permissions)||void 0===n?void 0:n.actions)||void 0===r?void 0:r.filter((function(t){var e;return t.menuId==(null===(e=c.menu)||void 0===e?void 0:e.id)})),null===(o=this.actions)||void 0===o||o.forEach((function(t){return c.auth[t.code]=!0}))}},{key:"unAuth",value:function(t){return!this.auth[t]}}]),t}()},LZRM:function(e,r,o){"use strict";o.d(r,"a",(function(){return l}));var c=o("bRdP"),s=o("NtM8"),u=o("fXoL"),l=function(){var e=function(e){t(o,e);var r=n(o);function o(t){var e;return a(this,o),(e=r.call(this,t,{controller:{name:"contacts",servicetype:"businessprocess"}})).http=t,e}return i(o,[{key:"updatecontactinfo",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updatecontactinfo",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"getcontactproject",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getcontactproject",{contactid:t},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"addcontactproject",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/addcontactproject",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"updatecontacttest",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updatecontacttest",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}}]),o}(c.a);return e.\u0275fac=function(t){return new(t||e)(u.Sb(s.a))},e.\u0275prov=u.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},MOn6:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n("XNiG"),o=n("3pM9"),c=n("1G5W"),s=n("ofXK"),u=n("fXoL"),l=function(){var t=function(){function t(e,n,o){a(this,t),this.elementRef=e,this.renderer=n,this.doc=o,this.outerHeight=0,this._unSubject=new r.a}return i(t,[{key:"ngAfterViewInit",value:function(){this.setSubject()}},{key:"ngOnDestroy",value:function(){var t;this._unSubject.next(),this._unSubject.unsubscribe(),null===(t=this._resizeObserver)||void 0===t||t.disconnect()}},{key:"setSubject",value:function(){var t=this;Object(o.A)(this.container,this.doc.documentElement).pipe(Object(c.a)(this._unSubject)).subscribe((function(e){t._resizeObserver=e.resizeObserver,t.setAdaptionHeight()}))}},{key:"setAdaptionHeight",value:function(){this.renderer.setStyle(this.elementRef.nativeElement,"height",this.doc.documentElement.clientHeight-this.outerHeight+"px")}}]),t}();return t.\u0275fac=function(e){return new(e||t)(u.Ib(u.l),u.Ib(u.D),u.Ib(s.e))},t.\u0275dir=u.Db({type:t,selectors:[["","au-adaption",""]],inputs:{outerHeight:"outerHeight",container:"container"}}),t}()},XseO:function(e,r,o){"use strict";o.r(r),o.d(r,"TaskdispatchModule",(function(){return _}));var c,s,u,l,d=o("ofXK"),p=o("tyNb"),b=o("wTjX"),h=o("TPaT"),f=o("LZRM"),v=o("GTjD"),m=o("Puy/"),y=o("K7LP"),j=o("BzWU"),k=o("NtM8"),w=o("bRdP"),O=o("fXoL"),N=((c=function(e){t(o,e);var r=n(o);function o(t){var e;return a(this,o),(e=r.call(this,t,{controller:{name:"roletestproject",servicetype:"collectionreceive"}})).http=t,e}return i(o,[{key:"getroletaskdispatchs",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getroletaskdispatchs",{contactid:t},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"addRoleTaskDispatch",value:function(t,e){var n,r;return this.http.post((null===(n=this.option.controller)||void 0===n?void 0:n.name)+"/addroletaskdispatch",{contactid:t,roletestproect:e},null===(r=this.option.controller)||void 0===r?void 0:r.servicetype)}}]),o}(w.a)).\u0275fac=function(t){return new(t||c)(O.Sb(k.a))},c.\u0275prov=O.Eb({token:c,factory:c.\u0275fac,providedIn:"root"}),c),x=o("qMpK"),g=o("SfH5"),S=o("GvSL"),C=o("/pOC"),P=o("MOn6"),D=["projecttreeCom"],I=["treeCom"],R=[{path:"",component:(s=function(e){t(o,e);var r=n(o);function o(t,e,n,c,i,s,u,l,d){var p;return a(this,o),(p=r.call(this,t)).indexService=t,p.flowservice=e,p.service=n,p.sampleservice=c,p.contactservice=i,p.actroute=s,p.router=u,p.globalaudit=l,p.msg=d,p.taskid="",p.treeLoading=!0,p.treeData=[],p.currentRoletest={},p.currentkeys=[],p.taskTreeData=[],p.projects=[],p.delegatecustomer="",p.testcustomer="",p.paycustomer="",p.servicetype="",p.ispanding="",p.seal="",p.samplesource="",p.samples=[],p.testproect=[],p.testprojecthidden="none",p.projecthidden="none",p.samplehidden="none",p.currentSample={},p.currentProject={},p.currentTestProject={},p.contactid="",null!=s&&s.params.subscribe((function(t){p.contactid=t.contactid,p.taskid=t.taskid,p.getData()})),p}return i(o,[{key:"submit",value:function(){var t=this;this.service.addRoleTaskDispatch(this.contactid,this.treeData).subscribe((function(e){t.msg.success("\u5206\u914d\u6210\u529f")}))}},{key:"ngOnInit",value:function(){}},{key:"action",value:function(t){var e,n=this;console.log(t),this.currentRoletest=t,this.projecttreeCom.setCheckedKeys();var r=[];null===(e=t.taskdispatchs)||void 0===e||e.map((function(t){r.push(t.testid)})),this.projecttreeCom.setCheckedKeys(r),this.projecttreeCom.nodes.map((function(e){n.recursionNodeDisable(e,t)}))}},{key:"recursionNodeDisable",value:function(t,e){var n,r,o=this;if(null!=e)if(2==t.level){var c=this.currentkeys.findIndex((function(e){return e==t.id})),i=null===(n=e.taskdispatchs)||void 0===n?void 0:n.findIndex((function(e){return e.testid==t.id}));this.projecttreeCom.updateNode(t,{id:t.id,pid:t.pid,label:t.label,disabled:!1}),null!=c&&-1!=c&&-1==i&&(console.log(i),console.log(c),this.projecttreeCom.updateNode(t,{id:t.id,pid:t.pid,label:t.label,disabled:!0}))}else 2!=t.level&&(null===(r=t.children)||void 0===r||r.map((function(t){o.recursionNodeDisable(t,e)})))}},{key:"checkaction",value:function(t){var e,n,r,o,c=this;if(2==t.level&&t.checked)t.disabled||(this.currentkeys.push(t.id),null===(e=this.currentRoletest.taskdispatchs)||void 0===e||e.push({roleid:this.currentRoletest.id,id:j.a.JsNewGuid(),testid:t.id}));else if(2!=t.level||t.checked)2!=t.level&&(null===(o=t.children)||void 0===o||o.map((function(t){c.checkaction(t)})));else{var i=null===(n=this.currentRoletest.taskdispatchs)||void 0===n?void 0:n.findIndex((function(e){return e.testid==t.id}));null!=i&&-1!=i&&(null===(r=this.currentRoletest.taskdispatchs)||void 0===r||r.splice(i,1)),null!=(i=this.currentkeys.findIndex((function(e){return e==t.id})))&&-1!=i&&this.currentkeys.splice(i,1)}}},{key:"projectaction",value:function(t){switch(this.testprojecthidden="none",this.projecthidden="none",this.samplehidden="none",t.level){case 0:this.projecthidden="inline",this.samplehidden="none",this.testprojecthidden="none",this.currentProject=this.projects.find((function(e){return e.id==t.id}));break;case 1:this.projecthidden="none",this.samplehidden="inline",this.testprojecthidden="none",this.currentSample=this.samples.find((function(e){return e.id==t.id})),null==this.currentSample&&(this.currentSample={}),console.log(this.currentSample);break;case 2:this.projecthidden="none",this.samplehidden="none",this.testprojecthidden="inline",this.currentTestProject=this.testproect.find((function(e){return e.id==t.id})),null==this.currentTestProject&&(this.currentTestProject={});break;default:this.projecthidden="none",this.samplehidden="none",this.testprojecthidden="none"}}},{key:"getData",value:function(){var t=this;this.taskTreeData=[],this.treeData=[],this.service.getroletaskdispatchs(this.contactid).subscribe((function(e){t.contactservice.getcontactproject(t.contactid+"").subscribe((function(n){var r,o;if(t.currentcontact=n.contact,t.projects=n.projects,null!=t.currentcontact&&null!=t.currentcontact.contactcustomers){t.delegatecustomer="",t.testcustomer="",t.paycustomer="";var c=t.currentcontact.contactcustomers.filter((function(t){return 1==t.customertype}));if(c.length>0)for(var i=0;i<c.length;i++)0!=i&&(t.delegatecustomer=t.delegatecustomer+","),t.delegatecustomer=t.delegatecustomer+c[i].customername;var a=t.currentcontact.contactcustomers.find((function(t){return 2==t.customertype}));if(t.paycustomer=(null==a?void 0:a.customername)+"",a=t.currentcontact.contactcustomers.find((function(t){return 3==t.customertype})),t.testcustomer=(null==a?void 0:a.customername)+"",t.servicetype="",t.servicetype=(null===(r=t.currentcontact.service)||void 0===r?void 0:r.label)+"",t.ispanding=1==t.currentcontact.isjudgement?"\u662f":"\u5426",t.seal="",null!=t.currentcontact.seal)for(i=0;i<t.currentcontact.seal.length;i++)t.seal=t.seal+t.currentcontact.seal[i].label+",";t.samplesource=(null===(o=t.currentcontact.samplesource)||void 0===o?void 0:o.label)+"",t.settreeData(),t.treeData=e,t.currentkeys=[],e.map((function(e){t.treeCom.addNode(e),e.taskdispatchs.map((function(e){t.currentkeys.push(e.testid)}))}));var s=t.treeCom.nodes.find((function(e){return e.id==t.treeCom.activatedId}));null!=s&&t.projecttreeCom.nodes.map((function(e){t.recursionNodeDisable(e,s)}))}}))}))}},{key:"settreeData",value:function(){var t=this;this.projects.map((function(e){t.projecttreeCom.addNode({id:e.id,pid:void 0,label:e.projectnumber}),e.samples.map((function(n){t.projecttreeCom.addNode({id:n.id,pid:e.id,label:n.samplename}),t.samples.push(n),n.testprojects.map((function(e){t.testproect.push(e),t.projecttreeCom.addNode({id:e.id,pid:n.id,checked:!1,label:e.testproject})}))}))}))}}]),o}(y.a),s.\u0275fac=function(t){return new(t||s)(O.Ib(b.a),O.Ib(h.a),O.Ib(N),O.Ib(v.a),O.Ib(f.a),O.Ib(p.a),O.Ib(p.e),O.Ib(m.a),O.Ib(x.c))},s.\u0275cmp=O.Cb({type:s,selectors:[["app-taskdispatch"]],viewQuery:function(t,e){var n;1&t&&(O.Bc(D,!0),O.Bc(I,!0)),2&t&&(O.ic(n=O.Wb())&&(e.projecttreeCom=n.first),O.ic(n=O.Wb())&&(e.treeCom=n.first))},features:[O.vb],decls:86,vars:32,consts:[[2,"overflow","auto"],[2,"height","15px"],["icon","ado-check","type","primary","plain","",3,"click"],[2,"height","20px"],["span","12"],["span","6"],["span","4"],[2,"height","30px"],["span","3"],[2,"overflow","scroll","height","680px"],["au-adaption","",3,"data","nodeHeight","activatedChange"],["treeCom",""],["span","5"],[2,"overflow","scroll","height","630px"],["checkbox","","au-adaption","","expandedLevel","0",3,"data","nodeHeight","activatedChange","checkboxChange"],["projecttreeCom",""],["span","14"],["span","15"]],template:function(t,e){1&t&&(O.Ob(0,"div",0),O.Jb(1,"x-row",1),O.Ob(2,"x-row"),O.Ob(3,"x-button",2),O.Vb("click",(function(){return e.submit()})),O.wc(4,"\u63d0\u4ea4"),O.Nb(),O.Nb(),O.Jb(5,"x-row",3),O.Ob(6,"x-row"),O.Ob(7,"x-col",4),O.wc(8),O.Nb(),O.Ob(9,"x-col",5),O.wc(10),O.Nb(),O.Ob(11,"x-col",5),O.wc(12),O.Nb(),O.Nb(),O.Jb(13,"x-row",3),O.Ob(14,"x-row"),O.Ob(15,"x-col",6),O.wc(16),O.Nb(),O.Ob(17,"x-col",6),O.wc(18),O.Nb(),O.Ob(19,"x-col",6),O.wc(20),O.Nb(),O.Ob(21,"x-col",6),O.wc(22),O.Nb(),O.Nb(),O.Jb(23,"x-row",7),O.Ob(24,"x-row"),O.Ob(25,"x-col",8),O.Ob(26,"div",9),O.Ob(27,"h4"),O.wc(28,"\u5de5\u4f5c\u7ec4"),O.Nb(),O.Ob(29,"x-tree",10,11),O.Vb("activatedChange",(function(t){return e.action(t)})),O.Nb(),O.Nb(),O.Nb(),O.Ob(31,"x-col",12),O.Ob(32,"h4"),O.wc(33,"\u9879\u76ee"),O.Nb(),O.Ob(34,"div",13),O.Ob(35,"x-tree",14,15),O.Vb("activatedChange",(function(t){return e.projectaction(t)}))("checkboxChange",(function(t){return e.checkaction(t)})),O.Nb(),O.Nb(),O.Nb(),O.Ob(37,"x-col",16),O.Ob(38,"div"),O.Ob(39,"x-row"),O.Ob(40,"h4"),O.wc(41,"\u9879\u76ee"),O.Nb(),O.Nb(),O.Ob(42,"x-row"),O.Ob(43,"x-col",12),O.wc(44),O.Nb(),O.Ob(45,"x-col",12),O.wc(46),O.Nb(),O.Nb(),O.Ob(47,"x-row"),O.Ob(48,"x-col",12),O.wc(49),O.Nb(),O.Nb(),O.Nb(),O.Nb(),O.Ob(50,"x-col",16),O.Ob(51,"div"),O.Ob(52,"x-row"),O.Ob(53,"h4"),O.wc(54,"\u6837\u54c1"),O.Nb(),O.Nb(),O.Ob(55,"x-row"),O.Ob(56,"x-col",12),O.wc(57),O.Nb(),O.Ob(58,"x-col",12),O.wc(59),O.Nb(),O.Ob(60,"x-col",12),O.wc(61),O.Nb(),O.Ob(62,"x-col",12),O.wc(63),O.Nb(),O.Nb(),O.Ob(64,"x-row"),O.Ob(65,"x-col",12),O.wc(66),O.Nb(),O.Ob(67,"x-col",12),O.wc(68),O.Nb(),O.Ob(69,"x-col",12),O.wc(70),O.Nb(),O.Ob(71,"x-col",12),O.wc(72),O.Nb(),O.Nb(),O.Nb(),O.Nb(),O.Ob(73,"x-col",16),O.Ob(74,"div"),O.Ob(75,"x-row"),O.Ob(76,"h4"),O.wc(77,"\u76d1\u6d4b\u9879\u76ee"),O.Nb(),O.Nb(),O.Ob(78,"x-row"),O.Ob(79,"x-col",12),O.wc(80),O.Nb(),O.Ob(81,"x-col",17),O.wc(82),O.Nb(),O.Nb(),O.Ob(83,"x-row"),O.Ob(84,"x-col",6),O.wc(85),O.Nb(),O.Nb(),O.Nb(),O.Nb(),O.Nb(),O.Nb()),2&t&&(O.yb(8),O.yc("\u59d4\u6258\u5ba2\u6237:",e.delegatecustomer,""),O.yb(2),O.yc("\u4ed8\u6b3e\u5ba2\u6237:",e.paycustomer,""),O.yb(2),O.yc("\u53d7\u68c0\u5ba2\u6237:",e.testcustomer,""),O.yb(4),O.yc("\u6837\u54c1\u6765\u6e90:",e.samplesource,""),O.yb(2),O.yc("\u662f\u5426\u5224\u5b9a:",e.ispanding,""),O.yb(2),O.yc("\u8d44\u8d28\u76d6\u7ae0:",e.seal,""),O.yb(2),O.yc("\u670d\u52a1\u7c7b\u578b:",e.servicetype,""),O.yb(7),O.ec("data",e.treeData)("nodeHeight",1.875),O.yb(6),O.ec("data",e.taskTreeData)("nodeHeight",1.875),O.yb(3),O.rc("display",e.projecthidden),O.yb(6),O.yc("\u7f16\u53f7:",e.currentProject.projectnumber,""),O.yb(2),O.yc("\u9886\u57df:",null==e.currentProject.domain?null:e.currentProject.domain.label,""),O.yb(3),O.yc("\u62a5\u544a:",e.currentProject.reportcount,""),O.yb(2),O.rc("display",e.samplehidden),O.yb(6),O.yc("\u76d1\u6d4b\u7c7b\u578b:",null==e.currentSample.testtype?null:e.currentSample.testtype.label,""),O.yb(2),O.yc("\u6837\u54c1\u72b6\u6001:",null==e.currentSample.status?null:e.currentSample.status.label,""),O.yb(2),O.yc("\u4fdd\u5b58\u72b6\u6001:",null==e.currentSample.store?null:e.currentSample.store.label,""),O.yb(2),O.yc("\u5904\u7406\u65b9\u5f0f:",null==e.currentSample.process?null:e.currentSample.process.label,""),O.yb(3),O.yc("\u6267\u884c\u6807\u51c6:",e.currentSample.executestandard,""),O.yb(2),O.yc("\u6837\u54c1\u7b49\u7ea7:",e.currentSample.executegrade,""),O.yb(2),O.yc("\u6837\u54c1\u6570\u91cf:",e.currentSample.samplequality,""),O.yb(2),O.yc("\u6837\u54c1\u5305\u88c5:",e.currentSample.wrapherproperties,""),O.yb(2),O.rc("display",e.testprojecthidden),O.yb(6),O.yc("\u68c0\u6d4b\u9879\u76ee:",e.currentTestProject.testproject,""),O.yb(2),O.yc("\u68c0\u6d4b\u6807\u51c6:",e.currentTestProject.methodname,""),O.yb(3),O.zc("\u68c0\u6d4b\u9650\u503c:",e.currentTestProject.limitmin,"-",e.currentTestProject.limitmax,""))},directives:[g.c,S.a,g.a,C.a,P.a],styles:[""]}),s)}],T=((u=function t(){a(this,t)}).\u0275mod=O.Gb({type:u}),u.\u0275inj=O.Fb({factory:function(t){return new(t||u)},imports:[[p.i.forChild(R)],p.i]}),u),M=o("hHlV"),L=o("gjGi"),G=o("873N"),H=o("iaau"),_=((l=function t(){a(this,t)}).\u0275mod=O.Gb({type:l}),l.\u0275inj=O.Fb({factory:function(t){return new(t||l)},imports:[[d.c,T,M.a,L.a,C.b,g.b,G.a,H.a]]}),l)},iaau:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("fXoL"),o=function(){var t=function t(){a(this,t)};return t.\u0275mod=r.Gb({type:t}),t.\u0275inj=r.Fb({factory:function(e){return new(e||t)}}),t}()}}])}();