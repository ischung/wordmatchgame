import { useGameReducer } from './hooks/useGameReducer'
import { useGameLoop } from './hooks/useGameLoop'
import ScreenManager from './components/ScreenManager'

export default function App() {
  const { state, dispatch } = useGameReducer()
  useGameLoop(state, dispatch)

  return <ScreenManager state={state} dispatch={dispatch} />
}
