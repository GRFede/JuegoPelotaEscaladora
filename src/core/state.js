export const gameState = {

mode: "menu",

currentWorld: "prehistoric",

level: 1,

score: 0,

coins: 0,

difficulty: 1

}

export function startGame(world){

gameState.mode = "playing"
gameState.currentWorld = world
gameState.level = 1
gameState.score = 0
gameState.coins = 0
gameState.difficulty = 1

}

export function goToMenu(){

gameState.mode = "menu"

}