export class Enemy{

constructor(x,y,type="basic"){

this.x = x
this.y = y

this.radius = 18

this.direction = 1

this.type = type

}

update(){

this.x += this.direction * 2

if(this.x < 50 || this.x > 750){

this.direction *= -1

}

}

draw(ctx){

switch(this.type){

case "dinosaur":
ctx.fillStyle = "#3e7f2b"
break

case "snake":
ctx.fillStyle = "#2e7d32"
break

case "mummy":
ctx.fillStyle = "#d7ccc8"
break

case "minotaur":
ctx.fillStyle = "#5d4037"
break

case "knight":
ctx.fillStyle = "#9e9e9e"
break

case "pirate":
ctx.fillStyle = "#4e342e"
break

case "machine":
ctx.fillStyle = "#616161"
break

case "drone":
ctx.fillStyle = "#b71c1c"
break

case "cyberbot":
ctx.fillStyle = "#00e5ff"
break

case "android":
ctx.fillStyle = "#7c4dff"
break

case "alien":
ctx.fillStyle = "#76ff03"
break

case "pixelMonster":
ctx.fillStyle = "#ff1744"
break

default:
ctx.fillStyle = "red"

}

ctx.beginPath()
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
ctx.fill()

}

}