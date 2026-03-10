export let gameState = {

mode: "menu", // menu | playing

world: "prehistoric",

score: 0,
coins: 0

}

export function startGame(world){

gameState.mode = "playing"
gameState.world = world
gameState.score = 0
gameState.coins = 0

}

export function goToMenu(){

gameState.mode = "menu"

}