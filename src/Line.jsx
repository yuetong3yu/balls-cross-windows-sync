export const Line = ({ circles }) => {
  if (circles.length !== 2) return null

  const x = circles[0].left - circles[1].left
  const y = circles[0].top - circles[1].top
  const lineWidth = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const deg = (Math.atan2(y, x) * 180) / Math.PI + 180

  return (
    <>
      <div
        className="line"
        style={{
          width: lineWidth,
          transform: `rotate(${deg}deg)`,
        }}
      ></div>
    </>
  )
}
