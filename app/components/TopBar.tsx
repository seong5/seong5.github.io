export default function TopBar() {
  return (
    <div className="hidden max-nav:flex sticky top-0 z-20 items-center justify-between border-b border-line bg-[rgba(250,250,249,0.92)] px-[22px] py-4 backdrop-blur-[8px]">
      <div>
        <div className="text-[0.9375rem] font-semibold">
          Shin&nbsp;Seong-oh<span className="font-mono text-accent">.</span>
        </div>
        <div className="font-mono text-[0.75rem] text-muted">FRONTEND DEVELOPER</div>
      </div>
      <a href="#projects" className="font-mono text-[0.75rem] text-accent">
        PROJECTS ↓
      </a>
    </div>
  );
}
