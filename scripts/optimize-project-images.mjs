import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/projects',
);

/**
 * 카드 썸네일로만 쓰이는 이미지는 원본 파일을 직접 리사이즈한다.
 * 갤러리/라이트박스에서 원본 해상도로도 쓰이는 이미지는 `out`에
 * 별도 카드 전용 파일명을 지정해 원본을 건드리지 않는다.
 */
const targets = [
  { src: 'dobong-admin.webp', width: 1280 },
  { src: 'umust-erp.webp', width: 1280 },
  { src: 'claude-log-1.webp', width: 800, out: 'claude-log-1-card.webp' },
];

for (const { src, width, out } of targets) {
  const inputPath = path.join(projectsDir, src);
  const outputPath = path.join(projectsDir, out ?? src);

  if (!existsSync(inputPath)) {
    console.error(`missing source: ${inputPath}`);
    continue;
  }

  const buffer = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  await sharp(buffer).toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(
    `${out ?? src}: ${meta.width}x${meta.height}, ${(buffer.length / 1024).toFixed(1)}KB`,
  );
}
