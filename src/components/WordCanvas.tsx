import { useEffect, useState } from 'react'
import type { WordItem } from '../types'
import WordItemComponent from './WordItemComponent'
import styles from './WordCanvas.module.css'

interface Props {
  words: WordItem[]          // current words in state (max 5)
  matchedId: string | null   // ID of just-matched word (cleared by parent after 350ms)
  expiringIds: Set<string>   // IDs of words that are about to expire
}

export default function WordCanvas({ words, matchedId, expiringIds }: Props) {
  // Keep "leaving" words visible during their exit animation
  const [leavingWords, setLeavingWords] = useState<WordItem[]>([])

  useEffect(() => {
    // When a word is matched, hold it for 350ms then drop
    if (matchedId) {
      const matched = words.find(w => w.id === matchedId)
        ?? leavingWords.find(w => w.id === matchedId)
      if (matched && !leavingWords.find(w => w.id === matched.id)) {
        setLeavingWords(prev => [...prev, matched])
        setTimeout(() => {
          setLeavingWords(prev => prev.filter(w => w.id !== matched.id))
        }, 380)
      }
    }
  }, [matchedId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Combine active + leaving (deduplicated by id)
  const activeIds = new Set(words.map(w => w.id))
  const visibleWords = [
    ...words,
    ...leavingWords.filter(w => !activeIds.has(w.id)),
  ]

  return (
    <div className={styles.canvas}>
      {visibleWords.map(word => (
        <WordItemComponent
          key={word.id}
          word={word}
          isMatched={word.id === matchedId}
          isExpiring={expiringIds.has(word.id)}
        />
      ))}
    </div>
  )
}
