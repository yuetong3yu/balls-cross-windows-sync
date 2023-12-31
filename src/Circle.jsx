import { memo } from 'react'

const Circle = ({ left, top }) => {
  return (
    <div
      className="circle"
      style={{
        left,
        top,
      }}
    ></div>
  )
}

export const CircleMemo = memo(Circle)
