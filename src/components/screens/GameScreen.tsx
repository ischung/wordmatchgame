import type { GameState } from '../../types'
import type { GameAction } from '../../hooks/useGameReducer'
import CountdownOverlay from '../CountdownOverlay'
import HUD from '../HUD'
import WordCanvas from '../WordCanvas'
import InputBar from '../InputBar'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export default function GameScreen({ state, dispatch }: Props) {
  const isCountdown = state.screen === 'countdown'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HUD timeLeft={state.timeLeft} score={state.score} />
      {isCountdown && <CountdownOverlay dispatch={dispatch} />}
      <WordCanvas
        words={state.words}
        matchedId={null}
        expiringIds={new Set()}
      />
      <InputBar
        words={state.words}
        disabled={isCountdown}
        dispatch={dispatch}
      />
    </div>
  )
}
