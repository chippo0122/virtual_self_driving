/** @format */
import Segement from "../primitives/segement"
import { getNearestPoint } from "../math/utils"

class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport
    this.canvas = viewport.canvas
    this.graph = graph

    this.ctx = this.canvas.getContext("2d")

    this.selected = null

    this.hovered = null

    this.dragging = false

    this.mouse = null

    // this.#addEventListener()
  }

  enable() {
    this.#addEventListener()
  }

  disable() {
    this.#removeEventListener()
    this.selected = false
    this.hovered = false
  }

  #addEventListener() {
    this.boundMouseDown = this.#handleMouseDown.bind(this)
    this.canvas.addEventListener("mousedown", this.boundMouseDown)

    this.boundMouseMove = this.#handleMouseMove.bind(this)
    this.canvas.addEventListener("mousemove", this.boundMouseMove)

    this.boundMouseUp = () => (this.dragging = false)
    this.canvas.addEventListener("mouseup", this.boundMouseUp)

    this.boundContextMenu = (e) => e.preventDefault()
    this.canvas.addEventListener("contextmenu", this.boundContextMenu)
  }

  #removeEventListener() {
    this.canvas.removeEventListener("mousedown", this.boundMouseDown)

    this.canvas.removeEventListener("mousemove", this.boundMouseMove)

    this.canvas.removeEventListener("mouseup", this.boundMouseUp)

    this.canvas.removeEventListener("contextmenu", this.boundContextMenu)
  }

  #handleMouseMove(e) {
    this.mouse = this.viewport.getMouse(e, true)

    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      15 * this.viewport.zoom
    )

    if (this.dragging == true) {
      this.selected.x = this.mouse.x
      this.selected.y = this.mouse.y
    }
  }

  #handleMouseDown(e) {
    if (e.button == 2) {
      // right click
      if (this.selected) {
        this.selected = null
      } else if (this.hovered) {
        this.#removePoint(this.hovered)
      }
    }

    if (e.button == 0) {
      this.mouse = this.viewport.getMouse(e, true)

      if (this.hovered) {
        // build a new segement between two existing point
        this.#select(this.hovered)
        this.selected = this.hovered
        this.dragging = true
        return
      }

      this.graph.addPoint(this.mouse)

      //build a segement base on previous selected point and current one
      this.#select(this.mouse)

      this.selected = this.mouse
      this.hovered = this.mouse
    }
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegement(new Segement(this.selected, point))
    }
  }

  #removePoint(point) {
    this.graph.removePoint(point)
    this.hovered = null

    if (this.selected == point) {
      this.selected = null
    }
  }

  dispose() {
    this.graph.depose()
    this.selected = null
    this.hovered = null
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.selected) {
      const intnet = this.hovered ? this.hovered : this.mouse
      new Segement(intnet, this.selected).draw(this.ctx, { dash: [3, 3] })
      this.selected.draw(this.ctx, { outline: true })
    }

    if (this.hovered && this.hovered !== this.selected) {
      this.hovered.draw(this.ctx, { fill: true })
    }
  }
}

export default GraphEditor
