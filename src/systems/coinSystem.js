export function collectCoins(player, coins, gameState){

coins.forEach(coin=>{

if(coin.collected) return

const dx = player.x - coin.x
const dy = player.y - coin.y

const dist = Math.sqrt(dx*dx + dy*dy)

if(dist < player.radius + coin.radius){

coin.collected=true

gameState.coins += 1
gameState.score += 50

}

})

}