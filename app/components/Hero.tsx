import TypewriterText from './TypewriterText';

export default function Hero() {
  return (
    /* 다크 반전 인트로 — 바깥은 우측 컬럼 full-bleed 다크 배경, 안쪽은 1080px 정렬 */
    <header className="w-full bg-ink text-canvas">
      <div className="mx-auto max-w-[1080px] px-[72px] pb-[84px] pt-[64px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[44px]">
        <h1 className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-canvas text-[clamp(2.25rem,7vw,4.75rem)]">
          <TypewriterText text="Ready to Learn," />
          <br />
          <TypewriterText text="Ready to Run" startDelayMs={975} caretOnDone />
        </h1>

        <p className="mt-4 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-canvas/70">
          Frontend Developer
        </p>

        <p className="mt-[34px] max-w-[36ch] text-[clamp(1.375rem,3vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em] text-canvas break-keep">
          빠르게 배우고 적용하며 끝까지 파고들어
          <br />
          문제를 확실한 성과로 만듭니다.
        </p>

        <p className="mt-6 max-w-[80ch] text-[1rem] font-normal leading-[1.8] text-canvas/80 break-keep">
          개발하며 마주한 불편함과 문제점을 그냥 넘기지 않고 하나의 서비스나 기능으로 풀어내며
          성취감을 느끼는 개발자입니다. <br /> 매사에 두려움보다는 호기심과 도전으로 접근하여 빠르게
          경험하고 학습해 나가는 것을 좋아합니다. <br /> 사용자 피드백과 문제 지점을 파고들어 눈에
          보이는 성과로 전환하여 사용할수록 더욱 나아지는 서비스를 만드는 데 집중합니다.
        </p>
      </div>
    </header>
  );
}
