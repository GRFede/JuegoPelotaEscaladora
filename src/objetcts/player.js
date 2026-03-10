import { canvas } from "../core/engine.js"

export class Player{

constructor(){

this.x = canvas.width/2
this.y = canvas.height-200

this.radius = 20

this.velY = 0
this.gravity = 0.5
this.jumpForce = -12

}

jump(){

this.velY = this.jumpForce

}

update(){

this.velY += this.gravity
this.y += this.velY

}

draw(ctx){

ctx.fillStyle="orange"

ctx.beginPath()
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}