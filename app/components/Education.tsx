import SectionHead from './SectionHead';

export default function Education() {
  return (
    <section
      className="max-w-[1080px] border-b border-line px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="education"
    >
      <SectionHead idx="05" title="Education" />
      <div className="grid">
        <div className="grid grid-cols-[130px_92px_1fr] items-baseline gap-5 border-t border-line py-4 first:border-t-0 max-nav:grid-cols-1 max-nav:gap-[3px] max-nav:py-[18px]">
          <div className="font-mono text-[0.78125rem] text-muted">2025.02 — 2025.08</div>
          <div className="font-mono text-[0.78125rem] text-accent max-nav:order-first">수료</div>
          <div className="text-[0.90625rem] font-normal text-ink2">
            <b className="font-semibold text-ink">코드잇 스프린트</b> — 프론트엔드 엔지니어 15기 (협업
            프로젝트 중심 실무형 교육)
          </div>
        </div>
        <div className="grid grid-cols-[130px_92px_1fr] items-baseline gap-5 border-t border-line py-4 first:border-t-0 max-nav:grid-cols-1 max-nav:gap-[3px] max-nav:py-[18px]">
          <div className="font-mono text-[0.78125rem] text-muted">2025.08 — 현재</div>
          <div className="font-mono text-[0.78125rem] text-accent max-nav:order-first">수강</div>
          <div className="text-[0.90625rem] font-normal text-ink2">
            <b className="font-semibold text-ink">인프런</b> — Docker / React Native / Java · Spring
            (백엔드 확장 학습)
          </div>
        </div>
        <div className="grid grid-cols-[130px_92px_1fr] items-baseline gap-5 border-t border-line py-4 first:border-t-0 max-nav:grid-cols-1 max-nav:gap-[3px] max-nav:py-[18px]">
          <div className="font-mono text-[0.78125rem] text-muted">졸업예정</div>
          <div className="font-mono text-[0.78125rem] text-accent max-nav:order-first">전문학사</div>
          <div className="text-[0.90625rem] font-normal text-ink2">
            <b className="font-semibold text-ink">학점은행제</b> — 영어영문학 전공
          </div>
        </div>
      </div>
    </section>
  );
}
