import type { GameState } from '../../types'
import type { GameAction } from '../../hooks/useGameReducer'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function ResultScreen({ state, dispatch }: Props) {
  return (
    <div>
      <h2>게임 종료</h2>
      <p>점수: {state.score}</p>
      <button onClick={() => dispatch({ type: 'RESTART' })}>
        다시 시작
      </button>
    </div>
  )
}
