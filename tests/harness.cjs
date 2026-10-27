const fs=require('fs'),vm=require('vm');
function setup(shared=new Map()){
const session=new Map(),els=new Map(),timers=[],events={};let blocked=false;
const storage=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>{if(blocked)throw Error('Storage full');m.set(k,v);},removeItem:k=>m.delete(k)});
const node=()=>({innerHTML:'',textContent:'',value:'',hidden:false,open:false,inert:false,classList:{toggle(){},add(){},remove(){}},showModal(){this.open=true;},close(){this.open=false;},focus(){},scrollIntoView(){},setAttribute(){},addEventListener(){},querySelectorAll(){return [];}});
const location={hash:'#client'},history={replaceState(a,b,url){location.hash=url;}};
const c=vm.createContext({crypto:require('crypto').webcrypto,TextEncoder,console,Date,setTimeout:f=>{timers.push(f);return timers.length;},clearTimeout(){},history,location,localStorage:storage(shared),sessionStorage:storage(session),window:{matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(k,f){(events[k]??=[]).push(f);}},document:{body:node(),querySelector(s){if(!els.has(s))els.set(s,node());return els.get(s);},querySelectorAll(){return [];}}});
for(const f of ['auth.js','app.js'])vm.runInContext(fs.readFileSync(__dirname+'/../dist/'+f,'utf8'),c);
return {run:s=>vm.runInContext(s,c),shared,els,timers,events,blockStorage(value){blocked=value;},page:()=>els.get('#app').innerHTML};
}
module.exports=setup;
