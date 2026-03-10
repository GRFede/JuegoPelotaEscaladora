export class Platform{

constructor(x,y,w,h){

this.x=x
this.y=y
this.w=w
this.h=h

}

draw(ctx){

ctx.fillStyle="white"
ctx.fillRect(this.x,this.y,this.w,this.h)

}

}