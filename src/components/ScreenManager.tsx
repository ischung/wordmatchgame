import type { GameState } from '../types'
import type { GameAction } from '../hooks/useGameReducer'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import ResultScreen from './screens/ResultScreen'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function ScreenManager({ state, dispatch }: Props) {
  switch (state.screen) {
    case 'start':
      return <StartScreen dispatch={dispatch} />

    case 'countdown':
    case 'playing':
      return <GameScreen state={state} dispatch={dispatch} />

    case 'result':
      return <ResultScreen state={state} dispatch={dispatch} />
  }
}
