import { useEffect, useRef, useState } from 'react'
import type { WordItem } from '../types'
import type { GameAction } from '../hooks/useGameReducer'
import { match } from '../services/inputMatcher'
import { calcScore } from '../services/scoreManager'
import styles from './InputBar.module.css'

interface Props {
  words: WordItem[]
  disabled: boolean
  dispatch: React.Dispatch<GameAction>
}

export default function InputBar({ words, disabled, dispatch }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // 자동 포커스 — disabled가 해제(playing)될 때
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()

    const input = value.trim()
    if (!input) return

    dispatch({ type: 'ATTEMPT' })
    const matched = match(input, words)
    if (matched) {
      dispatch({
        type: 'MATCH_WORD',
        wordId: matched.id,
        score: calcScore(matched.text),
      })
    }
    setValue('')
  }

  return (
    <footer className={styles.bar}>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        disabled={disabled}
        placeholder="단어를 입력하고 Enter 또는 Space"
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
      />
    </footer>
  )
}
