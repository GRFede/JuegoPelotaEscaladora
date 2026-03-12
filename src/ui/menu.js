export const menuButtons = [

{label:"JUGAR", x:300, y:300, width:200, height:50, action:"start"},
{label:"SELECCIONAR MUNDO", x:300, y:370, width:200, height:50, action:"worlds"},
{label:"OPCIONES", x:300, y:440, width:200, height:50, action:"options"}

]

export function drawMenu(ctx,canvas){

ctx.fillStyle="#111"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"
ctx.font="48px Arial"
ctx.fillText("RUNNER LEGENDS",220,150)

ctx.font="20px Arial"
ctx.fillText("Presiona una opción",300,200)

menuButtons.forEach(btn=>{

ctx.fillStyle="#333"
ctx.fillRect(btn.x,btn.y,btn.width,btn.height)

ctx.fillStyle="white"
ctx.font="18px Arial"

ctx.fillText(btn.label,btn.x+20,btn.y+30)

})

}