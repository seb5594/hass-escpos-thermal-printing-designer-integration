/* ESC/POS Thermal Printer Designer panel - MIT License - https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration */
var C5=globalThis,e5=C5.ShadowRoot&&(C5.ShadyCSS===void 0||C5.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r3=Symbol(),w7=new WeakMap,h2=class{constructor(C,e,H){if(this._$cssResult$=!0,H!==r3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=C,this.t=e}get styleSheet(){let C=this.o,e=this.t;if(e5&&C===void 0){let H=e!==void 0&&e.length===1;H&&(C=w7.get(e)),C===void 0&&((this.o=C=new CSSStyleSheet).replaceSync(this.cssText),H&&w7.set(e,C))}return C}toString(){return this.cssText}},k7=V=>new h2(typeof V=="string"?V:V+"",void 0,r3),d=(V,...C)=>{let e=V.length===1?V[0]:C.reduce((H,t,r)=>H+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(t)+V[r+1],V[0]);return new h2(e,V,r3)},T7=(V,C)=>{if(e5)V.adoptedStyleSheets=C.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of C){let H=document.createElement("style"),t=C5.litNonce;t!==void 0&&H.setAttribute("nonce",t),H.textContent=e.cssText,V.appendChild(H)}},L3=e5?V=>V:V=>V instanceof CSSStyleSheet?(C=>{let e="";for(let H of C.cssRules)e+=H.cssText;return k7(e)})(V):V;var{is:P4,defineProperty:B4,getOwnPropertyDescriptor:R4,getOwnPropertyNames:$4,getOwnPropertySymbols:F4,getPrototypeOf:D4}=Object,H5=globalThis,E7=H5.trustedTypes,I4=E7?E7.emptyScript:"",z4=H5.reactiveElementPolyfillSupport,f2=(V,C)=>V,Z2={toAttribute(V,C){switch(C){case Boolean:V=V?I4:null;break;case Object:case Array:V=V==null?V:JSON.stringify(V)}return V},fromAttribute(V,C){let e=V;switch(C){case Boolean:e=V!==null;break;case Number:e=V===null?null:Number(V);break;case Object:case Array:try{e=JSON.parse(V)}catch{e=null}}return e}},t5=(V,C)=>!P4(V,C),P7={attribute:!0,type:String,converter:Z2,reflect:!1,useDefault:!1,hasChanged:t5};Symbol.metadata??=Symbol("metadata"),H5.litPropertyMetadata??=new WeakMap;var f1=class extends HTMLElement{static addInitializer(C){this._$Ei(),(this.l??=[]).push(C)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(C,e=P7){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(C)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(C,e),!e.noAccessor){let H=Symbol(),t=this.getPropertyDescriptor(C,H,e);t!==void 0&&B4(this.prototype,C,t)}}static getPropertyDescriptor(C,e,H){let{get:t,set:r}=R4(this.prototype,C)??{get(){return this[e]},set(i){this[e]=i}};return{get:t,set(i){let M=t?.call(this);r?.call(this,i),this.requestUpdate(C,M,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(C){return this.elementProperties.get(C)??P7}static _$Ei(){if(this.hasOwnProperty(f2("elementProperties")))return;let C=D4(this);C.finalize(),C.l!==void 0&&(this.l=[...C.l]),this.elementProperties=new Map(C.elementProperties)}static finalize(){if(this.hasOwnProperty(f2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f2("properties"))){let e=this.properties,H=[...$4(e),...F4(e)];for(let t of H)this.createProperty(t,e[t])}let C=this[Symbol.metadata];if(C!==null){let e=litPropertyMetadata.get(C);if(e!==void 0)for(let[H,t]of e)this.elementProperties.set(H,t)}this._$Eh=new Map;for(let[e,H]of this.elementProperties){let t=this._$Eu(e,H);t!==void 0&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(C){let e=[];if(Array.isArray(C)){let H=new Set(C.flat(1/0).reverse());for(let t of H)e.unshift(L3(t))}else C!==void 0&&e.push(L3(C));return e}static _$Eu(C,e){let H=e.attribute;return H===!1?void 0:typeof H=="string"?H:typeof C=="string"?C.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(C=>this.enableUpdating=C),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(C=>C(this))}addController(C){(this._$EO??=new Set).add(C),this.renderRoot!==void 0&&this.isConnected&&C.hostConnected?.()}removeController(C){this._$EO?.delete(C)}_$E_(){let C=new Map,e=this.constructor.elementProperties;for(let H of e.keys())this.hasOwnProperty(H)&&(C.set(H,this[H]),delete this[H]);C.size>0&&(this._$Ep=C)}createRenderRoot(){let C=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return T7(C,this.constructor.elementStyles),C}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(C=>C.hostConnected?.())}enableUpdating(C){}disconnectedCallback(){this._$EO?.forEach(C=>C.hostDisconnected?.())}attributeChangedCallback(C,e,H){this._$AK(C,H)}_$ET(C,e){let H=this.constructor.elementProperties.get(C),t=this.constructor._$Eu(C,H);if(t!==void 0&&H.reflect===!0){let r=(H.converter?.toAttribute!==void 0?H.converter:Z2).toAttribute(e,H.type);this._$Em=C,r==null?this.removeAttribute(t):this.setAttribute(t,r),this._$Em=null}}_$AK(C,e){let H=this.constructor,t=H._$Eh.get(C);if(t!==void 0&&this._$Em!==t){let r=H.getPropertyOptions(t),i=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Z2;this._$Em=t;let M=i.fromAttribute(e,r.type);this[t]=M??this._$Ej?.get(t)??M,this._$Em=null}}requestUpdate(C,e,H,t=!1,r){if(C!==void 0){let i=this.constructor;if(t===!1&&(r=this[C]),H??=i.getPropertyOptions(C),!((H.hasChanged??t5)(r,e)||H.useDefault&&H.reflect&&r===this._$Ej?.get(C)&&!this.hasAttribute(i._$Eu(C,H))))return;this.C(C,e,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(C,e,{useDefault:H,reflect:t,wrapped:r},i){H&&!(this._$Ej??=new Map).has(C)&&(this._$Ej.set(C,i??e??this[C]),r!==!0||i!==void 0)||(this._$AL.has(C)||(this.hasUpdated||H||(e=void 0),this._$AL.set(C,e)),t===!0&&this._$Em!==C&&(this._$Eq??=new Set).add(C))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let C=this.scheduleUpdate();return C!=null&&await C,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,r]of this._$Ep)this[t]=r;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[t,r]of H){let{wrapped:i}=r,M=this[t];i!==!0||this._$AL.has(t)||M===void 0||this.C(t,void 0,r,M)}}let C=!1,e=this._$AL;try{C=this.shouldUpdate(e),C?(this.willUpdate(e),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(e)):this._$EM()}catch(H){throw C=!1,this._$EM(),H}C&&this._$AE(e)}willUpdate(C){}_$AE(C){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(C)),this.updated(C)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(C){return!0}update(C){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(C){}firstUpdated(C){}};f1.elementStyles=[],f1.shadowRootOptions={mode:"open"},f1[f2("elementProperties")]=new Map,f1[f2("finalized")]=new Map,z4?.({ReactiveElement:f1}),(H5.reactiveElementVersions??=[]).push("2.1.2");var o3=globalThis,B7=V=>V,V5=o3.trustedTypes,R7=V5?V5.createPolicy("lit-html",{createHTML:V=>V}):void 0,a3="$lit$",Z1=`lit$${Math.random().toFixed(9).slice(2)}$`,M3="?"+Z1,N4=`<${M3}>`,j1=document,g2=()=>j1.createComment(""),b2=V=>V===null||typeof V!="object"&&typeof V!="function",n3=Array.isArray,N7=V=>n3(V)||typeof V?.[Symbol.iterator]=="function",i3=`[ 	
\f\r]`,S2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$7=/-->/g,F7=/>/g,q1=RegExp(`>|${i3}(?:([^\\s"'>=/]+)(${i3}*=${i3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),D7=/'/g,I7=/"/g,W7=/^(?:script|style|textarea|title)$/i,l3=V=>(C,...e)=>({_$litType$:V,strings:C,values:e}),o=l3(1),M5=l3(2),U7=l3(3),Q=Symbol.for("lit-noChange"),n=Symbol.for("lit-nothing"),z7=new WeakMap,Q1=j1.createTreeWalker(j1,129);function G7(V,C){if(!n3(V)||!V.hasOwnProperty("raw"))throw Error("invalid template strings array");return R7!==void 0?R7.createHTML(C):C}var q7=(V,C)=>{let e=V.length-1,H=[],t,r=C===2?"<svg>":C===3?"<math>":"",i=S2;for(let M=0;M<e;M++){let l=V[M],s,p,A=-1,v=0;for(;v<l.length&&(i.lastIndex=v,p=i.exec(l),p!==null);)v=i.lastIndex,i===S2?p[1]==="!--"?i=$7:p[1]!==void 0?i=F7:p[2]!==void 0?(W7.test(p[2])&&(t=RegExp("</"+p[2],"g")),i=q1):p[3]!==void 0&&(i=q1):i===q1?p[0]===">"?(i=t??S2,A=-1):p[1]===void 0?A=-2:(A=i.lastIndex-p[2].length,s=p[1],i=p[3]===void 0?q1:p[3]==='"'?I7:D7):i===I7||i===D7?i=q1:i===$7||i===F7?i=S2:(i=q1,t=void 0);let f=i===q1&&V[M+1].startsWith("/>")?" ":"";r+=i===S2?l+N4:A>=0?(H.push(s),l.slice(0,A)+a3+l.slice(A)+Z1+f):l+Z1+(A===-2?M:f)}return[G7(V,r+(V[e]||"<?>")+(C===2?"</svg>":C===3?"</math>":"")),H]},y2=class V{constructor({strings:C,_$litType$:e},H){let t;this.parts=[];let r=0,i=0,M=C.length-1,l=this.parts,[s,p]=q7(C,e);if(this.el=V.createElement(s,H),Q1.currentNode=this.el.content,e===2||e===3){let A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(t=Q1.nextNode())!==null&&l.length<M;){if(t.nodeType===1){if(t.hasAttributes())for(let A of t.getAttributeNames())if(A.endsWith(a3)){let v=p[i++],f=t.getAttribute(A).split(Z1),w=/([.?@])?(.*)/.exec(v);l.push({type:1,index:r,name:w[2],strings:f,ctor:w[1]==="."?L5:w[1]==="?"?i5:w[1]==="@"?o5:Y1}),t.removeAttribute(A)}else A.startsWith(Z1)&&(l.push({type:6,index:r}),t.removeAttribute(A));if(W7.test(t.tagName)){let A=t.textContent.split(Z1),v=A.length-1;if(v>0){t.textContent=V5?V5.emptyScript:"";for(let f=0;f<v;f++)t.append(A[f],g2()),Q1.nextNode(),l.push({type:2,index:++r});t.append(A[v],g2())}}}else if(t.nodeType===8)if(t.data===M3)l.push({type:2,index:r});else{let A=-1;for(;(A=t.data.indexOf(Z1,A+1))!==-1;)l.push({type:7,index:r}),A+=Z1.length-1}r++}}static createElement(C,e){let H=j1.createElement("template");return H.innerHTML=C,H}};function K1(V,C,e=V,H){if(C===Q)return C;let t=H!==void 0?e._$Co?.[H]:e._$Cl,r=b2(C)?void 0:C._$litDirective$;return t?.constructor!==r&&(t?._$AO?.(!1),r===void 0?t=void 0:(t=new r(V),t._$AT(V,e,H)),H!==void 0?(e._$Co??=[])[H]=t:e._$Cl=t),t!==void 0&&(C=K1(V,t._$AS(V,C.values),t,H)),C}var r5=class{constructor(C,e){this._$AV=[],this._$AN=void 0,this._$AD=C,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(C){let{el:{content:e},parts:H}=this._$AD,t=(C?.creationScope??j1).importNode(e,!0);Q1.currentNode=t;let r=Q1.nextNode(),i=0,M=0,l=H[0];for(;l!==void 0;){if(i===l.index){let s;l.type===2?s=new V2(r,r.nextSibling,this,C):l.type===1?s=new l.ctor(r,l.name,l.strings,this,C):l.type===6&&(s=new a5(r,this,C)),this._$AV.push(s),l=H[++M]}i!==l?.index&&(r=Q1.nextNode(),i++)}return Q1.currentNode=j1,t}p(C){let e=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(C,H,e),e+=H.strings.length-2):H._$AI(C[e])),e++}},V2=class V{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(C,e,H,t){this.type=2,this._$AH=n,this._$AN=void 0,this._$AA=C,this._$AB=e,this._$AM=H,this.options=t,this._$Cv=t?.isConnected??!0}get parentNode(){let C=this._$AA.parentNode,e=this._$AM;return e!==void 0&&C?.nodeType===11&&(C=e.parentNode),C}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(C,e=this){C=K1(this,C,e),b2(C)?C===n||C==null||C===""?(this._$AH!==n&&this._$AR(),this._$AH=n):C!==this._$AH&&C!==Q&&this._(C):C._$litType$!==void 0?this.$(C):C.nodeType!==void 0?this.T(C):N7(C)?this.k(C):this._(C)}O(C){return this._$AA.parentNode.insertBefore(C,this._$AB)}T(C){this._$AH!==C&&(this._$AR(),this._$AH=this.O(C))}_(C){this._$AH!==n&&b2(this._$AH)?this._$AA.nextSibling.data=C:this.T(j1.createTextNode(C)),this._$AH=C}$(C){let{values:e,_$litType$:H}=C,t=typeof H=="number"?this._$AC(C):(H.el===void 0&&(H.el=y2.createElement(G7(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===t)this._$AH.p(e);else{let r=new r5(t,this),i=r.u(this.options);r.p(e),this.T(i),this._$AH=r}}_$AC(C){let e=z7.get(C.strings);return e===void 0&&z7.set(C.strings,e=new y2(C)),e}k(C){n3(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,H,t=0;for(let r of C)t===e.length?e.push(H=new V(this.O(g2()),this.O(g2()),this,this.options)):H=e[t],H._$AI(r),t++;t<e.length&&(this._$AR(H&&H._$AB.nextSibling,t),e.length=t)}_$AR(C=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);C!==this._$AB;){let H=B7(C).nextSibling;B7(C).remove(),C=H}}setConnected(C){this._$AM===void 0&&(this._$Cv=C,this._$AP?.(C))}},Y1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(C,e,H,t,r){this.type=1,this._$AH=n,this._$AN=void 0,this.element=C,this.name=e,this._$AM=t,this.options=r,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=n}_$AI(C,e=this,H,t){let r=this.strings,i=!1;if(r===void 0)C=K1(this,C,e,0),i=!b2(C)||C!==this._$AH&&C!==Q,i&&(this._$AH=C);else{let M=C,l,s;for(C=r[0],l=0;l<r.length-1;l++)s=K1(this,M[H+l],e,l),s===Q&&(s=this._$AH[l]),i||=!b2(s)||s!==this._$AH[l],s===n?C=n:C!==n&&(C+=(s??"")+r[l+1]),this._$AH[l]=s}i&&!t&&this.j(C)}j(C){C===n?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,C??"")}},L5=class extends Y1{constructor(){super(...arguments),this.type=3}j(C){this.element[this.name]=C===n?void 0:C}},i5=class extends Y1{constructor(){super(...arguments),this.type=4}j(C){this.element.toggleAttribute(this.name,!!C&&C!==n)}},o5=class extends Y1{constructor(C,e,H,t,r){super(C,e,H,t,r),this.type=5}_$AI(C,e=this){if((C=K1(this,C,e,0)??n)===Q)return;let H=this._$AH,t=C===n&&H!==n||C.capture!==H.capture||C.once!==H.once||C.passive!==H.passive,r=C!==n&&(H===n||t);t&&this.element.removeEventListener(this.name,this,H),r&&this.element.addEventListener(this.name,this,C),this._$AH=C}handleEvent(C){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,C):this._$AH.handleEvent(C)}},a5=class{constructor(C,e,H){this.element=C,this.type=6,this._$AN=void 0,this._$AM=e,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(C){K1(this,C)}},Q7={M:a3,P:Z1,A:M3,C:1,L:q7,R:r5,D:N7,V:K1,I:V2,H:Y1,N:i5,U:o5,B:L5,F:a5},W4=o3.litHtmlPolyfillSupport;W4?.(y2,V2),(o3.litHtmlVersions??=[]).push("3.3.3");var r2=(V,C,e)=>{let H=e?.renderBefore??C,t=H._$litPart$;if(t===void 0){let r=e?.renderBefore??null;H._$litPart$=t=new V2(C.insertBefore(g2(),r),r,void 0,e??{})}return t._$AI(V),t};var d3=globalThis,m=class extends f1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let C=super.createRenderRoot();return this.renderOptions.renderBefore??=C.firstChild,C}update(C){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(C),this._$Do=r2(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};m._$litElement$=!0,m.finalized=!0,d3.litElementHydrateSupport?.({LitElement:m});var U4=d3.litElementPolyfillSupport;U4?.({LitElement:m});(d3.litElementVersions??=[]).push("4.2.2");function L(V,C,e,H){var t=arguments.length,r=t<3?C:H===null?H=Object.getOwnPropertyDescriptor(C,e):H,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(V,C,e,H);else for(var M=V.length-1;M>=0;M--)(i=V[M])&&(r=(t<3?i(r):t>3?i(C,e,r):i(C,e))||r);return t>3&&r&&Object.defineProperty(C,e,r),r}var c=V=>(C,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(V,C)}):customElements.define(V,C)};var G4={attribute:!0,type:String,converter:Z2,reflect:!1,hasChanged:t5},q4=(V=G4,C,e)=>{let{kind:H,metadata:t}=e,r=globalThis.litPropertyMetadata.get(t);if(r===void 0&&globalThis.litPropertyMetadata.set(t,r=new Map),H==="setter"&&((V=Object.create(V)).wrapped=!0),r.set(e.name,V),H==="accessor"){let{name:i}=e;return{set(M){let l=C.get.call(this);C.set.call(this,M),this.requestUpdate(i,l,V,!0,M)},init(M){return M!==void 0&&this.C(i,void 0,V,M),M}}}if(H==="setter"){let{name:i}=e;return function(M){let l=this[i];C.call(this,M),this.requestUpdate(i,l,V,!0,M)}}throw Error("Unsupported decorator location: "+H)};function a(V){return(C,e)=>typeof e=="object"?q4(V,C,e):((H,t,r)=>{let i=t.hasOwnProperty(r);return t.constructor.createProperty(r,H),i?Object.getOwnPropertyDescriptor(t,r):void 0})(V,C,e)}function Z(V){return a({...V,state:!0,attribute:!1})}var s1=(V,C,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof C!="object"&&Object.defineProperty(V,C,e),e);function u(V,C){return(e,H,t)=>{let r=i=>i.renderRoot?.querySelector(V)??null;if(C){let{get:i,set:M}=typeof H=="object"?e:t??(()=>{let l=Symbol();return{get(){return this[l]},set(s){this[l]=s}}})();return s1(e,H,{get(){let l=i.call(this);return l===void 0&&(l=r(this),(l!==null||this.hasUpdated)&&M.call(this,l)),l}})}return s1(e,H,{get(){return r(this)}})}}var Q4;function j7(V){return(C,e)=>s1(C,e,{get(){return(this.renderRoot??(Q4??=document.createDocumentFragment())).querySelectorAll(V)}})}function s3(V){return(C,e)=>s1(C,e,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(V)??null}})}function R(V){return(C,e)=>{let{slot:H,selector:t}=V??{},r="slot"+(H?`[name=${H}]`:":not([name])");return s1(C,e,{get(){let i=this.renderRoot?.querySelector(r),M=i?.assignedElements(V)??[];return t===void 0?M:M.filter(l=>l.matches(t))}})}}function L2(V){return(C,e)=>{let{slot:H}=V??{},t="slot"+(H?`[name=${H}]`:":not([name])");return s1(C,e,{get(){return this.renderRoot?.querySelector(t)?.assignedNodes(V)??[]}})}}var n5=class extends m{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return o`<span class="shadow"></span>`}};var p3=d`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`,e8=p3.styleSheet;var A3=class extends n5{};A3.styles=[p3];A3=L([c("md-elevation")],A3);var K7=Symbol("attachableController"),Y7;Y7=new MutationObserver(V=>{for(let C of V)C.target[K7]?.hostConnected()});var i2=class{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(C){C===null?this.host.removeAttribute("for"):this.host.setAttribute("for",C)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(C){C?this.attach(C):this.detach()}constructor(C,e){this.host=C,this.onControlChange=e,this.currentControl=null,C.addController(this),C[K7]=this,Y7?.observe(C,{attributeFilter:["for"]})}attach(C){C!==this.currentControl&&(this.setCurrentControl(C),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(C){this.onControlChange(this.currentControl,C),this.currentControl=C}};var j4=["focusin","focusout","pointerdown"],o2=class extends m{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new i2(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(C){this.attachableController.htmlFor=C}get control(){return this.attachableController.control}set control(C){this.attachableController.control=C}attach(C){this.attachableController.attach(C)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(C){if(!C[X7]){switch(C.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}C[X7]=!0}}onControlChange(C,e){if(!!1)for(let H of j4)C?.removeEventListener(H,this),e?.addEventListener(H,this)}update(C){C.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(C)}};L([a({type:Boolean,reflect:!0})],o2.prototype,"visible",void 0);L([a({type:Boolean,reflect:!0})],o2.prototype,"inward",void 0);var X7=Symbol("handledByFocusRing");var m3=d`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`,m8=m3.styleSheet;var c3=class extends o2{};c3.styles=[m3];c3=L([c("md-focus-ring")],c3);var p1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},a2=V=>(...C)=>({_$litDirective$:V,values:C}),T1=class{constructor(C){}get _$AU(){return this._$AM._$AU}_$AT(C,e,H){this._$Ct=C,this._$AM=e,this._$Ci=H}_$AS(C,e){return this.update(C,e)}update(C,e){return this.render(...e)}};var S=a2(class extends T1{constructor(V){if(super(V),V.type!==p1.ATTRIBUTE||V.name!=="class"||V.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(V){return" "+Object.keys(V).filter(C=>V[C]).join(" ")+" "}update(V,[C]){if(this.st===void 0){this.st=new Set,V.strings!==void 0&&(this.nt=new Set(V.strings.join(" ").split(/\s/).filter(H=>H!=="")));for(let H in C)C[H]&&!this.nt?.has(H)&&this.st.add(H);return this.render(C)}let e=V.element.classList;for(let H of this.st)H in C||(e.remove(H),this.st.delete(H));for(let H in C){let t=!!C[H];t===this.st.has(H)||this.nt?.has(H)||(t?(e.add(H),this.st.add(H)):(e.remove(H),this.st.delete(H)))}return Q}});var j={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",STANDARD_ACCELERATE:"cubic-bezier(.3,0,1,1)",STANDARD_DECELERATE:"cubic-bezier(0,0,0,1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)",EMPHASIZED_DECELERATE:"cubic-bezier(.05,.7,.1,1)"};function J7(){let V=null;return{start(){return V?.abort(),V=new AbortController,V.signal},finish(){V=null}}}var K4=450,C4=225,Y4=.2,X4=10,J4=75,C9=.35,e9="::after",H9="forwards",X;(function(V){V[V.INACTIVE=0]="INACTIVE",V[V.TOUCH_DELAY=1]="TOUCH_DELAY",V[V.HOLDING=2]="HOLDING",V[V.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(X||(X={}));var t9=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],V9=150,r9=window.matchMedia("(forced-colors: active)"),E1=class extends m{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=X.INACTIVE,this.attachableController=new i2(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(C){this.attachableController.htmlFor=C}get control(){return this.attachableController.control}set control(C){this.attachableController.control=C}attach(C){this.attachableController.attach(C)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){let C={hovered:this.hovered,pressed:this.pressed};return o`<div class="surface ${S(C)}"></div>`}update(C){C.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(C)}handlePointerenter(C){this.shouldReactToEvent(C)&&(this.hovered=!0)}handlePointerleave(C){this.shouldReactToEvent(C)&&(this.hovered=!1,this.state!==X.INACTIVE&&this.endPressAnimation())}handlePointerup(C){if(this.shouldReactToEvent(C)){if(this.state===X.HOLDING){this.state=X.WAITING_FOR_CLICK;return}if(this.state===X.TOUCH_DELAY){this.state=X.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(C){if(this.shouldReactToEvent(C)){if(this.rippleStartEvent=C,!this.isTouch(C)){this.state=X.WAITING_FOR_CLICK,this.startPressAnimation(C);return}this.state=X.TOUCH_DELAY,await new Promise(e=>{setTimeout(e,V9)}),this.state===X.TOUCH_DELAY&&(this.state=X.HOLDING,this.startPressAnimation(C))}}handleClick(){if(!this.disabled){if(this.state===X.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===X.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(C){this.shouldReactToEvent(C)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){let{height:C,width:e}=this.getBoundingClientRect(),H=Math.max(C,e),t=Math.max(C9*H,J4),r=this.currentCSSZoom??1,i=Math.floor(H*Y4/r),l=Math.sqrt(e**2+C**2)+X4;this.initialSize=i;let s=(l+t)/i;this.rippleScale=`${s/r}`,this.rippleSize=`${i}px`}getNormalizedPointerEventCoords(C){let{scrollX:e,scrollY:H}=window,{left:t,top:r}=this.getBoundingClientRect(),i=e+t,M=H+r,{pageX:l,pageY:s}=C,p=this.currentCSSZoom??1;return{x:(l-i)/p,y:(s-M)/p}}getTranslationCoordinates(C){let{height:e,width:H}=this.getBoundingClientRect(),t=this.currentCSSZoom??1,r={x:(H/t-this.initialSize)/2,y:(e/t-this.initialSize)/2},i;return C instanceof PointerEvent?i=this.getNormalizedPointerEventCoords(C):i={x:H/t/2,y:e/t/2},i={x:i.x-this.initialSize/2,y:i.y-this.initialSize/2},{startPoint:i,endPoint:r}}startPressAnimation(C){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();let{startPoint:e,endPoint:H}=this.getTranslationCoordinates(C),t=`${e.x}px, ${e.y}px`,r=`${H.x}px, ${H.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${t}) scale(1)`,`translate(${r}) scale(${this.rippleScale})`]},{pseudoElement:e9,duration:K4,easing:j.STANDARD,fill:H9})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=X.INACTIVE;let C=this.growAnimation,e=1/0;if(typeof C?.currentTime=="number"?e=C.currentTime:C?.currentTime&&(e=C.currentTime.to("ms").value),e>=C4){this.pressed=!1;return}await new Promise(H=>{setTimeout(H,C4-e)}),this.growAnimation===C&&(this.pressed=!1)}shouldReactToEvent(C){if(this.disabled||!C.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==C.pointerId)return!1;if(C.type==="pointerenter"||C.type==="pointerleave")return!this.isTouch(C);let e=C.buttons===1;return this.isTouch(C)||e}isTouch({pointerType:C}){return C==="touch"}async handleEvent(C){if(!r9?.matches)switch(C.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(C);break;case"pointerdown":await this.handlePointerdown(C);break;case"pointerenter":this.handlePointerenter(C);break;case"pointerleave":this.handlePointerleave(C);break;case"pointerup":this.handlePointerup(C);break;default:break}}onControlChange(C,e){if(!!1)for(let H of t9)C?.removeEventListener(H,this),e?.addEventListener(H,this)}};L([a({type:Boolean,reflect:!0})],E1.prototype,"disabled",void 0);L([Z()],E1.prototype,"hovered",void 0);L([Z()],E1.prototype,"pressed",void 0);L([u(".surface")],E1.prototype,"mdRoot",void 0);var v3=d`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`,I8=v3.styleSheet;var u3=class extends E1{};u3.styles=[v3];u3=L([c("md-ripple")],u3);var x3=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],L9=x3.map(h3);function l5(V){return L9.includes(V)}function h3(V){return V.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}var d5=Symbol("privateIgnoreAttributeChangesFor");function P(V){var C;if(!1)return V;class e extends V{constructor(){super(...arguments),this[C]=new Set}attributeChangedCallback(t,r,i){if(!l5(t)){super.attributeChangedCallback(t,r,i);return}if(this[d5].has(t))return;this[d5].add(t),this.removeAttribute(t),this[d5].delete(t);let M=Z3(t);i===null?delete this.dataset[M]:this.dataset[M]=i,this.requestUpdate(Z3(t),r)}getAttribute(t){return l5(t)?super.getAttribute(f3(t)):super.getAttribute(t)}removeAttribute(t){super.removeAttribute(t),l5(t)&&(super.removeAttribute(f3(t)),this.requestUpdate())}}return C=d5,i9(e),e}function i9(V){for(let C of x3){let e=h3(C),H=f3(e),t=Z3(e);V.createProperty(C,{attribute:e,noAccessor:!0}),V.createProperty(Symbol(H),{attribute:H,noAccessor:!0}),Object.defineProperty(V.prototype,C,{configurable:!0,enumerable:!0,get(){return this.dataset[t]??null},set(r){let i=this.dataset[t]??null;r!==i&&(r===null?delete this.dataset[t]:this.dataset[t]=r,this.requestUpdate(C,i))}})}}function f3(V){return`data-${V}`}function Z3(V){return V.replace(/-\w/,C=>C[1].toUpperCase())}function M2(V){let C=new MouseEvent("click",{bubbles:!0});return V.dispatchEvent(C),C}function n2(V){return V.currentTarget!==V.target||V.composedPath()[0]!==V.target||V.target.disabled?!1:!o9(V)}function o9(V){let C=S3;return C&&(V.preventDefault(),V.stopImmediatePropagation()),a9(),C}var S3=!1;async function a9(){S3=!0,await null,S3=!1}var K=Symbol("internals"),g3=Symbol("privateInternals");function a1(V){class C extends V{get[K](){return this[g3]||(this[g3]=this.attachInternals()),this[g3]}}return C}var A1=Symbol("getFormValue"),s5=Symbol("getFormState");function M1(V){class C extends V{get form(){return this[K].form}get labels(){return this[K].labels}get name(){return this.getAttribute("name")??""}set name(H){this.setAttribute("name",H)}get disabled(){return this.hasAttribute("disabled")}set disabled(H){this.toggleAttribute("disabled",!!H)}attributeChangedCallback(H,t,r){if(H==="name"||H==="disabled"){let i=H==="disabled"?t!==null:t;this.requestUpdate(H,i);return}super.attributeChangedCallback(H,t,r)}requestUpdate(H,t,r){super.requestUpdate(H,t,r),this[K].setFormValue(this[A1](),this[s5]())}[A1](){return this.getAttribute("value")}[s5](){return this[A1]()}formDisabledCallback(H){this.disabled=H}}return C.formAssociated=!0,L([a({noAccessor:!0})],C.prototype,"name",null),L([a({type:Boolean,noAccessor:!0})],C.prototype,"disabled",null),C}var H4=Symbol("dispatchHooks");function l2(V,C){let e=V[H4];if(!e)throw new Error(`'${V.type}' event needs setupDispatchHooks().`);e.addEventListener("after",C,{once:!0})}var e4=new WeakMap;function d2(V,...C){let e=e4.get(V);e||(e=new Set,e4.set(V,e));for(let H of C)e.has(H)||(V.addEventListener(H,t=>{let r=new EventTarget;t[H4]=r;let i=new AbortController,M=()=>{i.abort(),r.dispatchEvent(new Event("after"))},l=A=>function(){A.call(this),M()};t.stopPropagation=l(t.stopPropagation),t.stopImmediatePropagation=l(t.stopImmediatePropagation);let s=t.composedPath(),p;t.composed&&t.bubbles?p=s[s.length-1]:t.bubbles?p=s[0].getRootNode():p=s[0],p.addEventListener(H,()=>{M()},{once:!0,signal:i.signal})},{capture:!0}),e.add(H))}function p5(V){class C extends V{get name(){return this.getAttribute("name")??""}set name(H){this.setAttribute("name",H)}constructor(...H){super(...H),this.type="submit",this.value="",!!1&&(d2(this,"click"),this.addEventListener("click",async t=>{let r=this.type==="reset",i=this.type==="submit",M=this[K],{form:l}=M;!l||!(i||r)||l2(t,()=>{if(!t.defaultPrevented){if(r){l.reset();return}l.addEventListener("submit",s=>{Object.defineProperty(s,"submitter",{configurable:!0,enumerable:!0,get:()=>this})},{capture:!0,once:!0}),M.setFormValue(this.value),l.requestSubmit()}})}))}}return L([a()],C.prototype,"type",void 0),L([a({reflect:!0})],C.prototype,"value",void 0),C}var M9=P(p5(M1(a1(m)))),N=class extends M9{constructor(){super(),this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(){this.buttonElement?.focus()}blur(){this.buttonElement?.blur()}render(){let C=this.disabled||this.softDisabled,e=this.href?this.renderLink():this.renderButton(),H=this.href?"link":"button";return o`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${H}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${H}
        ?disabled="${C}"></md-ripple>
      ${e}
    `}renderButton(){let{ariaLabel:C,ariaHasPopup:e,ariaExpanded:H}=this;return o`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||n}
      aria-label="${C||n}"
      aria-haspopup="${e||n}"
      aria-expanded="${H||n}">
      ${this.renderContent()}
    </button>`}renderLink(){let{ariaLabel:C,ariaHasPopup:e,ariaExpanded:H}=this;return o`<a
      id="link"
      class="button"
      aria-label="${C||n}"
      aria-haspopup="${e||n}"
      aria-expanded="${H||n}"
      aria-disabled=${this.disabled||this.softDisabled||n}
      tabindex="${this.disabled&&!this.softDisabled?-1:n}"
      href=${this.href}
      download=${this.download||n}
      target=${this.target||n}
      >${this.renderContent()}
    </a>`}renderContent(){let C=o`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return o`
      <span class="touch"></span>
      ${this.trailingIcon?n:C}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?C:n}
    `}handleClick(C){if(this.softDisabled||this.disabled&&this.href){C.stopImmediatePropagation(),C.preventDefault();return}!n2(C)||!this.buttonElement||(this.focus(),M2(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}};N.shadowRootOptions={mode:"open",delegatesFocus:!0};L([a({type:Boolean,attribute:"soft-disabled",reflect:!0})],N.prototype,"softDisabled",void 0);L([a()],N.prototype,"href",void 0);L([a()],N.prototype,"download",void 0);L([a()],N.prototype,"target",void 0);L([a({type:Boolean,attribute:"trailing-icon",reflect:!0})],N.prototype,"trailingIcon",void 0);L([a({type:Boolean,attribute:"has-icon",reflect:!0})],N.prototype,"hasIcon",void 0);L([u(".button")],N.prototype,"buttonElement",void 0);L([R({slot:"icon",flatten:!0})],N.prototype,"assignedIcons",void 0);var A5=class extends N{renderElevationOrOutline(){return o`<md-elevation part="elevation"></md-elevation>`}};var b3=d`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`,yC=b3.styleSheet;var O2=d`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`,wC=O2.styleSheet;var S1=d`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:max(48px,100%);left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`,EC=S1.styleSheet;var y3=class extends A5{};y3.styles=[S1,O2,b3];y3=L([c("md-filled-button")],y3);var m5=class extends N{};var O3=d`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`,qC=O3.styleSheet;var _3=class extends m5{};_3.styles=[S1,O3];_3=L([c("md-text-button")],_3);var X1=class extends m{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}};L([a({type:Boolean,reflect:!0})],X1.prototype,"inset",void 0);L([a({type:Boolean,reflect:!0,attribute:"inset-start"})],X1.prototype,"insetStart",void 0);L([a({type:Boolean,reflect:!0,attribute:"inset-end"})],X1.prototype,"insetEnd",void 0);var w3=d`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`,ie=w3.styleSheet;var k3=class extends X1{};k3.styles=[w3];k3=L([c("md-divider")],k3);function r1(V,C){C.bubbles&&(!V.shadowRoot||C.composed)&&C.stopPropagation();let e=Reflect.construct(C.constructor,[C.type,C]),H=V.dispatchEvent(e);return H||C.preventDefault(),H}var t4={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:j.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:j.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},V4={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:j.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:j.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};var n9=P(m),B=class extends n9{get open(){return this.isOpen}set open(C){C!==this.isOpen&&(this.isOpen=C,C?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>t4,this.getCloseAnimation=()=>V4,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;let C=this.dialog;if(C.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}C.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),this.querySelector("[autofocus]")?.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(C=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;let e=this.dialog;if(!e.open||this.isOpening){this.open=!1;return}let H=this.returnValue;if(this.returnValue=C,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=H;return}await this.animateDialog(this.getCloseAnimation()),e.close(C),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){let C=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),e={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:C,"show-top-divider":C&&!this.isAtScrollTop,"show-bottom-divider":C&&!this.isAtScrollBottom},H=this.open&&!this.noFocusTrap,t=o`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:r}=this;return o`
      <div class="scrim"></div>
      <dialog
        class=${S(e)}
        aria-label=${r||n}
        aria-labelledby=${this.hasHeadline?"headline":n}
        role=${this.type==="alert"?"alertdialog":n}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||n}>
        ${H?t:n}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||n}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${H?t:n}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(C=>{for(let e of C)this.handleAnchorIntersection(e)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(C){let e=C.target,{submitter:H}=C;e.getAttribute("method")!=="dialog"||!H||this.close(H.getAttribute("value")??this.returnValue)}handleCancel(C){if(C.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;let e=!r1(this,C);C.preventDefault(),!e&&this.close()}handleClose(){this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,this.dialog?.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(C){C.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(C){if(this.cancelAnimations?.abort(),this.cancelAnimations=new AbortController,this.quick)return;let{dialog:e,scrim:H,container:t,headline:r,content:i,actions:M}=this;if(!e||!H||!t||!r||!i||!M)return;let{container:l,dialog:s,scrim:p,headline:A,content:v,actions:f}=C,w=[[e,s??[]],[H,p??[]],[t,l??[]],[r,A??[]],[i,v??[]],[M,f??[]]],b=[];for(let[k,I]of w)for(let O of I){let W=k.animate(...O);this.cancelAnimations.signal.addEventListener("abort",()=>{W.cancel()}),b.push(W)}await Promise.all(b.map(k=>k.finished.catch(()=>{})))}handleHeadlineChange(C){let e=C.target;this.hasHeadline=e.assignedElements().length>0}handleActionsChange(C){let e=C.target;this.hasActions=e.assignedElements().length>0}handleIconChange(C){let e=C.target;this.hasIcon=e.assignedElements().length>0}handleAnchorIntersection(C){let{target:e,isIntersecting:H}=C;e===this.topAnchor&&(this.isAtScrollTop=H),e===this.bottomAnchor&&(this.isAtScrollBottom=H)}getIsConnectedPromise(){return new Promise(C=>{this.isConnectedPromiseResolve=C})}handleFocusTrapFocus(C){let[e,H]=this.getFirstAndLastFocusableChildren();if(!e||!H){this.dialog?.focus();return}let t=C.target===this.firstFocusTrap,r=!t,i=C.relatedTarget===e,M=C.relatedTarget===H,l=!i&&!M;if(r&&M||t&&l){e.focus();return}if(t&&i||r&&l){H.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let C=null,e=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){let H=this.treewalker.currentNode;l9(H)&&(C||(C=H),e=H)}return[C,e]}};L([a({type:Boolean})],B.prototype,"open",null);L([a({type:Boolean})],B.prototype,"quick",void 0);L([a({attribute:!1})],B.prototype,"returnValue",void 0);L([a()],B.prototype,"type",void 0);L([a({type:Boolean,attribute:"no-focus-trap"})],B.prototype,"noFocusTrap",void 0);L([u("dialog")],B.prototype,"dialog",void 0);L([u(".scrim")],B.prototype,"scrim",void 0);L([u(".container")],B.prototype,"container",void 0);L([u(".headline")],B.prototype,"headline",void 0);L([u(".content")],B.prototype,"content",void 0);L([u(".actions")],B.prototype,"actions",void 0);L([Z()],B.prototype,"isAtScrollTop",void 0);L([Z()],B.prototype,"isAtScrollBottom",void 0);L([u(".scroller")],B.prototype,"scroller",void 0);L([u(".top.anchor")],B.prototype,"topAnchor",void 0);L([u(".bottom.anchor")],B.prototype,"bottomAnchor",void 0);L([u(".focus-trap")],B.prototype,"firstFocusTrap",void 0);L([Z()],B.prototype,"hasHeadline",void 0);L([Z()],B.prototype,"hasActions",void 0);L([Z()],B.prototype,"hasIcon",void 0);function l9(V){let C=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",e=":not(:disabled,[disabled])";return V.matches(C+e+':not([tabindex^="-"])')?!0:!V.localName.includes("-")||!V.matches(e)?!1:V.shadowRoot?.delegatesFocus??!1}var T3=d`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`,ye=T3.styleSheet;var E3=class extends B{};E3.styles=[T3];E3=L([c("md-dialog")],E3);var L4=Symbol.for(""),d9=V=>{if(V?.r===L4)return V?._$litStatic$};var L1=(V,...C)=>({_$litStatic$:C.reduce((e,H,t)=>e+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(H)+V[t+1],V[0]),r:L4}),r4=new Map,P3=V=>(C,...e)=>{let H=e.length,t,r,i=[],M=[],l,s=0,p=!1;for(;s<H;){for(l=C[s];s<H&&(r=e[s],(t=d9(r))!==void 0);)l+=t+C[++s],p=!0;s!==H&&M.push(r),i.push(l),s++}if(s===H&&i.push(C[H]),p){let A=i.join("$$lit$$");(C=r4.get(A))===void 0&&(i.raw=i,r4.set(A,C=i)),e=M}return V(C,...e)},P1=P3(o),Re=P3(M5),$e=P3(U7);function B3(V,C=!0){return C&&getComputedStyle(V).getPropertyValue("direction").trim()==="rtl"}var s9=P(p5(M1(a1(m)))),H1=class extends s9{constructor(){super(),this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.flipIcon=B3(this,this.flipIconInRtl),!!1&&(d2(this,"click"),this.addEventListener("click",C=>{if(this.softDisabled||this.disabled&&this.href){C.stopImmediatePropagation(),C.preventDefault();return}let e=this.selected;l2(C,()=>{!this.toggle||this.disabled||C.defaultPrevented||(this.selected=!e,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))})}))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){let C=this.href?L1`div`:L1`button`,{ariaLabel:e,ariaHasPopup:H,ariaExpanded:t}=this,r=e&&this.ariaLabelSelected,i=this.toggle?this.selected:n,M=n;return this.href||(M=r&&this.selected?this.ariaLabelSelected:e),P1`<${C}
        class="icon-button ${S(this.getRenderClasses())}"
        id="button"
        aria-label="${M||n}"
        aria-haspopup="${!this.href&&H||n}"
        aria-expanded="${!this.href&&t||n}"
        aria-pressed="${i}"
        aria-disabled=${!this.href&&this.softDisabled||n}
        ?disabled="${!this.href&&this.disabled}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?n:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():n}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${C}>`}renderLink(){let{ariaLabel:C}=this;return o`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||n}"
        target="${this.target||n}"
        aria-label="${C||n}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return o`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return o`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return o`<span class="touch"></span>`}renderFocusRing(){return o`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){let C=!this.href&&(this.disabled||this.softDisabled);return o`<md-ripple
      for=${this.href?"link":n}
      ?disabled="${C}"></md-ripple>`}connectedCallback(){this.flipIcon=B3(this,this.flipIconInRtl),super.connectedCallback()}};H1.shadowRootOptions={mode:"open",delegatesFocus:!0};L([a({type:Boolean,attribute:"soft-disabled",reflect:!0})],H1.prototype,"softDisabled",void 0);L([a({type:Boolean,attribute:"flip-icon-in-rtl"})],H1.prototype,"flipIconInRtl",void 0);L([a()],H1.prototype,"href",void 0);L([a()],H1.prototype,"download",void 0);L([a()],H1.prototype,"target",void 0);L([a({attribute:"aria-label-selected"})],H1.prototype,"ariaLabelSelected",void 0);L([a({type:Boolean})],H1.prototype,"toggle",void 0);L([a({type:Boolean,reflect:!0})],H1.prototype,"selected",void 0);L([Z()],H1.prototype,"flipIcon",void 0);var R3=d`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`,VH=R3.styleSheet;var $3=d`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`,iH=$3.styleSheet;var F3=class extends H1{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};F3.styles=[R3,$3];F3=L([c("md-icon-button")],F3);var i4="important",p9=" !"+i4,n1=a2(class extends T1{constructor(V){if(super(V),V.type!==p1.ATTRIBUTE||V.name!=="style"||V.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(V){return Object.keys(V).reduce((C,e)=>{let H=V[e];return H==null?C:C+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${H};`},"")}update(V,[C]){let{style:e}=V.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(C)),this.render(C);for(let H of this.ft)C[H]==null&&(this.ft.delete(H),H.includes("-")?e.removeProperty(H):e[H]=null);for(let H in C){let t=C[H];if(t!=null){this.ft.add(H);let r=typeof t=="string"&&t.endsWith(p9);H.includes("-")||r?e.setProperty(H,r?t.slice(0,-11):t,r?i4:""):e[H]=t}}return Q}});var A9=P(m),B1=class extends A9{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){let{ariaLabel:C}=this;return o`
      <div
        class="progress ${S(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${C||n}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?n:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}};L([a({type:Number})],B1.prototype,"value",void 0);L([a({type:Number})],B1.prototype,"max",void 0);L([a({type:Boolean})],B1.prototype,"indeterminate",void 0);L([a({type:Boolean,attribute:"four-color"})],B1.prototype,"fourColor",void 0);var _2=class extends B1{constructor(){super(...arguments),this.buffer=0}renderIndicator(){let C={transform:`scaleX(${(this.indeterminate?1:this.value/this.max)*100}%)`},e=this.buffer??0,H=e>0,r={transform:`scaleX(${(this.indeterminate||!H?1:e/this.max)*100}%)`},i=this.indeterminate||!H||e>=this.max||this.value>=this.max;return o`
      <div class="dots" ?hidden=${i}></div>
      <div class="inactive-track" style=${n1(r)}></div>
      <div class="bar primary-bar" style=${n1(C)}>
        <div class="bar-inner"></div>
      </div>
      <div class="bar secondary-bar">
        <div class="bar-inner"></div>
      </div>
    `}};L([a({type:Number})],_2.prototype,"buffer",void 0);var D3=d`:host{--_active-indicator-color: var(--md-linear-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-linear-progress-active-indicator-height, 4px);--_four-color-active-indicator-four-color: var(--md-linear-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-linear-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-linear-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-linear-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_track-color: var(--md-linear-progress-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_track-height: var(--md-linear-progress-track-height, 4px);--_track-shape: var(--md-linear-progress-track-shape, var(--md-sys-shape-corner-none, 0px));border-radius:var(--_track-shape);display:flex;position:relative;min-width:80px;height:var(--_track-height);content-visibility:auto;contain:strict}.progress,.dots,.inactive-track,.bar,.bar-inner{position:absolute}.progress{direction:ltr;inset:0;border-radius:inherit;overflow:hidden;display:flex;align-items:center}.bar{animation:none;width:100%;height:var(--_active-indicator-height);transform-origin:left center;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1)}.secondary-bar{display:none}.bar-inner{inset:0;animation:none;background:var(--_active-indicator-color)}.inactive-track{background:var(--_track-color);inset:0;transition:transform 250ms cubic-bezier(0.4, 0, 0.6, 1);transform-origin:left center}.dots{inset:0;animation:linear infinite 250ms;animation-name:buffering;background-color:var(--_track-color);background-repeat:repeat-x;-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");z-index:-1}.dots[hidden]{display:none}.indeterminate .bar{transition:none}.indeterminate .primary-bar{inset-inline-start:-145.167%}.indeterminate .secondary-bar{inset-inline-start:-54.8889%;display:block}.indeterminate .primary-bar{animation:linear infinite 2s;animation-name:primary-indeterminate-translate}.indeterminate .primary-bar>.bar-inner{animation:linear infinite 2s primary-indeterminate-scale}.indeterminate.four-color .primary-bar>.bar-inner{animation-name:primary-indeterminate-scale,four-color;animation-duration:2s,4s}.indeterminate .secondary-bar{animation:linear infinite 2s;animation-name:secondary-indeterminate-translate}.indeterminate .secondary-bar>.bar-inner{animation:linear infinite 2s secondary-indeterminate-scale}.indeterminate.four-color .secondary-bar>.bar-inner{animation-name:secondary-indeterminate-scale,four-color;animation-duration:2s,4s}:host(:dir(rtl)){transform:scale(-1)}@keyframes primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes buffering{0%{transform:translateX(calc(var(--_track-height) / 2 * 5))}}@keyframes primary-indeterminate-translate{0%{transform:translateX(0px)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0px)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.6714%)}100%{transform:translateX(200.611%)}}@keyframes secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0px)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.6519%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.3862%)}100%{transform:translateX(160.278%)}}@keyframes four-color{0%{background:var(--_four-color-active-indicator-one-color)}15%{background:var(--_four-color-active-indicator-one-color)}25%{background:var(--_four-color-active-indicator-two-color)}40%{background:var(--_four-color-active-indicator-two-color)}50%{background:var(--_four-color-active-indicator-three-color)}65%{background:var(--_four-color-active-indicator-three-color)}75%{background:var(--_four-color-active-indicator-four-color)}90%{background:var(--_four-color-active-indicator-four-color)}100%{background:var(--_four-color-active-indicator-one-color)}}@media(forced-colors: active){:host{outline:1px solid CanvasText}.bar-inner,.dots{background-color:CanvasText}}
`,PH=D3.styleSheet;var I3=class extends _2{};I3.styles=[D3];I3=L([c("md-linear-progress")],I3);var c5=class{constructor(C){this._getHass=C}_call(C,e={}){let H=this._getHass();return H.callWS({type:`escpos_designer/${C}`,language:H.language,...e})}status=()=>this._call("status");library=()=>this._call("library");getTemplate=C=>this._call("get_template",{template_id:C});saveTemplate=(C,e)=>this._call("save_template",{template:C,...e?{template_id:e}:{}});deleteTemplate=C=>this._call("delete_template",{template_id:C});toggleFavorite=C=>this._call("toggle_favorite",{template_id:C});preview=(C,e,H)=>this._call("preview",{document:C,variables:e,...H?{fit:H}:{}});thumbnails=C=>this._call("thumbnails",{template_ids:C});print=C=>this._call("print",C)};function J(V){return V?.message||V?.code||String(V)}var v5=class extends N{renderElevationOrOutline(){return o`<div class="outline"></div>`}};var z3=d`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`,QH=z3.styleSheet;var N3=class extends v5{};N3.styles=[S1,z3];N3=L([c("md-outlined-button")],N3);var $=d`
  :host {
    --ed-primary: var(--primary-color, #03a9f4);
    --ed-surface: var(--card-background-color, #fff);
    --ed-background: var(--primary-background-color, #fafafa);
    --ed-container: var(--secondary-background-color, #f2f2f2);
    --ed-text: var(--primary-text-color, #212121);
    --ed-text-muted: var(--secondary-text-color, #727272);
    --ed-line: var(--divider-color, #e0e0e0);
    --ed-radius: 16px;
    --ed-bottom-inset: env(safe-area-inset-bottom, 0px);

    --md-sys-color-primary: var(--ed-primary);
    --md-sys-color-on-primary: var(--text-primary-color, #fff);
    --md-sys-color-primary-container: color-mix(in srgb, var(--ed-primary) 20%, var(--ed-surface));
    --md-sys-color-on-primary-container: var(--ed-text);
    --md-sys-color-secondary: var(--ed-primary);
    --md-sys-color-secondary-container: color-mix(in srgb, var(--ed-primary) 18%, var(--ed-surface));
    --md-sys-color-on-secondary-container: var(--ed-text);
    --md-sys-color-surface: var(--ed-surface);
    --md-sys-color-surface-dim: var(--ed-container);
    --md-sys-color-surface-container: var(--ed-container);
    --md-sys-color-surface-container-low: var(--ed-container);
    --md-sys-color-surface-container-high: var(--ed-container);
    --md-sys-color-surface-container-highest: var(--ed-container);
    --md-sys-color-on-surface: var(--ed-text);
    --md-sys-color-on-surface-variant: var(--ed-text-muted);
    --md-sys-color-outline: color-mix(in srgb, var(--ed-text) 45%, transparent);
    --md-sys-color-outline-variant: var(--ed-line);
    --md-sys-color-error: var(--error-color, #db4437);
    --md-sys-color-on-error: #fff;
    --md-sys-color-scrim: #000;
    --md-sys-color-shadow: #000;
    --md-ref-typeface-brand: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    --md-ref-typeface-plain: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    color: var(--ed-text);
    font-family: var(--md-ref-typeface-plain);
  }
  /* Phones: keep clear of the system navigation bar, which some apps draw over the page. */
  @media (max-width: 720px) {
    :host {
      --ed-bottom-inset: calc(env(safe-area-inset-bottom, 0px) + 28px);
    }
  }
`,F=d`
  * {
    box-sizing: border-box;
  }
  .card {
    background: var(--ed-surface);
    border: 1px solid var(--ed-line);
    border-radius: var(--ed-radius);
  }
  .muted {
    color: var(--ed-text-muted);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .wrap {
    flex-wrap: wrap;
  }
  h2,
  h3 {
    margin: 0;
    font-weight: 500;
  }
  md-outlined-text-field,
  md-outlined-select {
    width: 100%;
    min-width: 0;
  }
  md-slider {
    min-width: 0;
  }
`;var u5={repository:"https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration",integrations:"https://github.com/seb5594/Home-Assistant-Integrations",apps:"https://github.com/seb5594/Home-Assistant-Apps",support:"https://paypal.me/seb5594"},W3=class extends m{static properties={t:{attribute:!1},version:{type:String},fab:{type:Boolean}};static styles=[$,F,d`
      :host {
        display: block;
      }
      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 24px 16px calc(32px + var(--ed-bottom-inset));
        text-align: center;
        font-size: 0.875rem;
      }
      :host([fab]) footer {
        padding-bottom: calc(96px + var(--ed-bottom-inset));
      }
      a.credit {
        color: var(--ed-text-muted);
        text-decoration: none;
      }
      a.credit:hover {
        color: var(--ed-primary);
        text-decoration: underline;
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      .version {
        color: var(--ed-text-muted);
        font-size: 0.75rem;
      }
    `];render(){let{t:C}=this;return o`<footer>
      <a class="credit" href=${u5.repository} target="_blank" rel="noopener noreferrer"
        >${C("footer.credit")}<br />${C("footer.made_with")}</a
      >
      <div class="links">
        <md-outlined-button href=${u5.integrations} target="_blank" rel="noopener noreferrer"
          >${C("footer.integrations")}</md-outlined-button
        >
        <md-outlined-button href=${u5.apps} target="_blank" rel="noopener noreferrer"
          >${C("footer.apps")}</md-outlined-button
        >
        <md-outlined-button href=${u5.support} target="_blank" rel="noopener noreferrer"
          >${C("footer.support")}</md-outlined-button
        >
      </div>
      ${this.version?o`<div class="version">${C("footer.version")} ${this.version}</div>`:""}
    </footer>`}};customElements.define("ed-footer",W3);var U3=class extends m{static properties={path:{type:String}};static styles=d`
    :host {
      display: inline-flex;
      width: var(--ed-icon-size, 24px);
      height: var(--ed-icon-size, 24px);
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;render(){return o`<svg viewBox="0 0 24 24" aria-hidden="true">${M5`<path d=${this.path}></path>`}</svg>`}};customElements.define("ed-icon",U3);var J1="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var G3="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";var q3="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var Q3="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";var j3="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";var K3="M2,6H4V18H2V6M5,6H6V18H5V6M7,6H10V18H7V6M11,6H12V18H11V6M14,6H16V18H14V6M17,6H20V18H17V6M21,6H22V18H21V6Z";var w2="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";var x5="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var k2="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";var s2="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z";var m1="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z";var Y3="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";var X3="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";var C2="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var J3="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z";var C0="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z";var e0="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z";var H0="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z";var t0="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z";var T2="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z";var E2="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z";var e2="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z";var P2="M3,14H21V12H3M5,4V7H10V10H14V7H19V4M10,19H14V16H10V19Z";var B2="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z";var R2="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z";var V0="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var r0="M10 7V9H9V15H10V17H6V15H7V9H6V7H10M16 7C17.11 7 18 7.9 18 9V15C18 16.11 17.11 17 16 17H12V7M16 9H14V15H16V9Z";var $2="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z";var F2="M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z";var D2="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M3.44 6.94C3.18 6.94 2.96 7.15 2.96 7.41V16.6C2.96 16.85 3.18 17.06 3.44 17.06H20.56C20.82 17.06 21.04 16.85 21.04 16.6V7.41C21.04 7.15 20.82 6.94 20.56 6.94H3.44M4.89 15.19V8.81H6.81L8.73 11.16L10.65 8.81H12.58V15.19H10.65V11.53L8.73 13.88L6.81 11.53V15.19H4.89M16.9 15.19L14 12.09H15.94V8.81H17.86V12.09H19.79L16.9 15.19";var L0="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";var i0="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z";var o0="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z";var a0="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";var M0="M19,13H5V11H19V13Z";var h5="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z";var u1="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var C1="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z";var p2="M16 3H4V7H16M17 12C16.4 12 16 11.6 16 11S16.4 10 17 10 18 10.4 18 11 17.6 12 17 12M14 19H6V14H14M17 8H3C1.3 8 0 9.3 0 11V17H4V21H16V17H20V11C20 9.3 18.7 8 17 8M24 13H22V7H24V13M24 17H22V15H24V17Z";var n0="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z";var l0="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z";var d0="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";var s0="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var p0="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";var S5=()=>Math.random().toString(36).slice(2,10),m2=Object.freeze({font:"sans",size:24,bold:!1,italic:!1,underline:!1,strike:!1,invert:!1}),R1=[16,20,24,32,40,56,80],o4=["%d.%m.%Y","%A, %d. %B","%d.%m.%Y %H:%M","%H:%M","%Y-%m-%d","%B %Y"],a4=[{id:"58mm",width:384,height:null},{id:"80mm",width:576,height:null},{id:"label_30x14",width:240,height:112},{id:"label_40x30",width:320,height:240}],M4={text:()=>({runs:[{text:"",...m2}],align:"left"}),markdown:()=>({source:`# Hello
**Bold**, *italic* and ~~strike~~`,font:"sans",size:24}),datetime:()=>({format:"%d.%m.%Y",prefix:"",suffix:"",offset_days:0,align:"center",...m2}),list:()=>({source:{kind:"static",items:[{text:"First"},{text:"Second"}]},style:"checkbox",font:"sans",size:24}),divider:()=>({style:"solid",thickness:2,width_pct:100}),qr:()=>({data:"https://",size_pct:60,level:"M",caption:"",align:"center"}),barcode:()=>({kind:"code128",data:"12345678",height:90,module_width:2,show_text:!0,align:"center"}),image:()=>({data:"",width_pct:100,dither:"floyd-steinberg",threshold:128,align:"center"}),sticker:()=>({emoji:"\u{1F600}",size:96,align:"center"}),spacer:()=>({height:16})},n4=Object.keys(M4);function A2(V,C={}){return{id:S5(),type:V,...M4[V](),...C}}function f5(V={}){return{name:"",paper:{width:384,height:null},frame:{style:"none",thickness:3,padding:10},options:{cut:"partial",feed:2,rotate:0,mirror:!1,invert:!1,margin:8},elements:[],...V}}var I2=[{id:"blank",icon:"text",build:()=>f5({elements:[A2("text",{align:"center"})]})},{id:"markdown",icon:"markdown",build:()=>f5({elements:[A2("markdown",{source:`<center>
# Title \u2764\uFE0F
</center>
---
- [ ] First task
- [ ] Second task
---
**Bold**, *italic*, ~~strike~~ and ==inverted==`})]})},{id:"label",icon:"datetime",build:()=>f5({paper:{width:320,height:240},frame:{style:"rounded",thickness:3,padding:8},elements:[A2("text",{align:"center",runs:[{text:"Label",...m2,size:40,font:"display"}]})]})},{id:"receipt80",icon:"list",build:()=>f5({paper:{width:576,height:null},elements:[A2("text")]})}];function l4(V){return!["divider","spacer","list"].includes(V)}function d4(V){switch(V.type){case"text":return V.runs.map(C=>C.text).join("");case"markdown":return V.source.split(`
`).find(C=>C.trim())??"";case"datetime":return`${V.prefix||""}${V.format}`;case"list":return V.source.kind==="todo"?V.source.entity_id:V.source.items.map(C=>C.text).join(", ");case"qr":case"barcode":return V.data;case"sticker":return V.emoji;default:return""}}function s4(V,C,e){if(e<0||e>=V.length||C===e)return V;let H=[...V];return H.splice(e,0,H.splice(C,1)[0]),H}var A0=(V,C)=>{let e=`${V.value} ${V.label}`.toLowerCase();return C.some(H=>e.includes(H.toLowerCase()))};function g5(V,C,e=[]){return Object.entries(V?.states??{}).filter(([H])=>H.startsWith(`${C}.`)).map(([H,t])=>({value:H,label:t.attributes.friendly_name??H})).sort((H,t)=>A0(t,e)-A0(H,e)||H.label.localeCompare(t.label))}function b5(V=[],C){return Object.fromEntries(V.map(({key:e,type:H,domain:t,hints:r=[],default:i})=>{let M=H==="todo"?"todo":H==="entity"?t:"";if(M&&!C?.states?.[i]){let l=g5(C,M,r),s=l.find(p=>A0(p,r))??(H==="entity"?l[0]:void 0);return[e,s?.value??i??""]}return[e,i??""]}))}var Z5=class{constructor(C=60){this._limit=C,this._past=[],this._future=[]}get canUndo(){return this._past.length>0}get canRedo(){return this._future.length>0}record(C){this._past.push(structuredClone(C)),this._past.length>this._limit&&this._past.shift(),this._future=[]}undo(C){return this.canUndo?(this._future.push(structuredClone(C)),this._past.pop()):null}redo(C){return this.canRedo?(this._past.push(structuredClone(C)),this._future.pop()):null}clear(){this._past=[],this._future=[]}};function y5(V,C){let e,H=(...t)=>{clearTimeout(e),e=setTimeout(()=>V(...t),C)};return H.cancel=()=>clearTimeout(e),H}async function p4(V,C=576){let e=await createImageBitmap(V),H=Math.min(1,C/e.width),t=document.createElement("canvas");t.width=Math.max(1,Math.round(e.width*H)),t.height=Math.max(1,Math.round(e.height*H));let r=t.getContext("2d");return r.fillStyle="#fff",r.fillRect(0,0,t.width,t.height),r.drawImage(e,0,0,t.width,t.height),t.toDataURL("image/png")}function A4(V,C){let e=C?.width;if(!e)return{fit:null,adapted:!1};let{paper:H,options:t={}}=V,r=(t.rotate??0)%180!==0,i=r?H.height:H.width,M=r?H.width:H.height,l=C.label_height;if(l){let s=[i,M].join()===[e,l].join();return{fit:{width:e,height:l},adapted:!s}}return{fit:{width:e,height:null},adapted:!!i&&i>e}}var m9=.5;function c9(V,C){let e=C?.width;if(!e||!V)return 1;let H=C.label_height;if(H){if(!V.height)return 0;let t=Math.min(e/V.width,H/V.height),r=Math.min(e/V.height,H/V.width);return Math.min(1,Math.max(t,r))}return Math.min(1,e/V.width)}var m4=(V,C)=>c9(V,C)>=m9;function c4(V){return V?.width?V.label_height?{width:V.label_height,height:V.width}:{width:V.width,height:null}:null}var v9=P(m),t1=class extends v9{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(C){this.disabled&&!this.alwaysFocusable||super.focus(C)}render(){return o`
      <div class="container ${S(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(C){C.has("disabled")&&C.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return o`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return o`<span class="outline"></span>`}renderLeadingIcon(){return o`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return o`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:o`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(C){let e=C.target;this.hasIcon=e.assignedElements({flatten:!0}).length>0}handleClick(C){if(this.softDisabled||this.disabled&&this.alwaysFocusable){C.stopImmediatePropagation(),C.preventDefault();return}}};t1.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Boolean,reflect:!0})],t1.prototype,"disabled",void 0);L([a({type:Boolean,attribute:"soft-disabled",reflect:!0})],t1.prototype,"softDisabled",void 0);L([a({type:Boolean,attribute:"always-focusable"})],t1.prototype,"alwaysFocusable",void 0);L([a()],t1.prototype,"label",void 0);L([a({type:Boolean,reflect:!0,attribute:"has-icon"})],t1.prototype,"hasIcon",void 0);var z2=class extends m{get chips(){return this.childElements.filter(C=>C instanceof t1)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return o`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(C){let e=C.key==="ArrowLeft",H=C.key==="ArrowRight",t=C.key==="Home",r=C.key==="End";if(!e&&!H&&!t&&!r)return;let{chips:i}=this;if(i.length<2)return;if(C.preventDefault(),t||r){let v=t?0:i.length-1;i[v].focus({trailing:r}),this.updateTabIndices();return}let l=getComputedStyle(this).direction==="rtl"?e:H,s=i.find(v=>v.matches(":focus-within"));if(!s){(l?i[0]:i[i.length-1]).focus({trailing:!l}),this.updateTabIndices();return}let p=i.indexOf(s),A=l?p+1:p-1;for(;A!==p;){A>=i.length?A=0:A<0&&(A=i.length-1);let v=i[A];if(v.disabled&&!v.alwaysFocusable){l?A++:A--;continue}v.focus({trailing:!l}),this.updateTabIndices();break}}updateTabIndices(){let{chips:C}=this,e;for(let H of C){let t=H.alwaysFocusable||!H.disabled;if(H.matches(":focus-within")&&t){e=H;continue}t&&!e&&(e=H),H.tabIndex=-1}e&&(e.tabIndex=0)}};L([R()],z2.prototype,"childElements",void 0);var m0=d`:host{display:flex;flex-wrap:wrap;gap:8px}
`,Tt=m0.styleSheet;var c0=class extends z2{};c0.styles=[m0];c0=L([c("md-chip-set")],c0);var N2=d`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`,zt=N2.styleSheet;var O5="aria-label-remove",_5=class extends t1{get ariaLabelRemove(){if(this.hasAttribute(O5))return this.getAttribute(O5);let{ariaLabel:C}=this;return C||this.label?`Remove ${C||this.label}`:null}set ariaLabelRemove(C){let e=this.ariaLabelRemove;C!==e&&(C===null?this.removeAttribute(O5):this.setAttribute(O5,C),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(C){if((this.alwaysFocusable||!this.disabled)&&C?.trailing&&this.trailingAction){this.trailingAction.focus(C);return}super.focus(C)}renderContainerContent(){return o`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(C){let e=C.key==="ArrowLeft",H=C.key==="ArrowRight";if(!e&&!H||!this.primaryAction||!this.trailingAction)return;let r=getComputedStyle(this).direction==="rtl"?e:H,i=this.primaryAction?.matches(":focus-within"),M=this.trailingAction?.matches(":focus-within");if(r&&M||!r&&i)return;C.preventDefault(),C.stopPropagation(),(r?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){let{primaryAction:C,trailingAction:e}=this;!C||!e||(C.tabIndex=-1,e.addEventListener("focusout",()=>{C.tabIndex=0},{once:!0}))}};function v4({ariaLabel:V,disabled:C,focusListener:e,tabbable:H=!1}){return o`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${V||n}
      aria-labelledby=${V?n:"remove-label label"}
      tabindex=${H?n:-1}
      @click=${u9}
      @focus=${e}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${C}></md-ripple>
      <span class="trailing icon" aria-hidden="true">
        <slot name="remove-trailing-icon">
          <svg viewBox="0 96 960 960">
            <path
              d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </slot>
      </span>
      <span class="touch"></span>
    </button>
  `}function u9(V){this.disabled||this.softDisabled||(V.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}var x1=class extends _5{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(C){let{ariaLabel:e}=this;return o`
      <button
        class="primary action"
        id="button"
        aria-label=${e||n}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||n}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${C}</button
      >
    `}renderLeadingIcon(){return this.selected?o`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(C){return this.removable?v4({focusListener:C,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):n}renderOutline(){return this.elevated?o`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(C){if(this.disabled||this.softDisabled)return;let e=this.selected;if(this.selected=!this.selected,!r1(this,C)){this.selected=e;return}}};L([a({type:Boolean})],x1.prototype,"elevated",void 0);L([a({type:Boolean})],x1.prototype,"removable",void 0);L([a({type:Boolean,reflect:!0})],x1.prototype,"selected",void 0);L([a({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],x1.prototype,"hasSelectedIcon",void 0);L([u(".primary.action")],x1.prototype,"primaryAction",void 0);L([u(".trailing.action")],x1.prototype,"trailingAction",void 0);var v0=d`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`,LV=v0.styleSheet;var u0=d`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`,aV=u0.styleSheet;var W2=d`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`,lV=W2.styleSheet;var x0=d`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`,pV=x0.styleSheet;var h0=class extends x1{};h0.styles=[W2,N2,x0,u0,v0];h0=L([c("md-filter-chip")],h0);var T=class extends m{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){let C=this.count??-1,e=this.max??-1;return C<0||e<=0?"":`${C} / ${e}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(C){C.has("disabled")&&C.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(C.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:C.get("focused"),wasPopulated:C.get("populated")}),super.update(C)}render(){let C=this.renderLabel(!0),e=this.renderLabel(!1),H=this.renderOutline?.(C),t={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return o`
      <div class="field ${S(t)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${H}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${e} ${H?n:C}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `}updated(C){(C.has("supportingText")||C.has("errorText")||C.has("count")||C.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){let{supportingOrErrorText:C,counterText:e}=this;if(!C&&!e)return n;let H=o`<span>${C}</span>`,t=e?o`<span class="counter">${e}</span>`:n,i=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":n;return o`
      <div class="supporting-text" role=${i}>${H}${t}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(let C of this.slottedAriaDescribedBy)r2(o`${this.supportingOrErrorText} ${this.counterText}`,C),C.setAttribute("hidden","")}renderLabel(C){if(!this.label)return n;let e;C?e=this.focused||this.populated||this.isAnimating:e=!this.focused&&!this.populated&&!this.isAnimating;let H={hidden:!e,floating:C,resting:!C},t=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return o`
      <span class="label ${S(H)}" aria-hidden=${!e}
        >${t}</span
      >
    `}animateLabelIfNeeded({wasFocused:C,wasPopulated:e}){if(!this.label)return;C??=this.focused,e??=this.populated;let H=C||e,t=this.focused||this.populated;if(H===t)return;let r=this.getLabelKeyframes();r.length&&(this.isAnimating=!0,this.labelAnimation?.cancel(),this.labelAnimation=this.floatingLabelEl?.animate(r,{duration:150,easing:j.STANDARD}),this.labelAnimation?.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){let{floatingLabelEl:C,restingLabelEl:e}=this;if(!C||!e)return[];let{x:H,y:t,height:r}=C.getBoundingClientRect(),{x:i,y:M,height:l}=e.getBoundingClientRect(),s=C.scrollWidth,p=e.scrollWidth;if(s===0||p===0)return[];let A=p/s,v=i-H,f=M-t+Math.round((l-r*A)/2),w=`translateX(${v}px) translateY(${f}px) scale(${A})`,b="translateX(0) translateY(0) scale(1)",k=e.clientWidth,O=p>k?`${k/A}px`:"";return this.focused||this.populated?[{transform:w,width:O},{transform:b,width:O}]:[{transform:b,width:O},{transform:w,width:O}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}};L([a({type:Boolean})],T.prototype,"disabled",void 0);L([a({type:Boolean})],T.prototype,"error",void 0);L([a({type:Boolean})],T.prototype,"focused",void 0);L([a()],T.prototype,"label",void 0);L([a({type:Boolean,attribute:"no-asterisk"})],T.prototype,"noAsterisk",void 0);L([a({type:Boolean})],T.prototype,"populated",void 0);L([a({type:Boolean})],T.prototype,"required",void 0);L([a({type:Boolean})],T.prototype,"resizable",void 0);L([a({attribute:"supporting-text"})],T.prototype,"supportingText",void 0);L([a({attribute:"error-text"})],T.prototype,"errorText",void 0);L([a({type:Number})],T.prototype,"count",void 0);L([a({type:Number})],T.prototype,"max",void 0);L([a({type:Boolean,attribute:"has-start"})],T.prototype,"hasStart",void 0);L([a({type:Boolean,attribute:"has-end"})],T.prototype,"hasEnd",void 0);L([R({slot:"aria-describedby"})],T.prototype,"slottedAriaDescribedBy",void 0);L([Z()],T.prototype,"isAnimating",void 0);L([Z()],T.prototype,"refreshErrorAlert",void 0);L([Z()],T.prototype,"disableTransitions",void 0);L([u(".label.floating")],T.prototype,"floatingLabelEl",void 0);L([u(".label.resting")],T.prototype,"restingLabelEl",void 0);L([u(".container")],T.prototype,"containerEl",void 0);var w5=class extends T{renderOutline(C){return o`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${C}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `}};var f0=d`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`,RV=f0.styleSheet;var Z0=d`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`,DV=Z0.styleSheet;var S0=class extends w5{};S0.styles=[Z0,f0];S0=L([c("md-outlined-field")],S0);function g0(V,C=b1){let e=U2(V,C);return e&&(e.tabIndex=0,e.focus()),e}function b0(V,C=b1){let e=y0(V,C);return e&&(e.tabIndex=0,e.focus()),e}function $1(V,C=b1){for(let e=0;e<V.length;e++){let H=V[e];if(H.tabIndex===0&&C(H))return{item:H,index:e}}return null}function U2(V,C=b1){for(let e of V)if(C(e))return e;return null}function y0(V,C=b1){for(let e=V.length-1;e>=0;e--){let H=V[e];if(C(H))return H}return null}function x9(V,C,e=b1,H=!0){for(let t=1;t<V.length;t++){let r=(t+C)%V.length;if(r<C&&!H)return null;let i=V[r];if(e(i))return i}return V[C]?V[C]:null}function h9(V,C,e=b1,H=!0){for(let t=1;t<V.length;t++){let r=(C-t+V.length)%V.length;if(r>C&&!H)return null;let i=V[r];if(e(i))return i}return V[C]?V[C]:null}function O0(V,C,e=b1,H=!0){if(C){let t=x9(V,C.index,e,H);return t&&(t.tabIndex=0,t.focus()),t}else return g0(V,e)}function _0(V,C,e=b1,H=!0){if(C){let t=h9(V,C.index,e,H);return t&&(t.tabIndex=0,t.focus()),t}else return b0(V,e)}function b1(V){return!V.disabled}var G={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"},k5=class{constructor(C){this.handleKeydown=p=>{let A=p.key;if(p.defaultPrevented||!this.isNavigableKey(A))return;let v=this.items;if(!v.length)return;let f=$1(v,this.isActivatable);p.preventDefault();let w=this.isRtl(),b=w?G.ArrowRight:G.ArrowLeft,k=w?G.ArrowLeft:G.ArrowRight,I=null;switch(A){case G.ArrowDown:case k:I=O0(v,f,this.isActivatable,this.wrapNavigation());break;case G.ArrowUp:case b:I=_0(v,f,this.isActivatable,this.wrapNavigation());break;case G.Home:I=g0(v,this.isActivatable);break;case G.End:I=b0(v,this.isActivatable);break;default:break}I&&f&&f.item!==I&&(f.item.tabIndex=-1)},this.onDeactivateItems=()=>{let p=this.items;for(let A of p)this.deactivateItem(A)},this.onRequestActivation=p=>{this.onDeactivateItems();let A=p.target;this.activateItem(A),A.focus()},this.onSlotchange=()=>{let p=this.items,A=!1;for(let f of p){if(!f.disabled&&f.tabIndex>-1&&!A){A=!0,f.tabIndex=0;continue}f.tabIndex=-1}if(A)return;let v=U2(p,this.isActivatable);v&&(v.tabIndex=0)};let{isItem:e,getPossibleItems:H,isRtl:t,deactivateItem:r,activateItem:i,isNavigableKey:M,isActivatable:l,wrapNavigation:s}=C;this.isItem=e,this.getPossibleItems=H,this.isRtl=t,this.deactivateItem=r,this.activateItem=i,this.isNavigableKey=M,this.isActivatable=l,this.wrapNavigation=s??(()=>!0)}get items(){let C=this.getPossibleItems(),e=[];for(let H of C){if(this.isItem(H)){e.push(H);continue}let r=H.item;r&&this.isItem(r)&&e.push(r)}return e}activateNextItem(){let C=this.items,e=$1(C,this.isActivatable);return e&&(e.item.tabIndex=-1),O0(C,e,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){let C=this.items,e=$1(C,this.isActivatable);return e&&(e.item.tabIndex=-1),_0(C,e,this.isActivatable,this.wrapNavigation())}};function f9(V,C){return new CustomEvent("close-menu",{bubbles:!0,composed:!0,detail:{initiator:V,reason:C,itemPath:[V]}})}var k0=f9;var w0={SPACE:"Space",ENTER:"Enter"},T5={CLICK_SELECTION:"click-selection",KEYDOWN:"keydown"},Z9={ESCAPE:"Escape",SPACE:w0.SPACE,ENTER:w0.ENTER};function E5(V){return Object.values(Z9).some(C=>C===V)}function u4(V){return Object.values(w0).some(C=>C===V)}function G2(V,C){let e=new Event("md-contains",{bubbles:!0,composed:!0}),H=[],t=i=>{H=i.composedPath()};return C.addEventListener("md-contains",t),V.dispatchEvent(e),C.removeEventListener("md-contains",t),H.length>0}var V1={NONE:"none",LIST_ROOT:"list-root",FIRST_ITEM:"first-item",LAST_ITEM:"last-item"};var q2={END_START:"end-start",END_END:"end-end",START_START:"start-start",START_END:"start-end"},P5=class{constructor(C,e){this.host=C,this.getProperties=e,this.surfaceStylesInternal={display:"none"},this.lastValues={isOpen:!1},this.host.addController(this)}get surfaceStyles(){return this.surfaceStylesInternal}async position(){let{surfaceEl:C,anchorEl:e,anchorCorner:H,surfaceCorner:t,positioning:r,xOffset:i,yOffset:M,disableBlockFlip:l,disableInlineFlip:s,repositionStrategy:p}=this.getProperties(),A=H.toLowerCase().trim(),v=t.toLowerCase().trim();if(!C||!e)return;let f=window.innerWidth,w=window.innerHeight,b=document.createElement("div");b.style.opacity="0",b.style.position="fixed",b.style.display="block",b.style.inset="0",document.body.appendChild(b);let k=b.getBoundingClientRect();b.remove();let I=window.innerHeight-k.bottom,O=window.innerWidth-k.right;this.surfaceStylesInternal={display:"block",opacity:"0"},this.host.requestUpdate(),await this.host.updateComplete,C.popover&&C.isConnected&&C.showPopover();let W=C.getSurfacePositionClientRect?C.getSurfacePositionClientRect():C.getBoundingClientRect(),q=e.getSurfacePositionClientRect?e.getSurfacePositionClientRect():e.getBoundingClientRect(),[z,w1]=v.split("-"),[k1,G1]=A.split("-"),X2=getComputedStyle(C).direction==="ltr",{blockInset:H2,blockOutOfBoundsCorrection:v1,surfaceBlockProperty:O7}=this.calculateBlock({surfaceRect:W,anchorRect:q,anchorBlock:k1,surfaceBlock:z,yOffset:M,positioning:r,windowInnerHeight:w,blockScrollbarHeight:I});if(v1&&!l){let t3=z==="start"?"end":"start",V3=k1==="start"?"end":"start",h1=this.calculateBlock({surfaceRect:W,anchorRect:q,anchorBlock:V3,surfaceBlock:t3,yOffset:M,positioning:r,windowInnerHeight:w,blockScrollbarHeight:I});v1>h1.blockOutOfBoundsCorrection&&(H2=h1.blockInset,v1=h1.blockOutOfBoundsCorrection,O7=h1.surfaceBlockProperty)}let{inlineInset:J2,inlineOutOfBoundsCorrection:t2,surfaceInlineProperty:_7}=this.calculateInline({surfaceRect:W,anchorRect:q,anchorInline:G1,surfaceInline:w1,xOffset:i,positioning:r,isLTR:X2,windowInnerWidth:f,inlineScrollbarWidth:O});if(t2&&!s){let t3=w1==="start"?"end":"start",V3=G1==="start"?"end":"start",h1=this.calculateInline({surfaceRect:W,anchorRect:q,anchorInline:V3,surfaceInline:t3,xOffset:i,positioning:r,isLTR:X2,windowInnerWidth:f,inlineScrollbarWidth:O});Math.abs(t2)>Math.abs(h1.inlineOutOfBoundsCorrection)&&(J2=h1.inlineInset,t2=h1.inlineOutOfBoundsCorrection,_7=h1.surfaceInlineProperty)}p==="move"&&(H2=H2-v1,J2=J2-t2),this.surfaceStylesInternal={display:"block",opacity:"1",[O7]:`${H2}px`,[_7]:`${J2}px`},p==="resize"&&(v1&&(this.surfaceStylesInternal.height=`${W.height-v1}px`),t2&&(this.surfaceStylesInternal.width=`${W.width-t2}px`)),this.host.requestUpdate()}calculateBlock(C){let{surfaceRect:e,anchorRect:H,anchorBlock:t,surfaceBlock:r,yOffset:i,positioning:M,windowInnerHeight:l,blockScrollbarHeight:s}=C,p=M==="fixed"||M==="document"?1:0,A=M==="document"?1:0,v=r==="start"?1:0,f=r==="end"?1:0,b=(t!==r?1:0)*H.height+i,k=v*H.top+f*(l-H.bottom-s),I=v*window.scrollY-f*window.scrollY,O=Math.abs(Math.min(0,l-k-b-e.height));return{blockInset:p*k+A*I+b,blockOutOfBoundsCorrection:O,surfaceBlockProperty:r==="start"?"inset-block-start":"inset-block-end"}}calculateInline(C){let{isLTR:e,surfaceInline:H,anchorInline:t,anchorRect:r,surfaceRect:i,xOffset:M,positioning:l,windowInnerWidth:s,inlineScrollbarWidth:p}=C,A=l==="fixed"||l==="document"?1:0,v=l==="document"?1:0,f=e?1:0,w=e?0:1,b=H==="start"?1:0,k=H==="end"?1:0,O=(t!==H?1:0)*r.width+M,W=b*r.left+k*(s-r.right-p),q=b*(s-r.right-p)+k*r.left,z=f*W+w*q,w1=b*window.scrollX-k*window.scrollX,k1=k*window.scrollX-b*window.scrollX,G1=f*w1+w*k1,X2=Math.abs(Math.min(0,s-z-O-i.width)),H2=A*z+O+v*G1,v1=H==="start"?"inset-inline-start":"inset-inline-end";return(l==="document"||l==="fixed")&&(H==="start"&&e||H==="end"&&!e?v1="left":v1="right"),{inlineInset:H2,inlineOutOfBoundsCorrection:X2,surfaceInlineProperty:v1}}hostUpdate(){this.onUpdate()}hostUpdated(){this.onUpdate()}async onUpdate(){let C=this.getProperties(),e=!1;for(let[i,M]of Object.entries(C))if(e=e||M!==this.lastValues[i],e)break;let H=this.lastValues.isOpen!==C.isOpen,t=!!C.anchorEl,r=!!C.surfaceEl;e&&t&&r&&(this.lastValues.isOpen=C.isOpen,C.isOpen?(this.lastValues=C,await this.position(),C.onOpen()):H&&(await C.beforeClose(),this.close(),C.onClose()))}close(){this.surfaceStylesInternal={display:"none"},this.host.requestUpdate();let C=this.getProperties().surfaceEl;C?.popover&&C?.isConnected&&C.hidePopover()}};var i1={INDEX:0,ITEM:1,TEXT:2},B5=class{constructor(C){this.getProperties=C,this.typeaheadRecords=[],this.typaheadBuffer="",this.cancelTypeaheadTimeout=0,this.isTypingAhead=!1,this.lastActiveRecord=null,this.onKeydown=e=>{this.isTypingAhead?this.typeahead(e):this.beginTypeahead(e)},this.endTypeahead=()=>{this.isTypingAhead=!1,this.typaheadBuffer="",this.typeaheadRecords=[]}}get items(){return this.getProperties().getItems()}get active(){return this.getProperties().active}beginTypeahead(C){this.active&&(C.code==="Space"||C.code==="Enter"||C.code.startsWith("Arrow")||C.code==="Escape"||(this.isTypingAhead=!0,this.typeaheadRecords=this.items.map((e,H)=>[H,e,e.typeaheadText.trim().toLowerCase()]),this.lastActiveRecord=this.typeaheadRecords.find(e=>e[i1.ITEM].tabIndex===0)??null,this.lastActiveRecord&&(this.lastActiveRecord[i1.ITEM].tabIndex=-1),this.typeahead(C)))}typeahead(C){if(C.defaultPrevented)return;if(clearTimeout(this.cancelTypeaheadTimeout),C.code==="Enter"||C.code.startsWith("Arrow")||C.code==="Escape"){this.endTypeahead(),this.lastActiveRecord&&(this.lastActiveRecord[i1.ITEM].tabIndex=-1);return}C.code==="Space"&&C.preventDefault(),this.cancelTypeaheadTimeout=setTimeout(this.endTypeahead,this.getProperties().typeaheadBufferTime),this.typaheadBuffer+=C.key.toLowerCase();let e=this.lastActiveRecord?this.lastActiveRecord[i1.INDEX]:-1,H=this.typeaheadRecords.length,t=l=>(l[i1.INDEX]+H-e)%H,r=this.typeaheadRecords.filter(l=>!l[i1.ITEM].disabled&&l[i1.TEXT].startsWith(this.typaheadBuffer)).sort((l,s)=>t(l)-t(s));if(r.length===0){clearTimeout(this.cancelTypeaheadTimeout),this.lastActiveRecord&&(this.lastActiveRecord[i1.ITEM].tabIndex=-1),this.endTypeahead();return}let i=this.typaheadBuffer.length===1,M;this.lastActiveRecord===r[0]&&i?M=r[1]??r[0]:M=r[0],this.lastActiveRecord&&(this.lastActiveRecord[i1.ITEM].tabIndex=-1),this.lastActiveRecord=M,M[i1.ITEM].tabIndex=0,M[i1.ITEM].focus()}};var T0=200,x4=new Set([G.ArrowDown,G.ArrowUp,G.Home,G.End]),S9=new Set([G.ArrowLeft,G.ArrowRight,...x4]);function g9(V=document){let C=V.activeElement;for(;C&&C?.shadowRoot?.activeElement;)C=C.shadowRoot.activeElement;return C}var E=class extends m{get openDirection(){return this.menuCorner.split("-")[0]==="start"?"DOWN":"UP"}get anchorElement(){return this.anchor?this.getRootNode().querySelector(`#${this.anchor}`):this.currentAnchorElement}set anchorElement(C){this.currentAnchorElement=C,this.requestUpdate("anchorElement")}constructor(){super(),this.anchor="",this.positioning="absolute",this.quick=!1,this.hasOverflow=!1,this.open=!1,this.xOffset=0,this.yOffset=0,this.noHorizontalFlip=!1,this.noVerticalFlip=!1,this.typeaheadDelay=T0,this.anchorCorner=q2.END_START,this.menuCorner=q2.START_START,this.stayOpenOnOutsideClick=!1,this.stayOpenOnFocusout=!1,this.skipRestoreFocus=!1,this.defaultFocus=V1.FIRST_ITEM,this.noNavigationWrap=!1,this.typeaheadActive=!0,this.isSubmenu=!1,this.pointerPath=[],this.isRepositioning=!1,this.openCloseAnimationSignal=J7(),this.listController=new k5({isItem:C=>C.hasAttribute("md-menu-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:C=>{C.selected=!1,C.tabIndex=-1},activateItem:C=>{C.selected=!0,C.tabIndex=0},isNavigableKey:C=>{if(!this.isSubmenu)return S9.has(C);let H=getComputedStyle(this).direction==="rtl"?G.ArrowLeft:G.ArrowRight;return C===H?!0:x4.has(C)},wrapNavigation:()=>!this.noNavigationWrap}),this.lastFocusedElement=null,this.typeaheadController=new B5(()=>({getItems:()=>this.items,typeaheadBufferTime:this.typeaheadDelay,active:this.typeaheadActive})),this.currentAnchorElement=null,this.internals=this.attachInternals(),this.menuPositionController=new P5(this,()=>({anchorCorner:this.anchorCorner,surfaceCorner:this.menuCorner,surfaceEl:this.surfaceEl,anchorEl:this.anchorElement,positioning:this.positioning==="popover"?"document":this.positioning,isOpen:this.open,xOffset:this.xOffset,yOffset:this.yOffset,disableBlockFlip:this.noVerticalFlip,disableInlineFlip:this.noHorizontalFlip,onOpen:this.onOpened,beforeClose:this.beforeClose,onClose:this.onClosed,repositionStrategy:this.hasOverflow&&this.positioning!=="popover"?"move":"resize"})),this.onWindowResize=()=>{this.isRepositioning||this.positioning!=="document"&&this.positioning!=="fixed"&&this.positioning!=="popover"||(this.isRepositioning=!0,this.reposition(),this.isRepositioning=!1)},this.handleFocusout=async C=>{let e=this.anchorElement;if(this.stayOpenOnFocusout||!this.open||this.pointerPath.includes(e))return;if(C.relatedTarget){if(G2(C.relatedTarget,this)||this.pointerPath.length!==0&&G2(C.relatedTarget,e))return}else if(this.pointerPath.includes(this))return;let H=this.skipRestoreFocus;this.skipRestoreFocus=!0,this.close(),await this.updateComplete,this.skipRestoreFocus=H},this.onOpened=async()=>{this.lastFocusedElement=g9();let C=this.items,e=$1(C);e&&this.defaultFocus!==V1.NONE&&(e.item.tabIndex=-1);let H=!this.quick;switch(this.quick?this.dispatchEvent(new Event("opening")):H=!!await this.animateOpen(),this.defaultFocus){case V1.FIRST_ITEM:let t=U2(C);t&&(t.tabIndex=0,t.focus(),await t.updateComplete);break;case V1.LAST_ITEM:let r=y0(C);r&&(r.tabIndex=0,r.focus(),await r.updateComplete);break;case V1.LIST_ROOT:this.focus();break;default:case V1.NONE:break}H||this.dispatchEvent(new Event("opened"))},this.beforeClose=async()=>{this.open=!1,this.skipRestoreFocus||this.lastFocusedElement?.focus?.(),this.quick||await this.animateClose()},this.onClosed=()=>{this.quick&&(this.dispatchEvent(new Event("closing")),this.dispatchEvent(new Event("closed")))},this.onWindowPointerdown=C=>{this.pointerPath=C.composedPath()},this.onDocumentClick=C=>{if(!this.open)return;let e=C.composedPath();!this.stayOpenOnOutsideClick&&!e.includes(this)&&!e.includes(this.anchorElement)&&(this.open=!1)},this.internals.role="menu",this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keydown",this.captureKeydown,{capture:!0}),this.addEventListener("focusout",this.handleFocusout)}get items(){return this.listController.items}willUpdate(C){if(C.has("open")){if(this.open){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}update(C){C.has("open")&&(this.open?this.setUpGlobalEventListeners():this.cleanUpGlobalEventListeners()),C.has("positioning")&&this.positioning==="popover"&&!this.showPopover&&(this.positioning="fixed"),super.update(C)}connectedCallback(){super.connectedCallback(),this.open&&this.setUpGlobalEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.cleanUpGlobalEventListeners()}getBoundingClientRect(){return this.surfaceEl?this.surfaceEl.getBoundingClientRect():super.getBoundingClientRect()}getClientRects(){return this.surfaceEl?this.surfaceEl.getClientRects():super.getClientRects()}render(){return this.renderSurface()}renderSurface(){return o`
      <div
        class="menu ${S(this.getSurfaceClasses())}"
        style=${n1(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning==="popover"?"manual":n}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `}renderMenuItems(){return o`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`}renderElevation(){return o`<md-elevation part="elevation"></md-elevation>`}getSurfaceClasses(){return{open:this.open,fixed:this.positioning==="fixed","has-overflow":this.hasOverflow}}captureKeydown(C){C.target===this&&!C.defaultPrevented&&E5(C.code)&&(C.preventDefault(),this.close()),this.typeaheadController.onKeydown(C)}async animateOpen(){let C=this.surfaceEl,e=this.slotEl;if(!C||!e)return!0;let H=this.openDirection;this.dispatchEvent(new Event("opening")),C.classList.toggle("animating",!0);let t=this.openCloseAnimationSignal.start(),r=C.offsetHeight,i=H==="UP",M=this.items,l=500,s=50,p=250,A=(l-p)/M.length,v=C.animate([{height:"0px"},{height:`${r}px`}],{duration:l,easing:j.EMPHASIZED}),f=e.animate([{transform:i?`translateY(-${r}px)`:""},{transform:""}],{duration:l,easing:j.EMPHASIZED}),w=C.animate([{opacity:0},{opacity:1}],s),b=[];for(let O=0;O<M.length;O++){let W=i?M.length-1-O:O,q=M[W],z=q.animate([{opacity:0},{opacity:1}],{duration:p,delay:A*O});q.classList.toggle("md-menu-hidden",!0),z.addEventListener("finish",()=>{q.classList.toggle("md-menu-hidden",!1)}),b.push([q,z])}let k=O=>{},I=new Promise(O=>{k=O});return t.addEventListener("abort",()=>{v.cancel(),f.cancel(),w.cancel(),b.forEach(([O,W])=>{O.classList.toggle("md-menu-hidden",!1),W.cancel()}),k(!0)}),v.addEventListener("finish",()=>{C.classList.toggle("animating",!1),this.openCloseAnimationSignal.finish(),k(!1)}),await I}animateClose(){let C,e=new Promise(z=>{C=z}),H=this.surfaceEl,t=this.slotEl;if(!H||!t)return C(!1),e;let i=this.openDirection==="UP";this.dispatchEvent(new Event("closing")),H.classList.toggle("animating",!0);let M=this.openCloseAnimationSignal.start(),l=H.offsetHeight,s=this.items,p=150,A=50,v=p-A,f=50,w=50,b=.35,k=(p-w-f)/s.length,I=H.animate([{height:`${l}px`},{height:`${l*b}px`}],{duration:p,easing:j.EMPHASIZED_ACCELERATE}),O=t.animate([{transform:""},{transform:i?`translateY(-${l*(1-b)}px)`:""}],{duration:p,easing:j.EMPHASIZED_ACCELERATE}),W=H.animate([{opacity:1},{opacity:0}],{duration:A,delay:v}),q=[];for(let z=0;z<s.length;z++){let w1=i?z:s.length-1-z,k1=s[w1],G1=k1.animate([{opacity:1},{opacity:0}],{duration:f,delay:w+k*z});G1.addEventListener("finish",()=>{k1.classList.toggle("md-menu-hidden",!0)}),q.push([k1,G1])}return M.addEventListener("abort",()=>{I.cancel(),O.cancel(),W.cancel(),q.forEach(([z,w1])=>{w1.cancel(),z.classList.toggle("md-menu-hidden",!1)}),C(!1)}),I.addEventListener("finish",()=>{H.classList.toggle("animating",!1),q.forEach(([z])=>{z.classList.toggle("md-menu-hidden",!1)}),this.openCloseAnimationSignal.finish(),this.dispatchEvent(new Event("closed")),C(!0)}),e}handleKeydown(C){this.pointerPath=[],this.listController.handleKeydown(C)}setUpGlobalEventListeners(){document.addEventListener("click",this.onDocumentClick,{capture:!0}),window.addEventListener("pointerdown",this.onWindowPointerdown),document.addEventListener("resize",this.onWindowResize,{passive:!0}),window.addEventListener("resize",this.onWindowResize,{passive:!0})}cleanUpGlobalEventListeners(){document.removeEventListener("click",this.onDocumentClick,{capture:!0}),window.removeEventListener("pointerdown",this.onWindowPointerdown),document.removeEventListener("resize",this.onWindowResize),window.removeEventListener("resize",this.onWindowResize)}onCloseMenu(){this.close()}onDeactivateItems(C){C.stopPropagation(),this.listController.onDeactivateItems()}onRequestActivation(C){C.stopPropagation(),this.listController.onRequestActivation(C)}handleDeactivateTypeahead(C){C.stopPropagation(),this.typeaheadActive=!1}handleActivateTypeahead(C){C.stopPropagation(),this.typeaheadActive=!0}handleStayOpenOnFocusout(C){C.stopPropagation(),this.stayOpenOnFocusout=!0}handleCloseOnFocusout(C){C.stopPropagation(),this.stayOpenOnFocusout=!1}close(){this.open=!1,this.slotItems.forEach(e=>{e.close?.()})}show(){this.open=!0}activateNextItem(){return this.listController.activateNextItem()??null}activatePreviousItem(){return this.listController.activatePreviousItem()??null}reposition(){this.open&&this.menuPositionController.position()}};L([u(".menu")],E.prototype,"surfaceEl",void 0);L([u("slot")],E.prototype,"slotEl",void 0);L([a()],E.prototype,"anchor",void 0);L([a()],E.prototype,"positioning",void 0);L([a({type:Boolean})],E.prototype,"quick",void 0);L([a({type:Boolean,attribute:"has-overflow"})],E.prototype,"hasOverflow",void 0);L([a({type:Boolean,reflect:!0})],E.prototype,"open",void 0);L([a({type:Number,attribute:"x-offset"})],E.prototype,"xOffset",void 0);L([a({type:Number,attribute:"y-offset"})],E.prototype,"yOffset",void 0);L([a({type:Boolean,attribute:"no-horizontal-flip"})],E.prototype,"noHorizontalFlip",void 0);L([a({type:Boolean,attribute:"no-vertical-flip"})],E.prototype,"noVerticalFlip",void 0);L([a({type:Number,attribute:"typeahead-delay"})],E.prototype,"typeaheadDelay",void 0);L([a({attribute:"anchor-corner"})],E.prototype,"anchorCorner",void 0);L([a({attribute:"menu-corner"})],E.prototype,"menuCorner",void 0);L([a({type:Boolean,attribute:"stay-open-on-outside-click"})],E.prototype,"stayOpenOnOutsideClick",void 0);L([a({type:Boolean,attribute:"stay-open-on-focusout"})],E.prototype,"stayOpenOnFocusout",void 0);L([a({type:Boolean,attribute:"skip-restore-focus"})],E.prototype,"skipRestoreFocus",void 0);L([a({attribute:"default-focus"})],E.prototype,"defaultFocus",void 0);L([a({type:Boolean,attribute:"no-navigation-wrap"})],E.prototype,"noNavigationWrap",void 0);L([R({flatten:!0})],E.prototype,"slotItems",void 0);L([Z()],E.prototype,"typeaheadActive",void 0);var E0=d`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:var(--md-menu-top-space, 8px) var(--md-menu-bottom-space, 8px)}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`,mr=E0.styleSheet;var P0=class extends E{};P0.styles=[E0];P0=L([c("md-menu")],P0);var F1=Symbol("createValidator"),D1=Symbol("getValidityAnchor"),B0=Symbol("privateValidator"),y1=Symbol("privateSyncValidity"),R5=Symbol("privateCustomValidationMessage");function c2(V){var C;class e extends V{constructor(){super(...arguments),this[C]=""}get validity(){return this[y1](),this[K].validity}get validationMessage(){return this[y1](),this[K].validationMessage}get willValidate(){return this[y1](),this[K].willValidate}checkValidity(){return this[y1](),this[K].checkValidity()}reportValidity(){return this[y1](),this[K].reportValidity()}setCustomValidity(t){this[R5]=t,this[y1]()}requestUpdate(t,r,i){super.requestUpdate(t,r,i),this[y1]()}firstUpdated(t){super.firstUpdated(t),this[y1]()}[(C=R5,y1)](){if(!1)return;this[B0]||(this[B0]=this[F1]());let{validity:t,validationMessage:r}=this[B0].getValidity(),i=!!this[R5],M=this[R5]||r;this[K].setValidity({...t,customError:i},M,this[D1]()??void 0)}[F1](){throw new Error("Implement [createValidator]")}[D1](){throw new Error("Implement [getValidityAnchor]")}}return e}var v2=Symbol("onReportValidity"),$5=Symbol("privateCleanupFormListeners"),F5=Symbol("privateDoNotReportInvalid"),D5=Symbol("privateIsSelfReportingValidity"),I5=Symbol("privateCallOnReportValidity");function z5(V){var C,e,H;class t extends V{constructor(...i){super(...i),this[C]=new AbortController,this[e]=!1,this[H]=!1,!!1&&this.addEventListener("invalid",M=>{this[F5]||!M.isTrusted||this.addEventListener("invalid",()=>{this[I5](M)},{once:!0})},{capture:!0})}checkValidity(){this[F5]=!0;let i=super.checkValidity();return this[F5]=!1,i}reportValidity(){this[D5]=!0;let i=super.reportValidity();return i&&this[I5](null),this[D5]=!1,i}[(C=$5,e=F5,H=D5,I5)](i){let M=i?.defaultPrevented;M||(this[v2](i),!(!M&&i?.defaultPrevented))||(this[D5]||O9(this[K].form,this))&&this.focus()}[v2](i){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(i){super.formAssociatedCallback&&super.formAssociatedCallback(i),this[$5].abort(),i&&(this[$5]=new AbortController,b9(this,i,()=>{this[I5](null)},this[$5].signal))}}return t}function b9(V,C,e,H){let t=y9(C),r=!1,i,M=!1;t.addEventListener("before",()=>{M=!0,i=new AbortController,r=!1,V.addEventListener("invalid",()=>{r=!0},{signal:i.signal})},{signal:H}),t.addEventListener("after",()=>{M=!1,i?.abort(),!r&&e()},{signal:H}),C.addEventListener("submit",()=>{M||e()},{signal:H})}var R0=new WeakMap;function y9(V){if(!R0.has(V)){let C=new EventTarget;R0.set(V,C);for(let e of["reportValidity","requestSubmit"]){let H=V[e];V[e]=function(){C.dispatchEvent(new Event("before"));let t=Reflect.apply(H,this,arguments);return C.dispatchEvent(new Event("after")),t}}}return R0.get(V)}function O9(V,C){if(!V)return!0;let e;for(let H of V.elements)if(H.matches(":invalid")){e=H;break}return e===C}var I1=class{constructor(C){this.getCurrentState=C,this.currentValidity={validity:{},validationMessage:""}}getValidity(){let C=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,C)))return this.currentValidity;let{validity:H,validationMessage:t}=this.computeValidity(C);return this.prevState=this.copy(C),this.currentValidity={validationMessage:t,validity:{badInput:H.badInput,customError:H.customError,patternMismatch:H.patternMismatch,rangeOverflow:H.rangeOverflow,rangeUnderflow:H.rangeUnderflow,stepMismatch:H.stepMismatch,tooLong:H.tooLong,tooShort:H.tooShort,typeMismatch:H.typeMismatch,valueMissing:H.valueMissing}},this.currentValidity}};var N5=class extends I1{computeValidity(C){return this.selectControl||(this.selectControl=document.createElement("select")),r2(o`<option value=${C.value}></option>`,this.selectControl),this.selectControl.value=C.value,this.selectControl.required=C.required,{validity:this.selectControl.validity,validationMessage:this.selectControl.validationMessage}}equals(C,e){return C.value===e.value&&C.required===e.required}copy({value:C,required:e}){return{value:C,required:e}}};function h4(V){let C=[];for(let e=0;e<V.length;e++){let H=V[e];H.selected&&C.push([H,e])}return C}var f4,W5=Symbol("value"),_9=P(z5(c2(M1(a1(m))))),y=class extends _9{get value(){return this[W5]}set value(C){this.lastUserSetValue=C,this.select(C)}get options(){return this.menu?.items??[]}get selectedIndex(){let[C,e]=(this.getSelectedOptions()??[])[0]??[];return e??-1}set selectedIndex(C){this.lastUserSetSelectedIndex=C,this.selectIndex(C)}get selectedOptions(){return(this.getSelectedOptions()??[]).map(([C])=>C)}get hasError(){return this.error||this.nativeError}constructor(){super(),this.quick=!1,this.required=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.supportingText="",this.error=!1,this.menuPositioning="popover",this.clampMenuWidth=!1,this.typeaheadDelay=T0,this.hasLeadingIcon=!1,this.displayText="",this.menuAlign="start",this[f4]="",this.lastUserSetValue=null,this.lastUserSetSelectedIndex=null,this.lastSelectedOption=null,this.lastSelectedOptionRecords=[],this.nativeError=!1,this.nativeErrorText="",this.focused=!1,this.open=!1,this.defaultFocus=V1.NONE,this.prevOpen=this.open,this.selectWidth=0,!!1&&(this.addEventListener("focus",this.handleFocus.bind(this)),this.addEventListener("blur",this.handleBlur.bind(this)))}select(C){let e=this.options.find(H=>H.value===C);e&&this.selectItem(e)}selectIndex(C){let e=this.options[C];e&&this.selectItem(e)}reset(){for(let C of this.options)C.selected=C.hasAttribute("selected");this.updateValueAndDisplayText(),this.nativeError=!1,this.nativeErrorText=""}showPicker(){this.open=!0}[(f4=W5,v2)](C){C?.preventDefault();let e=this.getErrorText();this.nativeError=!!C,this.nativeErrorText=this.validationMessage,e===this.getErrorText()&&this.field?.reannounceError()}update(C){if(this.hasUpdated||this.initUserSelection(),this.prevOpen!==this.open&&this.open){let e=this.getBoundingClientRect();this.selectWidth=e.width}this.prevOpen=this.open,super.update(C)}render(){return o`
      <span
        class="select ${S(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `}async firstUpdated(C){await this.menu?.updateComplete,this.lastSelectedOptionRecords.length||this.initUserSelection(),!this.lastSelectedOptionRecords.length&&!!1&&!this.options.length&&setTimeout(()=>{this.updateValueAndDisplayText()}),super.firstUpdated(C)}getRenderClasses(){return{disabled:this.disabled,error:this.error,open:this.open}}renderField(){let C=this.ariaLabel||this.label;return P1`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled?"-1":"0"}
          aria-label=${C||n}
          aria-describedby="description"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          ?no-asterisk=${this.noAsterisk}
          .focused=${this.focused||this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`}renderFieldContent(){return[this.renderLeadingIcon(),this.renderLabel(),this.renderTrailingIcon()]}renderLeadingIcon(){return o`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return o`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `}renderLabel(){return o`<div id="label">${this.displayText||o`&nbsp;`}</div>`}renderMenu(){let C=this.label||this.ariaLabel;return o`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${C||n}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${n1({"--__menu-min-width":`${this.selectWidth}px`,"--__menu-max-width":this.clampMenuWidth?`${this.selectWidth}px`:void 0})}
        no-navigation-wrap
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign==="start"?"end-start":"end-end"}
        .menuCorner=${this.menuAlign==="start"?"start-start":"start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`}renderMenuContent(){return o`<slot></slot>`}handleKeydown(C){if(this.open||this.disabled||!this.menu)return;let e=this.menu.typeaheadController,H=C.code==="Space"||C.code==="ArrowDown"||C.code==="ArrowUp"||C.code==="End"||C.code==="Home"||C.code==="Enter";if(!e.isTypingAhead&&H){switch(C.preventDefault(),this.open=!0,C.code){case"Space":case"ArrowDown":case"Enter":this.defaultFocus=V1.NONE;break;case"End":this.defaultFocus=V1.LAST_ITEM;break;case"ArrowUp":case"Home":this.defaultFocus=V1.FIRST_ITEM;break;default:break}return}if(C.key.length===1){e.onKeydown(C),C.preventDefault();let{lastActiveRecord:r}=e;if(!r)return;this.labelEl?.setAttribute?.("aria-live","polite"),this.selectItem(r[i1.ITEM])&&this.dispatchInteractionEvents()}}handleClick(){this.open=!this.open}handleFocus(){this.focused=!0}handleBlur(){this.focused=!1}handleFocusout(C){C.relatedTarget&&G2(C.relatedTarget,this)||(this.open=!1)}getSelectedOptions(){if(!this.menu)return this.lastSelectedOptionRecords=[],null;let C=this.menu.items;return this.lastSelectedOptionRecords=h4(C),this.lastSelectedOptionRecords}async getUpdateComplete(){return await this.menu?.updateComplete,super.getUpdateComplete()}updateValueAndDisplayText(){let C=this.getSelectedOptions()??[],e=!1;if(C.length){let[H]=C[0];e=this.lastSelectedOption!==H,this.lastSelectedOption=H,this[W5]=H.value,this.displayText=H.displayText}else e=this.lastSelectedOption!==null,this.lastSelectedOption=null,this[W5]="",this.displayText="";return e}async handleOpening(C){if(this.labelEl?.removeAttribute?.("aria-live"),this.redispatchEvent(C),this.defaultFocus!==V1.NONE)return;let e=this.menu.items,H=$1(e)?.item,[t]=this.lastSelectedOptionRecords[0]??[null];H&&H!==t&&(H.tabIndex=-1),t=t??e[0],t&&(t.tabIndex=0,t.focus())}redispatchEvent(C){r1(this,C)}handleClosed(C){this.open=!1,this.redispatchEvent(C)}handleCloseMenu(C){let e=C.detail.reason,H=C.detail.itemPath[0];this.open=!1;let t=!1;e.kind==="click-selection"?t=this.selectItem(H):e.kind==="keydown"&&u4(e.key)?t=this.selectItem(H):(H.tabIndex=-1,H.blur()),t&&this.dispatchInteractionEvents()}selectItem(C){return(this.getSelectedOptions()??[]).forEach(([H])=>{C!==H&&(H.selected=!1,H.tabIndex=-1)}),C.selected=!0,C.tabIndex=0,this.updateValueAndDisplayText()}handleRequestSelection(C){let e=C.target;this.lastSelectedOptionRecords.some(([H])=>H===e)||this.selectItem(e)}handleRequestDeselection(C){let e=C.target;this.lastSelectedOptionRecords.some(([H])=>H===e)&&this.updateValueAndDisplayText()}initUserSelection(){this.lastUserSetValue&&!this.lastSelectedOptionRecords.length?this.select(this.lastUserSetValue):this.lastUserSetSelectedIndex!==null&&!this.lastSelectedOptionRecords.length?this.selectIndex(this.lastUserSetSelectedIndex):this.updateValueAndDisplayText()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0}dispatchInteractionEvents(){this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0}))}getErrorText(){return this.error?this.errorText:this.nativeErrorText}[A1](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(C){this.value=C}click(){this.field?.click()}[F1](){return new N5(()=>this)}[D1](){return this.field}};y.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Boolean})],y.prototype,"quick",void 0);L([a({type:Boolean})],y.prototype,"required",void 0);L([a({type:String,attribute:"error-text"})],y.prototype,"errorText",void 0);L([a()],y.prototype,"label",void 0);L([a({type:Boolean,attribute:"no-asterisk"})],y.prototype,"noAsterisk",void 0);L([a({type:String,attribute:"supporting-text"})],y.prototype,"supportingText",void 0);L([a({type:Boolean,reflect:!0})],y.prototype,"error",void 0);L([a({attribute:"menu-positioning"})],y.prototype,"menuPositioning",void 0);L([a({type:Boolean,attribute:"clamp-menu-width"})],y.prototype,"clampMenuWidth",void 0);L([a({type:Number,attribute:"typeahead-delay"})],y.prototype,"typeaheadDelay",void 0);L([a({type:Boolean,attribute:"has-leading-icon"})],y.prototype,"hasLeadingIcon",void 0);L([a({attribute:"display-text"})],y.prototype,"displayText",void 0);L([a({attribute:"menu-align"})],y.prototype,"menuAlign",void 0);L([a()],y.prototype,"value",null);L([a({type:Number,attribute:"selected-index"})],y.prototype,"selectedIndex",null);L([Z()],y.prototype,"nativeError",void 0);L([Z()],y.prototype,"nativeErrorText",void 0);L([Z()],y.prototype,"focused",void 0);L([Z()],y.prototype,"open",void 0);L([Z()],y.prototype,"defaultFocus",void 0);L([u(".field")],y.prototype,"field",void 0);L([u("md-menu")],y.prototype,"menu",void 0);L([u("#label")],y.prototype,"labelEl",void 0);L([R({slot:"leading-icon",flatten:!0})],y.prototype,"leadingIcons",void 0);var U5=class extends y{constructor(){super(...arguments),this.fieldTag=L1`md-outlined-field`}};var $0=d`:host{--_text-field-disabled-input-text-color: var(--md-outlined-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-outlined-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-outlined-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-outlined-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-outlined-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-outlined-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-outline-color: var(--md-outlined-select-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-outline-opacity: var(--md-outlined-select-text-field-disabled-outline-opacity, 0.12);--_text-field-disabled-outline-width: var(--md-outlined-select-text-field-disabled-outline-width, 1px);--_text-field-disabled-supporting-text-color: var(--md-outlined-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-outlined-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-outlined-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-outlined-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-focus-input-text-color: var(--md-outlined-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-outlined-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-outlined-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-outline-color: var(--md-outlined-select-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-supporting-text-color: var(--md-outlined-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-outlined-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-input-text-color: var(--md-outlined-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-outlined-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-outlined-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-outline-color: var(--md-outlined-select-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-supporting-text-color: var(--md-outlined-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-outlined-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-outlined-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-outlined-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-outlined-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-outline-color: var(--md-outlined-select-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-supporting-text-color: var(--md-outlined-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-outlined-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-input-text-color: var(--md-outlined-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-outlined-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-outlined-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-outline-color: var(--md-outlined-select-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-outline-width: var(--md-outlined-select-text-field-focus-outline-width, 3px);--_text-field-focus-supporting-text-color: var(--md-outlined-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-outlined-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-input-text-color: var(--md-outlined-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-outlined-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-outlined-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-outline-color: var(--md-outlined-select-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-outline-width: var(--md-outlined-select-text-field-hover-outline-width, 1px);--_text-field-hover-supporting-text-color: var(--md-outlined-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-outlined-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-outlined-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-outlined-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-outlined-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-outlined-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-outlined-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-outlined-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-outlined-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-outlined-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-outlined-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-outlined-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-outlined-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-outlined-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-outlined-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-outlined-select-text-field-leading-icon-size, 24px);--_text-field-outline-color: var(--md-outlined-select-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_text-field-outline-width: var(--md-outlined-select-text-field-outline-width, 1px);--_text-field-supporting-text-color: var(--md-outlined-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-outlined-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-outlined-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-outlined-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-outlined-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-outlined-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-outlined-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-outlined-select-text-field-container-shape-start-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-outlined-select-text-field-container-shape-start-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-outlined-select-text-field-container-shape-end-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-start: var(--md-outlined-select-text-field-container-shape-end-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--md-outlined-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-outlined-field-content-color: var(--_text-field-input-text-color);--md-outlined-field-content-font: var(--_text-field-input-text-font);--md-outlined-field-content-line-height: var(--_text-field-input-text-line-height);--md-outlined-field-content-size: var(--_text-field-input-text-size);--md-outlined-field-content-weight: var(--_text-field-input-text-weight);--md-outlined-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_text-field-disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_text-field-disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_text-field-disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_text-field-error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_text-field-error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_text-field-error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_text-field-error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_text-field-focus-outline-color);--md-outlined-field-focus-outline-width: var(--_text-field-focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_text-field-hover-outline-color);--md-outlined-field-hover-outline-width: var(--_text-field-hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_text-field-label-text-color);--md-outlined-field-label-text-font: var(--_text-field-label-text-font);--md-outlined-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-outlined-field-label-text-size: var(--_text-field-label-text-size);--md-outlined-field-label-text-weight: var(--_text-field-label-text-weight);--md-outlined-field-leading-content-color: var(--_text-field-leading-icon-color);--md-outlined-field-outline-color: var(--_text-field-outline-color);--md-outlined-field-outline-width: var(--_text-field-outline-width);--md-outlined-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-outlined-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-outlined-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`,aL=$0.styleSheet;var F0=d`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`,lL=F0.styleSheet;var D0=class extends U5{};D0.styles=[F0,$0];D0=L([c("md-outlined-select")],D0);var Q2=d`:host{display:flex;gap:16px;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;gap:inherit;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px);gap:inherit}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`,hL=Q2.styleSheet;var u2=class extends m{constructor(){super(...arguments),this.multiline=!1}render(){return o`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `}handleTextSlotChange(){let C=!1,e=0;for(let H of this.textSlots)if(w9(H)&&(e+=1),e>1){C=!0;break}this.multiline=C}};L([a({type:Boolean,reflect:!0})],u2.prototype,"multiline",void 0);L([j7(".text slot")],u2.prototype,"textSlots",void 0);function w9(V){for(let C of V.assignedNodes({flatten:!0})){let e=C.nodeType===Node.ELEMENT_NODE,H=C.nodeType===Node.TEXT_NODE&&C.textContent?.match(/\S/);if(e||H)return!0}return!1}var I0=d`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`,OL=I0.styleSheet;var z0=class extends u2{};z0.styles=[I0];z0=L([c("md-item")],z0);var x2=class{constructor(C,e){this.host=C,this.internalTypeaheadText=null,this.onClick=()=>{this.host.keepOpen||this.host.dispatchEvent(k0(this.host,{kind:T5.CLICK_SELECTION}))},this.onKeydown=H=>{if(this.host.href&&H.code==="Enter"){let r=this.getInteractiveElement();r instanceof HTMLAnchorElement&&r.click()}if(H.defaultPrevented)return;let t=H.code;this.host.keepOpen&&t!=="Escape"||E5(t)&&(H.preventDefault(),this.host.dispatchEvent(k0(this.host,{kind:T5.KEYDOWN,key:t})))},this.getHeadlineElements=e.getHeadlineElements,this.getSupportingTextElements=e.getSupportingTextElements,this.getDefaultElements=e.getDefaultElements,this.getInteractiveElement=e.getInteractiveElement,this.host.addController(this)}get typeaheadText(){if(this.internalTypeaheadText!==null)return this.internalTypeaheadText;let C=this.getHeadlineElements(),e=[];return C.forEach(H=>{H.textContent&&H.textContent.trim()&&e.push(H.textContent.trim())}),e.length===0&&this.getDefaultElements().forEach(H=>{H.textContent&&H.textContent.trim()&&e.push(H.textContent.trim())}),e.length===0&&this.getSupportingTextElements().forEach(H=>{H.textContent&&H.textContent.trim()&&e.push(H.textContent.trim())}),e.join(" ")}get tagName(){switch(this.host.type){case"link":return"a";case"button":return"button";default:case"menuitem":case"option":return"li"}}get role(){return this.host.type==="option"?"option":"menuitem"}hostConnected(){this.host.toggleAttribute("md-menu-item",!0)}hostUpdate(){this.host.href&&(this.host.type="link")}setTypeaheadText(C){this.internalTypeaheadText=C}};function k9(){return new Event("request-selection",{bubbles:!0,composed:!0})}function T9(){return new Event("request-deselection",{bubbles:!0,composed:!0})}var G5=class{get role(){return this.menuItemController.role}get typeaheadText(){return this.menuItemController.typeaheadText}setTypeaheadText(C){this.menuItemController.setTypeaheadText(C)}get displayText(){return this.internalDisplayText!==null?this.internalDisplayText:this.menuItemController.typeaheadText}setDisplayText(C){this.internalDisplayText=C}constructor(C,e){this.host=C,this.internalDisplayText=null,this.firstUpdate=!0,this.onClick=()=>{this.menuItemController.onClick()},this.onKeydown=H=>{this.menuItemController.onKeydown(H)},this.lastSelected=this.host.selected,this.menuItemController=new x2(C,e),C.addController(this)}hostUpdate(){this.lastSelected!==this.host.selected&&(this.host.ariaSelected=this.host.selected?"true":"false")}hostUpdated(){this.lastSelected!==this.host.selected&&!this.firstUpdate&&(this.host.selected?this.host.dispatchEvent(k9()):this.host.dispatchEvent(T9())),this.lastSelected=this.host.selected,this.firstUpdate=!1}};var E9=P(m),e1=class extends E9{constructor(){super(...arguments),this.disabled=!1,this.isMenuItem=!0,this.selected=!1,this.value="",this.type="option",this.selectOptionController=new G5(this,{getHeadlineElements:()=>this.headlineElements,getSupportingTextElements:()=>this.supportingTextElements,getDefaultElements:()=>this.defaultElements,getInteractiveElement:()=>this.listItemRoot})}get typeaheadText(){return this.selectOptionController.typeaheadText}set typeaheadText(C){this.selectOptionController.setTypeaheadText(C)}get displayText(){return this.selectOptionController.displayText}set displayText(C){this.selectOptionController.setDisplayText(C)}render(){return this.renderListItem(o`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(C){return o`
      <li
        id="item"
        tabindex=${this.disabled?-1:0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel||n}
        aria-selected=${this.ariaSelected||n}
        aria-checked=${this.ariaChecked||n}
        aria-expanded=${this.ariaExpanded||n}
        aria-haspopup=${this.ariaHasPopup||n}
        class="list-item ${S(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${C}</li
      >
    `}renderRipple(){return o` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`}renderFocusRing(){return o` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}getRenderClasses(){return{disabled:this.disabled,selected:this.selected}}renderBody(){return o`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}focus(){this.listItemRoot?.focus()}};e1.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Boolean,reflect:!0})],e1.prototype,"disabled",void 0);L([a({type:Boolean,attribute:"md-menu-item",reflect:!0})],e1.prototype,"isMenuItem",void 0);L([a({type:Boolean})],e1.prototype,"selected",void 0);L([a()],e1.prototype,"value",void 0);L([u(".list-item")],e1.prototype,"listItemRoot",void 0);L([R({slot:"headline"})],e1.prototype,"headlineElements",void 0);L([R({slot:"supporting-text"})],e1.prototype,"supportingTextElements",void 0);L([L2({slot:""})],e1.prototype,"defaultElements",void 0);L([a({attribute:"typeahead-text"})],e1.prototype,"typeaheadText",null);L([a({attribute:"display-text"})],e1.prototype,"displayText",null);var N0=class extends e1{};N0.styles=[Q2];N0=L([c("md-select-option")],N0);var W0=d`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}
`,Vi=W0.styleSheet;function q5(V,C,e){return V?C(V):e?.(V)}var P9=P(M1(a1(m))),g=class extends P9{get nameStart(){return this.getAttribute("name-start")??this.name}set nameStart(C){this.setAttribute("name-start",C)}get nameEnd(){return this.getAttribute("name-end")??this.nameStart}set nameEnd(C){this.setAttribute("name-end",C)}get renderAriaLabelStart(){let{ariaLabel:C}=this;return this.ariaLabelStart||C&&`${C} start`||this.valueLabelStart||String(this.valueStart)}get renderAriaValueTextStart(){return this.ariaValueTextStart||this.valueLabelStart||String(this.valueStart)}get renderAriaLabelEnd(){let{ariaLabel:C}=this;return this.range?this.ariaLabelEnd||C&&`${C} end`||this.valueLabelEnd||String(this.valueEnd):C||this.valueLabel||String(this.value)}get renderAriaValueTextEnd(){if(this.range)return this.ariaValueTextEnd||this.valueLabelEnd||String(this.valueEnd);let{ariaValueText:C}=this;return C||this.valueLabel||String(this.value)}constructor(){super(),this.min=0,this.max=100,this.valueLabel="",this.valueLabelStart="",this.valueLabelEnd="",this.ariaLabelStart="",this.ariaValueTextStart="",this.ariaLabelEnd="",this.ariaValueTextEnd="",this.step=1,this.ticks=!1,this.labeled=!1,this.range=!1,this.handleStartHover=!1,this.handleEndHover=!1,this.startOnTop=!1,this.handlesOverlapping=!1,this.ripplePointerId=1,this.isRedispatchingEvent=!1,this.addEventListener("click",C=>{!n2(C)||!this.inputEnd||(this.focus(),M2(this.inputEnd))})}focus(){this.inputEnd?.focus()}willUpdate(C){this.renderValueStart=C.has("valueStart")?this.valueStart:this.inputStart?.valueAsNumber;let e=C.has("valueEnd")&&this.range||C.has("value");this.renderValueEnd=e?this.range?this.valueEnd:this.value:this.inputEnd?.valueAsNumber,C.get("handleStartHover")!==void 0?this.toggleRippleHover(this.rippleStart,this.handleStartHover):C.get("handleEndHover")!==void 0&&this.toggleRippleHover(this.rippleEnd,this.handleEndHover)}updated(C){if(this.range&&(this.renderValueStart=this.inputStart.valueAsNumber),this.renderValueEnd=this.inputEnd.valueAsNumber,this.range){let e=(this.max-this.min)/3;if(this.valueStart===void 0){this.inputStart.valueAsNumber=this.min+e;let H=this.inputStart.valueAsNumber;this.valueStart=this.renderValueStart=H}if(this.valueEnd===void 0){this.inputEnd.valueAsNumber=this.min+2*e;let H=this.inputEnd.valueAsNumber;this.valueEnd=this.renderValueEnd=H}}else this.value??=this.renderValueEnd;if(C.has("range")||C.has("renderValueStart")||C.has("renderValueEnd")||this.isUpdatePending){let e=this.handleStart?.querySelector(".handleNub"),H=this.handleEnd?.querySelector(".handleNub");this.handlesOverlapping=B9(e,H)}this.performUpdate()}render(){let C=this.step===0?1:this.step,e=Math.max(this.max-this.min,C),H=this.range?((this.renderValueStart??this.min)-this.min)/e:0,t=((this.renderValueEnd??this.min)-this.min)/e,r={"--_start-fraction":String(H),"--_end-fraction":String(t),"--_tick-count":String(e/C)},i={ranged:this.range},M=this.valueLabelStart||String(this.renderValueStart),l=(this.range?this.valueLabelEnd:this.valueLabel)||String(this.renderValueEnd),s={start:!0,value:this.renderValueStart,ariaLabel:this.renderAriaLabelStart,ariaValueText:this.renderAriaValueTextStart,ariaMin:this.min,ariaMax:this.valueEnd??this.max},p={start:!1,value:this.renderValueEnd,ariaLabel:this.renderAriaLabelEnd,ariaValueText:this.renderAriaValueTextEnd,ariaMin:this.range?this.valueStart??this.min:this.min,ariaMax:this.max},A={start:!0,hover:this.handleStartHover,label:M},v={start:!1,hover:this.handleEndHover,label:l},f={hover:this.handleStartHover||this.handleEndHover};return o` <div
      class="container ${S(i)}"
      style=${n1(r)}>
      ${q5(this.range,()=>this.renderInput(s))}
      ${this.renderInput(p)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${S(f)}">
            ${q5(this.range,()=>this.renderHandle(A))}
            ${this.renderHandle(v)}
          </div>
        </div>
      </div>
    </div>`}renderTrack(){return o`
      <div class="track"></div>
      ${this.ticks?o`<div class="tickmarks"></div>`:n}
    `}renderLabel(C){return o`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${C}</span>
    </div>`}renderHandle({start:C,hover:e,label:H}){let t=!this.disabled&&C===this.startOnTop,r=!this.disabled&&this.handlesOverlapping,i=C?"start":"end";return o`<div
      class="handle ${S({[i]:!0,hover:e,onTop:t,isOverlapping:r})}">
      <md-focus-ring part="focus-ring" for=${i}></md-focus-ring>
      <md-ripple
        for=${i}
        class=${i}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub">
        <md-elevation part="elevation"></md-elevation>
      </div>
      ${q5(this.labeled,()=>this.renderLabel(H))}
    </div>`}renderInput({start:C,value:e,ariaLabel:H,ariaValueText:t,ariaMin:r,ariaMax:i}){let M=C?"start":"end";return o`<input
      type="range"
      class="${S({start:C,end:!C})}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${M}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${r}
      .max=${String(this.max)}
      aria-valuemax=${i}
      .step=${String(this.step)}
      .value=${String(e)}
      .tabIndex=${C?1:0}
      aria-label=${H||n}
      aria-valuetext=${t} />`}async toggleRippleHover(C,e){let H=await C;H&&(e?H.handlePointerenter(new PointerEvent("pointerenter",{isPrimary:!0,pointerId:this.ripplePointerId})):H.handlePointerleave(new PointerEvent("pointerleave",{isPrimary:!0,pointerId:this.ripplePointerId})))}handleFocus(C){this.updateOnTop(C.target)}startAction(C){let e=C.target,H=e===this.inputStart?this.inputEnd:this.inputStart;this.action={canFlip:C.type==="pointerdown",flipped:!1,target:e,fixed:H,values:new Map([[e,e.valueAsNumber],[H,H?.valueAsNumber]])}}finishAction(C){this.action=void 0}handleKeydown(C){this.startAction(C)}handleKeyup(C){this.finishAction(C)}handleDown(C){this.startAction(C),this.ripplePointerId=C.pointerId;let e=C.target===this.inputStart;this.handleStartHover=!this.disabled&&e&&!!this.handleStart,this.handleEndHover=!this.disabled&&!e&&!!this.handleEnd}async handleUp(C){if(!this.action)return;let{target:e,values:H,flipped:t}=this.action;await new Promise(requestAnimationFrame),e!==void 0&&(e.focus(),t&&e.valueAsNumber!==H.get(e)&&e.dispatchEvent(new Event("change",{bubbles:!0}))),this.finishAction(C)}handleMove(C){this.handleStartHover=!this.disabled&&Z4(C,this.handleStart),this.handleEndHover=!this.disabled&&Z4(C,this.handleEnd)}handleEnter(C){this.handleMove(C)}handleLeave(){this.handleStartHover=!1,this.handleEndHover=!1}updateOnTop(C){this.startOnTop=C.classList.contains("start")}needsClamping(){if(!this.action)return!1;let{target:C,fixed:e}=this.action;return C===this.inputStart?C.valueAsNumber>e.valueAsNumber:C.valueAsNumber<e.valueAsNumber}isActionFlipped(){let{action:C}=this;if(!C)return!1;let{target:e,fixed:H,values:t}=C;return C.canFlip&&t.get(e)===t.get(H)&&this.needsClamping()&&(C.canFlip=!1,C.flipped=!0,C.target=H,C.fixed=e),C.flipped}flipAction(){if(!this.action)return!1;let{target:C,fixed:e,values:H}=this.action,t=C.valueAsNumber!==e.valueAsNumber;return C.valueAsNumber=e.valueAsNumber,e.valueAsNumber=H.get(e),t}clampAction(){if(!this.needsClamping()||!this.action)return!1;let{target:C,fixed:e}=this.action;return C.valueAsNumber=e.valueAsNumber,!0}handleInput(C){if(this.isRedispatchingEvent)return;let e=!1,H=!1;this.range&&(this.isActionFlipped()&&(e=!0,H=this.flipAction()),this.clampAction()&&(e=!0,H=!1));let t=C.target;this.updateOnTop(t),this.range?(this.valueStart=this.inputStart.valueAsNumber,this.valueEnd=this.inputEnd.valueAsNumber):this.value=this.inputEnd.valueAsNumber,e&&C.stopPropagation(),H&&(this.isRedispatchingEvent=!0,r1(t,C),this.isRedispatchingEvent=!1)}handleChange(C){let e=C.target,{target:H,values:t}=this.action??{};H&&H.valueAsNumber===t.get(e)||r1(this,C),this.finishAction(C)}[A1](){if(this.range){let C=new FormData;return C.append(this.nameStart,String(this.valueStart)),C.append(this.nameEnd,String(this.valueEnd)),C}return String(this.value)}formResetCallback(){if(this.range){let e=this.getAttribute("value-start");this.valueStart=e!==null?Number(e):void 0;let H=this.getAttribute("value-end");this.valueEnd=H!==null?Number(H):void 0;return}let C=this.getAttribute("value");this.value=C!==null?Number(C):void 0}formStateRestoreCallback(C){if(Array.isArray(C)){let[[,e],[,H]]=C;this.valueStart=Number(e),this.valueEnd=Number(H),this.range=!0;return}this.value=Number(C),this.range=!1}};g.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Number})],g.prototype,"min",void 0);L([a({type:Number})],g.prototype,"max",void 0);L([a({type:Number})],g.prototype,"value",void 0);L([a({type:Number,attribute:"value-start"})],g.prototype,"valueStart",void 0);L([a({type:Number,attribute:"value-end"})],g.prototype,"valueEnd",void 0);L([a({attribute:"value-label"})],g.prototype,"valueLabel",void 0);L([a({attribute:"value-label-start"})],g.prototype,"valueLabelStart",void 0);L([a({attribute:"value-label-end"})],g.prototype,"valueLabelEnd",void 0);L([a({attribute:"aria-label-start"})],g.prototype,"ariaLabelStart",void 0);L([a({attribute:"aria-valuetext-start"})],g.prototype,"ariaValueTextStart",void 0);L([a({attribute:"aria-label-end"})],g.prototype,"ariaLabelEnd",void 0);L([a({attribute:"aria-valuetext-end"})],g.prototype,"ariaValueTextEnd",void 0);L([a({type:Number})],g.prototype,"step",void 0);L([a({type:Boolean})],g.prototype,"ticks",void 0);L([a({type:Boolean})],g.prototype,"labeled",void 0);L([a({type:Boolean})],g.prototype,"range",void 0);L([u("input.start")],g.prototype,"inputStart",void 0);L([u(".handle.start")],g.prototype,"handleStart",void 0);L([s3("md-ripple.start")],g.prototype,"rippleStart",void 0);L([u("input.end")],g.prototype,"inputEnd",void 0);L([u(".handle.end")],g.prototype,"handleEnd",void 0);L([s3("md-ripple.end")],g.prototype,"rippleEnd",void 0);L([Z()],g.prototype,"handleStartHover",void 0);L([Z()],g.prototype,"handleEndHover",void 0);L([Z()],g.prototype,"startOnTop",void 0);L([Z()],g.prototype,"handlesOverlapping",void 0);L([Z()],g.prototype,"renderValueStart",void 0);L([Z()],g.prototype,"renderValueEnd",void 0);function Z4({x:V,y:C},e){if(!e)return!1;let{top:H,left:t,bottom:r,right:i}=e.getBoundingClientRect();return V>=t&&V<=i&&C>=H&&C<=r}function B9(V,C){if(!(V&&C))return!1;let e=V.getBoundingClientRect(),H=C.getBoundingClientRect();return!(e.top>H.bottom||e.right<H.left||e.bottom<H.top||e.left>H.right)}var U0=d`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none;user-select:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}
`,Si=U0.styleSheet;var G0=class extends g{};G0.styles=[U0,W0];G0=L([c("md-slider")],G0);var Q5=class extends I1{computeValidity(C){return this.checkboxControl||(this.checkboxControl=document.createElement("input"),this.checkboxControl.type="checkbox"),this.checkboxControl.checked=C.checked,this.checkboxControl.required=C.required,{validity:this.checkboxControl.validity,validationMessage:this.checkboxControl.validationMessage}}equals(C,e){return C.checked===e.checked&&C.required===e.required}copy({checked:C,required:e}){return{checked:C,required:e}}};var R9=P(c2(M1(a1(m)))),c1=class extends R9{constructor(){super(),this.selected=!1,this.icons=!1,this.showOnlySelectedIcon=!1,this.required=!1,this.value="on",!!1&&(this.addEventListener("click",C=>{!n2(C)||!this.input||(this.focus(),M2(this.input))}),d2(this,"keydown"),this.addEventListener("keydown",C=>{l2(C,()=>{C.defaultPrevented||C.key!=="Enter"||this.disabled||!this.input||this.input.click()})}))}render(){return o`
      <div class="switch ${S(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel||n}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `}getRenderClasses(){return{selected:this.selected,unselected:!this.selected,disabled:this.disabled}}renderHandle(){let C={"with-icon":this.showOnlySelectedIcon?this.selected:this.icons};return o`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${S(C)}">
          ${this.shouldShowIcons()?this.renderIcons():o``}
        </span>
      </span>
    `}renderIcons(){return o`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon?o``:this.renderOffIcon()}
      </div>
    `}renderOnIcon(){return o`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `}renderOffIcon(){return o`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `}renderTouchTarget(){return o`<span class="touch"></span>`}shouldShowIcons(){return this.icons||this.showOnlySelectedIcon}handleInput(C){let e=C.target;this.selected=e.checked}handleChange(C){r1(this,C)}[A1](){return this.selected?this.value:null}[s5](){return String(this.selected)}formResetCallback(){this.selected=this.hasAttribute("selected")}formStateRestoreCallback(C){this.selected=C==="true"}[F1](){return new Q5(()=>({checked:this.selected,required:this.required}))}[D1](){return this.input}};c1.shadowRootOptions={mode:"open",delegatesFocus:!0};L([a({type:Boolean})],c1.prototype,"selected",void 0);L([a({type:Boolean})],c1.prototype,"icons",void 0);L([a({type:Boolean,attribute:"show-only-selected-icon"})],c1.prototype,"showOnlySelectedIcon",void 0);L([a({type:Boolean})],c1.prototype,"required",void 0);L([a()],c1.prototype,"value",void 0);L([u("input")],c1.prototype,"input",void 0);var q0=d`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;background:none;height:max(100%,var(--md-switch-touch-target-size, 48px));outline:none;margin:0;position:absolute;width:max(100%,var(--md-switch-touch-target-size, 48px));z-index:1;cursor:inherit;top:50%;left:50%;transform:translate(-50%, -50%)}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`,Xi=q0.styleSheet;var Q0=class extends c1{};Q0.styles=[q0];Q0=L([c("md-switch")],Q0);var j0=d`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`,io=j0.styleSheet;var{I:Mo}=Q7;var S4=V=>V.strings===void 0;var $9={},g4=(V,C=$9)=>V._$AH=C;var K0=a2(class extends T1{constructor(V){if(super(V),V.type!==p1.PROPERTY&&V.type!==p1.ATTRIBUTE&&V.type!==p1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!S4(V))throw Error("`live` bindings can only contain a single expression")}render(V){return V}update(V,[C]){if(C===Q||C===n)return C;let e=V.element,H=V.name;if(V.type===p1.PROPERTY){if(C===e[H])return Q}else if(V.type===p1.BOOLEAN_ATTRIBUTE){if(!!C===e.hasAttribute(H))return Q}else if(V.type===p1.ATTRIBUTE&&e.getAttribute(H)===C+"")return Q;return g4(V),C}});var b4={fromAttribute(V){return V??""},toAttribute(V){return V||null}};var j5=class extends I1{computeValidity({state:C,renderedControl:e}){let H=e;j2(C)&&!H?(H=this.inputControl||document.createElement("input"),this.inputControl=H):H||(H=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=H);let t=j2(C)?H:null;if(t&&(t.type=C.type),H.value!==C.value&&(H.value=C.value),H.required=C.required,t){let r=C;r.pattern?t.pattern=r.pattern:t.removeAttribute("pattern"),r.min?t.min=r.min:t.removeAttribute("min"),r.max?t.max=r.max:t.removeAttribute("max"),r.step?t.step=r.step:t.removeAttribute("step")}return(C.minLength??-1)>-1?H.setAttribute("minlength",String(C.minLength)):H.removeAttribute("minlength"),(C.maxLength??-1)>-1?H.setAttribute("maxlength",String(C.maxLength)):H.removeAttribute("maxlength"),{validity:H.validity,validationMessage:H.validationMessage}}equals({state:C},{state:e}){let H=C.type===e.type&&C.value===e.value&&C.required===e.required&&C.minLength===e.minLength&&C.maxLength===e.maxLength;return!j2(C)||!j2(e)?H:H&&C.pattern===e.pattern&&C.min===e.min&&C.max===e.max&&C.step===e.step}copy({state:C}){return{state:j2(C)?this.copyInput(C):this.copyTextArea(C),renderedControl:null}}copyInput(C){let{type:e,pattern:H,min:t,max:r,step:i}=C;return{...this.copySharedState(C),type:e,pattern:H,min:t,max:r,step:i}}copyTextArea(C){return{...this.copySharedState(C),type:C.type}}copySharedState({value:C,required:e,minLength:H,maxLength:t}){return{value:C,required:e,minLength:H,maxLength:t}}};function j2(V){return V.type!=="textarea"}var F9=P(z5(c2(M1(a1(m))))),h=class extends F9{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(C){this.getInputOrTextarea().selectionDirection=C}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(C){this.getInputOrTextarea().selectionEnd=C}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(C){this.getInputOrTextarea().selectionStart=C}get valueAsNumber(){let C=this.getInput();return C?C.valueAsNumber:NaN}set valueAsNumber(C){let e=this.getInput();e&&(e.valueAsNumber=C,this.value=e.value)}get valueAsDate(){let C=this.getInput();return C?C.valueAsDate:null}set valueAsDate(C){let e=this.getInput();e&&(e.valueAsDate=C,this.value=e.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...C){this.getInputOrTextarea().setRangeText(...C),this.value=this.getInputOrTextarea().value}setSelectionRange(C,e,H){this.getInputOrTextarea().setSelectionRange(C,e,H)}showPicker(){let C=this.getInput();C&&C.showPicker()}stepDown(C){let e=this.getInput();e&&(e.stepDown(C),this.value=e.value)}stepUp(C){let e=this.getInput();e&&(e.stepUp(C),this.value=e.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(C,e,H){C==="value"&&this.dirty||super.attributeChangedCallback(C,e,H)}render(){let C={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return o`
      <span class="text-field ${S(C)}">
        ${this.renderField()}
      </span>
    `}updated(C){let e=this.getInputOrTextarea().value;this.value!==e&&(this.value=e)}renderField(){return P1`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type==="textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`}renderLeadingIcon(){return o`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return o`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){let C={direction:this.textDirection},e=this.ariaLabel||this.label||n,H=this.autocomplete,t=(this.maxLength??-1)>-1,r=(this.minLength??-1)>-1;if(this.type==="textarea")return o`
        <textarea
          class="input"
          style=${n1(C)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${e}
          autocomplete=${H||n}
          name=${this.name||n}
          ?disabled=${this.disabled}
          maxlength=${t?this.maxLength:n}
          minlength=${r?this.minLength:n}
          placeholder=${this.placeholder||n}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${K0(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;let i=this.renderPrefix(),M=this.renderSuffix(),l=this.inputMode;return o`
      <div class="input-wrapper">
        ${i}
        <input
          class="input"
          style=${n1(C)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${e}
          autocomplete=${H||n}
          name=${this.name||n}
          ?disabled=${this.disabled}
          inputmode=${l||n}
          max=${this.max||n}
          maxlength=${t?this.maxLength:n}
          min=${this.min||n}
          minlength=${r?this.minLength:n}
          pattern=${this.pattern||n}
          placeholder=${this.placeholder||n}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||n}
          type=${this.type}
          .value=${K0(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${M}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(C,e){return C?o`<span class="${S({suffix:e,prefix:!e})}">${C}</span>`:n}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){this.focused=this.inputOrTextarea?.matches(":focus")??!1}handleInput(C){this.dirty=!0,this.value=C.target.value}redispatchEvent(C){r1(this,C)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[A1](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(C){this.value=C}focus(){this.getInputOrTextarea().focus()}[F1](){return new j5(()=>({state:this,renderedControl:this.inputOrTextarea}))}[D1](){return this.inputOrTextarea}[v2](C){C?.preventDefault();let e=this.getErrorText();this.nativeError=!!C,this.nativeErrorText=this.validationMessage,e===this.getErrorText()&&this.field?.reannounceError()}};h.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Boolean,reflect:!0})],h.prototype,"error",void 0);L([a({attribute:"error-text"})],h.prototype,"errorText",void 0);L([a()],h.prototype,"label",void 0);L([a({type:Boolean,attribute:"no-asterisk"})],h.prototype,"noAsterisk",void 0);L([a({type:Boolean,reflect:!0})],h.prototype,"required",void 0);L([a()],h.prototype,"value",void 0);L([a({attribute:"prefix-text"})],h.prototype,"prefixText",void 0);L([a({attribute:"suffix-text"})],h.prototype,"suffixText",void 0);L([a({type:Boolean,attribute:"has-leading-icon"})],h.prototype,"hasLeadingIcon",void 0);L([a({type:Boolean,attribute:"has-trailing-icon"})],h.prototype,"hasTrailingIcon",void 0);L([a({attribute:"supporting-text"})],h.prototype,"supportingText",void 0);L([a({attribute:"text-direction"})],h.prototype,"textDirection",void 0);L([a({type:Number})],h.prototype,"rows",void 0);L([a({type:Number})],h.prototype,"cols",void 0);L([a({reflect:!0})],h.prototype,"inputMode",void 0);L([a()],h.prototype,"max",void 0);L([a({type:Number})],h.prototype,"maxLength",void 0);L([a()],h.prototype,"min",void 0);L([a({type:Number})],h.prototype,"minLength",void 0);L([a({type:Boolean,attribute:"no-spinner"})],h.prototype,"noSpinner",void 0);L([a()],h.prototype,"pattern",void 0);L([a({reflect:!0,converter:b4})],h.prototype,"placeholder",void 0);L([a({type:Boolean,reflect:!0})],h.prototype,"readOnly",void 0);L([a({type:Boolean,reflect:!0})],h.prototype,"multiple",void 0);L([a()],h.prototype,"step",void 0);L([a({reflect:!0})],h.prototype,"type",void 0);L([a({reflect:!0})],h.prototype,"autocomplete",void 0);L([Z()],h.prototype,"dirty",void 0);L([Z()],h.prototype,"focused",void 0);L([Z()],h.prototype,"nativeError",void 0);L([Z()],h.prototype,"nativeErrorText",void 0);L([u(".input")],h.prototype,"inputOrTextarea",void 0);L([u(".field")],h.prototype,"field",void 0);L([R({slot:"leading-icon"})],h.prototype,"leadingIcons",void 0);L([R({slot:"trailing-icon"})],h.prototype,"trailingIcons",void 0);var K5=class extends h{constructor(){super(...arguments),this.fieldTag=L1`md-outlined-field`}};var Y0=d`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`,Wo=Y0.styleSheet;var X0=class extends K5{constructor(){super(...arguments),this.fieldTag=L1`md-outlined-field`}};X0.styles=[Y0,j0];X0=L([c("md-outlined-text-field")],X0);function U(V,C,e,H){return o`<md-outlined-select
    label=${V}
    .value=${String(C)}
    @change=${t=>H(t.target.value)}
  >
    ${e.map(t=>o`<md-select-option value=${String(t.value)} ?selected=${String(t.value)===String(C)}>
          <div slot="headline">${t.label}</div>
        </md-select-option>`)}
  </md-outlined-select>`}function _(V,C,e,H={}){return o`<md-outlined-text-field
    label=${V}
    .value=${C??""}
    type=${H.multiline?"textarea":H.type??"text"}
    rows=${H.rows??2}
    suffix-text=${H.suffix??n}
    supporting-text=${H.supporting??n}
    placeholder=${H.placeholder??n}
    style=${H.mono?"--md-outlined-text-field-input-text-font: ui-monospace, Menlo, Consolas, monospace":n}
    @input=${t=>e(t.target.value)}
  ></md-outlined-text-field>`}function D(V,C,{min:e,max:H,step:t=1,suffix:r=""},i){return o`<div class="slider-field">
    <div class="slider-head"><span>${V}</span><strong>${C}${r}</strong></div>
    <md-slider
      min=${e}
      max=${H}
      step=${t}
      .value=${Number(C)}
      @input=${M=>i(Number(M.target.value))}
    ></md-slider>
  </div>`}function O1(V,C,e){return o`<label class="switch-field">
    <md-switch ?selected=${C} @change=${H=>e(H.target.selected)}></md-switch>
    <span>${V}</span>
  </label>`}function l1(V,C,e){return o`<md-chip-set>
    ${V.map(H=>o`<md-filter-chip
          label=${H.label??""}
          title=${H.title??H.label??""}
          ?selected=${H.value===C}
          @click=${t=>{t.preventDefault(),e(H.value)}}
        >
          ${H.icon?o`<ed-icon slot="icon" .path=${H.icon}></ed-icon>`:n}
        </md-filter-chip>`)}
  </md-chip-set>`}function y4(V,C,e){return o`<div class="icon-choice">
    ${V.map(H=>o`<md-icon-button
        aria-label=${H.title}
        title=${H.title}
        ?selected=${H.value===C}
        @click=${()=>e(H.value)}
      >
        <ed-icon .path=${H.icon}></ed-icon>
      </md-icon-button>`)}
  </div>`}function d1(V,C,e,H){return o`<md-icon-button
    toggle
    aria-label=${C}
    title=${C}
    ?selected=${e}
    @click=${t=>{t.preventDefault(),H(!e)}}
  >
    <ed-icon .path=${V}></ed-icon>
    <ed-icon slot="selected" .path=${V}></ed-icon>
  </md-icon-button>`}var z1=d`
  .slider-field {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .slider-head {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--ed-text-muted);
  }
  .slider-head strong {
    color: var(--ed-text);
    font-weight: 500;
  }
  md-slider {
    width: 100%;
    margin: 0;
  }
  .switch-field {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .field-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .icon-choice {
    display: flex;
    gap: 4px;
  }
  md-icon-button[selected] {
    --md-icon-button-icon-color: var(--md-sys-color-primary);
    background: var(--md-sys-color-secondary-container);
    border-radius: 50%;
  }
`;var J0=[.5,.75,1,1.5,2],D9=new Set(["content_overflow","design_too_tall"]),C7=class extends m{static properties={t:{attribute:!1},preview:{attribute:!1},loading:{type:Boolean},error:{type:String},fixedHeight:{type:Boolean},_zoom:{state:!0}};constructor(){super(),this._zoom=1}static styles=[$,F,d`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        color: var(--ed-text-muted);
        font-size: 0.8125rem;
      }
      .stage {
        flex: 1;
        overflow: auto;
        padding: 20px 12px 32px;
        background:
          radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--ed-text) 10%, transparent) 1px, transparent 0)
          0 0 / 18px 18px;
        border-radius: var(--ed-radius);
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .paper {
        background: #fff;
        box-shadow:
          0 1px 2px rgb(0 0 0 / 20%),
          0 8px 24px rgb(0 0 0 / 18%);
        line-height: 0;
        max-width: none;
        position: relative;
      }
      .paper.continuous {
        /* torn paper edge at the top and bottom of a receipt */
        --tear: 6px;
        padding: var(--tear) 0;
        clip-path: polygon(
          0 var(--tear), 2% 0, 4% var(--tear), 6% 0, 8% var(--tear), 10% 0, 12% var(--tear), 14% 0,
          16% var(--tear), 18% 0, 20% var(--tear), 22% 0, 24% var(--tear), 26% 0, 28% var(--tear),
          30% 0, 32% var(--tear), 34% 0, 36% var(--tear), 38% 0, 40% var(--tear), 42% 0, 44% var(--tear),
          46% 0, 48% var(--tear), 50% 0, 52% var(--tear), 54% 0, 56% var(--tear), 58% 0, 60% var(--tear),
          62% 0, 64% var(--tear), 66% 0, 68% var(--tear), 70% 0, 72% var(--tear), 74% 0, 76% var(--tear),
          78% 0, 80% var(--tear), 82% 0, 84% var(--tear), 86% 0, 88% var(--tear), 90% 0, 92% var(--tear),
          94% 0, 96% var(--tear), 98% 0, 100% var(--tear), 100% calc(100% - var(--tear)),
          98% 100%, 96% calc(100% - var(--tear)), 94% 100%, 92% calc(100% - var(--tear)), 90% 100%,
          88% calc(100% - var(--tear)), 86% 100%, 84% calc(100% - var(--tear)), 82% 100%,
          80% calc(100% - var(--tear)), 78% 100%, 76% calc(100% - var(--tear)), 74% 100%,
          72% calc(100% - var(--tear)), 70% 100%, 68% calc(100% - var(--tear)), 66% 100%,
          64% calc(100% - var(--tear)), 62% 100%, 60% calc(100% - var(--tear)), 58% 100%,
          56% calc(100% - var(--tear)), 54% 100%, 52% calc(100% - var(--tear)), 50% 100%,
          48% calc(100% - var(--tear)), 46% 100%, 44% calc(100% - var(--tear)), 42% 100%,
          40% calc(100% - var(--tear)), 38% 100%, 36% calc(100% - var(--tear)), 34% 100%,
          32% calc(100% - var(--tear)), 30% 100%, 28% calc(100% - var(--tear)), 26% 100%,
          24% calc(100% - var(--tear)), 22% 100%, 20% calc(100% - var(--tear)), 18% 100%,
          16% calc(100% - var(--tear)), 14% 100%, 12% calc(100% - var(--tear)), 10% 100%,
          8% calc(100% - var(--tear)), 6% 100%, 4% calc(100% - var(--tear)), 2% 100%, 0 calc(100% - var(--tear))
        );
      }
      .paper.label {
        border-radius: 6px;
      }
      img {
        display: block;
        image-rendering: pixelated;
      }
      .placeholder {
        color: var(--ed-text-muted);
        padding: 48px 16px;
        text-align: center;
        line-height: 1.4;
      }
      .messages {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        font-size: 0.8125rem;
      }
      .message {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        padding: 8px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
      }
      .message ed-icon {
        --ed-icon-size: 18px;
        color: var(--md-sys-color-error);
      }
      md-linear-progress {
        width: 100%;
        --md-linear-progress-track-height: 3px;
      }
      .spacer {
        flex: 1;
      }
    `];_zoomBy(C){let e=J0.indexOf(this._zoom),H=J0[Math.min(J0.length-1,Math.max(0,e+C))];this._zoom=H}_warningText(C){let{t:e}=this;return D9.has(C.message)?e(`preview.warning.${C.message}`):C.message}render(){let{t:C,preview:e}=this,H=[...(e?.warnings??[]).map(t=>this._warningText(t)),...(e?.template_errors??[]).map(t=>`${C("preview.template_error")}: ${t}`),...this.error?[this.error]:[]];return o`
      <div class="toolbar">
        <span>${e?`${e.width} \xD7 ${e.height} px`:""}</span>
        <span class="spacer"></span>
        <md-icon-button aria-label=${C("preview.zoom_out")} title=${C("preview.zoom_out")} @click=${()=>this._zoomBy(-1)}>
          <ed-icon .path=${i0}></ed-icon>
        </md-icon-button>
        <span>${Math.round(this._zoom*100)}%</span>
        <md-icon-button aria-label=${C("preview.zoom_in")} title=${C("preview.zoom_in")} @click=${()=>this._zoomBy(1)}>
          <ed-icon .path=${o0}></ed-icon>
        </md-icon-button>
      </div>
      ${this.loading?o`<md-linear-progress indeterminate></md-linear-progress>`:n}
      <div class="stage">
        ${e?o`<div class="paper ${this.fixedHeight?"label":"continuous"}">
              <img
                alt=${C("preview.alt")}
                src="data:image/png;base64,${e.image}"
                width=${e.width*this._zoom}
                height=${e.height*this._zoom}
              />
            </div>`:o`<div class="placeholder">${this.error?"":C("preview.empty")}</div>`}
      </div>
      ${H.length?o`<div class="messages">
            ${H.map(t=>o`<div class="message"><ed-icon .path=${J1}></ed-icon><span>${t}</span></div>`)}
          </div>`:n}
    `}};customElements.define("ed-preview",C7);var e7=class extends m{static properties={t:{attribute:!1},hass:{attribute:!1},api:{attribute:!1},status:{attribute:!1},open:{type:Boolean,reflect:!0},document:{attribute:!1},templateId:{type:String},variables:{attribute:!1},name:{type:String},target:{type:String},_values:{state:!0},_printer:{state:!0},_fit:{state:!0},_copies:{state:!0},_preview:{state:!0},_loading:{state:!0},_busy:{state:!0},_error:{state:!0}};constructor(){super(),this.open=!1,this._copies=1,this._refresh=y5(()=>this._loadPreview(),250)}static styles=[$,F,z1,d`
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        width: min(960px, 100vw);
        max-width: 100vw;
        max-height: calc(100dvh - 24px - var(--ed-bottom-inset));
      }
      .body {
        display: grid;
        grid-template-columns: minmax(260px, 340px) 1fr;
        gap: 20px;
        min-height: 320px;
      }
      .body > * {
        min-width: 0;
      }
      @media (max-width: 720px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
        }
        ed-preview {
          min-height: 280px;
        }
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      ed-preview {
        height: 100%;
        min-height: 320px;
      }
      .alert {
        display: flex;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
        font-size: 0.875rem;
      }
      .alert ed-icon {
        color: var(--md-sys-color-error);
        flex: none;
      }
      .alert.info {
        background: var(--md-sys-color-secondary-container);
      }
      .alert.info ed-icon {
        color: var(--ed-primary);
      }
      a {
        color: var(--ed-primary);
      }
    `];willUpdate(C){C.has("open")&&this.open&&(this._values=b5(this.variables,this.hass),this._printer=this.status?.printers?.find(e=>e.id===this.target)?.id??this.status?.printers?.[0]?.id??"",this._copies=1,this._fit=!0,this._error="",this._loadPreview())}_effective(){let C=this.status?.printers?.find(e=>e.id===this._printer);return this._fit===!1?{fit:null,adapted:!1}:A4(this.document,C)}async _loadPreview(){if(this.open){this._loading=!0;try{this._preview=await this.api.preview(this.document,this._values,this._effective().fit),this._error=""}catch(C){this._error=J(C)}finally{this._loading=!1}}}_setValue(C,e){this._values={...this._values,[C]:e},this._refresh()}async _print(){this._busy=!0,this._error="";try{await this.api.print({document:this.document,...this._effective().fit?{fit:this._effective().fit}:{},variables:this._values,copies:this._copies,name:this.name??"",variable_defs:this.variables??[],...this._printer?{printer:this._printer}:{},...this.templateId?{template_id:this.templateId}:{}}),this.dispatchEvent(new CustomEvent("printed",{detail:{template_id:this.templateId},bubbles:!0,composed:!0})),this._close()}catch(C){this._error=J(C)}finally{this._busy=!1}}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}_variableField(C){let{t:e}=this,H=C.label||C.key,t=this._values?.[C.key]??"";switch(C.type){case"multiline":return _(H,t,r=>this._setValue(C.key,r),{multiline:!0,rows:8});case"number":return _(H,String(t),r=>this._setValue(C.key,r===""?"":Number(r)),{type:"number"});case"boolean":return O1(H,t===!0||t==="true",r=>this._setValue(C.key,r));case"date":return _(H,t,r=>this._setValue(C.key,r),{type:"date"});case"todo":return U(H,t,[{value:"",label:e("print.choose_list")},...g5(this.hass,"todo",C.hints)],r=>this._setValue(C.key,r));case"entity":return U(H,t,[{value:"",label:e("print.choose_entity")},...g5(this.hass,C.domain,C.hints)],r=>this._setValue(C.key,r));default:return _(H,t,r=>this._setValue(C.key,r))}}_fitNotice(){let{t:C}=this,{adapted:e,fit:H}=this._effective();if(!e&&this._fit!==!1)return n;let t=H?`${H.width} \xD7 ${H.height??"\u2026"}`:"";return o`<div class="alert info">
      <ed-icon .path=${C1}></ed-icon>
      <span>
        ${this._fit===!1?C("print.fit.off"):C("print.fit.on",{size:t})}
        <a href="#" @click=${r=>{r.preventDefault(),this._fit=this._fit===!1,this._refresh()}}>
          ${this._fit===!1?C("print.fit.enable"):C("print.fit.disable")}
        </a>
      </span>
    </div>`}render(){let{t:C,status:e}=this,H=e?.printers??[],t=!H.length;return o`<md-dialog .open=${this.open} @closed=${r=>r.target===r.currentTarget&&this._close()}>
      <div slot="headline">${C("print.title")}</div>
      <div slot="content" class="body">
        <div class="form">
          ${t?o`<div class="alert"><ed-icon .path=${p2}></ed-icon>
                <span>${C("print.no_printer")}
                  <a href=${e?.printer_integration?.add_printer_url??"/config/integrations"} target="_top">${C("print.add_printer")}</a></span></div>`:U(C("print.printer"),this._printer,H.map(r=>({value:r.id,label:r.name})),r=>{this._printer=r,this._refresh()})}
          ${this._fitNotice()}
          ${(this.variables??[]).map(r=>this._variableField(r))}
          ${D(C("print.copies"),this._copies,{min:1,max:5},r=>this._copies=r)}
          ${this._error?o`<div class="alert"><ed-icon .path=${J1}></ed-icon><span>${this._error}</span></div>`:n}
        </div>
        <ed-preview .t=${C} .preview=${this._preview} .loading=${this._loading} .fixedHeight=${!!this.document?.paper?.height}></ed-preview>
      </div>
      ${this._busy?o`<md-linear-progress slot="actions" indeterminate style="width:100%"></md-linear-progress>`:n}
      <div slot="actions">
        <md-text-button @click=${this._close}>${C("common.cancel")}</md-text-button>
        <md-filled-button ?disabled=${t||this._busy} @click=${this._print}>
          <ed-icon slot="icon" .path=${C1}></ed-icon>${C("print.print")}
        </md-filled-button>
      </div>
    </md-dialog>`}};customElements.define("ed-print-dialog",e7);var O4={"app.title":"ESC/POS Designer","common.back":"Zur\xFCck","common.cancel":"Abbrechen","common.close":"Schlie\xDFen","common.delete":"L\xF6schen","common.menu":"Men\xFC \xF6ffnen","footer.credit":"Anwendung entwickelt von seb5594 (Sebastian Schmidt)","footer.made_with":"Mit \u2764\uFE0F in Deutschland gemacht","footer.integrations":"Weitere Home Assistant Integrationen","footer.apps":"Weitere Home Assistant Apps / Add-ons","footer.support":"Unterst\xFCtze meine Arbeit \u{1F37A}\u2615","footer.version":"Version","fatal.failed.title":"Der Designer konnte nicht geladen werden","fatal.not_loaded.title":"Der Designer ist nicht eingerichtet","fatal.not_loaded.text":"F\xFCge den ESC/POS Thermodrucker Designer unter Einstellungen \u2192 Ger\xE4te & Dienste hinzu und lade diese Seite neu.","fatal.unauthorized.title":"Administratorrechte erforderlich","fatal.unauthorized.text":"Nur Administratoren k\xF6nnen den Designer nutzen. Ein Administrator kann das in den Optionen der Integration \xE4ndern.","toast.saved":"Entwurf gespeichert","toast.deleted":"Entwurf gel\xF6scht","toast.id_copied":"ID kopiert: {id}","toast.printed":"An den Drucker gesendet","banner.install.title":"Die Integration ESC/POS Thermal Printer fehlt","banner.install.text":"Der Designer druckt \xFCber sie. Installiere sie mit HACS, starte Home Assistant neu und komm zur\xFCck.","banner.install.action":"In HACS \xF6ffnen","banner.no_printer.title":"Es ist noch kein Drucker eingerichtet","banner.no_printer.text":"F\xFCge deinen Drucker in der Integration ESC/POS Thermal Printer hinzu, um deine Entw\xFCrfe zu drucken.","banner.no_printer.action":"Drucker hinzuf\xFCgen","gallery.search":"Entw\xFCrfe durchsuchen","gallery.filter.all":"Alle","gallery.filter.favorites":"Favoriten","gallery.filter.mine":"Meine Entw\xFCrfe","gallery.recent":"Zuletzt verwendet","gallery.templates":"Entw\xFCrfe","gallery.empty":"Nichts gefunden. Versuche eine andere Suche oder einen anderen Filter.","gallery.favorite":"Favorit","gallery.more":"Mehr","gallery.edit":"Bearbeiten","gallery.print":"Drucken","gallery.duplicate":"Duplizieren","gallery.copy_id":"ID kopieren","gallery.copy":"Kopie","new.fab":"Neuer Entwurf","new.title":"Entwurf erstellen","new.recent":"Letzte Kreationen","new.recent_empty":"Hier erscheinen deine letzten zehn Entw\xFCrfe.","new.starter.blank":"Text","new.starter.blank.hint":"Mit einer Textzeile beginnen","new.starter.markdown":"Markdown-Skript","new.starter.markdown.hint":"Schreibe es wie eine Notiz","new.starter.label":"Etikett","new.starter.label.hint":"40 \xD7 30 mm mit Rahmen","new.starter.receipt80":"Breiter Beleg","new.starter.receipt80.hint":"80-mm-Papier","category.custom":"Eigene","category.shopping":"Einkauf","category.todo":"Aufgaben","category.qr":"QR-Codes","category.love":"Liebe","category.label":"Etiketten","category.food":"Lebensmittel","category.receipt":"Belege","category.fun":"Spa\xDF","editor.untitled":"Unbenannter Entwurf","editor.unsaved":"Ungespeicherte \xC4nderungen","editor.undo":"R\xFCckg\xE4ngig","editor.redo":"Wiederholen","editor.save":"Speichern","editor.print":"Drucken","editor.tab.elements":"Elemente","editor.tab.properties":"Eigenschaften","editor.tab.preview":"Vorschau","editor.tab.settings":"Entwurf","editor.leave.title":"Ohne Speichern verlassen?","editor.leave.text":"Dieser Entwurf hat ungespeicherte \xC4nderungen.","editor.leave.discard":"Verwerfen","editor.leave.save":"Speichern und verlassen","element.empty":"leer","element.text":"Text","element.text.hint":"Abschnitte mit eigener Schrift und eigenem Stil","element.markdown":"Markdown-Skript","element.markdown.hint":"\xDCberschriften, Listen, Fettdruck, QR-Codes und mehr","element.datetime":"Datum und Uhrzeit","element.datetime.hint":"Heute oder ein verschobenes Datum wie ein Mindesthaltbarkeitsdatum","element.list":"Liste","element.list.hint":"Checkliste aus einer Todo-Liste oder eingetippt","element.divider":"Trennlinie","element.divider.hint":"Eine dekorative Linie","element.qr":"QR-Code","element.qr.hint":"Link, WLAN, Kontakt und mehr","element.barcode":"Barcode","element.barcode.hint":"Code 128, Code 39 oder EAN-13","element.image":"Bild","element.image.hint":"Dein eigenes Bild, f\xFCrs Drucken gerastert","element.sticker":"Sticker","element.sticker.hint":"Ein gro\xDFes Emoji","element.spacer":"Abstand","element.spacer.hint":"Leerer Raum zwischen Elementen","list.add":"Element hinzuf\xFCgen","list.empty":"Noch nichts hier. F\xFCge dein erstes Element hinzu.","list.move_up":"Nach oben","list.move_down":"Nach unten","list.visibility":"Ein- oder ausblenden","list.duplicate":"Duplizieren","preview.alt":"Vorschau des Entwurfs","preview.empty":"Hier erscheint die Vorschau.","preview.zoom_in":"Vergr\xF6\xDFern","preview.zoom_out":"Verkleinern","preview.template_error":"Vorlagenfehler","preview.warning.content_overflow":"Der Inhalt ist h\xF6her als das Etikett und wird abgeschnitten.","preview.warning.design_too_tall":"Der Entwurf ist sehr hoch und wurde gek\xFCrzt.","inspector.nothing_selected":"W\xE4hle ein Element aus, um es zu \xE4ndern.","inspector.content":"Inhalt","inspector.appearance":"Aussehen","inspector.layout":"Layout","inspector.align.left":"Links","inspector.align.center":"Zentriert","inspector.align.right":"Rechts","inspector.margin_top":"Abstand oben","inspector.margin_bottom":"Abstand unten","inspector.hidden":"Dieses Element ausblenden","inspector.line_spacing":"Zeilenabstand","inspector.template_hint":"Home-Assistant-Vorlagen funktionieren hier, zum Beispiel {{ states('sensor.aussen') }} oder {{ vars.name }}.","runs.segment":"Abschnitt","runs.text":"Text","runs.font":"Schrift","runs.size":"Gr\xF6\xDFe","runs.bold":"Fett","runs.italic":"Kursiv","runs.underline":"Unterstrichen","runs.strike":"Durchgestrichen","runs.invert":"Invertiert","runs.emoji":"Emoji einf\xFCgen","runs.add":"Abschnitt hinzuf\xFCgen","emoji.title":"Emoji ausw\xE4hlen","inspector.markdown.source":"Skript","inspector.markdown.syntax":"Syntax-\xDCbersicht","inspector.markdown.snippet.heading":"\xDCberschrift","inspector.markdown.snippet.bold":"Fett","inspector.markdown.snippet.italic":"Kursiv","inspector.markdown.snippet.checkbox":"Checkbox","inspector.markdown.snippet.bullet":"Aufz\xE4hlung","inspector.markdown.snippet.divider":"Trennlinie","inspector.markdown.snippet.center":"Zentriert","inspector.markdown.snippet.qr":"QR-Code","inspector.markdown.snippet.barcode":"Barcode","inspector.markdown.snippet.emoji":"Emoji","inspector.markdown.help.heading":"\xDCberschriften in drei Gr\xF6\xDFen","inspector.markdown.help.inline":"Fett, kursiv, durchgestrichen","inspector.markdown.help.more_inline":"Unterstrichen, invertiert (wei\xDF auf schwarz)","inspector.markdown.help.tasks":"Checklisten-Eintr\xE4ge","inspector.markdown.help.dividers":"Linie, doppelt, Sterne, Punkte, Welle","inspector.markdown.help.align":"Zeilen ausrichten","inspector.markdown.help.tags":"Gr\xF6\xDFe und Schrift eines Zeilenteils","inspector.markdown.help.codes":"QR-Code und Barcode in eigener Zeile","inspector.markdown.help.templates":"Home-Assistant-Vorlagen","inspector.datetime.format":"Format","inspector.datetime.format_hint":"%d Tag, %m Monat, %Y Jahr, %H:%M Uhrzeit, %A Wochentag, %B Monatsname","inspector.datetime.prefix":"Text davor","inspector.datetime.suffix":"Text danach","inspector.datetime.shift":"Datum verschieben","inspector.datetime.days":"Tage ab heute","inspector.datetime.offset.today":"Heute","inspector.datetime.offset.tomorrow":"+1 Tag","inspector.datetime.offset.week":"+1 Woche","inspector.datetime.offset.two_weeks":"+2 Wochen","inspector.datetime.offset.month":"+30 Tage","inspector.datetime.offset.year":"+1 Jahr","inspector.list.kind.todo":"Todo-Liste","inspector.list.kind.static":"Eingetippt","inspector.list.entity":"Todo-Liste","inspector.list.choose":"Liste w\xE4hlen \u2026","inspector.list.from_variable":"Beim Drucken fragen","inspector.list.include_completed":"Erledigte Eintr\xE4ge einschlie\xDFen","inspector.list.items":"Eintr\xE4ge","inspector.list.items_hint":"Einer pro Zeile. Mit [x] beginnen f\xFCr einen abgehakten Eintrag, Notiz nach |","inspector.list.empty_text":"Text f\xFCr eine leere Liste","inspector.list.style.checkbox":"Checkboxen","inspector.list.style.bullet":"Punkte","inspector.list.style.dash":"Striche","inspector.list.style.numbered":"Nummeriert","inspector.list.style.none":"Schlicht","inspector.divider.style.solid":"Linie","inspector.divider.style.dashed":"Gestrichelt","inspector.divider.style.dotted":"Gepunktet","inspector.divider.style.double":"Doppelt","inspector.divider.style.wave":"Welle","inspector.divider.style.zigzag":"Zickzack","inspector.divider.style.stars":"Sterne","inspector.divider.style.hearts":"Herzen","inspector.divider.thickness":"St\xE4rke","inspector.divider.width":"Breite","inspector.qr.preset.link":"Link","inspector.qr.preset.wifi":"WLAN","inspector.qr.preset.contact":"Kontakt","inspector.qr.preset.phone":"Telefon","inspector.qr.preset.email":"E-Mail","inspector.qr.preset.text":"Text","inspector.qr.data":"Inhalt","inspector.qr.caption":"Beschriftung unter dem Code","inspector.qr.size":"Gr\xF6\xDFe","inspector.qr.level":"Fehlerkorrektur","inspector.qr.level_L":"niedrig","inspector.qr.level_M":"mittel","inspector.qr.level_Q":"hoch","inspector.qr.level_H":"h\xF6chste","inspector.barcode.kind.code128":"Code 128","inspector.barcode.kind.code39":"Code 39","inspector.barcode.kind.ean13":"EAN-13","inspector.barcode.hint.code128":"Beliebiger Text ohne Umlaute","inspector.barcode.hint.code39":"Ziffern, Gro\xDFbuchstaben und - . Leerzeichen $ / + %","inspector.barcode.hint.ean13":"12 Ziffern, die Pr\xFCfziffer wird erg\xE4nzt","inspector.barcode.data":"Inhalt","inspector.barcode.height":"H\xF6he","inspector.barcode.module":"Balkenbreite","inspector.barcode.show_text":"Nummer darunter drucken","inspector.image.none":"Noch kein Bild gew\xE4hlt.","inspector.image.choose":"Bild ausw\xE4hlen","inspector.image.width":"Breite","inspector.image.dither":"Foto (gerastert)","inspector.image.threshold":"Strichzeichnung (Schwellenwert)","inspector.image.level":"Schwellenwert","inspector.sticker.choose":"Emoji ausw\xE4hlen","inspector.sticker.emoji":"Emoji","inspector.spacer.height":"H\xF6he","settings.design":"Entwurf","settings.name":"Name","settings.description":"Beschreibung","settings.category":"Kategorie","settings.paper":"Papier","settings.width":"Breite","settings.height":"H\xF6he","settings.height_hint":"Leer f\xFCr eine fortlaufende Rolle","settings.printer_widths":"Deine Drucker","settings.margin":"Rand","settings.frame":"Rahmen","settings.frame_thickness":"St\xE4rke","settings.frame_padding":"Innenabstand","settings.printing":"Drucken","settings.feed":"Leerzeilen nach dem Druck","settings.rotate":"Drehen","settings.mirror":"Spiegeln","settings.invert":"Invertieren (wei\xDF auf schwarz)","settings.variables":"Eingabewerte","settings.variables_hint":"Werte, die vor dem Drucken abgefragt werden. Verwende sie in jedem Text als {{ vars.name }}.","settings.variable.add":"Wert hinzuf\xFCgen","settings.variable.key":"Name","settings.variable.type":"Typ","settings.variable.label":"Beschriftung","settings.variable.default":"Standardwert","paper.58mm":"58-mm-Rolle","paper.80mm":"80-mm-Rolle","paper.label_30x14":"Etikett 30 \xD7 14","paper.label_40x30":"Etikett 40 \xD7 30","paper.label_50x30":"Etikett 50 \xD7 30","paper.label_50x80":"Etikett 50 \xD7 80","paper.custom":"Eigene","frame.none":"Keiner","frame.line":"Linie","frame.double":"Doppelt","frame.rounded":"Abgerundet","frame.dashed":"Gestrichelt","frame.dotted":"Gepunktet","frame.brackets":"Ecken","frame.ticket":"Ticket","frame.hearts":"Herzen","frame.stars":"Sterne","cut.none":"Kein Schnitt","cut.partial":"Teilschnitt","cut.full":"Vollschnitt","variable.text":"Text","variable.multiline":"Langer Text","variable.number":"Zahl","variable.boolean":"Ja / Nein","variable.date":"Datum","variable.todo":"Todo-Liste","print.title":"Drucken","print.printer":"Drucker","print.copies":"Kopien","print.print":"Drucken","print.choose_list":"Liste w\xE4hlen \u2026","print.no_printer":"Es gibt keinen Drucker zum Drucken.","print.add_printer":"Drucker hinzuf\xFCgen","delete.title":"Diesen Entwurf l\xF6schen?","delete.text":"\u201E{name}\u201C wird endg\xFCltig entfernt.","gallery.select":"Ausw\xE4hlen","gallery.selected":"{count} ausgew\xE4hlt","gallery.select_all":"Alle ausw\xE4hlen","gallery.select_hint":"Tippe auf deine eigenen Entw\xFCrfe, um sie auszuw\xE4hlen. Mitgelieferte Entw\xFCrfe lassen sich nicht l\xF6schen.","toast.deleted_many":"{count} Entw\xFCrfe gel\xF6scht","delete.text_many":"{count} Entw\xFCrfe werden endg\xFCltig entfernt.","toast.history_saved":"Als Vorlage gespeichert","toast.history_removed":"Aus dem Verlauf entfernt","gallery.filter.history":"Zuletzt gedruckt ({count})","gallery.history":"Zuletzt gedruckt","history.hint":"Deine letzten Ausdrucke mit den eingegebenen Werten. Drucke sie erneut oder behalte einen als Vorlage.","history.save":"Als Vorlage speichern","history.remove":"Aus dem Verlauf entfernen","category.history":"Zuletzt gedruckt","variable.entity":"Entit\xE4t","print.choose_entity":"Entit\xE4t w\xE4hlen \u2026","settings.variable.domain":"Entit\xE4ts-Domain","settings.variable.domain_hint":"Nur Entit\xE4ten dieser Domain werden angeboten, z. B. weather oder sensor.","print.fit.on":"Auf diesen Drucker angepasst ({size} px).","print.fit.off":"Das Design wird in seiner eigenen Gr\xF6\xDFe gedruckt.","print.fit.disable":"Eigene Gr\xF6\xDFe verwenden","print.fit.enable":"An den Drucker anpassen","target.title":"Zieldrucker","target.any":"Alle Drucker","target.any_hint":"Alle Entw\xFCrfe zeigen, nichts wird angepasst","target.hint":"W\xE4hle den Drucker, f\xFCr den du gestaltest. Die Galerie zeigt dann nur passende Entw\xFCrfe, neue Entw\xFCrfe starten in seiner Gr\xF6\xDFe und das Drucken beginnt mit ihm.","target.label":"Etikettendrucker \xB7 {width} \xD7 {height} Punkte","target.roll":"Rollendrucker \xB7 {width} Punkte breit","target.unknown":"Gr\xF6\xDFe unbekannt","target.hidden":"{count} Entw\xFCrfe passen nicht zu {printer} und sind ausgeblendet.","target.showing_all":"Alle Entw\xFCrfe, auch die, die nicht zu {printer} passen.","target.show_all":"Alle zeigen","target.only_fitting":"Nur passende"};var Y5={"app.title":"ESC/POS Designer","common.back":"Back","common.cancel":"Cancel","common.close":"Close","common.delete":"Delete","common.menu":"Open the menu","footer.credit":"Application developed by seb5594 (Sebastian Schmidt)","footer.made_with":"Made with \u2764\uFE0F in Germany","footer.integrations":"More Home Assistant Integrations","footer.apps":"More Home Assistant Apps / Addons","footer.support":"Support my work \u{1F37A}\u2615","footer.version":"Version","fatal.failed.title":"The designer could not be loaded","fatal.not_loaded.title":"The designer is not set up","fatal.not_loaded.text":"Add the ESC/POS Thermal Printer Designer under Settings \u2192 Devices & services, then reload this page.","fatal.unauthorized.title":"Administrator access required","fatal.unauthorized.text":"Only administrators can use the designer. An administrator can change this in the integration's options.","toast.saved":"Design saved","toast.deleted":"Design deleted","toast.id_copied":"Id copied: {id}","toast.printed":"Sent to the printer","banner.install.title":"The ESC/POS Thermal Printer integration is missing","banner.install.text":"The designer prints through it. Install it with HACS, restart Home Assistant and come back.","banner.install.action":"Open in HACS","banner.no_printer.title":"No printer is set up yet","banner.no_printer.text":"Add your printer to the ESC/POS Thermal Printer integration to print your designs.","banner.no_printer.action":"Add a printer","gallery.search":"Search designs","gallery.filter.all":"All","gallery.filter.favorites":"Favorites","gallery.filter.mine":"My designs","gallery.recent":"Recent designs","gallery.templates":"Designs","gallery.empty":"Nothing found. Try another search or filter.","gallery.favorite":"Favorite","gallery.more":"More","gallery.edit":"Edit","gallery.print":"Print","gallery.duplicate":"Duplicate","gallery.copy_id":"Copy id","gallery.copy":"copy","new.fab":"New design","new.title":"Create a design","new.recent":"Recent creations","new.recent_empty":"Your last ten designs show up here.","new.starter.blank":"Text","new.starter.blank.hint":"Start with a line of text","new.starter.markdown":"Markdown script","new.starter.markdown.hint":"Write it like a note","new.starter.label":"Label","new.starter.label.hint":"40 \xD7 30 mm with a frame","new.starter.receipt80":"Wide receipt","new.starter.receipt80.hint":"80 mm paper","category.custom":"Custom","category.shopping":"Shopping","category.todo":"To-do","category.qr":"QR codes","category.love":"Love","category.label":"Labels","category.food":"Food","category.receipt":"Receipts","category.fun":"Fun","editor.untitled":"Untitled design","editor.unsaved":"Unsaved changes","editor.undo":"Undo","editor.redo":"Redo","editor.save":"Save","editor.print":"Print","editor.tab.elements":"Elements","editor.tab.properties":"Properties","editor.tab.preview":"Preview","editor.tab.settings":"Design","editor.leave.title":"Leave without saving?","editor.leave.text":"You have unsaved changes in this design.","editor.leave.discard":"Discard","editor.leave.save":"Save and leave","element.empty":"empty","element.text":"Text","element.text.hint":"Segments with their own font and style","element.markdown":"Markdown script","element.markdown.hint":"Headings, lists, bold, QR codes and more","element.datetime":"Date and time","element.datetime.hint":"Today, or a shifted date like a best-before date","element.list":"List","element.list.hint":"Checklist, from a to-do list or typed in","element.divider":"Divider","element.divider.hint":"A decorative line","element.qr":"QR code","element.qr.hint":"Link, Wi-Fi, contact and more","element.barcode":"Barcode","element.barcode.hint":"Code 128, Code 39 or EAN-13","element.image":"Picture","element.image.hint":"Your own image, dithered for the printer","element.sticker":"Sticker","element.sticker.hint":"One big emoji","element.spacer":"Space","element.spacer.hint":"Empty room between elements","list.add":"Add element","list.empty":"Nothing here yet. Add your first element.","list.move_up":"Move up","list.move_down":"Move down","list.visibility":"Show or hide","list.duplicate":"Duplicate","preview.alt":"Preview of the design","preview.empty":"The preview appears here.","preview.zoom_in":"Zoom in","preview.zoom_out":"Zoom out","preview.template_error":"Template error","preview.warning.content_overflow":"The content is taller than the label and gets cut off.","preview.warning.design_too_tall":"The design is very tall and was shortened.","inspector.nothing_selected":"Select an element to change it.","inspector.content":"Content","inspector.appearance":"Appearance","inspector.layout":"Layout","inspector.align.left":"Left","inspector.align.center":"Center","inspector.align.right":"Right","inspector.margin_top":"Space above","inspector.margin_bottom":"Space below","inspector.hidden":"Hide this element","inspector.line_spacing":"Line spacing","inspector.template_hint":"Home Assistant templates work here, for example {{ states('sensor.outside') }} or {{ vars.name }}.","runs.segment":"Segment","runs.text":"Text","runs.font":"Font","runs.size":"Size","runs.bold":"Bold","runs.italic":"Italic","runs.underline":"Underline","runs.strike":"Strikethrough","runs.invert":"Inverted","runs.emoji":"Insert emoji","runs.add":"Add segment","emoji.title":"Pick an emoji","inspector.markdown.source":"Script","inspector.markdown.syntax":"Syntax overview","inspector.markdown.snippet.heading":"Heading","inspector.markdown.snippet.bold":"Bold","inspector.markdown.snippet.italic":"Italic","inspector.markdown.snippet.checkbox":"Checkbox","inspector.markdown.snippet.bullet":"Bullet","inspector.markdown.snippet.divider":"Divider","inspector.markdown.snippet.center":"Centered","inspector.markdown.snippet.qr":"QR code","inspector.markdown.snippet.barcode":"Barcode","inspector.markdown.snippet.emoji":"Emoji","inspector.markdown.help.heading":"Headings, three sizes","inspector.markdown.help.inline":"Bold, italic, strikethrough","inspector.markdown.help.more_inline":"Underline, inverted (white on black)","inspector.markdown.help.tasks":"Checklist items","inspector.markdown.help.dividers":"Solid, double, stars, dots, wave","inspector.markdown.help.align":"Align lines","inspector.markdown.help.tags":"Size and font of a part of a line","inspector.markdown.help.codes":"QR code and barcode on their own line","inspector.markdown.help.templates":"Home Assistant templates","inspector.datetime.format":"Format","inspector.datetime.format_hint":"%d day, %m month, %Y year, %H:%M time, %A weekday, %B month name","inspector.datetime.prefix":"Text before","inspector.datetime.suffix":"Text after","inspector.datetime.shift":"Shift the date","inspector.datetime.days":"Days from today","inspector.datetime.offset.today":"Today","inspector.datetime.offset.tomorrow":"+1 day","inspector.datetime.offset.week":"+1 week","inspector.datetime.offset.two_weeks":"+2 weeks","inspector.datetime.offset.month":"+30 days","inspector.datetime.offset.year":"+1 year","inspector.list.kind.todo":"To-do list","inspector.list.kind.static":"Typed in","inspector.list.entity":"To-do list","inspector.list.choose":"Choose a list\u2026","inspector.list.from_variable":"Ask when printing","inspector.list.include_completed":"Include completed items","inspector.list.items":"Items","inspector.list.items_hint":"One per line. Start with [x] for a checked item, add a note after |","inspector.list.empty_text":"Text for an empty list","inspector.list.style.checkbox":"Checkboxes","inspector.list.style.bullet":"Bullets","inspector.list.style.dash":"Dashes","inspector.list.style.numbered":"Numbered","inspector.list.style.none":"Plain","inspector.divider.style.solid":"Solid","inspector.divider.style.dashed":"Dashed","inspector.divider.style.dotted":"Dotted","inspector.divider.style.double":"Double","inspector.divider.style.wave":"Wave","inspector.divider.style.zigzag":"Zigzag","inspector.divider.style.stars":"Stars","inspector.divider.style.hearts":"Hearts","inspector.divider.thickness":"Thickness","inspector.divider.width":"Width","inspector.qr.preset.link":"Link","inspector.qr.preset.wifi":"Wi-Fi","inspector.qr.preset.contact":"Contact","inspector.qr.preset.phone":"Phone","inspector.qr.preset.email":"E-mail","inspector.qr.preset.text":"Text","inspector.qr.data":"Content","inspector.qr.caption":"Caption under the code","inspector.qr.size":"Size","inspector.qr.level":"Error correction","inspector.qr.level_L":"low","inspector.qr.level_M":"medium","inspector.qr.level_Q":"high","inspector.qr.level_H":"highest","inspector.barcode.kind.code128":"Code 128","inspector.barcode.kind.code39":"Code 39","inspector.barcode.kind.ean13":"EAN-13","inspector.barcode.hint.code128":"Any text without umlauts","inspector.barcode.hint.code39":"Digits, capital letters and - . space $ / + %","inspector.barcode.hint.ean13":"12 digits, the check digit is added","inspector.barcode.data":"Content","inspector.barcode.height":"Height","inspector.barcode.module":"Bar width","inspector.barcode.show_text":"Print the number below","inspector.image.none":"No picture chosen yet.","inspector.image.choose":"Choose a picture","inspector.image.width":"Width","inspector.image.dither":"Photo (dither)","inspector.image.threshold":"Line art (threshold)","inspector.image.level":"Threshold","inspector.sticker.choose":"Choose an emoji","inspector.sticker.emoji":"Emoji","inspector.spacer.height":"Height","settings.design":"Design","settings.name":"Name","settings.description":"Description","settings.category":"Category","settings.paper":"Paper","settings.width":"Width","settings.height":"Height","settings.height_hint":"Empty for a continuous roll","settings.printer_widths":"Your printers","settings.margin":"Margin","settings.frame":"Frame","settings.frame_thickness":"Thickness","settings.frame_padding":"Padding","settings.printing":"Printing","settings.feed":"Feed lines after printing","settings.rotate":"Rotate","settings.mirror":"Mirror","settings.invert":"Invert (white on black)","settings.variables":"Fill-in values","settings.variables_hint":"Values asked for before printing. Use them in any text as {{ vars.key }}.","settings.variable.add":"Add a value","settings.variable.key":"Name","settings.variable.type":"Type","settings.variable.label":"Label","settings.variable.default":"Default","paper.58mm":"58 mm roll","paper.80mm":"80 mm roll","paper.label_30x14":"Label 30 \xD7 14","paper.label_40x30":"Label 40 \xD7 30","paper.label_50x30":"Label 50 \xD7 30","paper.label_50x80":"Label 50 \xD7 80","paper.custom":"Custom","frame.none":"None","frame.line":"Line","frame.double":"Double","frame.rounded":"Rounded","frame.dashed":"Dashed","frame.dotted":"Dotted","frame.brackets":"Corners","frame.ticket":"Ticket","frame.hearts":"Hearts","frame.stars":"Stars","cut.none":"No cut","cut.partial":"Partial cut","cut.full":"Full cut","variable.text":"Text","variable.multiline":"Long text","variable.number":"Number","variable.boolean":"Yes / no","variable.date":"Date","variable.todo":"To-do list","print.title":"Print","print.printer":"Printer","print.copies":"Copies","print.print":"Print","print.choose_list":"Choose a list\u2026","print.no_printer":"There is no printer to print on.","print.add_printer":"Add a printer","delete.title":"Delete this design?","delete.text":"\u201C{name}\u201D will be removed for good.","gallery.select":"Select","gallery.selected":"{count} selected","gallery.select_all":"Select all","gallery.select_hint":"Tap your own designs to select them. Built-in designs can't be deleted.","toast.deleted_many":"{count} designs deleted","delete.text_many":"{count} designs will be removed for good.","toast.history_saved":"Saved as a template","toast.history_removed":"Removed from the history","gallery.filter.history":"Recently printed ({count})","gallery.history":"Recently printed","history.hint":"Your last printouts with the values you entered. Print them again or keep one as a template.","history.save":"Save as template","history.remove":"Remove from history","category.history":"Recently printed","variable.entity":"Entity","print.choose_entity":"Choose an entity\u2026","settings.variable.domain":"Entity domain","settings.variable.domain_hint":"Only entities of this domain are offered, e.g. weather or sensor.","print.fit.on":"Sized for this printer ({size} px).","print.fit.off":"Printing the design in its own size.","print.fit.disable":"Use the design's own size","print.fit.enable":"Fit it to the printer","target.title":"Target printer","target.any":"All printers","target.any_hint":"Show every design, nothing is adapted","target.hint":"Pick the printer you design for. The gallery then lists only designs that fit it, new designs start in its size and printing starts with it.","target.label":"Label printer \xB7 {width} \xD7 {height} dots","target.roll":"Roll printer \xB7 {width} dots wide","target.unknown":"Size unknown","target.hidden":"{count} designs don't fit {printer} and are hidden.","target.showing_all":"Showing all designs, including those that don't fit {printer}.","target.show_all":"Show all","target.only_fitting":"Only fitting"};var H7={en:Y5,de:O4},Pa=Object.keys(H7);function t7(V){let C=String(V||"en").toLowerCase(),e=H7[C]??H7[C.split("-")[0]]??Y5;return(H,t={})=>(e[H]??Y5[H]??H).replace(/\{(\w+)\}/g,(i,M)=>M in t?String(t[M]):i)}var X5=class extends N{renderElevationOrOutline(){return o`<md-elevation part="elevation"></md-elevation>`}};var V7=d`:host{--_container-color: var(--md-filled-tonal-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-elevation: var(--md-filled-tonal-button-container-elevation, 0);--_container-height: var(--md-filled-tonal-button-container-height, 40px);--_container-shadow-color: var(--md-filled-tonal-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-tonal-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-tonal-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-tonal-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-tonal-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-tonal-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-tonal-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-tonal-button-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-container-elevation: var(--md-filled-tonal-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-tonal-button-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-filled-tonal-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-filled-tonal-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-tonal-button-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_label-text-font: var(--md-filled-tonal-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-tonal-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-tonal-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-tonal-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-tonal-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-tonal-button-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-filled-tonal-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filled-tonal-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-tonal-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-tonal-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-tonal-button-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-icon-color: var(--md-filled-tonal-button-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-color: var(--md-filled-tonal-button-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-size: var(--md-filled-tonal-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-tonal-button-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_container-shape-start-start: var(--md-filled-tonal-button-container-shape-start-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-tonal-button-container-shape-start-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-tonal-button-container-shape-end-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-tonal-button-container-shape-end-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-tonal-button-leading-space, 24px);--_trailing-space: var(--md-filled-tonal-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-tonal-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-tonal-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-tonal-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-tonal-button-with-trailing-icon-trailing-space, 16px)}
`,za=V7.styleSheet;var r7=class extends X5{};r7.styles=[S1,O2,V7];r7=L([c("md-filled-tonal-button")],r7);var J5=Symbol("isFocusable"),L7=Symbol("privateIsFocusable"),C3=Symbol("externalTabIndex"),e3=Symbol("isUpdatingTabIndex"),H3=Symbol("updateTabIndex");function _4(V){var C,e,H;class t extends V{constructor(){super(...arguments),this[C]=!0,this[e]=null,this[H]=!1}get[J5](){return this[L7]}set[J5](i){this[J5]!==i&&(this[L7]=i,this[H3]())}connectedCallback(){super.connectedCallback(),this[H3]()}attributeChangedCallback(i,M,l){if(i!=="tabindex"){super.attributeChangedCallback(i,M,l);return}if(this.requestUpdate("tabIndex",Number(M??-1)),!this[e3]){if(!this.hasAttribute("tabindex")){this[C3]=null,this[H3]();return}this[C3]=this.tabIndex}}[(C=L7,e=C3,H=e3,H3)](){let i=this[J5]?0:-1,M=this[C3]??i;this[e3]=!0,this.tabIndex=M,this[e3]=!1}}return L([a({noAccessor:!0})],t.prototype,"tabIndex",void 0),t}var i7=Symbol("animateIndicator"),I9=_4(m),o1=class extends I9{get selected(){return this.active}set selected(C){this.active=C}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){let C=o`<div class="indicator"></div>`;return o`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${S(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?n:C}
      </div>
      ${this.fullWidthIndicator?C:n}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(C){await 0,!C.defaultPrevented&&(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),this.click())}handleContentClick(C){C.stopPropagation(),this.click()}[i7](C){if(!this.indicator)return;this.indicator.getAnimations().forEach(H=>{H.cancel()});let e=this.getKeyframes(C);e!==null&&this.indicator.animate(e,{duration:250,easing:j.EMPHASIZED})}getKeyframes(C){let e=z9();if(!this.active)return e?[{opacity:1},{transform:"none"}]:null;let H={},t=C.indicator?.getBoundingClientRect()??{},r=t.left,i=t.width,M=this.indicator.getBoundingClientRect(),l=M.left,s=M.width,p=i/s;return!e&&r!==void 0&&l!==void 0&&!isNaN(p)?H.transform=`translateX(${(r-l).toFixed(4)}px) scaleX(${p.toFixed(4)})`:H.opacity=0,[H,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(let C of this.assignedDefaultNodes){let e=C.nodeType===Node.TEXT_NODE&&!!C.wholeText.match(/\S/);if(C.nodeType===Node.ELEMENT_NODE||e)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}};L([a({type:Boolean,reflect:!0,attribute:"md-tab"})],o1.prototype,"isTab",void 0);L([a({type:Boolean,reflect:!0})],o1.prototype,"active",void 0);L([a({type:Boolean})],o1.prototype,"selected",null);L([a({type:Boolean,attribute:"has-icon"})],o1.prototype,"hasIcon",void 0);L([a({type:Boolean,attribute:"icon-only"})],o1.prototype,"iconOnly",void 0);L([u(".indicator")],o1.prototype,"indicator",void 0);L([Z()],o1.prototype,"fullWidthIndicator",void 0);L([L2({flatten:!0})],o1.prototype,"assignedDefaultNodes",void 0);L([R({slot:"icon",flatten:!0})],o1.prototype,"assignedIcons",void 0);function z9(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}var K2=class extends o1{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}};L([a({type:Boolean,attribute:"inline-icon"})],K2.prototype,"inlineIcon",void 0);var o7=d`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`,AM=o7.styleSheet;var a7=d`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`,vM=a7.styleSheet;var M7=class extends K2{};M7.styles=[a7,o7];M7=L([c("md-primary-tab")],M7);var _1=class extends m{get activeTab(){return this.tabs.find(C=>C.active)??null}set activeTab(C){C&&this.activateTab(C)}get activeTabIndex(){return this.tabs.findIndex(C=>C.active)}set activeTabIndex(C){let e=()=>{let H=this.tabs[C];H&&this.activateTab(H)};if(!this.slotElement){this.updateComplete.then(e);return}e()}get focusedTab(){return this.tabs.find(C=>C.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(C){await this.updateComplete;let{tabs:e}=this;if(C??=this.activeTab,!C||!e.includes(C)||!this.tabsScrollerElement)return;for(let v of this.tabs)await v.updateComplete;let H=C.offsetLeft,t=C.offsetWidth,r=this.scrollLeft,i=this.offsetWidth,M=48,l=H-M,s=H+t-i+M,p=Math.min(l,Math.max(s,r)),A=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:A,top:0,left:p})}render(){return o`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(C){let e=C.target;await 0,!(C.defaultPrevented||!N9(e)||e.active)&&this.activateTab(e)}activateTab(C){let{tabs:e}=this,H=this.activeTab;if(!(!e.includes(C)||H===C)){for(let t of e)t.active=t===C;if(H){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(let r of e)r.active=r===H;return}C[i7](H)}this.updateFocusableTab(C),this.scrollToTab(C)}}updateFocusableTab(C){for(let e of this.tabs)e.tabIndex=e===C?0:-1}async handleKeydown(C){await 0;let e=C.key==="ArrowLeft",H=C.key==="ArrowRight",t=C.key==="Home",r=C.key==="End";if(C.defaultPrevented||!e&&!H&&!t&&!r)return;let{tabs:i}=this;if(i.length<2)return;C.preventDefault();let M;if(t||r)M=t?0:i.length-1;else{let p=getComputedStyle(this).direction==="rtl"?e:H,{focusedTab:A}=this;if(!A)M=p?0:i.length-1;else{let v=this.tabs.indexOf(A);M=p?v+1:v-1,M>=i.length?M=0:M<0&&(M=i.length-1)}}let l=i[M];l.focus(),this.autoActivate?this.activateTab(l):this.updateFocusableTab(l)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;let{activeTab:C}=this;C&&this.updateFocusableTab(C)}handleSlotChange(){let C=this.tabs[0];!this.activeTab&&C&&this.activateTab(C),this.scrollToTab(this.activeTab)}};L([R({flatten:!0,selector:"[md-tab]"})],_1.prototype,"tabs",void 0);L([a({type:Number,attribute:"active-tab-index"})],_1.prototype,"activeTabIndex",null);L([a({type:Boolean,attribute:"auto-activate"})],_1.prototype,"autoActivate",void 0);L([u(".tabs")],_1.prototype,"tabsScrollerElement",void 0);L([u("slot")],_1.prototype,"slotElement",void 0);function N9(V){return V instanceof HTMLElement&&V.hasAttribute("md-tab")}var n7=d`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`,PM=n7.styleSheet;var l7=class extends _1{};l7.styles=[n7];l7=L([c("md-tabs")],l7);var W9=P(m),Y=class extends W9{constructor(){super(...arguments),this.disabled=!1,this.type="menuitem",this.href="",this.target="",this.keepOpen=!1,this.selected=!1,this.menuItemController=new x2(this,{getHeadlineElements:()=>this.headlineElements,getSupportingTextElements:()=>this.supportingTextElements,getDefaultElements:()=>this.defaultElements,getInteractiveElement:()=>this.listItemRoot})}get typeaheadText(){return this.menuItemController.typeaheadText}set typeaheadText(C){this.menuItemController.setTypeaheadText(C)}render(){return this.renderListItem(o`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(C){let e=this.type==="link",H;switch(this.menuItemController.tagName){case"a":H=L1`a`;break;case"button":H=L1`button`;break;default:case"li":H=L1`li`;break}let t=e&&this.target?this.target:n;return P1`
      <${H}
        id="item"
        tabindex=${this.disabled&&!e?-1:0}
        role=${this.menuItemController.role}
        aria-label=${this.ariaLabel||n}
        aria-selected=${this.ariaSelected||n}
        aria-checked=${this.ariaChecked||n}
        aria-expanded=${this.ariaExpanded||n}
        aria-haspopup=${this.ariaHasPopup||n}
        class="list-item ${S(this.getRenderClasses())}"
        href=${this.href||n}
        target=${t}
        @click=${this.menuItemController.onClick}
        @keydown=${this.menuItemController.onKeydown}
      >${C}</${H}>
    `}renderRipple(){return o` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`}renderFocusRing(){return o` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}getRenderClasses(){return{disabled:this.disabled,selected:this.selected}}renderBody(){return o`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}focus(){this.listItemRoot?.focus()}};Y.shadowRootOptions={...m.shadowRootOptions,delegatesFocus:!0};L([a({type:Boolean,reflect:!0})],Y.prototype,"disabled",void 0);L([a()],Y.prototype,"type",void 0);L([a()],Y.prototype,"href",void 0);L([a()],Y.prototype,"target",void 0);L([a({type:Boolean,attribute:"keep-open"})],Y.prototype,"keepOpen",void 0);L([a({type:Boolean})],Y.prototype,"selected",void 0);L([u(".list-item")],Y.prototype,"listItemRoot",void 0);L([R({slot:"headline"})],Y.prototype,"headlineElements",void 0);L([R({slot:"supporting-text"})],Y.prototype,"supportingTextElements",void 0);L([L2({slot:""})],Y.prototype,"defaultElements",void 0);L([a({attribute:"typeahead-text"})],Y.prototype,"typeaheadText",null);var d7=class extends Y{};d7.styles=[Q2];d7=L([c("md-menu-item")],d7);var w4={text:B2,markdown:D2,datetime:w2,list:e2,divider:M0,qr:n0,barcode:K3,image:$2,sticker:C2,spacer:q3},s7=class extends m{static properties={t:{attribute:!1},elements:{attribute:!1},selected:{type:Number},_dragFrom:{state:!0},_dragOver:{state:!0}};static styles=[$,F,d`
      :host {
        display: block;
      }
      ul {
        list-style: none;
        margin: 0 0 12px;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      li {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
        cursor: pointer;
        user-select: none;
      }
      li:hover {
        border-color: color-mix(in srgb, var(--ed-primary) 50%, var(--ed-line));
      }
      li[selected] {
        border-color: var(--ed-primary);
        background: var(--md-sys-color-secondary-container);
      }
      li[hidden-element] .label {
        opacity: 0.45;
        text-decoration: line-through;
      }
      li[drop-target] {
        outline: 2px dashed var(--ed-primary);
      }
      .type-icon {
        color: var(--ed-primary);
      }
      .label {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        line-height: 1.25;
        padding: 6px 4px;
      }
      .label small {
        color: var(--ed-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .actions {
        display: none;
        flex: none;
      }
      li:hover .actions,
      li[selected] .actions,
      li:focus-within .actions {
        display: flex;
      }
      .actions md-icon-button {
        --md-icon-button-icon-size: 18px;
        --md-icon-button-state-layer-height: 32px;
        --md-icon-button-state-layer-width: 32px;
      }
      .empty {
        text-align: center;
        padding: 24px 12px;
        color: var(--ed-text-muted);
      }
      .add {
        position: relative;
      }
    `];_emit(C,e={}){this.dispatchEvent(new CustomEvent(C,{detail:e,bubbles:!0,composed:!0}))}_drop(C,e){C.preventDefault(),this._dragFrom!==void 0&&this._dragFrom!==e&&this._emit("move",{from:this._dragFrom,to:e}),this._dragFrom=void 0,this._dragOver=void 0}_row(C,e){let{t:H}=this,t=d4(C);return o`<li
      ?selected=${e===this.selected}
      ?hidden-element=${C.hidden}
      ?drop-target=${this._dragOver===e}
      draggable="true"
      @click=${()=>this._emit("select",{index:e})}
      @dragstart=${()=>this._dragFrom=e}
      @dragover=${r=>{r.preventDefault(),this._dragOver=e}}
      @dragleave=${()=>this._dragOver=void 0}
      @drop=${r=>this._drop(r,e)}
      @dragend=${()=>{this._dragFrom=void 0,this._dragOver=void 0}}
    >
      <ed-icon class="type-icon" .path=${w4[C.type]}></ed-icon>
      <span class="label">
        <span>${H(`element.${C.type}`)}</span>
        <small>${t||H("element.empty")}</small>
      </span>
      <span class="actions" @click=${r=>r.stopPropagation()}>
        <md-icon-button aria-label=${H("list.move_up")} title=${H("list.move_up")} ?disabled=${e===0} @click=${()=>this._emit("move",{from:e,to:e-1})}>
          <ed-icon .path=${j3}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${H("list.move_down")} title=${H("list.move_down")} ?disabled=${e===this.elements.length-1} @click=${()=>this._emit("move",{from:e,to:e+1})}>
          <ed-icon .path=${G3}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${H("list.visibility")} title=${H("list.visibility")} @click=${()=>this._emit("toggle-hidden",{index:e})}>
          <ed-icon .path=${C.hidden?C0:J3}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${H("list.duplicate")} title=${H("list.duplicate")} @click=${()=>this._emit("duplicate",{index:e})}>
          <ed-icon .path=${k2}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${H("common.delete")} title=${H("common.delete")} @click=${()=>this._emit("remove",{index:e})}>
          <ed-icon .path=${m1}></ed-icon>
        </md-icon-button>
      </span>
    </li>`}render(){let{t:C}=this;return o`
      ${this.elements.length?o`<ul>${this.elements.map((e,H)=>this._row(e,H))}</ul>`:o`<div class="empty">${C("list.empty")}</div>`}
      <div class="add">
        <md-filled-tonal-button id="add-button" @click=${()=>this.renderRoot.querySelector("#add-menu").open=!this.renderRoot.querySelector("#add-menu").open}>
          <ed-icon slot="icon" .path=${u1}></ed-icon>${C("list.add")}
        </md-filled-tonal-button>
        <md-menu id="add-menu" anchor="add-button">
          ${n4.map(e=>o`<md-menu-item @click=${()=>this._emit("add",{type:e})}>
                <ed-icon slot="start" .path=${w4[e]}></ed-icon>
                <div slot="headline">${C(`element.${e}`)}</div>
                <div slot="supporting-text">${C(`element.${e}.hint`)}</div>
              </md-menu-item>`)}
        </md-menu>
      </div>
    `}};customElements.define("ed-element-list",s7);var N1=class extends t1{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(C){let{ariaLabel:e}=this;return this.href?o`
        <a
          class="primary action"
          id="link"
          aria-label=${e||n}
          href=${this.href}
          download=${this.download||n}
          target=${this.target||n}
          >${C}</a
        >
      `:o`
      <button
        class="primary action"
        id="button"
        aria-label=${e||n}
        aria-disabled=${this.softDisabled||n}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${C}</button
      >
    `}renderOutline(){return this.elevated?o`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}};L([a({type:Boolean})],N1.prototype,"elevated",void 0);L([a()],N1.prototype,"href",void 0);L([a()],N1.prototype,"download",void 0);L([a()],N1.prototype,"target",void 0);var p7=d`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`,fn=p7.styleSheet;var A7=class extends N1{};A7.styles=[W2,N2,p7];A7=L([c("md-assist-chip")],A7);var W1=V=>V.split(/\s+/).filter(Boolean),m7=[{id:"smileys",label:"\u{1F600}",emoji:W1("\u{1F600} \u{1F603} \u{1F604} \u{1F601} \u{1F606} \u{1F605} \u{1F602} \u{1F923} \u{1F60A} \u{1F607} \u{1F642} \u{1F609} \u{1F60D} \u{1F970} \u{1F618} \u{1F60B} \u{1F61C} \u{1F92A} \u{1F60E} \u{1F913} \u{1F973} \u{1F929} \u{1F60F} \u{1F634} \u{1F914} \u{1F917} \u{1F644} \u{1F62C} \u{1F622} \u{1F62D} \u{1F621} \u{1F97A} \u{1F631} \u{1F637} \u{1F912} \u{1F920} \u{1F921} \u{1F47B} \u{1F480} \u{1F47D} \u{1F916} \u{1F63A} \u{1F63B}")},{id:"people",label:"\u{1F44B}",emoji:W1("\u{1F44B} \u{1F91A} \u270B \u{1F44C} \u270C \u{1F91E} \u{1F91F} \u{1F918} \u{1F44D} \u{1F44E} \u{1F44A} \u270A \u{1F44F} \u{1F64C} \u{1F64F} \u{1F4AA} \u{1F440} \u{1F442} \u{1F443} \u{1F476} \u{1F466} \u{1F467} \u{1F468} \u{1F469} \u{1F474} \u{1F475} \u{1F483} \u{1F57A} \u{1F3C3} \u{1F6B6} \u{1F9D1}\u200D\u{1F373} \u{1F468}\u200D\u{1F373} \u{1F469}\u200D\u{1F4BB} \u{1F9D1}\u200D\u{1F3A8} \u{1F481} \u{1F64B} \u{1F937}")},{id:"nature",label:"\u{1F436}",emoji:W1("\u{1F436} \u{1F431} \u{1F42D} \u{1F439} \u{1F430} \u{1F98A} \u{1F43B} \u{1F43C} \u{1F428} \u{1F42F} \u{1F981} \u{1F42E} \u{1F437} \u{1F438} \u{1F435} \u{1F414} \u{1F427} \u{1F426} \u{1F986} \u{1F989} \u{1F43A} \u{1F434} \u{1F984} \u{1F41D} \u{1F98B} \u{1F40C} \u{1F41E} \u{1F422} \u{1F40D} \u{1F419} \u{1F41F} \u{1F42C} \u{1F433} \u{1F332} \u{1F333} \u{1F334} \u{1F335} \u{1F337} \u{1F338} \u{1F339} \u{1F33B} \u{1F340} \u{1F341} \u{1F308} \u2600 \u26C5 \u2601 \u2744 \u26C4 \u{1F525} \u{1F4A7} \u{1F319} \u2B50 \u{1F30D}")},{id:"food",label:"\u{1F355}",emoji:W1("\u{1F34F} \u{1F34E} \u{1F350} \u{1F34A} \u{1F34B} \u{1F34C} \u{1F349} \u{1F347} \u{1F353} \u{1F352} \u{1F351} \u{1F96D} \u{1F34D} \u{1F965} \u{1F95D} \u{1F345} \u{1F951} \u{1F346} \u{1F954} \u{1F955} \u{1F33D} \u{1F336} \u{1F952} \u{1F966} \u{1F344} \u{1F95C} \u{1F35E} \u{1F950} \u{1F956} \u{1F9C0} \u{1F95A} \u{1F373} \u{1F953} \u{1F969} \u{1F357} \u{1F356} \u{1F32D} \u{1F354} \u{1F35F} \u{1F355} \u{1F32E} \u{1F957} \u{1F35D} \u{1F35C} \u{1F363} \u{1F364} \u{1F35A} \u{1F366} \u{1F369} \u{1F36A} \u{1F382} \u{1F370} \u{1F36B} \u{1F36C} \u{1F36F} \u{1F95B} \u2615 \u{1F375} \u{1F37A} \u{1F377} \u{1F942} \u{1F378} \u{1F9C3} \u{1F9C2}")},{id:"activities",label:"\u26BD",emoji:W1("\u26BD \u{1F3C0} \u{1F3C8} \u26BE \u{1F3BE} \u{1F3D0} \u{1F3D3} \u{1F3B1} \u{1F3AF} \u{1F3AE} \u{1F3B2} \u{1F9E9} \u{1F3A8} \u{1F3AC} \u{1F3A4} \u{1F3A7} \u{1F3B8} \u{1F3B9} \u{1F941} \u{1F3BB} \u{1F3C6} \u{1F947} \u{1F3C5} \u{1F381} \u{1F388} \u{1F389} \u{1F38A} \u{1F384} \u{1F383} \u{1F380} \u{1F382}")},{id:"travel",label:"\u{1F697}",emoji:W1("\u{1F697} \u{1F695} \u{1F68C} \u{1F691} \u{1F692} \u{1F69A} \u{1F6B2} \u{1F6F5} \u{1F3CD} \u{1F682} \u2708 \u{1F680} \u{1F681} \u26F5 \u{1F6A2} \u{1F3E0} \u{1F3E1} \u{1F3E2} \u{1F3E5} \u{1F3EB} \u26EA \u{1F3F0} \u{1F5FC} \u{1F5FD} \u26FA \u{1F30B} \u{1F3D6} \u{1F5FA} \u{1F9ED} \u26FD \u{1F6A6} \u{1F17F}")},{id:"objects",label:"\u{1F4A1}",emoji:W1("\u231A \u{1F4F1} \u{1F4BB} \u{1F5A5} \u{1F5A8} \u{1F4F7} \u{1F4FA} \u{1F4FB} \u23F0 \u23F3 \u{1F4A1} \u{1F526} \u{1F50B} \u{1F50C} \u{1F9EF} \u{1F9F0} \u{1F527} \u{1F528} \u{1F9F2} \u{1F511} \u{1F512} \u{1F513} \u{1F6AA} \u{1F6CF} \u{1F6CB} \u{1F6BF} \u{1F6C1} \u{1F6BD} \u{1F9FB} \u{1F9FC} \u{1F9FD} \u{1F9F4} \u{1F6D2} \u{1F4B0} \u{1F4B3} \u{1F48E} \u2709 \u{1F4E6} \u{1F4EB} \u{1F4CC} \u{1F4CE} \u2702 \u{1F4DD} \u{1F4D6} \u{1F4DA} \u{1F4C5} \u{1F4DE} \u{1F514} \u{1F515} \u{1F50D} \u{1F3F7} \u{1F9EA} \u{1F48A} \u{1F489} \u{1FA79} \u{1FA7A} \u{1F9F8}")},{id:"symbols",label:"\u2764\uFE0F",emoji:W1("\u2764 \u{1F9E1} \u{1F49B} \u{1F49A} \u{1F499} \u{1F49C} \u{1F5A4} \u{1F90D} \u{1F494} \u{1F495} \u{1F496} \u{1F497} \u{1F498} \u{1F49D} \u2728 \u2B50 \u{1F31F} \u{1F4AB} \u26A1 \u2705 \u274C \u2753 \u2757 \u26A0 \u26D4 \u{1F6AB} \u267B \u2795 \u2796 \u27A1 \u2B05 \u2B06 \u2B07 \u{1F534} \u{1F7E0} \u{1F7E1} \u{1F7E2} \u{1F535} \u{1F7E3} \u26AB \u26AA \u2B1B \u2B1C \u{1F53A} \u{1F53B} \u2660 \u2665 \u2666 \u2663 \u2714 \u2716 \u2122 \xA9 \xAE \u{1F197} \u{1F195} \u{1F193} \u{1F51D}")}];var c7=class extends m{static properties={t:{attribute:!1},open:{type:Boolean,reflect:!0},_category:{state:!0}};constructor(){super(),this.open=!1,this._category=0}static styles=[$,F,d`
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        max-width: min(520px, calc(100vw - 32px));
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
        gap: 2px;
        max-height: 46vh;
        overflow: auto;
      }
      .grid button {
        font-size: 1.6rem;
        line-height: 1;
        padding: 6px 0;
        border: 0;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
        font-family: "Noto Emoji", "Segoe UI Emoji", "Apple Color Emoji", sans-serif;
      }
      .grid button:hover,
      .grid button:focus-visible {
        background: var(--md-sys-color-secondary-container);
        outline: none;
      }
      md-tabs {
        --md-primary-tab-container-color: transparent;
      }
    `];_pick(C){this.dispatchEvent(new CustomEvent("emoji-picked",{detail:{emoji:C},bubbles:!0,composed:!0})),this._close()}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}render(){let{t:C}=this;return o`<md-dialog .open=${this.open} @closed=${e=>e.target===e.currentTarget&&this._close()}>
      <div slot="headline">${C("emoji.title")}</div>
      <div slot="content">
        <md-tabs @change=${e=>this._category=e.target.activeTabIndex}>
          ${m7.map((e,H)=>o`<md-primary-tab ?active=${H===this._category} aria-label=${e.id}
                >${e.label}</md-primary-tab
              >`)}
        </md-tabs>
        <div class="grid" role="listbox">
          ${m7[this._category].emoji.map(e=>o`<button type="button" @click=${()=>this._pick(e)}>${e}</button>`)}
        </div>
      </div>
      <div slot="actions"><md-text-button @click=${this._close}>${C("common.close")}</md-text-button></div>
    </md-dialog>`}};customElements.define("ed-emoji-picker",c7);var v7=class extends m{static properties={t:{attribute:!1},runs:{attribute:!1},fonts:{attribute:!1},_emojiFor:{state:!0}};static styles=[$,F,z1,d`
      :host {
        display: block;
      }
      .run {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        margin-bottom: 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
      }
      .run-head {
        display: flex;
        align-items: center;
        gap: 2px;
        flex-wrap: wrap;
      }
      .run-head .index {
        font-size: 0.75rem;
        color: var(--ed-text-muted);
        margin-right: 6px;
      }
      .selects {
        display: grid;
        grid-template-columns: 1fr 120px;
        gap: 10px;
      }
      .preview-chip {
        font-size: 0.75rem;
        color: var(--ed-text-muted);
      }
    `];_emit(C){this.dispatchEvent(new CustomEvent("runs-change",{detail:{runs:C},bubbles:!0,composed:!0}))}_patch(C,e){this._emit(this.runs.map((H,t)=>t===C?{...H,...e}:H))}_remove(C){let e=this.runs.filter((H,t)=>t!==C);this._emit(e.length?e:[{text:"",...m2}])}_add(){let C=this.runs.at(-1)??m2;this._emit([...this.runs,{...C,text:""}])}_insertEmoji(C){let e=this._emojiFor;e!==void 0&&this._patch(e,{text:this.runs[e].text+C})}_renderRun(C,e){let{t:H}=this,t=R1.includes(C.size)?R1:[...R1,C.size].sort((r,i)=>r-i);return o`<div class="run">
      <div class="run-head">
        <span class="index">${H("runs.segment")} ${e+1}</span>
        ${d1(T2,H("runs.bold"),C.bold,r=>this._patch(e,{bold:r}))}
        ${d1(E2,H("runs.italic"),C.italic,r=>this._patch(e,{italic:r}))}
        ${d1(R2,H("runs.underline"),C.underline,r=>this._patch(e,{underline:r}))}
        ${d1(P2,H("runs.strike"),C.strike,r=>this._patch(e,{strike:r}))}
        ${d1(F2,H("runs.invert"),C.invert,r=>this._patch(e,{invert:r}))}
        <span class="grow"></span>
        <md-icon-button aria-label=${H("runs.emoji")} title=${H("runs.emoji")} @click=${()=>this._emojiFor=e}>
          <ed-icon .path=${C2}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${H("common.delete")} title=${H("common.delete")} @click=${()=>this._remove(e)}>
          <ed-icon .path=${m1}></ed-icon>
        </md-icon-button>
      </div>
      ${_(H("runs.text"),C.text,r=>this._patch(e,{text:r}),{multiline:!0,rows:2})}
      <div class="selects">
        ${U(H("runs.font"),C.font,this.fonts.map(r=>({value:r.id,label:r.label})),r=>this._patch(e,{font:r}))}
        ${U(H("runs.size"),C.size,t.map(r=>({value:r,label:String(r)})),r=>this._patch(e,{size:Number(r)}))}
      </div>
    </div>`}render(){let{t:C}=this;return o`
      ${this.runs.map((e,H)=>this._renderRun(e,H))}
      <md-filled-tonal-button @click=${this._add}>
        <ed-icon slot="icon" .path=${u1}></ed-icon>${C("runs.add")}
      </md-filled-tonal-button>
      <ed-emoji-picker
        .t=${C}
        .open=${this._emojiFor!==void 0}
        @emoji-picked=${e=>this._insertEmoji(e.detail.emoji)}
        @closed=${()=>this._emojiFor=void 0}
      ></ed-emoji-picker>
    `}};customElements.define("ed-run-editor",v7);var U9=["solid","dashed","dotted","double","wave","zigzag","stars","hearts"],G9=["checkbox","bullet","dash","numbered","none"],q9=["code128","code39","ean13"],Q9={link:"https://example.com",wifi:"WIFI:T:WPA;S:NetworkName;P:Password;;",contact:`BEGIN:VCARD
VERSION:3.0
FN:Name
TEL:+49 123 456789
EMAIL:name@example.com
END:VCARD`,phone:"tel:+49123456789",email:"mailto:name@example.com",text:"Hello!"},j9=[["today",0],["tomorrow",1],["week",7],["two_weeks",14],["month",30],["year",365]],K9=[["heading","# "],["bold","**bold**"],["italic","*italic*"],["checkbox","- [ ] "],["bullet","- "],["divider",`
---
`],["center",`<center>
text
</center>`],["qr","[[qr:https://example.com]]"],["barcode","[[barcode:code128:12345]]"]],u7=class V extends m{static properties={t:{attribute:!1},hass:{attribute:!1},element:{attribute:!1},fonts:{attribute:!1},variables:{attribute:!1},_emojiOpen:{state:!0},_snippetTarget:{state:!0}};static styles=[$,F,z1,d`
      :host {
        display: block;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 0.8125rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ed-text-muted);
      }
      .hint {
        font-size: 0.8125rem;
        color: var(--ed-text-muted);
        line-height: 1.4;
      }
      .style-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2px;
      }
      .picture {
        max-width: 100%;
        max-height: 140px;
        image-rendering: auto;
        border: 1px solid var(--ed-line);
        border-radius: 8px;
        background: #fff;
      }
      details {
        border: 1px solid var(--ed-line);
        border-radius: 12px;
        padding: 8px 12px;
      }
      details summary {
        cursor: pointer;
        color: var(--ed-text-muted);
        font-size: 0.875rem;
      }
      code {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        background: var(--ed-container);
        padding: 1px 5px;
        border-radius: 6px;
      }
      table.syntax {
        border-collapse: collapse;
        font-size: 0.8125rem;
        margin-top: 8px;
      }
      table.syntax td {
        padding: 3px 12px 3px 0;
        vertical-align: top;
      }
    `];_patch(C){this.dispatchEvent(new CustomEvent("element-change",{detail:{patch:C},bubbles:!0,composed:!0}))}_patchSource(C){this._patch({source:{...this.element.source,...C}})}_fontOptions(){return this.fonts.map(C=>({value:C.id,label:C.label}))}_sizeOptions(C){return(R1.includes(C)?R1:[...R1,C].sort((H,t)=>H-t)).map(H=>({value:H,label:String(H)}))}_alignChips(){let{t:C,element:e}=this;return y4([{value:"left",icon:H0,title:C("inspector.align.left")},{value:"center",icon:e0,title:C("inspector.align.center")},{value:"right",icon:t0,title:C("inspector.align.right")}],e.align,H=>this._patch({align:H}))}_styleControls(C){let{t:e}=this;return o`
      <div class="field-pair">
        ${U(e("runs.font"),C.font,this._fontOptions(),H=>this._patch({font:H}))}
        ${U(e("runs.size"),C.size,this._sizeOptions(C.size),H=>this._patch({size:Number(H)}))}
      </div>
      <div class="style-row">
        ${d1(T2,e("runs.bold"),C.bold,H=>this._patch({bold:H}))}
        ${d1(E2,e("runs.italic"),C.italic,H=>this._patch({italic:H}))}
        ${"underline"in C?d1(R2,e("runs.underline"),C.underline,H=>this._patch({underline:H})):n}
        ${"strike"in C?d1(P2,e("runs.strike"),C.strike,H=>this._patch({strike:H})):n}
        ${"invert"in C?d1(F2,e("runs.invert"),C.invert,H=>this._patch({invert:H})):n}
      </div>
    `}_text(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      <ed-run-editor
        .t=${e}
        .runs=${C.runs}
        .fonts=${this.fonts}
        @runs-change=${H=>this._patch({runs:H.detail.runs})}
      ></ed-run-editor>
      <p class="hint">${e("inspector.template_hint")}</p>
      ${D(e("inspector.line_spacing"),C.line_spacing??1.15,{min:.8,max:2,step:.05},H=>this._patch({line_spacing:H}))}
    </section>`}_insertSnippet(C){let e=this.renderRoot.querySelector("#markdown-source");if(!e)return;let H=e.selectionStart??e.value.length,t=e.selectionEnd??H;e.setRangeText(C,H,t,"end"),this._patch({source:e.value}),e.focus()}_markdown(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      <md-outlined-text-field
        id="markdown-source"
        type="textarea"
        rows="10"
        label=${e("inspector.markdown.source")}
        .value=${C.source}
        style="--md-outlined-text-field-input-text-font: ui-monospace, Menlo, Consolas, monospace"
        @input=${H=>this._patch({source:H.target.value})}
      ></md-outlined-text-field>
      <md-chip-set>
        ${K9.map(([H,t])=>o`<md-assist-chip label=${e(`inspector.markdown.snippet.${H}`)} @click=${()=>this._insertSnippet(t)}></md-assist-chip>`)}
        <md-assist-chip label=${e("inspector.markdown.snippet.emoji")} @click=${()=>this._snippetTarget="markdown"}>
          <ed-icon slot="icon" .path=${C2}></ed-icon>
        </md-assist-chip>
      </md-chip-set>
      <div class="field-pair">
        ${U(e("runs.font"),C.font,this._fontOptions(),H=>this._patch({font:H}))}
        ${U(e("runs.size"),C.size,this._sizeOptions(C.size),H=>this._patch({size:Number(H)}))}
      </div>
      <details>
        <summary>${e("inspector.markdown.syntax")}</summary>
        <table class="syntax">
          ${[["# Title","inspector.markdown.help.heading"],["**bold** *italic* ~~strike~~","inspector.markdown.help.inline"],["++underline++ ==inverted==","inspector.markdown.help.more_inline"],["- [ ] task   - [x] done","inspector.markdown.help.tasks"],["---  ===  ***  ...  ~~~","inspector.markdown.help.dividers"],["&lt;center&gt; \u2026 &lt;/center&gt;","inspector.markdown.help.align"],["&lt;size=40&gt; &lt;font=script&gt;","inspector.markdown.help.tags"],["[[qr:text]]  [[barcode:code128:123]]","inspector.markdown.help.codes"],["{{ states('sensor.x') }}","inspector.markdown.help.templates"]].map(([H,t])=>o`<tr><td><code .innerHTML=${H}></code></td><td>${e(t)}</td></tr>`)}
        </table>
      </details>
    </section>`}_datetime(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      ${l1(o4.map(H=>({value:H,label:H})),C.format,H=>this._patch({format:H}))}
      ${_(e("inspector.datetime.format"),C.format,H=>this._patch({format:H}),{supporting:e("inspector.datetime.format_hint")})}
      <div class="field-pair">
        ${_(e("inspector.datetime.prefix"),C.prefix,H=>this._patch({prefix:H}))}
        ${_(e("inspector.datetime.suffix"),C.suffix,H=>this._patch({suffix:H}))}
      </div>
      <h3>${e("inspector.datetime.shift")}</h3>
      ${l1(j9.map(([H,t])=>({value:t,label:e(`inspector.datetime.offset.${H}`)})),C.offset_days,H=>this._patch({offset_days:H}))}
      ${D(e("inspector.datetime.days"),C.offset_days,{min:-30,max:365,step:1},H=>this._patch({offset_days:H}))}
      <h3>${e("inspector.appearance")}</h3>
      ${this._styleControls(C)}
    </section>`}_todoOptions(){let{t:C}=this,H=Object.keys(this.hass?.states??{}).filter(r=>r.startsWith("todo.")).map(r=>({value:r,label:`${this.hass.states[r].attributes.friendly_name??r}`}));for(let r of this.variables??[])r.type==="todo"&&H.push({value:`{{ vars.${r.key} }}`,label:`${C("inspector.list.from_variable")}: ${r.label||r.key}`});let t=this.element.source.entity_id;return t&&!H.some(r=>r.value===t)&&H.unshift({value:t,label:t}),H.unshift({value:"",label:C("inspector.list.choose")}),H}static _itemsToText(C){return C.map(e=>`${e.done?"[x] ":""}${e.text}${e.note?` | ${e.note}`:""}`).join(`
`)}static _textToItems(C){return C.split(`
`).filter(e=>e.trim()).map(e=>{let H=/^\s*\[x\]\s*/i.test(e),[t,...r]=e.replace(/^\s*\[( |x)\]\s*/i,"").split("|");return{text:t.trim(),done:H,note:r.join("|").trim()}})}_list(C){let{t:e}=this,{source:H}=C;return o`<section>
      <h3>${e("inspector.content")}</h3>
      ${l1([{value:"todo",label:e("inspector.list.kind.todo")},{value:"static",label:e("inspector.list.kind.static")}],H.kind,t=>this._patchSource({kind:t}))}
      ${H.kind==="todo"?o`${U(e("inspector.list.entity"),H.entity_id??"",this._todoOptions(),t=>this._patchSource({entity_id:t}))}
            ${O1(e("inspector.list.include_completed"),H.include_completed,t=>this._patchSource({include_completed:t}))}`:o`${_(e("inspector.list.items"),V._itemsToText(H.items),t=>this._patchSource({items:V._textToItems(t)}),{multiline:!0,rows:6,supporting:e("inspector.list.items_hint")})}`}
      ${_(e("inspector.list.empty_text"),C.empty_text??"",t=>this._patch({empty_text:t}))}
      <h3>${e("inspector.appearance")}</h3>
      ${l1(G9.map(t=>({value:t,label:e(`inspector.list.style.${t}`)})),C.style,t=>this._patch({style:t}))}
      ${this._styleControls(C)}
    </section>`}_divider(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.appearance")}</h3>
      ${l1(U9.map(H=>({value:H,label:e(`inspector.divider.style.${H}`)})),C.style,H=>this._patch({style:H}))}
      ${D(e("inspector.divider.thickness"),C.thickness,{min:1,max:8},H=>this._patch({thickness:H}))}
      ${D(e("inspector.divider.width"),C.width_pct,{min:10,max:100,step:5,suffix:" %"},H=>this._patch({width_pct:H}))}
    </section>`}_qr(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      <md-chip-set>
        ${Object.entries(Q9).map(([H,t])=>o`<md-assist-chip label=${e(`inspector.qr.preset.${H}`)} @click=${()=>this._patch({data:t})}></md-assist-chip>`)}
      </md-chip-set>
      ${_(e("inspector.qr.data"),C.data,H=>this._patch({data:H}),{multiline:!0,rows:3,mono:!0,supporting:e("inspector.template_hint")})}
      ${_(e("inspector.qr.caption"),C.caption,H=>this._patch({caption:H}))}
      <h3>${e("inspector.appearance")}</h3>
      ${D(e("inspector.qr.size"),C.size_pct,{min:20,max:100,step:5,suffix:" %"},H=>this._patch({size_pct:H}))}
      ${U(e("inspector.qr.level"),C.level,["L","M","Q","H"].map(H=>({value:H,label:`${H} - ${e(`inspector.qr.level_${H}`)}`})),H=>this._patch({level:H}))}
    </section>`}_barcode(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      ${l1(q9.map(H=>({value:H,label:e(`inspector.barcode.kind.${H}`)})),C.kind,H=>this._patch({kind:H}))}
      ${_(e("inspector.barcode.data"),C.data,H=>this._patch({data:H}),{mono:!0,supporting:e(`inspector.barcode.hint.${C.kind}`)})}
      ${D(e("inspector.barcode.height"),C.height,{min:30,max:240,step:5,suffix:" px"},H=>this._patch({height:H}))}
      ${D(e("inspector.barcode.module"),C.module_width,{min:1,max:4},H=>this._patch({module_width:H}))}
      ${O1(e("inspector.barcode.show_text"),C.show_text,H=>this._patch({show_text:H}))}
    </section>`}async _pickPicture(C){let[e]=C.target.files;e&&(this._patch({data:await p4(e)}),C.target.value="")}_image(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      ${C.data?o`<img class="picture" alt="" src=${C.data} />`:o`<p class="hint">${e("inspector.image.none")}</p>`}
      <input id="picture" type="file" accept="image/*" hidden @change=${this._pickPicture} />
      <md-filled-tonal-button @click=${()=>this.renderRoot.querySelector("#picture").click()}>
        <ed-icon slot="icon" .path=${$2}></ed-icon>${e("inspector.image.choose")}
      </md-filled-tonal-button>
      <h3>${e("inspector.appearance")}</h3>
      ${D(e("inspector.image.width"),C.width_pct,{min:10,max:100,step:5,suffix:" %"},H=>this._patch({width_pct:H}))}
      ${l1([{value:"floyd-steinberg",label:e("inspector.image.dither")},{value:"threshold",label:e("inspector.image.threshold")}],C.dither,H=>this._patch({dither:H}))}
      ${C.dither==="threshold"?D(e("inspector.image.level"),C.threshold,{min:20,max:235,step:5},H=>this._patch({threshold:H})):n}
    </section>`}_sticker(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.content")}</h3>
      <md-filled-tonal-button @click=${()=>this._emojiOpen=!0}>
        <span slot="icon" style="font-size:1.4rem;line-height:1">${C.emoji}</span>${e("inspector.sticker.choose")}
      </md-filled-tonal-button>
      ${_(e("inspector.sticker.emoji"),C.emoji,H=>this._patch({emoji:H}))}
      ${D(e("runs.size"),C.size,{min:32,max:300,step:4,suffix:" px"},H=>this._patch({size:H}))}
    </section>`}_spacer(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.appearance")}</h3>
      ${D(e("inspector.spacer.height"),C.height,{min:2,max:200,step:2,suffix:" px"},H=>this._patch({height:H}))}
    </section>`}_layout(C){let{t:e}=this;return o`<section>
      <h3>${e("inspector.layout")}</h3>
      ${l4(C.type)?this._alignChips():n}
      <div class="field-pair">
        ${D(e("inspector.margin_top"),C.margin_top??0,{min:0,max:60,step:2,suffix:" px"},H=>this._patch({margin_top:H}))}
        ${D(e("inspector.margin_bottom"),C.margin_bottom??0,{min:0,max:60,step:2,suffix:" px"},H=>this._patch({margin_bottom:H}))}
      </div>
      ${O1(e("inspector.hidden"),C.hidden,H=>this._patch({hidden:H}))}
    </section>`}_onEmoji(C){this._snippetTarget==="markdown"?this._insertSnippet(C):this._patch({emoji:C})}render(){let{element:C,t:e}=this;return C?o`
      ${this[`_${C.type}`](C)} ${this._layout(C)}
      <ed-emoji-picker
        .t=${e}
        .open=${this._emojiOpen||this._snippetTarget==="markdown"}
        @emoji-picked=${H=>this._onEmoji(H.detail.emoji)}
        @closed=${()=>{this._emojiOpen=!1,this._snippetTarget=void 0}}
      ></ed-emoji-picker>
    `:o`<p class="hint">${e("inspector.nothing_selected")}</p>`}};customElements.define("ed-inspector",u7);var Y9=["custom","shopping","todo","qr","love","label","food","receipt","fun"],X9=["none","line","double","rounded","dashed","dotted","brackets","ticket","hearts","stars"],J9=["none","partial","full"],C6=["text","multiline","number","boolean","date","todo","entity"],x7=class extends m{static properties={t:{attribute:!1},meta:{attribute:!1},document:{attribute:!1},status:{attribute:!1}};static styles=[$,F,z1,d`
      :host {
        display: block;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }
      h3 {
        font-size: 0.8125rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ed-text-muted);
      }
      .variable {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
      }
      .hint {
        font-size: 0.8125rem;
        color: var(--ed-text-muted);
        line-height: 1.4;
        margin: 0;
      }
    `];_meta(C){this.dispatchEvent(new CustomEvent("meta-change",{detail:{patch:C},bubbles:!0,composed:!0}))}_doc(C,e){this.dispatchEvent(new CustomEvent("document-change",{detail:{section:C,patch:e},bubbles:!0,composed:!0}))}_setVariable(C,e){this._meta({variables:this.meta.variables.map((H,t)=>t===C?{...H,...e}:H)})}_addVariable(){let C=new Set(this.meta.variables.map(H=>H.key)),e=this.meta.variables.length+1;for(;C.has(`value${e}`);)e+=1;this._meta({variables:[...this.meta.variables,{key:`value${e}`,type:"text",label:"",default:""}]})}_paper(){let{t:C,document:e,status:H}=this,t=H?.paper_presets??a4,r=t.find(M=>M.width===e.paper.width&&(M.height??null)===(e.paper.height??null)),i=[...t.map(M=>({value:M.id,label:C(`paper.${M.id}`)})),{value:"custom",label:C("paper.custom")}];return o`<section>
      <h3>${C("settings.paper")}</h3>
      ${l1(i,r?.id??"custom",M=>{let l=t.find(s=>s.id===M);l?this._doc("paper",{width:l.width,height:l.height}):this._doc("paper",{height:e.paper.height??240})})}
      <div class="field-pair">
        ${_(C("settings.width"),String(e.paper.width),M=>this._doc("paper",{width:Number(M)||384}),{type:"number",suffix:"px"})}
        ${_(C("settings.height"),e.paper.height?String(e.paper.height):"",M=>this._doc("paper",{height:Number(M)||null}),{type:"number",suffix:"px",supporting:C("settings.height_hint")})}
      </div>
      ${(H?.printers??[]).some(M=>M.width)?o`<p class="hint">${C("settings.printer_widths")}: ${H.printers.filter(M=>M.width).map(M=>`${M.name} ${M.width}px`).join(", ")}</p>`:n}
      ${D(C("settings.margin"),e.options.margin,{min:0,max:40,step:2,suffix:" px"},M=>this._doc("options",{margin:M}))}
    </section>`}render(){let{t:C,meta:e,document:H}=this;return o`
      <section>
        <h3>${C("settings.design")}</h3>
        ${_(C("settings.name"),e.name,t=>this._meta({name:t}))}
        ${_(C("settings.description"),e.description,t=>this._meta({description:t}),{multiline:!0,rows:2})}
        ${U(C("settings.category"),e.category,Y9.map(t=>({value:t,label:C(`category.${t}`)})),t=>this._meta({category:t}))}
      </section>

      ${this._paper()}

      <section>
        <h3>${C("settings.frame")}</h3>
        ${l1(X9.map(t=>({value:t,label:C(`frame.${t}`)})),H.frame.style,t=>this._doc("frame",{style:t}))}
        ${H.frame.style!=="none"?o`<div class="field-pair">
              ${D(C("settings.frame_thickness"),H.frame.thickness,{min:1,max:8},t=>this._doc("frame",{thickness:t}))}
              ${D(C("settings.frame_padding"),H.frame.padding,{min:0,max:40,step:2},t=>this._doc("frame",{padding:t}))}
            </div>`:n}
      </section>

      <section>
        <h3>${C("settings.printing")}</h3>
        ${l1(J9.map(t=>({value:t,label:C(`cut.${t}`)})),H.options.cut,t=>this._doc("options",{cut:t}))}
        ${D(C("settings.feed"),H.options.feed,{min:0,max:12},t=>this._doc("options",{feed:t}))}
        ${U(C("settings.rotate"),H.options.rotate,[0,90,180,270].map(t=>({value:t,label:`${t}\xB0`})),t=>this._doc("options",{rotate:Number(t)}))}
        ${O1(C("settings.mirror"),H.options.mirror,t=>this._doc("options",{mirror:t}))}
        ${O1(C("settings.invert"),H.options.invert,t=>this._doc("options",{invert:t}))}
      </section>

      <section>
        <h3>${C("settings.variables")}</h3>
        <p class="hint">${C("settings.variables_hint")}</p>
        ${e.variables.map((t,r)=>o`<div class="variable">
            <div class="field-pair">
              ${_(C("settings.variable.key"),t.key,i=>this._setVariable(r,{key:i.toLowerCase().replace(/[^a-z0-9_]/g,"_")}),{supporting:`{{ vars.${t.key} }}`})}
              ${U(C("settings.variable.type"),t.type,C6.map(i=>({value:i,label:C(`variable.${i}`)})),i=>this._setVariable(r,{type:i}))}
            </div>
            ${t.type==="entity"?_(C("settings.variable.domain"),t.domain??"",i=>this._setVariable(r,{domain:i.toLowerCase().replace(/[^a-z_]/g,"")}),{supporting:C("settings.variable.domain_hint")}):n}
            ${_(C("settings.variable.label"),typeof t.label=="string"?t.label:"",i=>this._setVariable(r,{label:i}))}
            ${_(C("settings.variable.default"),String(t.default??""),i=>this._setVariable(r,{default:i}))}
            <div class="row">
              <span class="grow"></span>
              <md-icon-button aria-label=${C("common.delete")} title=${C("common.delete")} @click=${()=>this._meta({variables:e.variables.filter((i,M)=>M!==r)})}>
                <ed-icon .path=${m1}></ed-icon>
              </md-icon-button>
            </div>
          </div>`)}
        <md-filled-tonal-button @click=${this._addVariable}>
          <ed-icon slot="icon" .path=${u1}></ed-icon>${C("settings.variable.add")}
        </md-filled-tonal-button>
      </section>
    `}};customElements.define("ed-settings",x7);var e6=1e3,H6=640,t6=700,h7=class extends m{static properties={t:{attribute:!1},hass:{attribute:!1},api:{attribute:!1},status:{attribute:!1},template:{attribute:!1},_meta:{state:!0},_document:{state:!0},_selected:{state:!0},_tab:{state:!0},_leftTab:{state:!0},_layout:{state:!0},_preview:{state:!0},_previewError:{state:!0},_loading:{state:!0},_dirty:{state:!0},_printOpen:{state:!0},_leaveOpen:{state:!0}};constructor(){super(),this._history=new Z5,this._lastRecord=0,this._layout="wide",this._tab="elements",this._leftTab="elements",this._selected=0,this._token=0,this._refresh=y5(()=>this._loadPreview(),250),this._observer=new ResizeObserver(([C])=>{let e=C.contentRect.width;this._layout=e>=e6?"wide":e>=H6?"medium":"narrow"}),this._onKey=C=>this._keyboard(C)}static styles=[$,F,d`
      :host {
        display: flex;
        flex-direction: column;
        height: calc(100dvh - var(--ed-header-height, 56px) - var(--ed-footer-peek, 0px));
        min-height: 560px;
        padding: 0 12px calc(8px + var(--ed-bottom-inset, 0px));
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 0;
      }
      .bar md-outlined-text-field {
        flex: 1;
        min-width: 0;
        --md-outlined-text-field-container-shape: 28px;
      }
      .bar .label-btn {
        display: none;
      }
      :host([layout="wide"]) .bar .label-btn,
      :host([layout="medium"]) .bar .label-btn {
        display: inline-flex;
      }
      :host([layout="wide"]) .bar .icon-btn,
      :host([layout="medium"]) .bar .icon-btn {
        display: none;
      }
      .dirty {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--ed-primary);
        flex: none;
      }
      .workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        gap: 12px;
      }
      :host([layout="wide"]) .workspace {
        grid-template-columns: 340px minmax(0, 1fr) 360px;
      }
      :host([layout="medium"]) .workspace {
        grid-template-columns: minmax(300px, 380px) minmax(0, 1fr);
      }
      :host([layout="narrow"]) .workspace {
        grid-template-columns: minmax(0, 1fr);
      }
      .pane {
        min-height: 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--ed-line);
        border-radius: var(--ed-radius);
        background: var(--ed-surface);
        overflow: hidden;
      }
      .pane.preview {
        flex: 1;
        background: transparent;
        border: 0;
      }
      .scroll {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      md-tabs {
        --md-primary-tab-container-color: transparent;
        flex: none;
      }
      .pane-title {
        padding: 14px 16px 0;
        font-weight: 500;
      }
    `];connectedCallback(){super.connectedCallback(),this._observer.observe(this),window.addEventListener("keydown",this._onKey)}disconnectedCallback(){this._observer.disconnect(),window.removeEventListener("keydown",this._onKey),this._refresh.cancel(),super.disconnectedCallback()}willUpdate(C){C.has("template")&&this.template&&this._load(this.template),C.has("_layout")&&this.setAttribute("layout",this._layout)}_load(C){this._meta={id:C.id,builtin:!!C.builtin,name:C.name,description:C.description??"",category:C.category??"custom",tags:C.tags??[],variables:structuredClone(C.variables??[])},this._document=structuredClone(C.document),this._document.elements=this._document.elements.map(e=>({id:e.id??S5(),...e})),this._selected=this._document.elements.length?0:-1,this._history.clear(),this._dirty=!!C.isNew,this._tab="elements",this._leftTab="elements",this._loadPreview()}_commit(C){let e=Date.now();e-this._lastRecord>t6&&this._history.record(this._document),this._lastRecord=e,this._document=C(structuredClone(this._document)),this._dirty=!0,this._refresh()}_patchElement(C,e){this._commit(H=>(Object.assign(H.elements[C],e),H))}_undo(){let C=this._history.undo(this._document);C&&this._restore(C)}_redo(){let C=this._history.redo(this._document);C&&this._restore(C)}_restore(C){this._document=C,this._selected=Math.min(this._selected,C.elements.length-1),this._lastRecord=0,this._dirty=!0,this._refresh()}_keyboard(C){if(!(C.ctrlKey||C.metaKey)||C.target.closest?.("md-dialog"))return;let e=C.key.toLowerCase();e==="z"?(C.preventDefault(),C.shiftKey?this._redo():this._undo()):e==="y"?(C.preventDefault(),this._redo()):e==="s"&&(C.preventDefault(),this._save())}_add(C){this._history.record(this._document),this._lastRecord=0;let e=A2(C);this._document={...this._document,elements:[...this._document.elements,e]},this._selected=this._document.elements.length-1,this._dirty=!0,this._layout!=="wide"&&(this._tab="properties"),this._refresh()}_remove(C){this._commit(e=>(e.elements.splice(C,1),e)),this._selected=Math.min(this._selected,this._document.elements.length-1)}_duplicate(C){this._commit(e=>(e.elements.splice(C+1,0,{...structuredClone(e.elements[C]),id:S5()}),e)),this._selected=C+1}_move(C,e){this._commit(H=>(H.elements=s4(H.elements,C,e),H)),this._selected===C&&(this._selected=e)}_documentSection(C,e){this._commit(H=>(H[C]={...H[C],...e},H))}async _loadPreview(){let C=++this._token;this._loading=!0;try{let e=await this.api.preview(this._document,b5(this._meta.variables,this.hass));if(C!==this._token)return;this._preview=e,this._previewError=""}catch(e){C===this._token&&(this._previewError=J(e))}finally{C===this._token&&(this._loading=!1)}}_save(){this.dispatchEvent(new CustomEvent("save",{detail:{templateId:this._meta.builtin?void 0:this._meta.id,template:{name:this._meta.name||this.t("editor.untitled"),description:this._meta.description,category:this._meta.category,tags:this._meta.tags,variables:this._meta.variables,document:{...this._document,name:this._meta.name}}},bubbles:!0,composed:!0}))}markSaved(C){this._meta={...this._meta,id:C.id,builtin:!1},this._dirty=!1}_back(){this._dirty?this._leaveOpen=!0:this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}_tabs(C,e){let{t:H}=this,t=this[e];return o`<md-tabs @change=${r=>this[e]=C[r.target.activeTabIndex]}>
      ${C.map(r=>o`<md-primary-tab ?active=${t===r}>${H(`editor.tab.${r}`)}</md-primary-tab>`)}
    </md-tabs>`}_elementsPane(){return o`<div class="scroll">
      <ed-element-list
        .t=${this.t}
        .elements=${this._document.elements}
        .selected=${this._selected}
        @select=${C=>{this._selected=C.detail.index,this._layout!=="wide"&&(this._tab="properties")}}
        @add=${C=>this._add(C.detail.type)}
        @move=${C=>this._move(C.detail.from,C.detail.to)}
        @duplicate=${C=>this._duplicate(C.detail.index)}
        @remove=${C=>this._remove(C.detail.index)}
        @toggle-hidden=${C=>this._patchElement(C.detail.index,{hidden:!this._document.elements[C.detail.index].hidden})}
      ></ed-element-list>
    </div>`}_propertiesPane(){return o`<div class="scroll">
      <ed-inspector
        .t=${this.t}
        .hass=${this.hass}
        .fonts=${this.status?.fonts??[]}
        .variables=${this._meta.variables}
        .element=${this._document.elements[this._selected]}
        @element-change=${C=>this._patchElement(this._selected,C.detail.patch)}
      ></ed-inspector>
    </div>`}_settingsPane(){return o`<div class="scroll">
      <ed-settings
        .t=${this.t}
        .status=${this.status}
        .meta=${this._meta}
        .document=${this._document}
        @meta-change=${C=>{this._meta={...this._meta,...C.detail.patch},this._dirty=!0,"variables"in C.detail.patch&&this._refresh()}}
        @document-change=${C=>this._documentSection(C.detail.section,C.detail.patch)}
      ></ed-settings>
    </div>`}_previewPane(){return o`<div class="pane preview">
      <ed-preview .t=${this.t} .preview=${this._preview} .loading=${this._loading} .error=${this._previewError}
        .fixedHeight=${!!this._document.paper.height}></ed-preview>
    </div>`}_workspace(){let C=()=>({elements:this._elementsPane(),properties:this._propertiesPane(),settings:this._settingsPane(),preview:this._previewPane()});if(this._layout==="wide"){let H=this._leftTab==="settings"?"settings":"elements",t=this._document.elements[this._selected];return o`
        <div class="pane">${this._tabs(["elements","settings"],"_leftTab")}${C()[H]}</div>
        ${this._previewPane()}
        <div class="pane"><div class="pane-title">${this.t("editor.tab.properties")}${t?o` · ${this.t(`element.${t.type}`)}`:n}</div>${this._propertiesPane()}</div>`}if(this._layout==="medium"){let H=["elements","properties","settings"],t=H.includes(this._tab)?this._tab:"elements";return o`<div class="pane">${this._tabs(H,"_tab")}${C()[t]}</div>${this._previewPane()}`}let e=["elements","properties","preview","settings"];return o`<div class="pane">${this._tabs(e,"_tab")}${C()[this._tab]}</div>`}_leaveDialog(){let{t:C}=this;return o`<md-dialog .open=${this._leaveOpen} @closed=${e=>e.target===e.currentTarget&&(this._leaveOpen=!1)}>
      <div slot="headline">${C("editor.leave.title")}</div>
      <div slot="content">${C("editor.leave.text")}</div>
      <div slot="actions">
        <md-text-button @click=${()=>this._leaveOpen=!1}>${C("common.cancel")}</md-text-button>
        <md-text-button @click=${()=>{this._leaveOpen=!1,this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}}>${C("editor.leave.discard")}</md-text-button>
        <md-filled-button @click=${()=>{this._leaveOpen=!1,this._save(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}}>${C("editor.leave.save")}</md-filled-button>
      </div>
    </md-dialog>`}render(){if(!this._document)return n;let{t:C}=this;return o`
      <div class="bar">
        <md-icon-button aria-label=${C("common.back")} title=${C("common.back")} @click=${this._back}><ed-icon .path=${Q3}></ed-icon></md-icon-button>
        <md-outlined-text-field
          placeholder=${C("editor.untitled")}
          .value=${this._meta.name}
          aria-label=${C("settings.name")}
          @input=${e=>{this._meta={...this._meta,name:e.target.value},this._dirty=!0}}
        ></md-outlined-text-field>
        ${this._dirty?o`<span class="dirty" title=${C("editor.unsaved")}></span>`:n}
        <md-icon-button aria-label=${C("editor.undo")} title="${C("editor.undo")} (Ctrl+Z)" ?disabled=${!this._history.canUndo} @click=${this._undo}><ed-icon .path=${p0}></ed-icon></md-icon-button>
        <md-icon-button aria-label=${C("editor.redo")} title="${C("editor.redo")} (Ctrl+Y)" ?disabled=${!this._history.canRedo} @click=${this._redo}><ed-icon .path=${l0}></ed-icon></md-icon-button>
        <md-filled-tonal-button class="label-btn" @click=${this._save}><ed-icon slot="icon" .path=${s2}></ed-icon>${C("editor.save")}</md-filled-tonal-button>
        <md-icon-button class="icon-btn" aria-label=${C("editor.save")} title=${C("editor.save")} @click=${this._save}><ed-icon .path=${s2}></ed-icon></md-icon-button>
        <md-filled-button class="label-btn" @click=${()=>this._printOpen=!0}><ed-icon slot="icon" .path=${C1}></ed-icon>${C("editor.print")}</md-filled-button>
        <md-icon-button class="icon-btn" aria-label=${C("editor.print")} title=${C("editor.print")} @click=${()=>this._printOpen=!0}><ed-icon .path=${C1}></ed-icon></md-icon-button>
      </div>
      <div class="workspace">${this._workspace()}</div>
      <ed-print-dialog
        .t=${C}
        .hass=${this.hass}
        .api=${this.api}
        .status=${this.status}
        .open=${this._printOpen}
        .document=${this._document}
        .templateId=${this._meta.builtin?"":this._meta.id??""}
        .variables=${this._meta.variables}
        .name=${this._meta.name}
        @closed=${()=>this._printOpen=!1}
        @printed=${e=>this.dispatchEvent(new CustomEvent("printed",{detail:e.detail,bubbles:!0,composed:!0}))}
      ></ed-print-dialog>
      ${this._leaveDialog()}
    `}};customElements.define("editor-view",h7);var V6=P(m),U1=class extends V6{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){let{ariaLabel:C}=this;return o`
      <button
        class="fab ${S(this.getRenderClasses())}"
        aria-label=${C||n}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){let C=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!C,large:this.size==="large"&&!C,extended:C}}renderTouchTarget(){return o`<div class="touch-target"></div>`}renderLabel(){return this.label?o`<span class="label">${this.label}</span>`:""}renderIcon(){let{ariaLabel:C}=this;return o`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${C||this.label?"true":n}>
        <span></span>
      </slot>
    </span>`}};U1.shadowRootOptions={mode:"open",delegatesFocus:!0};L([a({reflect:!0})],U1.prototype,"size",void 0);L([a()],U1.prototype,"label",void 0);L([a({type:Boolean})],U1.prototype,"lowered",void 0);var Y2=class extends U1{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}};L([a()],Y2.prototype,"variant",void 0);var f7=d`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`,Ql=f7.styleSheet;var Z7=d`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`,Yl=Z7.styleSheet;var S7=d`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`,Cd=S7.styleSheet;var g7=class extends Y2{};g7.styles=[S7,f7,Z7];g7=L([c("md-fab")],g7);var k4=["shopping","todo","qr","love","label","food","receipt","fun"],T4=24,r6={text:B2,markdown:D2,datetime:w2,list:e2},b7=class extends m{static properties={t:{attribute:!1},api:{attribute:!1},status:{attribute:!1},library:{attribute:!1},target:{attribute:!1},_showAllTargets:{state:!0},_query:{state:!0},_category:{state:!0},_newOpen:{state:!0},_thumbs:{state:!0},hass:{attribute:!1},_menuFor:{state:!0},_selecting:{state:!0},_selection:{state:!0}};constructor(){super(),this._query="",this._category="all",this._newOpen=!1,this._thumbs={},this._selecting=!1,this._selection=new Set,this._requested=new Set}static styles=[$,F,d`
      :host {
        display: block;
        padding: 0 16px 96px;
        max-width: 1400px;
        margin: 0 auto;
      }
      .banner {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 16px 20px;
        margin: 8px 0 16px;
        border-radius: var(--ed-radius);
        background: var(--md-sys-color-secondary-container);
      }
      .banner.warn {
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
      }
      .banner .text {
        flex: 1;
        min-width: 0;
        line-height: 1.4;
      }
      .banner strong {
        display: block;
        font-weight: 500;
      }
      .banner ed-icon {
        --ed-icon-size: 32px;
        flex: none;
        color: var(--ed-primary);
      }
      .toolbar {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: sticky;
        top: 0;
        z-index: 1;
        padding: 12px 0 8px;
        background: var(--ed-background);
      }
      .toolbar md-outlined-text-field {
        --md-outlined-text-field-container-shape: 28px;
      }
      md-chip-set {
        overflow-x: auto;
        flex-wrap: nowrap;
        scrollbar-width: none;
      }
      h2 {
        font-size: 1.0625rem;
        margin: 20px 0 10px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
        gap: 14px;
      }
      .recent {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
      }
      .recent .card {
        flex: 0 0 150px;
      }
      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--ed-line);
        border-radius: var(--ed-radius);
        background: var(--ed-surface);
        cursor: pointer;
        transition: box-shadow 0.15s, border-color 0.15s;
      }
      .card:hover,
      .card:focus-within {
        border-color: var(--ed-primary);
        box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
      }
      .card.locked {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .card.chosen {
        border-color: var(--ed-primary);
        box-shadow: 0 0 0 2px var(--ed-primary);
      }
      .check {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 1;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid var(--ed-primary);
        background: var(--ed-surface);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chosen .check {
        background: var(--ed-primary);
      }
      .check ed-icon {
        --ed-icon-size: 18px;
      }
      .selbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 8px;
      }
      .selbar.active {
        padding: 8px 12px;
        border-radius: 14px;
        background: var(--md-sys-color-secondary-container);
      }
      .target-note {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        padding: 6px 8px 6px 14px;
        border-radius: 14px;
        background: var(--md-sys-color-secondary-container);
        font-size: 0.875rem;
      }
      .target-note ed-icon {
        color: var(--ed-primary);
        flex: none;
      }
      .selhint {
        margin: 6px 4px 0;
        font-size: 0.8125rem;
      }
      .thumb {
        position: relative;
        height: 150px;
        background: var(--ed-container);
        overflow: hidden;
      }
      .thumb img {
        position: absolute;
        inset: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        object-fit: contain;
      }
      .thumb .star {
        position: absolute;
        top: 4px;
        right: 4px;
        z-index: 1;
        --md-icon-button-icon-size: 20px;
        --md-icon-button-state-layer-height: 36px;
        --md-icon-button-state-layer-width: 36px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--ed-surface) 80%, transparent);
      }
      .thumb .skeleton {
        position: absolute;
        inset: 10% 20%;
        width: auto;
        height: auto;
        border-radius: 6px;
        background: color-mix(in srgb, var(--ed-text) 8%, transparent);
        animation: pulse 1.4s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }
      .info {
        padding: 8px 4px 8px 14px;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .info .title {
        flex: 1;
        min-width: 0;
      }
      .title strong {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .title small {
        color: var(--ed-text-muted);
      }
      .info md-icon-button {
        --md-icon-button-icon-size: 20px;
        --md-icon-button-state-layer-height: 36px;
        --md-icon-button-state-layer-width: 36px;
      }
      .star-on {
        color: #f9a825;
      }
      md-fab {
        position: fixed;
        right: 24px;
        bottom: calc(24px + var(--ed-bottom-inset, 0px));
        z-index: 1;
      }
      .sheet .actions {
        display: flex;
        flex-direction: column;
      }
      .action {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 14px 8px;
        border: 0;
        border-radius: 12px;
        background: transparent;
        color: var(--ed-text);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .action:hover {
        background: var(--md-sys-color-secondary-container);
      }
      .action.danger {
        color: var(--md-sys-color-error);
      }
      .empty {
        text-align: center;
        padding: 48px 16px;
        color: var(--ed-text-muted);
      }
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        width: min(640px, 100vw);
        max-height: calc(100dvh - 48px - var(--ed-bottom-inset, 0px));
      }
      .starters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }
      .starter {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        padding: 14px;
        text-align: left;
        font: inherit;
        color: var(--ed-text);
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
        cursor: pointer;
      }
      .starter:hover {
        border-color: var(--ed-primary);
        background: var(--md-sys-color-secondary-container);
      }
      .starter ed-icon {
        color: var(--ed-primary);
      }
      .starter small {
        color: var(--ed-text-muted);
      }
      .recent-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
      }
      .recent-list button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 10px;
        border: 0;
        border-radius: 12px;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .recent-list button:hover {
        background: var(--md-sys-color-secondary-container);
      }
      .recent-list img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        background: #fff;
        border: 1px solid var(--ed-line);
      }
      @media (max-width: 520px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .banner {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `];updated(C){C.has("library")&&this.library&&this._loadThumbnails()}async _loadThumbnails(){let C=[...this.library.templates,...this.library.history].map(e=>e.id).filter(e=>!this._requested.has(e));for(let e=0;e<C.length;e+=T4){let H=C.slice(e,e+T4);H.forEach(t=>this._requested.add(t));try{this._thumbs={...this._thumbs,...await this.api.thumbnails(H)}}catch{H.forEach(t=>this._requested.delete(t))}}}refreshThumbnails(C){for(let e of C)this._requested.delete(e),delete this._thumbs[e];this._loadThumbnails()}_emit(C,e={}){this.dispatchEvent(new CustomEvent(C,{detail:e,bubbles:!0,composed:!0}))}_toggleSelection(C){if(C.builtin)return;let e=new Set(this._selection);e.has(C.id)?e.delete(C.id):e.add(C.id),this._selection=e}_setSelecting(C){this._selecting=C,this._selection=new Set}_selectAllVisible(){let C=this._visible().filter(H=>!H.builtin).map(H=>H.id),e=C.length&&C.every(H=>this._selection.has(H));this._selection=new Set(e?[]:C)}_deleteSelection(){let C=[...this._selection],e=this.library.templates.filter(H=>C.includes(H.id)).map(H=>H.name);this._emit("delete-templates",{ids:C,name:e.length===1?e[0]:""}),this._setSelecting(!1)}_selectionBar(){let{t:C}=this;return this._selecting?o`<div class="selbar active">
      <span class="grow">${C("gallery.selected",{count:this._selection.size})}</span>
      <md-text-button @click=${this._selectAllVisible}>${C("gallery.select_all")}</md-text-button>
      <md-filled-button ?disabled=${!this._selection.size} @click=${this._deleteSelection}><ed-icon slot="icon" .path=${m1}></ed-icon>${C("common.delete")}</md-filled-button>
      <md-text-button @click=${()=>this._setSelecting(!1)}>${C("common.cancel")}</md-text-button>
    </div>
    <p class="muted selhint">${C("gallery.select_hint")}</p>`:this.library.templates.some(H=>!H.builtin)?o`<div class="selbar"><md-text-button @click=${()=>this._setSelecting(!0)}><ed-icon slot="icon" .path=${x5}></ed-icon>${C("gallery.select")}</md-text-button></div>`:n}_matching(){let{library:C,_query:e,_category:H,t}=this,r=e.trim().toLowerCase();return H==="history"?C.history:C.templates.filter(i=>H==="favorites"&&!C.favorites.includes(i.id)||H==="mine"&&i.builtin||k4.includes(H)&&i.category!==H?!1:r?[i.name,i.description,t(`category.${i.category}`),...i.tags].join(" ").toLowerCase().includes(r):!0).sort((i,M)=>i.name.localeCompare(M.name))}_visible(){let C=this._matching();return!this.target||this._showAllTargets||this._category==="history"?C:C.filter(e=>m4(e.paper,this.target))}_targetNotice(C){let{t:e,target:H}=this;return!H||!(C||this._showAllTargets)?n:o`<div class="target-note">
      <ed-icon .path=${C1}></ed-icon>
      <span class="grow">${this._showAllTargets?e("target.showing_all",{printer:H.name}):e("target.hidden",{count:C,printer:H.name})}</span>
      <md-text-button @click=${()=>this._showAllTargets=!this._showAllTargets}>
        ${this._showAllTargets?e("target.only_fitting"):e("target.show_all")}
      </md-text-button>
    </div>`}_card(C,{compact:e=!1}={}){let{t:H,library:t}=this,r=t.favorites.includes(C.id),i=this._thumbs[C.id],M=`menu-${C.id.replace(/[^a-z0-9]/gi,"-")}`,l=this._selecting&&!e,s=l&&this._selection.has(C.id),p=()=>l?this._toggleSelection(C):this._emit("open-template",{id:C.id});return o`<div class="card ${l&&C.builtin?"locked":""} ${s?"chosen":""}" tabindex="0" @click=${p}
      @keydown=${A=>A.key==="Enter"&&p()}>
      ${l&&!C.builtin?o`<span class="check" aria-hidden="true">${s?o`<ed-icon .path=${x5}></ed-icon>`:n}</span>`:n}
      <div class="thumb">
        ${i?o`<img alt="" loading="lazy" src="data:image/png;base64,${i}" />`:o`<div class="skeleton"></div>`}
        ${e||C.history?n:o`<md-icon-button class="star" aria-label=${H("gallery.favorite")} title=${H("gallery.favorite")}
              @click=${A=>{A.stopPropagation(),this._emit("toggle-favorite",{id:C.id})}}>
              <ed-icon class=${r?"star-on":""} .path=${r?d0:s0}></ed-icon>
            </md-icon-button>`}
      </div>
      <div class="info">
        <div class="title"><strong>${C.name}</strong><small>${C.history?this._printedAt(C):e?n:H(`category.${C.category}`)}</small></div>
        ${e?n:o`<md-icon-button aria-label=${H("gallery.more")} @click=${A=>{A.stopPropagation(),this._menuFor=C}}>
              <ed-icon .path=${Y3}></ed-icon>
            </md-icon-button>`}
      </div>
    </div>`}_actionSheet(){let{t:C}=this,e=this._menuFor,H=()=>this._menuFor=void 0,t=(i,M={id:e.id})=>()=>{H(),this._emit(i,M)},r=(i,M,l,s=!1)=>o`<button class="action ${s?"danger":""}" @click=${l}>
      <ed-icon .path=${i}></ed-icon><span>${M}</span></button>`;return o`<md-dialog class="sheet" .open=${!!e} @closed=${i=>i.target===i.currentTarget&&H()}>
      <div slot="headline">${e?.name??""}</div>
      <div slot="content" class="actions">
        ${e?e.history?o`${r(C1,C("gallery.print"),t("print-template"))}
                ${r(s2,C("history.save"),t("save-history"))}
                ${r(h5,C("gallery.edit"),t("open-template"))}
                ${r(m1,C("history.remove"),t("delete-history",{id:e.id,name:e.name}),!0)}`:o`${r(h5,C("gallery.edit"),t("open-template"))}
                ${r(C1,C("gallery.print"),t("print-template"))}
                ${r(r0,C("gallery.copy_id"),t("copy-id"))}
                ${r(k2,C("gallery.duplicate"),t("duplicate-template"))}
                ${e.builtin?n:r(m1,C("common.delete"),t("delete-template",{id:e.id,name:e.name}),!0)}`:n}
      </div>
      <div slot="actions"><md-text-button @click=${H}>${C("common.cancel")}</md-text-button></div>
    </md-dialog>`}_printedAt(C){let e=new Date(C.printed_at);return Number.isNaN(e.getTime())?"":e.toLocaleString(this.hass?.language,{dateStyle:"short",timeStyle:"short"})}_banner(){let{t:C,status:e}=this,H=e?.printer_integration;return H?H.installed?H.printer_count?n:o`<div class="banner warn">
        <ed-icon .path=${p2}></ed-icon>
        <div class="text"><strong>${C("banner.no_printer.title")}</strong>${C("banner.no_printer.text")}</div>
        <md-filled-tonal-button href=${H.add_printer_url} target="_top">
          <ed-icon slot="icon" .path=${u1}></ed-icon>${C("banner.no_printer.action")}
        </md-filled-tonal-button>
      </div>`:o`<div class="banner warn">
        <ed-icon .path=${p2}></ed-icon>
        <div class="text"><strong>${C("banner.install.title")}</strong>${C("banner.install.text")}</div>
        <md-filled-button href=${H.hacs_url} target="_blank" rel="noopener noreferrer">
          <ed-icon slot="icon" .path=${X3}></ed-icon>${C("banner.install.action")}
        </md-filled-button>
      </div>`:n}_newDialog(){let{t:C,library:e}=this,H=e.recent.map(t=>e.templates.find(r=>r.id===t)).filter(Boolean);return o`<md-dialog .open=${this._newOpen} @closed=${t=>t.target===t.currentTarget&&(this._newOpen=!1)}>
      <div slot="headline">${C("new.title")}</div>
      <div slot="content">
        <div class="starters">
          ${I2.map(t=>o`<button class="starter" @click=${()=>{this._newOpen=!1,this._emit("new-design",{starter:t.id})}}>
              <ed-icon .path=${r6[t.icon]}></ed-icon>
              <strong>${C(`new.starter.${t.id}`)}</strong>
              <small>${C(`new.starter.${t.id}.hint`)}</small>
            </button>`)}
        </div>
        <h2>${C("new.recent")}</h2>
        ${H.length?o`<div class="recent-list">
              ${H.map(t=>o`<button @click=${()=>{this._newOpen=!1,this._emit("open-template",{id:t.id})}}>
                  ${this._thumbs[t.id]?o`<img alt="" src="data:image/png;base64,${this._thumbs[t.id]}" />`:o`<ed-icon .path=${V0}></ed-icon>`}
                  <span class="grow"><strong>${t.name}</strong><br /><small class="muted">${C(`category.${t.category}`)}</small></span>
                </button>`)}
            </div>`:o`<p class="muted">${C("new.recent_empty")}</p>`}
      </div>
      <div slot="actions"><md-text-button @click=${()=>this._newOpen=!1}>${C("common.cancel")}</md-text-button></div>
    </md-dialog>`}render(){let{t:C,library:e}=this;if(!e)return o`<md-linear-progress indeterminate></md-linear-progress>`;let H=this._visible(),t=this._matching().length-H.length,r=e.recent.map(l=>e.templates.find(s=>s.id===l)).filter(Boolean),i=!this._query&&this._category==="all"&&r.length,M=[{id:"all",label:C("gallery.filter.all")},{id:"favorites",label:C("gallery.filter.favorites")},{id:"mine",label:C("gallery.filter.mine")},...e.history.length?[{id:"history",label:C("gallery.filter.history",{count:e.history.length})}]:[],...k4.map(l=>({id:l,label:C(`category.${l}`)}))];return o`
      ${this._banner()}
      <div class="toolbar">
        <md-outlined-text-field placeholder=${C("gallery.search")} .value=${this._query} @input=${l=>this._query=l.target.value}>
          <ed-icon slot="leading-icon" .path=${L0}></ed-icon>
        </md-outlined-text-field>
        <md-chip-set>
          ${M.map(l=>o`<md-filter-chip label=${l.label} ?selected=${this._category===l.id}
              @click=${s=>{s.preventDefault(),this._category=l.id}}></md-filter-chip>`)}
        </md-chip-set>
      </div>
      ${i?o`<h2>${C("gallery.recent")}</h2><div class="recent">${r.map(l=>this._card(l,{compact:!0}))}</div>`:n}
      ${this._targetNotice(t)}
      ${this._selectionBar()}
      <h2>${C(this._category==="history"?"gallery.history":"gallery.templates")}</h2>
      ${this._category==="history"?o`<p class="muted selhint">${C("history.hint")}</p>`:n}
      ${H.length?o`<div class="grid">${H.map(l=>this._card(l))}</div>`:o`<div class="empty">${C("gallery.empty")}</div>`}
      <md-fab variant="primary" label=${C("new.fab")} @click=${()=>this._newOpen=!0}>
        <ed-icon slot="icon" .path=${u1}></ed-icon>
      </md-fab>
      ${this._newDialog()}${this._actionSheet()}
    `}};customElements.define("gallery-view",b7);var L6=3500,E4="escpos_designer.target_printer";function i6(){try{return localStorage.getItem(E4)??""}catch{return""}}var y7=class extends m{static properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_status:{state:!0},_library:{state:!0},_view:{state:!0},_template:{state:!0},_toast:{state:!0},_fatal:{state:!0},_deleting:{state:!0},_printing:{state:!0},_target:{state:!0},_targetOpen:{state:!0}};constructor(){super(),this._view="gallery",this._target=i6(),this.api=new c5(()=>this.hass),this._language="",this._t=t7("en")}static styles=[$,F,d`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        background: var(--ed-background);
        --ed-header-height: 56px;
      }
      main {
        flex: 1;
      }
      header {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        height: var(--ed-header-height);
        padding: 0 12px;
        background: var(--app-header-background-color, var(--ed-surface));
        color: var(--app-header-text-color, var(--ed-text));
        border-bottom: 1px solid var(--ed-line);
      }
      header h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 400;
      }
      header ed-icon.logo {
        color: var(--ed-primary);
      }
      header .grow {
        flex: 1;
      }
      header .target {
        max-width: 46vw;
        --md-text-button-label-text-color: var(--app-header-text-color, var(--ed-text));
      }
      header .target-name {
        display: inline-block;
        max-width: 30vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
      }
      .printers {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .printers button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 10px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: transparent;
        color: var(--ed-text);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .printers button.chosen {
        border-color: var(--ed-primary);
        background: var(--md-sys-color-secondary-container);
      }
      .printers small {
        display: block;
        color: var(--ed-text-muted);
      }
      .toast {
        position: fixed;
        left: 50%;
        bottom: calc(24px + var(--ed-bottom-inset));
        transform: translateX(-50%);
        z-index: 20;
        max-width: calc(100vw - 32px);
        padding: 12px 20px;
        border-radius: 12px;
        background: var(--ed-text);
        color: var(--ed-surface);
        box-shadow: 0 4px 16px rgb(0 0 0 / 30%);
      }
      .toast.error {
        background: var(--md-sys-color-error);
        color: #fff;
      }
      .fatal {
        max-width: 520px;
        margin: 64px auto;
        padding: 24px;
        text-align: center;
        line-height: 1.5;
      }
      .fatal ed-icon {
        --ed-icon-size: 48px;
        color: var(--md-sys-color-error);
      }
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
      }
    `];get t(){let C=this.hass?.language??"en";return C!==this._language&&(this._language=C,this._t=t7(C)),this._t}firstUpdated(){this._bootstrap()}async _bootstrap(){try{let[C,e]=await Promise.all([this.api.status(),this.api.library()]);this._status=C,this._library=e}catch(C){this._fatal=C?.code??"failed",this._fatalMessage=J(C)}}async _refreshLibrary(){try{this._library=await this.api.library(),this._status={...this._status,...await this.api.status()}}catch(C){this._notify(J(C),!0)}}_notify(C,e=!1){this._toast={message:C,isError:e},clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this._toast=void 0,L6)}async _open(C,{asCopy:e=!1}={}){try{let H=await this.api.getTemplate(C);H.history?this._template={...H,id:void 0,builtin:!1,isNew:!0}:this._template=e?{...H,id:void 0,builtin:!1,name:`${H.name} (${this.t("gallery.copy")})`,isNew:!0}:H,this._view="editor"}catch(H){this._notify(J(H),!0)}}get _targetPrinter(){return this._status?.printers?.find(C=>C.id===this._target)}_setTarget(C){this._target=C,this._targetOpen=!1;try{localStorage.setItem(E4,C)}catch{}}_startNew(C){let H=(I2.find(r=>r.id===C)??I2[0]).build(),t=c4(this._targetPrinter);t&&(H.paper={...H.paper,...t}),this._template={id:void 0,builtin:!1,isNew:!0,name:"",description:"",category:"custom",tags:[],variables:[],document:H},this._view="editor"}async _save(C){try{let e=await this.api.saveTemplate(C.template,C.templateId);this.renderRoot.querySelector("editor-view")?.markSaved(e),this._template={...this._template,id:e.id},this._notify(this.t("toast.saved")),await this._refreshLibrary(),this.renderRoot.querySelector("gallery-view")?.refreshThumbnails([e.id])}catch(e){this._notify(J(e),!0)}}async _toggleFavorite(C){try{let{favorite:e}=await this.api.toggleFavorite(C),H=new Set(this._library.favorites);e?H.add(C):H.delete(C),this._library={...this._library,favorites:[...H]}}catch(e){this._notify(J(e),!0)}}async _confirmDelete(){let C=this._deleting.ids??[this._deleting.id];this._deleting=void 0;try{await Promise.all(C.map(e=>this.api.deleteTemplate(e))),this._notify(C.length>1?this.t("toast.deleted_many",{count:C.length}):this.t("toast.deleted")),await this._refreshLibrary()}catch(e){this._notify(J(e),!0)}}async _saveHistoryEntry(C){try{let e=await this.api.getTemplate(C),{name:H,description:t,variables:r,document:i}=e;await this.api.saveTemplate({name:H,description:t,category:"custom",tags:[],variables:r,document:i}),this._notify(this.t("toast.history_saved")),await this._refreshLibrary()}catch(e){this._notify(J(e),!0)}}async _removeHistoryEntry(C){try{await this.api.deleteTemplate(C),this._notify(this.t("toast.history_removed")),await this._refreshLibrary()}catch(e){this._notify(J(e),!0)}}async _printFromGallery(C){try{this._printing=await this.api.getTemplate(C)}catch(e){this._notify(J(e),!0)}}async _copyId(C){try{await navigator.clipboard.writeText(C),this._notify(this.t("toast.id_copied",{id:C}))}catch{this._notify(C)}}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}_body(){let{t:C}=this;return this._fatal?o`<div class="fatal">
        <ed-icon .path=${J1}></ed-icon>
        <h2>${C(`fatal.${this._fatal}.title`)===`fatal.${this._fatal}.title`?C("fatal.failed.title"):C(`fatal.${this._fatal}.title`)}</h2>
        <p>${this._fatal==="failed"?this._fatalMessage:C(`fatal.${this._fatal}.text`)}</p>
      </div>`:!this._status||!this._library?o`<md-linear-progress indeterminate></md-linear-progress>`:this._view==="editor"?o`<editor-view
        .t=${C}
        .hass=${this.hass}
        .api=${this.api}
        .status=${this._status}
        .template=${this._template}
        @back=${()=>{this._view="gallery",this._refreshLibrary()}}
        @save=${e=>this._save(e.detail)}
        @printed=${()=>this._notify(this.t("toast.printed"))}
      ></editor-view>`:o`<gallery-view
      .t=${C}
      .api=${this.api}
      .status=${this._status}
      .library=${this._library}
      .target=${this._targetPrinter}
      .hass=${this.hass}
      @save-history=${e=>this._saveHistoryEntry(e.detail.id)}
      @delete-history=${e=>this._removeHistoryEntry(e.detail.id)}
      @open-template=${e=>this._open(e.detail.id)}
      @duplicate-template=${e=>this._open(e.detail.id,{asCopy:!0})}
      @print-template=${e=>this._printFromGallery(e.detail.id)}
      @copy-id=${e=>this._copyId(e.detail.id)}
      @new-design=${e=>this._startNew(e.detail.starter)}
      @toggle-favorite=${e=>this._toggleFavorite(e.detail.id)}
      @delete-template=${e=>this._deleting={ids:[e.detail.id],name:e.detail.name}}
      @delete-templates=${e=>this._deleting=e.detail}
    ></gallery-view>`}_targetDialog(){let{t:C}=this,e=(t,r,i,M)=>o`<button class=${this._target===t?"chosen":""} @click=${()=>this._setTarget(t)}>
      <ed-icon .path=${M}></ed-icon>
      <span><strong>${r}</strong><small>${i}</small></span>
    </button>`,H=t=>t.width?t.label_height?C("target.label",{width:t.width,height:t.label_height}):C("target.roll",{width:t.width}):C("target.unknown");return o`<md-dialog .open=${this._targetOpen} @closed=${t=>t.target===t.currentTarget&&(this._targetOpen=!1)}>
      <div slot="headline">${C("target.title")}</div>
      <div slot="content" class="printers">
        <p class="muted">${C("target.hint")}</p>
        ${e("",C("target.any"),C("target.any_hint"),e2)}
        ${(this._status?.printers??[]).map(t=>e(t.id,t.name,H(t),C1))}
      </div>
      <div slot="actions"><md-text-button @click=${()=>this._targetOpen=!1}>${C("common.cancel")}</md-text-button></div>
    </md-dialog>`}render(){let{t:C}=this;return o`
      <header>
        ${this.narrow?o`<md-icon-button aria-label=${C("common.menu")} @click=${this._toggleMenu}><ed-icon .path=${a0}></ed-icon></md-icon-button>`:n}
        <ed-icon class="logo" .path=${C1}></ed-icon>
        <h1>${C("app.title")}</h1>
        <span class="grow"></span>
        ${this._status?.printers?.length?o`<md-text-button class="target" title=${C("target.title")} @click=${()=>this._targetOpen=!0}>
              <ed-icon slot="icon" .path=${C1}></ed-icon>
              <span class="target-name">${this._targetPrinter?.name??C("target.any")}</span>
            </md-text-button>`:n}
      </header>
      <main>${this._body()}</main>
      <ed-footer .t=${C} ?fab=${this._view==="gallery"} .version=${this._status?.version}></ed-footer>
      ${this._printing?o`<ed-print-dialog
            .t=${C}
            .hass=${this.hass}
            .api=${this.api}
            .status=${this._status}
            .open=${!0}
            .document=${this._printing.document}
            .templateId=${this._printing.builtin||this._printing.history?"":this._printing.id}
            .variables=${this._printing.variables}
            .name=${this._printing.name}
            .target=${this._target}
            @closed=${()=>this._printing=void 0}
            @printed=${()=>this._notify(this.t("toast.printed"))}
          ></ed-print-dialog>`:n}
      ${this._targetDialog()}
      <md-dialog .open=${!!this._deleting} @closed=${e=>e.target===e.currentTarget&&(this._deleting=void 0)}>
        <div slot="headline">${C("delete.title")}</div>
        <div slot="content">${(this._deleting?.ids?.length??1)>1?C("delete.text_many",{count:this._deleting.ids.length}):C("delete.text",{name:this._deleting?.name??""})}</div>
        <div slot="actions">
          <md-text-button @click=${()=>this._deleting=void 0}>${C("common.cancel")}</md-text-button>
          <md-filled-button @click=${this._confirmDelete}>${C("common.delete")}</md-filled-button>
        </div>
      </md-dialog>
      ${this._toast?o`<div class="toast ${this._toast.isError?"error":""}" role="status">${this._toast.message}</div>`:n}
    `}};customElements.define("escpos-designer-panel",y7);
