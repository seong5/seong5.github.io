import SiteNav from './components/SiteNav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ExperienceSkills from './components/ExperienceSkills';
import Education from './components/Education';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_1fr] max-nav:grid-cols-1">
      <SiteNav />
      <main className="min-w-0 [&>*]:mx-auto">
        <Hero />
        <About />
        <Projects />
        <ExperienceSkills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
