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
  /** Task(Goal) 아래에 붙는 다이어그램 */
  taskImage?: Figure;
  /** Action 아래에 붙는 다이어그램 */
  actionImage?: Figure;
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
  /** 입사지원서용 간소화 불릿 (없으면 highlights 상위 3개 사용) */
  resumeBullets?: string[];
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
  /** 대표 이미지 테두리 제거 (기본은 border 표시) */
  imageNoBorder?: boolean;
  /** 상세 페이지 갤러리(여러 장). 있으면 단일 hero 대신 갤러리 섹션을 렌더 */
  gallery?: { src: string; w: number; h: number }[];
  /** 갤러리를 한 줄에 같은 높이로 N열 배치. 미지정 시 기본(2열 + 나머지 전체폭) */
  galleryCols?: 2 | 3;
  /** 정량 지표 — 있으면 "Key results" 섹션(카드 그리드) 렌더 */
  metrics?: Metric[];
  /** 인사이트 — 있으면 "Insights" 섹션 렌더 */
  insights?: Insight[];
  /** 트러블슈팅 — 있으면 "Troubleshooting" 섹션 렌더 */
  troubleshooting?: Trouble[];
};

export const projects: Project[] = [
  {
    slug: "claude-log",
    title: "Claude Log — 토큰 사용량 트래커",
    org: "개인 프로젝트",
    period: "2026.04 — current",
    active: true,
    role: "기획 · UI/UX · 개발",
    type: "Desktop / Side Project",
    scale: "1인 개발",
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
    resumeBullets: [
      "메뉴바 % 상주 표시로 토큰 사용량 실시간 확인 UX 개선",
      "3겹 캐싱·중복 제거로 Tray 앱 API 호출 과부하 방지",
      "jsonl 증분 파싱으로 대용량 로그도 O(추가분) 갱신 비용 유지",
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
      "GitHub Actions",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/seong5/claude-log" },
      { label: "Release", href: "https://github.com/seong5/claude-log/releases/tag/v1.0.8" },
    ],
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
      },
    ],
    troubleshooting: [
      {
        title: "과금 없이 실제 사용량 조회 — OAuth 토큰 소스 발굴",
        situation:
          "최초에는 가장 간편한 Anthropic API로 사용량을 가져오려 했지만, 호출 건수당 과금되는 방식이라 사용량을 주기적으로 갱신하는 상주 위젯에는 운영상 부담이 컸습니다.",
        task:
          "과금 없이, /usage 명령어 및 Claude 앱·웹과 일치하는 실제 사용량을 위젯에 표시하는 것이 목표였습니다.",
        action: [
          "1차로 세션 첫 사용 시점부터 5시간 윈도우 총사용량을 계산하는 방식(5시간마다 리셋되는 점에 착안)으로 전환했으나, 이 값도 실제 /usage·Claude 앱·웹과 일치하지 않았습니다.",
          "'Claude Code 로그인 OAuth 토큰을 재사용하면 과금 없이 실제 사용량을 조회할 수 있지 않을까'라는 가설을 세우고 구글링·CLI 탐색으로 검증했습니다.",
          "그 결과 토큰 저장 우선순위를 3단계로 파악했습니다 — ① 환경변수(ANTHROPIC_OAUTH_ACCESS_TOKEN)·.env, ② ~/.claude/.credentials.json의 claudeAiOauth.accessToken, ③ macOS Keychain(security find-generic-password).",
          "이 순서로 확보한 토큰으로 실제 사용량 엔드포인트를 호출해 위젯 데이터를 가져오도록 구현했습니다.",
        ],
        result: [
          "호출당 과금 없이, 이미 발급된 로그인 토큰을 재사용해 실제 사용량을 조회하게 되었습니다.",
          "위젯 값이 /usage·Claude 앱·웹과 일치해 신뢰할 수 있는 수치를 상주 표시합니다.",
        ],
        image: { src: "/projects/claude-log-token-priority.png", w: 1470, h: 1330 },
      },
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
    slug: "umust-erp",
    title: "UMUST R&D ERP — 재고·CRO 통합 관리",
    org: "UMUST R&D · 사업부 IT팀 · 프론트엔드 인턴",
    period: "2026.04.28 — 2026.06.30",
    role: "Frontend",
    type: "사내 ERP",
    scale: "3인 개발 (FE 1 · BE 1 · 인프라 1)",
    summary:
      "재고·자원관리에 더해 CRO(임상시험 수탁) 절차 추적까지 통합한 사내 ERP. ERD 설계부터 FE 구현·배포까지 풀사이클로 진행.",
    detail:
      "UMUST R&D의 사내 조직용 재고·판매 관리 ERP 서비스입니다. 재고 및 자원관리뿐 아니라 CRO 서비스(임상시험 수탁기관) 절차의 전체적인 내용 추적 및 프로세스 관리의 필요에 따라 기획되었습니다. FE 1명·BE/인프라 1명 총 2인으로 기획부터 배포까지 진행했습니다.",
    highlights: [
      "서비스 전반의 ERD를 설계하고 DB·스키마 데이터 모델링부터 FE 전반 구현·배포까지 풀사이클을 직접 주도.",
      "재고관리와 CRO(연구용역) 두 도메인을 하나의 서비스로 통합해 전체 데이터 서비스 흐름을 구축.",
      "Zod 스키마로 폼·API 응답을 런타임 검증해 TypeScript 컴파일 단계의 한계를 보완.",
      "상태 전이·뮤테이션 등 핵심 비즈니스 로직에 단위 테스트를 우선 작성하고 MSW API Mocking 환경을 구축해 코드 퀄리티와 이후 API 작업의 안정성을 확보.",
    ],
    resumeBullets: [
      "ERD 설계부터 FE 구현·배포까지 풀사이클 주도",
      "재고·CRO 두 도메인 통합 ERP 서비스 구축",
      "Zod 런타임 검증·MSW Mock으로 API 연동 안정성 확보",
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "MSW",
      "Testing Library",
      "GitHub Actions",
    ],
    links: [],
    thumbnail: "umust-erp.jpg",
    image: "/projects/umust-erp.png",
    insights: [
      {
        title: "쿼리키는 화면 상태가 아니라 서버 응답의 정체성으로 설계한다",
        intro:
          "CRO 목록 화면의 필터에는 성격이 다른 두 종류가 섞여 있었습니다. 처음엔 모든 필터를 queryKey에 넣었더니, 상태 탭만 눌러도 키가 바뀌어 캐시 미스가 나고 동일한 데이터를 매번 다시 요청했습니다. 키에는 서버 응답을 가르는 값만 넣고 나머지는 select에서 후처리하도록 분리했습니다.",
        steps: [
          {
            title: "서버사이드 필터 — queryKey에 포함",
            points: [
              "search처럼 값이 바뀌면 서버 응답 자체가 달라지는 필터(거래처는 orgName, 의뢰는 testItem 파라미터로 전송)는 queryKey에 포함합니다.",
              "값이 바뀌면 실제로 서버를 다시 호출해 다른 응답을 받아옵니다.",
            ],
          },
          {
            title: "클라이언트사이드 필터 — select에서 후처리",
            points: [
              "clientId·status·priority·orgType처럼 서버가 모르는, 이미 받아온 같은 응답을 거르기만 하면 되는 값은 queryKey에서 제외합니다.",
              "select는 서버 캐시를 건드리지 않고 파생 결과만 만들어, status 탭을 아무리 눌러도 네트워크는 0회·메모리에서 filter()만 다시 돕니다.",
              "keepPreviousData를 더해 search가 바뀌어 재요청이 나가는 동안에도 이전 목록이 유지돼 깜빡임이 없습니다.",
            ],
          },
          {
            title: "기준을 코드 주석에 박제",
            points: [
              "\"클라이언트 필터는 queryKey에 넣지 않는다\"를 주석으로 남겨 거래처·의뢰·프로젝트 훅 전반에서 같은 실수가 반복되지 않게 했습니다.",
              "핵심 교훈: 쿼리 키 설계의 질문은 '이 값이 바뀌면 화면이 달라지나?'가 아니라 '이 값이 바뀌면 서버가 다른 응답을 주나?'다. 이 기준을 잡고 나서 중복 패치가 구조적으로 사라졌습니다.",
            ],
          },
        ],
        image: { src: "/projects/umust-erp-querykey.svg", w: 680, h: 468 },
      },
      {
        title: "단건 조회는 목록 캐시에서 파싱하되 상황에 맞는 전략을 세운다",
        intro:
          "상세 화면 진입 시 단건 API(GET /{id}) 존재 여부에 따라 캐시 전략을 다르게 가져갔습니다.",
        steps: [
          {
            title: "전략 A · initialData — 단건 API가 있을 때",
            points: [
              "목록 캐시로 첫 페인트를 시드해 즉시 화면을 그립니다.",
              "queryFn은 유지해 백그라운드에서 최신 단건으로 갱신 — 신선도를 우선합니다.",
            ],
          },
          {
            title: "전략 B · 키 공유 — 단건 API가 없을 때",
            points: [
              "select로 목록에서 하나만 선택해 목록과 같은 캐시를 공유합니다.",
              "네트워크 0회로 요청을 절약하면서 목록과의 정합성을 유지합니다.",
            ],
          },
        ],
        image: { src: "/projects/umust-erp-single-query.svg", w: 680, h: 474 },
      },
      {
        title: "뮤테이션은 트리거와 무효화 범위가 항상 함께 가야 한다",
        intro:
          "서버 상태를 바꾸는 액션은 관련 캐시를 함께 무효화하지 않으면 화면이 어긋납니다. 의뢰 → 프로젝트 전환 한 번이 의뢰 상세·의뢰 목록·프로젝트 목록 세 군데에 영향을 줍니다.",
        steps: [
          {
            title: "무효화 범위를 키 집합으로 추적",
            points: [
              "'방금 만든 프로젝트가 목록에 안 보인다' 같은 버그는 대부분 무효화 범위 누락입니다.",
              "query-keys 팩토리에서 lists() / detail(id)를 계층적으로 설계해, 무효화 범위를 '이 액션이 건드리는 키 집합'으로 명시적으로 추적할 수 있게 했습니다.",
              "onSuccess에서 전환 1회로 더럽혀진 캐시 3곳(의뢰 상세 detail(inquiryId)·의뢰 목록 lists()·프로젝트 목록)을 함께 무효화합니다.",
            ],
          },
        ],
        image: { src: "/projects/umust-erp-invalidation.svg", w: 680, h: 434 },
      },
      {
        title: "에러 메시지를 한곳에서 정리한다",
        intro:
          "에러 메시지를 컴포넌트마다 처리하면 톤이 제각각이 되고 서버의 \"Internal Server Error\" 같은 영문이 그대로 사용자에게 노출됩니다. 추출 우선순위를 getErrorMessage 한 곳에 정의했습니다.",
        steps: [
          {
            title: "추출 우선순위 4단계",
            points: [
              "1. 백엔드 본문(message·error·detail) — 의미 있는 본문은 살리고 무의미·영문 일반 메시지는 건너뜁니다.",
              "2. HTTP 상태별 안내 — 400·404·409·500을 한국어로 치환(예: 409 → '다른 데이터와 연결되어 있어 삭제할 수 없습니다').",
              "3. 네트워크/타임아웃 — ECONNABORTED·no response 케이스 처리.",
              "4. fallback — 호출부가 넘긴 기본 메시지.",
            ],
          },
          {
            title: "배운 점",
            points: [
              "서버가 준 메시지가 곧 사용자 메시지가 아닙니다. 의미 있는 본문은 살리고 일반·영문 메시지는 한국어 안내로 치환하는 분기가 UX를 좌우했습니다.",
              "상태 코드별 안내를 중앙화해, 새 뮤테이션은 fallback 한 줄만 넘기면 일관된 에러 UX를 얻을 수 있었습니다.",
            ],
          },
        ],
        image: { src: "/projects/umust-erp-error.svg", w: 680, h: 394 },
      },
    ],
    troubleshooting: [
      {
        title: "배포 환경에서 발생한 CRO API 404 에러",
        situation:
          "로컬 개발 환경에서는 정상 동작하던 서비스가 배포 환경에서 CRO 도메인의 모든 API 호출이 404로 실패했습니다. 재고·거래 API는 정상 동작했고 CRO만 실패하는 상황이라, 도메인 단위로 어딘가 잘못되었다고 판단했습니다.",
        task:
          "로컬은 되고 배포만 안 되는 환경 차이를 역추적하여, 프론트에서 만드는 요청 경로와 게이트웨이(Nginx)·백엔드 라우팅을 하나의 일관된 규칙으로 정합화하는 것을 목표로 했습니다.",
        taskImage: { src: "/projects/umust-erp-404-broken.svg", w: 680, h: 368 },
        action: [
          "운영 서버에 SSH로 접속해 docker ps로 실제 떠 있는 컨테이너와 포트 매핑을 확인하고, 재고 백엔드와 CRO 백엔드가 별도 컨테이너로 분리돼 있다는 사실을 파악했습니다.",
          "게이트웨이 컨테이너에 직접 들어가 병합된 Nginx 설정 전체를 덤프해 location을 확인한 결과, /api/ location은 재고용으로 잡혀 있고 CRO용 라우팅이 없어 'CRO 요청이 재고 API로 폴백'되고 있음을 확정했습니다. (로컬은 Vite dev 프록시가 라우팅 차이를 가려 증상이 드러나지 않았습니다.)",
          "CRO의 외부 공개 경로를 재고 API와 네임스페이스가 겹치지 않게 분리하고, 수십 곳에 하드코딩돼 있던 경로 문자열을 croApiPath() 헬퍼 호출로 교체했습니다.",
          "게이트웨이가 공개 경로(/cro-api)를 받아도 그대로 루트로 흘려보내던 rewrite 불일치를, CRO 백엔드 실제 경로(/api/cro)로 rewrite하도록 수정하고, Vite dev 프록시와 CI 빌드 env를 추가해 로컬·배포가 같은 접두사 규칙을 공유하게 했습니다.",
        ],
        actionImage: { src: "/projects/umust-erp-404-fixed.svg", w: 680, h: 360 },
        result: [
          "배포 404가 완전히 해소되었습니다.",
          "공개 경로(/cro-api)·내부 경로(/api/cro)·프론트 호출부 세 층의 책임이 분리되고, 프론트 경로 생성이 croApiPath() 한 곳으로 수렴돼 CRO API가 늘어도 같은 클래스의 라우팅 버그가 재발할 표면이 사라졌습니다.",
          "추측 대신 SSH·docker ps·nginx -T로 운영 환경의 실제 라우팅 테이블을 직접 검증한 것이 원인 도달의 결정적 단계였습니다. 공개 API 네임스페이스는 서비스별로 분리하지 않으면 게이트웨이 prefix 매칭에서 다른 서비스로 조용히 폴백되는 사고가 난다는 것을 확인했습니다.",
        ],
      },
      {
        title: "dev 환경에서 CRO 화면만 데이터가 안 뜨는 문제 (502 → CORS)",
        situation:
          "재고관리 화면은 정상인데 CRO 화면만 데이터가 표시되지 않았습니다. 그런데 CRO API의 Swagger 문서에서 직접 호출하면 200으로 정상 응답했고, 증상도 Vite 프록시 경유일 때는 502, 브라우저 직접 호출로 바꾸면 CORS 에러로 바뀌어 서버 문제인지·네트워크인지·CORS인지가 뒤섞여 보였습니다.",
        task:
          "Swagger는 되는데 앱만 안 되는 차이를 끝까지 역추적해, 문제 레이어(네트워크 / 브라우저 보안정책 / 서버 origin 설정)를 하나씩 분리해 진짜 원인을 특정하고, dev·prod 모두 안전하게 정합화하는 것을 목표로 했습니다.",
        action: [
          "Vite 프록시 경유 시 CRO 요청이 전부 502였습니다. curl로 확인하니 이 dev 머신에서는 node·curl이 메인·CRO API 호스트에 곧바로 연결 거부당했고, 반대로 브라우저는 두 API 모두 도달(Swagger 200)했습니다. → 서버 다운이 아니라 node(프록시) 경로만 막힌 환경 차이로 좁혔습니다.",
          "CRO를 Vite 프록시 대신 브라우저 직접 호출(.env.local에 CRO 베이스 URL 지정)로 전환하자 502가 CORS 에러로 바뀌었습니다. 브라우저는 CRO 서버에 실제로 도달(TCP·HTTP 정상)했고 응답에 CORS 헤더가 없어 차단된 것 → 남은 문제는 네트워크가 아니라 CORS임을 확정했습니다.",
          "Swagger 200 ≠ CORS 정상이라는 점을 규명했습니다. Swagger는 CRO 서버가 직접 서빙하는 same-origin이라 브라우저가 CORS 검사를 건너뛴 것이고, 앱은 dev origin에서 CRO 서버로의 cross-origin이라 검사 대상이었습니다. 메인 API는 CORS 헤더를 이미 내보내 같은 앱에서 정상 동작했고, CRO만 헤더가 없어 막혔습니다.",
          "백엔드가 CORS 설정을 추가한 뒤에도 실패가 이어지자, 프론트 담당이지만 백엔드 레포를 직접 받아 CORS 구성을 분석했습니다. WebMvcConfig의 addMapping에 등록된 허용 origin 목록에 배포 포트만 있고 dev 앱의 실제 origin(:5173)이 빠져 있는 것을 직접 찾아냈고, Access-Control-Allow-Origin은 scheme·host·port가 정확히 일치해야 하므로 이 origin 불일치가 최종 원인임을 확인했습니다.",
        ],
        result: [
          "최종 원인은 CRO 서버 CORS 허용 origin에 dev origin이 누락된 것이었습니다. allowedOrigins는 부분 와일드카드를 지원하지 않고 allowCredentials(true)와 와일드카드(*)도 함께 쓸 수 없어, allowedOriginPatterns로 교체해 내부망 IP 대역은 와일드카드로, dev 포트는 고정하는 방식으로 해결했습니다.",
          "프론트는 vite.config를 건드리지 않고 .env.local(gitignore)에서만 직접 호출로 설정해, 프록시가 정상 동작하는 다른 머신·CI의 표준 상태를 유지했습니다. prod는 게이트웨이 same-origin 라우팅이라 CORS 검사 자체가 없어, CRO 서버 origin만 명시적으로 허용해 두면 dev·prod 모두 안전합니다.",
          "특정 도메인만 실패할 때는 서버별 CORS 설정 차이를 먼저 의심하고, same-origin 도구(Swagger)에서 되는 것은 로직이 정상이라는 증거일 뿐 CORS가 된다는 증거가 아니며, 502 ↔ CORS 에러 전환을 이용하면 네트워크 계층과 브라우저 정책 계층을 분리해 진단할 수 있다는 것을 확인했습니다.",
          "프론트 영역에 머무르지 않고 백엔드 레포의 CORS 설정까지 직접 분석해 근본 원인을 짚어낸 것이 빠른 해결의 결정적 단계였고, 협업에서 문제를 도메인 경계에서 멈추지 않고 끝까지 추적하는 것의 효과를 확인했습니다.",
        ],
      },
    ],
  },
  {
    slug: "dobong-admin",
    title: "도봉라이프 어드민 — 운영 관리 콘솔",
    org: "UMUST R&D · 사업부 IT팀 · 프론트엔드 인턴",
    period: "2026.03.23 — 2026.04.28",
    role: "Frontend",
    type: "Admin Console",
    scale: "3인 개발 (FE 2 · BE/인프라 1)",
    summary:
      "도봉구 로컬 플랫폼 도봉라이프의 웹 백오피스. 관리자·사업자 ROLE 분기와 운영 도메인 전반의 관리 화면을 구축.",
    detail:
      "서울 도봉구 기반 로컬 플랫폼 도봉라이프 애플리케이션의 웹 백오피스입니다. 앱의 데이터 관리·통계 필요에 따라 기획되었고, 관리자·사업자 두 ROLE로 분기처리해 각각 앱 전체와 사업장 단위 관리가 가능합니다. 활동 통계 대시보드와 사용자·승인·프로모션·코스·장소·리뷰·알림·문의 등 운영 도메인 전반을 관리하는 화면을 구축했습니다.",
    highlights: [
      "Next.js proxy.ts(구 middleware) 단일 진입점에서 JWT의 role을 읽어 /admin·/business 접근을 서버 단계에서 분기·차단하는 RBAC 가드를 구현하고, 페이지마다 흩어지던 권한 체크를 제거.",
      "코스·사업장·프로모션 등록 폼을 수동 useState에서 React Hook Form + Zod 단일 스키마 검증으로 마이그레이션하고, 다단계 위저드는 스텝별 부분 검증으로 UX와 성능을 동시에 개선.",
      "책임이 과중하던 위저드 컴포넌트를 순수 함수·상태 오케스트레이션 훅·표현 계층 3계층으로 분리해 테스트 용이성과 재사용성을 확보.",
      "next.config rewrites로 CORS를 우회하고 serverApi/clientApi를 이원화해 실행 환경별 토큰 주입을 일원화.",
      "Playwright E2E(3개 브라우저)와 Postman Mock Server를 도입해 인증·폼 검증 플로우와 에러 시나리오를 API 완성 전에 선행 검증하고 개발 공수를 단축.",
    ],
    resumeBullets: [
      "middleware RBAC 가드로 /admin·/business 권한 분기·차단",
      "RHF + Zod 다단계 위저드로 폼 검증 UX·성능 개선",
      "Playwright E2E·Mock Server로 API 완성 전 선행 검증",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Tanstack Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "Playwright",
      "Recharts",
      "GitHub Actions",
    ],
    links: [],
    thumbnail: "dobong-admin.jpg",
    image: "/projects/dobong-admin.png",
    insights: [
      {
        title: "RBAC 라우팅 가드를 미들웨어 한 곳으로 통합",
        intro:
          "Next.js의 proxy.ts(구 middleware) 단일 진입점에서 JWT의 role을 읽어 /admin·/business 경로 접근을 서버 단계에서 분기·차단했습니다. 권한 없는 사용자가 잘못된 영역에 진입하면 컴포넌트 렌더 이전에 자기 역할의 홈으로 리다이렉트되도록 해, 페이지마다 흩어지던 권한 체크를 제거했습니다.",
        steps: [
          {
            title: "단일 진입점에서 role을 추출해 경로와 매핑",
            points: [
              "모든 페이지 요청이 proxy.ts를 거치며, JWT에서 추출한 role과 요청 경로의 매핑으로 접근 권한을 판정합니다.",
            ],
          },
          {
            title: "권한 결과에 따라 서버 단계에서 분기",
            points: [
              "권한이 없으면 컴포넌트 렌더 이전에 서버에서 자기 역할의 홈으로 리다이렉트하고, 권한이 있으면 요청을 통과시킵니다.",
              "공개 경로는 인가 체크 없이 바로 통과시켜, 페이지마다 흩어지던 권한 체크를 한 곳으로 모았습니다.",
            ],
          },
        ],
        image: { src: "/projects/dobong-admin-rbac.svg", w: 680, h: 500 },
      },
      {
        title: "인증 토큰의 생애주기 — 디코드는 한 번, 전파는 콜백 체인으로",
        intro:
          "로그인 성공 시 단순히 토큰을 저장하는 게 아니라, 세션의 신뢰 경계를 명확히 나눈 파이프라인(authorize → jwt → session → serverApi/clientApi)으로 동작하게 설계했습니다.",
        steps: [
          {
            title: "authorize — 입력·응답을 검증하고 토큰을 1회만 디코드",
            points: [
              "loginRequestSchema.safeParse로 입력을 먼저 검증한 뒤 백엔드를 호출하고, 응답을 loginResponseSchema로 재검증합니다.",
              "jwtDecode<AccessTokenPayload>로 access token에서 role·userId·exp·provider를 클라이언트에서 단 1회만 추출하고, 이후에는 디코드를 반복하지 않고 결과만 토큰에 실어 전파합니다.",
            ],
          },
          {
            title: "signIn — 인증과 인가를 분리",
            points: [
              "디코드된 role이 ROLE_MEMBER(일반 앱 사용자)이면 어드민 진입 자체를 차단해, 인증(authentication)과 인가(authorization)를 분리했습니다.",
            ],
          },
          {
            title: "jwt / session — 필요한 필드만 좁혀 전파",
            points: [
              "user → token → session.user로 필요한 필드만 좁혀 전파하고, serverApi는 auth() 호출만으로 세션의 access token을 백엔드에 자동 주입합니다.",
              "설계 포인트: 토큰 디코딩 위치를 authorize 한 곳으로 고정해, 이후 미들웨어·API 등 모든 판단 지점이 '이미 검증된 클레임'만 소비하도록 했습니다.",
            ],
          },
        ],
      },
      {
        title: "백엔드 응답은 신뢰하지 않는다 — 경계에서 Zod로 방어적 파싱",
        intro:
          "프론트가 죽는 흔한 원인은 응답 값이 없는 게 아니라 타입이 기대와 다른데 그대로 렌더링하는 것입니다. API 응답을 받는 경계에서 Zod로 한 번 거르는 계층(api-schemas)을 만들었습니다.",
        steps: [
          {
            title: "원시 응답을 안전한 타입으로 변환",
            points: [
              "zApiString은 z.unknown().transform으로 null·undefined를 빈 문자열로 정규화합니다.",
              "zFilteredStringArray는 비배열·비문자열 요소를 걸러내 string[]을 보장합니다.",
            ],
          },
          {
            title: "success/data 봉투를 검증하고 실패를 흡수",
            points: [
              "parseApiSuccessJson은 success:false거나 data가 없으면 메시지를 담아 throw해, TanStack Query의 error 상태로 자연스럽게 흡수되게 합니다.",
              "파싱 실패 시 formatZodError로 어느 필드가 깨졌는지 로깅합니다.",
            ],
          },
          {
            title: "배운 점",
            points: [
              "타입스크립트의 타입은 컴파일 단계의 약속일 뿐 런타임을 보장하지 않습니다. 외부 입력(API 응답)은 런타임 검증으로 신뢰 경계를 그어야 한다는 것을 구조로 체득했습니다.",
            ],
          },
        ],
      },
      {
        title: "다단계 위저드의 파생 상태 계산 — useMemo 의존성 사슬",
        intro:
          "프로모션 등록 위저드는 원본 상태를 최소화하고 나머지를 전부 파생(derived) 값으로 계산했습니다. fields → parsedFields → canSubmit/previewData, imageFiles + presetCover → effectiveImageCount → canGoNext/isDirty로 이어지는 의존성 사슬입니다.",
        steps: [
          {
            title: "업로드 상한을 동적으로 조정",
            points: [
              "effectiveImageCount는 사용자 업로드 수 + 프리셋 커버 유무로 계산해, 프리셋 커버가 있으면 사용자 업로드 상한을 5 → 4로 동적 조정(maxUserImageFiles)합니다.",
            ],
          },
          {
            title: "isDirty를 별도 플래그가 아닌 계산값으로",
            points: [
              "isDirty(변경 여부)를 별도 플래그가 아니라 현재 입력으로부터 매번 계산해, '초기화 후 dirty 플래그 리셋을 깜빡하는' 종류의 버그가 구조적으로 불가능하게 했습니다.",
              "canGoNext는 현재 step과 파생값을 함께 받아 스텝별 통과 조건을 한 함수에서 결정합니다.",
            ],
          },
        ],
      },
      {
        title: "커서 기반 페이지네이션 병합 — 무한 루프 방지가 포함된 순차 수집",
        intro:
          "fetchAdminPlaceReviewsMerged는 백엔드의 커서(lastId) 페이지를 클라이언트에서 순차 병합합니다. lastId가 없으면 page1부터 시작해 hasNext가 false이거나 스캔 상한에 도달할 때까지 이어 받습니다.",
        steps: [
          {
            title: "이중 종료 조건으로 안전장치 마련",
            points: [
              "hasNext && pages < 상한 이중 조건으로 루프를 돌려, 백엔드가 hasNext를 잘못 내려도 상한에서 강제 차단되도록 했습니다.",
            ],
          },
          {
            title: "수집 결과 캐싱과 정밀 무효화",
            points: [
              "수집 결과는 staleTime 5분으로 캐싱하고, 리뷰 삭제 뮤테이션 성공 시 해당 placeId 쿼리만 invalidateQueries로 정밀 무효화합니다.",
            ],
          },
        ],
      },
      {
        title: "Blob URL 생명주기를 렌더가 아닌 커밋 단계에 묶기",
        intro:
          "이미지 미리보기에서 URL.createObjectURL을 명시적으로 revoke하지 않으면 메모리 누수가 발생합니다. 그래서 생성과 cleanup을 useLayoutEffect 한 곳에서 처리했습니다.",
        steps: [
          {
            title: "생성·해제를 같은 클로저에 가둔다",
            points: [
              "useLayoutEffect에서 files.map(URL.createObjectURL)로 생성하고, 클린업에서 같은 배열을 forEach(URL.revokeObjectURL)로 해제해 1:1 대응을 보장합니다.",
              "useMemo로 URL을 만들면 캐시 폐기 시점과 revoke 시점이 어긋나고 Strict Mode 이중 실행에서 URL이 꼬입니다. 생성·해제 배열을 같은 클로저에 가둔 것이 핵심 의도입니다.",
            ],
          },
        ],
      },
      {
        title: "'성공' 응답까지 의심하는 에러 변환 계층",
        intro:
          "axios 레벨에서 validateStatus: () => true로 모든 상태 코드를 일단 통과시킨 뒤 직접 분기했습니다. 기본 throw에 의존하지 않고 비정상 응답까지 일관되게 정규화하기 위함입니다.",
        steps: [
          {
            title: "비정상 응답을 정규화하고 도메인 에러로 변환",
            points: [
              "비-JSON 본문·문자열 JSON 같은 비정상 케이스를 parseSuccessJson / throwIfNotOkAxios에서 일관되게 정규화합니다.",
              "401은 별도 메시지로 분기하고, 도메인 계층(ApiHttpError·mapReviewError)에서 도메인 에러로 변환해 화면에 전달합니다.",
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "브라우저 → 백엔드 직접 호출 시 CORS 차단",
        situation:
          "클라이언트 컴포넌트에서 axios로 백엔드 API를 직접 호출하자 브라우저가 CORS 정책으로 요청을 차단했습니다. 백엔드 CORS 설정 수정은 협업·배포 비용이 커, 프론트에서 우회할 전략이 필요했습니다.",
        task:
          "백엔드 설정 변경 없이 브라우저 요청을 동일 출처로 만들고, 서버와 클라이언트 양쪽의 토큰 주입을 일관되게 유지하는 것을 목표로 했습니다.",
        action: [
          "next.config의 rewrites로 /backend/{path}를 NEXT_PUBLIC_API_URL로 프록시하고, clientApi의 baseURL을 /backend로 지정해 브라우저가 자신과 같은 출처로 요청을 보내도록 했습니다.",
          "토큰 주입은 axios 요청 인터셉터에서 getSession()으로 세션 토큰을 꺼내 Authorization 헤더에 붙여 일원화했습니다.",
          "서버 컴포넌트는 auth() 기반 serverApi로 백엔드에 직접 호출하도록 분리해, 실행 환경별 호출 경로를 명확히 나눴습니다.",
        ],
        result: [
          "CORS 에러가 제거되고 백엔드 변경은 0이었습니다.",
          "서버는 auth() 기반 serverApi, 클라이언트는 프록시 + 인터셉터 기반 clientApi로 실행 환경별 호출 경로와 토큰 주입 책임이 명확히 분리됐습니다.",
        ],
        image: { src: "/projects/dobong-admin-cors.svg", w: 680, h: 510 },
      },
      {
        title: "리뷰 전체 병합 시 순차 HTTP 요청 폭증으로 인한 로딩 지연",
        situation:
          "관리자 상세 화면에서 장소·코스 리뷰를 커서(lastId) 기반으로 끝까지 긁어오는데, 페이지 상한을 100으로 두니 순차(while) 요청이 누적돼 체감 로딩이 느렸습니다.",
        task:
          "커서 기반 전체 수집의 지연을 제한하면서, 재진입 시 불필요한 재요청을 막는 것을 목표로 했습니다.",
        action: [
          "커서 페이지네이션은 다음 lastId가 있어야 다음 요청을 보낼 수 있어 본질적으로 순차입니다. 그래서 스캔 상한을 100 → 20으로 낮춰 최악의 지연을 제한했습니다.",
          "TanStack Query에 staleTime 5분을 두어 재진입 시 재요청을 막았습니다.",
          "코드 주석으로 '추후 서버 페이지네이션으로 전환'이라는 후속 과제를 명시해, 임시 방어와 근본 개선 경로를 분리했습니다.",
        ],
        result: [
          "수집 지연을 상한으로 제한해 체감 비용을 제거했습니다.",
          "당장의 UX(상한·캐싱)와 구조 개선(페이지네이션 도입)을 분리해 우선순위를 잡은 사례입니다.",
        ],
      },
      {
        title: "다단계 폼 — 마지막 스텝에서야 에러가 터지는 검증 UX",
        situation:
          "코스 등록이 다단계 위저드인데, 전체 스키마를 제출 시점에 한 번에 검증하니 사용자가 1스텝에서 잘못 입력해도 마지막 단계에 가서야 에러를 확인했습니다. 반대로 전체 필드를 항상 검증하면 다음 스텝 진행이 불필요하게 막혔습니다.",
        task:
          "스텝별로 '그 단계에 필요한 필드만' 검증해 진행을 통제하되, 최종 제출 시 전체 스키마로 마무리하는 것을 목표로 했습니다.",
        action: [
          "RHF + zodResolver(mode: 'onBlur') 기반에서 handleNext가 trigger(['title','durationStr','level'])처럼 해당 스텝 필드만 부분 검증하도록 구성했습니다.",
          "이미지처럼 스키마 밖 조건은 stepValidationError 상태로 별도 처리했습니다.",
          "동적 항목(하이라이트)은 useFieldArray로 관리하면서 '항목 제목 5개 이상' 같은 규칙은 Zod superRefine으로 교차 검증했습니다.",
        ],
        result: [
          "각 단계에서 즉시 피드백을 받아, 잘못된 입력으로 다음 스텝에 진입하는 일이 사라졌습니다.",
          "제출 시점엔 전체 스키마가 한 번 더 보장되고, 검증 규칙이 Zod 스키마 한 곳에 모여 유지보수성이 높아졌습니다.",
        ],
      },
    ],
  },
  {
    slug: "deckly",
    title: "Deckly — SI 사업제안서 자동화 플랫폼",
    org: "똑똑한개발자 · TF팀 · 프론트엔드 인턴",
    period: "2025.12.17 — 2026.01.16",
    role: "Frontend Intern",
    type: "B2B SaaS",
    scale: "1인 개발 · 풀사이클",
    summary:
      "AI로 미팅 회의록을 분석해 사업제안서 생성을 자동화하는 자사·B2B SaaS. 응답 데이터 최적화와 네트워크 요청 절감으로 성능 개선에 기여.",
    detail:
      "AI 기반으로 미팅 회의록 데이터를 분석하여 사업제안서 생성을 자동화하는 자사 및 B2B SaaS 서비스입니다. 수기 작성으로 인한 리소스 낭비를 해결하고자 기획되었고, 초기 사내 백오피스를 넘어 범용 SaaS로의 전환을 목표로 설계했습니다. TF팀 인턴으로 참여해 기획·UI/UX 설계부터 프론트엔드·백엔드·DB 설계·배포까지 풀사이클로 진행했습니다.",
    highlights: [
      "Langchain으로 미팅 회의록 기반 AI 제안서 자동 생성 플로우를 설계해, 수기 작성 대비 초안 생성 시간을 2~3분 내로 단축.",
      "낙관적 업데이트(Optimistic Updates)를 도입해 평균 1.5~3초이던 사용자 대기 시간을 0초로 단축하고 서비스 반응성을 개선.",
      "Mutation + 목록 리페치 2단계를 Mutation 단일 호출로 개선해 네트워크 요청을 기존 대비 50% 절감.",
      "API 응답 필드 최적화로 제안서 목록 데이터 크기를 1,415KB → 206KB로 약 85% 축소하여 초기 로딩 속도 개선.",
      "Admin 페이지에 사용자 트래킹 기능을 직접 구현해 실제 사용자 데이터 기반의 서비스 고도화·운영 전략 수립에 기여.",
    ],
    resumeBullets: [
      "제안서 목록 API 1.4MB → 206KB (85%↓) 최적화",
      "Mutation 후 리페치 제거로 네트워크 요청 50% 절감",
      "Admin 사용자 트래킹 직접 구현",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Zustand",
      "Tanstack Query",
      "Zod",
      "React Hook Form",
      "Axios",
      "Langchain",
      "Recharts",
      "React To Print",
      "GitHub Actions",
      "Vercel",
    ],
    links: [],
    thumbnail: "deckly.jpg",
    image: "/projects/deckly.png",
    metrics: [
      { value: "85%", label: "제안서 목록 API 응답 크기 감축" },
      { value: "50%", label: "Mutation 네트워크 요청 절감" },
      { value: "0초", label: "낙관적 업데이트 체감 대기시간" },
      { value: "1인", label: "기획·UI/UX·FE·BE·배포 풀사이클" },
    ],
    insights: [
      {
        title: "클라이언트 캐싱 전략과 데이터 보안의 연관성",
        intro:
          "전역 상태와 서버 데이터 캐시(TanStack Query)의 생명주기가 일치하지 않을 때 발생하는 '캐시 오염' 리스크를 처음 마주했습니다. 사용자 세션의 종료가 단순한 페이지 이동이 아니라 메모리 자원의 클린업까지 이어져야 함을 체감했습니다.",
        steps: [
          {
            title: "상태와 캐시의 라이프사이클 동기화",
            points: [
              "전역 상태와 서버 데이터 캐시의 생명주기가 어긋나면 이전 사용자의 데이터가 남는 캐시 오염이 발생합니다.",
              "세션 종료는 페이지 이동이 아니라 메모리 자원의 클린업까지 동반해야 한다는 것을 체감했습니다.",
            ],
          },
          {
            title: "고유 식별자를 활용한 데이터 격리 설계",
            points: [
              "Query Key에 사용자 고유 식별자(userId)를 포함시켜 계정별 독립적인 캐시 공간을 할당했습니다.",
              "다중 사용자 환경에서 의도치 않은 정보 노출을 방지하는 것이 프론트엔드 보안 설계의 핵심임을 체감했습니다.",
            ],
          },
        ],
      },
      {
        title: "성능 최적화, UX 개선 및 효율적인 API 통신 설계",
        intro:
          "단순한 렌더링 지연을 감으로 해결하지 않고 Chrome DevTools의 Network 탭으로 1.4MB라는 비정상적인 페이로드 크기를 파악해, 근본 원인이 무분별한 데이터 호출(.select('*'))에 있음을 찾아냈습니다.",
        steps: [
          {
            title: "데이터 중심의 문제 진단",
            points: [
              "Network 탭으로 단일 API 응답이 1,415KB에 달하는 것을 측정하고, 원인이 .select('*')의 전체 필드 호출임을 확인했습니다.",
            ],
          },
          {
            title: "불필요한 리소스 최소화",
            points: [
              "UI 렌더링에 필수적인 필드만 선별 호출하도록 바꿔 데이터 크기를 약 85% 감축(1,415KB → 206KB)하고 네트워크 전송 효율을 극대화했습니다.",
            ],
          },
          {
            title: "사용자 중심의 최적화",
            points: [
              "서버가 전달하는 데이터 크기가 곧 사용자가 체감하는 LCP와 직결됨을 이해하고, 설계 단계부터 필요한 만큼만 요청·전송하는 API 설계 습관을 정립했습니다.",
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "계정 전환 시 이전 사용자의 제안서 목록이 노출되는 캐시 오염",
        situation:
          "계정 A로 로그인 후 로그아웃하고 계정 B로 로그인하면, /dashboard에 여전히 A의 제안서 목록이 렌더링되고 새로고침을 해야만 B의 목록이 보이는 문제가 발생했습니다.",
        task:
          "인증 상태의 변화와 데이터 캐시의 생명주기를 일치시켜, 계정 전환 시 이전 사용자의 데이터가 남지 않도록 격리하는 것을 목표로 했습니다.",
        action: [
          "제안서 목록 API의 queryKey가 사용자 식별자 없이 ['proposals']처럼 정적으로 구성돼, TanStack Query가 모든 사용자에게 동일 캐시를 공유하던 것을 원인으로 확인했습니다.",
          "쿼리 키에 로그인 사용자 고유 ID를 포함하도록 수정(['proposals'] → ['proposals', userId])해 계정마다 별도 캐시 저장소를 할당하고, 사용자 전환 시 새 키로 독립적인 Fetching이 발생하도록 했습니다.",
          "로그아웃 핸들러에서 queryClient.clear()를 실행해 메모리에 남은 모든 쿼리 데이터를 즉시 삭제하는 보안 중심의 클린업 프로세스를 구축했습니다.",
        ],
        result: [
          "계정 전환 시 이전 사용자의 목록이 노출되던 문제가 해소됐습니다.",
          "인증 상태와 캐시 생명주기를 일치시켜, 다중 사용자 환경에서 의도치 않은 데이터 유출 가능성을 원천 차단했습니다.",
        ],
      },
      {
        title: "과대 페이로드로 인한 제안서 목록 로딩 지연",
        situation:
          "로그인 후 /dashboard 리다이렉트 시 제안서 목록 스켈레톤 UI가 비정상적으로 길게 유지되거나, 심한 경우 네트워크 타임아웃 에러가 노출되는 현상이 발생했습니다.",
        task:
          "목록 렌더링에 불필요한 데이터 전송을 제거해 응답 크기와 로딩 시간을 줄이는 것을 목표로 했습니다.",
        action: [
          "Chrome DevTools Network 탭으로 단일 API 응답 크기가 1,415KB임을 측정하고, getProposals()가 .select('*')로 모든 필드를 전송하던 것을 원인으로 확인했습니다.",
          "목록 렌더링에 필요한 필드만 명시적으로 선택하도록 .select('id, title, client, status, progress, error, created_at, updated_at, …')로 변경했습니다.",
        ],
        result: [
          "API 응답 크기를 1,415KB에서 206KB로 약 85% 감소시켜 네트워크 리소스를 최적화했습니다.",
          "스켈레톤 지연·타임아웃 현상이 해소되고 목록 초기 로딩 속도가 개선됐습니다.",
        ],
        image: { src: "/projects/deckly-payload-after.png", w: 425, h: 18 },
      },
    ],
  },
  {
    slug: "sub-fc",
    title: "SUB-FC — 팀 매니지먼트 서비스",
    org: "개인 프로젝트",
    period: "2025.08.25 — current",
    active: true,
    role: "Frontend · Full-cycle",
    type: "Side Project",
    scale: "1인 개발",
    summary:
      "SUB-FC의 경기 일정·결과·선수단 정보를 확인하는 팀 매니지먼트 서비스. 기획부터 배포까지 End-to-End로 진행하며 실사용자 피드백을 반영해 고도화 중.",
    detail:
      "기존에 쓰던 앱의 높은 피로도와 불필요한 기능을 덜어내고, 실제 팀원이 원하는 기능에 집중해 만든 팀 전용 매니지먼트 서비스입니다. 기획·UI/UX 설계부터 프론트엔드·백엔드·배포까지 1인 풀사이클로 진행했으며, 팀원 피드백을 주기적으로 수집해 개선사항을 반영하고 있습니다.",
    highlights: [
      "Supabase 기반으로 직접 SQL DB 스키마 설계·데이터 모델링부터 FE·BE·배포까지 1인 풀사이클로 진행.",
      "서버 컴포넌트 전환으로 핵심 콘텐츠를 HTML에 선반영해 메인 페이지 Lighthouse Performance를 71 → 99점(약 39%↑)으로 개선.",
      "알림 시스템을 Database Subscription에서 Supabase Broadcast로 전환해 등록 시점에 맞춘 정확한 실시간 알림을 구현.",
      "Zod 런타임 검증과 Jest 기반 TDD를 도입해 데이터 무결성과 안정적인 코드 품질을 확보.",
      "실사용자 20명을 확보하고 주기적인 피드백 수집을 바탕으로 UI/UX 개선·기능 고도화에 반영.",
    ],
    resumeBullets: [
      "Lighthouse Performance 71 → 99점 (서버 컴포넌트 전환)",
      "Supabase Broadcast로 실시간 알림 정확도 개선",
      "실사용자 20명 확보·피드백 기반 UI/UX 고도화",
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
      "ESLint",
      "Prettier",
      "GitHub Actions",
      "Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/seong5/SUB_FC" },
      { label: "Deploy", href: "https://sub-fc-21fv.vercel.app/" },
    ],
    thumbnail: "sub-fc.jpg",
    image: "/projects/sub-fc.png",
    imageFit: "contain",
    gallery: [
      { src: "/projects/sub-fc-3.png", w: 826, h: 1202 },
      { src: "/projects/sub-fc-1.png", w: 832, h: 1224 },
      { src: "/projects/sub-fc-2.png", w: 842, h: 1226 },
    ],
    galleryCols: 3,
    metrics: [
      { value: "71→99", label: "서버 컴포넌트로 성능 개선" },
      { value: "20명", label: "실사용자 확보" },
      { value: "Zod·Jest", label: "런타임 검증·TDD 도입" },
      { value: "Broadcast", label: "실시간 알림 정확도 개선" },
    ],
    insights: [
      {
        title: "서버 컴포넌트 전환을 통한 LCP 및 초기 로딩 개선",
        intro:
          "서버에서 쿠키 기반 인증 데이터를 병렬로 fetch해 클라이언트에 initialData를 주입하고, 불필요한 클라이언트 사이드 데이터 요청을 줄여 FCP·LCP를 크게 끌어올렸습니다.",
        steps: [
          {
            title: "효율적인 데이터 전달",
            points: [
              "서버에서 쿠키 기반 인증 데이터를 병렬 fetch해 initialData를 주입하고, 데이터가 있으면 즉시 렌더링·없으면 클라이언트에서 확인하는 이중 컴포넌트로 구현했습니다.",
            ],
          },
          {
            title: "핵심 콘텐츠 선반영으로 LCP 개선",
            points: [
              "브라우저 JS 실행 전 페이지의 핵심 콘텐츠를 HTML에 포함시켜 LCP를 크게 개선했습니다. 그 결과 메인 페이지 Lighthouse Performance 점수가 71점 → 99점으로 약 39% 향상됐습니다.",
            ],
          },
          {
            title: "컴포넌트 역할 분리",
            points: [
              "데이터 로딩은 서버, 사용자 인터랙션은 클라이언트가 담당하도록 역할을 분리해 JS 번들 크기를 줄이고 최적화에 기여했습니다.",
            ],
          },
        ],
        image: { src: "/projects/sub-fc-lighthouse.png", w: 822, h: 344 },
      },
      {
        title: "데이터 구조와 프론트엔드 로직의 관계성",
        intro:
          "직접 SQL을 작성하고 데이터 모델링을 진행하며, 견고한 데이터 구조 설계가 곧 명확한 프론트엔드 로직으로 이어진다는 것을 체감했습니다.",
        steps: [
          {
            title: "데이터 흐름 파악으로 설계 역량 확보",
            points: [
              "데이터의 흐름을 파악함으로써 API 효율을 높였습니다.",
              "화면 중심이 아닌 데이터 중심의 설계 역량을 확보했습니다.",
            ],
          },
        ],
      },
      {
        title: "TDD 방법론의 필요성",
        intro:
          "테스트 코드 작성은 단순히 완벽한 코드를 만드는 수단이 아니라, 지속 가능한 코드와 안전한 리팩토링 환경을 만들어 주는 안전망이라는 것을 학습했습니다.",
        steps: [
          {
            title: "확신을 갖는 개발 문화",
            points: [
              "TDD를 통해 코드 품질에 대한 확신을 갖고 유지보수 비용을 낮추는 개발 문화의 중요성을 다시 체감했습니다.",
            ],
          },
        ],
      },
      {
        title: "효율적인 서버 상태 관리",
        intro:
          "TanStack Query의 staleTime과 useMutation을 심도 있게 활용하며 비동기 데이터의 생명주기를 관리하는 법을 경험했습니다.",
        steps: [
          {
            title: "네트워크 절감과 즉각적 피드백",
            points: [
              "불필요한 네트워크 비용을 절감하는 동시에, 요청 상태에 따른 즉각적인 UI 피드백을 제공했습니다.",
              "사용자에게 끊김 없는 인터페이스를 제공하는 경험을 쌓았습니다.",
            ],
          },
        ],
      },
      {
        title: "로직 분리를 통한 컴포넌트 설계의 재사용성",
        intro:
          "뷰 로직과 비즈니스 로직을 분리하고 커스텀 훅을 활용함으로써 컴포넌트의 가독성을 높이고 로직의 재사용성을 극대화했습니다.",
        steps: [
          {
            title: "공통 queryKey 추상화",
            points: [
              "공통된 queryKey를 사용하는 로직을 추상화해 여러 컴포넌트에서 데이터 일관성을 유지하고 유지보수를 용이하게 하는 구조를 확보했습니다.",
            ],
          },
        ],
      },
      {
        title: "실시간 데이터 통신 방식의 최적화",
        intro:
          "Supabase의 Subscription과 Broadcast 방식의 차이를 깊이 있게 경험했습니다.",
        steps: [
          {
            title: "명확한 시점의 알림 전달",
            points: [
              "단순 DB 변동 감지로 알림을 보내는 것이 아니라 API 단계에서 명확한 시점에 메시지를 전송하는 Broadcast 방식을 채택했습니다.",
              "사용자에게 명확하고 유의미한 시점의 알림을 전달하는 실무적 기술 선택 역량을 키웠습니다.",
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "알림 시점이 부정확한 Database Subscription을 Broadcast로 전환",
        situation:
          "경기 결과 확인·일정 등록은 서비스의 핵심 기능이라 등록 시 즉각적인 알림이 필요했습니다. 초기에는 DB 변경을 감지하는 Database Subscription 방식을 채택했지만, 단순 데이터 수정·관리자 작업에도 불필요한 알림이 발송되는 불분명한 트리거 시점, 그리고 특정 경기·일정에 구체적 메시지를 담기 어려운 비즈니스 맥락 결여라는 한계를 겪었습니다.",
        task:
          "DB 변화에 반응하는 불명확한 방식이 아니라, 사용자가 등록 버튼을 눌렀을 때만 작동하는 이벤트 기반으로 알림 시점의 정확도를 높이는 것을 목표로 했습니다.",
        action: [
          "API Route(/api/matches·/api/schedules) 내에서 DB 트랜잭션 성공이 확인된 정확한 시점에만 channel.send()를 호출하도록 설계해, 관리자가 대시보드에서 데이터를 수정해도 알림이 가던 로직을 제거했습니다.",
          "NotificationProvider로 서비스 전체에서 알림을 감지하는 안테나 역할을 두어, 페이지마다 알림 로직을 따로 두지 않고 한 곳에서 등록 이벤트를 감지하도록 했습니다.",
          "수신된 알림은 Zustand 전역 보관함에 저장해 화면 상단 종 아이콘과 상세 드롭다운이 항상 같은 최신 데이터를 보여주도록 했습니다.",
          "useEffect 클린업으로 컴포넌트 언마운트 시 자동 구독 해제(Unsubscribe)를 구현해 메모리 누수를 방지하고, 알림 전송 실패가 경기·일정 등록 로직에 영향을 주지 않도록 비동기 예외 처리를 적용했습니다.",
        ],
        result: [
          "페이지 새로고침 없이도 팀원에게 실시간으로 알림을 전달할 수 있게 됐습니다.",
          "Broadcast에 필요한 정보를 모두 담아 전달해, 알림 수신 시 추가 API 호출 없이 UI를 렌더링하며 네트워크 비용을 절감했습니다.",
          "TypeScript로 알림 타입을 구분하고 Zustand로 UI와 로직을 완전히 분리해, 새로운 알림 기능을 확장할 수 있는 기반을 마련했습니다.",
        ],
      },
    ],
  },
  {
    slug: "globalnomad",
    title: "GlobalNomad — 액티비티 마켓플레이스",
    org: "코드잇 · FE 심화 프로젝트",
    period: "2025.07.09 — 2025.08.05 (1m)",
    role: "Frontend",
    type: "Team Project",
    scale: "5인 개발",
    summary:
      "사용자가 공급자·수요자로 동시에 활동하는 지도·예약 기반 양방향 액티비티 마켓플레이스. 지도 연동과 상태 관리·캐싱 최적화를 담당.",
    detail:
      "사용자가 공급자와 수요자로 동시에 활동할 수 있는, 지도와 예약 기반의 양방향 액티비티 마켓플레이스 서비스입니다.",
    highlights: [
      "체험 예약 입력의 복잡도를 낮추기 위해 디바이스별 단계(Step)형 입력 폼을 설계해 이탈률을 줄이는 사용자 경험을 제공.",
      "등록 이미지 개수에 따라 레이아웃이 유동적으로 변하는 반응형 이미지 그리드를 구현해 화면 비율과 시각적 일관성을 확보.",
      "Kakao Maps SDK를 지연 로딩으로 주입하고 window 참조 전 클라이언트 실행 여부를 검증해 SSR 참조 에러를 방지, Read-Only·Resize로 디바이스별 일관된 지도 뷰 유지.",
      "Zustand로 판매자 관리 로직의 Prop Drilling을 해소하고, TanStack Query staleTime으로 중복 API 요청을 차단해 서버 부하를 경감.",
    ],
    resumeBullets: [
      "디바이스별 Step형 예약 플로우 설계·구현",
      "Kakao Maps SDK 지연 로딩·SSR 안전 연동",
      "Tanstack Query staleTime으로 중복 API 요청 절감",
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
      "ESLint",
      "Prettier",
      "GitHub Actions",
      "Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Act-It-FE/global-nomad" },
      { label: "Deploy", href: "https://global-nomad-omega.vercel.app/" },
    ],
    thumbnail: "globalnomad.jpg",
    image: "/projects/globalnomad.png",
    insights: [
      {
        title: "디바이스 대응력을 고려한 기능 단위 컴포넌트 설계",
        intro:
          "하나의 컴포넌트가 하나의 기능만 담당하도록 설계해 예기치 못한 사이드 이펙트를 방지하고, 코드 수정 시 영향 범위를 최소화하는 안정적인 유지보수 환경을 경험했습니다.",
        steps: [
          {
            title: "기능 단위 분리로 대응력 확보",
            points: [
              "복잡한 예약 단계(Step) 플로우를 디바이스에 맞게 분리해 가독성과 디바이스 대응력을 높였습니다.",
            ],
          },
        ],
      },
      {
        title: "사용자 경험과 기술적 성능의 균형",
        intro:
          "이미지 랜덤 노출 같은 기능을 구현할 때 개발 편의성보다 사용자가 겪을 수 있는 실수나 불편을 먼저 고려하는 설계의 중요성을 배웠습니다.",
        steps: [
          {
            title: "사용자 중심의 사고방식",
            points: [
              "기술은 결국 사용자의 문제를 해결하기 위한 도구임을 다시 체감하며 사용자 중심의 사고방식을 갖추게 되었습니다.",
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "디바이스별로 다른 예약 플로우를 위한 컴포넌트·로직 분리",
        situation:
          "체험 상세 페이지의 예약 플로우가 Figma 시안상 디바이스별로 달라야 했습니다. PC는 한 화면에서 모든 단계가 진행되지만, Tablet·Mobile은 예약 버튼 클릭 → 날짜 선택 → 가능 시간 선택 → 인원 선택 → 완료의 위저드로 진행돼야 했는데, 스프린트 기간 내에 모바일·태블릿 플로우를 구현하지 못했습니다.",
        task:
          "하나의 캘린더 컴포넌트가 모든 디바이스의 로직과 UI를 처리해 조건문이 복잡하고 입력 시점·검증 로직까지 기기별로 달랐던 강결합을 풀어, 디바이스별 예약 플로우를 안정적으로 구현하는 것을 목표로 했습니다.",
        action: [
          "PC는 한 화면 진행을 유지하고, 태블릿·모바일은 각각 사용될 컴포넌트를 분리해 개발했습니다.",
          "모바일·태블릿은 useState로 현재 단계를 추적하고 기기별 스텝 수에 따라 조건부 렌더링하는 '다음' 버튼 중심의 위저드 플로우를 구현했습니다.",
          "UI는 분리하되 예약에 필요한 핵심 로직(날짜 검증·API 호출 등)은 커스텀 훅으로 캡슐화해 데이터 무결성과 유지보수성을 확보했습니다.",
        ],
        result: [
          "PC·태블릿·모바일 각각에 맞는 예약 플로우를 완성했습니다.",
          "UI와 비즈니스 로직을 분리해 컴포넌트 가독성과 재사용성이 높아지고, 디바이스 조건이 늘어도 대응하기 쉬운 구조를 확보했습니다.",
        ],
      },
    ],
  },
  {
    slug: "whyne",
    title: "WHYNE — 와인 리뷰 플랫폼",
    org: "코드잇 · FE 중급 프로젝트",
    period: "2025.06.05 — 2025.06.24 (3w)",
    role: "Frontend",
    type: "Team Project",
    scale: "4인 개발",
    summary:
      "다양한 와인을 검색·필터링하고 직접 리뷰를 등록·확인하는 리뷰 기반 플랫폼. AWS 인프라 구축과 라이브러리 없는 UI 구현, 다중 필터링 로직을 담당.",
    detail:
      "사용자들이 다양한 와인 정보를 검색·필터링하며 직접 리뷰를 등록하고 확인하는 리뷰 기반 플랫폼입니다.",
    highlights: [
      "UI 라이브러리 없이 캐러셀을 직접 구현해 번들 크기를 최적화하고, 평점 4.2점 이상 상위 와인 8종을 랜덤 추천하는 메인 인터페이스를 제공.",
      "라이브러리 없이 Range Slider형 가격 필터(0~100만원)와 와인 타입·평점 다중 조건 필터링 로직을 직접 구현해 최적화.",
      "AWS(Route53·EC2)로 배포 전 과정을 직접 수행한 뒤, 비용·운영 안정성을 고려해 Vercel로 마이그레이션.",
      "컨테이너-프리젠테이션 패턴으로 비즈니스 로직과 뷰를 분리해 컴포넌트 재사용성과 유지보수성을 확보.",
    ],
    resumeBullets: [
      "UI 라이브러리 없이 캐러셀·필터 직접 구현, 번들 최적화",
      "AWS Route53·EC2 배포 후 Vercel로 마이그레이션",
      "다중 필터·검색 로직 설계로 대량 목록 성능 유지",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "React Hook Form",
      "Husky",
      "ESLint",
      "Prettier",
      "AWS",
      "GitHub Actions",
      "Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/codeit-part3-team5/whyne" },
      { label: "Deploy", href: "https://whyne-navy.vercel.app/" },
    ],
    thumbnail: "whyne.jpg",
    image: "/projects/whyne.png",
    imageNoBorder: true,
    insights: [
      {
        title: "컨테이너-프리젠테이션 패턴",
        intro:
          "데이터 패칭·비즈니스 로직을 담당하는 컴포넌트와 UI 렌더링에 집중하는 컴포넌트를 분리해, 로직과 뷰 사이의 의존성을 최소화했습니다.",
        steps: [
          {
            title: "역할 정의와 책임 분리",
            points: [
              "데이터·로직은 MonthlyWines가, UI 렌더링은 MiniWineCard가 담당하도록 구조를 분리해 비즈니스 로직과 뷰 로직의 의존성을 최소화했습니다.",
            ],
          },
          {
            title: "재사용성·확장성 극대화",
            points: [
              "UI 전용 MiniWineCard를 순수 함수형으로 설계해 특정 도메인에 종속되지 않고 다양한 컨텍스트에서 재사용 가능한 컴포넌트로 개선했습니다.",
            ],
          },
          {
            title: "가독성·유지보수 효율 향상",
            points: [
              "각 컴포넌트의 역할이 명확해져 코드 파악이 쉽고, UI 변경이나 로직 수정 시 서로 영향을 주지 않고 독립적으로 작업할 수 있는 환경을 확보했습니다.",
            ],
          },
        ],
      },
      {
        title: "브라우저 이벤트를 활용한 상호작용 최적화",
        intro:
          "useRef와 이벤트 위임을 활용해 드롭다운의 외부 영역 감지 로직을 직접 구현하면서 성능과 메모리 효율을 함께 잡았습니다.",
        steps: [
          {
            title: "이벤트 위임으로 리스너 최소화",
            points: [
              "document 레벨에서 이벤트를 감지하는 이벤트 위임을 활용해, 다수의 드롭다운이 렌더링되는 상황에서도 불필요한 리스너 생성을 방지하고 메모리 자원을 효율적으로 관리했습니다.",
            ],
          },
          {
            title: "정확하고 빠른 외부 영역 감지",
            points: [
              "click보다 발생 시점이 빠른 mousedown 이벤트를 활용해 사용자 반응 속도를 높이고, useRef의 .contains()로 직접적인 DOM 접근 없이 정확한 외부 영역 감지 로직을 구현했습니다.",
              "컴포넌트 언마운트 시 Cleanup 함수로 리스너를 제거해 메모리 누수와 사이드 이펙트를 사전에 차단했습니다.",
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "EC2 재시작 후 발생한 도메인 연결 끊김·SSH 권한 에러",
        situation:
          "EC2 인스턴스를 재시작한 뒤 서비스에 접속이 되지 않는 현상이 발생했고, SSH 터미널 접속 시에도 권한 에러가 나 배포가 중단됐습니다.",
        task:
          "재시작으로 끊긴 도메인 연결을 복구하고, 반복 가능한 SSH 접속·배포 절차를 정립하는 것을 목표로 했습니다.",
        action: [
          "원인 ①: AWS EC2를 중단 후 재시작하면 Public IP가 변경돼 Route53에 등록된 기존 IP와 불일치하면서 도메인 연결이 끊겼습니다. Route53 호스팅 영역에서 변경된 Public IP를 레코드에 즉시 업데이트해 연결을 복구했습니다.",
          "원인 ②: 보안 키 페어(.pem)가 위치한 경로가 아닌 곳에서 SSH 명령을 실행해 접근 권한을 얻지 못했습니다. SSH 접속·배포 스크립트를 반드시 키 파일이 있는 디렉토리에서 수행하도록 절차를 매뉴얼화하고 권한 설정(chmod 400)을 재확인했습니다.",
        ],
        result: [
          "변경된 IP를 DNS 레코드에 반영해 도메인 연결이 즉시 복구됐습니다.",
          "실행 경로·권한 절차를 매뉴얼화해, 인스턴스 재시작 시 같은 클래스의 접속·배포 중단이 재발하지 않도록 했습니다.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
