/** @format */
import Point from "./primitives/point"
import { getNearestPoint } from "./math/utils"

class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.ctx = this.canvas.getContext("2d")

    this.selected = null

    this.hovered = null

    this.#addEventListener()
  }

  #addEventListener() {
    // this.canvas.addEventListener("mousedown", (e) => {
    //   const mouse = new Point(e.offsetX, e.offsetY)

    //   // get nereast point when cursor is around that
    //   this.hovered = getNearestPoint(mouse, this.graph.points, 10)

    //   if (this.hovered) {
    //     this.selected = this.hovered
    //     return
    //   }

    //   this.graph.addPoint(mouse)
    //   this.selected = mouse
    // })
    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY)

      this.hovered = getNearestPoint(mouse, this.graph.points, 10)
    })
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }

    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}

export default GraphEditor
