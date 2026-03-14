export function spawnCoins(state){

if(Math.random() < 0.01){

state.coins.push({

x: Math.random()*760,
y: 0,
size:20,

draw(ctx){

ctx.fillStyle="yellow"

ctx.beginPath()
ctx.arc(this.x,this.y,10,0,Math.PI*2)
ctx.fill()

}

})

}

state.coins.forEach(c => {

c.y += 2

})

}