import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getBestScore, saveBestScore } from '../localStorageService'

// jsdom 환경에서 localStorage가 완전히 지원되지 않는 경우를 대비한 mock
const store: Record<string, string> = {}
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value },
  removeItem: (key: string) => { delete store[key] },
  clear: () => { Object.keys(store).forEach(k => delete store[k]) },
}

vi.stubGlobal('localStorage', localStorageMock)

describe('LocalStorageService', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('값이 없으면 0을 반환한다', () => {
    expect(getBestScore()).toBe(0)
  })

  it('저장된 점수를 반환한다', () => {
    localStorageMock.setItem('wm_best_score', '42')
    expect(getBestScore()).toBe(42)
  })

  it('현재 최고 점수보다 높을 때만 저장한다', () => {
    saveBestScore(10)
    expect(getBestScore()).toBe(10)

    saveBestScore(5)   // 낮으므로 저장 안 됨
    expect(getBestScore()).toBe(10)

    saveBestScore(20)  // 높으므로 저장
    expect(getBestScore()).toBe(20)
  })

  it('같은 점수는 저장하지 않는다', () => {
    saveBestScore(10)
    saveBestScore(10)
    expect(getBestScore()).toBe(10)
  })
})
