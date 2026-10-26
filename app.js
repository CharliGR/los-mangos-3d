const viewer=document.querySelector('#visor');
const loading=document.querySelector('#loading');
const error=document.querySelector('#error');
const perspective=document.querySelector('#perspective');
const top=document.querySelector('#top');
const intro=document.querySelector('#intro');
const card=document.querySelector('#lot-card');
let lots=[];let loaded=false;let startPointer=null;let originalTarget='auto auto auto';
const lotData=fetch('./lotes.json').then(r=>{if(!r.ok)throw new Error('Datos no disponibles');return r.json()}).then(data=>lots=data).catch(()=>{intro.querySelector('p').textContent='Gira el modelo y explora cada rincón.'});
viewer.addEventListener('progress',event=>{const p=Math.round(event.detail.totalProgress*100);document.querySelector('#bar').style.width=`${p}%`;document.querySelector('#progress').textContent=p<100?`Cargando el modelo 3D… ${p}%`:'Preparando la vista…'});
viewer.addEventListener('load',()=>{loaded=true;loading.hidden=true;error.hidden=true;originalTarget=viewer.cameraTarget;document.body.dataset.modelLoaded='true';document.body.dataset.camera=viewer.getCameraOrbit().toString();document.body.dataset.dimensions=JSON.stringify(viewer.getDimensions())});
viewer.addEventListener('error',()=>{loading.hidden=true;error.hidden=false;document.body.dataset.modelLoaded='error'});
function viewMode(mode){perspective.classList.toggle('active',mode==='perspective');top.classList.toggle('active',mode==='top');perspective.setAttribute('aria-pressed',String(mode==='perspective'));top.setAttribute('aria-pressed',String(mode==='top'));}
perspective.onclick=()=>{intro.classList.add('quiet');viewer.cameraTarget=originalTarget;viewer.cameraOrbit='-30deg 38deg 105%';viewer.fieldOfView='35deg';viewMode('perspective')};
top.onclick=()=>{intro.classList.add('quiet');viewer.cameraTarget=originalTarget;viewer.cameraOrbit='0deg 0deg 105%';viewer.fieldOfView='35deg';viewMode('top')};
document.querySelector('#reset').onclick=()=>{perspective.click();card.hidden=true;intro.classList.remove('quiet')};
function zoom(factor){if(!loaded)return;const o=viewer.getCameraOrbit();viewer.cameraOrbit=`${o.theta}rad ${o.phi}rad ${o.radius*factor}m`;}
document.querySelector('#zoom-in').onclick=()=>zoom(.8);document.querySelector('#zoom-out').onclick=()=>zoom(1.25);
document.querySelector('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else{document.querySelector('header').hidden=!document.querySelector('header').hidden;viewer.style.height='100dvh';}}catch{document.querySelector('#fullscreen').title='Utiliza el modo horizontal del dispositivo';}};
document.querySelector('#retry').onclick=()=>{error.hidden=true;loading.hidden=false;const source=viewer.src;viewer.removeAttribute('src');requestAnimationFrame(()=>viewer.src=source)};
document.querySelector('#close-card').onclick=()=>card.hidden=true;
viewer.addEventListener('camera-change',event=>{if(event.detail.source==='user-interaction'){intro.classList.add('quiet');viewMode(viewer.getCameraOrbit().phi<.02?'top':'perspective')}});
viewer.addEventListener('pointerdown',event=>startPointer={x:event.clientX,y:event.clientY,material:loaded?viewer.materialFromPoint(event.clientX,event.clientY):null});
viewer.addEventListener('pointerup',async event=>{if(!loaded||!startPointer||Math.hypot(event.clientX-startPointer.x,event.clientY-startPointer.y)>6)return;await lotData;const material=startPointer.material;document.body.dataset.lastMaterial=material?.name||'';const lot=material&&lots.find(l=>l.materiales.includes(material.name));if(!lot)return;intro.classList.add('quiet');document.querySelector('#lot-name').textContent=lot.datos.Codigo;const number=new Intl.NumberFormat('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});document.querySelector('#lot-area').textContent=number.format(lot.datos['Area del plano (m2)'])+' m²';document.querySelector('#lot-perimeter').textContent=number.format(lot.datos['Perimetro del plano (m)'])+' m';card.hidden=false;});
// A failed component download should offer the image rather than an endless loader.
setTimeout(()=>{if(!customElements.get('model-viewer')){loading.hidden=true;error.hidden=false}},20000);



