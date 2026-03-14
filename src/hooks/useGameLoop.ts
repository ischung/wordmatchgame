import { useEffect, useRef } from 'react'
import type { Dispatch } from 'react'
import type { GameState } from '../types'
import type { GameAction } from './useGameReducer'
import { spawn } from '../services/wordSpawner'
import { getBestScore, saveBestScore } from '../services/localStorageService'

export function useGameLoop(state: GameState, dispatch: Dispatch<GameAction>) {
  // Ref로 최신 lastWord 추적 (interval이 stale closure 참조하지 않도록)
  const lastWordRef = useRef<string | null>(state.lastWord)
  const prevScreenRef = useRef<GameState['screen']>(state.screen)

  useEffect(() => {
    lastWordRef.current = state.lastWord
  }, [state.lastWord])

  // ── 게임 루프: TICK / SPAWN_WORD / REMOVE_EXPIRED ────────────────────────
  useEffect(() => {
    if (state.screen !== 'playing') return

    const tickInterval = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    const spawnInterval = setInterval(() => {
      dispatch({ type: 'SPAWN_WORD', word: spawn(lastWordRef.current) })
    }, 1500)

    const expireInterval = setInterval(() => {
      dispatch({ type: 'REMOVE_EXPIRED' })
    }, 500)

    return () => {
      clearInterval(tickInterval)
      clearInterval(spawnInterval)
      clearInterval(expireInterval)
    }
  }, [state.screen, dispatch])

  // ── 게임 종료 처리: 최고 점수 저장 + END_GAME dispatch ──────────────────
  useEffect(() => {
    if (prevScreenRef.current === 'playing' && state.screen === 'result') {
      const prev = getBestScore()
      const isNewBestScore = state.score > prev
      saveBestScore(state.score)
      dispatch({ type: 'END_GAME', isNewBestScore })
    }
    prevScreenRef.current = state.screen
  }, [state.screen, state.score, dispatch])
}
