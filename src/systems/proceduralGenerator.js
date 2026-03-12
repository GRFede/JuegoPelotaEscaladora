import { Platform } from "../objects/platform.js"
import { Coin } from "../objects/coin.js"
import { Enemy } from "../objects/enemy.js"
import { worlds } from "../worlds/worldsConfig.js"
import { createEnemyByWorld } from "../worlds/enemyTypes.js"
import { PowerUp } from "../objects/powerup.js"
import { gameState } from "../game/state.js"

export class ProceduralGenerator{

constructor(platforms,coins,enemies,powerups){

this.platforms = platforms
this.coins = coins
this.enemies = enemies
this.powerups = powerups

this.lastY = 600

}

generate(){

const world = worlds[gameState.world]

let difficulty = gameState?.difficulty || 1

const gap = 120 * difficulty

const x = Math.random()*500+50

this.lastY -= gap

const platform = new Platform(x,this.lastY,100,20)

this.platforms.push(platform)

if(Math.random() < 0.08){

const types = [
"coinMagnet",
"jetpack",
"shield",
"superJump",
"slowMotion",
"scoreMultiplier",
"teleport",
"superBounce"
]

const type = types[Math.floor(Math.random()*types.length)]

this.powerups.push(
new PowerUp(x+40,this.lastY-40,type)
)

}

if(Math.random() < 0.15 * difficulty){

this.enemies.push(
createEnemyByWorld(
gameState.world,
x+40,
this.lastY-20
)
)

}

}

update(cameraY){

while(this.lastY > cameraY - 1000){

this.generate()

}

}

}