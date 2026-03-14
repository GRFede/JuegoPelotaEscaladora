export const input = {

left: false,
right: false,
jump: false

}

window.addEventListener("keydown", (e)=>{

if(e.code === "ArrowLeft" || e.code === "KeyA"){
input.left = true
}

if(e.code === "ArrowRight" || e.code === "KeyD"){
input.right = true
}

if(e.code === "Space"){
input.jump = true
}

})

window.addEventListener("keyup", (e)=>{

if(e.code === "ArrowLeft" || e.code === "KeyA"){
input.left = false
}

if(e.code === "ArrowRight" || e.code === "KeyD"){
input.right = false
}

if(e.code === "Space"){
input.jump = false
}

})