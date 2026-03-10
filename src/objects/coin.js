export class Coin{

constructor(x,y){

this.x=x
this.y=y
this.radius=10
this.collected=false

}

draw(ctx){

if(this.collected) return

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}