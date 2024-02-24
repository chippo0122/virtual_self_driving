/** @format */
import GraphEditor from "./assets/js/editors/graphEditor"
import StopEditor from "./assets/js/editors/stopEditor"
import Graph from "./assets/js/math/graph"
import { scale } from "./assets/js/math/utils"
import ViewPort from "./assets/js/viewPort"
import World from "./assets/js/world"
import "./style.scss"

CANVAS.width = 600
CANVAS.height = 600

const ctx = CANVAS.getContext("2d")

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()

const world = new World(graph, 100, 10)

const viewport = new ViewPort(CANVAS)
const graphEditor = new GraphEditor(viewport, graph)
const stopEditor = new StopEditor(viewport, world)

let oldHashGraph = graph.hash()

const animate = () => {
  viewport.reset()
  if (graph.hash() !== oldHashGraph) {
    world.generate()
    oldHashGraph = graph.hash()
  }
  // 抓取中心點
  const viewPoint = scale(viewport.getOffset(), -1)
  world.draw(ctx, viewPoint)
  ctx.globalAlpha = 0.3
  graphEditor.display()
  stopEditor.display()
  requestAnimationFrame(animate)
}

animate()

const disposeBtn = document.querySelector(".dispose-btn")
const saveBtn = document.querySelector(".save-btn")
const graphBtn = document.querySelector("#graphBtn")
const stopBtn = document.querySelector("#stopBtn")

const setMode = (mode) => {
  disableEditors()
  switch (mode) {
    case "graph":
      stopBtn.disabled = false
      graphEditor.enable()
      break
    case "stop":
      graphBtn.disabled = false
      stopEditor.enable()
      break
  }
}

const disableEditors = () => {
  graphEditor.disable()
  graphBtn.disabled = true
  stopBtn.disabled = true
  stopEditor.disable()
}

const dispose = () => {
  graphEditor.dispose()
}

const save = () => {
  localStorage.setItem("graph", JSON.stringify(graph))
}

setMode("graph")

disposeBtn.addEventListener("click", dispose)
saveBtn.addEventListener("click", save)
stopBtn.addEventListener("click", () => setMode("stop"))
graphBtn.addEventListener("click", () => setMode("graph"))
