export class Player{

constructor(x,y){

this.x=x
this.y=y

this.radius=20

this.velY=0
this.velX=0

this.gravity=0.6

this.jumpForce=-15

}

update(){

this.velY+=this.gravity

this.x+=this.velX
this.y+=this.velY

}

jump(){

this.velY=this.jumpForce

}

moveLeft(){

this.velX=-5

}

moveRight(){

this.velX=5

}

stop(){

this.velX=0

}

draw(ctx){

ctx.fillStyle="orange"

ctx.beginPath()

ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)

ctx.fill()

}

}