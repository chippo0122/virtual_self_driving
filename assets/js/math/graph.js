/** @format */

// G = (V, E); Graph, V = Point, Node, E = Segements, Edges

class Graph {
  constructor(points = [], segements = []) {
    this.points = points
    this.segements = segements
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
}

export default Graph
