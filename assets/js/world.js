/** @format */
import Envelope from "./primitives/envelope"
import Polygon from "./primitives/polygon"

class World {
  constructor(graph, roadWidth = 100, roundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roundness
    this.roadBorders = []
    this.envelopes = []

    this.generate()
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segements) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((el) => el.poly))
  }

  draw(ctx) {
    this.envelopes.forEach((env) =>
      env.draw(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 })
    )
    this.graph.segements.forEach((seg) =>
      seg.draw(ctx, { color: "white", width: 4, dash: [10, 10] })
    )
    this.roadBorders.forEach((seg) =>
      seg.draw(ctx, { color: "white", width: 4 })
    )
  }
}

export default World
