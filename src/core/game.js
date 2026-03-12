import { handlePlatformCollision } from "../systems/collisionSystem.js"
import { collectCoins } from "../systems/coinSystem.js"
import { checkEnemyCollision } from "../systems/enemySystem.js"
import { checkPortal } from "../systems/portalSystem.js"
import { worldList } from "../worlds/worldsConfig.js"
import { menuButtons } from "../ui/menu.js"

import { Coin } from "../objects/coin.js"
import { Enemy } from "../objects/enemy.js"
import { Portal } from "../objects/portal.js"

import { canvas,ctx,start } from "./engine.js"

import { Player } from "../objects/player.js"
import { Platform } from "../objects/platform.js"

import { ProceduralGenerator } from "../systems/proceduralGenerator.js"

import { drawHUD } from "../ui/hud.js"
import { drawMenu } from "../ui/menu.js"
import { drawWorldBackground } from "../worlds/worldRenderer.js"
import { gameState,startGame } from "./state.js"

import { PowerUp } from "../objects/powerup.js"
import { collectPowerUps } from "../systems/powerupSystem.js"
import { effects,updateEffects } from "../systems/powerupEffects.js"

import { Camera } from "./camera.js"


const coins=[]
const enemies=[]
const powerups=[]

const player = new Player(400,600)

const camera = new Camera()

const platforms=[]

const generator = new ProceduralGenerator(platforms,coins,enemies,powerups)

const portal = new Portal(400,-2000,getNextWorld())

function handleMenuAction(action){

switch(action){

case "start":

startGame("prehistoric")
break

case "worlds":

console.log("Seleccionar mundo (se implementará)")
break

case "options":

console.log("Opciones futuras")
break

}

}

for(let i=0;i<10;i++){

generator.generate()

}

document.addEventListener("keydown",(e)=>{

if(gameState.mode!=="playing") return

if(e.code==="Space"){

player.jump()

}

if(e.code==="ArrowLeft"){

player.moveLeft()

}

if(e.code==="ArrowRight"){

player.moveRight()

}

})

document.addEventListener("keyup",()=>{

player.stop()

})

canvas.addEventListener("click",(event)=>{

console.log("CLICK DETECTADO")

})

canvas.addEventListener("click",(event)=>{

console.log("modo actual:",gameState.mode)

})

canvas.addEventListener("click",(event)=>{

if(gameState.mode !== "menu") return

const rect = canvas.getBoundingClientRect()

const mouseX = event.clientX - rect.left
const mouseY = event.clientY - rect.top

console.log("click en:",mouseX,mouseY)

for(let btn of menuButtons){

if(
mouseX >= btn.x &&
mouseX <= btn.x + btn.width &&
mouseY >= btn.y &&
mouseY <= btn.y + btn.height
){

console.log("boton presionado:",btn.label)

handleMenuAction(btn.action)

}

}

})


function getNextWorld(){

const index = worldList.indexOf(gameState.world)

if(index < worldList.length - 1){

return worldList[index + 1]

}

return worldList[0]

}

function update(){

if(gameState.mode!=="playing") return

player.update()

camera.update(player)

generator.update(camera.y)

collectPowerUps(player,powerups,effects)

updateEffects()

handlePlatformCollision(player,platforms)

collectCoins(player,coins,gameState)

checkEnemyCollision(player,enemies)

checkPortal(player,portal)

enemies.forEach(enemy=>enemy.update())

gameState.score++

}


function draw(){

drawWorldBackground(ctx,canvas,gameState.world)

if(gameState.mode==="menu"){

drawMenu(ctx,canvas)
return

}

powerups.forEach(p=>p.draw(ctx))

ctx.save()

camera.apply(ctx)

platforms.forEach(p=>p.draw(ctx))

coins.forEach(c=>c.draw(ctx))

enemies.forEach(e=>e.draw(ctx))

portal.draw(ctx)

player.draw(ctx)

ctx.restore()

drawHUD(ctx,gameState)

}

start(update,draw)