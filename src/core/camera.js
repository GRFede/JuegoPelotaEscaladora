export class Camera{

constructor(){

this.y=0

}

update(player){

if(player.y < 300){

this.y = player.y - 300

}

}

apply(ctx){

ctx.translate(0,-this.y)

}

}