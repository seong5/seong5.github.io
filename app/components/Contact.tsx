import SectionHead from './SectionHead';

const LINKS = [
  { label: 'EMAIL', value: 'greenbi0852@gmail.com', href: 'mailto:greenbi0852@gmail.com' },
  { label: 'PHONE', value: '010-4784-3867', href: 'tel:010-4784-3867' },
  {
    label: 'GITHUB',
    value: 'github.com/seong5',
    href: 'https://github.com/seong5',
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="contact"
    >
      <SectionHead idx="06" title="Contact" />
      <div className="mt-2 flex flex-wrap gap-x-14 gap-y-2 max-nav:flex-col max-nav:gap-x-0">
        {LINKS.map(({ label, value, href, external }) => (
          <a
            key={label}
            href={href}
            className="flex items-center justify-start gap-3 py-3 text-[0.875rem] text-paper transition-colors hover:text-mute"
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span>
              <span className="text-[0.75rem] tracking-[0.08em] text-mute">{label}</span>
              <br />
              {value}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-9 text-[0.75rem] text-mute">
        © 2026 신성오 (Shin Seong-oh) — All rights reserved.
      </div>
    </section>
  );
}
