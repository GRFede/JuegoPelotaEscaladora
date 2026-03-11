import { worlds } from "./worldsConfig.js"

export function drawWorldBackground(ctx,canvas,world){

const config = worlds[world]

ctx.fillStyle = config.background

ctx.fillRect(0,0,canvas.width,canvas.height)

}