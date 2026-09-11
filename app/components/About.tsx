import { RevealGroup, RevealItem } from './Reveal';
import SectionHead from './SectionHead';

const ABOUT = [
  {
    tag: 'LEARN',
    label: '학습력',
    title: '새로운 기술도 빠르게 흡수해 실무에 적용합니다',
    body: '처음 마주하는 기술이라도 사용법을 외우기보다 핵심 동작 원리부터 파악합니다. 공식 문서와 작은 예제로 직접 확인하며 빠르게 습득하고, “왜 이렇게 동작하는가”를 파악해 실제 문제에 맞게 응용할 수 있도록 적용합니다.',
  },
  {
    tag: 'BUILD',
    label: '실행력',
    title: '직접 겪은 불편을 더 나은 사용자 경험으로 개선합니다',
    body: '떠오른 아이디어를 구상에서 멈추지 않고, 기획·설계·개발·배포까지 직접 끌고 가 하나의 완성된 결과물로 만듭니다. 취미인 러닝에서 단련된 완주할 때까지 포기하지 않는 근성으로, 막히는 구간이 생겨도 끝까지 책임지고 마무리하며 사용자의 반응을 다음 개선방향으로 설정해 결과물을 꾸준히 키워나갑니다.',
  },
  {
    tag: 'SOLVE',
    label: '문제해결력',
    title: '마주한 문제를 눈에 보이는 성과로 만듭니다',
    body: '문제가 생기면 임시방편을 두지 않고 원인을 끝까지 추적해 근본부터 해결합니다. 추측 대신 직접 측정한 데이터로 문제점을 진단하고, 개선 전후를 수치로 비교해 성과를 명확히 검증하는 방식으로 일하는 것을 지향합니다.',
  },
  {
    tag: 'OWN',
    label: '주도성',
    title: '화면 너머의 데이터 구조와 권한까지 책임집니다',
    body: '화면에서 끝나는 문제는 드뭅니다. 여러 갈래로 갈리는 판정 규칙은 화면이 아니라 결과가 실제로 확정되는 자리인 데이터베이스에 두고, 권한은 한 겹으로 끝내지 않고 누가 볼 수 있는지·무엇을 고칠 수 있는지·무엇을 실행할 수 있는지를 나눠 점검합니다. 배포 장애를 만나면 프론트엔드 경계에서 멈추지 않고 게이트웨이 라우팅과 서버의 CORS 설정까지 직접 열어 원인을 좁힙니다.',
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
            <p className="col-span-2 text-read text-muted-foreground text-pretty break-keep">{a.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
