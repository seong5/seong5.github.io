import Image from 'next/image';

import { HEADLINE, INTRO, KICKER, LEAD } from '../content/copy';
import { PROFILE } from '../content/profile';
import CopyEmail from './CopyEmail';
import { ArrowUpRightIcon, ARROW_NUDGE, GithubIcon } from './icons';
import { Button, buttonVariants } from './ui/button';

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

      {/* 사진 레일 + 텍스트 한 줄기. 리드와 본문을 나란히 두면 텍스트가 가로를
          넓게 먹어 사진이 눌린다. 세로로 쌓아 비는 폭을 사진에 넘긴다.
          flex-wrap이라 좁아지면 사진이 한 줄을 차지하며 접힌다. */}
      <div className="mt-14 flex flex-wrap items-start gap-11">
        {/* 증명사진을 얼굴 기준 정사각으로 구운 크롭본. 240px에 묶는 이유는 선명도다 —
            원본이 413px뿐이라 300px로 키우면 고밀도 화면에서 1.45배 늘어나 부옇게 보인다.
            240px이면 1.16배라 사실상 원본 그대로 찍힌다.
            폭이 줄면 160px까지 따라 줄어든다 — 고정하면 모바일에서 원이 화면을 다 먹는다.
            폴드 위라 lazy로 두면 뒤늦게 튀어 들어온다.
            pointer-events-none이 우클릭을 감싸는 div로 흘려보내 브라우저가 이미지용
            메뉴("이미지를 다른 이름으로 저장")를 구성하지 못하게 한다. 링크도 hover도
            없는 아바타라 잃는 상호작용이 없다. 우발적 저장을 막는 억제책일 뿐,
            주소로 직접 받는 것까지는 정적 사이트에서 막을 수 없다. */}
        <Image
          src={PROFILE.avatar}
          alt={`${PROFILE.name} 프로필 사진`}
          width={240}
          height={240}
          priority
          draggable={false}
          className="pointer-events-none size-[clamp(160px,22vw,240px)] shrink-0 select-none rounded-chip border border-border object-cover"
        />

        {/* max-w를 660px에 묶는 이유 — 본문 세 문장이 44~60자라 이 폭에서 모두 두 줄로
            떨어진다. 폭을 다 주면 둘째 문장만 한 줄이 되어 덩어리가 들쭉날쭉해진다.
            본문 세 문장은 각각 독립 <p>다. <br />로 고정하면 뷰포트마다 조각 줄이 생긴다. */}
        <div className="flex min-w-[310px] max-w-[660px] flex-1 basis-[440px] flex-col gap-9">
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
        <CopyEmail className={buttonVariants({ variant: 'outline', size: 'track' })} icon />
        <Button asChild variant="outline" size="track">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="group">
            <GithubIcon />
            github.com/seong5
            <span className="sr-only">(새 탭에서 열림)</span>
            <ArrowUpRightIcon className={ARROW_NUDGE} />
          </a>
        </Button>
      </div>
    </section>
  );
}
