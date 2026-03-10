import { canvas,ctx,start } from "./engine.js"

import { Player } from "../objects/player.js"
import { Platform } from "../objects/platform.js"

import { ProceduralGenerator } from "../systems/proceduralGenerator.js"

import { drawHUD } from "../ui/hud.js"
import { drawMenu } from "../ui/menu.js"

import { gameState,startGame } from "./state.js"

import { Camera } from "./camera.js"

const player = new Player(400,600)

const camera = new Camera()

const platforms=[]

const generator = new ProceduralGenerator(platforms)

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

document.addEventListener("keyup",(e)=>{

player.stop()

})

canvas.addEventListener("click",()=>{

if(gameState.mode==="menu"){

startGame("prehistoric")

}

})

function update(){

if(gameState.mode!=="playing") return

player.update()

camera.update(player)

generator.update(camera.y)

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

player.draw(ctx)

ctx.restore()

drawHUD(ctx,gameState)

}

start(update,draw)