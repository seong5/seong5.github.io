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
    slug: "umust-erp",
    title: "UMUST R&D ERP — 재고·CRO 통합 관리",
    org: "UMUST R&D · 사업부 IT팀",
    period: "2026.04.28 — 2026.06.30",
    role: "Frontend Intern",
    type: "사내 ERP",
    scale: "2인 개발 · 풀사이클",
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
    ],
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
