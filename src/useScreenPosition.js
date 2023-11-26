import { useState, useEffect } from 'react'
import { FIRST_WINDOW_ID, SECONDARY_WINDOW_ID } from './ControlPanel'

export const useScreenPosition = ({ circles, setCircles, windowId }) => {
  const [screenPosition, setScreenPosition] = useState({
    screenX: window.screenX,
    screenY: window.screenY,
  })

  // update
  useEffect(() => {
    const syncSecondaryWindow = () => {
      // get the other window data
      const windowData = JSON.parse(
        localStorage.getItem(
          windowId === FIRST_WINDOW_ID ? SECONDARY_WINDOW_ID : FIRST_WINDOW_ID
        )
      )
      // if the othder window exist, cram it in circle array
      setCircles((c) => {
        if (windowData) {
          c[1] = {
            left: windowData.left,
            top: windowData.top,
          }
          return [...c]
        }
        return [c[0]]
      })

      window.requestAnimationFrame(syncSecondaryWindow)
    }

    window.requestAnimationFrame(syncSecondaryWindow)
  }, [])

  // repeatly get window position in the screen
  useEffect(() => {
    const getCirclePosition = () => {
      setScreenPosition({
        screenX: window.screenX,
        screenY: window.screenY,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })

      window.requestAnimationFrame(getCirclePosition)
    }

    window.requestAnimationFrame(getCirclePosition)
  }, [])

  return screenPosition
}
