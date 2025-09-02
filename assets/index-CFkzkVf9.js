(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();function d(){window.onload=function(){particlesJS("particles-js",{particles:{number:{value:80,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"}},opacity:{value:.5,random:!0,anim:{enable:!0,speed:1,opacity_min:.1,sync:!0}},size:{value:3,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}}function a(){const e=document.getElementById("menu-table"),t=document.getElementById("menu-text"),i=document.getElementById("menu-class");e.onclick=()=>window.location.href="/DataSigma/public/table/",t.onclick=()=>window.location.href="/DataSigma/public/text/",i.onclick=()=>window.location.href="/DataSigma/public/classe/"}const c=document.querySelector("#table-body");function s(){if(!c){console.error("Elemento 'table-body' não encontrado.");return}const e=document.createElement("div");e.className="table-row",e.style.marginBottom="0.5rem",e.innerHTML=`
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
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>m(t)),c.appendChild(e)}function m(e){const t=e.closest(".table-row");t&&t.remove()}function p(){s(),document.querySelector(".add-row-button")?.addEventListener("click",s)}const f=document.querySelector("#classes-table-body");function u(){const e=document.createElement("div");e.className="class-row",e.style.marginBottom="0.5rem",e.innerHTML=`
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
    `;const t=e.querySelector(".remove-button");t&&t.addEventListener("click",()=>b(t)),f.appendChild(e)}function b(e){const t=e.closest(".table-row");t&&t.remove()}function v(){u(),document.querySelector(".add-row-button")?.addEventListener("click",u)}function y(){switch(window.location.pathname){case"/DataSigma/":d();break;case"/DataSigma/public/table/":a(),p();break;case"/DataSigma/public/text/":a();break;case"/DataSigma/public/classe/":a(),v();break}}document.addEventListener("DOMContentLoaded",y);
