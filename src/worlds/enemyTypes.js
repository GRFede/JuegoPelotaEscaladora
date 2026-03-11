import { Enemy } from "../objects/enemy.js"

export function createEnemyByWorld(world, x, y){

switch(world){

case "prehistoric":
return new Enemy(x,y,"dinosaur")

case "jungle":
return new Enemy(x,y,"snake")

case "egypt":
return new Enemy(x,y,"mummy")

case "greece":
return new Enemy(x,y,"minotaur")

case "medieval":
return new Enemy(x,y,"knight")

case "pirates":
return new Enemy(x,y,"pirate")

case "industrial":
return new Enemy(x,y,"machine")

case "modern":
return new Enemy(x,y,"drone")

case "cyberpunk":
return new Enemy(x,y,"cyberbot")

case "future":
return new Enemy(x,y,"android")

case "space":
return new Enemy(x,y,"alien")

case "pixel":
return new Enemy(x,y,"pixelMonster")

default:
return new Enemy(x,y,"basic")

}

}