/** @format */
import Envelope from "./primitives/envelope"

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
    this.graph.segements.forEach((seg) => {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    })
  }

  draw(ctx) {
    this.envelopes.forEach((env) => env.draw(ctx))
  }
}

export default World
