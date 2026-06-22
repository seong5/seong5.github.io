export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col justify-between border-r border-line bg-bg px-[30px] py-[38px] max-nav:hidden">
      <div>
        <div className="font-mono text-[0.75rem] tracking-[.05em] text-muted">
          PORTFOLIO<span className="text-accent">.</span>2026
        </div>
        <div className="mt-[30px]">
          <h1 className="text-[1.5625rem] font-semibold leading-[1.2] tracking-[-.01em]">
            신성오
            <br />
            Shin Seong-oh
          </h1>
          <div className="mt-2 font-mono text-[0.78125rem] tracking-[.02em] text-muted">
            FRONTEND DEVELOPER
          </div>
        </div>
        <nav className="mt-[42px] flex flex-col gap-0.5">
          <a
            href="#about"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">01</span> About
          </a>
          <a
            href="#projects"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">02</span> Projects
          </a>
          <a
            href="#experience"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">03</span> Experience
          </a>
          <a
            href="#skills"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">04</span> Skills
          </a>
          <a
            href="#education"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">05</span> Education
          </a>
          <a
            href="#contact"
            className="group flex items-baseline gap-3 py-[7px] font-mono text-[0.78125rem] text-muted transition-colors hover:text-ink"
          >
            <span className="w-5 text-[0.75rem] text-line2 group-hover:text-accent">06</span> Contact
          </a>
        </nav>
      </div>
      <div className="font-mono text-[0.75rem] leading-[1.8] text-muted">
        Seoul, KR
        <br />
        greenbi0852@gmail.com
        <br />
        1995.05.02 (31)
      </div>
    </aside>
  );
}
