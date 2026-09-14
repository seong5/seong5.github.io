import { Fragment } from 'react';

/** '==구절==' 을 형광펜으로 바꾼다. InsightAccordion 의 hl-marker 와 같은 밴드다.
    .hl-marker 에 box-decoration-break: clone 이 걸려 있어 줄바꿈돼도 밴드가 따라붙는다.
    프로젝트 상세(work)와 홈 About 본문이 함께 쓴다 — 둘 다 "항목당 한 곳" 규약. */
export function marked(text: string) {
  // 순서가 고정된 조각이라 인덱스를 key 로 쓴다. 원문을 key 에 넣으면
  // 같은 문자열이 RSC 페이로드에 조각 수만큼 중복으로 실린다.
  return text
    .split('==')
    .map((seg, i) =>
      i % 2 === 1 ? (
        <span key={i} className="hl-marker">
          {seg}
        </span>
      ) : (
        <Fragment key={i}>{seg}</Fragment>
      ),
    );
}
