const KEY = 'wm_best_score'

/**
 * 저장된 최고 점수를 반환한다.
 * 값이 없거나 localStorage 접근 실패 시 0을 반환한다.
 */
export function getBestScore(): number {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw === null) return 0
    const parsed = parseInt(raw, 10)
    return isNaN(parsed) ? 0 : parsed
  } catch {
    return 0
  }
}

/**
 * 현재 저장된 최고 점수보다 높을 때만 score를 저장한다.
 * localStorage 접근 실패 시 조용히 무시한다.
 */
export function saveBestScore(score: number): void {
  try {
    if (score > getBestScore()) {
      localStorage.setItem(KEY, String(score))
    }
  } catch {
    // ignore
  }
}
