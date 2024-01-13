/** @format */
import Envelope from "./primitives/envelope"
import Polygon from "./primitives/polygon"
import { scale, add } from "./math/utils"
import Segement from "./primitives/segement"

class World {
  constructor(
    graph,
    roadWidth = 100,
    roundness = 3,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50
  ) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roundness

    this.buildingWidth = buildingWidth
    this.buildingMinLength = buildingMinLength
    this.spacing = spacing

    this.roadBorders = []
    this.envelopes = []
    this.buildings = []

    this.generate()
  }

  #generateBuildings() {
    const temEnvelopes = []

    for (const seg of this.graph.segements) {
      temEnvelopes.push(
        new Envelope(
          seg,
          this.roadWidth + this.buildingWidth + this.spacing * 2,
          this.roadRoundness
        )
      )
    }

    const guides = Polygon.union(temEnvelopes.map((e) => e.poly))

    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i]
      if (seg.length() < this.buildingMinLength) {
        guides.splice(i, 1)
        i -= 1
      }
    }

    const supports = []
    for (let seg of guides) {
      const len = seg.length() + this.spacing
      const buildingCount = Math.floor(
        len / (this.buildingMinLength + this.spacing)
      ) // 算出一排要多少棟房子
      const buildingLength = len / buildingCount - this.spacing

      const dir = seg.directionVector() // segement方向

      // 同一線段上的拆解成多棟房子
      let q1 = seg.p1
      let q2 = add(q1, scale(dir, buildingLength))
      supports.push(new Segement(q1, q2))

      for (let i = 2; i <= buildingCount; i++) {
        q1 = add(q2, scale(dir, this.spacing))
        q2 = add(q1, scale(dir, buildingLength))
        supports.push(new Segement(q1, q2))
      }
    }

    const bases = []
    for (const seg of supports) {
      bases.push(new Envelope(seg, this.buildingWidth, 0).poly)
    }

    return bases
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segements) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((el) => el.poly))
    this.buildings = this.#generateBuildings()
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

    this.buildings.forEach((el) => {
      el.draw(ctx)
    })
  }
}

export default World
