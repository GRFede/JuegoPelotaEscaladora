export function createPlatform(x,y,w,h){

return {

x,y,w,h,

draw(ctx){

ctx.fillStyle="brown"

ctx.fillRect(
this.x,
this.y,
this.w,
this.h
)

}

}

}