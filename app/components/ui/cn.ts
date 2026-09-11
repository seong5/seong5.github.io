/**
 * 이 저장소 전용 cn — 커스텀 타입 스케일과 radius를 병합 엔진에 등록한다.
 *
 * 등록하지 않으면 cn(=tailwind-merge 호환 엔진)은 모르는 `text-*`를 폰트 크기가
 * 아니라 "텍스트 색"으로 분류한다. 그래서 `cn("text-muted-foreground", "text-label")`이
 * text-label만 남기고 색을 조용히 지웠고, 반대로 `cn("text-label", "text-foreground")`는
 * 폰트 크기를 지웠다. radius도 같은 이유로 rounded-chip과 rounded-panel이 둘 다
 * 살아남아 CSS 순서에 운을 맡기고 있었다.
 *
 * 스케일을 추가하면 여기 배열에도 추가해야 한다 (globals.css의 @theme와 짝).
 */
import { createCn } from 'cn/config';

export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'eyebrow',
            'meta',
            'label',
            'body',
            'read',
            'lead',
            'title',
            'h1',
            'h1-sub',
            'h2',
            'stat',
            'quote',
          ],
        },
      ],
      rounded: [{ rounded: ['chip', 'card', 'panel', 'media', 'inset'] }],
    },
  },
});
