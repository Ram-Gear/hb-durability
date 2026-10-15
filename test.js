// Compare calc.js output to cached values in durability-hp.xls (dumped to expected.json)
require('./calc.js');const exp=require('./expected.json');
const o=HBD.calc({rpm:83,fw:6,dpt:2,np:24,ng:132,odp:13,odg:67,ce:39,pat:25,ha:0,sf:1.5});
const cols='FGHIJK';const m={...o};
['sacCp2:52','C3:18','Pac:12','SHP:13'].forEach(s=>{const[k,r]=s.split(':');o[k].forEach((v,j)=>m[cols[j]+r]=v)});
let bad=0,n=0;for(const[c,v]of Object.entries(exp)){n++;const a=m[c];const ok=a!==undefined&&Math.abs(a-v)<=1e-9*Math.max(1,Math.abs(v));if(!ok){bad++;console.log('MISMATCH',c,v,a)}}
console.log(`${n-bad}/${n} formula cells match`);process.exit(bad?1:0);
