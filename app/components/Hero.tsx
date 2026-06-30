import { Button } from './ui';

export default function Hero() {
  return (
    <header className="max-w-[1080px] px-[72px] pb-[84px] pt-[64px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[44px]">
      {/* eyebrow */}
      <div className="mb-[26px] flex flex-wrap items-center gap-[10px] text-[0.75rem] font-medium text-mute">
        <span className="whitespace-nowrap rounded-full border border-hairline px-3 py-1">
          2026 PORTFOLIO
        </span>
        <span>사용자 경험을 기술로 풀어내는 프론트엔드 개발자</span>
      </div>

      {/* 영문 디스플레이 로크업 (Bebas Neue, 대문자, line-height 0.9) */}
      <h1 className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-ink text-[clamp(3.75rem,12vw,7.5rem)]">
        Frontend
        <br />
        Developer
      </h1>

      {/* 한글 헤드라인 (heading 티어) */}
      <p className="mt-[34px] max-w-[24ch] text-[clamp(1.375rem,3vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink break-keep">
        빠르게 배우고 적응하며 끝까지 파고들어, 문제를 확실한 성과로 만듭니다.
      </p>

      {/* 본문 */}
      <p className="mt-6 max-w-[62ch] text-[1rem] font-normal leading-[1.8] text-charcoal break-keep">
        개발하며 마주한 불편함과 문제점을 그냥 넘기지 않고, 하나의 서비스나 기능으로 풀어내며
        성취감을 느끼는 개발자입니다. 생소한 로직과 기술 스택 앞에서도 두려움보다 호기심과 도전으로
        빠르게 수용하고 학습해나가며 실무에 적용하는 것을 좋아합니다. 사용자 피드백과 문제 지점을
        파고들어 눈에 보이는 성과로 전환하여, 사용할수록 더욱 나아지는 서비스를 만드는 데
        집중합니다.
      </p>

      {/* CTA pill */}
      <div className="mt-9 flex flex-wrap gap-3">
        <Button href="#projects" variant="primary">
          프로젝트 보기
          <span aria-hidden>↓</span>
        </Button>
      </div>
    </header>
  );
}
