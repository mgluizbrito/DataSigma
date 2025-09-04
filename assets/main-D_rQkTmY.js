(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();function x(){window.onload=function(){particlesJS("particles-js",{particles:{number:{value:80,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"}},opacity:{value:1,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!0}},size:{value:3,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:1,width:2},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}}function v(){const e=document.getElementById("menu-table"),t=document.getElementById("menu-text");e.onclick=()=>window.location.href="/DataSigma/table/",t.onclick=()=>window.location.href="/DataSigma/text/"}const y=document.querySelector("#table-body");function f(){if(!y){console.error("Elemento 'table-body' não encontrado.");return}const e=document.createElement("div");e.className="table-row",e.style.marginBottom="0.5rem",e.innerHTML=`
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
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>k(t)),y.appendChild(e);const n=e.querySelector(".xi-field");n&&n.focus(),e.querySelector(".fi-field").addEventListener("keydown",a=>{a.key==="Enter"&&f()})}function k(e){const t=e.closest(".table-row");t&&t.remove()}function E(){f(),document.querySelector(".add-row-button")?.addEventListener("click",f)}const L=document.querySelector("#classes-table-body");function b(){const e=document.createElement("div");e.className="class-row",e.style.marginBottom="0.5rem",e.innerHTML=`
        <div>
            <input type="number" value="0.0" class="input-field">
        </div>
        <div>
            <input type="number" value="0.0" class="input-field">
        </div> 
        <div>
            <input type="number" value="1" class="input-field">
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
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>C(t)),L.appendChild(e)}function C(e){const t=e.closest(".table-row");t&&t.remove()}function M(){b(),document.querySelector(".add-row-button")?.addEventListener("click",b)}function B(e,t){let n=[],o=Math.max(...t);return t.forEach((a,r)=>{a>1&&a===o&&n.push(e[r])}),n}function D(e){return e.length===0?"Amodal":e.length===1?"Unimodal":e.length===2?"Bimodal":e.length===3?"Trimodal":"Multimodal"}function p(e,t){let n=0,o=g(t);for(let a in t)n+=e[a]*t[a];return parseFloat((n/o).toFixed(2))}function F(e,t){const n=T(t),o=n[n.length-1]/2,a=n.findIndex(r=>o<=r);return a!==-1?e[a]:(e[a]+e[a+1])/2}function m(e,t){let n=0,o=g(t);return t.forEach((a,r)=>n+=(e[r]-p(e,t))**2*a),parseFloat((n/(o-1)).toFixed(2))}function h(e){return parseFloat(Math.sqrt(e).toFixed(2))}function $(e,t){return parseFloat((100*e/t).toFixed(2))}function T(e){let t=[],n=0;return e.forEach(o=>{n+=o,t.push(n)}),t}function g(e){let t=0;return e.forEach(n=>t+=n),t}let d=[],u=[],s;function P(){document.querySelector(".calculate-button")?.addEventListener("click",e=>{e.preventDefault();const t=document.querySelectorAll(".xi-field"),n=document.querySelectorAll(".fi-field");d=Array.from(t).map(o=>parseFloat(o.value)),u=Array.from(n).map(o=>parseFloat(o.value)),w(d,u),d=[],u=[]})}function I(){document.querySelector(".calculate-button")?.addEventListener("click",e=>{e.preventDefault();let n=document.querySelector("#text-input").value.split(", ").map(r=>parseFloat(r.trim())).sort((r,c)=>r-c),o=null,a=0;for(let r of n)r!==o?(o!==null&&u.push(a),d.push(r),a=1,o=r):a++;u.push(a),w(d,u),d=[],u=[]})}function w(e,t){s=document.querySelector("#unit-measure").value,document.querySelector(".welcome-section")?.classList.add("d-none");const n=document.querySelector(".results-section");n.classList.remove("d-none");const o=document.getElementById("moda"),a=document.getElementById("media"),r=document.getElementById("mediana"),c=document.getElementById("variancia"),S=document.getElementById("desvioPadrao"),q=document.getElementById("coeficienteVariacao");if(o.checked){n.querySelector(".result-moda")&&document.querySelector(".result-moda")?.remove();let l=B(e,t),i=document.createElement("div");i.className="result-item result-moda",i.innerHTML=`
            <span class="result-label">Moda</span>
            <span class="result-value">${D(l)}: (${l.join(", ")}) ${s}</span>
        `,n.querySelector(".results-list")?.appendChild(i)}if(a.checked){n.querySelector(".result-media")&&document.querySelector(".result-media")?.remove();let l=p(e,t),i=document.createElement("div");i.className="result-item result-media",i.innerHTML=`
            <span class="result-label">Média</span>
            <span class="result-value">${l} ${s}</span>
        `,n.querySelector(".results-list")?.appendChild(i)}if(r.checked){n.querySelector(".result-mediana")&&document.querySelector(".result-mediana")?.remove();let l=F(e,t),i=document.createElement("div");i.className="result-item result-mediana",i.innerHTML=`
            <span class="result-label">Mediana</span>
            <span class="result-value">${l} ${s}</span>
        `,n.querySelector(".results-list")?.appendChild(i)}if(c.checked){n.querySelector(".result-variancia")&&document.querySelector(".result-variancia")?.remove();let l=m(e,t),i=document.createElement("div");i.className="result-item result-variancia",i.innerHTML=`
            <span class="result-label">Variancia</span>
            <span class="result-value">${l} ${s}</span>
        `,n.querySelector(".results-list")?.appendChild(i)}if(S.checked){n.querySelector(".result-desvioPadrao")&&document.querySelector(".result-desvioPadrao")?.remove();let l=h(m(e,t)),i=document.createElement("div");i.className="result-item result-desvioPadrao",i.innerHTML=`
            <span class="result-label">Desvio Padrão</span>
            <span class="result-value">${l} ${s}</span>
        `,n.querySelector(".results-list")?.appendChild(i)}if(q.checked){n.querySelector(".result-coeficienteVariacao")&&document.querySelector(".result-coeficienteVariacao")?.remove();let l=$(h(m(e,t)),p(e,t)),i=document.createElement("div");i.className="result-item result-coeficienteVariacao",i.innerHTML=`
            <span class="result-label">Coeficiente de Variação</span>
            <span class="result-value">${l} ${s} %</span>
        `,n.querySelector(".results-list")?.appendChild(i)}}function _(){switch(window.location.pathname){case"/DataSigma/":x();break;case"/DataSigma/table/":v(),E(),P();break;case"/DataSigma/text/":v(),I();break;case"/DataSigma/classe/":M();break}}document.addEventListener("DOMContentLoaded",_);
