import type { WordItem } from '../types'
import styles from './WordItem.module.css'

interface Props {
  word: WordItem
  isMatched: boolean
  isExpiring: boolean
}

export default function WordItemComponent({ word, isMatched, isExpiring }: Props) {
  const cls = [
    styles.word,
    isMatched ? styles.matched : '',
    isExpiring ? styles.expiring : '',
  ].filter(Boolean).join(' ')

  return (
    <span
      className={cls}
      style={{
        '--word-x': `${word.x}%`,
        '--word-y': `${word.y}%`,
        '--fall-duration': `${word.lifespan}ms`,
      } as React.CSSProperties}
    >
      {word.text}
    </span>
  )
}
