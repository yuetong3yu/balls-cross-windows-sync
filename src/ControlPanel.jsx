import { useEffect, useState } from 'react'

export const ControlPanel = () => {
  const [windowPosition, setWindowPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const getCirclePosition = () => {
      const x = window.screenX
      const y = window.screenY
      setWindowPosition({ x, y })

      window.requestAnimationFrame(getCirclePosition)
    }

    window.requestAnimationFrame(getCirclePosition)
  }, [])

  return (
    <div className="control-panel">
      <div>x: {windowPosition.x}</div>
      <div>y: {windowPosition.y}</div>
      <div className="buttons-container">
        {/* <button onClick={getPermission}>Get Permission</button>
        <button onClick={getScreenXandY}>Get screenX and screenY</button> */}
      </div>
    </div>
  )
}
