import SectionHead from './SectionHead';

export default function ExperienceSkills() {
  return (
    <section
      className="max-w-[1080px] border-b border-line px-[72px] py-[80px] max-nav:px-[22px] max-nav:py-[52px]"
      id="experience"
    >
      <div className="grid grid-cols-2 gap-16 max-nav:grid-cols-1 max-nav:gap-[46px]">
        <div>
          <SectionHead idx="03" title="Experience" />
          <div className="flex flex-col gap-[26px]">
          <div>
            <div className="font-mono text-[0.75rem] text-accent">2026.03 — 2026.06 · 3개월</div>
            <h4 className="mb-[3px] mt-[6px] text-[1rem] font-semibold">UMUST R&amp;D</h4>
            <div className="font-mono text-[0.78125rem] text-muted">프론트엔드 인턴 · 사업부 IT팀</div>
            <p className="mt-2 text-[0.84375rem] font-normal leading-[1.7] text-ink2">
              도봉라이프 어드민 서비스 구축을 담당하고, 사내 ERP·CRO 서비스의 프론트엔드 구축과
              통합까지 진행.
            </p>
          </div>
          <div>
            <div className="font-mono text-[0.75rem] text-accent">2025.12 — 2026.01 · 1개월</div>
            <h4 className="mb-[3px] mt-[6px] text-[1rem] font-semibold">똑똑한개발자</h4>
            <div className="font-mono text-[0.78125rem] text-muted">프론트엔드 인턴 · TF팀</div>
            <p className="mt-2 text-[0.84375rem] font-normal leading-[1.7] text-ink2">
              Deckly(AI 사업제안서 자동화 SaaS) 개발 참여. 응답 데이터·네트워크 요청 최적화, Admin
              사용자 트래킹 구현.
            </p>
          </div>
          <div>
            <div className="font-mono text-[0.75rem] text-accent">2023.01 — 2025.01 · 2년</div>
            <h4 className="mb-[3px] mt-[6px] text-[1rem] font-semibold">JFounders</h4>
            <div className="font-mono text-[0.78125rem] text-muted">F&amp;B 사업부 · 지점장</div>
            <p className="mt-2 text-[0.84375rem] font-normal leading-[1.7] text-ink2">
              프랜차이즈 카페·자사 샐러드 매장 운영 총괄. 인사·재정·마케팅·발주 관리, 근거리 직접
              배달로 월 매출 최대 17% 증가, 상황별 매뉴얼 제작으로 운영 자동화.
            </p>
          </div>
          <div>
            <div className="font-mono text-[0.75rem] text-accent">2018.11 — 2019.06 · 7개월</div>
            <h4 className="mb-[3px] mt-[6px] text-[1rem] font-semibold">호주 워킹홀리데이</h4>
            <div className="font-mono text-[0.78125rem] text-muted">Sydney, AU</div>
            <p className="mt-2 text-[0.84375rem] font-normal leading-[1.7] text-ink2">
              시드니 체류 중 다양한 환경에서 근무하며 외국어 소통 능력과 여러 국가의 문화를 경험. 장기
              목표를 계획하고 달성.
            </p>
          </div>
          </div>
        </div>
        <div id="skills">
          <SectionHead idx="04" title="Skills" />
          <div className="flex flex-col gap-[22px]">
          <div>
            <div className="mb-[11px] font-mono text-[0.75rem] uppercase tracking-[.08em] text-muted">
              Core
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                JavaScript (ES6+)
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                TypeScript
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                React
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Next.js (App Router)
              </span>
            </div>
          </div>
          <div>
            <div className="mb-[11px] font-mono text-[0.75rem] uppercase tracking-[.08em] text-muted">
              State
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Zustand
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Tanstack Query
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                React Hook Form
              </span>
            </div>
          </div>
          <div>
            <div className="mb-[11px] font-mono text-[0.75rem] uppercase tracking-[.08em] text-muted">
              Styling
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Tailwind CSS
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Styled-components
              </span>
            </div>
          </div>
          <div>
            <div className="mb-[11px] font-mono text-[0.75rem] uppercase tracking-[.08em] text-muted">
              Quality / Test
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Zod
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Jest
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                ESLint
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Prettier
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Storybook
              </span>
            </div>
          </div>
          <div>
            <div className="mb-[11px] font-mono text-[0.75rem] uppercase tracking-[.08em] text-muted">
              Deploy / Infra
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Vercel
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                GitHub Actions
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                AWS
              </span>
              <span className="rounded-[4px] border border-line bg-panel px-[11px] py-[5px] text-[0.8125rem] text-ink">
                Supabase
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
