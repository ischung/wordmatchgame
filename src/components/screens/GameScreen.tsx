import type { GameState } from '../../types'
import type { GameAction } from '../../hooks/useGameReducer'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function GameScreen({ state }: Props) {
  return (
    <div>
      <p>남은 시간: {state.timeLeft}초</p>
      <p>점수: {state.score}</p>
      {state.screen === 'countdown' && <p>준비...</p>}
    </div>
  )
}
