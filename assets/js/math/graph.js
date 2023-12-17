/** @format */

// G = (V, E); Graph, V = Point, Node, E = Segements, Edges

class Graph {
  constructor(points = [], segements = []) {
    this.points = points
    this.segements = segements
  }

  pointsLength() {
    return this.points.length
  }

  segementsLength() {
    return this.segements.length
  }

  getPoint(index) {
    if (index > this.pointsLength() - 1) return null
    return this.points[index]
  }

  getSegement(index) {
    if (index > this.segementsLength() - 1) return null
    return this.segements[index]
  }

  draw(ctx) {
    for (const seg of this.segements) {
      // seg will be a instance of class Segement
      console.log(seg)
      seg.draw(ctx)
    }

    for (const point of this.points) {
      // point will be a instance of class Point
      console.log(point)
      point.draw(ctx)
    }
  }

  clear() {
    this.points = []
    this.segements = []
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point))
  }

  containsSegement(seg) {
    return this.segements.find((s) => s.equals(seg))
  }

  addPoint(point) {
    this.points.push(point)
  }

  tryAddPoint(point) {
    if (this.containsPoint(point)) return false

    this.addPoint(point)
    return true
  }

  addSegement(seg) {
    this.segements.push(seg)
  }

  tryAddSegement(seg) {
    if (this.containsSegement(seg) && !seg.p1.equals(seg.p2)) return false
    this.addSegement(seg)
    return true
  }

  removeSegement(seg) {
    this.segements.splice(this.segements.indexOf(seg), 1)
  }
}

export default Graph
