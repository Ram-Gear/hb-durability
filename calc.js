// Faithful port of durability-hp.xls Sheet1 (AGMA 211.02A, Roger Blake). Cell refs in comments.
(function(g){
const D=0.017453293, R=57.29577951, PI=3.141592654;
const BHN_P=[295,310,325,340,375,390], BHN_G=[255,270,285,300,335,350];
const SF_ENGINE={UNIFORM:[1.25,1.5,1.0,0.8],"MODERATE SHOCK":[1.5,1.75,1.25,1.0],"HEAVY SHOCK":[2.0,2.0,1.75,1.5]};
const SF_MOTOR={UNIFORM:[1.0,1.25,0.8,0.5],"MODERATE SHOCK":[1.25,1.5,1.0,0.8],"HEAVY SHOCK":[1.75,1.75,1.5,1.25]};
const SF_COLS=["8-10 HRS","24 HRS","3.0 HRS","0.5 HRS"];
function calc(i){ // i: rpm,fw,dpt,np,ng,odp,odg,ce,pat,ha,sf, bhnG (optional array)
 const o={}, bg=i.bhnG||BHN_G;
 o.B28=i.ng/i.np; o.B26=i.rpm/o.B28; o.B29=(i.ng+i.np)/(2*i.dpt); o.B30=i.ce/o.B29;
 o.B47=Math.tan(i.ha*D); o.E47=Math.cos(i.ha*D); o.B48=Math.cos(i.pat*D); o.E48=Math.tan(i.pat*D);
 o.K48=Math.sin(i.pat*D); o.K49=Math.cos(i.pat*D);
 o.B31=i.dpt/o.E47; o.B32=25.4/o.B31; o.B34=25.4/i.dpt;
 o.B35=Math.atan(o.E48*o.E47)*R; o.K47=Math.sin(o.B35*D); o.K50=o.K47/o.K48;
 o.B39=0.8/i.dpt; o.B36=i.odp-2*o.B39; o.B37=PI*i.rpm*o.B36/12; o.B38=78/(78+Math.sqrt(o.B37));
 o.B40=o.K50*PI*o.K49/i.dpt;
 o.I47=(i.np/i.dpt)*o.B48; o.E50=i.ng/i.dpt*o.B48;
 o.G47=Math.pow((i.odp/2)**2-(o.I47/2)**2,0.5); o.G48=Math.pow((i.odg/2)**2-(o.E50/2)**2,0.5);
 o.B49=Math.acos(o.B48/o.B30)*R; o.B50=Math.sin(o.B49*D); o.B51=Math.cos(o.B49*D);
 o.G49=i.ce*o.B50; o.J42=o.G47+o.G48-o.G49; o.B42=o.J42;
 o.E49=PI/i.dpt*o.B48; o.J43=o.J42/o.E49; o.G50=o.J42/o.E49;
 o.I50=i.fw*i.dpt*o.B47/PI; o.J44=o.G50+o.I50; o.J45=i.fw*o.B47*i.dpt/2/PI;
 o.E51=(o.B51*o.B50/2)*(o.B28/(o.B28+1))*(0.95*o.J42/o.B40);
 o.F19=i.rpm*o.B36*o.B36*o.B38/126000; o.H19=-(0.0153*i.fw*i.fw)+0.7969*i.fw-0.0193; o.J19=1; o.I48=o.F19*o.H19;
 o.sacCp2=bg.map(h=>((25600+h*345)/2300)**2); o.C3=o.sacCp2.map(v=>o.E51*v);
 o.Pac=o.C3.map(c=>o.F19*o.H19*c); o.SHP=o.Pac.map(p=>p/i.sf); return o;}
g.HBD={calc,BHN_P,BHN_G,SF_ENGINE,SF_MOTOR,SF_COLS};
})(typeof window!=='undefined'?window:globalThis);
