export function collectPowerUps(player,powerups,effects){

powerups.forEach(p=>{

if(p.collected) return

const dx = player.x - p.x
const dy = player.y - p.y

const dist = Math.sqrt(dx*dx + dy*dy)

if(dist < player.radius + p.radius){

p.collected = true

activatePowerUp(p.type,effects)

}

})

}

function activatePowerUp(type,effects){

switch(type){

case "coinMagnet":

effects.coinMagnet = 600
break

case "jetpack":

effects.jetpack = 300
break

case "shield":

effects.shield = 600
break

case "superJump":

effects.superJump = 400
break

case "slowMotion":

effects.slowMotion = 400
break

case "scoreMultiplier":

effects.scoreMultiplier = 600
break

case "teleport":

effects.teleport = 1
break

case "superBounce":

effects.superBounce = 500
break

}

}