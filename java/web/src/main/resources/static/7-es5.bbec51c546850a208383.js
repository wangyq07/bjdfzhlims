!function(){function t(e,n){return(t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(e,n)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,i=r(t);if(e){var a=r(this).constructor;o=Reflect.construct(i,arguments,a)}else o=i.apply(this,arguments);return n(this,o)}}function n(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{K7LP:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){function t(e){var n=this;o(this,t),this.indexService=e,this.auth={};var r=this.indexService.menuChange.subscribe((function(t){n.baseInit(),r.unsubscribe()}))}return a(t,[{key:"baseInit",value:function(){var t,e,n,r,o,i=this;this.menu=null===(e=null===(t=this.indexService.auth.user.permissions)||void 0===t?void 0:t.menus)||void 0===e?void 0:e.find((function(t){return t.router==i.indexService.session.activatedPage})),this.actions=null===(r=null===(n=this.indexService.auth.user.permissions)||void 0===n?void 0:n.actions)||void 0===r?void 0:r.filter((function(t){var e;return t.menuId==(null===(e=i.menu)||void 0===e?void 0:e.id)})),null===(o=this.actions)||void 0===o||o.forEach((function(t){return i.auth[t.code]=!0}))}},{key:"unAuth",value:function(t){return!this.auth[t]}}]),t}()},LZRM:function(n,r,i){"use strict";i.d(r,"a",(function(){return d}));var l=i("bRdP"),s=i("NtM8"),c=i("fXoL"),d=function(){var n=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(i,n);var r=e(i);function i(t){var e;return o(this,i),(e=r.call(this,t,{controller:{name:"contacts",servicetype:"businessprocess"}})).http=t,e}return a(i,[{key:"updatecontactinfo",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updatecontactinfo",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"getcontactproject",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/getcontactproject",{contactid:t},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"addcontactproject",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/addcontactproject",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"updatecontacttest",value:function(t){var e,n;return this.http.post((null===(e=this.option.controller)||void 0===e?void 0:e.name)+"/updatecontacttest",t,null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}},{key:"updateprojectnumer",value:function(t,e){var n;return this.http.post("contactprojects/updateprojectnumer",{contactid:t,standardfee:e},null===(n=this.option.controller)||void 0===n?void 0:n.servicetype)}}]),i}(l.a);return n.\u0275fac=function(t){return new(t||n)(c.Sb(s.a))},n.\u0275prov=c.Eb({token:n,factory:n.\u0275fac,providedIn:"root"}),n}()},rdXg:function(t,e,n){var r;window,r=function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,(function(e){return t[e]}).bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}({"./src/index.js":function(t,e,n){"use strict";n.r(e),n("./src/sass/index.scss");var r=n("./src/js/init.js").default.init;"undefined"!=typeof window&&(window.printJS=r),e.default=r},"./src/js/browser.js":function(t,e,n){"use strict";n.r(e);var r={isFirefox:function(){return"undefined"!=typeof InstallTrigger},isIE:function(){return-1!==navigator.userAgent.indexOf("MSIE")||!!document.documentMode},isEdge:function(){return!r.isIE()&&!!window.StyleMedia},isChrome:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return!!t.chrome},isSafari:function(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0||-1!==navigator.userAgent.toLowerCase().indexOf("safari")},isIOSChrome:function(){return-1!==navigator.userAgent.toLowerCase().indexOf("crios")}};e.default=r},"./src/js/functions.js":function(t,e,n){"use strict";n.r(e),n.d(e,"addWrapper",(function(){return a})),n.d(e,"capitalizePrint",(function(){return l})),n.d(e,"collectStyles",(function(){return s})),n.d(e,"addHeader",(function(){return d})),n.d(e,"cleanUp",(function(){return u})),n.d(e,"isRawHTML",(function(){return f}));var r=n("./src/js/modal.js"),o=n("./src/js/browser.js");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){return'<div style="font-family:'+e.font+" !important; font-size: "+e.font_size+' !important; width:100%;">'+t+"</div>"}function l(t){return t.charAt(0).toUpperCase()+t.slice(1)}function s(t,e){for(var n="",r=(document.defaultView||window).getComputedStyle(t,""),o=0;o<r.length;o++)(-1!==e.targetStyles.indexOf("*")||-1!==e.targetStyle.indexOf(r[o])||c(e.targetStyles,r[o]))&&r.getPropertyValue(r[o])&&(n+=r[o]+":"+r.getPropertyValue(r[o])+";");return n+"max-width: "+e.maxWidth+"px !important; font-size: "+e.font_size+" !important;"}function c(t,e){for(var n=0;n<t.length;n++)if("object"===i(e)&&-1!==e.indexOf(t[n]))return!0;return!1}function d(t,e){var n=document.createElement("div");if(f(e.header))n.innerHTML=e.header;else{var r=document.createElement("h1"),o=document.createTextNode(e.header);r.appendChild(o),r.setAttribute("style",e.headerStyle),n.appendChild(r)}t.insertBefore(n,t.childNodes[0])}function u(t){t.showModal&&r.default.close(),t.onLoadingEnd&&t.onLoadingEnd(),(t.showModal||t.onLoadingStart)&&window.URL.revokeObjectURL(t.printable);var e="mouseover";(o.default.isChrome()||o.default.isFirefox())&&(e="focus"),window.addEventListener(e,(function n(){window.removeEventListener(e,n),t.onPrintDialogClose();var r=document.getElementById(t.frameId);r&&r.remove()}))}function f(t){return new RegExp("<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>").test(t)}},"./src/js/html.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/functions.js"),o=n("./src/js/print.js");e.default={print:function(t,e){var n=document.getElementById(t.printable);n?(t.printableElement=function t(e,n){for(var o=e.cloneNode(),i=Array.prototype.slice.call(e.childNodes),a=0;a<i.length;a++)if(-1===n.ignoreElements.indexOf(i[a].id)){var l=t(i[a],n);o.appendChild(l)}switch(n.scanStyles&&1===e.nodeType&&o.setAttribute("style",Object(r.collectStyles)(e,n)),e.tagName){case"SELECT":o.value=e.value;break;case"CANVAS":o.getContext("2d").drawImage(e,0,0)}return o}(n,t),t.header&&Object(r.addHeader)(t.printableElement,t),o.default.send(t,e)):window.console.error("Invalid HTML element id: "+t.printable)}}},"./src/js/image.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/functions.js"),o=n("./src/js/print.js"),i=n("./src/js/browser.js");e.default={print:function(t,e){t.printable.constructor!==Array&&(t.printable=[t.printable]),t.printableElement=document.createElement("div"),t.printable.forEach((function(e){var n=document.createElement("img");n.setAttribute("style",t.imageStyle),n.src=e,i.default.isFirefox()&&(n.src=n.src);var r=document.createElement("div");r.appendChild(n),t.printableElement.appendChild(r)})),t.header&&Object(r.addHeader)(t.printableElement,t),o.default.send(t,e)}}},"./src/js/init.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/browser.js"),o=n("./src/js/modal.js"),i=n("./src/js/pdf.js"),a=n("./src/js/html.js"),l=n("./src/js/raw-html.js"),s=n("./src/js/image.js"),c=n("./src/js/json.js");function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u=["pdf","html","image","json","raw-html"];e.default={init:function(){var t={printable:null,fallbackPrintable:null,type:"pdf",header:null,headerStyle:"font-weight: 300;",maxWidth:800,properties:null,gridHeaderStyle:"font-weight: bold; padding: 5px; border: 1px solid #dddddd;",gridStyle:"border: 1px solid lightgray; margin-bottom: -1px;",showModal:!1,onError:function(t){throw t},onLoadingStart:null,onLoadingEnd:null,onPrintDialogClose:function(){},onIncompatibleBrowser:function(){},modalMessage:"Retrieving Document...",frameId:"printJS",printableElement:null,documentTitle:"Document",targetStyle:["clear","display","width","min-width","height","min-height","max-height"],targetStyles:["border","box","break","text-decoration"],ignoreElements:[],repeatTableHeader:!0,css:null,style:null,scanStyles:!0,base64:!1,onPdfOpen:null,font:"TimesNewRoman",font_size:"12pt",honorMarginPadding:!0,honorColor:!1,imageStyle:"max-width: 100%;"},e=arguments[0];if(void 0===e)throw new Error("printJS expects at least 1 attribute.");switch(d(e)){case"string":t.printable=encodeURI(e),t.fallbackPrintable=t.printable,t.type=arguments[1]||t.type;break;case"object":for(var n in t.printable=e.printable,t.fallbackPrintable=void 0!==e.fallbackPrintable?e.fallbackPrintable:t.printable,t.fallbackPrintable=t.base64?"data:application/pdf;base64,".concat(t.fallbackPrintable):t.fallbackPrintable,t)"printable"!==n&&"fallbackPrintable"!==n&&(t[n]=void 0!==e[n]?e[n]:t[n]);break;default:throw new Error('Unexpected argument type! Expected "string" or "object", got '+d(e))}if(!t.printable)throw new Error("Missing printable information.");if(!t.type||"string"!=typeof t.type||-1===u.indexOf(t.type.toLowerCase()))throw new Error("Invalid print type. Available types are: pdf, html, image and json.");t.showModal&&o.default.show(t),t.onLoadingStart&&t.onLoadingStart();var f=document.getElementById(t.frameId);f&&f.parentNode.removeChild(f);var p=document.createElement("iframe");switch(r.default.isFirefox()?p.setAttribute("style","width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0"):p.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute; border: 0"),p.setAttribute("id",t.frameId),"pdf"!==t.type&&(p.srcdoc="<html><head><title>"+t.documentTitle+"</title>",t.css&&(Array.isArray(t.css)||(t.css=[t.css]),t.css.forEach((function(t){p.srcdoc+='<link rel="stylesheet" href="'+t+'">'}))),p.srcdoc+="</head><body></body></html>"),t.type){case"pdf":if(r.default.isIE())try{console.info("Print.js doesn't support PDF printing in Internet Explorer.");var b=window.open(t.fallbackPrintable,"_blank");b.focus(),t.onIncompatibleBrowser()}catch(m){t.onError(m)}finally{t.showModal&&o.default.close(),t.onLoadingEnd&&t.onLoadingEnd()}else i.default.print(t,p);break;case"image":s.default.print(t,p);break;case"html":a.default.print(t,p);break;case"raw-html":l.default.print(t,p);break;case"json":c.default.print(t,p)}}}},"./src/js/json.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/functions.js"),o=n("./src/js/print.js");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}e.default={print:function(t,e){if("object"!==i(t.printable))throw new Error("Invalid javascript data object (JSON).");if("boolean"!=typeof t.repeatTableHeader)throw new Error("Invalid value for repeatTableHeader attribute (JSON).");if(!t.properties||!Array.isArray(t.properties))throw new Error("Invalid properties array for your JSON data.");t.properties=t.properties.map((function(e){return{field:"object"===i(e)?e.field:e,displayName:"object"===i(e)?e.displayName:e,columnSize:"object"===i(e)&&e.columnSize?e.columnSize+";":100/t.properties.length+"%;"}})),t.printableElement=document.createElement("div"),t.header&&Object(r.addHeader)(t.printableElement,t),t.printableElement.innerHTML+=function(t){var e=t.printable,n=t.properties,o='<table style="border-collapse: collapse; width: 100%;">';t.repeatTableHeader&&(o+="<thead>"),o+="<tr>";for(var i=0;i<n.length;i++)o+='<th style="width:'+n[i].columnSize+";"+t.gridHeaderStyle+'">'+Object(r.capitalizePrint)(n[i].displayName)+"</th>";o+="</tr>",t.repeatTableHeader&&(o+="</thead>"),o+="<tbody>";for(var a=0;a<e.length;a++){o+="<tr>";for(var l=0;l<n.length;l++){var s=e[a],c=n[l].field.split(".");if(c.length>1)for(var d=0;d<c.length;d++)s=s[c[d]];else s=s[n[l].field];o+='<td style="width:'+n[l].columnSize+t.gridStyle+'">'+s+"</td>"}o+="</tr>"}return o+"</tbody></table>"}(t),o.default.send(t,e)}}},"./src/js/modal.js":function(t,e,n){"use strict";n.r(e);var r={show:function(t){var e=document.createElement("div");e.setAttribute("style","font-family:sans-serif; display:table; text-align:center; font-weight:300; font-size:30px; left:0; top:0;position:fixed; z-index: 9990;color: #0460B5; width: 100%; height: 100%; background-color:rgba(255,255,255,.9);transition: opacity .3s ease;"),e.setAttribute("id","printJS-Modal");var n=document.createElement("div");n.setAttribute("style","display:table-cell; vertical-align:middle; padding-bottom:100px;");var o=document.createElement("div");o.setAttribute("class","printClose"),o.setAttribute("id","printClose"),n.appendChild(o);var i=document.createElement("span");i.setAttribute("class","printSpinner"),n.appendChild(i);var a=document.createTextNode(t.modalMessage);n.appendChild(a),e.appendChild(n),document.getElementsByTagName("body")[0].appendChild(e),document.getElementById("printClose").addEventListener("click",(function(){r.close()}))},close:function(){var t=document.getElementById("printJS-Modal");t&&t.parentNode.removeChild(t)}};e.default=r},"./src/js/pdf.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/print.js"),o=n("./src/js/functions.js");function i(t,e,n){var o=new window.Blob([n],{type:"application/pdf"});o=window.URL.createObjectURL(o),e.setAttribute("src",o),r.default.send(t,e)}e.default={print:function(t,e){if(t.base64){var n=Uint8Array.from(atob(t.printable),(function(t){return t.charCodeAt(0)}));i(t,e,n)}else{t.printable=/^(blob|http|\/\/)/i.test(t.printable)?t.printable:window.location.origin+("/"!==t.printable.charAt(0)?"/"+t.printable:t.printable);var r=new window.XMLHttpRequest;r.responseType="arraybuffer",r.addEventListener("error",(function(){Object(o.cleanUp)(t),t.onError(r.statusText)})),r.addEventListener("load",(function(){if(-1===[200,201].indexOf(r.status))return Object(o.cleanUp)(t),void t.onError(r.statusText);i(t,e,r.response)})),r.open("GET",t.printable,!0),r.send()}}}},"./src/js/print.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/browser.js"),o=n("./src/js/functions.js");function i(t,e){try{if(t.focus(),r.default.isEdge()||r.default.isIE())try{t.contentWindow.document.execCommand("print",!1,null)}catch(n){t.contentWindow.print()}else t.contentWindow.print()}catch(i){e.onError(i)}finally{r.default.isFirefox()&&(t.style.visibility="hidden",t.style.left="-1px"),Object(o.cleanUp)(e)}}e.default={send:function(t,e){document.getElementsByTagName("body")[0].appendChild(e);var n=document.getElementById(t.frameId);n.onload=function(){if("pdf"!==t.type){var e=n.contentWindow||n.contentDocument;if(e.document&&(e=e.document),e.body.appendChild(t.printableElement),"pdf"!==t.type&&t.style){var o=document.createElement("style");o.innerHTML=t.style,e.head.appendChild(o)}var a=e.getElementsByTagName("img");a.length>0?function(t){var e=t.map((function(t){if(t.src&&t.src!==window.location.href)return function(t){return new Promise((function(e){!function n(){t&&void 0!==t.naturalWidth&&0!==t.naturalWidth&&t.complete?e():setTimeout(n,500)}()}))}(t)}));return Promise.all(e)}(Array.from(a)).then((function(){return i(n,t)})):i(n,t)}else r.default.isFirefox()?setTimeout((function(){return i(n,t)}),1e3):i(n,t)}}}},"./src/js/raw-html.js":function(t,e,n){"use strict";n.r(e);var r=n("./src/js/print.js");e.default={print:function(t,e){t.printableElement=document.createElement("div"),t.printableElement.setAttribute("style","width:100%"),t.printableElement.innerHTML=t.printable,r.default.send(t,e)}}},"./src/sass/index.scss":function(t,e,n){},0:function(t,e,n){t.exports=n("./src/index.js")}}).default},t.exports=r()}}])}();