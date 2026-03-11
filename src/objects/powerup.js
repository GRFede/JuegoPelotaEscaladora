export class PowerUp{

constructor(x,y,type){

this.x = x
this.y = y

this.radius = 14

this.type = type

this.collected = false

}

draw(ctx){

if(this.collected) return

switch(this.type){

case "coinMagnet":
ctx.fillStyle="#ffd700"
break

case "jetpack":
ctx.fillStyle="#ff5722"
break

case "shield":
ctx.fillStyle="#00e5ff"
break

case "superJump":
ctx.fillStyle="#76ff03"
break

case "slowMotion":
ctx.fillStyle="#b388ff"
break

case "scoreMultiplier":
ctx.fillStyle="#ff1744"
break

case "teleport":
ctx.fillStyle="#00b0ff"
break

case "superBounce":
ctx.fillStyle="#ff9100"
break

default:
ctx.fillStyle="white"

}

ctx.beginPath()
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}