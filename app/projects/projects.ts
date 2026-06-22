export type ProjectLink = {
  label: string;
  href: string;
};

/** 정량 지표 — 주요 성과 상단 카드 그리드 (스캔 시 눈에 박히는 숫자) */
export type Metric = {
  value: string;
  label: string;
};

/** 인사이트 단계 — 계층적 설계 설명의 한 단계 */
export type InsightStep = {
  title: string;
  points: string[];
};

/** 다이어그램 이미지 (svg는 unoptimized로 서빙) */
export type Figure = { src: string; w: number; h: number };

/** 인사이트 — 도입부 + 단계별 설명 */
export type Insight = {
  title: string;
  intro?: string;
  steps: InsightStep[];
  /** 단계 아래에 붙는 다이어그램 */
  image?: Figure;
};

/** 트러블슈팅 — STAR(Situation·Task·Action·Result) 구조 */
export type Trouble = {
  title: string;
  situation: string;
  task: string;
  action: string[];
  result: string[];
  /** Result 아래에 붙는 다이어그램 */
  image?: Figure;
};

export type Project = {
  slug: string;
  /** 목록 카드와 상세 페이지 제목 */
  title: string;
  /** 한 줄 소속/구분 (목록 카드 좌측 메타에 노출) */
  org: string;
  /** 진행 기간 */
  period: string;
  /** 진행 중인 프로젝트 표시 */
  active?: boolean;
  /** 상세 페이지 facts 그리드 값 */
  role: string;
  type: string;
  scale: string;
  /** 목록 카드용 짧은 설명 */
  summary: string;
  /** 상세 페이지 헤더용 설명 (없으면 summary 사용) */
  detail?: string;
  /** 핵심 경험 및 성과 — 상세 "What I did" 번호 리스트 */
  highlights: string[];
  /** 기술 스택 */
  stack: string[];
  /** 외부 링크 (배포/저장소 등). URL 미확보 시 빈 배열 */
  links: ProjectLink[];
  /** 목록 카드 썸네일 라벨 (image 없을 때 placeholder에 표시) */
  thumbnail: string;
  /** 대표 이미지 경로(public 기준). 있으면 placeholder 대신 실제 이미지 렌더 */
  image?: string;
  /** 이미지 맞춤 방식. 세로형(모바일 스크린샷)은 "contain" 권장. 기본 "cover" */
  imageFit?: "cover" | "contain";
  /** 상세 페이지 갤러리(여러 장). 있으면 단일 hero 대신 갤러리 섹션을 렌더 */
  gallery?: { src: string; w: number; h: number }[];
  /** 정량 지표 — 있으면 "Key results" 섹션(카드 그리드) 렌더 */
  metrics?: Metric[];
  /** 인사이트 — 있으면 "Insights" 섹션 렌더 */
  insights?: Insight[];
  /** 트러블슈팅 — 있으면 "Troubleshooting" 섹션 렌더 */
  troubleshooting?: Trouble[];
};

