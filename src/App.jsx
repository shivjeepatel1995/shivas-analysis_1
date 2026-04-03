import { useState, useEffect, useCallback } from "react";

const SECTOR_COLORS = {
  IT:"#6366f1", Banking:"#0ea5e9", Energy:"#f59e0b", FMCG:"#10b981",
  Pharma:"#ec4899", Automobile:"#f97316", Metals:"#94a3b8",
  Infrastructure:"#84cc16", Telecom:"#a855f7", Power:"#eab308",
  NBFC:"#06b6d4", Cement:"#78716c", Consumer:"#f43f5e",
  Mining:"#64748b", Diversified:"#8b5cf6", Healthcare:"#14b8a6",
  Conglomerate:"#fb923c", Paints:"#c084fc", "Consumer Tech":"#38bdf8",
  Fintech:"#34d399", Chemicals:"#fb7185",
};

const fmt  = n => n?.toLocaleString("en-IN", { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmtP = n => `${n>0?"+":""}${n?.toFixed(2)}%`;
const fmtV = n => n>=1e7?`${(n/1e7).toFixed(2)}Cr`:n>=1e5?`${(n/1e5).toFixed(2)}L`:`${(n/1e3).toFixed(1)}K`;
const fmtMC= n => n>=1e12?`₹${(n/1e12).toFixed(2)}L Cr`:n>=1e9?`₹${(n/1e9).toFixed(2)}K Cr`:`₹${(n/1e7).toFixed(2)}Cr`;

const Sparkline = ({ data, positive }) => {
  if (!data||data.length<2) return <span style={{color:"#334155",fontSize:11}}>—</span>;
  const w=80,h=28,pad=2,mn=Math.min(...data),mx=Math.max(...data),rng=mx-mn||1;
  const pts=data.map((v,i)=>`${pad+i*(w-2*pad)/(data.length-1)},${pad+(1-(v-mn)/rng)*(h-2*pad)}`).join(" ");
  return <svg width={w} height={h}><polyline points={pts} fill="none" stroke={positive?"#22c55e":"#ef4444"} strokeWidth="1.5" strokeLinejoin="round"/></svg>;
};

const SectorHeatmap = ({ stocks }) => {
  const map = {};
  stocks.forEach(s => {
    if (!map[s.sector]) map[s.sector]={stocks:[],totalMC:0};
    map[s.sector].stocks.push(s);
    map[s.sector].totalMC += s.marketCap||0;
  });
  const entries = Object.entries(map)
    .map(([k,v])=>([k,{...v,avg:v.stocks.reduce((a,s)=>a+s.dailyChangePct,0)/v.stocks.length}]))
    .sort((a,b)=>b[1].totalMC-a[1].totalMC);
  return (
    <div>
      <h2 style={{color:"#f1f5f9",fontSize:18,fontWeight:800,margin:"0 0 16px"}}>🟩 Sector Heatmap</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
        {entries.map(([sec,d])=>{
          const p=d.avg, i=Math.min(1,Math.abs(p)/5);
          return (
            <div key={sec} style={{background:p>=0?`rgba(34
