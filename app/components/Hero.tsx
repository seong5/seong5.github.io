export default function Hero() {
  return (
    <header className="max-w-[1080px] border-b border-line px-[72px] pb-[84px] pt-[96px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[56px]">
      <div className="mb-[30px] inline-flex flex-wrap items-center gap-[10px] font-mono text-[0.75rem] text-muted">
        <span className="whitespace-nowrap rounded-[100px] border border-line2 px-[10px] py-[3px]">
          {'// 2026 PORTFOLIO'}
        </span>{' '}
        사용자 경험을 읽는 프론트엔드 개발자
      </div>
      <h2 className="max-w-[22ch] text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.22] tracking-[-.02em] break-keep">
        멈추지 않는 도전으로,
        <br />
        <span className="whitespace-nowrap">
          서비스의 <em className="not-italic text-accent">성장</em>을 증명합니다.
        </span>
      </h2>
      <p className="mt-7 text-[1rem] font-light leading-[1.85] text-ink2">
        생소한 로직과 기술 스택 앞에서도 두려움보다 호기심으로 빠르게 수용하며, 비즈니스 가치에 따라
        우선순위를 정해 업무를 완수합니다. 실사용자 규모의 서비스를 기획부터 배포까지 End-to-End로
        진행하며, 사용자 피드백을 기술적 가치로 전환해 서비스의 완성도를 높이는 데 집중합니다.
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
