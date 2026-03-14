// 화면에 표시되는 단어 하나
export interface WordItem {
  id: string;        // 고유 식별자 (uuid)
  text: string;      // 단어 텍스트
  x: number;         // 화면 X 좌표 (%)
  y: number;         // 화면 Y 좌표 (%)
  createdAt: number; // 생성 타임스탬프 (ms)
  lifespan: number;  // 화면에 머무는 시간 (ms)
}

// 게임 전체 상태
export interface GameState {
  screen: 'start' | 'countdown' | 'playing' | 'result';
  words: WordItem[];       // 현재 화면에 있는 단어 목록
  score: number;           // 현재 점수
  timeLeft: number;        // 남은 시간 (초)
  lastWord: string | null; // 직전 출현 단어 (중복 방지)
  isNewBestScore: boolean; // 최고 점수 갱신 여부
  correctCount: number;    // 맞힌 단어 수
  totalAttempts: number;   // 총 입력 시도 수 (Enter/Space)
}

// 게임 설정
export interface GameConfig {
  timeLimitSec: number; // 제한 시간 (30~120, 기본 60)
  maxWords: number;     // 최대 동시 표시 단어 수 (기본 5)
}

// 결과 화면 요약
export interface GameResult {
  score: number;
  correctCount: number; // 맞힌 단어 수
  totalCount: number;   // 도전한 단어 수
  accuracy: number;     // 정확도 (%)
}
