import pw from '/Users/yejicho/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
const { chromium } = pw;
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

// 사내 공지용 청첩장 이미지 촬영
// 사용: cd notice && node shoot.mjs
const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = 'file://' + join(__dirname, 'notice.html');
const outDir = join(__dirname, 'img');
mkdirSync(outDir, { recursive: true });

// .card 순서와 index를 맞출 것 (카드 추가 시 여기도 추가)
const names = [
  'notice-1080x1350',  // 세로형 — 사내 게시판·단톡방
  'notice-1200x630',   // 가로형 — 메일·슬랙
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.goto(htmlPath, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  document.querySelectorAll('.label').forEach(el => el.style.display = 'none');
  return document.fonts.ready;
});

const cards = await page.$$('.card');
for (let i = 0; i < cards.length; i++) {
  const file = join(outDir, (names[i] ?? `card-${i + 1}`) + '.png');
  await cards[i].screenshot({ path: file });
  console.log('✓', file);
}

await browser.close();
