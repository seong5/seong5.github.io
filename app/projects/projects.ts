export type ProjectLink = {
  label: string;
  href: string;
};

/** 지표 뱃지가 가리키는 상세 카드 — 종류 + 배열상 1-based 순번 */
export type MetricTarget = { kind: 'insight' | 'trouble'; index: number };

/** 앵커 id — 뱃지의 href와 카드의 id가 이 함수 하나를 공유한다 */
export function cardAnchor(t: MetricTarget): string {
  return `${t.kind}-${t.index}`;
}

/** 정량 지표 — 주요 성과 상단 뱃지 (스캔 시 눈에 박히는 숫자) */
export type Metric = {
  value: string;
  label: string;
  /** 있으면 뱃지가 그 지표를 설명하는 인사이트/트러블 카드로 가는 링크가 된다 */
  target?: MetricTarget;
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

/**
 * 트러블슈팅 — 결론 우선 구조.
 *
 * 기존 STAR(situation·task·action·result)에서 옮겨왔다. 방문자는 카드 하나를
 * 끝까지 읽지 않으므로 "무엇이 해결됐나(conclusion) → 왜 그랬나(cause)"를 먼저 두고,
 * 경위(problem·actions)는 접어둔다. lesson이 카드의 마무리다.
 */
export type Trouble = {
  title: string;
  /** RESULT — 무엇이 해결됐는지 한 문장. 카드에서 가장 크게, 가장 먼저 읽힌다 */
  conclusion: string;
  /** CAUSE — 근본 원인 요약. conclusion 바로 아래 강조 블록 */
  cause: string;
  /** PROBLEM — 처음 관측된 증상. 기본 접힘 */
  problem: string;
  /** ACTION — 조치 과정. 기본 접힘 */
  actions: string[];
  /** LEARNED — 다음에 가져갈 교훈 */
  lesson: string;
  /** before/after 비교 다이어그램 — 2열로 나란히 */
  compare?: { label: string; src: string; w: number; h: number }[];
  /** 단일 다이어그램 */
  image?: Figure;
};

/**
 * What I did — 태그로 묶은 작업 그룹.
 * highlights(평문 배열)는 resume(동결 라우트)이 소비하므로 그대로 두고,
 * 상세 페이지만 이 그룹을 쓴다. 없으면 highlights로 폴백한다.
 */
export type WorkGroup = { tag: string; items: string[] };

/** 상세 갤러리 한 장 — 캡션이 있으면 figure/figcaption으로 렌더 */
export type Shot = {
  src: string;
  w: number;
  h: number;
  alt?: string;
  caption?: string;
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
  /** 진행 중인 프로젝트의 현재 작업 내용 (active=true일 때만 표시) */
  currentTask?: string;
  /** 상세 페이지 facts 그리드 값 */
  role: string;
  type: string;
  scale: string;
  /** 목록 카드용 짧은 설명 */
  summary: string;
  /** 상세 페이지 헤더용 설명 (없으면 summary 사용) */
  detail?: string;
  /** 핵심 경험 및 성과 — 평문 배열. resume(동결)이 상위 3개를 쓴다 */
  highlights: string[];
  /** 상세 "What I did" 태그 그룹. 없으면 highlights를 그대로 렌더 */
  work?: WorkGroup[];
  /** 입사지원서용 간소화 불릿 (없으면 highlights 상위 3개 사용) */
  resumeBullets?: string[];
  /** 기술 스택 */
  stack: string[];
  /** 입사지원서용 핵심 스택 (프로젝트를 대표하는 3~5개, 없으면 stack 사용) */
  resumeStack?: string[];
  /** 외부 링크 (배포/저장소 등). URL 미확보 시 빈 배열 */
  links: ProjectLink[];
  /** 목록 카드 썸네일 라벨 (image 없을 때 placeholder에 표시) */
  thumbnail: string;
  /** 대표 이미지 경로(public 기준). 있으면 placeholder 대신 실제 이미지 렌더 */
  image?: string;
  /** 이미지 맞춤 방식. 세로형(모바일 스크린샷)은 "contain" 권장. 기본 "cover" */
  imageFit?: 'cover' | 'contain';
  /** 대표 이미지 테두리 제거 (기본은 border 표시) */
  imageNoBorder?: boolean;
  /** 상세 페이지 갤러리(여러 장). 있으면 단일 hero 대신 갤러리 섹션을 렌더 */
  gallery?: Shot[];
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
    slug: 'dajeonghae',
    title: '다정해 - 그룹 의사결정 앱',
    org: '개인 프로젝트',
    period: '2026.08.10 — current',
    role: '기획 · 설계 · 개발',
    type: 'Mobile App / Side Project',
    scale: '1인 개발',
    active: true,
    currentTask: 'App Store 심사 대응',
    summary:
      '모임 날짜와 장소를 후보 등록·투표로 정하는 그룹 의사결정 앱. 승자 판정을 앱이 아니라 데이터베이스에 두고, 행·컬럼 두 층의 권한 설계로 다인 모임의 데이터 경계를 지킴.',
    detail:
      '여러 사람이 모일 날짜와 장소를 후보로 올리고 투표로 정하는 앱입니다. 마감과 동시에 승자가 확정되고 일정과 알림까지 이어지도록, 판정 규칙을 앱이 아니라 데이터베이스에 두었습니다.',
    highlights: [
      '승자 판정 세 갈래를 DB 함수와 예약 작업에 두어, 앱이 꺼져 있어도 마감 시각에 약속이 확정되는 구조를 설계.',
      '행 단위 정책의 도착지 검사 누락과 컬럼 단위 권한 미회수를 찾아, 출시 전 점검에서 취약점 네 건을 제거.',
      '실시간 구독에서 내용 전달을 걷어내고 신호만 남겨 데이터 노출을 차단하고 구독 수를 3개에서 1개로 축소.',
      '재시도·상한·정리 로직을 호출 지점 35곳 이상이 아니라 통신 경계와 트리거에 두어 우회 경로를 원천 차단.',
    ],
    work: [
      {
        tag: 'PRODUCT',
        items: [
          '모임 날짜와 장소를 후보 등록과 투표로 정하고, 마감과 동시에 일정·알림까지 이어지는 그룹 의사결정 흐름을 설계·구현.',
        ],
      },
      {
        tag: 'ARCHITECTURE',
        items: [
          '승자 판정 규칙 세 갈래를 앱이 아니라 데이터베이스 함수에 두고 예약 작업으로 매분 실행해, 앱이 꺼져 있어도 약속이 확정되는 구조를 설계.',
          '확정과 일정 생성을 같은 트랜잭션에 묶어 확정은 됐는데 일정이 없는 중간 상태가 생기지 않도록 처리.',
        ],
      },
      {
        tag: 'SECURITY',
        items: [
          '행 단위 정책의 도착지 검사와 컬럼 단위 권한 회수를 함께 적용해, 출시 전 전면 점검에서 확인된 취약점 네 건을 제거.',
          '실시간 채널에서 내용 전달을 걷어내고 신호만 남겨 남의 모임 데이터 노출 경로를 차단, 화면이 여는 구독도 셋에서 하나로 축소.',
        ],
      },
      {
        tag: 'OPERATION',
        items: [
          'App Store 심사 반려에 대응해 신고·차단·금칙어를 선제 구현하고, 소규모 모임 특성에 맞게 신고 처리를 세 갈래로 분리.',
        ],
      },
    ],
    metrics: [
      { value: '3 → 1', label: '실시간 구독 수', target: { kind: 'trouble', index: 3 } },
      { value: '35+ → 1', label: '재시도 처리 지점', target: { kind: 'insight', index: 4 } },
      { value: '62', label: '제거한 동기화 사본', target: { kind: 'trouble', index: 4 } },
    ],
    stack: [
      'Expo (SDK 57)',
      'React Native 0.86',
      'React 19',
      'TypeScript',
      'Expo Router',
      'Zustand',
      'Supabase',
      'PostgreSQL (RLS)',
      'PostgREST',
      'Edge Functions (Deno)',
      'pg_cron',
      'Expo Notifications',
      'EAS Build',
    ],
    resumeStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/seong5/dajeonghae' }],
    thumbnail: 'dajeonghae.jpg',
    troubleshooting: [
      {
        title: '초대코드 무차별 대입이 시도 기록만 정확히 지우고 빠져나가던 문제',
        conclusion:
          '실패한 시도가 기록에 남게 되어 분당 5회·시간당 20회 상한이 무차별 대입에도 적용되고, 계정당 하루 480회까지로 눌렸습니다.',
        cause:
          'PostgREST는 RPC 호출 하나를 트랜잭션 하나로 실행합니다. 존재하지 않는 초대코드를 예외로 던지고 있었는데, 그러면 그 트랜잭션이 통째로 되감기면서 방금 올린 시도 횟수까지 함께 사라집니다.',
        problem:
          '초대코드 입력에 분당 5회·시간당 20회 상한을 걸었는데 검증에서 7회 연속으로 통과했습니다. 하필 무차별 대입이 하는 일이 없는 코드를 넣어 보는 것뿐이라, 막으려던 시도만 정확히 기록을 남기지 않고 빠져나가고 있었습니다.',
        actions: [
          '존재하지 않는 초대코드를 예외가 아니라 null 반환으로 바꿔 시도 횟수가 커밋된 채 남게 했습니다. 상한 초과는 그대로 예외로 던지는데, 그 시점에는 이전 시도들이 이미 커밋해 둔 값이 한도에 닿아 있어 창이 지날 때까지 계속 막힙니다.',
          '같은 저장소 안에서 대조군을 찾았습니다. 카카오 검색 쿼터는 구조가 같은데도 멀쩡했고, 이유가 정확히 예외를 던지지 않고 boolean을 돌려주기 때문이었습니다.',
          '마이그레이션 주석에 왜 반환값이어야 하는지를 남겨, 다음에 같은 자리를 고칠 사람이 예외로 되돌리지 않게 했습니다.',
        ],
        lesson:
          '정상적인 거절은 예외가 아니라 반환값으로 표현하고, 통과 여부 판단은 호출자가 합니다. 트랜잭션 경계 안에서 던지는 예외는 막으려던 기록까지 함께 지웁니다.',
      },
      {
        title: '갱신된 토큰이 도착하자마자 401로 거절당하던 문제',
        conclusion:
          '재시도 규칙이 스토어의 호출 35곳 이상이 아니라 통신 경계 한 곳에 모여, 앞으로 추가되는 호출도 자동으로 보호받습니다. 다만 근본 원인이 서버 쪽 시계라 이것은 완화이지 제거가 아니고, 워커 시계가 1.2초 넘게 밀리면 여전히 실패합니다.',
        cause:
          'PostgREST가 토큰의 발급 시각을 오차 허용 없이 검사하는데, 인증 서버가 그 값을 찍는 순간과 PostgREST 워커가 자기 시계와 비교하는 순간이 수백 밀리초 어긋나면 갓 발급된 토큰이 미래에 발급된 토큰으로 거부됩니다.',
        problem:
          '앱을 켜 둔 채 한 시간쯤 지나면 아무 화면에서나 데이터를 불러오지 못했습니다. 로그를 밀리초까지 맞춰 보니 갱신 요청은 200으로 성공했는데 1초 뒤 조회가 PGRST303으로 막히고 있었습니다.',
        actions: [
          '토큰 수명을 늘리는 방법을 먼저 배제했습니다. 이 오류는 토큰이 짧아서가 아니라 발급되는 순간에 나므로 수명을 두 배로 해도 갱신 한 번당 확률은 같고, 로그인 직후 첫 발급은 수명과 무관합니다. 게다가 탈퇴한 계정의 토큰이 형식상 유효한 창까지 함께 길어집니다.',
          '클라이언트의 fetch를 교체해 401 응답 가운데 PGRST303인 것만 1.2초 뒤 같은 토큰으로 다시 보내게 했습니다. 새 토큰을 받으면 발급 시각이 또 미래가 되므로, 기다리는 대상은 서버 시계가 그 토큰을 지나가는 것입니다.',
          '인증과 스토리지 요청이 휩쓸리지 않도록 경로와 에러코드 두 겹으로 걸렀고, 기존에 쓰던 개별 재시도 헬퍼 하나는 삭제했습니다.',
          '실제 재현은 서버 워커의 시계가 어긋나야 나는 것이라 마음대로 만들 수 없어, 재현 검증은 미검증으로 남겨 두었습니다.',
        ],
        lesson:
          '전역 처리의 요점은 재시도가 아니라 이번 호출은 감싸야 하나라는 판단을 없애는 것입니다. 그래서 관문으로 옮긴 뒤에는 옛 헬퍼를 반드시 지워야 합니다. 남겨 두면 새 조회마다 같은 판단이 계속 남습니다.',
      },
      {
        title: '실시간 구독으로 남의 모임 후보와 투표가 새어 나가던 문제',
        conclusion:
          '유출 경로가 닫히고, 실시간 채널이 내용이 아니라 무언가 바뀌었다는 신호만 실어 나르는 구조로 바뀌어 같은 종류의 노출이 다시 생기지 않게 됐습니다. 화면이 여는 구독도 셋에서 하나로 줄었습니다.',
        cause:
          '실시간 publication은 삽입과 수정만 정책으로 걸러 멤버에게 보내고 삭제는 구독한 모두에게 보냅니다. 여기에 이전 값도 전부 실어 보내라는 설정이 겹쳐 삭제된 행이 통째로 브로드캐스트되고 있었습니다.',
        problem:
          '앱은 특정 정하기로 필터를 걸고 구독하지만 그 필터는 클라이언트가 정하는 값입니다. 그룹에 가입만 한 사람이 필터 없이 구독하면 남의 모임 후보와 투표가 그대로 흘러들어옵니다. 투표 취소가 삭제라 이 경로는 상시 열려 있었습니다.',
        actions: [
          '자식 테이블 둘을 publication에서 빼고 이전 값을 싣지 않도록 되돌린 뒤, 후보나 투표가 바뀌면 부모 행의 갱신 시각만 건드리는 트리거를 두어 신호만 나가게 했습니다.',
          '트리거를 정의자 권한으로 만들지 않으면 방장이 아닌 멤버는 권한이 없어 정책에 막히고 투표 자체가 실패하므로, 검증을 일부러 가장 권한이 약한 멤버 계정으로 해서 투표·취소·후보 등록 세 경우 모두 갱신 시각이 움직이는 것을 확인했습니다.',
        ],
        lesson:
          '필터나 페이지네이션처럼 요청하는 쪽이 정하는 값은 성능 수단이지 권한 수단이 아닙니다. 이 값을 지우고 요청하면 무엇이 오는가를 물어보면 경계인지 아닌지 바로 드러납니다. 그리고 권한이 걸린 트리거는 가장 권한이 약한 사용자로 시험해야 합니다.',
      },
      {
        title: 'iCloud 충돌 사본이 빌드와 마이그레이션을 가로챈 문제',
        conclusion:
          '사본을 전부 제거해 마이그레이션 이력이 원격과 다시 맞고, 빌드 전에 사본을 훑는 확인이 절차로 들어갔습니다.',
        cause:
          '생성물 디렉터리가 iCloud Drive 안에 있어 동기화가 원본 옆에 이름 끝에 숫자가 붙은 충돌 사본을 만들었습니다. 내용이 원본과 같으면 어떤 검사도 통과합니다.',
        problem:
          '빌드가 성공하는데 설정이 반영되지 않는 일이 반복됐습니다. 사본이 원본보다 이름 순서에서 앞서면 도구가 그쪽을 집는데, 내용이 같으니 에러도 경고도 나지 않았습니다.',
        actions: [
          '사본 62개의 위치를 훑어 25개가 마이그레이션 디렉터리 안에 있다는 것을 발견했습니다. 사본이 원본과 같은 버전 번호를 달기 때문에 원격 마이그레이션 이력과 어긋나 배포를 깨뜨릴 수 있는 상태였습니다.',
          '라우팅 디렉터리의 5개는 파일 하나가 곧 경로가 되는 구조라 실제로 없는 화면이 경로로 생기고 있었고, 무시 목록 안의 7개는 상태 조회에 뜨지 않아 따로 훑어야 찾았습니다.',
          '지우기 전에 잃을 것이 없음을 확인했습니다. 원본이 있는지, 버전 관리가 추적하는지, 바이트 단위로 같은지, 사본은 추적 밖인지 네 가지를 62개 중 55개에서 확인했고 그중 바이트 비교가 핵심이었습니다. 나머지 7개 중 둘은 원본과 달랐지만 둘 다 생성물이라 지워도 됐습니다.',
          '빌드 전에 같은 훑기를 한 번 돌리는 것을 습관으로 넣었습니다.',
        ],
        lesson:
          '생성물 디렉터리를 iCloud Drive 같은 동기화 폴더에 두면 도구가 조용히 다른 파일을 집습니다. 이 부류는 실패가 아니라 성공으로 위장하기 때문에, 경고를 기다리지 말고 주기적으로 직접 훑는 수밖에 없습니다.',
      },
    ],
    insights: [
      {
        title: '조용히 성공하는 실패가 조용히 실패하는 것보다 나쁘다',
        intro:
          '이 프로젝트에서 가장 오래 걸린 문제들에는 공통점이 있었습니다. 에러가 나지 않았다는 것입니다. 빌드는 성공했고, 쿼리는 200을 돌려줬고, 타입 검사는 통과했습니다.',
        steps: [
          {
            title: '얼굴 — 성공한 것처럼 보이는 실패들',
            points: [
              '네이티브 모듈은 로그를 남기며 정상으로 들어가는데 권한 설정만 빠져 있었습니다. 로그가 찍히니 아무도 의심하지 않았습니다.',
              '예약 발송은 확정도 되고 알림 적재도 정상인데 발송만 조용히 쉬고 있었습니다. 어디를 봐야 할지 알 수 없는 실패였습니다.',
              '날짜 선택 취소를 막는 가드는 한 번도 발동한 적이 없었습니다. 취소해도 원래 값이 그대로 넘어와 화면에는 티가 나지 않았을 뿐입니다.',
            ],
          },
          {
            title: '비용 — 신호가 없으면 탐색 범위가 저장소 전체가 된다',
            points: [
              '조용히 실패하면 최소한 어디가 터졌는지는 압니다. 조용히 성공하면 무엇이 잘못됐는지부터 찾아야 해서 탐색이 끝나지 않습니다.',
            ],
          },
          {
            title: '대책 — 성공을 의심하는 검사를 따로 만든다',
            points: [
              '권한이 걸린 코드는 가장 권한이 약한 계정으로 시험합니다. 방장 계정으로 테스트했다면 함정은 끝내 드러나지 않았을 것입니다.',
              '무시 목록 안의 파일은 상태 조회에 뜨지 않으므로 따로 훑는 명령을 절차에 넣었습니다.',
              '구독 상태 콜백을 붙여 실패가 로그에 남게 했습니다. 그러지 않으면 왜 안 바뀌지로만 나타납니다.',
            ],
          },
        ],
      },
      {
        title: '정답이 여러 갈래면 판정을 클라이언트가 아니라 데이터베이스에 둔다',
        intro:
          '투표 마감 후 승자를 정하는 길이 세 갈래였습니다. 최다득표, 아무도 좋아요를 누르지 않았을 때 싫어요가 가장 적은 후보, 그리고 동점일 때 방장이 고르는 경우입니다. 앱에서 계산하면 화면마다 규칙이 흩어지고, 마감 시각에 앱이 꺼져 있으면 아무 일도 일어나지 않습니다.',
        steps: [
          {
            title: '판정은 예약 작업이 부른다 — 앱이 꺼져 있어도 약속이 정해진다',
            points: [
              '마감 판정은 앱이 아니라 예약 작업이 매분 함수를 부르는 방식이라, 아무도 앱을 켜지 않아도 약속이 정해집니다.',
              '중복 확정을 막기 위해 대상 행을 잠그고, 이미 열린 상태가 아니면 그대로 반환합니다. 같은 정하기에 두 번 들어와도 결과가 달라지지 않습니다.',
              '확정과 일정 생성을 같은 트랜잭션에 두어, 확정은 됐는데 일정이 없는 중간 상태가 생기지 않게 했습니다.',
            ],
          },
          {
            title: '앱은 표를 넣고 읽기만 한다',
            points: [
              '화면에서는 확정 규칙을 다시 구현하지 않습니다. 앱이 하는 일은 투표를 넣고 결과를 다시 읽는 것뿐입니다.',
              '규칙이 바뀌면 마이그레이션 하나만 고치면 되고, 앱 배포를 기다리지 않아도 모든 사용자에게 같은 규칙이 적용됩니다.',
            ],
          },
        ],
      },
      {
        title: '행 단위 보안은 컬럼을 가리지 않는다',
        intro:
          '정책은 어떤 행을 볼 수 있는가만 답합니다. 그 행의 어떤 컬럼을 고칠 수 있는가는 다른 질문이고, 그 자리를 비워 두면 정책이 멀쩡해 보여도 뚫립니다.',
        steps: [
          {
            title: '두 검사는 다른 질문이다 — 누가 보는가와 어디로 보내는가',
            points: [
              '자기 행을 고칠 수 있다는 정책에 도착지 검사가 비어 있어, 소속 그룹을 남의 모임으로 바꿔치기할 수 있었습니다. 필요한 것은 그룹 식별자 하나뿐이고, 한 번이라도 멤버였던 사람은 나간 뒤에도 그 값을 갖고 있습니다.',
              '읽기가 뚫린 것은 아니라서 유출이 아니라 괴롭힘 통로로 보는 것이 정확했습니다.',
              '수정 정책을 고친 뒤에도 삭제 정책에 같은 누락이 남아 있었습니다. 쫓겨난 사람이 자기 정하기를 지우면 후보와 모든 사람의 표, 확정된 일정까지 함께 사라졌습니다.',
            ],
          },
          {
            title: '컬럼은 GRANT의 일',
            points: [
              '처방은 같았습니다. 테이블 전체 수정 권한을 회수하고 앱이 실제로 고치는 컬럼만 다시 부여했습니다.',
              '함수 실행 권한만 막고 안심하면 안 됩니다. 그 함수가 건드리는 컬럼이 열려 있으면 함수를 거치지 않고 우회됩니다.',
              '정책만 읽어서는 알 수 없어서, 테스트 계정으로 허용 컬럼과 금지 컬럼과 남의 행 세 경우를 실제로 실행해 확인하고 검증용 행은 지웠습니다.',
            ],
          },
          {
            title: '회수는 PUBLIC까지 가야 한다',
            points: [
              '함수를 만들면 실행 권한이 PUBLIC에 기본으로 부여되고 익명 역할은 그 PUBLIC의 멤버입니다. PUBLIC을 그대로 둔 채 익명 역할에서만 회수하면 아무 일도 일어나지 않습니다.',
              '기본 권한 설정을 함께 바꾸지 않으면 다음 마이그레이션이 만드는 테이블은 처음부터 다시 열린 채로 태어납니다.',
            ],
          },
          {
            title: '치른 대가',
            points: [
              '허용 컬럼 목록이 스키마와 함께 늘어납니다. 그 테이블에 앱이 수정할 컬럼을 추가하면 권한 부여도 같이 고쳐야 하고, 잊으면 조용히 권한 오류가 납니다.',
              '그 비용이 아까워 보일 때는 반대쪽을 봅니다. 이렇게 막은 것들은 전부 기록에 흔적을 남기지 않는 조작이었습니다.',
            ],
          },
        ],
      },
      {
        title: '우회 경로를 셀 수 없으면 호출 지점이 아니라 관문에 둔다',
        steps: [
          {
            title: '판단 기준 — 이 규칙을 피해 가는 길을 전부 셀 수 있는가',
            points: [
              '셀 수 있으면 호출 지점에 둬도 됩니다. 셀 수 없으면 모두가 지나는 관문에 둬야 합니다.',
            ],
          },
          {
            title: '트리거만 여러 길을 한 번에 덮는다',
            points: [
              '삽입 직전에 도는 트리거는 어느 경로로 들어오든 반드시 실행되므로 앱과 직접 호출 두 구멍을 동시에 막았습니다.',
              '그룹을 떠난 사람의 표를 지우는 일은 내보내기·나가기·회원 탈퇴·직접 삭제 네 경로를 한 번에 덮어야 해서, 앱의 함수 하나에 넣으면 셋이 샙니다.',
              '상한값은 함수 하나에만 두어 트리거와 앱의 조회 창구가 같은 값을 봅니다. 나중에 요금제가 생기면 그 함수만 갈아끼웁니다.',
            ],
          },
          {
            title: '관문으로 옮겼으면 옛 길은 지운다',
            points: [
              '옛 헬퍼를 남겨 두면 새 코드마다 이걸로 감싸야 하나 하는 판단이 계속 남습니다. 전역 처리의 요점이 바로 그 판단을 없애는 것입니다.',
            ],
          },
        ],
      },
      {
        title: '실시간은 델타를 병합하지 말고 다시 읽는다',
        steps: [
          {
            title: '채널은 신호만 나른다',
            points: [
              '실시간 메시지의 내용을 화면 상태에 병합하지 않고, 무언가 바뀌었다는 신호로만 쓰고 필요한 범위를 다시 읽습니다. 병합하면 순서가 어긋난 메시지 하나가 화면을 조용히 틀리게 만듭니다.',
            ],
          },
          {
            title: '낙관적 업데이트는 투표에만',
            points: [
              '표를 누르는 순간은 손끝 반응이 중요해서 화면을 먼저 바꾸고, 실패하면 되돌린 뒤 서버 상태로 다시 맞춥니다.',
              '알림 읽음 표시에도 같은 방식을 썼습니다. 누르면 바로 화면을 떠나므로 점이 늦게 사라지면 안 되기 때문이고, 실패하면 이전 목록으로 되돌립니다.',
              '그 밖의 동작으로는 넓히지 않았습니다. 재조회가 충분히 빠른데 낙관적 업데이트를 넓게 쓸수록 되돌리는 코드만 늘어나기 때문입니다.',
            ],
          },
          {
            title: '화면은 스토어만 본다',
            points: [
              '화면에서 데이터베이스 클라이언트를 직접 부르지 않고 상태 스토어를 거칩니다. 사용자에게 보일 한국어 문구도 스토어가 만들어 던집니다.',
              '구독 실패는 조용히 삼켜지면 왜 안 바뀌지로만 나타나므로, 구독 상태 콜백을 넣어 로그에 남게 했습니다.',
            ],
          },
        ],
      },
      {
        title: '알림 중복은 앱이 아니라 인덱스로 막는다',
        steps: [
          {
            title: '예외를 인덱스 조건에 적는다',
            points: [
              '새 후보 알림만은 후보를 담은 개수만큼 나가야 해서, 인덱스에 조건을 붙여 나머지 네 종류에만 중복 방지를 적용했습니다.',
              '알림 종류를 새로 만들 때 기존 종류를 재사용하면 뒤에 오는 알림이 조용히 삼켜집니다. 동점 안내를 확정 알림에 얹지 않고 별도 종류로 만든 이유입니다.',
            ],
          },
          {
            title: '약관과 같은 목록을 가리키게',
            points: [
              '이 목록은 이용약관에 이용자와의 약속으로 적혀 있어서, 종류를 늘리면 약관 조항도 같이 고쳐야 합니다. 스키마의 체크 제약과 약관 조항이 같은 목록을 가리키도록 두고 문서에 그 사실을 적어 두었습니다.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'claude-log',
    title: 'Claude Log - 토큰 사용량 트래커',
    org: '개인 프로젝트',
    period: '2026.04 — current',
    active: true,
    role: '기획 · UI/UX · 개발',
    type: 'Desktop / Side Project',
    scale: '1인 개발',
    summary:
      'Claude Code 토큰 사용량을 추적·관리하는 macOS 메뉴바 위젯 앱. rate limit 방지를 위해 기획부터 배포까지 1인 개발로 진행하고 GitHub에 오픈소스로 공개.',
    detail:
      'Claude Code를 rate limit에 걸려 사용하지 못하는 상황을 방지하고 토큰 사용량을 추적·확인·관리하기 위해 개발한 macOS 전용 메뉴바 위젯 앱입니다. 메뉴바에 현재 사용률(%)을 상주 표시하고, 클릭하면 사용량 그래프·통계 히트맵 등 상세 화면을 자동 갱신해 보여줍니다. 기획·UI/UX 설계·프론트엔드를 1인 개발로 진행했으며 GitHub에 오픈소스로 공개해 유지보수하고 있습니다.',
    highlights: [
      '매번 /usage나 웹으로 확인하던 사용량을 메뉴바에 %로 상주 표시하고, 클릭 시 그래프·히트맵 상세를 자동 갱신해 작업 흐름을 끊지 않도록 개선.',
      '처음 도입한 Electron으로 화면(렌더러)·데이터(메인)·연결(IPC) 3계층 구조를 설계하고, 미리 허용한 기능만 노출하는 안전한 연결 방식을 적용.',
      'Tray 앱 특성상 몰리기 쉬운 호출을 막기 위해 IPC 진입 쓰로틀(1초)·fetch 최소 간격(5초)·인플라이트 프로미스 싱글턴의 3겹 캐싱/중복 제거 로직을 계층적으로 설계.',
      'Claude Code 대화 로그(jsonl)를 바이트 오프셋 기반 증분 파싱으로 처리해, 파일이 커져도 새로 추가된 양에만 비례하는 일정한 갱신 속도와 데이터 정합성을 확보.',
      'React StrictMode 이중 실행·자동 마운트·주기적 인터벌 등 정상적인 중복 호출이 rate-limit 오류로 노출되던 문제를, 실패 시 캐시를 반환하는 일관된 fallback 정책으로 통일해 해결.',
      '구조·데이터 흐름 설계 시 Claude Code로 여러 대안을 빠르게 비교·검증하고, 코드 리뷰용 sub-agent를 직접 구성해 주기적 리뷰로 코드 품질을 관리.',
      'GitHub에 오픈소스로 공개하고 macOS 전용 설치 파일을 v1.0.8까지 배포, 지속적인 버전 업데이트로 고도화·유지보수 진행.',
    ],
    work: [
      {
        tag: 'PRODUCT',
        items: [
          '매번 /usage나 웹으로 확인하던 사용량을 메뉴바에 %로 상주 표시하고, 클릭 시 그래프·히트맵 상세를 자동 갱신해 작업 흐름을 끊지 않도록 개선.',
        ],
      },
      {
        tag: 'ARCHITECTURE',
        items: [
          '처음 도입한 Electron으로 화면(렌더러)·데이터(메인)·연결(IPC) 3계층 구조를 설계하고, 미리 허용한 기능만 노출하는 안전한 연결 방식을 적용.',
          'Tray 앱 특성상 몰리기 쉬운 호출을 막기 위해 IPC 진입 쓰로틀(1초)·fetch 최소 간격(5초)·인플라이트 프로미스 싱글턴의 3겹 캐싱/중복 제거 로직을 계층적으로 설계.',
        ],
      },
      {
        tag: 'PERFORMANCE',
        items: [
          'Claude Code 대화 로그(jsonl)를 바이트 오프셋 기반 증분 파싱으로 처리해, 파일이 커져도 새로 추가된 양에만 비례하는 일정한 갱신 속도와 데이터 정합성을 확보.',
          'React StrictMode 이중 실행·자동 마운트·주기적 인터벌 등 정상적인 중복 호출이 rate-limit 오류로 노출되던 문제를, 실패 시 캐시를 반환하는 일관된 fallback 정책으로 통일해 해결.',
        ],
      },
      {
        tag: 'OPERATION',
        items: [
          '구조·데이터 흐름 설계 시 Claude Code로 여러 대안을 빠르게 비교·검증하고, 코드 리뷰용 sub-agent를 직접 구성해 주기적 리뷰로 코드 품질을 관리.',
          'GitHub에 오픈소스로 공개하고 macOS 전용 설치 파일을 v1.0.8까지 배포, 지속적인 버전 업데이트로 고도화·유지보수 진행.',
        ],
      },
    ],
    resumeBullets: [
      '메뉴바 % 상주 표시로 토큰 사용량 실시간 확인 UX 개선',
      '3겹 캐싱·중복 제거로 Tray 앱 API 호출 과부하 방지',
      'jsonl 증분 파싱으로 대용량 로그도 O(추가분) 갱신 비용 유지',
    ],
    stack: [
      'Electron',
      'electron-vite',
      'electron-builder',
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Playwright',
      'GitHub Actions',
    ],
    resumeStack: ['Electron', 'React', 'TypeScript', 'Zustand', 'Playwright'],
    links: [
      { label: 'GitHub', href: 'https://github.com/seong5/claude-log' },
      {
        label: 'Release',
        href: 'https://github.com/seong5/claude-log/releases/tag/v1.0.8',
      },
    ],
    thumbnail: 'claude-log.jpg',
    image: '/projects/claude-log-1-card.webp',
    gallery: [
      { src: '/projects/claude-log-1.webp', w: 920, h: 1162 },
      { src: '/projects/claude-log-2.webp', w: 926, h: 996 },
      { src: '/projects/claude-log-3.webp', w: 1324, h: 64 },
    ],
    metrics: [
      { value: 'v1.0.8', label: '배포 버전 · 오픈소스 공개' },
      { value: '3겹', label: '계층적 호출 방어 로직', target: { kind: 'insight', index: 1 } },
      { value: 'O(추가분)', label: '증분 파싱 갱신 비용', target: { kind: 'trouble', index: 3 } },
      { value: '1인', label: '기획·UI/UX·개발 풀사이클' },
    ],
    insights: [
      {
        title: '다단계 캐싱과 인플라이트 중복 제거 로직 설계',
        intro:
          'Tray 앱은 상단에 아이콘이 계속 떠 있어 호출이 몰리기 쉬울 것이라 예측했습니다. 짧은 시간에 몰리는 호출을 막기 위해 다음과 같은 3겹의 방어 로직을 계층적으로 설계했습니다.',
        steps: [
          {
            title: 'IPC 진입 쓰로틀 (1초) — 마지막 결과가 있으면 즉시 캐시 반환',
            points: [
              '화면에서 사용량 요청이 들어오는 가장 바깥 영역에서, 1초 안에 다시 들어온 호출을 곧바로 처리하는 역할을 합니다.',
              '1초 이내의 중복 요청은 마지막 결과값이 존재하면 함수 호출 자체를 일으키지 않고, 캐싱한 값만 즉시 반환합니다.',
            ],
          },
          {
            title: 'Fetch 레벨 최소 간격 (5초) — min-interval 이내 재요청은 마지막 결과 반환',
            points: [
              '1번은 IPC 통로를 지키지만, fetch 함수를 호출하는 경로는 5분 타이머·Tray 제목 갱신 등 다른 방법도 존재합니다.',
              '그래서 마지막으로 실제 서버를 호출한 지 5초가 지나지 않았다면, 어떤 경로의 호출이든 캐싱된 값을 반환하도록 방어합니다.',
            ],
          },
          {
            title: '동시 호출 방어 — 인플라이트 프로미스 싱글턴으로 중복 제거',
            points: [
              '1·2번은 캐시가 존재할 때 동작합니다. 하지만 앱을 막 시작했거나 첫 호출이 진행되는 1~2초 사이에 화면에서 여러 호출이 발생하면, 캐시가 없어 1·2번을 통과해 서버 호출이 몰리게 됩니다.',
              '진행 중인 Promise를 싱글턴 변수에 담아두고, 그 사이 들어온 호출은 새로 시작하지 않고 같은 Promise를 반환합니다. 요청이 끝나면 finally에서 변수를 비워 다음 요청을 시작할 수 있도록 설계했습니다.',
              '시간 간격이 아닌 동시성을 방지해, 겹쳐진 여러 호출을 실제 단 1번의 호출로 합쳐 요청합니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: '과금 없이 실제 사용량 조회 — OAuth 토큰 소스 발굴',
        conclusion:
          '호출당 과금 없이 이미 발급된 로그인 토큰을 재사용해, /usage·Claude 앱·웹과 일치하는 실제 사용량을 상주 표시하게 됐습니다.',
        cause:
          'API 방식은 호출 건수당 과금되어 주기적으로 갱신하는 상주 위젯에는 운영 부담이 컸고, 5시간 윈도우로 직접 계산한 값도 실제 /usage 수치와 일치하지 않았습니다.',
        problem:
          '최초에는 가장 간편한 Anthropic API로 사용량을 가져오려 했지만, 호출 건수당 과금되는 방식이라 사용량을 주기적으로 갱신하는 상주 위젯에는 운영상 부담이 컸습니다.',
        actions: [
          '1차로 세션 첫 사용 시점부터 5시간 윈도우 총사용량을 계산하는 방식으로 전환했으나, 이 값도 실제 /usage·Claude 앱·웹과 일치하지 않았습니다.',
          '‘Claude Code 로그인 OAuth 토큰을 재사용하면 과금 없이 실제 사용량을 조회할 수 있지 않을까’라는 가설을 세우고 구글링·CLI 탐색으로 검증했습니다.',
          '토큰 저장 우선순위를 파악했습니다 — ① 환경변수(ANTHROPIC_OAUTH_ACCESS_TOKEN)·.env ② ~/.claude/.credentials.json의 claudeAiOauth.accessToken ③ macOS Keychain(security find-generic-password).',
          '이 순서로 확보한 토큰으로 실제 사용량 엔드포인트를 호출해 위젯 데이터를 가져오도록 구현했습니다.',
        ],
        lesson:
          '위젯 값이 /usage·Claude 앱·웹과 일치해, 사용자가 신뢰할 수 있는 수치를 상주 표시합니다.',
        image: {
          src: '/projects/claude-log-token-priority.webp',
          w: 1436,
          h: 1310,
        },
      },
      {
        title: '단일 동작에서 발생하는 사용량 조회 오류 메시지 해결',
        conclusion:
          '정상적인 단일 동작이 더 이상 오류로 노출되지 않고, 가드별로 다르던 실패 처리를 캐시 반환 하나의 fallback 정책으로 통일했습니다.',
        cause:
          '개발 모드 StrictMode의 useEffect 2회 실행, 마운트 시 자동 호출, 5분 인터벌, 포커스 복귀가 모두 같은 함수를 호출해, 캐시가 빈 타이밍에 두 번째 호출이 끼면 에러를 그대로 던졌습니다.',
        problem:
          '앱을 실행하거나 한 번만 새로고침해도 높은 확률로 사용량이 표시되지 않고 rate-limit 조회 오류가 노출됐습니다. 사용자 상호작용은 1회인데도 오류가 나는 상황이었습니다.',
        actions: [
          '메인 프로세스(src/main/index.ts)에 3단계 가드가 있었습니다 — IPC 진입의 OAUTH_IPC_MIN_INTERVAL_MS(1000), fetch 내부의 OAUTH_USAGE_MIN_INTERVAL_MS(5000), 동시 호출을 묶는 oauthUsageInflight 프로미스.',
          '개발 모드 React.StrictMode로 useEffect가 2번 실행되고, App.tsx 마운트 시 fetchOAuthUsage() 자동 호출·5분 인터벌·포커스 복귀가 모두 같은 함수를 호출했습니다.',
          '첫 호출 실패나 캐시가 빈 타이밍에 두 번째 호출이 끼면, 단순히 에러를 던져 useOAuthUsage 훅에서 화면 오류로 그대로 노출됐습니다.',
          '가드의 목적(과도한 호출 차단)은 유지하되, 실패 시 마지막 캐시를 반환하는 fallback으로 세 가드의 실패 처리를 통일했습니다.',
        ],
        lesson:
          '과도한 호출을 막는 가드의 목적은 유지하되, StrictMode 이중 실행·자동 마운트·인터벌·포커스 복귀 같은 정상 중복 호출은 조용히 처리되어야 합니다.',
        image: {
          src: '/projects/claude-log-defense-pipeline.webp',
          w: 1920,
          h: 836,
        },
      },
      {
        title: '증분 파싱(Incremental Parsing)으로 갱신 비용 일정화',
        conclusion:
          '파일이 커져도 갱신 비용이 추가분에만 비례해, O(전체 파일)을 O(추가된 양)으로 바꿨습니다.',
        cause:
          'Claude Code는 대화를 ~/.claude/projects/**/*.jsonl에 계속 이어붙이는데, 갱신마다 파일 전체를 다시 파싱하면 파일이 커질수록 느려지는 구조였습니다.',
        problem:
          'Claude Code는 대화를 ~/.claude/projects/**/*.jsonl에 계속 이어붙입니다. 갱신마다 파일 전체를 다시 파싱하면 파일이 커질수록 느려지는 구조였습니다.',
        actions: [
          '파일별 상태를 Map에 { offset, watcher }로 보관하고, 변경 이벤트가 오면 저장된 offset부터 읽습니다.',
          '한 줄이 다 쓰이기 전에 이벤트가 올 수 있어, 마지막 조각은 항상 건너뛰고 offset도 완성된 줄까지만 전진시켜 끝줄을 다음번에 온전히 다시 읽습니다.',
          'offset은 실제 UTF-8 바이트 길이에 줄바꿈(\\n) 1바이트를 더해 전진시킵니다. 글자 수가 아닌 바이트 단위라 위치가 어긋나거나 유실·중복 집계가 없습니다.',
        ],
        lesson:
          '쓰는 도중 깨진 줄을 읽는 사고를 막아 데이터 정합성을 보장합니다. 누적되는 로그를 다루는 모든 곳에 같은 패턴을 쓸 수 있습니다.',
        image: {
          src: '/projects/claude-log-incremental-parsing.webp',
          w: 1920,
          h: 1251,
        },
      },
    ],
  },
  {
    slug: 'umust-erp',
    title: 'UMUST R&D ERP - 재고·CRO 통합 관리',
    org: 'UMUST R&D · 사업부 IT팀 · 프론트엔드 인턴',
    period: '2026.04.28 — 2026.06.30',
    role: 'Frontend',
    type: '사내 ERP',
    scale: '3인 개발 (FE 1 · BE 1 · 인프라 1)',
    summary:
      '재고·자원관리에 더해 CRO(임상시험 수탁) 절차 추적까지 통합한 사내 ERP. ERD 설계부터 FE 구현·배포까지 풀사이클로 진행.',
    detail:
      'UMUST R&D의 사내 조직용 재고·판매 관리 ERP 서비스입니다. 재고 및 자원관리뿐 아니라 CRO 서비스(임상시험 수탁기관) 절차의 전체적인 내용 추적 및 프로세스 관리의 필요에 따라 기획되었습니다. FE 1명·BE/인프라 1명 총 2인으로 기획부터 배포까지 진행했습니다.',
    highlights: [
      '서비스 전반의 ERD를 설계하고 DB·스키마 데이터 모델링부터 FE 전반 구현·배포까지 풀사이클을 직접 주도.',
      '재고관리와 CRO(연구용역) 두 도메인을 하나의 서비스로 통합해 전체 데이터 서비스 흐름을 구축.',
      'Zod 스키마로 폼·API 응답을 런타임 검증해 TypeScript 컴파일 단계의 한계를 보완.',
      '상태 전이·뮤테이션 등 핵심 비즈니스 로직에 단위 테스트를 우선 작성하고 MSW API Mocking 환경을 구축해 코드 퀄리티와 이후 API 작업의 안정성을 확보.',
    ],
    work: [
      {
        tag: 'DESIGN',
        items: [
          '서비스 전반의 ERD를 설계하고 DB·스키마 데이터 모델링부터 FE 전반 구현·배포까지 풀사이클을 직접 주도.',
          '재고관리와 CRO(연구용역) 두 도메인을 하나의 서비스로 통합해 전체 데이터 서비스 흐름을 구축.',
        ],
      },
      {
        tag: 'QUALITY',
        items: [
          'Zod 스키마로 폼·API 응답을 런타임 검증해 TypeScript 컴파일 단계의 한계를 보완.',
          '상태 전이·뮤테이션 등 핵심 비즈니스 로직에 단위 테스트를 우선 작성하고 MSW API Mocking 환경을 구축해 코드 퀄리티와 이후 API 작업의 안정성을 확보.',
        ],
      },
    ],
    resumeBullets: [
      'ERD 설계부터 FE 구현·배포까지 풀사이클 주도',
      '재고·CRO 두 도메인 통합 ERP 서비스 구축',
      'Zod 런타임 검증·MSW Mock으로 API 연동 안정성 확보',
    ],
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Tanstack Query',
      'React Hook Form',
      'Zod',
      'Axios',
      'MSW',
      'Testing Library',
      'GitHub Actions',
    ],
    resumeStack: ['React', 'TypeScript', 'Tanstack Query', 'Zod', 'MSW'],
    links: [],
    thumbnail: 'umust-erp.jpg',
    image: '/projects/umust-erp.webp',
    gallery: [{ src: '/projects/umust-erp.webp', w: 1280, h: 647 }],
    metrics: [
      {
        value: '404 해소',
        label: '배포 환경 CRO API 전면 실패 → 완전 해결',
        target: { kind: 'trouble', index: 1 },
      },
      { value: '0회', label: 'status 탭 전환 시 네트워크 요청', target: { kind: 'insight', index: 1 } },
      { value: '1곳 수렴', label: 'croApiPath()로 경로 생성 통합', target: { kind: 'trouble', index: 1 } },
      { value: '풀사이클', label: 'ERD 설계 → FE 구현 → 배포' },
    ],
    insights: [
      {
        title: '쿼리키는 화면 상태가 아니라 서버 응답의 정체성으로 설계한다',
        intro:
          'CRO 목록 화면의 필터에는 성격이 다른 두 종류가 섞여 있었습니다. 처음엔 모든 필터를 queryKey에 넣었더니, 상태 탭만 눌러도 키가 바뀌어 캐시 미스가 나고 동일한 데이터를 매번 다시 요청했습니다. 키에는 서버 응답을 가르는 값만 넣고 나머지는 select에서 후처리하도록 분리했습니다.',
        steps: [
          {
            title: '서버사이드 필터 — queryKey에 포함',
            points: [
              'search처럼 값이 바뀌면 서버 응답 자체가 달라지는 필터(거래처는 orgName, 의뢰는 testItem 파라미터로 전송)는 queryKey에 포함합니다.',
              '값이 바뀌면 실제로 서버를 다시 호출해 다른 응답을 받아옵니다.',
            ],
          },
          {
            title: '클라이언트사이드 필터 — select에서 후처리',
            points: [
              'clientId·status·priority·orgType처럼 서버가 모르는, 이미 받아온 같은 응답을 거르기만 하면 되는 값은 queryKey에서 제외합니다.',
              'select는 서버 캐시를 건드리지 않고 파생 결과만 만들어, status 탭을 아무리 눌러도 네트워크는 0회·메모리에서 filter()만 다시 돕니다.',
              'keepPreviousData를 더해 search가 바뀌어 재요청이 나가는 동안에도 이전 목록이 유지돼 깜빡임이 없습니다.',
            ],
          },
          {
            title: '기준을 코드 주석에 박제',
            points: [
              '"클라이언트 필터는 queryKey에 넣지 않는다"를 주석으로 남겨 거래처·의뢰·프로젝트 훅 전반에서 같은 실수가 반복되지 않게 했습니다.',
              "핵심 교훈: 쿼리 키 설계의 질문은 '이 값이 바뀌면 화면이 달라지나?'가 아니라 '이 값이 바뀌면 서버가 다른 응답을 주나?'다. 이 기준을 잡고 나서 중복 패치가 구조적으로 사라졌습니다.",
            ],
          },
        ],
        image: { src: '/projects/umust-erp-querykey.svg', w: 680, h: 468 },
      },
      {
        title: '단건 조회는 목록 캐시에서 파싱하되 상황에 맞는 전략을 세운다',
        intro:
          '상세 화면 진입 시 단건 API(GET /{id}) 존재 여부에 따라 캐시 전략을 다르게 가져갔습니다.',
        steps: [
          {
            title: '전략 A · initialData — 단건 API가 있을 때',
            points: [
              '목록 캐시로 첫 페인트를 시드해 즉시 화면을 그립니다.',
              'queryFn은 유지해 백그라운드에서 최신 단건으로 갱신 — 신선도를 우선합니다.',
            ],
          },
          {
            title: '전략 B · 키 공유 — 단건 API가 없을 때',
            points: [
              'select로 목록에서 하나만 선택해 목록과 같은 캐시를 공유합니다.',
              '네트워크 0회로 요청을 절약하면서 목록과의 정합성을 유지합니다.',
            ],
          },
        ],
        image: { src: '/projects/umust-erp-single-query.svg', w: 680, h: 474 },
      },
      {
        title: '뮤테이션은 트리거와 무효화 범위가 항상 함께 가야 한다',
        intro:
          '서버 상태를 바꾸는 액션은 관련 캐시를 함께 무효화하지 않으면 화면이 어긋납니다. 의뢰 → 프로젝트 전환 한 번이 의뢰 상세·의뢰 목록·프로젝트 목록 세 군데에 영향을 줍니다.',
        steps: [
          {
            title: '무효화 범위를 키 집합으로 추적',
            points: [
              "'방금 만든 프로젝트가 목록에 안 보인다' 같은 버그는 대부분 무효화 범위 누락입니다.",
              "query-keys 팩토리에서 lists() / detail(id)를 계층적으로 설계해, 무효화 범위를 '이 액션이 건드리는 키 집합'으로 명시적으로 추적할 수 있게 했습니다.",
              'onSuccess에서 전환 1회로 더럽혀진 캐시 3곳(의뢰 상세 detail(inquiryId)·의뢰 목록 lists()·프로젝트 목록)을 함께 무효화합니다.',
            ],
          },
        ],
        image: { src: '/projects/umust-erp-invalidation.svg', w: 680, h: 434 },
      },
      {
        title: '에러 메시지를 한곳에서 정리한다',
        intro:
          '에러 메시지를 컴포넌트마다 처리하면 톤이 제각각이 되고 서버의 "Internal Server Error" 같은 영문이 그대로 사용자에게 노출됩니다. 추출 우선순위를 getErrorMessage 한 곳에 정의했습니다.',
        steps: [
          {
            title: '추출 우선순위 4단계',
            points: [
              '1. 백엔드 본문(message·error·detail) — 의미 있는 본문은 살리고 무의미·영문 일반 메시지는 건너뜁니다.',
              "2. HTTP 상태별 안내 — 400·404·409·500을 한국어로 치환(예: 409 → '다른 데이터와 연결되어 있어 삭제할 수 없습니다').",
              '3. 네트워크/타임아웃 — ECONNABORTED·no response 케이스 처리.',
              '4. fallback — 호출부가 넘긴 기본 메시지.',
            ],
          },
          {
            title: '배운 점',
            points: [
              '서버가 준 메시지가 곧 사용자 메시지가 아닙니다. 의미 있는 본문은 살리고 일반·영문 메시지는 한국어 안내로 치환하는 분기가 UX를 좌우했습니다.',
              '상태 코드별 안내를 중앙화해, 새 뮤테이션은 fallback 한 줄만 넘기면 일관된 에러 UX를 얻을 수 있었습니다.',
            ],
          },
        ],
        image: { src: '/projects/umust-erp-error.svg', w: 680, h: 394 },
      },
    ],
    troubleshooting: [
      {
        title: '배포 환경에서 발생한 CRO API 404 에러',
        conclusion:
          '배포 404가 완전히 해소되고, 공개 경로·내부 경로·프론트 호출부의 책임이 분리돼 같은 유형의 라우팅 버그 재발 표면이 사라졌습니다.',
        cause:
          '게이트웨이의 병합된 Nginx 설정에 /api/ location이 재고용만 잡혀 있어 CRO 요청이 재고 API로 조용히 폴백되고 있었고, 로컬은 Vite dev 프록시가 이 차이를 가렸습니다.',
        problem:
          '로컬에서는 정상이던 서비스가 배포 환경에서 CRO 도메인의 모든 API가 404로 실패했습니다. 재고·거래 API는 정상이고 CRO만 실패해, 도메인 단위 라우팅 문제로 판단했습니다.',
        actions: [
          '운영 서버에 SSH로 접속해 docker ps로 컨테이너·포트 매핑을 확인하고, 재고와 CRO 백엔드가 별도 컨테이너로 분리돼 있음을 파악했습니다.',
          '게이트웨이의 병합된 Nginx 설정을 덤프해보니 /api/ location이 재고용만 잡혀 있고 CRO 라우팅이 없어 CRO 요청이 재고 API로 폴백되고 있었습니다. (로컬은 Vite dev 프록시가 이 차이를 가렸습니다.)',
          'CRO 공개 경로를 재고와 네임스페이스가 겹치지 않게 분리하고, 수십 곳에 하드코딩된 경로를 croApiPath() 헬퍼로 교체했습니다.',
          '게이트웨이가 공개 경로(/cro-api)를 CRO 실제 경로(/api/cro)로 rewrite하도록 수정하고, Vite dev 프록시·CI 빌드 env를 추가해 로컬·배포가 같은 접두사 규칙을 공유하게 했습니다.',
        ],
        lesson:
          '추측 대신 SSH·docker ps·nginx -T로 운영 라우팅을 직접 검증한 것이 결정적이었고, 공개 API 네임스페이스를 서비스별로 분리하지 않으면 게이트웨이 prefix 매칭에서 다른 서비스로 조용히 폴백된다는 점을 확인했습니다.',
        compare: [
          {
            label: 'BEFORE — 재고 API로 폴백',
            src: '/projects/umust-erp-404-broken.svg',
            w: 680,
            h: 368,
          },
          {
            label: 'AFTER — 분리된 라우팅',
            src: '/projects/umust-erp-404-fixed.svg',
            w: 680,
            h: 360,
          },
        ],
      },
      {
        title: 'dev 환경에서 CRO 화면만 데이터가 안 뜨는 문제 (502 → CORS)',
        conclusion:
          '최종 원인은 CRO 서버 CORS 허용 origin에 dev origin이 빠진 것이었고, allowedOriginPatterns로 교체해 내부망 IP는 와일드카드로·dev 포트는 고정했습니다.',
        cause:
          'Swagger의 200은 CRO 서버가 서빙하는 same-origin이라 검사를 건너뛴 것이고 앱은 cross-origin이라 검사 대상이었습니다. WebMvcConfig의 허용 origin에 배포 포트만 있고 dev origin(:5173)이 빠져 있었습니다.',
        problem:
          '재고 화면은 정상인데 CRO 화면만 데이터가 안 떴습니다. CRO API를 Swagger에서 직접 호출하면 200이었고, 증상도 Vite 프록시 경유는 502·브라우저 직접 호출은 CORS로 바뀌어 서버·네트워크·CORS 문제가 뒤섞여 보였습니다.',
        actions: [
          'Vite 프록시 경유 CRO 요청은 전부 502였습니다. curl로 확인하니 이 dev 머신에서는 node·curl이 API 호스트에 연결 거부당했고 브라우저는 두 API 모두 도달(Swagger 200) → 서버 다운이 아니라 node(프록시) 경로만 막힌 환경 차이로 좁혔습니다.',
          'CRO를 브라우저 직접 호출(.env.local에 베이스 URL 지정)로 바꾸자 502가 CORS 에러로 바뀌었습니다. 브라우저는 CRO 서버에 도달했으나 응답에 CORS 헤더가 없어 차단 → 남은 문제는 CORS임을 확정했습니다.',
          'Swagger 200 ≠ CORS 정상임을 규명했습니다. Swagger는 CRO 서버가 서빙하는 same-origin이라 검사를 건너뛴 것이고, 앱은 dev origin→CRO 서버 cross-origin이라 검사 대상이었습니다. 메인 API는 CORS 헤더가 있어 정상, CRO만 없어 막혔습니다.',
          '백엔드가 CORS를 추가한 뒤에도 실패가 이어지자, 프론트 담당이지만 백엔드 레포를 직접 분석했습니다. WebMvcConfig의 addMapping 허용 origin에 배포 포트만 있고 dev origin(:5173)이 빠진 것을 찾아냈고, Allow-Origin은 scheme·host·port가 정확히 일치해야 하므로 이 불일치가 최종 원인이었습니다.',
          '프론트는 vite.config를 건드리지 않고 .env.local(gitignore)로만 직접 호출을 설정해 다른 머신·CI의 표준 상태를 유지했습니다.',
        ],
        lesson:
          '특정 도메인만 실패하면 서버별 CORS 차이를 먼저 의심하고, same-origin 도구(Swagger)의 성공은 로직이 정상이라는 증거일 뿐 CORS가 된다는 증거가 아니며, 502 ↔ CORS 전환으로 네트워크 계층과 브라우저 정책 계층을 분리 진단할 수 있습니다.',
      },
    ],
  },
  {
    slug: 'dobong-admin',
    title: '도봉라이프 어드민 - 운영 관리 콘솔',
    org: 'UMUST R&D · 사업부 IT팀 · 프론트엔드 인턴',
    period: '2026.03.23 — 2026.04.28',
    role: 'Frontend',
    type: 'Admin Console',
    scale: '3인 개발 (FE 2 · BE/인프라 1)',
    summary:
      '도봉구 로컬 플랫폼 도봉라이프의 웹 백오피스. 관리자·사업자 ROLE 분기와 운영 도메인 전반의 관리 화면을 구축.',
    detail:
      '서울 도봉구 기반 로컬 플랫폼 도봉라이프 애플리케이션의 웹 백오피스입니다. 앱의 데이터 관리·통계 필요에 따라 기획되었고, 관리자·사업자 두 ROLE로 분기처리해 각각 앱 전체와 사업장 단위 관리가 가능합니다. 활동 통계 대시보드와 사용자·승인·프로모션·코스·장소·리뷰·알림·문의 등 운영 도메인 전반을 관리하는 화면을 구축했습니다.',
    highlights: [
      'Next.js proxy.ts(구 middleware) 단일 진입점에서 JWT의 role을 읽어 /admin·/business 접근을 서버 단계에서 분기·차단하는 RBAC 가드를 구현하고, 페이지마다 흩어지던 권한 체크를 제거.',
      '코스·사업장·프로모션 등록 폼을 수동 useState에서 React Hook Form + Zod 단일 스키마 검증으로 마이그레이션하고, 다단계 위저드는 스텝별 부분 검증으로 UX와 성능을 동시에 개선.',
      '책임이 과중하던 위저드 컴포넌트를 순수 함수·상태 오케스트레이션 훅·표현 계층 3계층으로 분리해 테스트 용이성과 재사용성을 확보.',
      'next.config rewrites로 CORS를 우회하고 serverApi/clientApi를 이원화해 실행 환경별 토큰 주입을 일원화.',
      'Playwright E2E(3개 브라우저)와 Postman Mock Server를 도입해 인증·폼 검증 플로우와 에러 시나리오를 API 완성 전에 선행 검증하고 개발 공수를 단축.',
    ],
    work: [
      {
        tag: 'AUTH',
        items: [
          'Next.js proxy.ts(구 middleware) 단일 진입점에서 JWT의 role을 읽어 /admin·/business 접근을 서버 단계에서 분기·차단하는 RBAC 가드를 구현하고, 페이지마다 흩어지던 권한 체크를 제거.',
          'next.config rewrites로 CORS를 우회하고 serverApi/clientApi를 이원화해 실행 환경별 토큰 주입을 일원화.',
        ],
      },
      {
        tag: 'FORM',
        items: [
          '코스·사업장·프로모션 등록 폼을 수동 useState에서 React Hook Form + Zod 단일 스키마 검증으로 마이그레이션하고, 다단계 위저드는 스텝별 부분 검증으로 UX와 성능을 동시에 개선.',
          '책임이 과중하던 위저드 컴포넌트를 순수 함수·상태 오케스트레이션 훅·표현 계층 3계층으로 분리해 테스트 용이성과 재사용성을 확보.',
        ],
      },
      {
        tag: 'QUALITY',
        items: [
          'Playwright E2E(3개 브라우저)와 Postman Mock Server를 도입해 인증·폼 검증 플로우와 에러 시나리오를 API 완성 전에 선행 검증하고 개발 공수를 단축.',
        ],
      },
    ],
    resumeBullets: [
      'middleware RBAC 가드로 /admin·/business 권한 분기·차단',
      'RHF + Zod 다단계 위저드로 폼 검증 UX·성능 개선',
      'Playwright E2E·Mock Server로 API 완성 전 선행 검증',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Tanstack Query',
      'React Hook Form',
      'Zod',
      'Axios',
      'Playwright',
      'Recharts',
      'GitHub Actions',
    ],
    resumeStack: ['Next.js', 'TypeScript', 'Tanstack Query', 'Zod', 'Recharts'],
    links: [],
    thumbnail: 'dobong-admin.jpg',
    image: '/projects/dobong-admin.webp',
    gallery: [{ src: '/projects/dobong-admin.webp', w: 1280, h: 600 }],
    metrics: [
      { value: '백엔드 변경 0', label: '프록시 + 인터셉터로 CORS 해소', target: { kind: 'trouble', index: 1 } },
      { value: '100 → 20', label: '리뷰 수집 스캔 상한 축소', target: { kind: 'trouble', index: 2 } },
      { value: '3계층', label: '위저드를 순수함수·훅·표현 계층으로 분리' },
      { value: '3 브라우저', label: 'Playwright E2E 선행 검증' },
    ],
    insights: [
      {
        title: 'RBAC 라우팅 가드를 미들웨어 한 곳으로 통합',
        intro:
          'Next.js의 proxy.ts(구 middleware) 단일 진입점에서 JWT의 role을 읽어 /admin·/business 경로 접근을 서버 단계에서 분기·차단했습니다. 권한 없는 사용자가 잘못된 영역에 진입하면 컴포넌트 렌더 이전에 자기 역할의 홈으로 리다이렉트되도록 해, 페이지마다 흩어지던 권한 체크를 제거했습니다.',
        steps: [
          {
            title: '단일 진입점에서 role을 추출해 경로와 매핑',
            points: [
              '모든 페이지 요청이 proxy.ts를 거치며, JWT에서 추출한 role과 요청 경로의 매핑으로 접근 권한을 판정합니다.',
            ],
          },
          {
            title: '권한 결과에 따라 서버 단계에서 분기',
            points: [
              '권한이 없으면 컴포넌트 렌더 이전에 서버에서 자기 역할의 홈으로 리다이렉트하고, 권한이 있으면 요청을 통과시킵니다.',
              '공개 경로는 인가 체크 없이 바로 통과시켜, 페이지마다 흩어지던 권한 체크를 한 곳으로 모았습니다.',
            ],
          },
        ],
        image: { src: '/projects/dobong-admin-rbac.svg', w: 680, h: 500 },
      },
      {
        title: '인증 토큰의 생애주기 — 디코드는 한 번, 전파는 콜백 체인으로',
        intro:
          '로그인 성공 시 단순히 토큰을 저장하는 게 아니라, 세션의 신뢰 경계를 명확히 나눈 파이프라인(authorize → jwt → session → serverApi/clientApi)으로 동작하게 설계했습니다.',
        steps: [
          {
            title: 'authorize — 입력·응답을 검증하고 토큰을 1회만 디코드',
            points: [
              'loginRequestSchema.safeParse로 입력을 먼저 검증한 뒤 백엔드를 호출하고, 응답을 loginResponseSchema로 재검증합니다.',
              'jwtDecode<AccessTokenPayload>로 access token에서 role·userId·exp·provider를 클라이언트에서 단 1회만 추출하고, 이후에는 디코드를 반복하지 않고 결과만 토큰에 실어 전파합니다.',
            ],
          },
          {
            title: 'signIn — 인증과 인가를 분리',
            points: [
              '디코드된 role이 ROLE_MEMBER(일반 앱 사용자)이면 어드민 진입 자체를 차단해, 인증(authentication)과 인가(authorization)를 분리했습니다.',
            ],
          },
          {
            title: 'jwt / session — 필요한 필드만 좁혀 전파',
            points: [
              'user → token → session.user로 필요한 필드만 좁혀 전파하고, serverApi는 auth() 호출만으로 세션의 access token을 백엔드에 자동 주입합니다.',
              "설계 포인트: 토큰 디코딩 위치를 authorize 한 곳으로 고정해, 이후 미들웨어·API 등 모든 판단 지점이 '이미 검증된 클레임'만 소비하도록 했습니다.",
            ],
          },
        ],
      },
      {
        title: '백엔드 응답은 신뢰하지 않는다 — 경계에서 Zod로 방어적 파싱',
        intro:
          '프론트가 죽는 흔한 원인은 응답 값이 없는 게 아니라 타입이 기대와 다른데 그대로 렌더링하는 것입니다. API 응답을 받는 경계에서 Zod로 한 번 거르는 계층(api-schemas)을 만들었습니다.',
        steps: [
          {
            title: '원시 응답을 안전한 타입으로 변환',
            points: [
              'zApiString은 z.unknown().transform으로 null·undefined를 빈 문자열로 정규화합니다.',
              'zFilteredStringArray는 비배열·비문자열 요소를 걸러내 string[]을 보장합니다.',
            ],
          },
          {
            title: 'success/data 봉투를 검증하고 실패를 흡수',
            points: [
              'parseApiSuccessJson은 success:false거나 data가 없으면 메시지를 담아 throw해, TanStack Query의 error 상태로 자연스럽게 흡수되게 합니다.',
              '파싱 실패 시 formatZodError로 어느 필드가 깨졌는지 로깅합니다.',
            ],
          },
          {
            title: '배운 점',
            points: [
              '타입스크립트의 타입은 컴파일 단계의 약속일 뿐 런타임을 보장하지 않습니다. 외부 입력(API 응답)은 런타임 검증으로 신뢰 경계를 그어야 한다는 것을 구조로 체득했습니다.',
            ],
          },
        ],
      },
      {
        title: '다단계 위저드의 파생 상태 계산 — useMemo 의존성 사슬',
        intro:
          '프로모션 등록 위저드는 원본 상태를 최소화하고 나머지를 전부 파생(derived) 값으로 계산했습니다. fields → parsedFields → canSubmit/previewData, imageFiles + presetCover → effectiveImageCount → canGoNext/isDirty로 이어지는 의존성 사슬입니다.',
        steps: [
          {
            title: '업로드 상한을 동적으로 조정',
            points: [
              'effectiveImageCount는 사용자 업로드 수 + 프리셋 커버 유무로 계산해, 프리셋 커버가 있으면 사용자 업로드 상한을 5 → 4로 동적 조정(maxUserImageFiles)합니다.',
            ],
          },
          {
            title: 'isDirty를 별도 플래그가 아닌 계산값으로',
            points: [
              "isDirty(변경 여부)를 별도 플래그가 아니라 현재 입력으로부터 매번 계산해, '초기화 후 dirty 플래그 리셋을 깜빡하는' 종류의 버그가 구조적으로 불가능하게 했습니다.",
              'canGoNext는 현재 step과 파생값을 함께 받아 스텝별 통과 조건을 한 함수에서 결정합니다.',
            ],
          },
        ],
      },
      {
        title: '커서 기반 페이지네이션 병합 — 무한 루프 방지가 포함된 순차 수집',
        intro:
          'fetchAdminPlaceReviewsMerged는 백엔드의 커서(lastId) 페이지를 클라이언트에서 순차 병합합니다. lastId가 없으면 page1부터 시작해 hasNext가 false이거나 스캔 상한에 도달할 때까지 이어 받습니다.',
        steps: [
          {
            title: '이중 종료 조건으로 안전장치 마련',
            points: [
              'hasNext && pages < 상한 이중 조건으로 루프를 돌려, 백엔드가 hasNext를 잘못 내려도 상한에서 강제 차단되도록 했습니다.',
            ],
          },
          {
            title: '수집 결과 캐싱과 정밀 무효화',
            points: [
              '수집 결과는 staleTime 5분으로 캐싱하고, 리뷰 삭제 뮤테이션 성공 시 해당 placeId 쿼리만 invalidateQueries로 정밀 무효화합니다.',
            ],
          },
        ],
      },
      {
        title: 'Blob URL 생명주기를 렌더가 아닌 커밋 단계에 묶기',
        intro:
          '이미지 미리보기에서 URL.createObjectURL을 명시적으로 revoke하지 않으면 메모리 누수가 발생합니다. 그래서 생성과 cleanup을 useLayoutEffect 한 곳에서 처리했습니다.',
        steps: [
          {
            title: '생성·해제를 같은 클로저에 가둔다',
            points: [
              'useLayoutEffect에서 files.map(URL.createObjectURL)로 생성하고, 클린업에서 같은 배열을 forEach(URL.revokeObjectURL)로 해제해 1:1 대응을 보장합니다.',
              'useMemo로 URL을 만들면 캐시 폐기 시점과 revoke 시점이 어긋나고 Strict Mode 이중 실행에서 URL이 꼬입니다. 생성·해제 배열을 같은 클로저에 가둔 것이 핵심 의도입니다.',
            ],
          },
        ],
      },
      {
        title: "'성공' 응답까지 의심하는 에러 변환 계층",
        intro:
          'axios 레벨에서 validateStatus: () => true로 모든 상태 코드를 일단 통과시킨 뒤 직접 분기했습니다. 기본 throw에 의존하지 않고 비정상 응답까지 일관되게 정규화하기 위함입니다.',
        steps: [
          {
            title: '비정상 응답을 정규화하고 도메인 에러로 변환',
            points: [
              '비-JSON 본문·문자열 JSON 같은 비정상 케이스를 parseSuccessJson / throwIfNotOkAxios에서 일관되게 정규화합니다.',
              '401은 별도 메시지로 분기하고, 도메인 계층(ApiHttpError·mapReviewError)에서 도메인 에러로 변환해 화면에 전달합니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: '브라우저 → 백엔드 직접 호출 시 CORS 차단',
        conclusion:
          'CORS 에러가 백엔드 변경 0으로 제거되고, 서버·클라이언트의 호출 경로와 토큰 주입 책임이 명확히 분리됐습니다.',
        cause:
          '클라이언트 컴포넌트가 브라우저에서 백엔드로 직접(cross-origin) 요청해 CORS 정책에 걸렸습니다. 백엔드 설정 수정은 협업·배포 비용이 커 프론트에서 풀어야 했습니다.',
        problem:
          '클라이언트 컴포넌트에서 axios로 백엔드 API를 직접 호출하자 브라우저가 CORS 정책으로 요청을 차단했습니다. 백엔드 CORS 설정 수정은 협업·배포 비용이 커, 프론트에서 우회할 전략이 필요했습니다.',
        actions: [
          'next.config의 rewrites로 /backend/{path}를 NEXT_PUBLIC_API_URL로 프록시하고, clientApi의 baseURL을 /backend로 지정해 브라우저가 자신과 같은 출처로 요청을 보내도록 했습니다.',
          '토큰 주입은 axios 요청 인터셉터에서 getSession()으로 세션 토큰을 꺼내 Authorization 헤더에 붙여 일원화했습니다.',
          '서버 컴포넌트는 auth() 기반 serverApi로 백엔드에 직접 호출하도록 분리해, 실행 환경별 호출 경로를 명확히 나눴습니다.',
        ],
        lesson:
          '서버는 auth() 기반 serverApi, 클라이언트는 프록시 + 인터셉터 기반 clientApi로 실행 환경별 호출 경로와 토큰 주입 책임을 분리하면, 백엔드를 건드리지 않고도 CORS를 구조적으로 회피할 수 있습니다.',
        image: { src: '/projects/dobong-admin-cors.svg', w: 680, h: 510 },
      },
      {
        title: '리뷰 전체 병합 시 순차 HTTP 요청 폭증으로 인한 로딩 지연',
        conclusion:
          '수집 지연을 상한으로 제한해 체감 비용을 제거하고, 재진입 시 불필요한 재요청도 캐싱으로 막았습니다.',
        cause:
          '커서(lastId) 페이지네이션은 다음 커서를 받아야 다음 요청을 보낼 수 있어 본질적으로 순차인데, 페이지 상한을 100으로 둬 최악의 경우 요청이 100번 누적됐습니다.',
        problem:
          '관리자 상세 화면에서 장소·코스 리뷰를 커서(lastId) 기반으로 끝까지 긁어오는데, 페이지 상한을 100으로 두니 순차(while) 요청이 누적돼 체감 로딩이 느렸습니다.',
        actions: [
          '커서 페이지네이션은 다음 lastId가 있어야 다음 요청을 보낼 수 있어 본질적으로 순차입니다. 그래서 스캔 상한을 100 → 20으로 낮춰 최악의 지연을 제한했습니다.',
          'TanStack Query에 staleTime 5분을 두어 재진입 시 재요청을 막았습니다.',
          "코드 주석으로 '추후 서버 페이지네이션으로 전환'이라는 후속 과제를 명시해, 임시 방어와 근본 개선 경로를 분리했습니다.",
        ],
        lesson:
          '당장의 UX(상한·캐싱)와 구조 개선(서버 페이지네이션 도입)을 분리해 우선순위를 잡은 사례입니다. 임시 방어를 넣을 때는 근본 개선 경로를 코드에 함께 남겨야 합니다.',
      },
      {
        title: '다단계 폼 — 마지막 스텝에서야 에러가 터지는 검증 UX',
        conclusion:
          '각 단계에서 즉시 피드백을 받아, 잘못된 입력으로 다음 스텝에 진입하는 일이 사라졌습니다.',
        cause:
          '전체 스키마를 제출 시점에 한 번에 검증하니 1스텝의 오류가 마지막 단계에서야 드러났고, 반대로 항상 전체를 검증하면 아직 채우지 않은 필드 때문에 다음 스텝 진행이 막혔습니다.',
        problem:
          '코스 등록이 다단계 위저드인데, 전체 스키마를 제출 시점에 한 번에 검증하니 사용자가 1스텝에서 잘못 입력해도 마지막 단계에 가서야 에러를 확인했습니다. 반대로 전체 필드를 항상 검증하면 다음 스텝 진행이 불필요하게 막혔습니다.',
        actions: [
          "RHF + zodResolver(mode: 'onBlur') 기반에서 handleNext가 trigger(['title','durationStr','level'])처럼 해당 스텝 필드만 부분 검증하도록 구성했습니다.",
          '이미지처럼 스키마 밖 조건은 stepValidationError 상태로 별도 처리했습니다.',
          "동적 항목(하이라이트)은 useFieldArray로 관리하면서 '항목 제목 5개 이상' 같은 규칙은 Zod superRefine으로 교차 검증했습니다.",
        ],
        lesson:
          '제출 시점엔 전체 스키마가 한 번 더 보장되고, 검증 규칙이 Zod 스키마 한 곳에 모여 유지보수성이 높아졌습니다.',
      },
    ],
  },
  {
    slug: 'deckly',
    title: 'Deckly - SI 사업제안서 자동화 플랫폼',
    org: '똑똑한개발자 · TF팀 · 프론트엔드 인턴',
    period: '2025.12.17 — 2026.01.16',
    role: 'Frontend Intern',
    type: 'B2B SaaS',
    scale: '1인 개발 · 풀사이클',
    summary:
      'AI로 미팅 회의록을 분석해 사업제안서 생성을 자동화하는 자사·B2B SaaS. 응답 데이터 최적화와 네트워크 요청 절감으로 성능 개선에 기여.',
    detail:
      'AI 기반으로 미팅 회의록 데이터를 분석하여 사업제안서 생성을 자동화하는 자사 및 B2B SaaS 서비스입니다. 수기 작성으로 인한 리소스 낭비를 해결하고자 기획되었고, 초기 사내 백오피스를 넘어 범용 SaaS로의 전환을 목표로 설계했습니다. TF팀 인턴으로 참여해 기획·UI/UX 설계부터 프론트엔드·백엔드·DB 설계·배포까지 풀사이클로 진행했습니다.',
    highlights: [
      'Langchain으로 미팅 회의록 기반 AI 제안서 자동 생성 플로우를 설계해, 수기 작성 대비 초안 생성 시간을 2~3분 내로 단축.',
      '낙관적 업데이트(Optimistic Updates)를 도입해 평균 1.5~3초이던 사용자 대기 시간을 0초로 단축하고 서비스 반응성을 개선.',
      'Mutation + 목록 리페치 2단계를 Mutation 단일 호출로 개선해 네트워크 요청을 기존 대비 50% 절감.',
      'API 응답 필드 최적화로 제안서 목록 데이터 크기를 1,415KB → 206KB로 약 85% 축소하여 초기 로딩 속도 개선.',
      'Admin 페이지에 사용자 트래킹 기능을 직접 구현해 실제 사용자 데이터 기반의 서비스 고도화·운영 전략 수립에 기여.',
    ],
    work: [
      {
        tag: 'PRODUCT',
        items: [
          'Langchain으로 미팅 회의록 기반 AI 제안서 자동 생성 플로우를 설계해, 수기 작성 대비 초안 생성 시간을 2~3분 내로 단축.',
          'Admin 페이지에 사용자 트래킹 기능을 직접 구현해 실제 사용자 데이터 기반의 서비스 고도화·운영 전략 수립에 기여.',
        ],
      },
      {
        tag: 'PERFORMANCE',
        items: [
          '낙관적 업데이트(Optimistic Updates)를 도입해 평균 1.5~3초이던 사용자 대기 시간을 0초로 단축하고 서비스 반응성을 개선.',
          'Mutation + 목록 리페치 2단계를 Mutation 단일 호출로 개선해 네트워크 요청을 기존 대비 50% 절감.',
          'API 응답 필드 최적화로 제안서 목록 데이터 크기를 1,415KB → 206KB로 약 85% 축소하여 초기 로딩 속도 개선.',
        ],
      },
    ],
    resumeBullets: [
      '제안서 목록 API 1.4MB → 206KB (85%↓) 최적화',
      'Mutation 후 리페치 제거로 네트워크 요청 50% 절감',
      'Admin 사용자 트래킹 직접 구현',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Zustand',
      'Tanstack Query',
      'Zod',
      'React Hook Form',
      'Axios',
      'Langchain',
      'Recharts',
      'React To Print',
      'GitHub Actions',
      'Vercel',
    ],
    resumeStack: ['Next.js', 'TypeScript', 'Supabase', 'Tanstack Query', 'Langchain'],
    links: [],
    thumbnail: 'deckly.jpg',
    image: '/projects/deckly.webp',
    gallery: [{ src: '/projects/deckly.webp', w: 1920, h: 990 }],
    metrics: [
      { value: '85%', label: '제안서 목록 API 응답 크기 감축', target: { kind: 'trouble', index: 2 } },
      { value: '50%', label: 'Mutation 네트워크 요청 절감', target: { kind: 'insight', index: 2 } },
      { value: '0초', label: '낙관적 업데이트 체감 대기시간', target: { kind: 'insight', index: 2 } },
      { value: '1인', label: '기획·UI/UX·FE·BE·배포 풀사이클' },
    ],
    insights: [
      {
        title: '클라이언트 캐싱 전략과 데이터 보안의 연관성',
        intro:
          "전역 상태와 서버 데이터 캐시(TanStack Query)의 생명주기가 일치하지 않을 때 발생하는 '캐시 오염' 리스크를 처음 마주했습니다. 사용자 세션의 종료가 단순한 페이지 이동이 아니라 메모리 자원의 클린업까지 이어져야 함을 체감했습니다.",
        steps: [
          {
            title: '상태와 캐시의 라이프사이클 동기화',
            points: [
              '전역 상태와 서버 데이터 캐시의 생명주기가 어긋나면 이전 사용자의 데이터가 남는 캐시 오염이 발생합니다.',
              '세션 종료는 페이지 이동이 아니라 메모리 자원의 클린업까지 동반해야 한다는 것을 체감했습니다.',
            ],
          },
          {
            title: '고유 식별자를 활용한 데이터 격리 설계',
            points: [
              'Query Key에 사용자 고유 식별자(userId)를 포함시켜 계정별 독립적인 캐시 공간을 할당했습니다.',
              '다중 사용자 환경에서 의도치 않은 정보 노출을 방지하는 것이 프론트엔드 보안 설계의 핵심임을 체감했습니다.',
            ],
          },
        ],
      },
      {
        title: '성능 최적화, UX 개선 및 효율적인 API 통신 설계',
        intro:
          "단순한 렌더링 지연을 감으로 해결하지 않고 Chrome DevTools의 Network 탭으로 1.4MB라는 비정상적인 페이로드 크기를 파악해, 근본 원인이 무분별한 데이터 호출(.select('*'))에 있음을 찾아냈습니다.",
        steps: [
          {
            title: '데이터 중심의 문제 진단',
            points: [
              "Network 탭으로 단일 API 응답이 1,415KB에 달하는 것을 측정하고, 원인이 .select('*')의 전체 필드 호출임을 확인했습니다.",
            ],
          },
          {
            title: '불필요한 리소스 최소화',
            points: [
              'UI 렌더링에 필수적인 필드만 선별 호출하도록 바꿔 데이터 크기를 약 85% 감축(1,415KB → 206KB)하고 네트워크 전송 효율을 극대화했습니다.',
            ],
          },
          {
            title: '사용자 중심의 최적화',
            points: [
              '서버가 전달하는 데이터 크기가 곧 사용자가 체감하는 LCP와 직결됨을 이해하고, 설계 단계부터 필요한 만큼만 요청·전송하는 API 설계 습관을 정립했습니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: '계정 전환 시 이전 사용자의 제안서 목록이 노출되는 캐시 오염',
        conclusion:
          '계정 전환 시 이전 사용자의 목록이 노출되던 문제가 해소되고, 로그아웃 시점에 메모리 캐시까지 비워집니다.',
        cause:
          "제안서 목록 API의 queryKey가 사용자 식별자 없이 ['proposals']처럼 정적으로 구성돼, TanStack Query가 모든 사용자에게 동일한 캐시를 공유하고 있었습니다.",
        problem:
          '계정 A로 로그인 후 로그아웃하고 계정 B로 로그인하면, /dashboard에 여전히 A의 제안서 목록이 렌더링되고 새로고침을 해야만 B의 목록이 보이는 문제가 발생했습니다.',
        actions: [
          "제안서 목록 API의 queryKey가 사용자 식별자 없이 ['proposals']처럼 정적으로 구성돼, TanStack Query가 모든 사용자에게 동일 캐시를 공유하던 것을 원인으로 확인했습니다.",
          "쿼리 키에 로그인 사용자 고유 ID를 포함하도록 수정(['proposals'] → ['proposals', userId])해 계정마다 별도 캐시 저장소를 할당하고, 사용자 전환 시 새 키로 독립적인 Fetching이 발생하도록 했습니다.",
          '로그아웃 핸들러에서 queryClient.clear()를 실행해 메모리에 남은 모든 쿼리 데이터를 즉시 삭제하는 보안 중심의 클린업 프로세스를 구축했습니다.',
        ],
        lesson:
          '인증 상태와 캐시 생명주기를 일치시켜, 다중 사용자 환경에서 의도치 않은 데이터 유출 가능성을 원천 차단했습니다. 사용자별로 달라지는 응답의 쿼리 키에는 반드시 사용자 식별자가 들어가야 합니다.',
      },
      {
        title: '과대 페이로드로 인한 제안서 목록 로딩 지연',
        conclusion:
          'API 응답 크기를 1,415KB에서 206KB로 약 85% 줄여 스켈레톤 지연·타임아웃 현상을 해소했습니다.',
        cause:
          "getProposals()가 .select('*')로 목록 렌더링에 쓰지 않는 필드까지 전부 전송해, 단일 API 응답이 1,415KB에 달했습니다.",
        problem:
          '로그인 후 /dashboard 리다이렉트 시 제안서 목록 스켈레톤 UI가 비정상적으로 길게 유지되거나, 심한 경우 네트워크 타임아웃 에러가 노출되는 현상이 발생했습니다.',
        actions: [
          "Chrome DevTools Network 탭으로 단일 API 응답 크기가 1,415KB임을 측정하고, getProposals()가 .select('*')로 모든 필드를 전송하던 것을 원인으로 확인했습니다.",
          "목록 렌더링에 필요한 필드만 명시적으로 선택하도록 .select('id, title, client, status, progress, error, created_at, updated_at, …')로 변경했습니다.",
        ],
        lesson:
          '목록에 실제로 쓰이는 필드만 명시적으로 선택하는 것만으로 네트워크 비용을 크게 줄일 수 있습니다. 추측 대신 DevTools로 응답 크기를 먼저 측정한 것이 원인 특정을 빠르게 만들었습니다.',
        image: { src: '/projects/deckly-payload-after.webp', w: 425, h: 18 },
      },
    ],
  },
  {
    slug: 'sub-fc',
    title: 'SUB-FC - 팀 매니지먼트 서비스',
    org: '개인 프로젝트',
    period: '2025.08.25 — current',
    active: true,
    currentTask: 'UI/UX 전체 개선',
    role: 'Frontend · Full-cycle',
    type: 'Side Project',
    scale: '1인 개발',
    summary:
      'SUB-FC의 경기 일정·결과·선수단 정보를 확인하는 팀 매니지먼트 서비스. 기획부터 배포까지 End-to-End로 진행하며 실사용자 피드백을 반영해 고도화 중.',
    detail:
      '기존에 쓰던 앱의 높은 피로도와 불필요한 기능을 덜어내고, 실제 팀원이 원하는 기능에 집중해 만든 팀 전용 매니지먼트 서비스입니다. 기획·UI/UX 설계부터 프론트엔드·백엔드·배포까지 1인 풀사이클로 진행했으며, 팀원 피드백을 주기적으로 수집해 개선사항을 반영하고 있습니다.',
    highlights: [
      'Supabase 기반으로 직접 SQL DB 스키마 설계·데이터 모델링부터 FE·BE·배포까지 1인 풀사이클로 진행.',
      '서버 컴포넌트 전환으로 핵심 콘텐츠를 HTML에 선반영해 메인 페이지 Lighthouse Performance를 71 → 99점(약 39%↑)으로 개선.',
      '알림 시스템을 Database Subscription에서 Supabase Broadcast로 전환해 등록 시점에 맞춘 정확한 실시간 알림을 구현.',
      'Zod 런타임 검증과 Jest 기반 TDD를 도입해 데이터 무결성과 안정적인 코드 품질을 확보.',
      '실사용자 20명을 확보하고 주기적인 피드백 수집을 바탕으로 UI/UX 개선·기능 고도화에 반영.',
    ],
    work: [
      {
        tag: 'ARCHITECTURE',
        items: [
          'Supabase 기반으로 직접 SQL DB 스키마 설계·데이터 모델링부터 FE·BE·배포까지 1인 풀사이클로 진행.',
          '알림 시스템을 Database Subscription에서 Supabase Broadcast로 전환해 등록 시점에 맞춘 정확한 실시간 알림을 구현.',
        ],
      },
      {
        tag: 'PERFORMANCE',
        items: [
          '서버 컴포넌트 전환으로 핵심 콘텐츠를 HTML에 선반영해 메인 페이지 Lighthouse Performance를 71 → 99점(약 39%↑)으로 개선.',
        ],
      },
      {
        tag: 'QUALITY',
        items: [
          'Zod 런타임 검증과 Jest 기반 TDD를 도입해 데이터 무결성과 안정적인 코드 품질을 확보.',
        ],
      },
      {
        tag: 'OPERATION',
        items: [
          '실사용자 20명을 확보하고 주기적인 피드백 수집을 바탕으로 UI/UX 개선·기능 고도화에 반영.',
        ],
      },
    ],
    resumeBullets: [
      'Lighthouse Performance 71 → 99점 (서버 컴포넌트 전환)',
      'Supabase Broadcast로 실시간 알림 정확도 개선',
      '실사용자 20명 확보·피드백 기반 UI/UX 고도화',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Tanstack Query',
      'React Hook Form',
      'Zod',
      'Jest',
      'Supabase',
      'Axios',
      'ESLint',
      'Prettier',
      'GitHub Actions',
      'Vercel',
    ],
    resumeStack: ['Next.js', 'TypeScript', 'Tanstack Query', 'Zod', 'Supabase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/seong5/SUB_FC' },
      { label: 'Deploy', href: 'https://sub-fc-21fv.vercel.app/' },
    ],
    thumbnail: 'sub-fc.jpg',
    image: '/projects/sub-fc.webp',
    imageFit: 'contain',
    gallery: [
      { src: '/projects/sub-fc-3.webp', w: 826, h: 1202 },
      { src: '/projects/sub-fc-1.webp', w: 832, h: 1224 },
      { src: '/projects/sub-fc-2.webp', w: 842, h: 1226 },
    ],
    galleryCols: 3,
    metrics: [
      { value: '71→99', label: '서버 컴포넌트로 성능 개선', target: { kind: 'insight', index: 1 } },
      { value: '20명', label: '실사용자 확보' },
      { value: 'Zod·Jest', label: '런타임 검증·TDD 도입', target: { kind: 'insight', index: 3 } },
      { value: 'Broadcast', label: '실시간 알림 정확도 개선', target: { kind: 'trouble', index: 1 } },
    ],
    insights: [
      {
        title: '서버 컴포넌트 전환을 통한 LCP 및 초기 로딩 개선',
        intro:
          '서버에서 쿠키 기반 인증 데이터를 병렬로 fetch해 클라이언트에 initialData를 주입하고, 불필요한 클라이언트 사이드 데이터 요청을 줄여 FCP·LCP를 크게 끌어올렸습니다.',
        steps: [
          {
            title: '효율적인 데이터 전달',
            points: [
              '서버에서 쿠키 기반 인증 데이터를 병렬 fetch해 initialData를 주입하고, 데이터가 있으면 즉시 렌더링·없으면 클라이언트에서 확인하는 이중 컴포넌트로 구현했습니다.',
            ],
          },
          {
            title: '핵심 콘텐츠 선반영으로 LCP 개선',
            points: [
              '브라우저 JS 실행 전 페이지의 핵심 콘텐츠를 HTML에 포함시켜 LCP를 크게 개선했습니다. 그 결과 메인 페이지 Lighthouse Performance 점수가 71점 → 99점으로 약 39% 향상됐습니다.',
            ],
          },
          {
            title: '컴포넌트 역할 분리',
            points: [
              '데이터 로딩은 서버, 사용자 인터랙션은 클라이언트가 담당하도록 역할을 분리해 JS 번들 크기를 줄이고 최적화에 기여했습니다.',
            ],
          },
        ],
        image: { src: '/projects/sub-fc-lighthouse.webp', w: 822, h: 344 },
      },
      {
        title: '데이터 구조와 프론트엔드 로직의 관계성',
        intro:
          '직접 SQL을 작성하고 데이터 모델링을 진행하며, 견고한 데이터 구조 설계가 곧 명확한 프론트엔드 로직으로 이어진다는 것을 체감했습니다.',
        steps: [
          {
            title: '데이터 흐름 파악으로 설계 역량 확보',
            points: [
              '데이터의 흐름을 파악함으로써 API 효율을 높였습니다.',
              '화면 중심이 아닌 데이터 중심의 설계 역량을 확보했습니다.',
            ],
          },
        ],
      },
      {
        title: 'TDD 방법론의 필요성',
        intro:
          '테스트 코드 작성은 단순히 완벽한 코드를 만드는 수단이 아니라, 지속 가능한 코드와 안전한 리팩토링 환경을 만들어 주는 안전망이라는 것을 학습했습니다.',
        steps: [
          {
            title: '확신을 갖는 개발 문화',
            points: [
              'TDD를 통해 코드 품질에 대한 확신을 갖고 유지보수 비용을 낮추는 개발 문화의 중요성을 다시 체감했습니다.',
            ],
          },
        ],
      },
      {
        title: '효율적인 서버 상태 관리',
        intro:
          'TanStack Query의 staleTime과 useMutation을 심도 있게 활용하며 비동기 데이터의 생명주기를 관리하는 법을 경험했습니다.',
        steps: [
          {
            title: '네트워크 절감과 즉각적 피드백',
            points: [
              '불필요한 네트워크 비용을 절감하는 동시에, 요청 상태에 따른 즉각적인 UI 피드백을 제공했습니다.',
              '사용자에게 끊김 없는 인터페이스를 제공하는 경험을 쌓았습니다.',
            ],
          },
        ],
      },
      {
        title: '로직 분리를 통한 컴포넌트 설계의 재사용성',
        intro:
          '뷰 로직과 비즈니스 로직을 분리하고 커스텀 훅을 활용함으로써 컴포넌트의 가독성을 높이고 로직의 재사용성을 극대화했습니다.',
        steps: [
          {
            title: '공통 queryKey 추상화',
            points: [
              '공통된 queryKey를 사용하는 로직을 추상화해 여러 컴포넌트에서 데이터 일관성을 유지하고 유지보수를 용이하게 하는 구조를 확보했습니다.',
            ],
          },
        ],
      },
      {
        title: '실시간 데이터 통신 방식의 최적화',
        intro: 'Supabase의 Subscription과 Broadcast 방식의 차이를 깊이 있게 경험했습니다.',
        steps: [
          {
            title: '명확한 시점의 알림 전달',
            points: [
              '단순 DB 변동 감지로 알림을 보내는 것이 아니라 API 단계에서 명확한 시점에 메시지를 전송하는 Broadcast 방식을 채택했습니다.',
              '사용자에게 명확하고 유의미한 시점의 알림을 전달하는 실무적 기술 선택 역량을 키웠습니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: '알림 시점이 부정확한 Database Subscription을 Broadcast로 전환',
        conclusion:
          '페이지 새로고침 없이 등록 즉시 팀원에게 알림이 전달되고, 수신 시 추가 API 호출 없이 UI를 렌더링합니다.',
        cause:
          'Database Subscription은 DB 변화에 반응하는 방식이라 관리자 작업·단순 수정에도 알림이 발송됐고, 특정 경기·일정의 맥락을 메시지에 담기 어려웠습니다.',
        problem:
          '경기 결과 확인·일정 등록은 핵심 기능이라 등록 즉시 알림이 필요했습니다. 초기 Database Subscription 방식은 관리자 작업·단순 수정에도 알림이 발송되는 부정확한 트리거 시점, 특정 경기·일정에 구체적 메시지를 담기 어려운 맥락 결여가 한계였습니다.',
        actions: [
          'API Route(/api/matches·/api/schedules)에서 DB 트랜잭션 성공이 확인된 시점에만 channel.send()를 호출하도록 설계해, 관리자 데이터 수정에도 알림이 가던 로직을 제거했습니다.',
          'NotificationProvider로 서비스 전체에서 등록 이벤트를 한 곳에서 감지하게 해, 페이지마다 알림 로직을 두지 않도록 했습니다.',
          '수신된 알림은 Zustand 전역 보관함에 저장해 종 아이콘과 상세 드롭다운이 항상 같은 최신 데이터를 보여주도록 했습니다.',
          'useEffect 클린업으로 언마운트 시 자동 구독 해제해 메모리 누수를 방지하고, 알림 전송 실패가 등록 로직에 영향을 주지 않도록 비동기 예외 처리를 적용했습니다.',
        ],
        lesson:
          'TypeScript로 알림 타입을 구분하고 Zustand로 UI와 로직을 완전히 분리해, 새로운 알림 기능을 확장할 수 있는 기반을 마련했습니다. 알림은 "데이터가 변했을 때"가 아니라 "사용자가 의도한 행동을 했을 때" 보내야 정확합니다.',
      },
    ],
  },
  {
    slug: 'globalnomad',
    title: 'GlobalNomad - 액티비티 마켓플레이스',
    org: '코드잇 · FE 심화 프로젝트',
    period: '2025.07.09 — 2025.08.05 (1m)',
    role: 'Frontend',
    type: 'Team Project',
    scale: '5인 개발',
    summary:
      '사용자가 공급자·수요자로 동시에 활동하는 지도·예약 기반 양방향 액티비티 마켓플레이스. 지도 연동과 상태 관리·캐싱 최적화를 담당.',
    detail:
      '사용자가 공급자와 수요자로 동시에 활동할 수 있는, 지도와 예약 기반의 양방향 액티비티 마켓플레이스 서비스입니다.',
    highlights: [
      '체험 예약 입력의 복잡도를 낮추기 위해 디바이스별 단계(Step)형 입력 폼을 설계해 이탈률을 줄이는 사용자 경험을 제공.',
      '등록 이미지 개수에 따라 레이아웃이 유동적으로 변하는 반응형 이미지 그리드를 구현해 화면 비율과 시각적 일관성을 확보.',
      'Kakao Maps SDK를 지연 로딩으로 주입하고 window 참조 전 클라이언트 실행 여부를 검증해 SSR 참조 에러를 방지, Read-Only·Resize로 디바이스별 일관된 지도 뷰 유지.',
      'Zustand로 판매자 관리 로직의 Prop Drilling을 해소하고, TanStack Query staleTime으로 중복 API 요청을 차단해 서버 부하를 경감.',
    ],
    work: [
      {
        tag: 'PRODUCT',
        items: [
          '체험 상세 페이지 전체를 단독 담당해 예약 플로우·이미지 그리드·지도 영역을 직접 설계하고 구현.',
          '체험 예약 입력의 복잡도를 낮추기 위해 디바이스별 단계(Step)형 입력 폼을 설계해 이탈률을 줄이는 사용자 경험을 제공.',
          '등록 이미지 개수에 따라 레이아웃이 유동적으로 변하는 반응형 이미지 그리드를 구현해 화면 비율과 시각적 일관성을 확보.',
        ],
      },
      {
        tag: 'INTEGRATION',
        items: [
          'Kakao Maps SDK를 지연 로딩으로 주입하고 window 참조 전 클라이언트 실행 여부를 검증해 SSR 참조 에러를 방지, Read-Only·Resize로 디바이스별 일관된 지도 뷰 유지.',
        ],
      },
      {
        tag: 'PERFORMANCE',
        items: [
          'Zustand로 판매자 관리 로직의 Prop Drilling을 해소하고, TanStack Query staleTime으로 중복 API 요청을 차단해 서버 부하를 경감.',
        ],
      },
    ],
    resumeBullets: [
      '디바이스별 Step형 예약 플로우 설계·구현',
      'Kakao Maps SDK 지연 로딩·SSR 안전 연동',
      'Tanstack Query staleTime으로 중복 API 요청 절감',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Tanstack Query',
      'Axios',
      'Kakao Maps SDK',
      'Husky',
      'ESLint',
      'Prettier',
      'GitHub Actions',
      'Vercel',
    ],
    resumeStack: ['Next.js', 'TypeScript', 'Tanstack Query', 'Zustand', 'Kakao Maps SDK'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Act-It-FE/global-nomad' },
      { label: 'Deploy', href: 'https://global-nomad-omega.vercel.app/' },
    ],
    thumbnail: 'globalnomad.jpg',
    image: '/projects/globalnomad.webp',
    gallery: [{ src: '/projects/globalnomad.webp', w: 1920, h: 990 }],
    insights: [
      {
        title: '디바이스 대응력을 고려한 기능 단위 컴포넌트 설계',
        intro:
          '하나의 컴포넌트가 하나의 기능만 담당하도록 설계해 예기치 못한 사이드 이펙트를 방지하고, 코드 수정 시 영향 범위를 최소화하는 안정적인 유지보수 환경을 경험했습니다.',
        steps: [
          {
            title: '기능 단위 분리로 대응력 확보',
            points: [
              '복잡한 예약 단계(Step) 플로우를 디바이스에 맞게 분리해 가독성과 디바이스 대응력을 높였습니다.',
            ],
          },
        ],
      },
      {
        title: '사용자 경험과 기술적 성능의 균형',
        intro:
          '이미지 랜덤 노출 같은 기능을 구현할 때 개발 편의성보다 사용자가 겪을 수 있는 실수나 불편을 먼저 고려하는 설계의 중요성을 배웠습니다.',
        steps: [
          {
            title: '사용자 중심의 사고방식',
            points: [
              '기술은 결국 사용자의 문제를 해결하기 위한 도구임을 다시 체감하며 사용자 중심의 사고방식을 갖추게 되었습니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: '디바이스별로 다른 예약 플로우를 위한 컴포넌트·로직 분리',
        conclusion:
          'PC·태블릿·모바일 각각에 맞는 예약 플로우를 완성하고, 스프린트 내에 구현하지 못했던 위저드를 마무리했습니다.',
        cause:
          '하나의 캘린더 컴포넌트가 모든 디바이스의 UI와 로직을 함께 처리해, 조건문과 검증이 기기별로 얽힌 강결합 상태였습니다.',
        problem:
          '체험 상세 페이지의 예약 플로우가 Figma 시안상 디바이스별로 달라야 했습니다. PC는 한 화면에서 모든 단계를 진행하지만 Tablet·Mobile은 예약 → 날짜 → 시간 → 인원 → 완료의 위저드여야 했는데, 스프린트 기간 내에 이를 구현하지 못했습니다.',
        actions: [
          'PC는 한 화면 진행을 유지하고, 태블릿·모바일은 각각 사용될 컴포넌트를 분리해 개발했습니다.',
          "모바일·태블릿은 useState로 현재 단계를 추적하고 기기별 스텝 수에 따라 조건부 렌더링하는 '다음' 버튼 중심의 위저드 플로우를 구현했습니다.",
          'UI는 분리하되 예약에 필요한 핵심 로직(날짜 검증·API 호출 등)은 커스텀 훅으로 캡슐화해 데이터 무결성과 유지보수성을 확보했습니다.',
        ],
        lesson:
          'UI와 비즈니스 로직을 분리해 컴포넌트 가독성과 재사용성이 높아지고, 디바이스 조건이 늘어도 대응하기 쉬운 구조를 확보했습니다.',
      },
    ],
  },
  {
    slug: 'whyne',
    title: 'WHYNE - 와인 리뷰 플랫폼',
    org: '코드잇 · FE 중급 프로젝트',
    period: '2025.06.05 — 2025.06.24 (3w)',
    role: 'Frontend',
    type: 'Team Project',
    scale: '4인 개발',
    summary:
      '다양한 와인을 검색·필터링하고 직접 리뷰를 등록·확인하는 리뷰 기반 플랫폼. AWS 인프라 구축과 라이브러리 없는 UI 구현, 다중 필터링 로직을 담당.',
    detail:
      '사용자들이 다양한 와인 정보를 검색·필터링하며 직접 리뷰를 등록하고 확인하는 리뷰 기반 플랫폼입니다.',
    highlights: [
      'UI 라이브러리 없이 캐러셀을 직접 구현해 번들 크기를 최적화하고, 평점 4.2점 이상 상위 와인 8종을 랜덤 추천하는 메인 인터페이스를 제공.',
      '라이브러리 없이 Range Slider형 가격 필터(0~100만원)와 와인 타입·평점 다중 조건 필터링 로직을 직접 구현해 최적화.',
      'AWS(Route53·EC2)로 배포 전 과정을 직접 수행한 뒤, 비용·운영 안정성을 고려해 Vercel로 마이그레이션.',
      '컨테이너-프리젠테이션 패턴으로 비즈니스 로직과 뷰를 분리해 컴포넌트 재사용성과 유지보수성을 확보.',
    ],
    work: [
      {
        tag: 'PRODUCT',
        items: [
          '검색부터 다중 필터·목록 렌더링까지, 와인 목록 페이지를 처음부터 끝까지 혼자 맡아 구축.',
          'UI 라이브러리 없이 캐러셀을 직접 구현해 번들 크기를 최적화하고, 평점 4.2점 이상 상위 와인 8종을 랜덤 추천하는 메인 인터페이스를 제공.',
          '라이브러리 없이 Range Slider형 가격 필터(0~100만원)와 와인 타입·평점 다중 조건 필터링 로직을 직접 구현해 최적화.',
        ],
      },
      {
        tag: 'ARCHITECTURE',
        items: [
          '컨테이너-프리젠테이션 패턴으로 비즈니스 로직과 뷰를 분리해 컴포넌트 재사용성과 유지보수성을 확보.',
        ],
      },
      {
        tag: 'INFRA',
        items: [
          'AWS(Route53·EC2)로 배포 전 과정을 직접 수행한 뒤, 비용·운영 안정성을 고려해 Vercel로 마이그레이션.',
        ],
      },
    ],
    resumeBullets: [
      'UI 라이브러리 없이 캐러셀·필터 직접 구현, 번들 최적화',
      'AWS Route53·EC2 배포 후 Vercel로 마이그레이션',
      '다중 필터·검색 로직 설계로 대량 목록 성능 유지',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Axios',
      'React Hook Form',
      'Husky',
      'ESLint',
      'Prettier',
      'AWS',
      'GitHub Actions',
      'Vercel',
    ],
    resumeStack: ['Next.js', 'TypeScript', 'Zustand', 'React Hook Form', 'AWS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/codeit-part3-team5/whyne' },
      { label: 'Deploy', href: 'https://whyne-navy.vercel.app/' },
    ],
    thumbnail: 'whyne.jpg',
    image: '/projects/whyne.webp',
    gallery: [{ src: '/projects/whyne.webp', w: 1920, h: 981 }],
    imageNoBorder: true,
    insights: [
      {
        title: '컨테이너-프리젠테이션 패턴',
        intro:
          '데이터 패칭·비즈니스 로직을 담당하는 컴포넌트와 UI 렌더링에 집중하는 컴포넌트를 분리해, 로직과 뷰 사이의 의존성을 최소화했습니다.',
        steps: [
          {
            title: '역할 정의와 책임 분리',
            points: [
              '데이터·로직은 MonthlyWines가, UI 렌더링은 MiniWineCard가 담당하도록 구조를 분리해 비즈니스 로직과 뷰 로직의 의존성을 최소화했습니다.',
            ],
          },
          {
            title: '재사용성·확장성 극대화',
            points: [
              'UI 전용 MiniWineCard를 순수 함수형으로 설계해 특정 도메인에 종속되지 않고 다양한 컨텍스트에서 재사용 가능한 컴포넌트로 개선했습니다.',
            ],
          },
          {
            title: '가독성·유지보수 효율 향상',
            points: [
              '각 컴포넌트의 역할이 명확해져 코드 파악이 쉽고, UI 변경이나 로직 수정 시 서로 영향을 주지 않고 독립적으로 작업할 수 있는 환경을 확보했습니다.',
            ],
          },
        ],
      },
      {
        title: '브라우저 이벤트를 활용한 상호작용 최적화',
        intro:
          'useRef와 이벤트 위임을 활용해 드롭다운의 외부 영역 감지 로직을 직접 구현하면서 성능과 메모리 효율을 함께 잡았습니다.',
        steps: [
          {
            title: '이벤트 위임으로 리스너 최소화',
            points: [
              'document 레벨에서 이벤트를 감지하는 이벤트 위임을 활용해, 다수의 드롭다운이 렌더링되는 상황에서도 불필요한 리스너 생성을 방지하고 메모리 자원을 효율적으로 관리했습니다.',
            ],
          },
          {
            title: '정확하고 빠른 외부 영역 감지',
            points: [
              'click보다 발생 시점이 빠른 mousedown 이벤트를 활용해 사용자 반응 속도를 높이고, useRef의 .contains()로 직접적인 DOM 접근 없이 정확한 외부 영역 감지 로직을 구현했습니다.',
              '컴포넌트 언마운트 시 Cleanup 함수로 리스너를 제거해 메모리 누수와 사이드 이펙트를 사전에 차단했습니다.',
            ],
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: 'EC2 재시작 후 발생한 도메인 연결 끊김·SSH 권한 에러',
        conclusion:
          '변경된 IP를 DNS 레코드에 반영해 도메인 연결이 즉시 복구되고, 접속·배포 절차를 매뉴얼화해 재발을 막았습니다.',
        cause:
          'EC2를 중단 후 재시작하면 Public IP가 바뀌는데 Route53 레코드가 기존 IP를 가리키고 있었고, SSH는 키 페어(.pem)가 없는 경로에서 실행해 권한을 얻지 못했습니다.',
        problem:
          'EC2 인스턴스를 재시작한 뒤 서비스에 접속이 되지 않는 현상이 발생했고, SSH 터미널 접속 시에도 권한 에러가 나 배포가 중단됐습니다.',
        actions: [
          '원인 ①: EC2를 중단 후 재시작하면 Public IP가 바뀌어 Route53의 기존 IP와 불일치하며 도메인 연결이 끊겼습니다. 변경된 Public IP를 Route53 레코드에 즉시 업데이트해 복구했습니다.',
          '원인 ②: 키 페어(.pem)가 없는 경로에서 SSH를 실행해 권한을 얻지 못했습니다. SSH·배포 스크립트를 키 파일이 있는 디렉토리에서 수행하도록 매뉴얼화하고 권한(chmod 400)을 재확인했습니다.',
        ],
        lesson:
          '실행 경로·권한 절차를 매뉴얼화해, 인스턴스 재시작 시 같은 클래스의 접속·배포 중단이 재발하지 않도록 했습니다. 고정 IP가 필요하면 Elastic IP를 붙이는 것이 근본 해법입니다.',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
