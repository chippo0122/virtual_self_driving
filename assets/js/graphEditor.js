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

    this.dragging = false

    this.#addEventListener()
  }

  #addEventListener() {
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button == 2 && this.hovered) {
        // right click
        this.#removePoint(this.hovered)
      }

      if (e.button == 0) {
        const mouse = new Point(e.offsetX, e.offsetY)

        if (this.hovered) {
          this.selected = this.hovered
          this.dragging = true
          return
        }

        this.graph.addPoint(mouse)
        this.selected = mouse
        this.hovered = mouse
      }
    })

    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY)

      this.hovered = getNearestPoint(mouse, this.graph.points, 15)

      if (this.dragging == true) {
        this.selected.x = mouse.x
        this.selected.y = mouse.y
      }
    })

    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false
    })

    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
  }

  #removePoint(point) {
    this.graph.removePoint(point)
    this.hovered = null

    if (this.selected == point) {
      this.selected = null
    }
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }

    if (this.hovered && this.hovered !== this.selected) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}

export default GraphEditor
