window.BELL_DATA=window.BELL_DATA||{};
const LABELS={
monday:["Monday","Word Study"],
tuesday:["Tuesday","Test Prep Words"],
wednesday:["Wednesday","Grammar"],
thursday:["Thursday","Test Prep: Reading & Writing"],
friday:["Friday","Figurative Language & Literary Terms"]
};
const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
const weekSelect=qs("#weekSelect"), activity=qs("#activity");
let storageAvailable=true;
function safeRead(k){try{return localStorage.getItem(k)}catch(e){storageAvailable=false;return null}}
function safeWrite(k,v){try{localStorage.setItem(k,v);return true}catch(e){storageAvailable=false;return false}}
function safeRemove(k){try{localStorage.removeItem(k);return true}catch(e){storageAvailable=false;return false}}
function storageNotice(){const n=qs("#storageNote");n.textContent=storageAvailable?"Responses autosave on this browser only; they are not submitted to Canvas.":"Browser autosave is unavailable. Copy or download your responses before switching activities."}

for(let i=1;i<=18;i++){const o=document.createElement("option");o.value=i;o.textContent="Week "+i;weekSelect.appendChild(o)}
const params=new URLSearchParams(location.search);
let day=(params.get("day")||safeRead("bell_selected_day")||"monday").toLowerCase();
if(!LABELS[day]) day="monday";
let week=parseInt(params.get("week")||safeRead("bell_selected_week")||"1",10);
if(!(week>=1&&week<=18)) week=1;
let data=null,key="";

