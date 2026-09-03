import SiteNav from './components/SiteNav';
import ScrollProgressBar from './components/ScrollProgressBar';
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
      <ScrollProgressBar />
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Journey />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
