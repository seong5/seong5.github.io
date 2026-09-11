import { HEADLINE, INTRO, KICKER, LEAD } from '../content/copy';
import { PROFILE } from '../content/profile';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-page px-7 pt-[92px] pb-20">
      {/* 상태 표시 — 라임 점이 깜빡이며 "지금 구직 중"을 첫 줄에서 알린다 */}
      <div className="fade-in-slow mb-10 flex items-center gap-2.5">
        <span aria-hidden className="pulse-dot h-[7px] w-[7px] rounded-chip bg-primary" />
        <span className="font-mono text-meta tracking-[0.14em] text-muted-foreground">
          {KICKER}
        </span>
      </div>

      {/* 2행 라이즈업 — 각 행이 overflow 마스크 안에서 올라온다.
          타자기 방식과 달리 첫 프레임부터 글자 폭이 확정돼 레이아웃이 흔들리지 않는다. */}
      <h1 className="font-display text-h1 font-bold tracking-[-0.045em] text-balance">
        <span className="rise-mask">
          <span className="rise-line">{HEADLINE.line1}</span>
        </span>
        <span className="rise-mask">
          <span className="rise-line text-primary-strong" style={{ animationDelay: '120ms' }}>
            {HEADLINE.line2}
          </span>
        </span>
      </h1>

      {/* 리드 / 본문 2열 — auto-fit이라 좁아지면 알아서 한 줄로 쌓인다.
          본문 세 문장은 각각 독립 <p>다. <br />로 고정하면 뷰포트마다 조각 줄이 생긴다. */}
      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] items-start gap-11">
        {/* 리드만 두 행으로 끊는다 — 아래 본문 세 문장과 달리 문장이 하나뿐이라
            행이 밀리지 않는다. 좁은 폭에서는 각 행이 자연스럽게 한 번 더 접힌다. */}
        <p className="text-quote font-semibold tracking-[-0.02em] text-pretty break-keep">
          <span className="block">{LEAD.line1}</span>
          <span className="block">{LEAD.line2}</span>
        </p>
        <div className="flex flex-col gap-[18px] text-read text-muted-foreground text-pretty break-keep">
          {INTRO.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>

      <div className="mt-13 flex flex-wrap gap-2.5">
        <Button asChild size="track">
          <a href="#projects">
            프로젝트 보기
            <span aria-hidden className="font-mono">
              ↓
            </span>
          </a>
        </Button>
        <Button asChild variant="outline" size="track">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </Button>
        <Button asChild variant="outline" size="track">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            github.com/seong5
          </a>
        </Button>
      </div>
    </section>
  );
}
