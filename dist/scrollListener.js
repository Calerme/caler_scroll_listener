!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.scrollListener=t():e.scrollListener=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var l,a=e[Symbol.iterator]();!(n=(l=a.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(o)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e,t){var r=Object.assign({},{relative:"viewport",top:20,bottom:null,itemSelector:"[data-scroll-item]",reduceTime:100},t),o={};function i(e,t){var r=null;return function(){r||(r=setTimeout(function(){e(),clearTimeout(r),r=null},t))}}o.wrapper=e instanceof HTMLElement?e:document.querySelector(e),o.items=Array.from(document.querySelectorAll(r.itemSelector)),"viewport"===r.relative?o.wrapper.onscroll=i(function(){var e=null,t=null,i=[],l=!0,a=!1,u=void 0;try{for(var c,f=o.items.entries()[Symbol.iterator]();!(l=(c=f.next()).done);l=!0){var s=c.value,p=n(s,2),y=p[0],v=p[1];i[y]=v.getBoundingClientRect().top}}catch(e){a=!0,u=e}finally{try{!l&&f.return&&f.return()}finally{if(a)throw u}}if(i[o.items.length-1]<0)t=o.items.length-1,e=o.items[t];else{var d=[],m=!0,b=!1,h=void 0;try{for(var w,x=i.entries()[Symbol.iterator]();!(m=(w=x.next()).done);m=!0){var g=w.value,S=n(g,2),M=S[0],j=S[1];if(d[M]=Math.abs(j),j>=0&&j<=r.top){t=M,e=o.items[t];break}}}catch(e){b=!0,h=e}finally{try{!m&&x.return&&x.return()}finally{if(b)throw h}}e||(t=d.indexOf(Math.min.apply(Math,d)),e=o.items[t])}r.cb&&r.cb(e,t)},r.reduceTime):"wrapper"===r.relative&&(o.wrapper.onscroll=i(function(){var e=o.wrapper,t=[];"static"===getComputedStyle(e).position&&(e.style.position="relative");var i=!0,l=!1,a=void 0;try{for(var u,c=o.items.entries()[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var f=u.value,s=n(f,2),p=s[0],y=s[1];t[p]=y.offsetTop}}catch(e){l=!0,a=e}finally{try{!i&&c.return&&c.return()}finally{if(l)throw a}}return function(){var i=e.scrollHeight,l=e.scrollTop,a=e.clientHeight,u=null,c=null,f=[];if(i-l===a)c=o.items.length-1,u=o.items[c];else{var s=!0,p=!1,y=void 0;try{for(var v,d=o.items.entries()[Symbol.iterator]();!(s=(v=d.next()).done);s=!0){var m=v.value,b=n(m,2),h=b[0],w=b[1],x=t[h]-l;if(f[h]=Math.abs(x),x>=0&&x<=r.top){u=w,c=h;break}}}catch(e){p=!0,y=e}finally{try{!s&&d.return&&d.return()}finally{if(p)throw y}}if(!u){var g=f.indexOf(Math.min.apply(Math,f));u=o.items[g],c=g}}r.cb&&r.cb(u,c)}}(),r.reduceTime))}}]).default});