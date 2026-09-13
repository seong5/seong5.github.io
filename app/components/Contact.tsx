import { PROFILE } from '../content/profile';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

const LINKS = [
  { label: 'EMAIL', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: 'GITHUB', value: 'github.com/seong5', href: PROFILE.github, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead idx="05" title="Contact" className="mb-11" />
      <RevealGroup className="flex flex-col gap-2">
        {LINKS.map(({ label, value, href, external }) => (
          <RevealItem key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="flex flex-wrap items-baseline gap-x-[18px] gap-y-2 border-b border-border px-1 py-[26px] text-foreground transition-[padding] duration-200 hover:pl-4 focus-visible:pl-4"
            >
              <span className="font-mono text-eyebrow tracking-[0.16em] text-muted-foreground">{label}</span>
              {/* 섹션 h2와 같은 크기면 진짜 제목과 위계가 겹친다 — 한 단계 낮춘다.
                  break-all은 이메일을 아무 데서나 쪼개므로 break-words로 바꾼다. */}
              <span className="font-display text-title font-bold tracking-[-0.03em] break-words">
                {value}
              </span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
