export class Enemy{

constructor(x,y){

this.x=x
this.y=y
this.size=30

}

draw(ctx){

ctx.fillStyle="red"
ctx.fillRect(this.x,this.y,this.size,this.size)

}

}