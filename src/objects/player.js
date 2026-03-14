import { input } from "../systems/input.js"

export function createPlayer(x,y){

return {

x,
y,

width:30,
height:30,

vx:0,
vy:0,

speed:4,
jumpForce:12,
gravity:0.6,

onGround:false,

update(){

// movimiento horizontal

if(input.left){
this.vx = -this.speed
}
else if(input.right){
this.vx = this.speed
}
else{
this.vx = 0
}

this.x += this.vx

// salto

if(input.jump && this.onGround){

this.vy = -this.jumpForce
this.onGround = false

}

// gravedad

this.vy += this.gravity
this.y += this.vy

},

draw(ctx){

ctx.fillStyle="lime"

ctx.fillRect(
this.x,
this.y,
this.width,
this.height
)

}

}

}