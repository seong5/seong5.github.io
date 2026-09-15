import SiteNav from './components/SiteNav';
import Hero from './components/Hero';
import Journey from './components/Journey';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    /* 좌측 고정 사이드바(248px 그리드)를 걷어내고 상단 헤더 + 세로 스택으로.
       각 섹션이 스스로 max-w-page 정렬을 갖는다. */
    <div className="min-h-screen">
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Journey />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      {/* contentinfo 랜드마크 — main 안에 있으면 랜드마크로 잡히지 않는다 */}
      <footer className="mx-auto max-w-page px-7 pt-14 pb-16">
        <p className="m-0 font-mono text-meta text-muted-foreground">
          © 2026 신성오 (Shin Seong-oh) — All rights reserved.
        </p>
      </footer>
    </div>
  );
}
