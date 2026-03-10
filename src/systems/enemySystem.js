import { goToMenu } from "../core/state.js"

export function checkEnemyCollision(player,enemies){

enemies.forEach(enemy=>{

const dx = player.x - enemy.x
const dy = player.y - enemy.y

const dist = Math.sqrt(dx*dx + dy*dy)

if(dist < player.radius + enemy.radius){

goToMenu()

}

})

}