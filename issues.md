# Issues — 워드 매치 게임

> **원본 TechSpec**: wordmatchgame-techspec.md
> **생성일**: 2026-03-14
> **총 이슈 수**: 16개
> **총 예상 소요**: 약 70분 (AI 기준)

---

## #1 [Setup] Vite + React + TypeScript 프로젝트 초기화

**레이블**: Setup
**예상 소요**: 5분
**의존성**: 없음

### 설명

현재 저장소에는 프로젝트 골격이 없다.
Vite 기반의 React + TypeScript 프로젝트를 초기화하고, 기본 디렉터리 구조를 설정한다.

```
src/
├── components/
├── services/
├── hooks/
├── types/
└── main.tsx
```

### 수락 기준 (Acceptance Criteria)

- [ ] `npm run dev` 실행 시 로컬 개발 서버가 정상 구동된다
- [ ] `npm run build` 실행 시 빌드 오류 없이 `dist/` 폴더가 생성된다
- [ ] TypeScript strict 모드가 활성화되어 있다
- [ ] `src/types/index.ts`에 `WordItem`, `GameState`, `GameConfig`, `GameResult` 인터페이스가 정의되어 있다

### 참고

- TechSpec 섹션: §3 기술 스택, §4 데이터 모델
- 관련 이슈: 없음

---

## #2 [Setup] CSS 디자인 토큰 & 전역 스타일 설정

**레이블**: Setup
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

TechSpec §7에 정의된 디자인 토큰을 CSS Custom Properties로 구현한다.
전역 스타일(reset, font, body 배경)도 함께 설정한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/styles/variables.css`에 색상, 타이포그래피, 간격, 모서리, 트랜지션 토큰이 정의되어 있다
- [ ] `body` 배경색이 `--color-bg` (#0f172a)로 적용된다
- [ ] Inter 폰트가 로드된다
- [ ] 모든 컴포넌트에서 CSS 변수를 참조할 수 있다

### 참고

- TechSpec 섹션: §7-1 디자인 토큰
- 관련 이슈: #1

---

## #3 [Infra] GitHub Actions CI/CD + GitHub Pages 배포 구성

**레이블**: Infra
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

main 브랜치에 push 시 자동으로 빌드하고 GitHub Pages에 배포하는 파이프라인을 구성한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `.github/workflows/deploy.yml`이 존재한다
- [ ] main 브랜치 push 시 GitHub Actions가 자동 실행된다
- [ ] 빌드 성공 시 GitHub Pages URL에서 앱이 정상 접근된다
- [ ] 빌드 실패 시 배포가 중단된다

### 참고

- TechSpec 섹션: §2-3 배포 환경
- 관련 이슈: #1

---

## #4 [Core Logic] GameState useReducer 설계 및 구현

**레이블**: Core Logic
**예상 소요**: 10분
**의존성**: Depends on #1

### 설명

게임 전체 상태를 단일 `useReducer`로 관리하는 훅을 구현한다.
상태 전환(start → countdown → playing → result)과 각 액션(SPAWN_WORD, MATCH_WORD, TICK, END_GAME 등)을 정의한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/hooks/useGameReducer.ts`가 존재한다
- [ ] `screen` 상태가 `start → countdown → playing → result` 순으로 전환된다
- [ ] `MATCH_WORD` 액션 시 score가 증가하고 해당 WordItem이 제거된다
- [ ] `TICK` 액션 시 timeLeft가 1씩 감소하며, 0이 되면 자동으로 `result`로 전환된다
- [ ] `RESTART` 액션 시 상태가 초기화되고 `countdown`으로 전환된다

### 참고

- TechSpec 섹션: §6-4 상태 관리 방식, §4-2 상태 흐름 다이어그램
- 관련 이슈: #1

---

## #5 [Core Logic] WordSpawner 서비스 구현

**레이블**: Core Logic
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

랜덤 단어를 생성하고, 수명이 다한 단어를 제거하는 서비스를 구현한다.
직전 단어와 동일한 단어가 연속으로 나오지 않도록 처리한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/services/wordSpawner.ts`가 존재한다
- [ ] `spawn(lastWord)`는 내장 단어 목록에서 랜덤 단어를 선택하며, lastWord와 동일한 단어는 제외한다
- [ ] 생성된 WordItem의 `x`는 랜덤 위치(10~90%), `y`는 0%에서 시작한다
- [ ] `removeExpired(words)`는 `createdAt + lifespan < Date.now()`인 단어를 제거한다
- [ ] 단어 목록은 최소 20개 이상의 영단어를 포함한다

### 참고

- TechSpec 섹션: §5-2 WordSpawner, §6-5 엣지 케이스
- 관련 이슈: #4

---

## #6 [Core Logic] InputMatcher 서비스 구현

**레이블**: Core Logic
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

사용자 입력값과 현재 화면의 단어 목록을 비교하여 일치하는 WordItem을 반환하는 서비스를 구현한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/services/inputMatcher.ts`가 존재한다
- [ ] `match(input, words)`는 input과 text가 완전히 일치하는 WordItem을 반환한다 (대소문자 구분 없음)
- [ ] 일치하는 단어가 없으면 `null`을 반환한다
- [ ] 화면에 단어가 0개일 때 `null`을 반환한다

