/** @format */

const getNearestPoint = (loc, points, threshold = Number.MAX_SAFE_INTEGER) => {
  let minDist = Number.MAX_SAFE_INTEGER
  let nereast = null

  points.forEach((point) => {
    const dist = distance(point, loc)
    if (dist < minDist && dist < threshold) {
      minDist = dist
      nereast = point
    }
  })

  return nereast
}

const distance = (p1, p2) => {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

export { getNearestPoint }
