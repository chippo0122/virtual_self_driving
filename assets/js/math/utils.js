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

const dot = (p1, p2) => {
  return p1.x * p2.x + p1.y * p2.y
}

const add = (p1, p2) => {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

const subtract = (p1, p2) => {
  // 畫布的中心為滑鼠與offset起點中間值
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

const normalize = (p) => {
  return scale(p, 1 / magnitude(p))
}

const magnitude = (p) => {
  return Math.hypot(p.x, p.y)
}

const scale = (p, scaler) => {
  return new Point(p.x * scaler, p.y * scaler)
}

const translate = (loc, angle, offset) => {
  return new Point(
    loc.x + Math.cos(angle) * offset,
    loc.y + Math.sin(angle) * offset
  )
}

const angle = (p) => {
  // Math.atan2() 返回从原点 (0,0) 到 (x,y) 点的线段与 x 轴正方向之间的平面角度 (弧度值)，也就是 Math.atan2(y,x)
  return Math.atan2(p.y, p.x)
}

const lerp = (a, b, t) => {
  return a + (b - a) * t
}

// 找交點 // 我看不懂
const getIntersection = (A, B, C, D) => {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

  const epsilon = 0.001
  if (Math.abs(bottom) > epsilon) {
    const t = tTop / bottom
    const u = uTop / bottom
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      }
    }
  }

  return null
}

const getRandomColor = () => {
  const hue = 290 + Math.random() * 260
  return `hsl(${hue}, 100%, 60%)`
}

const average = (p1, p2) => {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
}

export {
  getNearestPoint,
  add,
  distance,
  normalize,
  subtract,
  scale,
  lerp,
  dot,
  translate,
  angle,
  getIntersection,
  getRandomColor,
  average,
  magnitude,
}
