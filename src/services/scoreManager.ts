import type { GameResult } from '../types'

/**
 * 단어 길이 기반 점수 계산.
 * 1~3자 → +1점, 4~6자 → +2점, 7자 이상 → +3점
 */
export function calcScore(word: string): number {
  const len = word.length
  if (len <= 3) return 1
  if (len <= 6) return 2
  return 3
}

/**
 * 게임 결과 요약 생성.
 * total이 0이면 accuracy는 0으로 처리한다.
 */
export function calcResult(
  score: number,
  correct: number,
  total: number,
): GameResult {
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100)
  return { score, correctCount: correct, totalCount: total, accuracy }
}
