import type { WordItem } from '../types'

/**
 * input과 text가 완전히 일치하는 WordItem을 반환한다 (대소문자 구분 없음).
 * 일치하는 단어가 없거나 words가 비어있으면 null을 반환한다.
 */
export function match(input: string, words: WordItem[]): WordItem | null {
  if (words.length === 0) return null

  const normalized = input.toLowerCase()
  return words.find(w => w.text.toLowerCase() === normalized) ?? null
}
