import{j as L,k as ar,p as di,l as Pe,m as mi,h as pi,c as ur,n as gi,L as _i,f as yi,F as Ei,o as sn,d as wi,e as Ii,C as Ti,r as Fn,S as Ai}from"./index.esm-BJyg3Ya6.js";var kn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var lr;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(h,a){function l(){}l.prototype=a.prototype,h.F=a.prototype,h.prototype=new l,h.prototype.constructor=h,h.D=function(d,f,p){for(var u=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)u[Et-2]=arguments[Et];return a.prototype[f].apply(d,u)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(h,a,l){l||(l=0);const d=Array(16);if(typeof a=="string")for(var f=0;f<16;++f)d[f]=a.charCodeAt(l++)|a.charCodeAt(l++)<<8|a.charCodeAt(l++)<<16|a.charCodeAt(l++)<<24;else for(f=0;f<16;++f)d[f]=a[l++]|a[l++]<<8|a[l++]<<16|a[l++]<<24;a=h.g[0],l=h.g[1],f=h.g[2];let p=h.g[3],u;u=a+(p^l&(f^p))+d[0]+3614090360&4294967295,a=l+(u<<7&4294967295|u>>>25),u=p+(f^a&(l^f))+d[1]+3905402710&4294967295,p=a+(u<<12&4294967295|u>>>20),u=f+(l^p&(a^l))+d[2]+606105819&4294967295,f=p+(u<<17&4294967295|u>>>15),u=l+(a^f&(p^a))+d[3]+3250441966&4294967295,l=f+(u<<22&4294967295|u>>>10),u=a+(p^l&(f^p))+d[4]+4118548399&4294967295,a=l+(u<<7&4294967295|u>>>25),u=p+(f^a&(l^f))+d[5]+1200080426&4294967295,p=a+(u<<12&4294967295|u>>>20),u=f+(l^p&(a^l))+d[6]+2821735955&4294967295,f=p+(u<<17&4294967295|u>>>15),u=l+(a^f&(p^a))+d[7]+4249261313&4294967295,l=f+(u<<22&4294967295|u>>>10),u=a+(p^l&(f^p))+d[8]+1770035416&4294967295,a=l+(u<<7&4294967295|u>>>25),u=p+(f^a&(l^f))+d[9]+2336552879&4294967295,p=a+(u<<12&4294967295|u>>>20),u=f+(l^p&(a^l))+d[10]+4294925233&4294967295,f=p+(u<<17&4294967295|u>>>15),u=l+(a^f&(p^a))+d[11]+2304563134&4294967295,l=f+(u<<22&4294967295|u>>>10),u=a+(p^l&(f^p))+d[12]+1804603682&4294967295,a=l+(u<<7&4294967295|u>>>25),u=p+(f^a&(l^f))+d[13]+4254626195&4294967295,p=a+(u<<12&4294967295|u>>>20),u=f+(l^p&(a^l))+d[14]+2792965006&4294967295,f=p+(u<<17&4294967295|u>>>15),u=l+(a^f&(p^a))+d[15]+1236535329&4294967295,l=f+(u<<22&4294967295|u>>>10),u=a+(f^p&(l^f))+d[1]+4129170786&4294967295,a=l+(u<<5&4294967295|u>>>27),u=p+(l^f&(a^l))+d[6]+3225465664&4294967295,p=a+(u<<9&4294967295|u>>>23),u=f+(a^l&(p^a))+d[11]+643717713&4294967295,f=p+(u<<14&4294967295|u>>>18),u=l+(p^a&(f^p))+d[0]+3921069994&4294967295,l=f+(u<<20&4294967295|u>>>12),u=a+(f^p&(l^f))+d[5]+3593408605&4294967295,a=l+(u<<5&4294967295|u>>>27),u=p+(l^f&(a^l))+d[10]+38016083&4294967295,p=a+(u<<9&4294967295|u>>>23),u=f+(a^l&(p^a))+d[15]+3634488961&4294967295,f=p+(u<<14&4294967295|u>>>18),u=l+(p^a&(f^p))+d[4]+3889429448&4294967295,l=f+(u<<20&4294967295|u>>>12),u=a+(f^p&(l^f))+d[9]+568446438&4294967295,a=l+(u<<5&4294967295|u>>>27),u=p+(l^f&(a^l))+d[14]+3275163606&4294967295,p=a+(u<<9&4294967295|u>>>23),u=f+(a^l&(p^a))+d[3]+4107603335&4294967295,f=p+(u<<14&4294967295|u>>>18),u=l+(p^a&(f^p))+d[8]+1163531501&4294967295,l=f+(u<<20&4294967295|u>>>12),u=a+(f^p&(l^f))+d[13]+2850285829&4294967295,a=l+(u<<5&4294967295|u>>>27),u=p+(l^f&(a^l))+d[2]+4243563512&4294967295,p=a+(u<<9&4294967295|u>>>23),u=f+(a^l&(p^a))+d[7]+1735328473&4294967295,f=p+(u<<14&4294967295|u>>>18),u=l+(p^a&(f^p))+d[12]+2368359562&4294967295,l=f+(u<<20&4294967295|u>>>12),u=a+(l^f^p)+d[5]+4294588738&4294967295,a=l+(u<<4&4294967295|u>>>28),u=p+(a^l^f)+d[8]+2272392833&4294967295,p=a+(u<<11&4294967295|u>>>21),u=f+(p^a^l)+d[11]+1839030562&4294967295,f=p+(u<<16&4294967295|u>>>16),u=l+(f^p^a)+d[14]+4259657740&4294967295,l=f+(u<<23&4294967295|u>>>9),u=a+(l^f^p)+d[1]+2763975236&4294967295,a=l+(u<<4&4294967295|u>>>28),u=p+(a^l^f)+d[4]+1272893353&4294967295,p=a+(u<<11&4294967295|u>>>21),u=f+(p^a^l)+d[7]+4139469664&4294967295,f=p+(u<<16&4294967295|u>>>16),u=l+(f^p^a)+d[10]+3200236656&4294967295,l=f+(u<<23&4294967295|u>>>9),u=a+(l^f^p)+d[13]+681279174&4294967295,a=l+(u<<4&4294967295|u>>>28),u=p+(a^l^f)+d[0]+3936430074&4294967295,p=a+(u<<11&4294967295|u>>>21),u=f+(p^a^l)+d[3]+3572445317&4294967295,f=p+(u<<16&4294967295|u>>>16),u=l+(f^p^a)+d[6]+76029189&4294967295,l=f+(u<<23&4294967295|u>>>9),u=a+(l^f^p)+d[9]+3654602809&4294967295,a=l+(u<<4&4294967295|u>>>28),u=p+(a^l^f)+d[12]+3873151461&4294967295,p=a+(u<<11&4294967295|u>>>21),u=f+(p^a^l)+d[15]+530742520&4294967295,f=p+(u<<16&4294967295|u>>>16),u=l+(f^p^a)+d[2]+3299628645&4294967295,l=f+(u<<23&4294967295|u>>>9),u=a+(f^(l|~p))+d[0]+4096336452&4294967295,a=l+(u<<6&4294967295|u>>>26),u=p+(l^(a|~f))+d[7]+1126891415&4294967295,p=a+(u<<10&4294967295|u>>>22),u=f+(a^(p|~l))+d[14]+2878612391&4294967295,f=p+(u<<15&4294967295|u>>>17),u=l+(p^(f|~a))+d[5]+4237533241&4294967295,l=f+(u<<21&4294967295|u>>>11),u=a+(f^(l|~p))+d[12]+1700485571&4294967295,a=l+(u<<6&4294967295|u>>>26),u=p+(l^(a|~f))+d[3]+2399980690&4294967295,p=a+(u<<10&4294967295|u>>>22),u=f+(a^(p|~l))+d[10]+4293915773&4294967295,f=p+(u<<15&4294967295|u>>>17),u=l+(p^(f|~a))+d[1]+2240044497&4294967295,l=f+(u<<21&4294967295|u>>>11),u=a+(f^(l|~p))+d[8]+1873313359&4294967295,a=l+(u<<6&4294967295|u>>>26),u=p+(l^(a|~f))+d[15]+4264355552&4294967295,p=a+(u<<10&4294967295|u>>>22),u=f+(a^(p|~l))+d[6]+2734768916&4294967295,f=p+(u<<15&4294967295|u>>>17),u=l+(p^(f|~a))+d[13]+1309151649&4294967295,l=f+(u<<21&4294967295|u>>>11),u=a+(f^(l|~p))+d[4]+4149444226&4294967295,a=l+(u<<6&4294967295|u>>>26),u=p+(l^(a|~f))+d[11]+3174756917&4294967295,p=a+(u<<10&4294967295|u>>>22),u=f+(a^(p|~l))+d[2]+718787259&4294967295,f=p+(u<<15&4294967295|u>>>17),u=l+(p^(f|~a))+d[9]+3951481745&4294967295,h.g[0]=h.g[0]+a&4294967295,h.g[1]=h.g[1]+(f+(u<<21&4294967295|u>>>11))&4294967295,h.g[2]=h.g[2]+f&4294967295,h.g[3]=h.g[3]+p&4294967295}r.prototype.v=function(h,a){a===void 0&&(a=h.length);const l=a-this.blockSize,d=this.C;let f=this.h,p=0;for(;p<a;){if(f==0)for(;p<=l;)i(this,h,p),p+=this.blockSize;if(typeof h=="string"){for(;p<a;)if(d[f++]=h.charCodeAt(p++),f==this.blockSize){i(this,d),f=0;break}}else for(;p<a;)if(d[f++]=h[p++],f==this.blockSize){i(this,d),f=0;break}}this.h=f,this.o+=a},r.prototype.A=function(){var h=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);h[0]=128;for(var a=1;a<h.length-8;++a)h[a]=0;a=this.o*8;for(var l=h.length-8;l<h.length;++l)h[l]=a&255,a/=256;for(this.v(h),h=Array(16),a=0,l=0;l<4;++l)for(let d=0;d<32;d+=8)h[a++]=this.g[l]>>>d&255;return h};function s(h,a){var l=c;return Object.prototype.hasOwnProperty.call(l,h)?l[h]:l[h]=a(h)}function o(h,a){this.h=a;const l=[];let d=!0;for(let f=h.length-1;f>=0;f--){const p=h[f]|0;d&&p==a||(l[f]=p,d=!1)}this.g=l}var c={};function m(h){return-128<=h&&h<128?s(h,function(a){return new o([a|0],a<0?-1:0)}):new o([h|0],h<0?-1:0)}function g(h){if(isNaN(h)||!isFinite(h))return E;if(h<0)return b(g(-h));const a=[];let l=1;for(let d=0;h>=l;d++)a[d]=h/l|0,l*=4294967296;return new o(a,0)}function _(h,a){if(h.length==0)throw Error("number format error: empty string");if(a=a||10,a<2||36<a)throw Error("radix out of range: "+a);if(h.charAt(0)=="-")return b(_(h.substring(1),a));if(h.indexOf("-")>=0)throw Error('number format error: interior "-" character');const l=g(Math.pow(a,8));let d=E;for(let p=0;p<h.length;p+=8){var f=Math.min(8,h.length-p);const u=parseInt(h.substring(p,p+f),a);f<8?(f=g(Math.pow(a,f)),d=d.j(f).add(g(u))):(d=d.j(l),d=d.add(g(u)))}return d}var E=m(0),I=m(1),v=m(16777216);n=o.prototype,n.m=function(){if(V(this))return-b(this).m();let h=0,a=1;for(let l=0;l<this.g.length;l++){const d=this.i(l);h+=(d>=0?d:4294967296+d)*a,a*=4294967296}return h},n.toString=function(h){if(h=h||10,h<2||36<h)throw Error("radix out of range: "+h);if(N(this))return"0";if(V(this))return"-"+b(this).toString(h);const a=g(Math.pow(h,6));var l=this;let d="";for(;;){const f=z(l,a).g;l=G(l,f.j(a));let p=((l.g.length>0?l.g[0]:l.h)>>>0).toString(h);if(l=f,N(l))return p+d;for(;p.length<6;)p="0"+p;d=p+d}},n.i=function(h){return h<0?0:h<this.g.length?this.g[h]:this.h};function N(h){if(h.h!=0)return!1;for(let a=0;a<h.g.length;a++)if(h.g[a]!=0)return!1;return!0}function V(h){return h.h==-1}n.l=function(h){return h=G(this,h),V(h)?-1:N(h)?0:1};function b(h){const a=h.g.length,l=[];for(let d=0;d<a;d++)l[d]=~h.g[d];return new o(l,~h.h).add(I)}n.abs=function(){return V(this)?b(this):this},n.add=function(h){const a=Math.max(this.g.length,h.g.length),l=[];let d=0;for(let f=0;f<=a;f++){let p=d+(this.i(f)&65535)+(h.i(f)&65535),u=(p>>>16)+(this.i(f)>>>16)+(h.i(f)>>>16);d=u>>>16,p&=65535,u&=65535,l[f]=u<<16|p}return new o(l,l[l.length-1]&-2147483648?-1:0)};function G(h,a){return h.add(b(a))}n.j=function(h){if(N(this)||N(h))return E;if(V(this))return V(h)?b(this).j(b(h)):b(b(this).j(h));if(V(h))return b(this.j(b(h)));if(this.l(v)<0&&h.l(v)<0)return g(this.m()*h.m());const a=this.g.length+h.g.length,l=[];for(var d=0;d<2*a;d++)l[d]=0;for(d=0;d<this.g.length;d++)for(let f=0;f<h.g.length;f++){const p=this.i(d)>>>16,u=this.i(d)&65535,Et=h.i(f)>>>16,Dn=h.i(f)&65535;l[2*d+2*f]+=u*Dn,B(l,2*d+2*f),l[2*d+2*f+1]+=p*Dn,B(l,2*d+2*f+1),l[2*d+2*f+1]+=u*Et,B(l,2*d+2*f+1),l[2*d+2*f+2]+=p*Et,B(l,2*d+2*f+2)}for(h=0;h<a;h++)l[h]=l[2*h+1]<<16|l[2*h];for(h=a;h<2*a;h++)l[h]=0;return new o(l,0)};function B(h,a){for(;(h[a]&65535)!=h[a];)h[a+1]+=h[a]>>>16,h[a]&=65535,a++}function it(h,a){this.g=h,this.h=a}function z(h,a){if(N(a))throw Error("division by zero");if(N(h))return new it(E,E);if(V(h))return a=z(b(h),a),new it(b(a.g),b(a.h));if(V(a))return a=z(h,b(a)),new it(b(a.g),a.h);if(h.g.length>30){if(V(h)||V(a))throw Error("slowDivide_ only works with positive integers.");for(var l=I,d=a;d.l(h)<=0;)l=st(l),d=st(d);var f=lt(l,1),p=lt(d,1);for(d=lt(d,2),l=lt(l,2);!N(d);){var u=p.add(d);u.l(h)<=0&&(f=f.add(l),p=u),d=lt(d,1),l=lt(l,1)}return a=G(h,f.j(a)),new it(f,a)}for(f=E;h.l(a)>=0;){for(l=Math.max(1,Math.floor(h.m()/a.m())),d=Math.ceil(Math.log(l)/Math.LN2),d=d<=48?1:Math.pow(2,d-48),p=g(l),u=p.j(a);V(u)||u.l(h)>0;)l-=d,p=g(l),u=p.j(a);N(p)&&(p=I),f=f.add(p),h=G(h,u)}return new it(f,h)}n.B=function(h){return z(this,h).h},n.and=function(h){const a=Math.max(this.g.length,h.g.length),l=[];for(let d=0;d<a;d++)l[d]=this.i(d)&h.i(d);return new o(l,this.h&h.h)},n.or=function(h){const a=Math.max(this.g.length,h.g.length),l=[];for(let d=0;d<a;d++)l[d]=this.i(d)|h.i(d);return new o(l,this.h|h.h)},n.xor=function(h){const a=Math.max(this.g.length,h.g.length),l=[];for(let d=0;d<a;d++)l[d]=this.i(d)^h.i(d);return new o(l,this.h^h.h)};function st(h){const a=h.g.length+1,l=[];for(let d=0;d<a;d++)l[d]=h.i(d)<<1|h.i(d-1)>>>31;return new o(l,h.h)}function lt(h,a){const l=a>>5;a%=32;const d=h.g.length-l,f=[];for(let p=0;p<d;p++)f[p]=a>0?h.i(p+l)>>>a|h.i(p+l+1)<<32-a:h.i(p+l);return new o(f,h.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=g,o.fromString=_,lr=o}).apply(typeof kn<"u"?kn:typeof self<"u"?self:typeof window<"u"?window:{});function M(n,t,e,r){if(e==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?n!==t||!r:!t.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?r:e==="a"?r.call(n):r?r.value:t.get(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}K.UNAUTHENTICATED=new K(null),K.GOOGLE_CREDENTIALS=new K("google-credentials-uid"),K.FIRST_PARTY=new K("first-party-uid"),K.MOCK_USER=new K("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ut="13.3.0";function bi(n){Ut=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new _i("@firebase/firestore");function Us(n){Tt.setLogLevel(n)}function At(n,...t){if(Tt.logLevel<=sn.DEBUG){const e=t.map(on);Tt.debug(`Firestore (${Ut}): ${n}`,...e)}}function De(n,...t){if(Tt.logLevel<=sn.ERROR){const e=t.map(on);Tt.error(`Firestore (${Ut}): ${n}`,...e)}}function cr(n,...t){if(Tt.logLevel<=sn.WARN){const e=t.map(on);Tt.warn(`Firestore (${Ut}): ${n}`,...e)}}function on(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,hr(n,r,e)}function hr(n,t,e){let r=`FIRESTORE (${Ut}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw De(r),new Error(r)}function H(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||hr(t,i,r)}function bt(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class w extends Ei{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Vi{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(K.UNAUTHENTICATED))}shutdown(){}}class vi{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ni{constructor(t){this.auth=null,t.onInit(e=>{this.auth=e})}getToken(){return this.auth?this.auth.getToken().then(t=>t?(H(typeof t.accessToken=="string",42297,{Z:t}),new fr(t.accessToken,new K(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}class xi{constructor(t,e,r){this.ee=t,this.te=e,this.re=r,this.type="FirstParty",this.user=K.FIRST_PARTY,this.ne=new Map}ie(){return this.re?this.re():null}get headers(){this.ne.set("X-Goog-AuthUser",this.ee);const t=this.ie();return t&&this.ne.set("Authorization",t),this.te&&this.ne.set("X-Goog-Iam-Authorization-Token",this.te),this.ne}}class Ri{constructor(t,e,r){this.ee=t,this.te=e,this.re=r}getToken(){return Promise.resolve(new xi(this.ee,this.te,this.re))}start(t,e){t.enqueueRetryable(()=>e(K.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class On{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Si{constructor(t,e){this.se=e,this.appCheck=null,this.oe=null,wi(t)&&t.settings.appCheckToken&&(this.oe=t.settings.appCheckToken),e.onInit(r=>{this.appCheck=r})}getToken(){return this.oe?Promise.resolve(new On(this.oe)):this.appCheck?this.appCheck.getToken().then(t=>t?(H(typeof t.token=="string",3470,{tokenResult:t}),new On(t.token)):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,r,i,s,o,c,m,g,_,E,I,v){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=m,this.useFetchStreams=g,this.isUsingEmulator=_,this.apiKey=E,this._customHeaders=I,this.grpcFlowControlWindow=v}}const pe="(default)";class Wt{constructor(t,e){this.projectId=t,this.database=e||pe}static empty(){return new Wt("","")}get isDefaultDatabase(){return this.database===pe}isEqual(t){return t instanceof Wt&&t.projectId===this.projectId&&t.database===this.database}}function Di(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new w(y.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wt(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Fi(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<e&&(r+=t.charAt(i[s]%62))}return r}}function k(n,t){return n<t?-1:n>t?1:0}function Ht(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const i=n.charAt(r),s=t.charAt(r);if(i!==s)return Ke(i)===Ke(s)?k(i,s):Ke(i)?1:-1}return k(n.length,t.length)}const Oi=55296,Ci=57343;function Ke(n){const t=n.charCodeAt(0);return t>=Oi&&t<=Ci}function an(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="__name__";class ot{constructor(t,e,r){e===void 0?e=0:e>t.length&&R(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&R(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return ot.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ot?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const s=ot.compareSegments(t.get(i),e.get(i));if(s!==0)return s}return k(t.length,e.length)}static compareSegments(t,e){const r=ot.isNumericId(t),i=ot.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?ot.extractNumericId(t).compare(ot.extractNumericId(e)):Ht(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return lr.fromString(t.substring(4,t.length-2))}}class F extends ot{construct(t,e,r){return new F(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new w(y.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new F(e)}static emptyPath(){return new F([])}}const Li=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let _t=class kt extends ot{construct(t,e,r){return new kt(t,e,r)}static isValidIdentifier(t){return Li.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),kt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Xe}static keyField(){return new kt([Xe])}static fromServerFormat(t){const e=[];let r="",i=0;const s=()=>{if(r.length===0)throw new w(y.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new w(y.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const m=t[i+1];if(m!=="\\"&&m!=="."&&m!=="`")throw new w(y.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=m,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new w(y.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new kt(e)}static emptyPath(){return new kt([])}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(F.fromString(t))}static fromName(t){return new O(F.fromString(t).popFirst(5))}static empty(){return new O(F.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&F.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return F.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new F(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(n,t,e){if(!e)throw new w(y.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Cn(n){if(!O.isDocumentKey(n))throw new w(y.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ln(n){if(O.isDocumentKey(n))throw new w(y.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function dr(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fe(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":R(12329,{type:typeof n})}function nt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new w(y.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Fe(n);throw new w(y.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function mr(n,t){if(t<=0)throw new w(y.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ue=null;function Ui(){return ue===null?ue=function(){return 268435456+Math.round(2147483648*Math.random())}():ue++,"0x"+ue.toString(16)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n){return n==null}function ge(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We="RestConnection",Mi={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class qi{get ae(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.ue=e+"://"+t.host,this._e=`projects/${r}/databases/${i}`,this.ce=this.databaseId.database===pe?`project_id=${r}`:`project_id=${r}&database_id=${i}`}le(t,e,r,i,s){const o=Ui(),c=this.fe(t,e.toUriEncodedString());At(We,`Sending RPC '${t}' ${o}:`,c,r);const m={"google-cloud-resource-prefix":this._e,"x-goog-request-params":this.ce};this.he(m,i,s);const{host:g}=new URL(c),_=ar(g);return this.de(t,c,m,r,_).then(E=>(At(We,`Received RPC '${t}' ${o}: `,E),E),E=>{throw cr(We,`RPC '${t}' ${o} failed with error: `,E,"url: ",c,"request:",r),E})}me(t,e,r,i,s,o){return this.le(t,e,r,i,s)}he(t,e,r){if(t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ut}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,s)=>t[s]=i),r&&r.headers.forEach((i,s)=>t[s]=i),this.databaseInfo._customHeaders)for(const i of Object.keys(this.databaseInfo._customHeaders))t[i]=this.databaseInfo._customHeaders[i]}fe(t,e){const r=Mi[t];let i=`${this.ue}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Un,x,U,Ot,Je,he,fe,Gt;function ji(n){switch(n){case y.OK:return R(64938);case y.CANCELLED:case y.UNKNOWN:case y.DEADLINE_EXCEEDED:case y.RESOURCE_EXHAUSTED:case y.INTERNAL:case y.UNAVAILABLE:case y.UNAUTHENTICATED:return!1;case y.INVALID_ARGUMENT:case y.NOT_FOUND:case y.ALREADY_EXISTS:case y.PERMISSION_DENIED:case y.FAILED_PRECONDITION:case y.ABORTED:case y.OUT_OF_RANGE:case y.UNIMPLEMENTED:case y.DATA_LOSS:return!0;default:return R(15467,{code:n})}}function Mn(n){if(n===void 0)return De("RPC_ERROR","HTTP error has no status"),y.UNKNOWN;switch(n){case 200:return y.OK;case 400:return y.FAILED_PRECONDITION;case 401:return y.UNAUTHENTICATED;case 403:return y.PERMISSION_DENIED;case 404:return y.NOT_FOUND;case 409:return y.ABORTED;case 416:return y.OUT_OF_RANGE;case 429:return y.RESOURCE_EXHAUSTED;case 499:return y.CANCELLED;case 500:return y.UNKNOWN;case 501:return y.UNIMPLEMENTED;case 503:return y.UNAVAILABLE;case 504:return y.DEADLINE_EXCEEDED;default:return n>=200&&n<300?y.OK:n>=400&&n<500?y.FAILED_PRECONDITION:n>=500&&n<600?y.INTERNAL:y.UNKNOWN}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(x=Un||(Un={}))[x.OK=0]="OK",x[x.CANCELLED=1]="CANCELLED",x[x.UNKNOWN=2]="UNKNOWN",x[x.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",x[x.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",x[x.NOT_FOUND=5]="NOT_FOUND",x[x.ALREADY_EXISTS=6]="ALREADY_EXISTS",x[x.PERMISSION_DENIED=7]="PERMISSION_DENIED",x[x.UNAUTHENTICATED=16]="UNAUTHENTICATED",x[x.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",x[x.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",x[x.ABORTED=10]="ABORTED",x[x.OUT_OF_RANGE=11]="OUT_OF_RANGE",x[x.UNIMPLEMENTED=12]="UNIMPLEMENTED",x[x.INTERNAL=13]="INTERNAL",x[x.UNAVAILABLE=14]="UNAVAILABLE",x[x.DATA_LOSS=15]="DATA_LOSS";class $i extends qi{Ee(t,e){throw new Error("Not supported by FetchConnection")}async de(t,e,r,i,s){var m;const o=JSON.stringify(i);let c;try{const g={method:"POST",headers:r,body:o};s&&(g.credentials="include"),c=await fetch(e,g)}catch(g){const _=g,E=_==null?void 0:_.message,I=_!=null&&_.cause?String(_.cause):void 0,v=(E&&I?`${E} (${I})`:E??I)??(_==null?void 0:_.statusText)??String(g);throw new w(Mn(_==null?void 0:_.status),`Request failed with error: ${v}`)}if(!c.ok){let g=await c.json();Array.isArray(g)&&(g=g[0]);const _=(m=g==null?void 0:g.error)==null?void 0:m.message;throw new w(Mn(c.status),`Request failed with error: ${_??c.statusText}`)}return c.json()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Gi("Invalid base64 string: "+s):s}}(t);return new et(e)}static fromUint8Array(t){const e=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(t);return new et(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return k(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}function Yt(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ne(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Bi(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}et.EMPTY_BYTE_STRING=new et("");/**
 * Copyright 2021 M.Vokhmentsev
 *
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(){this.exponent=0,this.Ve=0n,this.Te=0n,this.Ie=new Array(4).fill(0n),this.Ae=new Array(6).fill(0n),this.Re=new Array(6).fill(0n),this.Pe=new Array(6).fill(0n),this.pe=new Array(12).fill(0n)}static ye(t,e){let r=new A;return r.parse(t,e),r}parse(t,e){e+=t.length-1,this.exponent=0,this.Ve=0n,this.Te=0n;let r=this.Pe,i=this.be(t,r);if(i==0&&this.isEmpty(r)||(e+=i)<A.we)return;if(e>A.ge)return void(this.exponent=Number(A.Fe));let s=this.ve(e,r);this.xe(e,s,r)}be(t,e){for(let s=0;s<6;s++)e[s]=0n;let r=0;for(;r<t.length&&t[r]==0;)r+=1;if(r==t.length)return 0;let i=-r;if(t.length-r>A.De){let s=t[A.De]>=5,o=new Array(A.De).fill(0);for(let c=0;c<A.De;c++)o[c]=t[c+r];s&&(i+=this.Ne(o)),t=o,r=0}for(let s=t.length-1;s>=r;s--)e[0]|=BigInt(t[s])<<32n,this.Se(e);return i}Se(t){let e=t.length;for(let r=0;r<e;r++){let i=t[r]%10n;t[r]=t[r]/10n,r+1<e&&(t[r+1]+=i<<32n)}}isEmpty(t){for(let e=0;e<t.length;e++)if(t[e]!=0n)return!1;return!0}Ne(t){for(let e=t.length-1;e>=0;e--){if(t[e]!=9)return t[e]=t[e]+1,0;t[e]=0}return t[0]=1,1}ve(t,e){let r=e[0]<<31n|e[1]>>1n,i=Number(r)/A.Ce;return Math.floor(Number(t)*A.Be+this.log2(i))}log2(t){return A.Qe*Math.log(t)}xe(t,e,r){let i=this.Ie;this.Oe(-e,i);let s=this.pe;this.Me(r,i,s),this.qe(s),BigInt(i[0])!=BigInt(-t)&&this.qe(s),e+=this.Le(s),(e+=A.Ue)<=0||(e+=this.$e(s),BigInt(e)>=A.Fe?this.exponent=Number(A.Fe):(this.exponent=Number(e),this.Ve=(s[0]<<32n)+s[1]&0xffffffffffffffffn,this.Te=(s[2]<<32n)+s[3]&0xffffffffffffffffn))}Oe(t,e){if(t==0)return void this.ke(A.je[0],e);let r=A.je;t<0&&(t=-t,r=A.Ke);let i=A.ze,s=32,o=!0;for(;t>0;)t>=i&&(o?(this.ke(r[s],e),o=!1):this.We(e,r[s],e),t-=i),s-=1,i*=.5}ke(t,e){for(let r=0;r<e.length;r++)e[r]=t[r]}We(t,e,r){this.Ge(t,e,this.pe);let i=this.Je(this.pe);this.He(this.pe,r),r[0]=t[0]+e[0]+BigInt(i)}Ge(t,e,r){for(let i=0;i<r.length;i++)r[i]=0n;this.Ye(t,this.Ae),this.Ye(e,this.Re);for(let i=5;i>=0;i--)for(let s=5;s>=0;s--){let o=this.Ae[i]*this.Re[s];r[s+i+1]=r[s+i+1]+(o&A.Xe)&0xffffffffffffffffn,r[s+i]=r[s+i]+(o>>32n)&0xffffffffffffffffn}for(let i=11;i>=1;i--)r[i-1]=r[i-1]+(r[i]>>32n)&0xffffffffffffffffn,r[i]&=A.Xe}Je(t){let e=0;for(;this.Ze(t);)this.qe(t),e-=1;return e}Ze(t){if(t[0]<0x19999999n)return!0;if(t[0]>0x19999999n)return!1;for(let e=1;e<t.length;e++){if(t[e]<0x99999999n)return!0;if(t[e]>0x99999999n)return!1}return!1}Me(t,e,r){for(let o=0;o<r.length;o++)r[o]=0n;let i=this.Re;this.Ye(e,i);let s=t.length;for(let o=s-1;o>=0;o--)for(let c=s-1;c>=0;c--){let m=t[o]*i[c];r[c+o+1]=r[c+o+1]+(m&A.Xe)&0xffffffffffffffffn,r[c+o]=r[c+o]+(m>>32n)&0xffffffffffffffffn}for(let o=11;o>=1;o--)r[o-1]=r[o-1]+(r[o]>>32n)&0xffffffffffffffffn,r[o]&=A.Xe}qe(t){let e=t.length-1;t[0]&=A.Xe,t[e]*=10n;for(let r=e-1;r>=0;r--)t[r]=10n*t[r]+(t[r+1]>>32n)&0xffffffffffffffffn,t[r+1]&=A.Xe}Le(t){let e=31-A.et(t[0]);return e!=0&&this.tt(t,e),e}$e(t){return this.rt(t,5,100n),this.rt(t,4,0x80000000n),(t[0]&A.nt<<1n)!=0n?(this.tt(t,1),1):0}He(t,e){e[1]=(t[0]<<32n)+t[1],e[2]=(t[2]<<32n)+t[3],e[3]=(t[4]<<32n)+t[5]}Ye(t,e){e[0]=t[1]>>32n,e[1]=t[1]&A.Xe,e[2]=t[2]>>32n,e[3]=t[2]&A.Xe,e[4]=t[3]>>32n,e[5]=t[3]&A.Xe}tt(t,e){let r=t.length-1,i=BigInt(32-Math.abs(e));if(e>0){let s=BigInt(e);for(let o=r+1-1;o>=1;o--)t[o]=t[o]>>s|t[o-1]<<i&A.Xe;t[0]=t[0]>>s}else if(e<0){let s=BigInt(-e);t[0]=0xffffffffffffffffn&(t[0]<<s|t[1]>>i);for(let o=1;o<r;o++)t[o]=0xffffffffffffffffn&(t[o]<<s&A.Xe|t[o+1]>>i);t[r]=t[r]<<s&A.Xe}}rt(t,e,r){let i=e;t[i]=t[i]+r&0xffffffffffffffffn;for(let s=i+1-1;s>=1&&(t[s]&A.nt)!=0n;s--)t[s]&=A.Xe,t[s-1]+=1n}static et(t){let e=Number(t>>32n);return e==0?32+Math.clz32(Number(BigInt.asUintN(32,t))):Math.clz32(e)}}A.De=59,A.ge=646456993,A.we=-646457032,A.Ce=0xccccccccccccd00,A.it=0x8000000000000000n,A.ze=2147483648,A.Xe=0x00000000ffffffffn,A.nt=0xffffffff00000000n,A.Be=Math.log(10)/Math.log(2),A.Qe=1/Math.log(2),A.Ue=2147483647,A.Fe=0xffffffffn,A.je=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],A.Ke=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];class T{constructor(t,e,r,i){this.negative=t,this.st=e,this.Ve=r,this.Te=i}exponent(){return this.st-A.Ue}ot(){return this.st===0&&this.Ve===0n&&this.Te===0n}ut(){return this.st===M(T,U,"f",Ot)&&this.Ve===0n&&this.Te===0n}isNaN(){return this.st===M(T,U,"f",Ot)&&!(this.Ve===0n&&this.Te===0n)}compareTo(t){if(this.isNaN())return t.isNaN()?0:1;if(t.isNaN())return-1;let e,r;if(this.negative){if(!t.negative)return-1;e=1,r=-1}else{if(t.negative)return 1;e=-1,r=1}return this.st<t.st?e:this.st>t.st?r:this.Ve<t.Ve?e:this.Ve>t.Ve?r:this.Te<t.Te?e:this.Te>t.Te?r:0}debug(){return(this.negative?"+":"-")+M(T,U,"m",Je).call(T,this.Ve)+M(T,U,"m",Je).call(T,this.Te)+"*2^"+this.exponent()}static fromNumber(t){if(isNaN(t))return T.NaN;if(!isFinite(t))return t<0?T._t:T.ct;if(t===0)return Math.sign(1/t)>0?T.lt:T.ft;const e=new DataView(new ArrayBuffer(8));e.setFloat64(0,t);const r=e.getBigUint64(0);let i=BigInt.asUintN(64,r<<12n),s=2047&Number(r>>52n);if(s===0){const o=A.et(i);i=o<63?i<<BigInt(o+1):0n,s=-o}return new T(t<0,M(T,U,"m",Gt).call(T,s-1023),i,0n)}static fromString(t){if(t==="NaN")return T.NaN;if(t==="-Infinity")return T._t;if(t==="Infinity"||t==="+Infinity")return T.ct;const e=new Array(t.length).fill(0);let r=0,i=0,s=0,o=!1;for(t[r]==="-"?(o=!0,r++):t[r]==="+"&&r++;M(T,U,"m",he).call(T,t,r);)e[i++]=M(T,U,"m",fe).call(T,t,r++);if(t[r]==="."){const m=++r;for(;M(T,U,"m",he).call(T,t,r);)e[i++]=M(T,U,"m",fe).call(T,t,r++);s=m-r}if(t[r]==="e"||t[r]==="E"){let m=0;r++;let g=1;t[r]==="-"?(g=-1,r++):t[r]==="+"&&r++;const _=r;for(;M(T,U,"m",he).call(T,t,r);)if(m=10*m+M(T,U,"m",fe).call(T,t,r++),r-_>9)throw new Error("Exponent too large "+t);if(r===_)throw new Error("Invalid number "+t);s+=m*g}if(i===0||r!==t.length)throw new Error("Invalid number "+t);const c=A.ye(e.slice(0,i),s);return new T(o,c.exponent,c.Ve,c.Te)}}U=T,Je=function(t){return t.toString(16).padStart(16,"0")},he=function(t,e){const r=t.codePointAt(e);return r!==void 0&&r>=48&&r<=57},fe=function(t,e){return t.codePointAt(e)-48},Gt=function(t){return t+A.Ue},Ot={value:Number(A.Fe)},T.lt=new T(!1,0,0n,0n),T.ft=new T(!0,0,0n,0n),T.NaN=new T(!1,M(T,U,"f",Ot),1n<<63n,0n),T._t=new T(!0,M(T,U,"f",Ot),0n,0n),T.ct=new T(!1,M(T,U,"f",Ot),0n,0n),new T(!0,M(T,U,"m",Gt).call(T,63),0n,0n),new T(!1,M(T,U,"m",Gt).call(T,0),0n,0n),new T(!0,M(T,U,"m",Gt).call(T,0),0n,0n);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Vt(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=zi.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:j(n.seconds),nanos:j(n.nanos)}}function j(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function _e(n){return typeof n=="string"?et.fromBase64String(n):et.fromUint8Array(n)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,t){const e={typeString:n};return t&&(e.value=t),e}function re(n,t){if(!dr(n))throw new w(y.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0,o=t[r].optional;if(!(r in n)){if(o)continue;e=`JSON missing required field: '${r}'`;break}const c=n[r];if(i&&typeof c!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&c!==s.value){e=`Expected '${r}' field to equal '${s.value}'`;break}}if(e)throw new w(y.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn=-62135596800,jn=1e6;class D{static now(){return D.fromMillis(Date.now())}static fromDate(t){return D.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*jn);return new D(e,r)}static fromInstant(t){if(!t||typeof t.ht!="bigint")throw new w(y.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return D._fromEpochNanoseconds(t.ht)}static _fromEpochNanoseconds(t){let e,r;if(t>=0n)e=Number(t/1000000000n),r=Number(t%1000000000n);else{const i=t%1000000000n;i===0n?(e=Number(t/1000000000n),r=0):(e=Number(t/1000000000n-1n),r=Number(i+1000000000n))}return new D(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new w(y.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new w(y.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<qn)throw new w(y.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new w(y.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/jn}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new w(y.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const t=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(t)}_compareTo(t){return this.seconds===t.seconds?k(this.nanoseconds,t.nanoseconds):k(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:D._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(re(t,D._jsonSchema))return new D(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-qn;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}D._jsonSchemaVersion="firestore/timestamp/1.0",D._jsonSchema={type:X("string",D._jsonSchemaVersion),seconds:X("number"),nanoseconds:X("number")};function _r(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{}).__type__)==null?void 0:r.stringValue)==="server_timestamp"}function yr(n){const t=n.mapValue.fields.__previous_value__;return _r(t)?yr(t):t}function Xt(n){const t=Vt(n.mapValue.fields.__local_write_time__.timestampValue);return new D(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er="__type__",wr="__vector__",ye="value",Ki="server_timestamp",Ir="__min__",ln="__max__",gt="__regex__",Ee="pattern",we="options",Jt="__oid__",ie="__int__",Ct="__decimal128__",wt="__request_timestamp__",Ie="seconds",Te="increment",ke="__binary__",le={};var S,Z;(Z=S||(S={})).dt="regexValue",Z.Et="bsonObjectIdValue",Z.Vt="int32Value",Z.Tt="decimal128Value",Z.It="bsonTimestampValue",Z.At="bsonBinaryValue",Z.Rt="minKeyValue",Z.Pt="maxKeyValue",Z.yt="maxValue",Z.bt="vectorValue",Z.wt="serverTimestampValue",Z.gt="regularMapValue";const $n={[wr]:S.bt,[ln]:S.yt,[Ki]:S.wt},Tr={[gt]:S.dt,[Jt]:S.Et,[ie]:S.Vt,[Ct]:S.Tt,[wt]:S.It,[ke]:S.At,[Ir]:S.Rt,[ln]:S.Pt};function vt(n){if("nullValue"in n)return 0;if("booleanValue"in n)return 2;if("integerValue"in n||"doubleValue"in n)return 3;if("timestampValue"in n)return 4;if("stringValue"in n)return 7;if("bytesValue"in n)return 8;if("referenceValue"in n)return 9;if("geoPointValue"in n)return 11;if("arrayValue"in n)return 13;if(!("mapValue"in n))return R(28295,{value:n});switch(function(r){var o,c;if(!((o=r.mapValue)!=null&&o.fields))return S.gt;const i=r.mapValue.fields,s=(c=i[Er])==null?void 0:c.stringValue;if(s&&$n[s])return $n[s];if(Yt(i)===1){const m=Object.keys(i);return Tr[m[0]]??S.gt}return S.gt}(n)){case S.wt:return 6;case S.yt:return 9007199254740991;case S.bt:return 14;case S.dt:return 12;case S.Et:return 10;case S.Vt:case S.Tt:return 3;case S.It:return 5;case S.At:return 8;case S.Rt:return 1;case S.Pt:return 16;default:return 15}}function Lt(n,t,e){if(n===t)return!0;const r=vt(n);if(r!==vt(t))return!1;switch(r){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return n.booleanValue===t.booleanValue;case 6:return Xt(n).isEqual(Xt(t));case 4:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const c=Vt(s.timestampValue),m=Vt(o.timestampValue);return c.seconds===m.seconds&&c.nanos===m.nanos}(n,t);case 7:return n.stringValue===t.stringValue;case 8:return function(s,o){return vr(s,o)===0}(n,t);case 9:return n.referenceValue===t.referenceValue;case 11:return function(s,o){return j(s.geoPointValue.latitude)===j(o.geoPointValue.latitude)&&j(s.geoPointValue.longitude)===j(o.geoPointValue.longitude)}(n,t);case 3:return function(s,o,c){if(Nt(s)&&Nt(o))return br(s,o)===0;if("integerValue"in s&&"integerValue"in o||Ve(s)&&Ve(o))return Zt(s)===Zt(o);let m,g;return!("doubleValue"in s)||!("doubleValue"in o)?!1:(m=j(s.doubleValue),g=j(o.doubleValue),m===g?ge(m)===ge(g):!!(c===void 0||c.vt)&&isNaN(m)&&isNaN(g))}(n,t,e);case 13:return an(n.arrayValue.values||[],t.arrayValue.values||[],(i,s)=>Lt(i,s,e));case 14:case 15:return function(s,o,c){const m=s.mapValue.fields||{},g=o.mapValue.fields||{};if(Yt(m)!==Yt(g))return!1;for(const _ in m)if(m.hasOwnProperty(_)&&(g[_]===void 0||!Lt(m[_],g[_],c)))return!1;return!0}(n,t,e);case 5:return Vr(n,t)===0;case 12:return Nr(n,t)===0;case 10:return xr(n,t)===0;default:return R(52216,{left:n})}}function Qt(n,t){return(n.values||[]).find(e=>Lt(e,t))!==void 0}function Ae(n,t){if(n===t)return 0;const e=vt(n),r=vt(t);if(e!==r)return k(e,r);switch(e){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return k(n.booleanValue,t.booleanValue);case 3:return Qe(n,t);case 4:return Bn(n.timestampValue,t.timestampValue);case 6:return Bn(Xt(n),Xt(t));case 7:return Ht(n.stringValue,t.stringValue);case 8:return vr(n,t);case 9:return function(s,o){const c=s.split("/"),m=o.split("/");for(let g=0;g<c.length&&g<m.length;g++){const _=k(c[g],m[g]);if(_!==0)return _}return k(c.length,m.length)}(n.referenceValue,t.referenceValue);case 11:return function(s,o){const c=k(j(s.latitude),j(o.latitude));return c!==0?c:k(j(s.longitude),j(o.longitude))}(n.geoPointValue,t.geoPointValue);case 13:return zn(n.arrayValue,t.arrayValue);case 14:return function(s,o){var I,v,N,V;const c=s.fields||{},m=o.fields||{},g=(I=c[ye])==null?void 0:I.arrayValue,_=(v=m[ye])==null?void 0:v.arrayValue,E=k(((N=g==null?void 0:g.values)==null?void 0:N.length)||0,((V=_==null?void 0:_.values)==null?void 0:V.length)||0);return E!==0?E:zn(g,_)}(n.mapValue,t.mapValue);case 15:return function(s,o){if(s===le&&o===le)return 0;if(s===le)return 1;if(o===le)return-1;const c=s.fields||{},m=Object.keys(c),g=o.fields||{},_=Object.keys(g);m.sort(),_.sort();for(let E=0;E<m.length&&E<_.length;++E){const I=Ht(m[E],_[E]);if(I!==0)return I;const v=Ae(c[m[E]],g[_[E]]);if(v!==0)return v}return k(m.length,_.length)}(n.mapValue,t.mapValue);case 5:return Vr(n,t);case 12:return Nr(n,t);case 10:return xr(n,t);default:throw R(23264,{xt:e})}}function Zt(n){let t;return t=Ve(n)?n.mapValue.fields[ie].integerValue:n.integerValue||n.doubleValue,j(t)}function Ar(n){return n.mapValue.fields[Ct].stringValue}function Qe(n,t){if(Nt(n)||Nt(t))return br(n,t);const e=Zt(n),r=Zt(t);return isNaN(e)?isNaN(r)?0:-1:isNaN(r)?1:k(e,r)}function br(n,t){const e=Gn(n),r=Gn(t);return e.ot()&&r.ot()?0:e.isNaN()?r.isNaN()?0:-1:r.isNaN()?1:e.compareTo(r)}function Gn(n){return Nt(n)?T.fromString(Ar(n)):T.fromNumber(Zt(n))}function Bn(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return k(n,t);const e=Vt(n),r=Vt(t),i=k(e.seconds,r.seconds);return i!==0?i:k(e.nanos,r.nanos)}function zn(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const s=Ae(e[i],r[i]);if(s!==void 0&&s!==0)return s}return k(e.length,r.length)}function Vr(n,t){var c,m,g,_,E,I,v,N,V,b,G,B;const e=(g=(m=(c=n.mapValue.fields)==null?void 0:c[wt].mapValue)==null?void 0:m.fields)==null?void 0:g[Ie],r=(I=(E=(_=t.mapValue.fields)==null?void 0:_[wt].mapValue)==null?void 0:E.fields)==null?void 0:I[Ie],i=(V=(N=(v=n.mapValue.fields)==null?void 0:v[wt].mapValue)==null?void 0:N.fields)==null?void 0:V[Te],s=(B=(G=(b=t.mapValue.fields)==null?void 0:b[wt].mapValue)==null?void 0:G.fields)==null?void 0:B[Te],o=Qe(e,r);return o!==0?o:Qe(i,s)}function Kn(n){var c;if("bytesValue"in n)return{subtype:0,bytes:_e(n.bytesValue)};const t=(c=n.mapValue)==null?void 0:c.fields,e=t==null?void 0:t[ke],r=e==null?void 0:e.bytesValue;if(!r)throw new Error("Received incorrect value for BsonBinaryData");const i=_e(r).toUint8Array();if(i.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");const s=i[0],o=i.slice(1);return{subtype:s,bytes:et.fromUint8Array(o)}}function vr(n,t){const e=Kn(n),r=Kn(t);return e.subtype!==r.subtype?e.subtype<r.subtype?-1:1:e.bytes.compareTo(r.bytes)}function Nr(n,t){var g,_,E,I,v,N,V,b,G,B,it,z,st,lt,h,a;const e=n.mapValue.fields,r=((I=(E=(_=(g=e==null?void 0:e[gt])==null?void 0:g.mapValue)==null?void 0:_.fields)==null?void 0:E[Ee])==null?void 0:I.stringValue)??"",i=((b=(V=(N=(v=e==null?void 0:e[gt])==null?void 0:v.mapValue)==null?void 0:N.fields)==null?void 0:V[we])==null?void 0:b.stringValue)??"",s=t.mapValue.fields,o=((z=(it=(B=(G=s==null?void 0:s[gt])==null?void 0:G.mapValue)==null?void 0:B.fields)==null?void 0:it[Ee])==null?void 0:z.stringValue)??"",c=((a=(h=(lt=(st=s==null?void 0:s[gt])==null?void 0:st.mapValue)==null?void 0:lt.fields)==null?void 0:h[we])==null?void 0:a.stringValue)??"",m=Ht(r,o);return m!==0?m:k(i,c)}function xr(n,t){var e,r,i,s;return Ht(((r=(e=n.mapValue.fields)==null?void 0:e[Jt])==null?void 0:r.stringValue)??"",((s=(i=t.mapValue.fields)==null?void 0:i[Jt])==null?void 0:s.stringValue)??"")}function be(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Nt(n){var e;if(!((e=n.mapValue)!=null&&e.fields))return!1;const t=n.mapValue.fields;return Yt(t)===1&&t[Ct]&&!!t[Ct].stringValue}function Ve(n){var e,r;if(!((e=n.mapValue)!=null&&e.fields))return!1;const t=n.mapValue.fields;return Yt(t)===1&&((r=t[ie])==null?void 0:r.integerValue)!==void 0}function Rr(n){return!!n&&"arrayValue"in n}function Wn(n){return!!n&&"nullValue"in n}function Hn(n){return!(!function(e){return!!e&&"doubleValue"in e}(n)||!isNaN(Number(n.doubleValue)))||!(!Nt(n)||Ar(n)!=="NaN")}function He(n){return!!n&&"mapValue"in n}function Bt(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return ne(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Bt(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Bt(n.arrayValue.values[e]);return t}return{...n}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Set(Object.values(Tr));class ve{constructor(t,e){this.position=t,this.inclusive=e}}function Yn(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Lt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{}class J extends Sr{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Wi(t,e,r):e==="array-contains"?new Xi(t,r):e==="in"?new Ji(t,r):e==="not-in"?new Qi(t,r):e==="array-contains-any"?new Zi(t,r):new J(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Hi(t,r):new Yi(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ae(e,this.value)):e!==null&&vt(this.value)===vt(e)&&this.matchesComparison(Ae(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return R(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xt extends Sr{constructor(t,e){super(),this.filters=t,this.op=e,this.Dt=null}static create(t,e){return new xt(t,e)}matches(t){return function(r){return r.op==="and"}(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Dt!==null||(this.Dt=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Dt}getFilters(){return Object.assign([],this.filters)}}function Pr(n,t){return n instanceof J?function(r,i){return i instanceof J&&r.op===i.op&&r.field.isEqual(i.field)&&Lt(r.value,i.value)}(n,t):n instanceof xt?function(r,i){return i instanceof xt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Pr(o,i.filters[c]),!0):!1}(n,t):void R(19439)}class Wi extends J{constructor(t,e,r){super(t,e,r),this.key=O.fromName(r.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class Hi extends J{constructor(t,e){super(t,"in",e),this.keys=Dr("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Yi extends J{constructor(t,e){super(t,"not-in",e),this.keys=Dr("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Dr(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>O.fromName(r.referenceValue))}class Xi extends J{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Rr(e)&&Qt(e.arrayValue,this.value)}}class Ji extends J{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Qt(this.value.arrayValue,e)}}class Qi extends J{constructor(t,e){super(t,"not-in",e)}matches(t){if(Qt(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Qt(this.value.arrayValue,e)}}class Zi extends J{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Rr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Qt(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(t,e="asc"){this.field=t,this.dir=e}}function ts(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{static fromTimestamp(t){return new C(t)}static min(){return new C(new D(0,0))}static max(){return new C(new D(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(t,e){this.comparator=t,this.root=e||q.EMPTY}insert(t,e){return new xe(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,q.BLACK,null,null))}remove(t){return new xe(this.comparator,this.root.remove(t,this.comparator).copy(null,null,q.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ce(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ce(this.root,t,this.comparator,!1)}getReverseIterator(){return new ce(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ce(this.root,t,this.comparator,!0)}}class ce{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?r(t.key,e):1,e&&i&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(s===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class q{constructor(t,e,r,i,s){this.key=t,this.value=e,this.color=r??q.RED,this.left=i??q.EMPTY,this.right=s??q.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,s){return new q(t??this.key,e??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const s=r(t,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(t,e,r),null):s===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return q.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return q.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,q.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,q.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw R(43730,{key:this.key,value:this.value});if(this.right.isRed())throw R(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw R(27949);return t+(this.isRed()?0:1)}}q.EMPTY=null,q.RED=!0,q.BLACK=!1;q.EMPTY=new class{constructor(){this.size=0}get key(){throw R(57766)}get value(){throw R(16141)}get color(){throw R(16727)}get left(){throw R(29726)}get right(){throw R(36894)}copy(t,e,r,i,s){return this}insert(t,e,r){return new q(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(t){this.comparator=t,this.data=new xe(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Xn(this.data.getIterator())}getIteratorFrom(t){return new Xn(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof te)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new te(this.comparator);return e.data=t,e}}class Xn{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.fields=t,t.sort(_t.comparator)}static empty(){return new Rt([])}unionWith(t){let e=new te(_t.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Rt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return an(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(t){this.value=t}static empty(){return new W({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!He(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Bt(e)}setAll(t){let e=_t.emptyPath(),r={},i=[];t.forEach((o,c)=>{if(!e.isImmediateParentOf(c)){const m=this.getFieldsMap(e);this.applyChanges(m,r,i),r={},i=[],e=c.popLast()}o?r[c.lastSegment()]=Bt(o):i.push(c.lastSegment())});const s=this.getFieldsMap(e);this.applyChanges(s,r,i)}delete(t){const e=this.field(t.popLast());He(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Lt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];He(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){ne(e,(i,s)=>t[i]=s);for(const i of r)delete t[i]}clone(){return new W(Bt(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t,e,r,i,s,o,c){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(t){return new at(t,0,C.min(),C.min(),C.min(),W.empty(),0)}static newFoundDocument(t,e,r,i){return new at(t,1,e,C.min(),r,i,0)}static newNoDocument(t,e){return new at(t,2,e,C.min(),C.min(),W.empty(),0)}static newUnknownDocument(t,e){return new at(t,3,e,C.min(),C.min(),W.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(C.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=W.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=W.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=C.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof at&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(t,e=null,r=[],i=[],s=null,o=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Nt=null}}function Jn(n,t=null,e=[],r=[],i=null,s=null,o=null){return new es(n,t,e,r,i,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t,e=null,r=[],i=[],s=null,o="F",c=null,m=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=m,this.St=null,this.Ct=null,this.Bt=null,this.startAt,this.endAt}}function Fr(n){return n.collectionGroup!==null}function kr(n){const t=bt(n);if(t.St===null){t.St=[];const e=new Set;for(const s of t.explicitOrderBy)t.St.push(s),e.add(s.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new te(_t.comparator);return o.filters.forEach(m=>{m.getFlattenedFilters().forEach(g=>{g.isInequality()&&(c=c.add(g.field))})}),c})(t).forEach(s=>{e.has(s.canonicalString())||s.isKeyField()||t.St.push(new Ne(s,r))}),e.has(_t.keyField().canonicalString())||t.St.push(new Ne(_t.keyField(),r))}return t.St}function Ze(n){const t=bt(n);return t.Ct||(t.Ct=Or(t,kr(n))),t.Ct}function Or(n,t){if(n.limitType==="F")return Jn(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Ne(i.field,s)});const e=n.endAt?new ve(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ve(n.startAt.position,n.startAt.inclusive):null;return Jn(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function tn(n,t){const e=n.filters.concat([t]);return new Pt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function ns(n,t){return function(r,i){if(r.limit!==i.limit||r.orderBy.length!==i.orderBy.length)return!1;for(let s=0;s<r.orderBy.length;s++)if(!ts(r.orderBy[s],i.orderBy[s]))return!1;if(r.filters.length!==i.filters.length)return!1;for(let s=0;s<r.filters.length;s++)if(!Pr(r.filters[s],i.filters[s]))return!1;return r.collectionGroup===i.collectionGroup&&!!r.path.isEqual(i.path)&&!!Yn(r.startAt,i.startAt)&&Yn(r.endAt,i.endAt)}(Ze(n),Ze(t))&&n.limitType===t.limitType}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ge(t)?"-0":t}}function de(n){return{integerValue:""+n}}function Oe(n,t,e){return function(i){return typeof i=="number"&&Number.isInteger(i)&&!ge(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER}(t)?de(t):Cr(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(){this._=void 0}}class Lr extends Ce{}class Ur extends Ce{constructor(t){super(),this.elements=t}}class Mr extends Ce{constructor(t){super(),this.elements=t}}class cn extends Ce{constructor(t,e){super(),this.serializer=t,this.Qt=e}}class qr extends cn{}class jr extends cn{}class $r extends cn{}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t,e){this.field=t,this.transform=e}}class ${constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new $}static exists(t){return new $(void 0,t)}static updateTime(t){return new $(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}class Le{}class Gr extends Le{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class hn extends Le{constructor(t,e,r,i,s=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}class Ue extends Le{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Br extends Le{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs={asc:"ASCENDING",desc:"DESCENDING"},is={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ss={and:"AND",or:"OR"};class os{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function me(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Qn(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function as(n,t){return me(n,t.toTimestamp())}function zt(n){return H(!!n,49232),C.fromTimestamp(function(e){const r=Vt(e);return new D(r.seconds,r.nanos)}(n))}function fn(n,t){return en(n,t).canonicalString()}function en(n,t){const e=function(i){return new F(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Re(n,t){return fn(n.databaseId,t.path)}function nn(n,t){const e=function(i){const s=F.fromString(i);return H(Wr(s),10190,{key:s.toString()}),s}(t);if(e.get(1)!==n.databaseId.projectId)throw new w(y.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new w(y.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new O(function(i){return H(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)}(e))}function Zn(n,t,e){return{name:Re(n,t),fields:e.value.mapValue.fields}}function us(n,t){return"found"in t?function(r,i){H(!!i.found,43571),i.found.name,i.found.updateTime;const s=nn(r,i.found.name),o=zt(i.found.updateTime),c=i.found.createTime?zt(i.found.createTime):C.min(),m=new W({mapValue:{fields:i.found.fields}});return at.newFoundDocument(s,o,c,m)}(n,t):"missing"in t?function(r,i){H(!!i.missing,3894),H(!!i.readTime,22933);const s=nn(r,i.missing),o=zt(i.readTime);return at.newNoDocument(s,o)}(n,t):R(7234,{result:t})}function ls(n,t){let e;if(t instanceof Gr)e={update:Zn(n,t.key,t.value)};else if(t instanceof Ue)e={delete:Re(n,t.key)};else if(t instanceof hn)e={update:Zn(n,t.key,t.data),updateMask:ds(t.fieldMask)};else{if(!(t instanceof Br))return R(16599,{Ot:t.type});e={verify:Re(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof Lr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ur)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Mr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof qr)return{fieldPath:o.field.canonicalString(),increment:c.Qt};if(c instanceof jr)return{fieldPath:o.field.canonicalString(),minimum:c.Qt};if(c instanceof $r)return{fieldPath:o.field.canonicalString(),maximum:c.Qt};throw R(20930,{transform:o.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:as(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:R(27497)}(n,t.precondition)),e}function zr(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=function(g,_){return fn(g.databaseId,_)}(n,i);const s=function(g){if(g.length!==0)return Kr(xt.create(g,"and"))}(t.filters);s&&(e.structuredQuery.where=s);const o=function(g){if(g.length!==0)return g.map(_=>function(I){return{field:pt(I.field),direction:cs(I.dir)}}(_))}(t.orderBy);o&&(e.structuredQuery.orderBy=o);const c=function(g,_){return g.useProto3Json||gr(_)?_:{value:_}}(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(g){return{before:g.inclusive,values:g.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(g){return{before:!g.inclusive,values:g.position}}(t.endAt)),{Mt:e,parent:i}}function cs(n){return rs[n]}function hs(n){return is[n]}function fs(n){return ss[n]}function pt(n){return{fieldPath:n.canonicalString()}}function Kr(n){return n instanceof J?function(e){if(e.op==="=="){if(Hn(e.value))return{unaryFilter:{field:pt(e.field),op:"IS_NAN"}};if(Wn(e.value))return{unaryFilter:{field:pt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Hn(e.value))return{unaryFilter:{field:pt(e.field),op:"IS_NOT_NAN"}};if(Wn(e.value))return{unaryFilter:{field:pt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pt(e.field),op:hs(e.op),value:e.value}}}(n):n instanceof xt?function(e){const r=e.getFilters().map(i=>Kr(i));return r.length===1?r[0]:{compositeFilter:{op:fs(e.op),filters:r}}}(n):R(54877,{filter:n})}function ds(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Wr(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Hr(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n){return new os(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{}class ps extends ms{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.qt=!1}Lt(){if(this.qt)throw new w(y.FAILED_PRECONDITION,"The client has already been terminated.")}le(t,e,r,i){return this.Lt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.le(t,en(e,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===y.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new w(y.UNKNOWN,s.toString())})}me(t,e,r,i,s){return this.Lt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.me(t,en(e,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===y.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new w(y.UNKNOWN,o.toString())})}terminate(){this.qt=!0,this.connection.terminate()}}async function qt(n,t){const e=bt(n),r={writes:t.map(i=>ls(e.serializer,i))};await e.le("Commit",e.serializer.databaseId,F.emptyPath(),r)}async function Yr(n,t){const e=bt(n),r={documents:t.map(c=>Re(e.serializer,c))},i=await e.me("BatchGetDocuments",e.serializer.databaseId,F.emptyPath(),r,t.length),s=new Map;i.forEach(c=>{const m=us(e.serializer,c);s.set(m.key.toString(),m)});const o=[];return t.forEach(c=>{const m=s.get(c.toString());H(!!m,55234,{key:c}),o.push(m)}),o}async function gs(n,t){const e=bt(n),{Mt:r,parent:i}=zr(e.serializer,Ze(t));return(await e.me("RunQuery",e.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(c,m,g){const _=nn(c,m.name),E=zt(m.updateTime),I=m.createTime?zt(m.createTime):C.min(),v=new W({mapValue:{fields:m.fields}}),N=at.newFoundDocument(_,E,I,v);return g?N.setHasCommittedMutations():N}(e.serializer,s.document,void 0))}async function _s(n,t,e){var g;const r=bt(n),{request:i,Ut:s,parent:o}=function(E,I,v,N){const{Mt:V,parent:b}=zr(E,I),G={},B=[];let it=0;return v.forEach(z=>{const st="aggregate_"+it++;G[st]=z.alias,z.aggregateType==="count"?B.push({alias:st,count:{}}):z.aggregateType==="avg"?B.push({alias:st,avg:{field:pt(z.fieldPath)}}):z.aggregateType==="sum"&&B.push({alias:st,sum:{field:pt(z.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:B,structuredQuery:V.structuredQuery},parent:V.parent},Ut:G,parent:b}}(r.serializer,function(E){const I=bt(E);return I.Bt||(I.Bt=Or(I,E.explicitOrderBy)),I.Bt}(t),e);r.connection.ae||delete i.parent;const c=(await r.me("RunAggregationQuery",r.serializer.databaseId,o,i,1)).filter(_=>!!_.result);H(c.length===1,64727);const m=(g=c[0].result)==null?void 0:g.aggregateFields;return Object.keys(m).reduce((_,E)=>(_[s[E]]=m[E],_),{})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="ComponentProvider",Kt=new Map;function ft(n){if(n._terminated)throw new w(y.FAILED_PRECONDITION,"The client has already been terminated.");if(!Kt.has(n)){At(Xr,"Initializing Datastore");const t=function(s){return new $i(s)}(function(s,o,c,m,g){return new Pi(s,o,c,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,pr(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator,m,g._customHeaders,g.grpcFlowControlWindow)}(n._databaseId,n.app.options.appId||"",n._persistenceKey,n.app.options.apiKey,n._freezeSettings())),e=dn(n._databaseId),r=function(s,o,c,m){return new ps(s,o,c,m)}(n._authCredentials,n._appCheckCredentials,t,e);Kt.set(n,r)}return Kt.get(n)}const ys=1048576,Jr="firestore.googleapis.com",tr=!0;class er{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new w(y.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jr,this.ssl=tr}else this.host=t.host,this.ssl=t.ssl??tr;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t._customHeaders&&(this._customHeaders={...t._customHeaders}),t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<ys)throw new w(y.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}if(function(r,i,s,o){if(i===!0&&o===!0)throw new w(y.INVALID_ARGUMENT,`${r} and ${s} cannot be used together.`)}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=pr(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new w(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new w(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new w(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams,t.grpcFlowControlWindow!==void 0){if(typeof t.grpcFlowControlWindow!="number"||t.grpcFlowControlWindow<=0||t.grpcFlowControlWindow>2147483647||!Number.isInteger(t.grpcFlowControlWindow))throw new w(y.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=t.grpcFlowControlWindow}}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams&&this.grpcFlowControlWindow===t.grpcFlowControlWindow&&function(r,i){if(r===i)return!0;if(!r||!i)return!1;const s=Object.keys(r),o=Object.keys(i);if(s.length!==o.length)return!1;for(const c of s)if(r[c]!==i[c])return!1;return!0}(this._customHeaders,t._customHeaders)}}class dt{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new er({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new w(y.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new w(y.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new er(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Vi;switch(r.type){case"firstParty":return new Ri(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new w(y.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Kt.get(e);r&&(At(Xr,"Removing Datastore"),Kt.delete(e),r.terminate())}(this),Promise.resolve()}}function qs(n,t,e){e||(e=pe);const r=ur(n,"firestore/lite");if(r.isInitialized(e))throw new w(y.FAILED_PRECONDITION,"Firestore can only be initialized once per app.");return r.initialize({options:t,instanceIdentifier:e})}function js(n,t){const e=typeof n=="object"?n:pi(),r=typeof n=="string"?n:t||"(default)",i=ur(e,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){const s=gi("firestore");s&&Es(i,...s)}return i}function Es(n,t,e,r={}){var g;n=nt(n,dt);const i=ar(t),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;i&&di(`https://${c}`),s.host!==Jr&&s.host!==c&&cr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const m={...s,host:c,ssl:i,emulatorOptions:r};if(!Pe(m,o)&&(n._setSettings(m),r.mockUserToken)){let _,E;if(typeof r.mockUserToken=="string")_=r.mockUserToken,E=K.MOCK_USER;else{_=mi(r.mockUserToken,(g=n._app)==null?void 0:g.options.projectId);const I=r.mockUserToken.sub||r.mockUserToken.user_id;if(!I)throw new w(y.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");E=new K(I)}n._authCredentials=new vi(new fr(_,E))}}function $s(n){return n=nt(n,dt),yi(n.app,"firestore/lite"),n._delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Q(this.firestore,t,this._query)}}class P{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new P(this.firestore,t,this._key)}toJSON(){return{type:P._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(re(e,P._jsonSchema))return new P(t,r||null,new O(F.fromString(e.referencePath)))}}P._jsonSchemaVersion="firestore/documentReference/1.0",P._jsonSchema={type:X("string",P._jsonSchemaVersion),referencePath:X("string")};class rt extends Q{constructor(t,e,r){super(t,e,function(s){return new Pt(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new P(this.firestore,null,new O(t))}withConverter(t){return new rt(this.firestore,t,this._path)}}function Gs(n,t,...e){if(n=L(n),un("collection","path",t),n instanceof dt){const r=F.fromString(t,...e);return Ln(r),new rt(n,null,r)}{if(!(n instanceof P||n instanceof rt))throw new w(y.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(F.fromString(t,...e));return Ln(r),new rt(n.firestore,null,r)}}function Bs(n,t){if(n=nt(n,dt),un("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new w(y.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Q(n,null,function(r){return new Pt(F.emptyPath(),r)}(t))}function ws(n,t,...e){if(n=L(n),arguments.length===1&&(t=ki.newId()),un("doc","path",t),n instanceof dt){const r=F.fromString(t,...e);return Cn(r),new P(n,null,new O(r))}{if(!(n instanceof P||n instanceof rt))throw new w(y.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(F.fromString(t,...e));return Cn(r),new P(n.firestore,n instanceof rt?n.converter:null,new O(r))}}function zs(n,t){return n=L(n),t=L(t),(n instanceof P||n instanceof rt)&&(t instanceof P||t instanceof rt)&&n.firestore===t.firestore&&n.path===t.path&&n.converter===t.converter}function Qr(n,t){return n=L(n),t=L(t),n instanceof Q&&t instanceof Q&&n.firestore===t.firestore&&ns(n._query,t._query)&&n.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t,e=0){if(this.subtype=e,!Number.isInteger(e)||e<0||e>255)throw new w(y.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=t}static fromBase64String(t,e=0){try{return new Y(et.fromBase64String(t),e)}catch(r){throw new w(y.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(t,e=0){return new Y(et.fromUint8Array(t),e)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(t){return this.subtype===t.subtype&&this._byteString.isEqual(t._byteString)}toJSON(){const t={type:Y._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(t.subtype=this.subtype),t}static fromJSON(t){if(re(t,Y._jsonSchema)){const e=t.subtype??0;return Y.fromBase64String(t.bytes,e)}}}Y._jsonSchemaVersion="firestore/bytes/1.0",Y._jsonSchema={type:X("string",Y._jsonSchemaVersion),bytes:X("string"),subtype:{...X("number"),optional:!0}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new w(y.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _t(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Ks(){return new jt(Xe)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(t){this.value=t}isEqual(t){return this.value===t.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(t,e){if(this.seconds=t,this.increment=e,!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(t){return this.seconds===t.seconds&&this.increment===t.increment}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(t){this.stringValue=t,this.value=T.fromString(t)}isEqual(t){return!(!this.value.ot()||!t.value.ot())||this.value.compareTo(t.value)===0}toJSON(){return{$t:{stringValue:this.stringValue}}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new w(y.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new w(y.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return k(this._lat,t._lat)||k(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(t){if(re(t,ut._jsonSchema))return new ut(t.latitude,t.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:X("string",ut._jsonSchemaVersion),latitude:X("number"),longitude:X("number")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(t){this.value=t}isEqual(t){return this.value===t.value}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(){this.type="MaxKey"}static instance(){return ct.MAX_KEY_VALUE_INSTANCE||(ct.MAX_KEY_VALUE_INSTANCE=new ct),ct.MAX_KEY_VALUE_INSTANCE}}ct.MAX_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(){this.type="MinKey"}static instance(){return ht.MIN_KEY_VALUE_INSTANCE||(ht.MIN_KEY_VALUE_INSTANCE=new ht),ht.MIN_KEY_VALUE_INSTANCE}}ht.MIN_KEY_VALUE_INSTANCE=null;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(t,e){this.pattern=t,this.options=e}isEqual(t){return this.pattern===t.pattern&&this.options===t.options}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,t._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(re(t,tt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new tt(t.vectorValues);throw new w(y.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:X("string",tt._jsonSchemaVersion),vectorValues:X("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=/^__.*__$/;class Ts{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new hn(t,this.data,this.fieldMask,e,this.fieldTransforms):new Gr(t,this.data,e,this.fieldTransforms)}}class Zr{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new hn(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function ti(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw R(40011,{dataSource:n})}}class Me{constructor(t,e,r,i,s,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new Me({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var i;const e=(i=this.path)==null?void 0:i.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var i;const e=(i=this.path)==null?void 0:i.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return Se(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(ti(this.dataSource)&&Is.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class As{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||dn(t)}createContext(t,e,r,i=!1){return new Me({dataSource:t,methodName:e,targetDoc:r,path:_t.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Dt(n){const t=n._freezeSettings(),e=dn(n._databaseId);return new As(n._databaseId,!!t.ignoreUndefinedProperties,e)}function qe(n,t,e,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,t,e,i);Nn("Data must be an object, but it was:",o,r);const c=ri(r,o);let m,g;if(s.merge)m=new Rt(o.fieldMask),g=o.fieldTransforms;else if(s.mergeFields){const _=[];for(const E of s.mergeFields){const I=yt(t,E,e);if(!o.contains(I))throw new w(y.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);ai(_,I)||_.push(I)}m=new Rt(_),g=o.fieldTransforms.filter(E=>m.covers(E.field))}else m=null,g=o.fieldTransforms;return new Ts(new W(c),m,g)}class se extends mt{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.createError(`${this._methodName}() can only appear at the top level of your update data`):t.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof se}}function ei(n,t,e){return new Me({dataSource:3,targetDoc:t.settings.targetDoc,methodName:n._methodName,arrayElement:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class En extends mt{_toFieldTransform(t){return new Mt(t.path,new Lr)}isEqual(t){return t instanceof En}}class wn extends mt{constructor(t,e){super(t),this.kt=e}_toFieldTransform(t){const e=ei(this,t,!0),r=this.kt.map(s=>Ft(s,e)),i=new Ur(r);return new Mt(t.path,i)}isEqual(t){return t instanceof wn&&Pe(this.kt,t.kt)}}class In extends mt{constructor(t,e){super(t),this.kt=e}_toFieldTransform(t){const e=ei(this,t,!0),r=this.kt.map(s=>Ft(s,e)),i=new Mr(r);return new Mt(t.path,i)}isEqual(t){return t instanceof In&&Pe(this.kt,t.kt)}}class Tn extends mt{constructor(t,e){super(t),this.jt=e}_toFieldTransform(t){const e=new qr(t.serializer,Oe(t.serializer,this.jt));return new Mt(t.path,e)}isEqual(t){return t instanceof Tn&&(this.jt===t.jt||Number.isNaN(this.jt)&&Number.isNaN(t.jt))}}class An extends mt{constructor(t,e){super(t),this.jt=e}_toFieldTransform(t){const e=new jr(t.serializer,Oe(t.serializer,this.jt));return new Mt(t.path,e)}isEqual(t){return t instanceof An&&(this.jt===t.jt||Number.isNaN(this.jt)&&Number.isNaN(t.jt))}}class bn extends mt{constructor(t,e){super(t),this.jt=e}_toFieldTransform(t){const e=new $r(t.serializer,Oe(t.serializer,this.jt));return new Mt(t.path,e)}isEqual(t){return t instanceof bn&&(this.jt===t.jt||Number.isNaN(this.jt)&&Number.isNaN(t.jt))}}function Vn(n,t,e,r){const i=n.createContext(1,t,e);Nn("Data must be an object, but it was:",i,r);const s=[],o=W.empty();ne(r,(m,g)=>{const _=oi(t,m,e);g=L(g);const E=i.childContextForFieldPath(_);if(g instanceof se)s.push(_);else{const I=Ft(g,E);I!=null&&(s.push(_),o.set(_,I))}});const c=new Rt(s);return new Zr(o,c,i.fieldTransforms)}function vn(n,t,e,r,i,s){const o=n.createContext(1,t,e),c=[yt(t,r,e)],m=[i];if(s.length%2!=0)throw new w(y.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<s.length;I+=2)c.push(yt(t,s[I])),m.push(s[I+1]);const g=[],_=W.empty();for(let I=c.length-1;I>=0;--I)if(!ai(g,c[I])){const v=c[I];let N=m[I];N=L(N);const V=o.childContextForFieldPath(v);if(N instanceof se)g.push(v);else{const b=Ft(N,V);b!=null&&(g.push(v),_.set(v,b))}}const E=new Rt(g);return new Zr(_,E,o.fieldTransforms)}function ni(n,t,e,r=!1){return Ft(e,n.createContext(r?4:3,t))}function Ft(n,t,e){if(si(n=L(n)))return Nn("Unsupported field value:",t,n),ri(n,t);if(n instanceof mt)return function(i,s){if(!ti(s.dataSource))throw s.createError(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return function(i,s){const o=[];let c=0;for(const m of i){let g=Ft(m,s.childContextForArray(c));g==null&&(g={nullValue:"NULL_VALUE"}),o.push(g),c++}return{arrayValue:{values:o}}}(n,t)}return function(i,s,o){if((i=L(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Oe(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const c=D.fromDate(i);return{timestampValue:me(s.serializer,c)}}if(i instanceof D){const c=new D(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:me(s.serializer,c)}}if(ii(i)){const c=D.fromInstant(i),m=new D(c.seconds,1e3*Math.floor(c.nanoseconds/1e3));return{timestampValue:me(s.serializer,m)}}if(i instanceof ut)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Y)return i.subtype===0?{bytesValue:Qn(s.serializer,i._byteString)}:function(m,g){const _=g.toUint8Array(),E=new Uint8Array(_.length+1);return E[0]=g.subtype,E.set(_,1),{mapValue:{fields:{[ke]:{bytesValue:Qn(m,et.fromUint8Array(E))}}}}}(s.serializer,i);if(i instanceof P){const c=s.databaseId,m=i.firestore._databaseId;if(!m.isEqual(c))throw s.createError(`Document reference is for database ${m.projectId}/${m.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:fn(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof tt)return function(m,g){const _=m instanceof tt?m.toArray():m;return{mapValue:{fields:{[Er]:{stringValue:wr},[ye]:{arrayValue:{values:_.map(I=>{if(typeof I!="number")throw g.createError("VectorValues must only contain numeric values.");return Cr(g.serializer,I)})}}}}}}(i,s);if(i instanceof yn)return function(m){return{mapValue:{fields:{[gt]:{mapValue:{fields:{[Ee]:{stringValue:m.pattern},[we]:{stringValue:m.options}}}}}}}}(i);if(i instanceof mn)return function(m){return{mapValue:{fields:{[Jt]:{stringValue:m.value}}}}}(i);if(i instanceof _n)return function(m){return{mapValue:{fields:{[ie]:de(m.value)}}}}(i);if(i instanceof gn)return function(m){return{mapValue:{fields:{[Ct]:{stringValue:m.stringValue}}}}}(i);if(i instanceof pn)return function(m){return{mapValue:{fields:{[wt]:{mapValue:{fields:{[Ie]:de(m.seconds),[Te]:de(m.increment)}}}}}}}(i);if(i instanceof ht)return function(){return{mapValue:{fields:{[Ir]:{nullValue:"NULL_VALUE"}}}}}();if(i instanceof ct)return function(){return{mapValue:{fields:{[ln]:{nullValue:"NULL_VALUE"}}}}}();if(Hr(i))return i._toProto(s.serializer);throw s.createError(`Unsupported field value: ${Fe(i)}`)}(n,t)}function ri(n,t){const e={};return function(i){for(const s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ne(n,(r,i)=>{const s=Ft(i,t.childContextForField(r));s!=null&&(e[r]=s)}),{mapValue:{fields:e}}}function ii(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;const t=n;return t[Symbol.toStringTag]==="Temporal.Instant"&&typeof t.ht=="bigint"}function si(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof D||n instanceof ut||n instanceof Y||n instanceof P||n instanceof mt||n instanceof tt||n instanceof ht||n instanceof ct||n instanceof _n||n instanceof gn||n instanceof yn||n instanceof mn||n instanceof pn||ii(n)||Hr(n))}function Nn(n,t,e){if(!si(e)||!dr(e)){const r=Fe(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function yt(n,t,e){if((t=L(t))instanceof jt)return t._internalPath;if(typeof t=="string")return oi(n,t);throw Se("Field path arguments must be of type string or ",n,!1,void 0,e)}const bs=new RegExp("[~\\*/\\[\\]]");function oi(n,t,e){if(t.search(bs)>=0)throw Se(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new jt(...t.split("."))._internalPath}catch{throw Se(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Se(n,t,e,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let m="";return(s||o)&&(m+=" (found",s&&(m+=` in field ${r}`),o&&(m+=` in document ${i}`),m+=")"),new w(y.INVALID_ARGUMENT,c+n+m)}function ai(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t,e,r,i,s){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new P(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new ui(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(yt("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class ui extends St{data(){return super.data()}}class rn{constructor(t,e){this._docs=e,this.query=t}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(t,e){this._docs.forEach(t,e)}}function Vs(n,t){return n=L(n),t=L(t),n instanceof St&&t instanceof St?n._firestore===t._firestore&&n._key.isEqual(t._key)&&(n._document===null?t._document===null:n._document.isEqual(t._document))&&n._converter===t._converter:n instanceof rn&&t instanceof rn&&Qr(n.query,t.query)&&an(n.docs,t.docs,Vs)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{}class oe extends xn{}function Ws(n,t,...e){let r=[];t instanceof xn&&r.push(t),r=r.concat(e),function(s){const o=s.filter(m=>m instanceof $t).length,c=s.filter(m=>m instanceof ae).length;if(o>1||o>0&&c>0)throw new w(y.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class ae extends oe{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new ae(t,e,r)}_apply(t){const e=this._parse(t);return ci(t._query,e),new Q(t.firestore,t.converter,tn(t._query,e))}_parse(t){const e=Dt(t.firestore);return function(s,o,c,m,g,_,E){let I;if(function(V,b){if(typeof V=="number"&&isNaN(V)&&b!=="=="&&b!=="!="&&b!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on NaN.");if(V===null&&b!=="=="&&b!=="!="&&b!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on Null.")}(E,_),g.isKeyField()){if(_==="array-contains"||_==="array-contains-any")throw new w(y.INVALID_ARGUMENT,`Invalid Query. You can't perform '${_}' queries on documentId().`);if(_==="in"||_==="not-in"){rr(E,_);const N=[];for(const V of E)N.push(nr(m,s,V));I={arrayValue:{values:N}}}else I=nr(m,s,E)}else _!=="in"&&_!=="not-in"&&_!=="array-contains-any"||rr(E,_),I=ni(c,o,E,_==="in"||_==="not-in");return J.create(g,_,I)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Hs(n,t,e){const r=t,i=yt("where",n);return ae._create(i,r,e)}class $t extends xn{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new $t(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:xt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const m of c)ci(o,m),o=tn(o,m)}(t._query,e),new Q(t.firestore,t.converter,tn(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Ys(...n){return n.forEach(t=>hi("or",t)),$t._create("or",n)}function Xs(...n){return n.forEach(t=>hi("and",t)),$t._create("and",n)}class Rn extends oe{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Rn(t,e)}_apply(t){const e=function(i,s,o){if(i.startAt!==null)throw new w(y.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new w(y.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ne(s,o)}(t._query,this._field,this._direction);return new Q(t.firestore,t.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Pt(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(t._query,e))}}function Js(n,t="asc"){const e=t,r=yt("orderBy",n);return Rn._create(r,e)}class je extends oe{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new je(t,e,r)}_apply(t){return new Q(t.firestore,t.converter,function(r,i,s){return new Pt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),i,s,r.startAt,r.endAt)}(t._query,this._limit,this._limitType))}}function Qs(n){return mr("limit",n),je._create("limit",n,"F")}function Zs(n){return mr("limitToLast",n),je._create("limitToLast",n,"L")}class $e extends oe{constructor(t,e,r){super(),this.type=t,this._docOrFields=e,this._inclusive=r}static _create(t,e,r){return new $e(t,e,r)}_apply(t){const e=li(t,this.type,this._docOrFields,this._inclusive);return new Q(t.firestore,t.converter,function(i,s){return new Pt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(t._query,e))}}function to(...n){return $e._create("startAt",n,!0)}function eo(...n){return $e._create("startAfter",n,!1)}class Ge extends oe{constructor(t,e,r){super(),this.type=t,this._docOrFields=e,this._inclusive=r}static _create(t,e,r){return new Ge(t,e,r)}_apply(t){const e=li(t,this.type,this._docOrFields,this._inclusive);return new Q(t.firestore,t.converter,function(i,s){return new Pt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(t._query,e))}}function no(...n){return Ge._create("endBefore",n,!1)}function ro(...n){return Ge._create("endAt",n,!0)}function li(n,t,e,r){if(e[0]=L(e[0]),e[0]instanceof St)return function(s,o,c,m,g){if(!m)throw new w(y.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const _=[];for(const E of kr(s))if(E.field.isKeyField())_.push(be(o,m.key));else{const I=m.data.field(E.field);if(_r(I))throw new w(y.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+E.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(I===null){const v=E.field.canonicalString();throw new w(y.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}_.push(I)}return new ve(_,g)}(n._query,n.firestore._databaseId,t,e[0]._document,r);{const i=Dt(n.firestore);return function(o,c,m,g,_,E){const I=o.explicitOrderBy;if(_.length>I.length)throw new w(y.INVALID_ARGUMENT,`Too many arguments provided to ${g}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let N=0;N<_.length;N++){const V=_[N];if(I[N].field.isKeyField()){if(typeof V!="string")throw new w(y.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${g}(), but got a ${typeof V}`);if(!Fr(o)&&V.indexOf("/")!==-1)throw new w(y.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${g}() must be a plain document ID, but '${V}' contains a slash.`);const b=o.path.child(F.fromString(V));if(!O.isDocumentKey(b))throw new w(y.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${g}() must result in a valid document path, but '${b}' is not because it contains an odd number of segments.`);const G=new O(b);v.push(be(c,G))}else{const b=ni(m,g,V);v.push(b)}}return new ve(v,E)}(n._query,n.firestore._databaseId,i,t,e,r)}}function nr(n,t,e){if(typeof(e=L(e))=="string"){if(e==="")throw new w(y.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fr(t)&&e.indexOf("/")!==-1)throw new w(y.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(F.fromString(e));if(!O.isDocumentKey(r))throw new w(y.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return be(n,new O(r))}if(e instanceof P)return be(n,e._key);throw new w(y.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fe(e)}.`)}function rr(n,t){if(!Array.isArray(n)||n.length===0)throw new w(y.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function ci(n,t){const e=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new w(y.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new w(y.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function hi(n,t){if(!(t instanceof ae||t instanceof $t))throw new w(y.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class vs{convertValue(t,e="none"){switch(vt(t)){case 0:return null;case 2:return t.booleanValue;case 3:if("mapValue"in t){if(Ve(t))return this.convertToInt32Value(t.mapValue);if(Nt(t))return this.convertToDecimal128Value(t.mapValue)}return j(t.integerValue||t.doubleValue);case 4:return this.convertTimestamp(t.timestampValue);case 6:return this.convertServerTimestamp(t,e);case 7:return t.stringValue;case 8:return"bytesValue"in t?this.convertBytes(_e(t.bytesValue)):this.convertToBytesWithSubtype(t.mapValue);case 9:return this.convertReference(t.referenceValue);case 11:return this.convertGeoPoint(t.geoPointValue);case 13:return this.convertArray(t.arrayValue,e);case 15:return this.convertObject(t.mapValue,e);case 14:return this.convertVectorValue(t.mapValue);case 12:return this.convertToRegexValue(t.mapValue);case 10:return this.convertToBsonObjectId(t.mapValue);case 5:return this.convertToBsonTimestamp(t.mapValue);case 16:return ct.instance();case 1:return ht.instance();default:throw R(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return ne(t,(i,s)=>{r[i]=this.convertValue(s,e)}),r}convertVectorValue(t){var r,i,s;const e=(s=(i=(r=t.fields)==null?void 0:r[ye].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>j(o.doubleValue));return new tt(e)}convertToBsonObjectId(t){var r,i;const e=((i=(r=t.fields)==null?void 0:r[Jt])==null?void 0:i.stringValue)??"";return new mn(e)}convertToBytesWithSubtype(t){var c;const e=(c=t.fields)==null?void 0:c[ke],r=e==null?void 0:e.bytesValue;if(!r)throw new Error("Received incorrect bytesValue for Bytes with subtype");const i=_e(r).toUint8Array();if(i.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");const s=i[0],o=i.slice(1);return new Y(et.fromUint8Array(o),s)}convertToBsonTimestamp(t){var s,o,c,m,g,_,E;const e=(s=t.fields)==null?void 0:s[wt],r=Number((m=(c=(o=e==null?void 0:e.mapValue)==null?void 0:o.fields)==null?void 0:c[Ie])==null?void 0:m.integerValue),i=Number((E=(_=(g=e==null?void 0:e.mapValue)==null?void 0:g.fields)==null?void 0:_[Te])==null?void 0:E.integerValue);return new pn(r,i)}convertToRegexValue(t){var i,s,o,c,m,g,_,E,I,v;const e=((m=(c=(o=(s=(i=t.fields)==null?void 0:i[gt])==null?void 0:s.mapValue)==null?void 0:o.fields)==null?void 0:c[Ee])==null?void 0:m.stringValue)??"",r=((v=(I=(E=(_=(g=t.fields)==null?void 0:g[gt])==null?void 0:_.mapValue)==null?void 0:E.fields)==null?void 0:I[we])==null?void 0:v.stringValue)??"";return new yn(e,r)}convertToInt32Value(t){var r,i;const e=Number((i=(r=t.fields)==null?void 0:r[ie])==null?void 0:i.integerValue);return new _n(e)}convertToDecimal128Value(t){var r,i;const e=((i=(r=t.fields)==null?void 0:r[Ct])==null?void 0:i.stringValue)??"";return new gn(e)}convertGeoPoint(t){return new ut(j(t.latitude),j(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=yr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Xt(t));default:return null}}convertTimestamp(t){const e=Vt(t);return new D(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=F.fromString(t);H(Wr(r),9688,{name:t});const i=new Wt(r.get(1),r.get(3)),s=new O(r.popFirst(5));return i.isEqual(e)||De(`A document reference to ${s} refers to a different database (${i.projectId}/${i.database}), which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class ze extends vs{constructor(t){super(),this.firestore=t}convertBytes(t){return new Y(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new P(this.firestore,null,e)}}function io(n){const t=ft((n=nt(n,P)).firestore),e=new ze(n.firestore);return Yr(t,[n._key]).then(r=>{H(r.length===1,15618);const i=r[0];return new St(n.firestore,e,n._key,i.isFoundDocument()?i:null,n.converter)})}function so(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new w(y.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((n=nt(n,Q))._query);const t=ft(n.firestore),e=new ze(n.firestore);return gs(t,n._query).then(r=>{const i=r.map(s=>new ui(n.firestore,e,s.key,s,n.converter));return n._query.limitType==="L"&&i.reverse(),new rn(n,i)})}function oo(n,t,e){const r=Be((n=nt(n,P)).converter,t,e),i=qe(Dt(n.firestore),"setDoc",n._key,r,n.converter!==null,e);return qt(ft(n.firestore),[i.toMutation(n._key,$.none())])}function ao(n,t,e,...r){const i=Dt((n=nt(n,P)).firestore);let s;return s=typeof(t=L(t))=="string"||t instanceof jt?vn(i,"updateDoc",n._key,t,e,r):Vn(i,"updateDoc",n._key,t),qt(ft(n.firestore),[s.toMutation(n._key,$.exists(!0))])}function uo(n){return qt(ft((n=nt(n,P)).firestore),[new Ue(n._key,$.none())])}function lo(n,t){const e=ws(n=nt(n,rt)),r=Be(n.converter,t),i=qe(Dt(n.firestore),"addDoc",e._key,r,e.converter!==null,{});return qt(ft(n.firestore),[i.toMutation(e._key,$.exists(!1))]).then(()=>e)}function co(){return new se("deleteField")}function ho(){return new En("serverTimestamp")}function fo(...n){return new wn("arrayUnion",n)}function mo(...n){return new In("arrayRemove",n)}function po(n){return new Tn("increment",n)}function go(n){return new An("minimum",n)}function _o(n){return new bn("maximum",n)}function yo(n){return new tt(n)}const ir="4.20.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(t,e,r){this.alias=t,this.aggregateType=e,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(t,e,r=1e3,i=1.5,s=6e4){this.t=t,this.timerId=e,this.i=r,this.o=i,this.h=s,this.u=0,this.l=null,this._=Date.now(),this.reset()}reset(){this.u=0}m(){this.u=this.h}A(t){this.cancel();const e=Math.floor(this.u+this.p()),r=Math.max(0,Date.now()-this._),i=Math.max(0,e-r);i>0&&At("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.u} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.l=this.t.enqueueAfterDelay(this.timerId,i,()=>(this._=Date.now(),t())),this.u*=this.o,this.u<this.i&&(this.u=this.i),this.u>this.h&&(this.u=this.h)}T(){this.l!==null&&(this.l.skipDelay(),this.l=null)}cancel(){this.l!==null&&(this.l.cancel(),this.l=null)}p(){return(Math.random()-.5)*this.u}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class xs{constructor(t,e,r){this._userDataWriter=e,this._data=r,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new W({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(n){return Rs(n,{count:Ss()})}function Rs(n,t){const e=nt(n.firestore,dt),r=ft(e),i=Bi(t,(s,o)=>new Ns(o,s.aggregateType,s._internalFieldPath));return _s(r,n._query,i).then(s=>function(c,m,g){const _=new ze(c);return new xs(m,_,g)}(e,n,s))}function wo(n){return new ee("sum",yt("sum",n))}function Io(n){return new ee("avg",yt("average",n))}function Ss(){return new ee("count")}function To(n,t){var e,r;return n instanceof ee&&t instanceof ee&&n.aggregateType===t.aggregateType&&((e=n._internalFieldPath)==null?void 0:e.canonicalString())===((r=t._internalFieldPath)==null?void 0:r.canonicalString())}function Ao(n,t){return Qr(n.query,t.query)&&Pe(n.data(),t.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Dt(t)}set(t,e,r){this._verifyNotCommitted();const i=It(t,this._firestore),s=Be(i.converter,e,r),o=qe(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,$.none())),this}update(t,e,r,...i){this._verifyNotCommitted();const s=It(t,this._firestore);let o;return o=typeof(e=L(e))=="string"||e instanceof jt?vn(this._dataReader,"WriteBatch.update",s._key,e,r,i):Vn(this._dataReader,"WriteBatch.update",s._key,e),this._mutations.push(o.toMutation(s._key,$.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=It(t,this._firestore);return this._mutations=this._mutations.concat(new Ue(e._key,$.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new w(y.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function It(n,t){if((n=L(n)).firestore!==t)throw new w(y.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function bo(n){n=nt(n,dt);const t=ft(n);return new Ps(n,e=>qt(t,e))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ds=class{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new w(y.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await Yr(this.datastore,t);return e.forEach(r=>this.recordVersion(r)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new Ue(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,r)=>{const i=O.fromPath(r);this.mutations.push(new Br(i,this.precondition(i)))}),await qt(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw R(50498,{R:t.constructor.name});e=C.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new w(y.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(C.min())?$.exists(!1):$.updateTime(e):$.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(C.min()))throw new w(y.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return $.updateTime(e)}return $.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs={maxAttempts:5};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(t,e,r,i,s){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=i,this.deferred=s,this.I=r.maxAttempts,this.P=new fi(this.asyncQueue,"transaction_retry")}V(){this.I-=1,this.D()}D(){this.P.A(async()=>{const t=new Ds(this.datastore),e=this.v(t);e&&e.then(r=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.F(i)}))}).catch(r=>{this.F(r)})})}v(t){try{const e=this.updateFunction(t);return!gr(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}F(t){this.I>0&&this.B(t)?(this.I-=1,this.asyncQueue.enqueueAndForget(()=>(this.D(),Promise.resolve()))):this.deferred.reject(t)}B(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!ji(e)}return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(t,e,r,i,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Sn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,s){const o=Date.now()+r,c=new Pn(t,e,o,i,s);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new w(y.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="AsyncQueue";class Os{constructor(t=Promise.resolve()){this.k=[],this.O=!1,this.C=[],this.S=null,this.q=!1,this.M=!1,this.N=[],this.P=new fi(this,"async_queue_retry"),this.L=()=>{const r=Ye();r&&At(sr,"Visibility state changed to "+r.visibilityState),this.P.T()},this.W=t;const e=Ye();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.L)}get isShuttingDown(){return this.O}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.U(),this.j(t)}enterRestrictedMode(t){if(!this.O){this.O=!0,this.M=t||!1;const e=Ye();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.L)}}enqueue(t){if(this.U(),this.O)return new Promise(()=>{});const e=new Sn;return this.j(()=>this.O&&this.M?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.k.push(t),this.$()))}async $(){if(this.k.length!==0){try{await this.k[0](),this.k.shift(),this.P.reset()}catch(t){if(!function(r){return r.name==="IndexedDbTransactionError"}(t))throw t;At(sr,"Operation failed with retryable error: "+t)}this.k.length>0&&this.P.A(()=>this.$())}}j(t){const e=this.W.then(()=>(this.q=!0,t().catch(r=>{this.S=r,this.q=!1;const i=or(r);throw De("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.q=!1,r))));return this.W=e,e}enqueueAfterDelay(t,e,r){this.U(),this.N.indexOf(t)>-1&&(e=0);const i=Pn.createAndSchedule(this,t,e,r,s=>this.G(s));return this.C.push(i),i}U(){this.S&&R(47125,{K:or(this.S)})}verifyOperationInProgress(){}async H(){let t;do t=this.W,await t;while(t!==this.W)}J(t){for(const e of this.C)if(e.timerId===t)return!0;return!1}X(t){return this.H().then(()=>{this.C.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.C)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.H()})}Y(t){this.N.push(t)}G(t){const e=this.C.indexOf(t);this.C.splice(e,1)}}function or(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Dt(t)}get(t){const e=It(t,this._firestore),r=new ze(this._firestore);return this._transaction.lookup([e._key]).then(i=>{if(!i||i.length!==1)return R(24041);const s=i[0];if(s.isFoundDocument())return new St(this._firestore,r,s.key,s,e.converter);if(s.isNoDocument())return new St(this._firestore,r,e._key,null,e.converter);throw R(18433,{doc:s})})}set(t,e,r){const i=It(t,this._firestore),s=Be(i.converter,e,r),o=qe(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(t,e,r,...i){const s=It(t,this._firestore);let o;return o=typeof(e=L(e))=="string"||e instanceof jt?vn(this._dataReader,"Transaction.update",s._key,e,r,i):Vn(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,o),this}delete(t){const e=It(t,this._firestore);return this._transaction.delete(e._key),this}}function vo(n,t,e){n=nt(n,dt);const r=ft(n),i={...Fs,...e};(function(c){if(c.maxAttempts<1)throw new w(y.INVALID_ARGUMENT,"Max attempts must be at least 1")})(i);const s=new Sn;return new ks(function(){return new Os}(),r,i,o=>t(new Cs(n,o)),s).V(),s.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){bi(`${Ai}_lite`),Ii(new Ti("firestore/lite",(t,{instanceIdentifier:e,options:r})=>{const i=t.getProvider("app").getImmediate(),s=new dt(new Ni(t.getProvider("auth-internal")),new Si(i,t.getProvider("app-check-internal")),Di(i,e),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),Fn("firestore-lite",ir,""),Fn("firestore-lite",ir,"esm2020")})();export{ee as AggregateField,xs as AggregateQuerySnapshot,mn as BsonObjectId,pn as BsonTimestamp,Y as Bytes,rt as CollectionReference,gn as Decimal128Value,P as DocumentReference,St as DocumentSnapshot,jt as FieldPath,mt as FieldValue,dt as Firestore,w as FirestoreError,ut as GeoPoint,_n as Int32Value,ct as MaxKey,ht as MinKey,Q as Query,$t as QueryCompositeFilterConstraint,oe as QueryConstraint,ui as QueryDocumentSnapshot,Ge as QueryEndAtConstraint,ae as QueryFieldFilterConstraint,je as QueryLimitConstraint,Rn as QueryOrderByConstraint,rn as QuerySnapshot,$e as QueryStartAtConstraint,yn as RegexValue,D as Timestamp,Cs as Transaction,tt as VectorValue,Ps as WriteBatch,lo as addDoc,To as aggregateFieldEqual,Ao as aggregateQuerySnapshotEqual,Xs as and,mo as arrayRemove,fo as arrayUnion,Io as average,Gs as collection,Bs as collectionGroup,Es as connectFirestoreEmulator,Ss as count,uo as deleteDoc,co as deleteField,ws as doc,Ks as documentId,ro as endAt,no as endBefore,Rs as getAggregate,Eo as getCount,io as getDoc,so as getDocs,js as getFirestore,po as increment,qs as initializeFirestore,Qs as limit,Zs as limitToLast,_o as maximum,go as minimum,Ys as or,Js as orderBy,Ws as query,Qr as queryEqual,zs as refEqual,vo as runTransaction,ho as serverTimestamp,oo as setDoc,Us as setLogLevel,Vs as snapshotEqual,eo as startAfter,to as startAt,wo as sum,$s as terminate,ao as updateDoc,yo as vector,Hs as where,bo as writeBatch};
