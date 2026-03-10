import { Platform } from "../objects/platform.js"
import { Coin } from "../objects/coin.js"
import { Enemy } from "../objects/enemy.js"

export class ProceduralGenerator{

constructor(platforms,coins,enemies){

this.platforms = platforms
this.coins = coins
this.enemies = enemies

this.lastY = 600

}

generate(){

const gap = 120

const x = Math.random()*500+50

this.lastY -= gap

const platform = new Platform(x,this.lastY,100,20)

this.platforms.push(platform)

if(Math.random() < 0.4){

this.coins.push(
new Coin(x+50,this.lastY-30)
)

}

if(Math.random() < 0.15){

this.enemies.push(
new Enemy(x+40,this.lastY-20)
)

}

}

update(cameraY){

while(this.lastY > cameraY - 1000){

this.generate()

}

}

}