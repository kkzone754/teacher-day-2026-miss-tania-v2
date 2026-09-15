"use client";

import { useState } from "react";

const chapters = [
  { n: "01", title: "The Memory", text: "Some moments stay with us long after the day is over." },
  { n: "02", title: "Confidence", text: "You helped me discover something I did not know I had: the courage to step forward." },
  { n: "03", title: "The Stage", text: "From Aladin Ka Chiragh to a first stage performance, your encouragement made the fear smaller." },
  { n: "04", title: "Another Try", text: "And when there was another performance to prepare for, you were still there saying: go for it." },
  { n: "05", title: "The Tea", text: "A little tea. A lot of memories. And one very simple habit that somehow became part of those days." },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="experience">
      <section className="hero">
        <div className="eyebrow">TEACHER&apos;S DAY · 5 OCTOBER 2026</div>
        <h1>To Miss<br /><em>Tania.</em></h1>
        <p className="lead">A small interactive memory, made especially for you.</p>
        <button className="reveal" onClick={() => setOpen(true)}>{open ? "Keep reading ↓" : "Open the memory →"}</button>
        <div className="scroll-note">SCROLL TO REMEMBER</div>
      </section>

      <section className="intro" aria-label="Opening message">
        <p className="kicker">A NOTE BEFORE THE STORY</p>
        <h2>Not every teacher leaves<br /><i>the same kind of mark.</i></h2>
        <p className="copy">Some teach a lesson. Some give advice. And sometimes, someone simply makes you believe that you can do more than you thought.</p>
      </section>

      {chapters.map((chapter, index) => (
        <section className={`chapter chapter-${index + 1}`} key={chapter.n}>
          <div className="chapter-number">{chapter.n}</div>
          <div className="chapter-content">
            <p className="kicker">MEMORY {chapter.n}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>
          </div>
          <div className="rule" />
        </section>
      ))}

      <section className="final">
        <p className="kicker">FOR MISS TANIA</p>
        <h2>Thank you for<br /><em>believing in me.</em></h2>
        <p className="copy">Maybe I will forget some lines, some dates, and some little details. But I do not think I will forget the feeling of discovering that I could actually do it.</p>
        <div className="signature">— Kamran</div>
        <div className="tea-mark">☕</div>
        <p className="small">Happy Teacher&apos;s Day, Miss Tania.</p>
      </section>
    </main>
  );
}
