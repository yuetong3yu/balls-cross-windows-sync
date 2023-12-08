import { useEffect, useState } from 'react'
import { CircleMemo } from './Circle'
import {
  ControlPanel,
  FIRST_WINDOW_ID,
  SECONDARY_WINDOW_ID,
} from './ControlPanel'
import { useScreenPosition } from './useScreenPosition'
import { Line } from './Line'

export const App = () => {
  const [circles, setCircles] = useState([
    {
      left: 0,
      top: 0,
    },
  ])
  const windowId =
    new URLSearchParams(window.location.search).get('id') || FIRST_WINDOW_ID
  const screenPositions = useScreenPosition({ circles, setCircles, windowId })

  // when screen size changes, change circles positions
  useEffect(() => {
    const { windowWidth, windowHeight, screenX, screenY } = screenPositions
    const left = windowWidth / 2 - 100
    const top = windowHeight / 2 - 100
    const topBarHeight = window.outerHeight - window.innerHeight

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
    localStorage.setItem(windowId, JSON.stringify(circleData))
  }, [screenPositions])

  // remove localStorage when page is unmounted
  useEffect(() => {
    window.onunload = () => {
      if (windowId == SECONDARY_WINDOW_ID) {
        localStorage.clear(windowId)
      }
    }
  }, [])

  return (
    <div className="container">
      <ControlPanel {...screenPositions} />
      {circles.map((c, i) => {
        return <CircleMemo {...c} key={i} />
      })}
      <Line circles={circles} />
    </div>
  )
}
