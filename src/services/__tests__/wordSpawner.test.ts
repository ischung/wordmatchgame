import { describe, it, expect } from 'vitest'
import { spawn, removeExpired } from '../wordSpawner'
import type { WordItem } from '../../types'

describe('WordSpawner - spawn', () => {
  it('WordItem을 반환한다', () => {
    const word = spawn(null)
    expect(word).toHaveProperty('id')
    expect(word).toHaveProperty('text')
    expect(word.x).toBeGreaterThanOrEqual(10)
    expect(word.x).toBeLessThanOrEqual(90)
    expect(word.y).toBe(0)
  })

  it('lastWord와 동일한 단어를 제외한다', () => {
    // 1000번 시도해서 lastWord가 절대 나오지 않음을 검증
    const lastWord = 'apple'
    for (let i = 0; i < 1000; i++) {
      const word = spawn(lastWord)
      expect(word.text).not.toBe(lastWord)
    }
  })

  it('lastWord가 null이면 전체 목록에서 선택한다', () => {
    const word = spawn(null)
    expect(typeof word.text).toBe('string')
    expect(word.text.length).toBeGreaterThan(0)
  })
})

describe('WordSpawner - removeExpired', () => {
  function makeWord(id: string, lifespan: number, ageMs = 0): WordItem {
    return {
      id, text: id, x: 50, y: 0,
      createdAt: Date.now() - ageMs,
      lifespan,
    }
  }

  it('수명이 남은 단어는 유지한다', () => {
    const words = [makeWord('a', 5000, 100)]
    expect(removeExpired(words)).toHaveLength(1)
  })

  it('수명이 만료된 단어를 제거한다', () => {
    const words = [makeWord('a', 1000, 2000)] // 2초 전 생성, 수명 1초
    expect(removeExpired(words)).toHaveLength(0)
  })

  it('빈 배열을 처리한다', () => {
    expect(removeExpired([])).toHaveLength(0)
  })
})
