import { useState, useEffect } from 'react'

export const useScreenPosition = () => {
  const [screenPosition, setScreenPosition] = useState({
    screenX: window.screenX,
    screenY: window.screenY,
  })

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
