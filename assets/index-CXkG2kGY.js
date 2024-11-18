(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const u="https://rickandmortyapi.com/api",f=`${u}/character`,m=`${u}/location`,y=`${u}/episode`,c=document.getElementById("output"),a=document.getElementById("api-character"),d=document.getElementById("api-location"),p=document.getElementById("api-episode");a==null||a.addEventListener("click",async()=>{try{const n=await(await fetch(f)).json();c.innerHTML="",n.results.forEach(s=>{const t=document.createElement("div");t.innerHTML=h(s),c.appendChild(t)})}catch(e){console.error(e)}});function h(e){var r;return`
  <h4>Name: ${e.name}</h4>
<p>Status: ${e.status}</p>
<p>Gender: ${e.gender}</p>
<p>Location: ${(r=e.location)==null?void 0:r.name}</p>
<img src="${e.image}" alt="${e.name}">
  `}d==null||d.addEventListener("click",async()=>{try{const n=await(await fetch(m)).json();c.innerHTML="";for(const r of n.results){const s=document.createElement("div");s.innerHTML=await g(r),c.appendChild(s)}}catch(e){console.error(e)}});async function g(e){const n=await l(e.residents);return`
  <p>Name:${e.name}</p>
  <p>Type:${e.type}</p>
  <p>Residents:${n}</p>
  `}async function l(e){const n=[];for(const r of e)try{const t=await(await fetch(r)).json();n.push(t.name)}catch(s){console.error(s)}return n.join(", ")}p==null||p.addEventListener("click",async()=>{try{const n=await(await fetch(y)).json();c.innerHTML="",await Promise.all(n.results.map(async r=>{const s=document.createElement("div");s.innerHTML=await E(r),c.appendChild(s)}))}catch(e){console.error(e)}});async function E(e){const n=await l(e.characters);return`
  <p>Name:${e.name}</p>
  <p>Air date:${e.air_date}</p>
  <p>Characters:${n}</p>

  `}
