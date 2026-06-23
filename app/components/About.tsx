import SectionHead from './SectionHead';

export default function About() {
  return (
    <section
      className="max-w-[1080px] border-b border-line px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="about"
    >
      <SectionHead idx="01" title="About" />
      <div className="flex flex-col gap-[44px]">
        <div className="grid grid-cols-[48px_1fr] gap-7">
          <div className="font-mono text-[0.75rem] text-accent">A1</div>
          <div>
            <h3 className="mb-3 text-[1.3125rem] font-semibold tracking-[-.01em]">
              새로운 시도를 통한 문제 해결에 몰입합니다
            </h3>
            <p className="max-w-[64ch] text-[0.9375rem] font-light leading-[1.85] text-ink2">
              생소한 로직과 기술 스택을 도입할 때 두려움보다는 호기심과 흥미를 바탕으로 빠르게
              수용합니다. 비즈니스 가치에 따라 우선순위를 정하고, 마주하는 기술적 난제를 주도적으로
              해결하며 업무를 끝까지 완수하는 성향을 갖추고 있습니다.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[48px_1fr] gap-7">
          <div className="font-mono text-[0.75rem] text-accent">A2</div>
          <div>
            <h3 className="mb-3 text-[1.3125rem] font-semibold tracking-[-.01em]">
              직접 겪은 불편함을 개발로 해결합니다
            </h3>
            <p className="max-w-[64ch] text-[0.9375rem] font-light leading-[1.85] text-ink2">
              사용하며 느낀 불편함을 그냥 넘기지 않고, 이를 해결하는 도구를 기획부터 개발·배포까지 직접
              완성합니다. Claude Code 사용량을 추적하는 macOS 메뉴바 앱을 1인 개발해 오픈소스로 공개했고,
              실사용자 규모의 서비스도 End-to-End로 진행하며 피드백을 실제 기능으로 구현하는 과정에서 더
              나은 경험을 제공할 때 큰 성취감을 느낍니다.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[48px_1fr] gap-7">
          <div className="font-mono text-[0.75rem] text-accent">A3</div>
          <div>
            <h3 className="mb-3 text-[1.3125rem] font-semibold tracking-[-.01em]">
              목표를 끝까지 완수하여 성과로 증명합니다
            </h3>
            <p className="max-w-[64ch] text-[0.9375rem] font-light leading-[1.85] text-ink2">
              하프 마라톤 완주, 워킹홀리데이, 학위 취득 등 장기적인 목표를 달성해온 근성은 복잡한
              로직을 풀어내는 인내심으로 이어집니다. 어떤 난관에서도 업무를 완수해내는 책임감으로 팀이
              믿고 맡길 수 있는 동료가 되겠습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
