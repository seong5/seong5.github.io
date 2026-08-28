import { PROFILE, PROFILE_FACTS } from '../content/profile';
import TypewriterText from './TypewriterText';
import { buttonClasses } from './ui';

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

        <p className="mt-4 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-canvas/80">
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

        {/* CTA — 소개(리드+본문)가 끝난 뒤의 행동 지점. 이어지는 두 문단을 가르지 않도록 아래에 둔다.
            종이 판 위라 accent(밝은 슬레이트)는 1.90:1로 묻힌다 → canvas 반전 pill을 쓴다. */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#projects" className={buttonClasses('outline', 'border border-transparent')}>
            프로젝트 보기
            <span aria-hidden>→</span>
          </a>
          <a href={`mailto:${PROFILE.email}`} className={buttonClasses('onDark')}>
            이메일 보내기
          </a>
        </div>

        {/* 메타 행 — 프로젝트 상세의 facts 그리드와 같은 언어. 담당자가 30초 안에 확인하는 값.
            border-t가 이미 강한 구분이라 CTA 위 여백(mt-10)보다 좁게 둔다. */}
        <dl className="mt-9 grid grid-cols-4 gap-x-6 gap-y-6 border-t border-canvas/20 pt-6 max-wrap:grid-cols-2">
          {PROFILE_FACTS.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-canvas/85">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-[0.875rem] font-medium leading-[1.5] text-canvas break-keep">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
