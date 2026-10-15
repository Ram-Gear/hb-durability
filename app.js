const F=[["rpm","INPUT RPM",83,"pinion speed"],["fw","FW",6,"face width, in"],["dpt","DPT",2,"transverse diametral pitch"],["np","NP",24,"pinion teeth"],["ng","NG",132,"gear teeth"],["odp","ODP",13,"pinion OD, in"],["odg","ODG",67,"gear OD, in"],["ce","CE",39,"operating center distance, in"],["pat","PAT",25,"transverse pressure angle, °"],["ha","HA",0,"helix angle, °"],["sf","SF",1.5,"service factor"]];
const form=document.getElementById('form');
form.innerHTML=F.map(([k,l,v,h])=>`<div class="field"><label for="${k}">${l} =</label><input id="${k}" type="number" step="any" value="${v}"><span class="hint">${h}</span></div>`).join('');
const f=(x,d=4)=>Number.isFinite(x)?x.toFixed(d):'—';
function sfTable(id,t){document.getElementById(id).innerHTML='<tr><th>Character of load</th>'+HBD.SF_COLS.map(c=>`<th>${c}/day</th>`).join('')+'</tr>'+Object.entries(t).map(([k,a])=>`<tr><td>${k}</td>`+a.map(v=>`<td><a href="#" data-sf="${v}">${v.toFixed(2)}</a></td>`).join('')+'</tr>').join('');}
sfTable('sfE',HBD.SF_ENGINE);sfTable('sfM',HBD.SF_MOTOR);
document.addEventListener('click',e=>{const s=e.target.dataset&&e.target.dataset.sf;if(s){e.preventDefault();document.getElementById('sf').value=s;run();}});
function run(){const i={};F.forEach(([k])=>i[k]=parseFloat(document.getElementById(k).value));const o=HBD.calc(i);
 const row=(l,a,d,c='')=>`<tr class="${c}"><td>${l}</td>`+a.map(v=>`<td>${typeof v=='number'&&d!=null?f(v,d):v}</td>`).join('')+'</tr>';
 document.getElementById('tblHp').innerHTML=row('BHN-P',HBD.BHN_P,0)+row('BHN-G',HBD.BHN_G,0)+row('(Sac/Cp)²',o.sacCp2,2)+row('C3',o.C3,3)+row('Pac',o.Pac,2,'big')+row('SERVICE HP',o.SHP,2,'big');
 const kv=a=>a.map(([l,v,d])=>`<tr><td>${l}</td><td>${f(v,d??4)}</td></tr>`).join('');
 document.getElementById('tblA').innerHTML=kv([["C1",o.F19,6],["C2",o.H19],["C4",o.J19],["C1 × C2",o.I48,6],["K",o.E51,6],["Cv",o.B38],["v (fpm)",o.B37,2],["OUTPUT RPM",o.B26],["GEAR RATIO",o.B28],["C (std center)",o.B29],["RC = CE/C",o.B30],["DPN",o.B31],["MN",o.B32,2],["MT",o.B34,2],["PAN (°)",o.B35],["PDPE (in)",o.B36,3],["A (addendum)",o.B39]]);
 document.getElementById('tblB').innerHTML=kv([["BPN",o.B40],["BPT",o.E49],["BDP",o.I47],["BDG",o.E50],["ZP",o.G47],["ZG",o.G48],["ZL",o.G49],["Z = contact length",o.J42],["Transverse contact ratio",o.J43],["Overlap ratio",o.J45],["Total contact ratio",o.J44],["PATE (°)",o.B49],["SINPATE",o.B50,6],["COSPATE",o.B51,6],["TANHA",o.B47],["COSHA",o.E47],["Cp",2300,0]]);}
form.addEventListener('input',run);run();
