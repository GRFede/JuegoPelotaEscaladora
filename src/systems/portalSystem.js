export class Portal{

constructor(x,y){

this.x=x
this.y=y
this.size=40

}

draw(ctx){

ctx.strokeStyle="purple"
ctx.strokeRect(this.x,this.y,this.size,this.size)

}

}