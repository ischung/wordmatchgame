import { describe, it, expect } from 'vitest'
import { calcScore, calcResult } from '../scoreManager'

describe('ScoreManager - calcScore', () => {
  it('1~3자 단어는 1점', () => {
    expect(calcScore('hi')).toBe(1)
    expect(calcScore('cat')).toBe(1)
  })

  it('4~6자 단어는 2점', () => {
    expect(calcScore('love')).toBe(2)
    expect(calcScore('hearts')).toBe(2)
  })

  it('7자 이상 단어는 3점', () => {
    expect(calcScore('quickly')).toBe(3)
    expect(calcScore('beautiful')).toBe(3)
  })
})

describe('ScoreManager - calcResult', () => {
  it('정확도를 올바르게 계산한다', () => {
    const result = calcResult(10, 3, 5)
    expect(result.score).toBe(10)
    expect(result.correctCount).toBe(3)
    expect(result.totalCount).toBe(5)
    expect(result.accuracy).toBe(60)
  })

  it('total이 0이면 accuracy는 0이다', () => {
    const result = calcResult(0, 0, 0)
    expect(result.accuracy).toBe(0)
  })

  it('모두 맞히면 accuracy는 100이다', () => {
    const result = calcResult(5, 5, 5)
    expect(result.accuracy).toBe(100)
  })
})
