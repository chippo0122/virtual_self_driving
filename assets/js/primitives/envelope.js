/** @format */

import Polygon from "./polygon"
import { subtract, angle, translate } from "../math/utils"

class Envelope {
  constructor(skeleton, width, roundness) {
    this.skeleton = skeleton
    this.poly = this.#generatePolygon(width, roundness)
  }

  #generatePolygon(width, roundness = 10) {
    const { p1, p2 } = this.skeleton

    const radius = width / 2

    //計算長方形要轉角的角度
    const alpha = angle(subtract(p1, p2))
    const alpha_cw = alpha + Math.PI / 2 // 順時針
    const alpha_ccw = alpha - Math.PI / 2 // 逆時針

    // 長方形邊上的圓角
    const step = Math.PI / Math.max(1, roundness)
    const points = []
    const epsilon = step / 2 // 矯正精度
    for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
      points.push(translate(p1, i, radius))
    }
    for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
      points.push(translate(p2, Math.PI + i, radius))
    }

    return new Polygon(points)
  }

  draw(ctx) {
    this.poly.draw(ctx)
  }
}

export default Envelope
