export function startEngine(update, draw){

let lastTime = 0

function gameLoop(time){

const delta = time - lastTime
lastTime = time

update(delta)
draw()

requestAnimationFrame(gameLoop)

}

requestAnimationFrame(gameLoop)

}