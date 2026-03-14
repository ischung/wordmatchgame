import type { WordItem } from '../types'

// ── 단어 목록 (최소 20개 영단어) ─────────────────────────────────────────────

const WORD_LIST = [
  'apple', 'brave', 'cloud', 'dance', 'eagle',
  'flame', 'grace', 'heart', 'ivory', 'jewel',
  'knack', 'lemon', 'maple', 'noble', 'ocean',
  'pearl', 'quest', 'river', 'stone', 'tiger',
  'ultra', 'vivid', 'water', 'xenon', 'yield',
  'zebra',
]

// ── 기본 수명 (ms) ───────────────────────────────────────────────────────────

const DEFAULT_LIFESPAN_MS = 5000

// ── spawn ────────────────────────────────────────────────────────────────────

/**
 * lastWord를 제외한 랜덤 단어로 WordItem을 생성한다.
 * x: 10~90%, y: 0%
 */
export function spawn(lastWord: string | null): WordItem {
  const pool = lastWord
    ? WORD_LIST.filter(w => w !== lastWord)
    : WORD_LIST

  const text = pool[Math.floor(Math.random() * pool.length)]
  const x = 10 + Math.random() * 80 // 10~90
  const y = 0

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    x,
    y,
    createdAt: Date.now(),
    lifespan: DEFAULT_LIFESPAN_MS,
  }
}

// ── removeExpired ─────────────────────────────────────────────────────────────

/**
 * createdAt + lifespan < Date.now() 인 단어를 제거한다.
 */
export function removeExpired(words: WordItem[]): WordItem[] {
  const now = Date.now()
  return words.filter(w => w.createdAt + w.lifespan >= now)
}
