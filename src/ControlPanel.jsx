import { useEffect, useState } from 'react'

const WINDOW_PERMISSION = {
  PENDING: 'prompt',
  DENIED: 'denied',
  GRANTED: 'granted',
}

export const ControlPanel = () => {
  const [windowPosition, setWindowPosition] = useState({
    x: 0,
    y: 0,
  })
  const [hasWindowPermission, setWindowPermission] = useState(false)

  const getPermission = async () => {
    await window.getScreenDetails()
  }
  const openNewWindow = async () => {
    window.open(`${location.origin}?id=1`, '_blank', 'width=400,height=400')
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
      <div>x: {windowPosition.x}</div>
      <div>y: {windowPosition.y}</div>
      {!hasWindowPermission ? (
        <button onClick={getPermission}>Get Permission</button>
      ) : (
        <button onClick={openNewWindow}>Open New Window</button>
      )}
    </div>
  )
}
