import { HEADLINE, INTRO, KICKER, LEAD } from '../content/copy';
import { PROFILE } from '../content/profile';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-page px-7 pt-[92px] pb-20">
      <div className="fade-in-slow mb-10">
        <span className="font-mono text-meta tracking-[0.14em] text-muted-foreground">
          {KICKER}
        </span>
      </div>

      {/* 좌우 분리 등장 — 1행은 왼쪽에서, 2행은 오른쪽에서 들어온다.
          120ms 시차를 두는 이유: 동시에 들어오면 좌우가 충돌로 보이고,
          시차가 있어야 아이디어에서 출시로 "이어지는" 움직임으로 읽힌다. */}
      <h1 className="font-display text-h1 font-bold tracking-[-0.045em] text-balance">
        <span className="rise-mask">
          <span className="rise-line-left">{HEADLINE.line1}</span>
        </span>
        <span className="rise-mask">
          <span className="rise-line-right text-primary-strong" style={{ animationDelay: '120ms' }}>
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
