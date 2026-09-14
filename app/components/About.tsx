import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';
import { marked } from './marked';

// 순서는 히어로 리드(app/content/copy.ts LEAD)를 따른다 —
// 배우고(LEARN) 적용하며(BUILD) 끝까지 파고들어(OWN) 성과로 만듭니다(SOLVE). LEAD가 바뀌면 함께 볼 것.
const ABOUT = [
  {
    tag: 'LEARN',
    label: '학습력',
    title: '새로운 기술도 빠르게 흡수해 실무에 적용합니다',
    body: [
      '처음 마주하는 기술이라도 사용법을 외우기보다 ==핵심 동작 원리부터 파악==합니다.',
      '공식 문서와 작은 예제로 직접 확인하며 빠르게 습득하고,',
      '“왜 이렇게 동작하는가”를 파악해 실제 문제에 맞게 응용할 수 있도록 적용합니다.',
    ],
  },
  {
    tag: 'BUILD',
    label: '실행력',
    title: '직접 겪은 불편을 더 나은 사용자 경험으로 개선합니다',
    body: [
      '떠오른 아이디어를 구상에서 멈추지 않고, 기획·설계·개발·배포까지 직접 끌고 가 ==하나의 완성된 결과물로 만듭니다==.',
      '막히는 구간이 생겨도 책임지고 마무리하며, 사용자의 반응을 다음 개선 방향으로 삼아 결과물을 꾸준히 키워나갑니다.',
    ],
  },
  {
    tag: 'OWN',
    label: '주도성',
    title: '맡은 파트를 넘어 문제의 원인까지 찾아갑니다',
    body: [
      '==제 담당 영역에서 선을 긋지 않습니다==.',
      '문제가 생기면 프론트엔드 경계에서 멈추지 않고, 데이터베이스 권한이나 서버 설정처럼',
      '다른 파트의 영역까지 직접 확인하며 원인을 좁힙니다.',
    ],
  },
  {
    tag: 'SOLVE',
    label: '문제해결력',
    title: '마주한 문제를 눈에 보이는 성과로 만듭니다',
    body: [
      '임시방편으로 덮지 않고 ==원인을 끝까지 추적해 근본부터 해결합니다==.',
      '추측 대신 직접 측정한 데이터로 문제점을 진단하고, 개선 전후를 수치로 비교해',
      '성과를 명확히 검증하는 방식으로 일하는 것을 지향합니다.',
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page scroll-mt-20 px-7 pt-[68px] pb-10">
      <SectionHead idx="03" title="About" className="mb-3" />
      <RevealGroup className="flex flex-col">
        {ABOUT.map((a) => (
          <RevealItem
            key={a.tag}
            className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-baseline gap-8 border-b border-border py-10"
          >
            <div className="flex flex-col gap-3">
              {/* 태그와 한글 라벨을 같은 급(11px·13px)으로 한 줄에 두고 볼드는 아래 제목에만 남긴다.
                  한 줄 안에서 크기가 뛰지 않아 세 조각의 베이스라인이 맞는다. */}
              <div className="flex items-baseline gap-2 text-label font-medium text-muted-foreground">
                <span className="font-mono text-meta tracking-[0.2em]">{a.tag}</span>
                <span aria-hidden>·</span>
                <span>{a.label}</span>
              </div>
              <h3 className="text-title font-bold tracking-[-0.03em] text-balance break-keep">
                {a.title}
              </h3>
            </div>
            {/* 본문은 줄 단위 배열 — 넓은 화면(lg)에서만 줄마다 끊는다. 좁은 화면에서 강제로 끊으면
                자연 줄바꿈과 겹쳐 한두 글자짜리 조각 줄이 생기므로 이어 흘린다. */}
            <p className="col-span-2 text-read text-muted-foreground text-pretty break-keep">
              {a.body.map((line, i) => (
                <span key={i} className="lg:block">
                  {i > 0 ? ' ' : null}
                  {marked(line)}
                </span>
              ))}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
