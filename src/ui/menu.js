import { worlds } from "../worlds/worldsConfig.js"
import { startGame } from "../core/state.js"

export function drawMenu(ctx,canvas){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"
ctx.font="40px Arial"

ctx.fillText("PELota Escaladora",canvas.width/2-200,100)

let y=200

Object.keys(worlds).forEach((w)=>{

ctx.fillText("Jugar en "+worlds[w].name,100,y)

y+=60

})

}