/** @format */

import { scale, subtract, add } from "../math/utils"

class Building {
  constructor(poly, heightCoef = 0.4) {
    this.base = poly
    this.heightCoef = heightCoef
  }

  draw(ctx, viewPoint) {
    const topPoints = this.base.points.map((p) =>
      add(p, scale(subtract(p, viewPoint)), this.heightCoef)
    )
    this.base.draw(ctx, { fill: "white", stroke: "#AAA" })
  }
}

export default Building
