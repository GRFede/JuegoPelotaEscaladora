import { Platform } from "../objects/platform.js"

export class ProceduralGenerator{

constructor(platforms){

this.platforms = platforms
this.lastY = 600

}

generate(){

const gap = 120

const x = Math.random()*600+100

this.lastY -= gap

this.platforms.push(

new Platform(x,this.lastY,80,20)

)

}

}