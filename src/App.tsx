import { useGameReducer } from './hooks/useGameReducer'
import ScreenManager from './components/ScreenManager'

export default function App() {
  const { state, dispatch } = useGameReducer()

  return <ScreenManager state={state} dispatch={dispatch} />
}
