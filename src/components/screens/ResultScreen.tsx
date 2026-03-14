import type { GameState } from '../../types'
import type { GameAction } from '../../hooks/useGameReducer'
import { getBestScore } from '../../services/localStorageService'
import { calcResult } from '../../services/scoreManager'
import styles from './ResultScreen.module.css'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function ResultScreen({ state, dispatch }: Props) {
  const bestScore = getBestScore()
  const result = calcResult(state.score, state.correctCount, state.totalAttempts)

  return (
    <div className={styles.screen}>
      <h2 className={styles.title}>게임 종료</h2>

      <div className={styles.stats}>
        <span className={styles.score}>{result.score}점</span>
        <span className={styles.stat}>
          정확도 {result.accuracy}% ({result.correctCount}/{result.totalCount})
        </span>
        <span className={styles.best}>최고 점수: {bestScore}점</span>
      </div>

      {state.isNewBestScore && (
        <p className={styles.newBest}>🎉 새 최고 기록!</p>
      )}

      <button
        className={styles.btn}
        onClick={() => dispatch({ type: 'RESTART' })}
      >
        다시 시작
      </button>
    </div>
  )
}
