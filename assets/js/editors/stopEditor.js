/** @format */
import { getNearestSegements } from "../math/utils"

class StopEditor {
  constructor(viewport, world) {
    this.world = world
    this.viewport = viewport

    this.canvas = viewport.canvas
    this.ctx = this.canvas.getContext("2d")

    this.mouse = null
    this.intent = null
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

    this.boundContextMenu = (e) => e.preventDefault()
    this.canvas.addEventListener("contextmenu", this.boundContextMenu)
  }

  #removeEventListener() {
    this.canvas.removeEventListener("mousedown", this.boundMouseDown)

    this.canvas.removeEventListener("mousemove", this.boundMouseMove)

    this.canvas.removeEventListener("contextmenu", this.boundContextMenu)
  }

  #handleMouseMove(e) {
    this.mouse = this.viewport.getMouse(e, true)

    const seg = getNearestSegements(
      this.mouse,
      this.world.graph.segements,
      15 * this.viewport.zoom
    )

    if (seg) {
      this.intent = seg
    } else {
      this.intent = null
    }
  }

  #handleMouseDown(e) {}

  display() {
    if (this.intent) {
      this.intent.draw(this.ctx)
    }
  }
}

export default StopEditor
