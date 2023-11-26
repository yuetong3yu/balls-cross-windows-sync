import { useEffect, useState } from 'react'

export const SECONDARY_WINDOW_ID = '2'

const WINDOW_PERMISSION = {
  PENDING: 'prompt',
  DENIED: 'denied',
  GRANTED: 'granted',
}

export const ControlPanel = ({
  screenX,
  screenY,
  windowWidth,
  windowHeight,
  setCircles,
}) => {
  const [hasWindowPermission, setWindowPermission] = useState(false)
  const isSecondaryWindow = (() => {
    const windowID = new URLSearchParams(window.location.search).get('id')
    return windowID && windowID == SECONDARY_WINDOW_ID
  })()

  const getPermission = async () => {
    await window.getScreenDetails()
  }
  const openNewWindow = async () => {
    window.open(
      `${location.origin}?id=${SECONDARY_WINDOW_ID}`,
      '_blank',
      `width=400,height=400,screenX=${screenX + windowWidth},screenY=${screenY}`
    )
  }

  // get permission status
  useEffect(() => {
    const getWindowPermissionStatus = async () => {
      const { state } = await navigator.permissions.query({
        name: 'window-management',
      })

      setWindowPermission(state === WINDOW_PERMISSION.GRANTED)
    }

    getWindowPermissionStatus()
  }, [])

  return (
    <div className="control-panel">
      <div>x: {screenX}</div>
      <div>y: {screenY}</div>
      <div>width: {windowWidth}</div>
      <div>heigth: {windowHeight}</div>
      {!hasWindowPermission && (
        <button onClick={getPermission}>Get Permission</button>
      )}
      {!isSecondaryWindow && (
        <button onClick={openNewWindow}>Open New Window</button>
      )}
    </div>
  )
}
