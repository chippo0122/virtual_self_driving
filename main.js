/** @format */
import Graph from "./assets/js/math/graph"
import Point from "./assets/js/primitives/point"
import Segement from "./assets/js/primitives/segement"
import "./style.scss"

CANVAS.width = 600
CANVAS.height = 600

const ctx = CANVAS.getContext("2d")
const addPointBtn = document.querySelector("#controls .add-point")
const addSegementBtn = document.querySelector("#controls .add-segement")
const removeSegementBtn = document.querySelector("#controls .remove-segement")

const p1 = new Point(200, 200)
const p2 = new Point(150, 500)
const p3 = new Point(200, 400)
const p4 = new Point(100, 400)

const s1 = new Segement(p1, p2)
const s2 = new Segement(p2, p3)
const s3 = new Segement(p3, p4)
const s4 = new Segement(p1, p4)

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4])

graph.draw(ctx)

const addRandomPoint = () => {
  const isAdd = graph.tryAddPoint(
    new Point(Math.random() * CANVAS.width, Math.random() * CANVAS.height)
  )

  console.log(isAdd)

  if (!isAdd) return
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height) // clear all points and segements
  graph.draw(ctx)
}

const addRandomSegement = () => {
  // get randow points in graph
  const index1 = Math.floor(Math.random() * graph.pointsLength())
  const index2 = Math.floor(Math.random() * graph.pointsLength())

  // index1 and index2 should not be the same && duplicate segement also should not be in the array
  const isAdd = graph.tryAddSegement(
    new Segement(graph.getPoint(index1), graph.getPoint(index2))
  )

  console.log(isAdd)

  if (!isAdd) return
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height) // clear all points and segements
  graph.draw(ctx)
}

const removeRandomSegement = () => {
  if (graph.segementsLength() < 1) return

  const index = Math.floor(Math.random() * graph.pointsLength())

  graph.removeSegement(graph.getSegement(index))

  console.log("!!")
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height) // clear all points and segements
  graph.draw(ctx)
}

addPointBtn.addEventListener("click", addRandomPoint)
addSegementBtn.addEventListener("click", addRandomSegement)
removeSegementBtn.addEventListener("click", removeRandomSegement)
