import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public');
const projectsDir = path.join(publicDir, 'projects');

/**
 * 카드 썸네일로만 쓰이는 이미지는 원본 파일을 직접 리사이즈한다.
 * 갤러리/라이트박스에서 원본 해상도로도 쓰이는 이미지는 `out`에
 * 별도 카드 전용 파일명을 지정해 원본을 건드리지 않는다.
 * `dir`을 주면 그 디렉터리에서 읽고 쓴다 — 기본값은 public/projects.
 */
/** 패널 크롭의 고정 치수 — app/projects/projects.ts 의 PANEL_SHOT 과 짝이다 */
const PANEL = { width: 700, height: 600 };

const targets = [
  { src: 'dobong-admin.webp', width: 1280 },
  { src: 'umust-erp.webp', width: 1280 },
  { src: 'claude-log-1.webp', width: 800, out: 'claude-log-1-card.webp' },

  /* 홈 스포트라이트 패널 — 7:6 크롭. 8장이 한 화면에 동시에 내려가므로 원본을
     CSS로 자르지 않고 여기서 700px에 묶는다(합계 200KB 상한). 700px인 이유는
     최소 소스가 640px 폭(dajeonghae-1)이라 1.09배에서 업스케일이 멈추기 때문.
     좌측 사이드바가 정체성인 어드민 콘솔 둘만 'left top'으로 당긴다.
     위 인플레이스 리사이즈 뒤에 와야 항상 같은 결과가 나온다. */
  { ...PANEL, src: 'dajeonghae-1.webp', out: 'dajeonghae-panel.webp' },
  { ...PANEL, src: 'claude-log-1.webp', out: 'claude-log-panel.webp' },
  { ...PANEL, src: 'umust-erp.webp', position: 'left top', out: 'umust-erp-panel.webp' },
  { ...PANEL, src: 'dobong-admin.webp', position: 'left top', out: 'dobong-admin-panel.webp' },
  { ...PANEL, src: 'deckly.webp', out: 'deckly-panel.webp' },
  { ...PANEL, src: 'sub-fc-1.webp', out: 'sub-fc-panel.webp' },
  { ...PANEL, src: 'globalnomad.webp', out: 'globalnomad-panel.webp' },
  { ...PANEL, src: 'whyne.webp', out: 'whyne-panel.webp' },

  /* 히어로 아바타 — 3:4 증명사진을 얼굴 기준 정사각으로 자른다. unoptimized라
     srcset이 없으니 이 한 장이 밀도 대응까지 전담한다. 413은 원본 폭 그대로로,
     업스케일 없이 뽑을 수 있는 최대치다(표시 240px의 1.72배. 히어로가 240px에
     묶여 있는 것도 이 한계 때문이다 — 더 큰 원본으로 갈아끼우면 둘 다 올릴 수 있다).
     원본 profile.png는 이력서가 그대로 참조 중이라 out으로 분리한다. */
  {
    dir: publicDir,
    src: 'profile.png',
    out: 'profile-avatar.webp',
    width: 413,
    height: 413,
    position: 'top',
    quality: 82,
  },
];

for (const { dir, src, width, height, position, out, quality } of targets) {
  const baseDir = dir ?? projectsDir;
  const inputPath = path.join(baseDir, src);
  const outputPath = path.join(baseDir, out ?? src);

  if (!existsSync(inputPath)) {
    console.error(`missing source: ${inputPath}`);
    continue;
  }

  // height가 있으면 비율 크롭. 8장이 한꺼번에 내려가는 패널만 q78로 한 칸 내린다
  // (quality를 직접 주면 그 값이 이긴다)
  const buffer = await sharp(inputPath)
    .resize(
      height
        ? { width, height, fit: 'cover', position: position ?? 'top' }
        : { width, withoutEnlargement: true },
    )
    .webp({ quality: quality ?? (height ? 78 : 80) })
    .toBuffer();

  await sharp(buffer).toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(
    `${out ?? src}: ${meta.width}x${meta.height}, ${(buffer.length / 1024).toFixed(1)}KB`,
  );
}
