"use client";

import { useEffect, useMemo, useState } from "react";

const chapters = [
  ["01","THE BEGINNING","Before the stage, there was fear.","I wasn't really the kind of person who felt confident standing in front of everyone. I didn't know I could do it.","And then there was a teacher who kept saying, in one way or another… “Beta, you can do this.”"],
  ["02","CONFIDENCE","I forgot to be afraid.","I didn't even know what confidence felt like. Somewhere between the rehearsals, the practice and the nervousness… I was just performing.","For the first time, I felt like maybe I could actually do a lot more than I thought. You helped me discover that."],
  ["03","GUIDANCE","Someone helped me step onto the stage.","You taught me the little things. The dialogue. The expressions. The confidence. And most importantly… not to be afraid of trying.","Thank you for believing in me before I knew how to believe in myself."],
  ["04","ALADDIN KA CHIRAG","My first real stage performance.","Arts Council of Pakistan, Karachi. Rehearsals. Nervousness. Lines. Lights. And a lot of practice.","Somehow, the fear disappeared. I wasn't thinking about whether I could do it anymore. I WAS DOING IT."],
  ["05","THE VOICE","You heard it before you saw it.","Some memories are remembered by what we see. Some are remembered by what we hear.","The mysterious voice. 👀 Probably one of the strangest things I've ever performed — and definitely one I won't forget."],
  ["06","ANOTHER TRY","Then came another idea.","A song. A little writing. A little music. A lot of “let's try it.”","You listened to it. And your reaction was basically… “Literally bohot achcha.” That one made us smile."],
  ["07","THE TEA","And then… there was tea.","A lot of tea. During those long practice days, bringing tea became a tiny tradition.","Nothing complicated. Just chai. But this time… the tea has a little surprise."]
] as const;

export default function Home() {
  const [started,setStarted]=useState(false);
  const [tea,setTea]=useState(false);
  const [active,setActive]=useState(0);
  const [mouse,setMouse]=useState({x:0,y:0});

  useEffect(()=>{const move=(e:MouseEvent)=>setMouse({x:e.clientX,y:e.clientY});window.addEventListener("mousemove",move);return()=>window.removeEventListener("mousemove",move)},[]);
  useEffect(()=>{
    const els=[...document.querySelectorAll<HTMLElement>("[data-index]")];
    const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.getAttribute("data-index"))) }),{rootMargin:"-35% 0px -55% 0px"});
    els.forEach(e=>ob.observe(e)); return()=>ob.disconnect();
  },[started]);
  const progress=useMemo(()=>Math.round(((active+1)/chapters.length)*100),[active]);

  return <main className="experience">
    <div className="grain" aria-hidden="true"/>
    <div className="cursor-dot" style={{transform:`translate3d(${mouse.x}px,${mouse.y}px,0)`}} aria-hidden="true"/>
    {!started ? <section className="opening">
      <div className="opening-frame">
        <div className="topline"><span>05 / 10 / 2026</span><span>AN INTERACTIVE MEMORY</span></div>
        <div className="opening-main">
          <span>A LITTLE SURPRISE FOR</span>
          <h1>Miss <i>Tania.</i></h1>
          <p>A collection of moments, memories, and a few things I never properly said.</p>
          <button onClick={()=>setStarted(true)}>OPEN THE MEMORY <b>↗</b></button>
        </div>
        <div className="topline"><span>SCROLL / EXPLORE / REMEMBER</span><span>— KAMRAN</span></div>
      </div>
    </section> : <>
      <header className="chrome"><b>K / T</b><span>TEACHER'S DAY · 2026</span><span>{String(active+1).padStart(2,"0")} / 07</span></header>
      <div className="progress"><span>0</span><i><b style={{height:`${progress}%`}}/></i><span>100</span></div>

      <section className="hero">
        <div>
          <span className="eyebrow">FOR MISS TANIA</span>
          <h2>Some teachers teach lessons.<br/><em>Some leave memories.</em></h2>
          <p>And some quietly change the way you see yourself.</p>
          <a href="#chapter-01">BEGIN THE STORY <b>↓</b></a>
        </div>
        <div className="stamp">A<br/>MEMORY<br/><small>BY KAMRAN</small></div>
      </section>

      <section className="note">
        <span>00 / NOTE</span><div><h3>Before the story, just one thing.</h3><p>A good memory doesn't need a photograph. Sometimes words are enough to bring a whole moment back.</p></div>
      </section>

      {chapters.map((c,i)=><section id={`chapter-${c[0]}`} data-index={i} key={c[0]} className={`chapter theme-${i}`}>
        <div className="meta"><b>{c[0]}</b><span>{c[1]}</span></div>
        <div className="art" aria-hidden="true">
          {i===0&&<div className="fear-art"><span>?</span><i/></div>}
          {i===1&&<div className="confidence-art"><span>FEAR</span><b>CONFIDENCE</b></div>}
          {i===2&&<div className="guide-art"><i/><i/><i/><b>→</b></div>}
          {i===3&&<div className="stage-art"><span>ALADDIN</span><small>THE STAGE</small></div>}
          {i===4&&<div className="wave-art">{Array.from({length:32}).map((_,n)=><i key={n} style={{"--n":n} as React.CSSProperties}/>)}</div>}
          {i===5&&<div className="song-art"><b>♪</b><span>LET'S<br/>TRY IT.</span></div>}
          {i===6&&<button className={`tea-art ${tea?"revealed":""}`} onClick={()=>setTea(!tea)} aria-label="Reveal the tea surprise"><div className="steam"><i/><i/><i/></div><div className="cup"><b>{tea?"THANK YOU":"TEA"}</b></div><small>{tea?"THE SURPRISE IS REVEALED":"CLICK TO REVEAL"}</small></button>}
        </div>
        <div className="copy"><span className="eyebrow">{c[1]}</span><h3>{c[2]}</h3><p>{c[3]}</p><blockquote>{c[4]}</blockquote>
        {i===6&&<div className="dialogue"><span>“Tum har waqt mujhe chai kyun pilate ho?”</span><b>Bas aise hi… mera dil karta tha to aapke liye bhi le aata hun.</b></div>}</div>
      </section>)}

      <section className="final"><span>05 / 10 / 2026 · HAPPY TEACHER'S DAY</span><h2>Thank you,<br/><i>Miss Tania.</i></h2><p>Thank you for the encouragement. Thank you for the patience. Thank you for the memories. And thank you for helping me find a little more confidence in myself.</p><p className="urdu">Aapki encouragement mere liye bohot special thi.</p><div>— Kamran</div><strong>✦</strong></section>
    </>}
  </main>
}
