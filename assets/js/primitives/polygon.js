/** @format */

class Polygon {
  constructor(points) {
    this.points = points
  }

  draw(
    ctx,
    { stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)" } = {}
  ) {
    ctx.beginPath()
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.lineWidth = lineWidth
    ctx.moveTo(this.points[0].x, this.points[0].y)
    this.points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

export default Polygon
