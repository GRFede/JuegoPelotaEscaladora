export function drawHUD(ctx,state){

ctx.fillStyle="white"
ctx.font="20px Arial"

ctx.fillText(
"Score: " + state.score,
20,
40
)

ctx.fillText(
"Coins: " + state.coinsCollected,
20,
70
)

}