import { Circle } from './Circle'
import { ControlPanel } from './ControlPanel'

export const App = () => {
  return (
    <div className="container">
      <ControlPanel />
      <Circle />
    </div>
  )
}
