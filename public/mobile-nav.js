(()=>{
const t=document.getElementById('menuToggle'),s=document.getElementById('sidebar');
if(!t||!s)return;
function close(){s.classList.remove('open');t.setAttribute('aria-expanded','false')}
t.addEventListener('click',()=>{const on=s.classList.toggle('open');t.setAttribute('aria-expanded',String(on))});
document.addEventListener('click',e=>{if(window.innerWidth<=740&&!e.target.closest('#sidebar')&&!e.target.closest('#menuToggle'))close()});
s.addEventListener('click',e=>{if(e.target.closest('button[data-view]'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
