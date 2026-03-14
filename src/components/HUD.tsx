import styles from './HUD.module.css'

interface Props {
  timeLeft: number
  score: number
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function HUD({ timeLeft, score }: Props) {
  const isDanger = timeLeft <= 10

  return (
    <header className={styles.hud}>
      <span className={`${styles.timer}${isDanger ? ` ${styles.danger}` : ''}`}>
        {formatTime(timeLeft)}
      </span>
      <span className={styles.score}>{score}점</span>
    </header>
  )
}
