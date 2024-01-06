/** @format */
import GraphEditor from "./assets/js/graphEditor"
import Graph from "./assets/js/math/graph"
import ViewPort from "./assets/js/viewPort"
import World from "./assets/js/world"
import "./style.scss"

CANVAS.width = 600
CANVAS.height = 600

const ctx = CANVAS.getContext("2d")

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()

const world = new World(graph, 100, 3)

const viewport = new ViewPort(CANVAS)
const graphEditor = new GraphEditor(viewport, graph)

const animate = () => {
  viewport.reset()
  world.generate()
  world.draw(ctx)
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
