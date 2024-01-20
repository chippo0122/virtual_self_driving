/** @format */
import Envelope from "./primitives/envelope"
import Polygon from "./primitives/polygon"
import { scale, add, lerp, distance } from "./math/utils"
import Segement from "./primitives/segement"
import Point from "./primitives/point"
import Tree from "./items/tree"
import Building from "./items/building"

class World {
  constructor(
    graph,
    roadWidth = 100,
    roundness = 3,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50,
    treeSize = 160
  ) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roundness
    this.treeSize = treeSize

    this.buildingWidth = buildingWidth
    this.buildingMinLength = buildingMinLength
    this.spacing = spacing

    this.roadBorders = []
    this.envelopes = []
    this.buildings = []
    this.trees = []

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

    // 如果有重疊的房子必須移除
    const epsilon = 0.001
    for (let i = 0; i < bases.length; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (
          bases[i].intersectsPoly(bases[j]) ||
          bases[i].distanceToPoly(bases[j]) < this.spacing - epsilon
        ) {
          bases.splice(j, 1)
          j -= 1
        }
      }
    }

    return bases.map((el) => new Building(el))
  }

  #generateTrees() {
    //抓目前地圖飯範圍內所有的點
    const points = [
      ...this.roadBorders.map((s) => [s.p1, s.p2]).flat(),
      ...this.buildings.map((s) => s.base.points).flat(),
    ]
    // 取邊界
    const left = Math.min(...points.map((p) => p.x))
    const right = Math.max(...points.map((p) => p.x))
    const top = Math.min(...points.map((p) => p.y))
    const bottom = Math.max(...points.map((p) => p.y))

    const illegalPolys = [
      ...this.buildings.map((el) => el.base),
      ...this.envelopes.map((e) => e.poly),
    ]

    const trees = []
    let tryCount = 0
    while (tryCount < 100) {
      const p = new Point(
        lerp(left, right, Math.random()),
        lerp(bottom, top, Math.random())
      )
      let keep = true
      for (const poly of illegalPolys) {
        // 樹不應該在建築物或馬路上 或 靠他們太近
        if (
          poly.containsPoint(p) ||
          poly.distanceToPoint(p) < this.treeSize / 2
        ) {
          keep = false
          break
        }
      }

      // 樹不應該重疊
      if (keep) {
        for (const tree of trees) {
          if (distance(tree.center, p) < this.treeSize) {
            keep = false
            break
          }
        }
      }

      //  樹不應該離建築物或馬路太遠
      if (keep) {
        let closeToSomething = false
        for (const poly of illegalPolys) {
          if (poly.distanceToPoint(p) < this.treeSize * 2) {
            closeToSomething = true
            break
          }
        }
        keep = closeToSomething
      }

      if (keep) {
        trees.push(new Tree(p, this.treeSize))
        tryCount = 0
      }

      tryCount++
    }

    return trees
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segements) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness))
    }

    this.roadBorders = Polygon.union(this.envelopes.map((el) => el.poly))
    this.buildings = this.#generateBuildings()
    this.trees = this.#generateTrees()
  }

  draw(ctx, viewPoint) {
    this.envelopes.forEach((env) =>
      env.draw(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 })
    )
    this.graph.segements.forEach((seg) =>
      seg.draw(ctx, { color: "white", width: 4, dash: [10, 10] })
    )
    this.roadBorders.forEach((seg) =>
      seg.draw(ctx, { color: "white", width: 4 })
    )
    this.buildings.forEach((env) => {
      env.draw(ctx, viewPoint)
    })
    this.trees.forEach((p) => {
      p.draw(ctx, viewPoint)
    })
  }
}

export default World
