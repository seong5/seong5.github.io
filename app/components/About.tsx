import { RevealGroup, RevealItem } from './Reveal';
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
    body: '문제가 생기면 임시방편을 두지 않고 원인을 끝까지 추적해 근본부터 해결합니다. 추측 대신 직접 측정한 데이터로 문제점을 진단하고, 개선 전후를 수치로 비교해 성과를 명확히 검증하는 방식으로 일하는 것을 지향합니다.',
  },
];

export default function About() {
  return (
    <section
      className="max-w-[1080px] px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="about"
    >
      <SectionHead idx="01" title="About" />
      {/* 카드 없는 에디토리얼 행 — 좌측 라벨 / 우측 제목·본문, hairline 구분 */}
      <RevealGroup className="flex flex-col">
        {ABOUT.map((a) => (
          <RevealItem
            key={a.tag}
            className="grid grid-cols-[120px_1fr] gap-x-6 border-t border-hairline py-8 first:border-t-0 first:pt-0 max-nav:grid-cols-1 max-nav:gap-y-3"
          >
            <div className="pt-1 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-accent">
              {a.tag}
            </div>
            <div>
              <h3 className="text-[1.3125rem] font-medium leading-[1.3] tracking-[-0.01em] text-paper break-keep">
                {a.kw}
                <span className="text-mute"> — </span>
                {a.title}
              </h3>
              <p className="mt-3 max-w-[68ch] text-[1rem] font-normal leading-[1.8] text-charcoal break-keep">
                {a.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
