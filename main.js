/** @format */
import GraphEditor from "./assets/js/graphEditor"
import Graph from "./assets/js/math/graph"
import Point from "./assets/js/primitives/point"
import Segement from "./assets/js/primitives/segement"
import "./style.scss"

CANVAS.width = 600
CANVAS.height = 600

const ctx = CANVAS.getContext("2d")

const p1 = new Point(200, 200)
const p2 = new Point(150, 500)
const p3 = new Point(200, 400)
const p4 = new Point(100, 400)

const s1 = new Segement(p1, p2)
const s2 = new Segement(p2, p3)
const s3 = new Segement(p3, p4)
const s4 = new Segement(p1, p4)

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4])
const graphEditor = new GraphEditor(CANVAS, graph)

const animate = () => {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height)
  graphEditor.display()
  requestAnimationFrame(animate)
}

animate()
