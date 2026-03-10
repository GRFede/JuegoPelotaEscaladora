import { worlds } from "../worlds/worldsConfig.js"

export function drawHUD(ctx,state){

ctx.fillStyle="white"

ctx.font="20px Arial"

ctx.fillText("Score: "+state.score,20,40)

ctx.fillText("Coins: "+state.coins,20,70)

ctx.fillText("World: "+worlds[state.world].name,20,100)

}