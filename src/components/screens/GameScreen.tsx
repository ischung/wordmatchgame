import type { GameState } from '../../types'
import type { GameAction } from '../../hooks/useGameReducer'
import CountdownOverlay from '../CountdownOverlay'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function GameScreen({ state, dispatch }: Props) {
  const isCountdown = state.screen === 'countdown'

  return (
    <div>
      {isCountdown && <CountdownOverlay dispatch={dispatch} />}
      <p>남은 시간: {state.timeLeft}초</p>
      <p>점수: {state.score}</p>
      {/* InputBar는 #14에서 구현 — isCountdown을 disabled prop으로 전달 */}
      <input disabled={isCountdown} placeholder="단어를 입력하세요" />
    </div>
  )
}
