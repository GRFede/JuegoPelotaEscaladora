import { worlds,currentWorld } from "../systems/worldSystem.js"

export function drawHUD(ctx,score,coins){

ctx.fillStyle="white"
ctx.font="20px Arial"

ctx.fillText("Score: "+score,20,40)

ctx.fillText("Coins: "+coins,20,70)

ctx.fillText("World: "+worlds[currentWorld],20,100)

}