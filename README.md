# 이승구 ♥ 조예지 — 게임 모바일 청첩장

연애부터 결혼까지의 이야기를 담은 **레트로 RPG 형식의 모바일 청첩장**입니다.
하객이 신랑·신부 캐릭터를 직접 조작해 픽셀 마을을 여행하고, 마지막 웨딩홀에 도착하면 실제 청첩장이 열립니다.

## 현재 상태

**STAGE 1 + 엔딩 뼈대 프로토타입** — 동작 검증 완료.

```bash
open index.html      # 브라우저 창을 세로로 좁히면 실제 폰 화면에 가깝습니다
```

- 외부 의존성 없는 **단일 HTML 파일**. 이미지 에셋 0개 — 타일과 캐릭터를 코드 안의 픽셀 문자열로 그립니다.
- 캐릭터(시점) 선택: `이승구(신랑측)` / `조예지(신부측)` — 같은 사건을 반대편 시점 대사로 보여주고, 엔딩에서 고른 쪽 연락처·계좌가 위로 정렬됩니다.
- 조작: 가상 D패드 + A버튼 + 탭-투-무브 + 키보드.
- 게임을 건너뛰고 청첩장만 보는 경로를 항상 열어둡니다 (타이틀 «바로 청첩장 보기», 상단 «건너뛰기», `#invitation` 앵커).

## 파일

| 경로 | 설명 |
|---|---|
| `PLAN.md` | 기획서 — 컨셉, 맵별 시나리오, 아트/기술 설계, 개발 계획, 준비물 체크리스트 |
| `index.html` | 결과물 본체 (HTML+CSS+JS 전부 인라인) |
| `assets/` | 작업용 원본 (최종 배포 시 base64로 인라인) |
| `notice/` | **사내 공지용 정적 청첩장 이미지** — `notice.html` 편집 후 `cd notice && node shoot.mjs` |
| `notice/img/` | 출력물: 세로 2160×2700, 가로 2400×1260 PNG |

### 사내 공지용 이미지

```bash
cd notice && node shoot.mjs
```

QR은 `segno`로 생성한 `notice/qr.svg`이며 현재 `https://cyeji.github.io/wedding-invitation`를 가리킵니다.
배포 URL이 확정되면 QR을 다시 만들어야 합니다.

```bash
python3 -m venv /tmp/qrenv && /tmp/qrenv/bin/pip install segno
/tmp/qrenv/bin/python -c "import segno; segno.make('실제URL', error='h').save('notice/qr.svg', scale=10, border=2, dark='#1A1A18', light=None)"
```

## 남은 작업

`PLAN.md` §11.2 참고. 요약하면 — 두 분의 실제 사연으로 STAGE 2~5 대사를 쓰고, 스테이지 4개를 구현하고, 사진·예식 정보를 채운 뒤 배포합니다.

배포 전 반드시 확인할 것:

- **카카오톡 인앱 브라우저** 실기기 테스트 (폰트·오디오가 여기서 가장 잘 깨집니다)
- 카카오 링크 미리보기 **캐시 초기화** — 한번 굳으면 옛날 카드가 계속 뜹니다
- 전체 용량 3MB 이하

## 참고

스크린샷 검증에는 Playwright를 씁니다. 로컬에 설치돼 있지 않아 npx 캐시에서 절대경로로 불러옵니다 (상위 `CLAUDE.md` 참고).
