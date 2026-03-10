export const canvas = document.getElementById("gameCanvas")
export const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

export let lastTime = 0

export function gameLoop(time){

const delta = time - lastTime
lastTime = time

update(delta)
draw()

requestAnimationFrame(gameLoop)

}

export let update = ()=>{}
export let draw = ()=>{}

export function start(updateFunc,drawFunc){

update = updateFunc
draw = drawFunc

requestAnimationFrame(gameLoop)

}