export const projects: Project[] = [
  {
    slug: "sub-fc",
    title: "SUB-FC — 팀 매니지먼트 서비스",
    org: "개인 프로젝트",
    period: "2025.08 — current",
    active: true,
    role: "Frontend · Full-cycle",
    type: "Side Project",
    scale: "실사용자 20명",
    summary:
      "SUB-FC의 경기 일정·결과·선수단 정보를 확인하는 팀 매니지먼트 서비스. 기획부터 배포까지 End-to-End로 진행하며 실사용자 피드백을 반영해 고도화 중.",
    detail:
      "SUB-FC의 경기 일정, 결과, 선수단 정보를 확인할 수 있는 팀 매니지먼트 서비스입니다. 기획부터 개발·배포까지 전 과정을 직접 진행하며, 실사용자 피드백을 주기적으로 수집해 UI/UX 개선과 기능 고도화에 반영하고 있습니다.",
    highlights: [
      "기획부터 개발·배포까지 End-to-End 전 과정을 직접 경험.",
      "실사용자 20명을 확보하고 주기적인 피드백 수집을 바탕으로 UI/UX 개선 및 기능 개발에 반영.",
      "기존 프로젝트에서 다루지 않았던 Zod·Jest·Supabase 등 신규 스택을 적극 도입해 프로젝트 퀄리티와 확장성, 견고한 개발 환경 확보.",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "React Hook Form",
      "Zod",
      "Jest",
      "Supabase",
      "Axios",
      "Vercel",
    ],
    links: [],
    thumbnail: "sub-fc.jpg",
    image: "/projects/sub-fc.png",
    imageFit: "contain",
  },
  {
    slug: "dobong-admin",
    title: "도봉라이프 어드민 — 운영 관리 콘솔",
    org: "UMUST R&D · 사업부 IT팀",
    period: "2026.03 — 2026.06",
    role: "Frontend",
    type: "Admin Console",
    scale: "사내 운영툴",
    summary:
      "도봉라이프 서비스 운영을 위한 관리자 콘솔. 쿠폰·사용자·코스·리뷰 등 도메인 관리와 활동 통계 대시보드를 구축.",
    detail:
      "도봉라이프 서비스 운영팀이 사용하는 관리자 콘솔입니다. 활동 통계 대시보드와 사용자·승인·프로모션·코스·장소·리뷰·알림·문의 등 운영 도메인 전반을 관리하는 화면을 구축했습니다.",
    highlights: [
      "쿠폰 사용수·다운로드 수·활성 일반 유지·활성 업장 등 핵심 지표를 한눈에 보는 통계 대시보드 구현.",
      "기간(최근 7일/30일/사용자 지정)별 활동 추이를 시각화하는 차트 구성.",
      "사용자·승인·프로모션·코스·장소·리뷰·알림·고객 문의까지 역할 기반 운영 메뉴를 체계화.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Tanstack Query", "Recharts"],
    links: [],
    thumbnail: "dobong-admin.jpg",
    image: "/projects/dobong-admin.png",
  },
  {
    slug: "umust-erp",
    title: "UMUST R&D ERP — 재고·매출 관리",
    org: "UMUST R&D · 사업부 IT팀",
    period: "2026.03 — 2026.06",
    role: "Frontend",
    type: "ERP / Internal",
    scale: "사내 ERP",
    summary:
      "전체 재고 현황과 입출고·매출을 관리하는 사내 ERP. 품목·거래 이력·매출 관리와 대시보드 통계를 구축하고 통합.",
    detail:
      "전체 재고 현황과 이달의 입출고 통계를 한눈에 확인하는 사내 ERP 서비스입니다. 대시보드, 품목 관리, 거래 이력, 매출 관리 화면을 구축하고 기존 사내 시스템과 통합했습니다.",
    highlights: [
      "총 품목 수·발주 필요·전체 거래 건수·전체 매출·유통기한 임박 등 운영 핵심 지표 대시보드 구현.",
      "월별 입출고 추이 차트와 재고 부족·유통기한 임박 알림 영역 구성.",
      "품목 관리·거래 이력·매출 관리 화면을 구축하고 사내 시스템과 통합.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Tanstack Query", "Recharts"],
    links: [],
    thumbnail: "umust-erp.jpg",
    image: "/projects/umust-erp.png",
  },
  {
    slug: "claude-log",
    title: "Claude Log — 토큰 사용량 트래커",
    org: "개인 프로젝트",
    period: "2026.04 — current",
    active: true,
    role: "1인 개발 · Full-cycle",
    type: "Desktop / Side Project",
    scale: "오픈소스 배포",
    summary:
      "Claude Code 토큰 사용량을 추적·관리하는 macOS 메뉴바 위젯 앱. rate limit 방지를 위해 기획부터 배포까지 1인 개발로 진행하고 GitHub에 오픈소스로 공개.",
    detail:
      "Claude Code를 rate limit에 걸려 사용하지 못하는 상황을 방지하고 토큰 사용량을 추적·확인·관리하기 위해 개발한 macOS 전용 메뉴바 위젯 앱입니다. 메뉴바에 현재 사용률(%)을 상주 표시하고, 클릭하면 사용량 그래프·통계 히트맵 등 상세 화면을 자동 갱신해 보여줍니다. 기획·UI/UX 설계·프론트엔드를 1인 개발로 진행했으며 GitHub에 오픈소스로 공개해 유지보수하고 있습니다.",
    highlights: [
      "매번 /usage나 웹으로 확인하던 사용량을 메뉴바에 %로 상주 표시하고, 클릭 시 그래프·히트맵 상세를 자동 갱신해 작업 흐름을 끊지 않도록 개선.",
      "처음 도입한 Electron으로 화면(렌더러)·데이터(메인)·연결(IPC) 3계층 구조를 설계하고, 미리 허용한 기능만 노출하는 안전한 연결 방식을 적용.",
      "Tray 앱 특성상 몰리기 쉬운 호출을 막기 위해 IPC 진입 쓰로틀(1초)·fetch 최소 간격(5초)·인플라이트 프로미스 싱글턴의 3겹 캐싱/중복 제거 로직을 계층적으로 설계.",
      "Claude Code 대화 로그(jsonl)를 바이트 오프셋 기반 증분 파싱으로 처리해, 파일이 커져도 새로 추가된 양에만 비례하는 일정한 갱신 속도와 데이터 정합성을 확보.",
      "React StrictMode 이중 실행·자동 마운트·주기적 인터벌 등 정상적인 중복 호출이 rate-limit 오류로 노출되던 문제를, 실패 시 캐시를 반환하는 일관된 fallback 정책으로 통일해 해결.",
      "구조·데이터 흐름 설계 시 Claude Code로 여러 대안을 빠르게 비교·검증하고, 코드 리뷰용 sub-agent를 직접 구성해 주기적 리뷰로 코드 품질을 관리.",
      "GitHub에 오픈소스로 공개하고 macOS 전용 설치 파일을 v1.0.8까지 배포, 지속적인 버전 업데이트로 고도화·유지보수 진행.",
    ],
    stack: [
      "Electron",
      "electron-vite",
      "electron-builder",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Playwright",
    ],
    links: [{ label: "GitHub", href: "https://github.com/seong5/claude-log" }],
    thumbnail: "claude-log.jpg",
    gallery: [
      { src: "/projects/claude-log-1.png", w: 920, h: 1162 },
      { src: "/projects/claude-log-2.png", w: 926, h: 996 },
      { src: "/projects/claude-log-3.png", w: 1324, h: 64 },
    ],
    metrics: [
      { value: "v1.0.8", label: "배포 버전 · 오픈소스 공개" },
      { value: "3겹", label: "계층적 호출 방어 로직" },
      { value: "O(추가분)", label: "증분 파싱 갱신 비용" },
      { value: "1인", label: "기획·UI/UX·개발 풀사이클" },
    ],
    insights: [
      {
        title: "다단계 캐싱과 인플라이트 중복 제거 로직 설계",
        intro:
          "Tray 앱은 상단에 아이콘이 계속 떠 있어 호출이 몰리기 쉬울 것이라 예측했습니다. 짧은 시간에 몰리는 호출을 막기 위해 다음과 같은 3겹의 방어 로직을 계층적으로 설계했습니다.",
        steps: [
          {
            title: "IPC 진입 쓰로틀 (1초) — 마지막 결과가 있으면 즉시 캐시 반환",
            points: [
              "화면에서 사용량 요청이 들어오는 가장 바깥 영역에서, 1초 안에 다시 들어온 호출을 곧바로 처리하는 역할을 합니다.",
              "1초 이내의 중복 요청은 마지막 결과값이 존재하면 함수 호출 자체를 일으키지 않고, 캐싱한 값만 즉시 반환합니다.",
            ],
          },
          {
            title: "Fetch 레벨 최소 간격 (5초) — min-interval 이내 재요청은 마지막 결과 반환",
            points: [
              "1번은 IPC 통로를 지키지만, fetch 함수를 호출하는 경로는 5분 타이머·Tray 제목 갱신 등 다른 방법도 존재합니다.",
              "그래서 마지막으로 실제 서버를 호출한 지 5초가 지나지 않았다면, 어떤 경로의 호출이든 캐싱된 값을 반환하도록 방어합니다.",
            ],
          },
          {
            title: "동시 호출 방어 — 인플라이트 프로미스 싱글턴으로 중복 제거",
            points: [
              "1·2번은 캐시가 존재할 때 동작합니다. 하지만 앱을 막 시작했거나 첫 호출이 진행되는 1~2초 사이에 화면에서 여러 호출이 발생하면, 캐시가 없어 1·2번을 통과해 서버 호출이 몰리게 됩니다.",
              "진행 중인 Promise를 싱글턴 변수에 담아두고, 그 사이 들어온 호출은 새로 시작하지 않고 같은 Promise를 반환합니다. 요청이 끝나면 finally에서 변수를 비워 다음 요청을 시작할 수 있도록 설계했습니다.",
              "시간 간격이 아닌 동시성을 방지해, 겹쳐진 여러 호출을 실제 단 1번의 호출로 합쳐 요청합니다.",
            ],
          },
        ],
        image: { src: "/projects/claude-log-pipeline.svg", w: 1100, h: 1560 },
      },
    ],
    troubleshooting: [
      {
        title: "단일 동작에서 발생하는 사용량 조회 오류 메시지 해결",
        situation:
          "Claude Log는 Claude Code의 사용량을 실시간으로 보여주는 Electron 기반 macOS 메뉴바 앱입니다. 그런데 사용자가 앱을 실행하거나 한 번만 새로고침해도 높은 확률로 사용량이 표시되지 않고 조회 오류 메시지가 노출되는 현상이 있었습니다. 사용자 입장에서는 상호작용이 1회인데도 rate-limit 에러가 발생해 이용에 불편을 주는 상황이었습니다.",
        task:
          "상호작용 횟수는 1회인데 내부적으로는 여러 호출이 중복 요청으로 처리되어 오류가 발생하는 원인을 파악하고, 정상적인 동작 흐름에서는 이 오류가 발생하지 않도록 만드는 것을 목표로 개선 방향을 정했습니다.",
        action: [
          "메인 프로세스(src/main/index.ts)에 세 단계의 가드가 존재했습니다 — IPC 핸들러 진입 단계의 OAUTH_IPC_MIN_INTERVAL_MS(1000), 실제 fetch 함수 내부의 OAUTH_USAGE_MIN_INTERVAL_MS(5000), 그리고 동시 호출을 묶는 oauthUsageInflight 인플라이트 프로미스.",
          "렌더러가 개발 모드에서 React.StrictMode로 실행되어 useEffect가 2번 실행될 수 있었고, App.tsx 마운트 시 fetchOAuthUsage()가 자동 호출되며 5분 주기 인터벌·탭 포커스 복귀 시 재조회도 같은 함수를 호출했습니다.",
          "첫 호출이 실패하거나 캐시가 비어 있는 타이밍에 두 번째 호출이 끼어들면, 단순히 에러를 던지는 방식이라 렌더러의 useOAuthUsage 훅에서 화면 오류 메시지로 그대로 노출되었습니다.",
        ],
        result: [
          "정상적인 단일 동작이 더 이상 오류 메시지로 노출되지 않게 되었습니다.",
          "과도한 API 호출을 막는 가드의 목적은 그대로 유지하면서, StrictMode 이중 실행·자동 마운트·주기적 인터벌·포커스 복귀 같은 정상적인 중복 호출은 조용히 처리되도록 개선했습니다.",
          "가드별로 다르게 처리되던 실패 방식을, 캐시를 반환하는 하나의 일관된 fallback 정책으로 통일해 코드 유지보수성도 확보했습니다.",
        ],
        image: { src: "/projects/claude-log-defense-pipeline.png", w: 2944, h: 1282 },
      },
      {
        title: "증분 파싱(Incremental Parsing)으로 갱신 비용 일정화",
        situation:
          "Claude Code는 대화를 ~/.claude/projects/**/*.jsonl 파일에 계속 이어붙여 기록합니다. 사용량을 갱신할 때마다 파일 전체를 다시 읽어 파싱하면, 파일이 커질수록 갱신이 느려질 것이라 판단했습니다.",
        task:
          "파일마다 어디까지 읽었는지를 바이트 위치(offset)로 기억해 두고, 변경이 생기면 그 지점 이후 새로 추가된 부분만 읽어 파싱하도록 했습니다. 매번 O(전체 파일)이던 작업을 O(추가된 양)으로 바꾸는 것이 목표였습니다.",
        action: [
          "파일별 상태를 Map에 { offset, watcher }로 보관하고, 변경 이벤트가 오면 저장된 offset부터 읽습니다.",
          "파일에 한 줄이 다 쓰이기 전에 변경 이벤트가 올 수 있어, 깨진 JSON을 잃지 않도록 마지막 조각은 항상 건너뜁니다. offset도 완성된 줄까지만 전진시켜, 미뤄둔 끝줄을 다음번에 처음부터 온전히 다시 읽습니다.",
          "읽은 위치를 정확히 기록하기 위해 실제 UTF-8 바이트 길이에 줄바꿈(\\n) 1바이트를 더해 offset을 전진시켰습니다. 글자 수가 아닌 바이트 단위로 누적하므로 위치가 어긋나지 않고, 데이터 유실이나 중복 집계도 발생하지 않습니다.",
        ],
        result: [
          "파일이 아무리 커져도 갱신 비용이 새로 추가된 양에만 비례해, 항상 일정한 반응 속도를 유지합니다.",
          "쓰는 도중 줄이 깨진 채로 읽는 사고를 방지해 데이터 정합성을 보장합니다.",
        ],
        image: { src: "/projects/claude-log-incremental-parsing.png", w: 2278, h: 1484 },
      },
    ],
  },
  {
    slug: "deckly",
    title: "Deckly — SI 사업제안서 자동화 플랫폼",
    org: "똑똑한개발자 · TF팀 · 프론트엔드 인턴",
    period: "2025.12 — 2026.01",
    role: "Frontend Intern",
    type: "B2B SaaS",
    scale: "자사 / B2B",
    summary:
      "AI로 미팅 전사록을 분석해 사업제안서 생성을 자동화하는 자사·B2B SaaS. 응답 데이터 최적화와 네트워크 요청 절감으로 성능 개선에 기여.",
    detail:
      "AI 기반으로 미팅 전사록 데이터를 분석하여 사업제안서 생성을 자동화하는 자사 및 B2B SaaS 서비스입니다. 프론트엔드 인턴으로 참여해 성능·네트워크 최적화와 운영 도구 구현을 담당했습니다.",
    highlights: [
      "API 응답 필드 최적화로 제안서 목록 데이터 크기를 1.4MB → 400KB로 약 71% 축소하여 초기 로딩 속도 개선.",
      "Mutation 후 불필요한 전체 목록 리페치를 제거해 네트워크 요청 횟수를 50% 절감, 네트워크 비용 최적화.",
      "Admin 페이지에 사용자 트래킹 기능을 직접 구현해 실제 사용자 데이터 기반의 서비스 고도화·운영 전략 수립에 기여.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "Zod",
      "React To Print",
      "Recharts",
      "Storybook",
      "Langchain",
      "Supabase",
    ],
    links: [],
    thumbnail: "deckly.jpg",
  },
  {
    slug: "whyne",
    title: "WHYNE — 와인 리뷰 플랫폼",
    org: "코드잇 · FE 중급 프로젝트",
    period: "2025.06.05 — 2025.06.24 (3w)",
    role: "Frontend",
    type: "Team Project",
    scale: "3주 협업",
    summary:
      "다양한 와인을 검색·필터링하고 직접 리뷰를 등록·확인하는 리뷰 기반 플랫폼. AWS 인프라 구축과 라이브러리 없는 UI 구현, 다중 필터링 로직을 담당.",
    detail:
      "사용자들이 다양한 와인 정보를 검색·필터링하며 직접 리뷰를 등록하고 확인하는 리뷰 기반 플랫폼입니다.",
    highlights: [
      "AWS Route53·EC2 인스턴스로 개발 인프라를 구축해 안정적인 개발 환경 확보 및 배포에 성공.",
      "UI 라이브러리 없이 CSS와 React로 캐러셀·슬라이드 필터를 구현해 번들 크기 최적화와 커스텀 디자인 가능성 확보.",
      "다양한 조건의 와인 데이터를 위한 다중 필터링·검색 로직을 설계하고, 대량 목록 조회 시에도 일관된 성능을 유지하도록 최적화.",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "React Hook Form",
      "Husky",
      "AWS",
      "GitHub Actions",
      "Vercel",
    ],
    links: [],
    thumbnail: "whyne.jpg",
  },
  {
    slug: "globalnomad",
    title: "GlobalNomad — 액티비티 마켓플레이스",
    org: "코드잇 · FE 심화 프로젝트",
    period: "2025.07.09 — 2025.08.05 (1m)",
    role: "Frontend",
    type: "Team Project",
    scale: "1개월 협업",
    summary:
      "사용자가 공급자·수요자로 동시에 활동하는 지도·예약 기반 양방향 액티비티 마켓플레이스. 지도 연동과 상태 관리·캐싱 최적화를 담당.",
    detail:
      "사용자가 공급자와 수요자로 동시에 활동할 수 있는, 지도와 예약 기반의 양방향 액티비티 마켓플레이스 서비스입니다.",
    highlights: [
      "Kakao Maps SDK를 연동해 액티비티 상세 위치를 시각화하고 사용자 중심의 위치 정보 인터페이스 구축.",
      "Zustand로 Props Drilling을 해결하고 상태 변경에 따른 불필요한 리렌더링을 방지해 성능 최적화에 기여.",
      "Tanstack Query의 staleTime으로 중복 API 요청을 줄이고, useQuery로 동일 요청을 방지하는 캐싱 전략 적용.",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "Axios",
      "Kakao Maps SDK",
      "Husky",
      "GitHub Actions",
      "Vercel",
    ],
    links: [],
    thumbnail: "globalnomad.jpg",
    image: "/projects/globalnomad.png",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
