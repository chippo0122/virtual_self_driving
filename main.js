/** @format */
import GraphEditor from "./assets/js/graphEditor"
import Graph from "./assets/js/math/graph"
import Point from "./assets/js/primitives/point"
import Segement from "./assets/js/primitives/segement"
import ViewPort from "./assets/js/viewPort"
import "./style.scss"

CANVAS.width = 600
CANVAS.height = 600

const p1 = new Point(200, 200)
const p2 = new Point(150, 500)
const p3 = new Point(200, 400)
const p4 = new Point(100, 400)

const s1 = new Segement(p1, p2)
const s2 = new Segement(p2, p3)
const s3 = new Segement(p3, p4)
const s4 = new Segement(p1, p4)

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()
const viewport = new ViewPort(CANVAS)
const graphEditor = new GraphEditor(viewport, graph)

const animate = () => {
  viewport.reset()
  graphEditor.display()
  requestAnimationFrame(animate)
}

animate()

const disposeBtn = document.querySelector(".dispose-btn")
const saveBtn = document.querySelector(".save-btn")

const dispose = () => {
  graphEditor.dispose()
}

const save = () => {
  localStorage.setItem("graph", JSON.stringify(graph))
}

disposeBtn.addEventListener("click", dispose)
saveBtn.addEventListener("click", save)
