export function checkCollisions(state){

const player = state.player

player.onGround = false

state.platforms.forEach(p => {

if(

player.x < p.x + p.w &&
player.x + player.width > p.x &&
player.y < p.y + p.h &&
player.y + player.height > p.y

){

// colocar jugador encima

player.y = p.y - player.height
player.vy = 0
player.onGround = true

}

})

}