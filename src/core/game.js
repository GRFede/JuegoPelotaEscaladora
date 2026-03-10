import { handlePlatformCollision } from "../systems/collisionSystem.js"
import { collectCoins } from "../systems/coinSystem.js"
import { checkEnemyCollision } from "../systems/enemySystem.js"
import { checkPortal } from "../systems/portalSystem.js"

import { Coin } from "../objects/coin.js"
import { Enemy } from "../objects/enemy.js"
import { Portal } from "../objects/portal.js"

import { canvas,ctx,start } from "./engine.js"

import { Player } from "../objects/player.js"
import { Platform } from "../objects/platform.js"

import { ProceduralGenerator } from "../systems/proceduralGenerator.js"

import { drawHUD } from "../ui/hud.js"
import { drawMenu, menuButtons } from "../ui/menu.js"

import { gameState,startGame } from "./state.js"

import { Camera } from "./camera.js"


const coins=[]
const enemies=[]

const player = new Player(400,600)

const camera = new Camera()

const platforms=[]

const generator = new ProceduralGenerator(platforms,coins,enemies)

const portal = new Portal(400,-2000,"egypt")

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


canvas.addEventListener("click",(e)=>{

if(gameState.mode !== "menu") return

const rect = canvas.getBoundingClientRect()

const mouseX = e.clientX - rect.left
const mouseY = e.clientY - rect.top

for(let i=0;i<menuButtons.length;i++){

const button = menuButtons[i]

if(
mouseX >= button.x &&
mouseX <= button.x + button.width &&
mouseY >= button.y &&
mouseY <= button.y + button.height
){

startGame(button.world)
break

}

}

})


function update(){

if(gameState.mode!=="playing") return

player.update()

camera.update(player)

generator.update(camera.y)

handlePlatformCollision(player,platforms)

collectCoins(player,coins,gameState)

checkEnemyCollision(player,enemies)

checkPortal(player,portal)

enemies.forEach(enemy=>enemy.update())

gameState.score++

}


function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

if(gameState.mode==="menu"){

drawMenu(ctx,canvas)
return

}

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