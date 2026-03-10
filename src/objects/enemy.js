export class Enemy{

constructor(x,y){

this.x=x
this.y=y

this.radius=18

this.direction=1

}

update(){

this.x += this.direction * 2

if(this.x < 50 || this.x > 750){

this.direction *= -1

}

}

draw(ctx){

ctx.fillStyle="red"

ctx.beginPath()
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}