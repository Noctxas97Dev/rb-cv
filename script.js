document.documentElement.classList.add('enhanced');
const roles=[...document.querySelectorAll('details[data-category]')];
const filters=[...document.querySelectorAll('[data-filter]')];
for(const button of filters){
  button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    for(const role of roles)role.hidden=filter!=='all'&&!role.dataset.category.split(' ').includes(filter);
    for(const other of filters){const selected=other===button;other.classList.toggle('fbtn-on',selected);other.setAttribute('aria-pressed',String(selected));}
    document.getElementById('role-count').textContent=`${roles.filter(role=>!role.hidden).length} / ${roles.length} roles`;
  });
}
let printState;
window.addEventListener('beforeprint',()=>{printState=roles.map(role=>({open:role.open,hidden:role.hidden}));for(const role of roles){role.open=true;role.hidden=false;}});
window.addEventListener('afterprint',()=>{if(printState)roles.forEach((role,index)=>Object.assign(role,printState[index]));});
