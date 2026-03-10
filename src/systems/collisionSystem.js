export function handlePlatformCollision(player, platforms){

platforms.forEach(platform=>{

const withinX =
player.x > platform.x &&
player.x < platform.x + platform.width

const falling = player.velY > 0

const hitPlatform =
player.y + player.radius > platform.y &&
player.y + player.radius < platform.y + platform.height

if(withinX && falling && hitPlatform){

player.jump()

}

})

}