import { PROFILE } from '../content/profile';
import CopyEmail from './CopyEmail';
import { ArrowUpRightIcon, ARROW_NUDGE } from './icons';
import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

const LINKS = [
  { label: 'EMAIL', value: PROFILE.email, copy: true },
  { label: 'GITHUB', value: 'github.com/seong5', href: PROFILE.github, external: true },
];

// EMAIL은 복사 버튼, GITHUB은 링크로 요소가 달라도 같은 행으로 보이게 모양을 공유한다
const ROW =
  'flex w-full flex-wrap items-baseline gap-x-[18px] gap-y-2 border-b border-border px-1 py-[26px] text-left text-foreground transition-[padding] duration-200 hover:pl-4 focus-visible:pl-4';
const LABEL = 'font-mono text-eyebrow tracking-[0.16em] text-muted-foreground';
// 섹션 h2와 같은 크기면 진짜 제목과 위계가 겹친다 — 한 단계 낮춘다.
// break-all은 이메일을 아무 데서나 쪼개므로 break-words로 바꾼다.
const VALUE = 'font-display text-title font-bold tracking-[-0.03em] break-words';

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead idx="05" title="Contact" className="mb-11" />
      <RevealGroup className="flex flex-col gap-2">
        {LINKS.map(({ label, value, href, external, copy }) => (
          <RevealItem key={label}>
            {copy ? (
              <CopyEmail
                className={`${ROW} cursor-pointer`}
                label={<span className={LABEL}>{label}</span>}
                valueClassName={VALUE}
                tooltipAlign="start"
              />
            ) : (
              <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={`group ${ROW}`}>
                <span className={LABEL}>{label}</span>
                <span className={VALUE}>
                  {value}
                  {external ? (
                    <>
                      <span className="sr-only">(새 탭에서 열림)</span>
                      {/* 값 글자(24px)에 맞춰 키우고, 줄바꿈돼도 주소 끝에 붙어 다니게 인라인으로 둔다 */}
                      <ArrowUpRightIcon
                        className={`ml-1.5 inline size-5 align-[-0.05em] text-muted-foreground ${ARROW_NUDGE}`}
                      />
                    </>
                  ) : null}
                </span>
              </a>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
