/** @format */
import Polygon from "../primitives/polygon"
import { scale, subtract, add } from "../math/utils"

class Building {
  constructor(poly, heightCoef = 0.3) {
    this.base = poly
    this.heightCoef = heightCoef
  }

  draw(ctx, viewPoint) {
    const topPoints = this.base.points.map((p) =>
      add(p, scale(subtract(p, viewPoint), this.heightCoef))
    )
    const ceiling = new Polygon(topPoints)
    const sides = []
    for (let i = 0; i < this.base.points.length; i++) {
      const nextI = (i + 1) % this.base.points.length
      const poly = new Polygon([
        this.base.points[i],
        this.base.points[nextI],
        topPoints[nextI],
        topPoints[i],
      ]) //連接底座跟屋頂的多邊形
      sides.push(poly)
    }

    // 離viewpoint比較遠的多邊形應該要先繪製，才能符合透視效果
    sides.sort(
      (a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
    )

    this.base.draw(ctx, { fill: "white", stroke: "#AAA" })
    sides.forEach((p) => p.draw(ctx, { fill: "white", stroke: "#AAA" }))
    ceiling.draw(ctx, { fill: "#edaea6", stroke: "#AAA" })
  }
}

export default Building
