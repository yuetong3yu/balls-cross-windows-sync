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
    const { windowWidth, windowHeight, screenX, screenY } = screenPositions
    const left = windowWidth / 2 - 100
    const top = windowHeight / 2 - 100
    const topBarHeight = window.outerHeight - window.innerHeight
    const windowId = new URLSearchParams(window.location.search).get('id')

    // update main circle position
    if (windowHeight && windowHeight) {
      setCircles((c) => {
        c[0] = { left, top }
        return [...c]
      })
    }
    // save data in localStorage
    const circleData = {
      left,
      top,
      screenX,
      screenY,
      topBarHeight,
    }
    localStorage.setItem(windowId || '1', JSON.stringify(circleData))
  }, [screenPositions])

  return (
    <div className="container">
      <ControlPanel {...screenPositions} setCircles={setCircles} />
      {circles.map((c, i) => {
        return <CircleMemo {...c} key={i} />
      })}
    </div>
  )
}
