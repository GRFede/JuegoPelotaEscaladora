import { startGame } from "../core/state.js"

export function checkPortal(player,portal){

const dx = player.x - portal.x
const dy = player.y - portal.y

const dist = Math.sqrt(dx*dx + dy*dy)

if(dist < player.radius + portal.radius){

startGame(portal.targetWorld)

}

}