### 참고

- TechSpec 섹션: §5-3 InputMatcher
- 관련 이슈: #4

---

## #7 [Core Logic] ScoreManager 서비스 구현

**레이블**: Core Logic
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

단어 길이 기반 점수 계산과 게임 결과 요약을 생성하는 서비스를 구현한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/services/scoreManager.ts`가 존재한다
- [ ] `calcScore(word)`는 단어 길이 1~3자 → +1점, 4~6자 → +2점, 7자 이상 → +3점을 반환한다
- [ ] `calcResult(score, correct, total)`은 정확도(correct/total * 100)를 포함한 `GameResult`를 반환한다
- [ ] total이 0일 때 정확도는 0으로 처리한다

### 참고

- TechSpec 섹션: §5-4 ScoreManager, §5-5 점수 계산 규칙
- 관련 이슈: #4

---

## #8 [Core Logic] LocalStorageService 구현

**레이블**: Core Logic
**예상 소요**: 5분
**의존성**: Depends on #1

### 설명

브라우저 localStorage를 사용하여 최고 점수를 영속 저장하고 불러오는 서비스를 구현한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `src/services/localStorageService.ts`가 존재한다
- [ ] `getBestScore()`는 `wm_best_score` 키의 값을 반환하며, 없으면 0을 반환한다
- [ ] `saveBestScore(score)`는 현재 저장된 값보다 높을 때만 갱신한다
- [ ] localStorage 접근 실패 시 오류 없이 기본값(0)을 반환한다

### 참고

- TechSpec 섹션: §5-1 LocalStorageService, §4-3 localStorage 스키마
- 관련 이슈: #4

---

## #9 [Frontend] ScreenManager 구현 (화면 전환)

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #4

### 설명

`GameState.screen` 값에 따라 StartScreen, GameScreen, ResultScreen을 조건부 렌더링하는 ScreenManager 컴포넌트를 구현한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `screen === 'start'`일 때 StartScreen이 렌더링된다
- [ ] `screen === 'countdown'` 또는 `'playing'`일 때 GameScreen이 렌더링된다
- [ ] `screen === 'result'`일 때 ResultScreen이 렌더링된다
- [ ] 화면 전환 시 이전 화면이 완전히 언마운트된다

### 참고

- TechSpec 섹션: §6-1 컴포넌트 트리
- 관련 이슈: #4

---

## #10 [Frontend] StartScreen 컴포넌트 구현

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #8, #9

### 설명

게임 시작 화면을 구현한다. 최고 점수와 시작 버튼을 표시하며, 버튼 클릭 시 countdown 화면으로 전환된다.

### 수락 기준 (Acceptance Criteria)

- [ ] LocalStorageService에서 불러온 최고 점수가 표시된다
- [ ] 최고 점수가 없으면 0점이 표시된다
- [ ] 시작 버튼 클릭 시 `screen`이 `countdown`으로 전환된다
- [ ] 디자인 토큰이 적용된 스타일로 렌더링된다

### 참고

- TechSpec 섹션: §6-1 컴포넌트 트리, §7-2 공통 컴포넌트 사양
- 관련 이슈: #8, #9

---

## #11 [Frontend] CountdownOverlay 컴포넌트 구현

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #4

### 설명

게임 시작 전 3-2-1 카운트다운 오버레이를 구현한다. 카운트다운 완료 시 자동으로 playing 상태로 전환된다.

### 수락 기준 (Acceptance Criteria)

- [ ] 3 → 2 → 1 순서로 1초 간격으로 숫자가 변경된다
- [ ] 각 숫자 변경 시 `scaleDown` 애니메이션이 적용된다
- [ ] 카운트다운 완료 후 자동으로 `screen`이 `playing`으로 전환된다
- [ ] 카운트다운 중 InputBar가 비활성화(disabled)된다

### 참고

- TechSpec 섹션: §7-4 애니메이션 규칙, §6-5 엣지 케이스
- 관련 이슈: #4

---

## #12 [Frontend] HUD 컴포넌트 구현 (Timer + ScoreBoard)

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #4

### 설명

게임 화면 상단에 고정되는 HUD(Heads-Up Display)를 구현한다. 좌측에 남은 시간, 우측에 현재 점수를 표시한다.

### 수락 기준 (Acceptance Criteria)

- [ ] 남은 시간이 `MM:SS` 형식으로 표시된다
- [ ] 현재 점수가 실시간으로 업데이트된다
- [ ] HUD가 화면 상단에 고정(sticky/fixed)된다
- [ ] 남은 시간이 10초 이하일 때 타이머 색상이 `--color-danger`로 변경된다

### 참고

- TechSpec 섹션: §6-1 컴포넌트 트리, §7-3 화면 레이아웃
- 관련 이슈: #4

---

## #13 [Frontend] WordCanvas + WordItem 컴포넌트 구현

**레이블**: Frontend
**예상 소요**: 10분
**의존성**: Depends on #5

### 설명

단어가 위에서 아래로 낙하하는 게임 영역을 구현한다. 각 WordItem은 독립적인 위치와 애니메이션을 가진다.

### 수락 기준 (Acceptance Criteria)

- [ ] WordCanvas는 HUD와 InputBar 사이의 전체 영역을 차지한다
- [ ] WordItem은 `WordItem.x` 위치에서 위→아래로 이동하는 CSS 애니메이션이 적용된다
- [ ] 단어 등장 시 `fadeInDown` 0.3s 애니메이션이 적용된다
- [ ] 단어 맞힘 시 초록 glow 효과 후 사라진다
- [ ] 수명이 다한 단어는 `fadeOut` 0.3s 후 제거된다
- [ ] 최대 5개 단어가 동시에 표시된다

### 참고

- TechSpec 섹션: §6-1 컴포넌트 트리, §7-4 애니메이션 규칙
- 관련 이슈: #5, #6

---

## #14 [Frontend] InputBar 컴포넌트 구현

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #6, #7

### 설명

화면 하단에 고정된 입력창을 구현한다. Enter 또는 Space 입력 시 InputMatcher를 통해 단어 매칭을 수행한다.

### 수락 기준 (Acceptance Criteria)

- [ ] InputBar가 화면 하단에 고정된다
- [ ] 게임 시작(`playing`) 시 자동 포커스된다
- [ ] Enter 또는 Space 입력 시 InputMatcher.match()를 호출한다
- [ ] 매칭 성공/실패 모두 입력창이 초기화된다
- [ ] `countdown` 및 `result` 상태에서 disabled 처리된다
- [ ] 포커스 시 `--color-primary` glow 효과가 적용된다

### 참고

- TechSpec 섹션: §6-2 핵심 로직 시퀀스, §7-2 공통 컴포넌트 사양
- 관련 이슈: #6, #7

---

## #15 [Frontend] ResultScreen 컴포넌트 구현

**레이블**: Frontend
**예상 소요**: 5분
**의존성**: Depends on #7, #8

### 설명

게임 종료 후 결과 화면을 구현한다. 점수, 정확도, 최고 점수 갱신 여부를 표시하고 재시작 버튼을 제공한다.

### 수락 기준 (Acceptance Criteria)

- [ ] 현재 게임 점수와 정확도(%)가 표시된다
- [ ] 최고 점수가 표시된다
- [ ] `isNewBestScore === true`일 때 축하 메시지와 `bounceIn` 골드 색상 애니메이션이 표시된다
- [ ] 재시작 버튼 클릭 시 `screen`이 `countdown`으로 전환된다
- [ ] 결과 화면은 자동으로 넘어가지 않고 유지된다

### 참고

- TechSpec 섹션: §6-3 핵심 로직 시퀀스, §7-4 애니메이션 규칙
- 관련 이슈: #7, #8

---

## #16 [Test] 단위 테스트 작성

**레이블**: Test
**예상 소요**: 10분
**의존성**: Depends on #5, #6, #7, #8

### 설명

핵심 서비스 모듈(WordSpawner, InputMatcher, ScoreManager, LocalStorageService)에 대한 단위 테스트를 작성한다.

### 수락 기준 (Acceptance Criteria)

- [ ] `npm run test` 실행 시 모든 테스트가 통과한다
- [ ] InputMatcher: 일치/불일치/빈 목록 케이스를 커버한다
- [ ] ScoreManager: 단어 길이별 점수 계산 및 정확도 계산을 커버한다
- [ ] WordSpawner: 직전 단어 중복 방지 및 수명 만료 제거를 커버한다
- [ ] LocalStorageService: 저장/불러오기/미존재 케이스를 커버한다

### 참고

- TechSpec 섹션: §8 Phase 4
- 관련 이슈: #5, #6, #7, #8
