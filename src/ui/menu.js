import { worlds, worldList } from "../worlds/worldsConfig.js"

export let menuButtons = []

export function drawMenu(ctx,canvas){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"
ctx.font="40px Arial"

ctx.fillText("Pelota Escaladora",canvas.width/2-170,100)

menuButtons = []

let y = 200

worldList.forEach((world)=>{

const text = "Jugar en " + worlds[world].name

ctx.fillText(text,100,y)

menuButtons.push({
world: world,
x:100,
y:y-30,
width:300,
height:40
})

y += 60

})

}