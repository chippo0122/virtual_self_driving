/** @format */

import Point from "./point"
import Segement from "./segement"
import { getIntersection, getRandomColor, average } from "../math/utils"

class Polygon {
  constructor(points) {
    this.points = points
    this.segements = []

    for (let i = 1; i <= points.length; i++) {
      this.segements.push(
        new Segement(points[i - 1], points[i % points.length])
      )
    }
  }

  static union(polys) {
    Polygon.multiBreak(polys)
    const keptSegements = []
    for (let i = 0; i < polys.length; i++) {
      for (const seg of polys[i].segements) {
        let keep = true
        for (let j = 0; j < polys.length; j++) {
          if (i !== j) {
            if (polys[j].containsSegement(seg)) {
              keep = false
              break
            }
          }
        }

        if (keep) {
          keptSegements.push(seg)
        }
      }
    }

    return keptSegements
  }

  static multiBreak(polys) {
    for (let i = 0; i < polys.length; i++) {
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j])
      }
    }
  }

  static break(poly1, poly2) {
    const segs1 = poly1.segements
    const segs2 = poly2.segements

    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const int = getIntersection(
          segs1[i].p1,
          segs1[i].p2,
          segs2[j].p1,
          segs2[j].p2
        )

        if (int && int.offset != 1 && int.offset != 0) {
          const point = new Point(int.x, int.y)
          // 移除於相交點內的segement
          let aux = segs1[i].p2
          segs1[i].p2 = point //替換segement的端點為相交處
          segs1.splice(i + 1, 0, new Segement(point, aux))

          aux = segs2[j].p2
          segs2[j].p2 = point //替換segement的端點為相交處
          segs2.splice(j + 1, 0, new Segement(point, aux))
        }
      }
    }
  }

  containsSegement(seg) {
    const midpoint = average(seg.p1, seg.p2)
    return this.containsPoint(midpoint)
  }

  containsPoint(point) {
    // 原理：outerpoint為極遠座標作為參照，若在多邊形內的座標，其與多邊形邊界的交叉次數必為奇數
    // 見2:43:38
    const outerPoint = new Point(-1000, -1000)
    let intersectionCount = 0
    for (const seg of this.segements) {
      const int = getIntersection(outerPoint, point, seg.p1, seg.p2)
      if (int) {
        intersectionCount += 1
      }
    }
    return intersectionCount % 2 == 1
  }

  drawSegement(ctx) {
    for (const seg of this.segements) {
      seg.draw(ctx, { color: getRandomColor(), width: 5 })
    }
  }

  draw(
    ctx,
    { stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)" } = {}
  ) {
    ctx.beginPath()
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.lineWidth = lineWidth
    ctx.moveTo(this.points[0].x, this.points[0].y)
    this.points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

export default Polygon
