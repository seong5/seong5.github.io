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
      '처음 마주하는 기술도 사용법만 익히고 넘어가기보다 ==핵심 동작 원리부터 파악==하는 편입니다.',
      'Claude Log는 처음 다뤄 본 Electron으로 시작해 한 달 만에 v1.0.8까지 배포했습니다.',
      '로컬에서 어림잡던 사용량은 로그인 토큰의 저장 위치를 추적해 실제 사용량 조회로 바꿨습니다.',
    ],
  },
  {
    tag: 'BUILD',
    label: '실행력',
    title: '직접 겪은 불편을 더 나은 사용자 경험으로 개선합니다',
    body: [
      '떠오른 아이디어를 구상에서 멈추지 않고 기획부터 배포까지 끌고 가 ==하나의 완성된 결과물로 만듭니다==.',
      '다정해는 단톡방에서 ‘아무거나’만 오가다 흐지부지되던 약속을 끝까지 정하게 하려고 만든 앱입니다.',
      'App\u00A0Store 심사에서 추가 자료를 요청받았고 이후 요구 사항을 모두 조사해 신고·차단·금칙어까지 반영하고 출시를 마쳤습니다.',
    ],
  },
  {
    tag: 'OWN',
    label: '주도성',
    title: '맡은 파트를 넘어 문제의 원인까지 찾아갑니다',
    body: [
      '문제가 생기면 ==제 담당 영역에서 선을 긋지 않습니다==.',
      '배포 환경에서만 API가 404로 실패하자 게이트웨이 설정까지 따라가 어긋난 경로를 찾았습니다.',
      '이어서 40곳 넘게 하드코딩된 API 경로 접두사를 한곳에서 관리해, 로컬과 배포가 같은 규칙을 따르게 했습니다.',
    ],
  },
  {
    tag: 'SOLVE',
    label: '문제해결력',
    title: '마주한 문제를 눈에 보이는 성과로 만듭니다',
    body: [
      '임시방편으로 덮기보다 ==원인을 끝까지 추적해 근본부터 해결합니다==.',
      '추측 대신 직접 측정한 수치로 문제를 진단하고, 개선 전후를 비교해 성과를 확인합니다.',
      'SUB-FC 메인 페이지는 데이터 요청을 서버 컴포넌트로 옮겨 Lighthouse 성능 점수를 71점에서 99점으로 끌어올렸습니다.',
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
