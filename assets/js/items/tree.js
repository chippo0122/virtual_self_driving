/** @format */
import { add, lerp, lerp2D, scale, subtract, translate } from "../math/utils"
import Polygon from "../primitives/polygon"

class Tree {
  constructor(center, size, heightCoef = 0.3) {
    this.center = center
    this.size = size
    this.heightCoef = heightCoef
    this.base = this.#generateLevel(center, size)
  }

  #generateLevel(point, size) {
    const points = []
    const rad = size / 2
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      // kindaOfRandom透過不同的參數製造出看似亂數，但由於純函數的特性讓，同樣參數組合的回傳值會相同
      // 進而能保持不同位置樹的樣式
      const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2
      const noisyRadius = rad * lerp(0.5, 1, kindOfRandom)
      points.push(translate(point, a, noisyRadius))
    }
    return new Polygon(points)
  }

  draw(ctx, viewPoint) {
    //找到畫布的中心點，再設定樹的高度，算出立體的視覺效果
    const diff = subtract(this.center, viewPoint)

    const top = add(this.center, scale(diff, this.heightCoef))

    const levelCount = 7
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1)
      const point = lerp2D(this.center, top, t)
      const color = `rgba(30, ${lerp(50, 200, t)}, 70)`
      const size = lerp(this.size, 40, t)
      const poly = this.#generateLevel(point, size)
      poly.draw(ctx, { fill: color, stroke: "rgba(0,0,0,0)" })
    }
  }
}

export default Tree
