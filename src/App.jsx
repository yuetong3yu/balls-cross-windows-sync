import { useEffect, useState } from 'react'
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

  // when screen size changes, change circles positions
  useEffect(() => {
    const { windowWidth, windowHeight } = screenPositions
    if (windowHeight && windowHeight) {
      setCircles((c) => {
        c[0] = {
          left: windowWidth / 2 - 100,
          top: windowHeight / 2 - 100,
        }
        return [...c]
      })
    }
  }, [screenPositions])

  return (
    <div className="container">
      <ControlPanel {...screenPositions} />
      {circles.map((c, i) => {
        return <CircleMemo {...c} key={i} />
      })}
    </div>
  )
}
