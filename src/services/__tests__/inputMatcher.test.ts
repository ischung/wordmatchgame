import { describe, it, expect } from 'vitest'
import { match } from '../inputMatcher'
import type { WordItem } from '../../types'

function makeWord(text: string): WordItem {
  return { id: text, text, x: 50, y: 0, createdAt: Date.now(), lifespan: 5000 }
}

describe('InputMatcher', () => {
  const words = [makeWord('apple'), makeWord('brave'), makeWord('cloud')]

  it('정확히 일치하는 단어를 반환한다', () => {
    const result = match('apple', words)
    expect(result?.text).toBe('apple')
  })

  it('대소문자 구분 없이 일치한다', () => {
    expect(match('APPLE', words)?.text).toBe('apple')
    expect(match('Apple', words)?.text).toBe('apple')
  })

  it('일치하는 단어가 없으면 null을 반환한다', () => {
    expect(match('zebra', words)).toBeNull()
  })

  it('단어 목록이 비어있으면 null을 반환한다', () => {
    expect(match('apple', [])).toBeNull()
  })

  it('빈 입력에도 null을 반환한다', () => {
    expect(match('', words)).toBeNull()
  })
})
