export default function Hero() {
  return (
    <header className="max-w-[1080px] border-b border-line px-[72px] pb-[84px] pt-[96px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[56px]">
      <div className="mb-[30px] inline-flex flex-wrap items-center gap-[10px] font-mono text-[0.75rem] text-muted">
        <span className="whitespace-nowrap rounded-[100px] border border-line2 px-[10px] py-[3px]">
          {'2026 PORTFOLIO'}
        </span>{' '}
        사용자 경험을 기술로 풀어내는 프론트엔드 개발자
      </div>
      <h2 className="max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.22] tracking-[-.02em] break-keep">
        마주한 문제를 파고들어,
        <br />
        <span className="whitespace-nowrap">
          확실한 <em className="not-italic text-accent">성과</em>로 전환합니다.
        </span>
      </h2>
      <p className="mt-7 text-[1rem] font-light leading-[1.85] text-ink2">
        개발하며 마주한 불편함과 문제점을 그냥 넘기지 않고, 하나의 서비스나 기능으로 풀어내며
        성취감을 느끼는 개발자입니다. <br /> 생소한 로직과 기술 스택 앞에서도 두려움보다 호기심과
        도전으로 빠르게 수용하고 학습해나가며 실무에 적용하는 것을 좋아합니다. <br /> 사용자
        피드백과 문제 지점을 파고들어 눈에 보이는 성과로 전환하여, 사용할수록 더욱 나아지는 서비스는
        만드는데 집중합니다.
      </p>
      <div className="mt-10 flex flex-wrap gap-[10px]">
        <span className="rounded-[4px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.78125rem] text-ink2">
          React · Next.js
        </span>
        <span className="rounded-[4px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.78125rem] text-ink2">
          TypeScript
        </span>
        <span className="rounded-[4px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.78125rem] text-ink2">
          Tailwind CSS
        </span>
        <span className="rounded-[4px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.78125rem] text-ink2">
          Zustand · Tanstack Query
        </span>
        <span className="rounded-[4px] border border-line bg-panel px-3 py-1.5 font-mono text-[0.78125rem] text-ink2">
          Zod · Jest
        </span>
      </div>
    </header>
  );
}
