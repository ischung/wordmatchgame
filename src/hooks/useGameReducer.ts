import { useReducer } from 'react'
import type { GameState, WordItem } from '../types'

// ── 액션 타입 ────────────────────────────────────────────────────────────────

type GameAction =
  | { type: 'START_COUNTDOWN' }
  | { type: 'START_PLAYING' }
  | { type: 'SPAWN_WORD'; word: WordItem }
  | { type: 'REMOVE_EXPIRED' }
  | { type: 'MATCH_WORD'; wordId: string; score: number }
  | { type: 'TICK' }
  | { type: 'END_GAME'; isNewBestScore: boolean }
  | { type: 'RESTART' }

// ── 초기 상태 ────────────────────────────────────────────────────────────────

const initialState: GameState = {
  screen: 'start',
  words: [],
  score: 0,
  timeLeft: 60,
  lastWord: null,
  isNewBestScore: false,
}

// ── 리듀서 ──────────────────────────────────────────────────────────────────

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_COUNTDOWN':
      return { ...state, screen: 'countdown' }

    case 'START_PLAYING':
      return { ...state, screen: 'playing' }

    case 'SPAWN_WORD':
      if (state.screen !== 'playing') return state
      if (state.words.length >= 5) return state
      return {
        ...state,
        words: [...state.words, action.word],
        lastWord: action.word.text,
      }

    case 'REMOVE_EXPIRED': {
      const now = Date.now()
      return {
        ...state,
        words: state.words.filter(w => w.createdAt + w.lifespan > now),
      }
    }

    case 'MATCH_WORD':
      return {
        ...state,
        words: state.words.filter(w => w.id !== action.wordId),
        score: state.score + action.score,
      }

    case 'TICK': {
      const next = state.timeLeft - 1
      if (next <= 0) {
        return { ...state, timeLeft: 0, screen: 'result', words: [] }
      }
      return { ...state, timeLeft: next }
    }

    case 'END_GAME':
      return {
        ...state,
        screen: 'result',
        words: [],
        isNewBestScore: action.isNewBestScore,
      }

    case 'RESTART':
      return { ...initialState, screen: 'countdown' }

    default:
      return state
  }
}

// ── 커스텀 훅 ────────────────────────────────────────────────────────────────

export function useGameReducer(timeLimitSec = 60) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    timeLeft: timeLimitSec,
  })

  return { state, dispatch }
}

export type { GameAction }
