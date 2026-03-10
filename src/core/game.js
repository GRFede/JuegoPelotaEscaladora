import { ctx,start,canvas } from "./engine.js"

import { Player } from "../objects/player.js"
import { Platform } from "../objects/platform.js"

import { ProceduralGenerator } from "../systems/proceduralGenerator.js"

import { drawHUD } from "../ui/hud.js"

const player = new Player()

const platforms=[]

const generator = new ProceduralGenerator(platforms)

let score=0
let coins=0

for(let i=0;i<10;i++){

generator.generate()

}

document.addEventListener("keydown",e=>{

if(e.code==="Space"){

player.jump()

}

})

function update(){

player.update()

if(player.y<300){

score++

generator.generate()

}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

player.draw(ctx)

platforms.forEach(p=>p.draw(ctx))

drawHUD(ctx,score,coins)

}

start(update,draw)