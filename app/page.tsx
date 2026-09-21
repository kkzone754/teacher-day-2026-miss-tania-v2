"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemoryWorld from "./components/MemoryWorld";

gsap.registerPlugin(ScrollTrigger);

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
  const [started, setStarted] = useState(false);
  const [tea, setTea] = useState(false);
  const [chapter, setChapter] = useState(-1);
  const [loading, setLoading] = useState(0);
  const root = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + Math.floor(Math.random() * 8) + 5);
      setLoading(value);
      if (value >= 100) window.clearInterval(timer);
    }, 70);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!started || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0, clipPath: "inset(0 0 22% 0)" }, {
          y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true }
        });
      });
      gsap.utils.toArray<HTMLElement>(".chapter-art").forEach((el) => {
        gsap.fromTo(el, { y: 70, rotate: 2, scale: 0.92 }, {
          y: -25, rotate: -1, scale: 1,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 }
        });
      });
      gsap.utils.toArray<HTMLElement>(".kinetic").forEach((el) => {
        gsap.fromTo(el, { letterSpacing: "0.1em", filter: "blur(8px)", opacity: 0.2 }, {
          letterSpacing: "-0.06em", filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true }
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const triggers = chapters.map((_, i) => ScrollTrigger.create({
      trigger: "#chapter-" + chapters[i][0],
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => setChapter(i),
      onEnterBack: () => setChapter(i)
    }));
    return () => triggers.forEach((trigger) => trigger.kill());
  }, [started]);

  useEffect(() => {
    const move = (event: globalThis.MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = "translate3d(" + event.clientX + "px," + event.clientY + "px,0)";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const magnetic = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left - r.width / 2) * 0.14;
    const y = (event.clientY - r.top - r.height / 2) * 0.14;
    el.style.transform = "translate(" + x + "px," + y + "px)";
  };

  return (
    <main ref={root} className="experience">
      <div ref={cursor} className="cursor-dot" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <MemoryWorld chapter={chapter} revealed={tea} />

      {!started ? (
        <section className="opening">
          <div className="opening-frame">
            <div className="topline"><span>05 / 10 / 2026</span><span>AN INTERACTIVE MEMORY</span></div>
            <div className="loader-mark"><span>THE MEMORY IS</span><strong>{loading}</strong><i><b style={{ width: loading + "%" }} /></i></div>
            <div className="opening-main">
              <span>A LITTLE SURPRISE FOR</span>
              <h1>Miss <em>Tania.</em></h1>
              <p>A collection of moments, memories, and a few things I never properly said.</p>
              <button className="magnetic" onMouseMove={magnetic} onMouseLeave={(e) => e.currentTarget.style.transform = ""} onClick={() => setStarted(true)} disabled={loading < 100}>OPEN THE MEMORY <b>↗</b></button>
            </div>
            <div className="topline"><span>SCROLL / EXPLORE / REMEMBER</span><span>— KAMRAN</span></div>
          </div>
        </section>
      ) : (
        <>
          <header className="chrome"><b>K / T</b><span>TEACHER&apos;S DAY · 2026</span><span>{String(Math.max(chapter, 0) + 1).padStart(2, "0")} / 07</span></header>
          <div className="chapter-rail" aria-hidden="true">{chapters.map((c, i) => <span className={chapter === i ? "active" : ""} key={c[0]}>{c[0]}</span>)}</div>

          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">FOR MISS TANIA</span>
              <h2 className="kinetic">Some teachers teach lessons.<br /><em>Some leave memories.</em></h2>
              <p className="reveal">And some quietly change the way you see yourself.</p>
              <a className="magnetic reveal" onMouseMove={magnetic} onMouseLeave={(e) => e.currentTarget.style.transform = ""} href="#chapter-01">BEGIN THE STORY <b>↓</b></a>
            </div>
            <div className="hero-orbit" aria-hidden="true"><span>05.10</span><i /><b>MEMORY<br />ARCHIVE</b></div>
          </section>

          <section className="note reveal"><span>00 / NOTE</span><div><h3>A good memory doesn&apos;t need a photograph.</h3><p>Sometimes words are enough to bring a whole moment back.</p></div></section>

          {chapters.map((c, i) => (
            <section id={"chapter-" + c[0]} key={c[0]} className={"chapter chapter-" + i} data-chapter={c[0]}>
              <div className="chapter-meta"><b>{c[0]}</b><span>{c[1]}</span></div>
              <div className="chapter-stage">
                <div className={"chapter-art art-" + i} aria-hidden="true">
                  {i === 0 && <><span className="fear-word">?</span><i className="orbit-ring" /></>}
                  {i === 1 && <><span className="fear-word">FEAR</span><b className="confidence-word">CONFIDENCE</b></>}
                  {i === 2 && <div className="guidance-grid"><i /><i /><i /><b>→</b></div>}
                  {i === 3 && <div className="stage-card"><span>ALADDIN</span><small>THE STAGE / ARTS COUNCIL</small></div>}
                  {i === 4 && <div className="wave-art">{Array.from({ length: 38 }).map((_, n) => <i key={n} style={{ height: (20 + (n % 7) * 11) + "px" }} />)}</div>}
                  {i === 5 && <div className="song-card"><b>♪</b><span>LET&apos;S<br /><em>TRY IT.</em></span></div>}
                  {i === 6 && <button className={"tea-card " + (tea ? "revealed" : "")} onClick={() => setTea(!tea)} aria-label="Reveal the tea surprise"><div className="tea-aura" /><div className="steam"><i /><i /><i /></div><div className="saucer" /><div className="cup"><span className="tea-liquid" /><span className="cup-highlight" /><b>{tea ? "THANK YOU" : "TEA"}</b></div><small>{tea ? "THE SURPRISE IS REVEALED" : "CLICK TO REVEAL"}</small></button>}
                </div>
                <div className="chapter-copy">
                  <span className="eyebrow">{c[1]}</span>
                  <h3 className="kinetic reveal">{c[2]}</h3>
                  <p className="reveal">{c[3]}</p>
                  <blockquote className="reveal">{c[4]}</blockquote>
                  {i === 2 && <div className="bento reveal"><span>01 / DIALOGUE</span><b>Little things became confidence.</b><small>Expressions · voice · rehearsal · trying again</small></div>}
                  {i === 5 && <div className="bento song-bento reveal"><span>06 / A NEW TRY</span><b>Write it. Make it. Send it.</b><small>A small idea became another memory.</small></div>}
                  {i === 6 && <div className="dialogue reveal"><span>“Tum har waqt mujhe chai kyun pilate ho?”</span><b>Bas aise hi… mera dil karta tha to aapke liye bhi le aata hun.</b></div>}
                </div>
              </div>
            </section>
          ))}


      <div className="chapter-transition" aria-hidden="true"><span /><i /><b /></div>

          <section className="memory-pause reveal"><span>08 / THE MEMORY</span><h2>For a little while,<br /><em>everything else disappeared.</em></h2><p>Rehearsals, the stage, the voice, the nervousness — for those moments, I was simply there. Performing.</p></section>

          <section className="final">
            <span>05 / 10 / 2026 · HAPPY TEACHER&apos;S DAY</span>
            <h2 className="kinetic">Thank you,<br /><em>Miss Tania.</em></h2>
            <p>Thank you for the encouragement. Thank you for the patience. Thank you for the memories. And thank you for helping me find a little more confidence in myself.</p>
            <p className="urdu">Aapki encouragement mere liye bohot special thi.</p>
            <div>— Kamran</div><strong>✦</strong>
          </section>
        </>
      )}
    </main>
  );
}
