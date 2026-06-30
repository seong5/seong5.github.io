import SectionHead from './SectionHead';

const ABOUT = [
  {
    tag: 'LEARN',
    kw: '학습력',
    title: '새로운 기술도 빠르게 흡수해 실무에 적용합니다',
    body: '처음 마주하는 기술이라도 사용법을 외우기보다 핵심 동작 원리부터 파악합니다. 공식 문서와 작은 예제로 직접 확인하며 빠르게 체화하고, “왜 이렇게 동작하는가”를 파악해 실제 문제에 맞게 응용할 수 있도록 적용합니다.',
  },
  {
    tag: 'BUILD',
    kw: '실행력',
    title: '직접 겪은 불편을 더 나은 사용자 경험으로 개선합니다',
    body: '떠오른 아이디어를 구상에서 멈추지 않고, 기획·설계·개발·배포까지 직접 끌고 가 하나의 완성된 결과물로 만듭니다. 중간에 막히는 구간이 생겨도 끝까지 책임지고 마무리하며, 사용자의 반응을 다음 개선방향으로 설정하여 결과물을 꾸준히 키워나갑니다.',
  },
  {
    tag: 'SOLVE',
    kw: '문제해결력',
    title: '마주한 문제를 눈에 보이는 성과로 만듭니다',
    body: '문제가 생기면 증상에 임시방편을 두지 않고 원인을 끝까지 추적해 근본부터 해결합니다. 추측 대신 직접 측정한 데이터로 문제점을 진단하고, 개선 전후를 수치로 비교해 성과를 명확히 검증하는 방식으로 일하는 것을 지향합니다.',
  },
];

export default function About() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="about"
    >
      <SectionHead idx="01" title="About" />
      {/* member-benefit-card — 검정 블록 3-up, 페이지 중반의 흑백 대비 모먼트 */}
      <div className="grid grid-cols-3 gap-4 max-nav:grid-cols-1">
        {ABOUT.map((a) => (
          <div key={a.tag} className="flex flex-col bg-ink p-8 text-on-primary max-nav:p-7">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-stone">
              {a.tag}
            </span>
            <h3 className="mt-5 text-[1.3125rem] font-medium leading-[1.3] tracking-[-0.01em] break-keep">
              {a.kw}
              <span className="text-stone"> — </span>
              {a.title}
            </h3>
            <p className="mt-4 text-[0.9375rem] font-normal leading-[1.85] text-stone break-keep">
              {a.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
