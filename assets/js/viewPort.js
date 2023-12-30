/** @format */
import Point from "./primitives/point"
import { subtract, add, scale } from "./math/utils"

class ViewPort {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")

    this.zoom = 1
    this.center = new Point(this.canvas.width / 2, this.canvas.height / 2)
    this.offset = scale(this.center, -1)

    // handle drag to move graph viewport event
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    }

    this.#addEventListener()
  }

  reset() {
    this.ctx.restore()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.save()
    this.ctx.translate(this.center.x, this.center.y)
    this.ctx.scale(1 / this.zoom, 1 / this.zoom)
    const offset = this.getOffset()
    this.ctx.translate(offset.x, offset.y)
  }

  getOffset() {
    return add(this.offset, this.drag.offset)
  }

  getMouse(e, subtractDragOffset = false) {
    const p = new Point(
      // 滑鼠減去中心位置與x, y軸位移
      (e.offsetX - this.center.x) * this.zoom - this.offset.x,
      (e.offsetY - this.center.y) * this.zoom - this.offset.y
    )

    return subtractDragOffset ? subtract(p, this.drag.offset) : p
  }

  #addEventListener() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#handleMouseWheel.bind(this)
    )
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this))
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this))
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this))
  }

  #handleMouseWheel(e) {
    const direction = Math.sign(e.deltaY)
    const step = 0.1
    this.zoom += direction * step
    this.zoom = Math.max(1, Math.min(5, this.zoom)) // set zoom range to 1 - 5
  }

  #handleMouseDown(e) {
    if (e.button === 2 || e.button === 1) {
      this.drag.start = this.getMouse(e)
      this.drag.active = true
    }
  }

  #handleMouseUp(e) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset)
    }
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    }
  }

  #handleMouseMove(e) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e)
      this.drag.offset = subtract(this.drag.end, this.drag.start)
    }
  }
}

export default ViewPort
