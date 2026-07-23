import SiteNav from './components/SiteNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_1fr] max-nav:grid-cols-1">
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="min-w-0 [&>*]:mx-auto">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