function addChoices(container,name,prompt,opts,field){
  const p=document.createElement("p");p.innerHTML=prompt;container.appendChild(p);
  const box=document.createElement("div");box.className="options";
  opts.forEach(o=>{const lab=document.createElement("label");lab.className="choice";const inp=document.createElement("input");inp.type="radio";inp.name=name;inp.value=o;inp.dataset.field=field;lab.appendChild(inp);lab.appendChild(document.createTextNode(" "+o));box.appendChild(lab)});
  container.appendChild(box);
}
function getState(){try{return JSON.parse(safeRead(key)||"{}")}catch(e){return{}}}
function restore(){
  const s=getState();
  qsa("[data-field]").forEach(el=>{const f=el.dataset.field;if(el.type==="radio")el.checked=s[f]===el.value;else if(s[f]!=null)el.value=s[f]});
  updateProgress();
}
function save(){
  const s={};
  qsa("[data-field]").forEach(el=>{const f=el.dataset.field;if(el.type==="radio"){if(el.checked)s[f]=el.value}else s[f]=el.value});
  safeWrite(key,JSON.stringify(s));updateProgress();storageNotice();
}
function updateProgress(){
  const fields=[...new Set(qsa("[data-field]").map(x=>x.dataset.field))];let done=0;
  fields.forEach(f=>{const els=qsa('[data-field="'+f+'"]');if(!els.length)return;if(els[0].type==="radio"){if(els.some(e=>e.checked))done++}else if((els[0].value||"").trim())done++});
  const pct=fields.length?Math.round(done/fields.length*100):0;
  qs("#progress").style.width=pct+"%";qs("#progressShell").setAttribute("aria-valuenow",String(pct));qs("#progressText").textContent=done+" of "+fields.length+" responses completed";qs("#statusPill").textContent=pct===0?"Not Started":pct===100?"Completed":"In Progress";
}
function syncUrl(){
  try{const u=new URL(location.href);u.searchParams.set("day",day);u.searchParams.set("week",String(week));history.replaceState(null,"",u.pathname+u.search+u.hash)}catch(e){}
}
function render(){
  safeWrite("bell_selected_day",day);safeWrite("bell_selected_week",String(week));syncUrl();
  const all=window.BELL_DATA[day]||[];data=all[week-1];
  qsa(".days button").forEach(b=>{const selected=b.dataset.day===day;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected))});
  weekSelect.value=String(week);
  qs("#dayPill").textContent=LABELS[day][0];qs("#weekPill").textContent="Week "+week;
  qs("#categoryLabel").textContent=LABELS[day][0]+" · "+LABELS[day][1];
  if(!data){qs("#activityTitle").textContent="Activity coming soon";qs("#activityRule").textContent="No activity is available for this day and week.";activity.innerHTML="";updateProgress();storageNotice();return}
  key="bellringer_"+day+"_w"+week;
  qs("#activityTitle").textContent=data[0];qs("#activityRule").textContent=data[1];
  activity.innerHTML="";
  data[2].forEach((part,idx)=>{
    const d=document.createElement("details");d.className="card";if(idx===0)d.open=true;
    const s=document.createElement("summary");s.textContent=(idx+1)+" · "+part[0];d.appendChild(s);
    const c=document.createElement("div");c.className="content";
    if(part[1]==="mcset"){
      part[2].forEach((it,j)=>addChoices(c,day+"w"+week+"p"+idx+"q"+j,"<strong>"+String.fromCharCode(65+j)+".</strong> "+it[0],[it[1],it[2]],"p"+idx+"q"+j));
    }else if(part[1]==="mc"){
      addChoices(c,day+"w"+week+"p"+idx,part[2],part[3],"p"+idx);
    }else{
      const p=document.createElement("p");p.innerHTML=part[2];c.appendChild(p);
      const t=document.createElement("textarea");t.placeholder="Type your response here.";t.dataset.field="p"+idx;c.appendChild(t);
    }
    d.appendChild(c);activity.appendChild(d);
  });
  restore();storageNotice();window.scrollTo({top:0,behavior:"smooth"});
}
function collect(){
  if(!data)return "No activity available for "+LABELS[day][0]+" Week "+week;
  let out=[LABELS[day][0]+" — "+LABELS[day][1],"Week "+week+" — "+data[0],""];
  data[2].forEach((part,idx)=>{
    out.push((idx+1)+" · "+part[0]);
    if(part[1]==="mcset"){
      part[2].forEach((it,j)=>{const e=qs('[data-field="p'+idx+'q'+j+'"]:checked');out.push(String.fromCharCode(65+j)+". "+(e?e.value:"[no response]"))});
    }else if(part[1]==="mc"){
      const e=qs('[data-field="p'+idx+'"]:checked');out.push(e?e.value:"[no response]");
    }else{
      const e=qs('[data-field="p'+idx+'"]');out.push(e&&e.value.trim()?e.value.trim():"[no response]");
    }
    out.push("");
  });
  return out.join("\n");
}
document.addEventListener("input",e=>{if(e.target.matches("[data-field]"))save()});
document.addEventListener("change",e=>{if(e.target===weekSelect){week=parseInt(e.target.value,10);render()}else if(e.target.matches("[data-field]"))save()});
qsa(".days button").forEach(b=>b.onclick=()=>{day=b.dataset.day;render()});
let toastTimeout=null;
function notify(text,keep){
  const toast=qs("#toast");
  clearTimeout(toastTimeout);toast.textContent=text;toast.style.display="block";
  if(!keep)toastTimeout=setTimeout(()=>{toast.style.display="none"},3500);
}
async function copyValue(text){
  const fallback=qs("#copyFallback"),label=qs("#copyFallbackLabel");
  fallback.hidden=true;label.hidden=true;
  try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(text);return true}}catch(e){}
  fallback.value=text;fallback.hidden=false;label.hidden=false;fallback.focus();fallback.select();
  try{if(document.execCommand&&document.execCommand("copy")){fallback.hidden=true;label.hidden=true;return true}}catch(e){}
  return false;
}
qs("#copyBtn").onclick=async()=>{
  const ok=await copyValue(collect());
  notify(ok?"Copied! Paste your responses into Canvas.":"Clipboard was blocked. Select and copy the text in the box below.",!ok);
};
qs("#shareBtn").onclick=async()=>{
  const ok=await copyValue(location.href);
  notify(ok?"Activity link copied. It selects the same day and week, not saved answers.":"Clipboard was blocked. Copy the activity link from the box below.",!ok);
};
qs("#downloadBtn").onclick=()=>{
  const blob=new Blob([collect()],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
  const link=document.createElement("a");link.href=url;link.download="bell-ringer-"+day+"-week-"+week+".txt";
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  notify("Responses downloaded. They have not been submitted to Canvas.");
};
qs("#clearBtn").onclick=()=>{if(confirm("Clear all responses for "+LABELS[day][0]+" Week "+week+"?")){safeRemove(key);qsa("textarea[data-field]").forEach(x=>x.value="");qsa('input[type="radio"][data-field]').forEach(x=>x.checked=false);updateProgress();storageNotice();notify("Responses for this activity cleared.")}};
render();
