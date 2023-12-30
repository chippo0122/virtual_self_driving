/** @format */
import Point from "../primitives/point"

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

const add = (p1, p2) => {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

const subtract = (p1, p2) => {
  // 畫布的中心為滑鼠與offset起點中間值
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

const scale = (p, scaler) => {
  return new Point(p.x * scaler, p.y * scaler)
}

export { getNearestPoint, add, subtract, scale }
