/** @format */
import Point from "./primitives/point"

class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.ctx = this.canvas.getContext("2d")

    this.selected = null

    this.#addEventListener()
  }

  #addEventListener() {
    this.canvas.addEventListener("mousedown", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY)
      this.graph.addPoint(mouse)
      this.selected = mouse
    })
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
  }
}

export default GraphEditor
