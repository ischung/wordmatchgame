import type { GameAction } from '../../hooks/useGameReducer'
import { getBestScore } from '../../services/localStorageService'
import styles from './StartScreen.module.css'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

export default function StartScreen({ dispatch }: Props) {
  const bestScore = getBestScore()

  return (
    <div className={styles.screen}>
      <h1 className={styles.logo}>Word Match</h1>

      <div className={styles.bestScore}>
        <span className={styles.bestLabel}>최고 점수</span>
        <span className={styles.bestValue}>{bestScore}점</span>
      </div>

      <button
        className={styles.btn}
        onClick={() => dispatch({ type: 'START_COUNTDOWN' })}
      >
        시작
      </button>
    </div>
  )
}
