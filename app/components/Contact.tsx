import SectionHead from './SectionHead';

export default function Contact() {
  return (
    <section
      className="max-w-[1080px] bg-bg px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="contact"
    >
      <SectionHead idx="06" title="Contact" />
      <div className="mt-2 flex flex-wrap gap-x-14 gap-y-2 max-nav:flex-col max-nav:gap-x-0">
        <a
          className="flex items-center justify-start gap-3 py-3 font-mono text-[0.875rem] transition hover:text-accent"
          href="mailto:greenbi0852@gmail.com"
        >
          <span>
            <span className="text-[0.75rem] tracking-[.08em] text-muted">EMAIL</span>
            <br />
            greenbi0852@gmail.com
          </span>
        </a>
        <a
          className="flex items-center justify-start gap-3 py-3 font-mono text-[0.875rem] transition hover:text-accent"
          href="tel:010-4784-3867"
        >
          <span>
            <span className="text-[0.75rem] tracking-[.08em] text-muted">PHONE</span>
            <br />
            010-4784-3867
          </span>
        </a>
        <a
          className="flex items-center justify-start gap-3 py-3 font-mono text-[0.875rem] transition hover:text-accent"
          href="https://github.com/seong5"
        >
          <span>
            <span className="text-[0.75rem] tracking-[.08em] text-muted">GITHUB</span>
            <br />
            github.com/seong5
          </span>
        </a>
      </div>
      <div className="mt-9 font-mono text-[0.75rem] text-muted">
        © 2026 신성오 (Shin Seong-oh) — All rights reserved.
      </div>
    </section>
  );
}
