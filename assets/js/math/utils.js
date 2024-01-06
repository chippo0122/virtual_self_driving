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

export { getNearestPoint, add, subtract, scale, translate, angle }
