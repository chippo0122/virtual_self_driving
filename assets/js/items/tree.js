/** @format */
import Segement from "../primitives/segement"
import { add, subtract } from "../math/utils"

class Tree {
  constructor(center, size) {
    this.center = center
    this.size = size
  }

  draw(ctx, viewPoint) {
    //找到畫布的中心點，再設定樹的高度，算出立體的視覺效果
    const diff = subtract(this.center, viewPoint)
    this.center.draw(ctx, { size: this.size, color: "green" })

    const top = add(this.center, diff)
    new Segement(this.center, top).draw(ctx)
  }
}

export default Tree
