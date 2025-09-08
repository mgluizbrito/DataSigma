(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function l(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=l(n);fetch(n.href,r)}})();function V(){window.onload=function(){particlesJS("particles-js",{particles:{number:{value:80,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"}},opacity:{value:1,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!0}},size:{value:3,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:1,width:2},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}}function B(){const e=document.getElementById("menu-table"),t=document.getElementById("menu-text");e.onclick=()=>window.location.href="/DataSigma/table/",t.onclick=()=>window.location.href="/DataSigma/text/"}const F=document.querySelector("#table-body");function k(){if(!F){console.error("Elemento 'table-body' não encontrado.");return}const e=document.createElement("div");e.className="table-row",e.style.marginBottom="0.5rem",e.innerHTML=`
        <div>
            <input type="number" placeholder="Xi" class="input-field xi-field">
        </div>
        <div>
            <input type="number" placeholder="Fi" class="input-field fi-field">
        </div>
        <div></div>
        <div style="text-align: right;">
            <button class="remove-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>N(t)),F.appendChild(e);const l=e.querySelector(".xi-field");l&&l.focus(),e.querySelector(".fi-field").addEventListener("keydown",n=>{n.key==="Enter"&&k()})}function N(e){const t=e.closest(".table-row");t&&t.remove()}function z(){k(),document.querySelector(".add-row-button")?.addEventListener("click",k)}const H=document.querySelector("#classes-table-body");function M(){const e=document.createElement("div");e.className="class-row",e.style.marginBottom="0.5rem",e.innerHTML=`
        <div>
            <input type="number" placeholder="Li" class="input-field li-field">
        </div>
        <div>
            <input type="number" placeholder="Ls" class="input-field ls-field">
        </div> 
        <div>
            <input type="number" placeholder="Fi" class="input-field fi-field">
        </div>
        <div></div>
        <div style="text-align: right;">
            <button class="remove-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>_(t)),H.appendChild(e);const l=e.querySelector(".li-field"),a=e.querySelector(".ls-field");document.querySelectorAll(".class-row")?.length>1?(l.value=document.querySelector("#classes-table-body .class-row:nth-last-child(2) .ls-field").value||"",a&&a.focus()):l&&l.focus(),e.querySelector(".fi-field").addEventListener("keydown",r=>{r.key==="Enter"&&M()})}function _(e){const t=e.closest(".class-row");t&&t.remove()}function O(){M(),document.querySelector(".add-row-button")?.addEventListener("click",M)}function L(e,t){let l=[],a=Math.max(...t);return t.forEach((n,r)=>{n>1&&n===a&&l.push(e[r])}),l}function S(e,t){let l=0,a=T(t);for(let n in t)l+=e[n]*t[n];return parseFloat((l/a).toFixed(2))}function j(e,t){const l=A(t),a=l[l.length-1]/2,n=l.findIndex(r=>a<=r);return n!==-1?e[n]:(e[n]+e[n+1])/2}function h(e,t){let l=0,a=T(t);return t.forEach((n,r)=>l+=(e[r]-S(e,t))**2*n),parseFloat((l/(a-1)).toFixed(2))}function q(e){return parseFloat(Math.sqrt(e).toFixed(2))}function P(e,t){return parseFloat((100*e/t).toFixed(2))}function g(e,t){let l=[];const a=Math.min(e.length,t.length);for(let n=0;n<a;n++)l.push(parseFloat(((e[n]+t[n])/2).toFixed(2)));return l}function D(e,t){let l=[];const a=Math.min(e.length,t.length);for(let n=0;n<a;n++)l.push(parseFloat((t[n]-e[n]).toFixed(2)));return l}function R(e,t,l,a){const n=t.reduce((f,p)=>f+p,0)/2;let r=0;for(;l[r]<n;)r++;const s=r>0?l[r-1]:0,u=e[r]+(n-s)/t[r]*a[r];return parseFloat(u.toFixed(2))}function G(e,t,l){const a=Math.max(...t),n=[];t.forEach((s,u)=>{s===a&&n.push(u)});const r=[];return n.forEach(s=>{const u=e[s],f=l[s],p=s>0?t[s-1]:0,c=a-p,o=s<t.length-1?t[s+1]:0,i=a-o,d=u+c/(c+i)*f;r.push(parseFloat(d.toFixed(2)))}),r}function A(e){let t=[],l=0;return e.forEach(a=>{l+=a,t.push(l)}),t}function T(e){let t=0;return e.forEach(l=>t+=l),t}function $(e){return e.length===0?"Amodal":e.length===1?"Unimodal":e.length===2?"Bimodal":e.length===3?"Trimodal":"Multimodal"}function W(){return new Promise((e,t)=>{if(document.getElementById("googleChartsScript")){e();return}const l=document.createElement("script");l.id="googleChartsScript",l.src="https://www.gstatic.com/charts/loader.js",l.async=!0,l.onload=()=>e(),l.onerror=()=>t("Erro ao carregar Google Charts"),document.head.appendChild(l)})}async function J(e,t,l,a){await W(),google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(()=>K(e,t,l,a))}function K(e,t,l,a){const n=new google.visualization.DataTable;n.addColumn("string","Xi"),n.addColumn("number","Fi");for(let u=0;u<t.length;u++)n.addRow([`${t[u].toString()} ${a}`,l[u]]);const r={title:"Distribuição de Frequência",hAxis:{title:`Xi [${a}]`},vAxis:{title:"Fi",gridlines:{count:12}},pointSize:6,lineWidth:2,legend:{position:"none"},bar:{groupWidth:"60%"},colors:["#4c68d1"]};new google.visualization.LineChart(document.getElementById(e)).draw(n,r)}let b=[],y=[],m;function U(){document.querySelector(".calculate-button")?.addEventListener("click",e=>{e.preventDefault();const t=document.querySelectorAll(".xi-field"),l=document.querySelectorAll(".fi-field");b=Array.from(t).map(a=>parseFloat(a.value)),y=Array.from(l).map(a=>parseFloat(a.value)),I(b,y),b=[],y=[]})}function Y(){document.querySelector(".calculate-button")?.addEventListener("click",e=>{e.preventDefault();let l=document.querySelector("#text-input").value.split(", ").map(r=>parseFloat(r.trim())).sort((r,s)=>r-s),a=null,n=0;for(let r of l)r!==a?(a!==null&&y.push(n),b.push(r),n=1,a=r):n++;y.push(n),I(b,y),b=[],y=[]})}function I(e,t){m=document.querySelector("#unit-measure").value;const l=document.querySelector(".charts-section"),a=document.querySelector(".results-section");document.querySelector(".welcome-section")?.classList.add("d-none"),a.classList.remove("d-none"),l.classList.remove("d-none");const n=document.getElementById("moda"),r=document.getElementById("media"),s=document.getElementById("mediana"),u=document.getElementById("variancia"),f=document.getElementById("desvioPadrao"),p=document.getElementById("coeficienteVariacao");if(n.checked){a.querySelector(".result-moda")&&document.querySelector(".result-moda")?.remove();let c=L(e,t),o=document.createElement("div");o.className="result-item result-moda",o.innerHTML=`
            <span class="result-label">Moda</span>
            <span class="result-value">${$(c)}: (${c.join(", ")}) ${m}</span>
        `,a.querySelector(".results-list")?.appendChild(o)}if(r.checked){a.querySelector(".result-media")&&document.querySelector(".result-media")?.remove();let c=S(e,t),o=document.createElement("div");o.className="result-item result-media",o.innerHTML=`
            <span class="result-label">Média</span>
            <span class="result-value">${c} ${m}</span>
        `,a.querySelector(".results-list")?.appendChild(o)}if(s.checked){a.querySelector(".result-mediana")&&document.querySelector(".result-mediana")?.remove();let c=j(e,t),o=document.createElement("div");o.className="result-item result-mediana",o.innerHTML=`
            <span class="result-label">Mediana</span>
            <span class="result-value">${c} ${m}</span>
        `,a.querySelector(".results-list")?.appendChild(o)}if(u.checked){a.querySelector(".result-variancia")&&document.querySelector(".result-variancia")?.remove();let c=h(e,t),o=document.createElement("div");o.className="result-item result-variancia",o.innerHTML=`
            <span class="result-label">Variancia</span>
            <span class="result-value">${c} ${m}</span>
        `,a.querySelector(".results-list")?.appendChild(o)}if(f.checked){a.querySelector(".result-desvioPadrao")&&document.querySelector(".result-desvioPadrao")?.remove();let c=q(h(e,t)),o=document.createElement("div");o.className="result-item result-desvioPadrao",o.innerHTML=`
            <span class="result-label">Desvio Padrão</span>
            <span class="result-value">${c} ${m}</span>
        `,a.querySelector(".results-list")?.appendChild(o)}if(p.checked){a.querySelector(".result-coeficienteVariacao")&&document.querySelector(".result-coeficienteVariacao")?.remove();let c=P(q(h(e,t)),S(e,t)),o=document.createElement("div");o.className="result-item result-coeficienteVariacao",o.innerHTML=`
            <span class="result-label">Coeficiente de Variação</span>
            <span class="result-value">${c} ${m} %</span>
        `,a.querySelector(".results-list")?.appendChild(o)}J("results-charts",e,t,m)}let C=[],E=[],x=[],v;function Q(){document.querySelector(".calculate-button")?.addEventListener("click",e=>{e.preventDefault();const t=document.querySelectorAll(".li-field"),l=document.querySelectorAll(".ls-field"),a=document.querySelectorAll(".fi-field");C=Array.from(t).map(n=>parseFloat(n.value)),E=Array.from(l).map(n=>parseFloat(n.value)),x=Array.from(a).map(n=>parseFloat(n.value)),Z(C,E,x),C=[],E=[],x=[]})}function Z(e,t,l){v=document.querySelector("#unit-measure").value;const a=document.querySelector(".results-section");document.querySelector(".welcome-section")?.classList.add("d-none"),a.classList.remove("d-none");const n=document.getElementById("moda"),r=document.getElementById("modaCzuber"),s=document.getElementById("media"),u=document.getElementById("mediana"),f=document.getElementById("variancia"),p=document.getElementById("desvioPadrao"),c=document.getElementById("coeficienteVariacao");if(n.checked){a.querySelector(".result-moda")&&document.querySelector(".result-moda")?.remove();const o=L(g(e,t),l);let i=document.createElement("div");i.className="result-item result-moda",i.innerHTML=`
            <span class="result-label">Moda Bruta</span>
            <span class="result-value">${$(o)}: (${o.join(", ")}) ${v}</span>
        `,a.querySelector(".results-list")?.appendChild(i)}if(r.checked){a.querySelector(".result-moda-czuber")&&document.querySelector(".result-moda-czuber")?.remove();const o=G(e,l,D(e,t));let i=document.createElement("div");i.className="result-item result-moda-czuber",i.innerHTML=`
            <span class="result-label">Moda de Czuber</span>
            <span class="result-value">${$(o)}: (${o.join(", ")}) ${v}</span>
        `,a.querySelector(".results-list")?.appendChild(i)}if(s.checked){a.querySelector(".result-media")&&document.querySelector(".result-media")?.remove();let o=S(g(e,t),l),i=document.createElement("div");i.className="result-item result-media",i.innerHTML=`
                <span class="result-label">Média</span>
                <span class="result-value">${o} ${v}</span>
            `,a.querySelector(".results-list")?.appendChild(i)}if(u.checked){a.querySelector(".result-mediana")&&document.querySelector(".result-mediana")?.remove();const o=D(e,t),i=A(l);let d=R(e,l,i,o),w=document.createElement("div");w.className="result-item result-mediana",w.innerHTML=`
            <span class="result-label">Mediana</span>
            <span class="result-value">${d} ${v}</span>
        `,a.querySelector(".results-list")?.appendChild(w)}if(f.checked){a.querySelector(".result-variancia")&&document.querySelector(".result-variancia")?.remove();let o=h(g(e,t),l),i=document.createElement("div");i.className="result-item result-variancia",i.innerHTML=`
            <span class="result-label">Variancia</span>
            <span class="result-value">${o} ${v}</span>
        `,a.querySelector(".results-list")?.appendChild(i)}if(p.checked){a.querySelector(".result-desvioPadrao")&&document.querySelector(".result-desvioPadrao")?.remove();const o=g(e,t);let i=q(h(o,l)),d=document.createElement("div");d.className="result-item result-desvioPadrao",d.innerHTML=`
            <span class="result-label">Desvio Padrão</span>
            <span class="result-value">${i} ${v}</span>
        `,a.querySelector(".results-list")?.appendChild(d)}if(c.checked){a.querySelector(".result-coeficienteVariacao")&&document.querySelector(".result-coeficienteVariacao")?.remove();const o=g(e,t);let i=P(q(h(o,l)),S(o,l)),d=document.createElement("div");d.className="result-item result-coeficienteVariacao",d.innerHTML=`
            <span class="result-label">Coeficiente de Variação</span>
            <span class="result-value">${i} %</span>
        `,a.querySelector(".results-list")?.appendChild(d)}}function X(){switch(window.location.pathname){case"/DataSigma/":V();break;case"/DataSigma/table/":B(),z(),U();break;case"/DataSigma/text/":B(),Y();break;case"/DataSigma/classe/":Q(),O();break}}document.addEventListener("DOMContentLoaded",X);
