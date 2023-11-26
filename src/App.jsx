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
  const { screenX, screenY } = useScreenPosition()

  console.log(screenX, screenY)

  return (
    <div className="container">
      <ControlPanel />
      {circles.map((c, i) => {
        return <CircleMemo {...c} key={i} />
      })}
    </div>
  )
}
