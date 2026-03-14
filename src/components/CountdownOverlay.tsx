import { useEffect, useState } from 'react'
import type { GameAction } from '../hooks/useGameReducer'
import styles from './CountdownOverlay.module.css'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

const START = 3

export default function CountdownOverlay({ dispatch }: Props) {
  const [count, setCount] = useState(START)
  // key를 바꿔서 매 숫자마다 애니메이션을 재시작한다
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (count <= 0) {
      dispatch({ type: 'START_PLAYING' })
      return
    }

    const id = setTimeout(() => {
      setCount(c => c - 1)
      setAnimKey(k => k + 1)
    }, 1000)

    return () => clearTimeout(id)
  }, [count, dispatch])

  if (count <= 0) return null

  return (
    <div className={styles.overlay}>
      <span key={animKey} className={styles.number}>
        {count}
      </span>
    </div>
  )
}
