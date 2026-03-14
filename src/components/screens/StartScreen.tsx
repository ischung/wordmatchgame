import type { GameAction } from '../../hooks/useGameReducer'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

export default function StartScreen({ dispatch }: Props) {
  return (
    <div>
      <h1>Word Match</h1>
      <button onClick={() => dispatch({ type: 'START_COUNTDOWN' })}>
        시작
      </button>
    </div>
  )
}
