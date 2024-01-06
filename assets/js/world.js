/** @format */
import Envelope from "./primitives/envelope"
import Polygon from "./primitives/polygon"

class World {
  constructor(graph, roadWidth = 100, roundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roundness
    this.envelopes = []

    this.generate()
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segements) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    }

    this.intersections = Polygon.break(
      this.envelopes[0].poly,
      this.envelopes[1].poly
    )
  }

  draw(ctx) {
    this.envelopes.forEach((env) => env.draw(ctx))
    this.intersections.forEach((int) =>
      int.draw(ctx, { color: "red", size: 15 })
    )
  }
}

export default World
