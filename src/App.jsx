import { useState } from 'react'
import { CircleMemo } from './Circle'
import { ControlPanel } from './ControlPanel'
import { useScreenPosition } from './useScreenPosition'

export const App = () => {
  const [circles, setCircles] = useState([
    {
      left: 0,
      top: 0,
    },
  ])
  const screenPositions = useScreenPosition()

  return (
    <div className="container">
      <ControlPanel {...screenPositions} />
      {circles.map((c, i) => {
        return <CircleMemo {...c} key={i} />
      })}
    </div>
  )
}
