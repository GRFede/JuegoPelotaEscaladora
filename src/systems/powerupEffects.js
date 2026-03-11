export const effects = {

coinMagnet:0,
jetpack:0,
shield:0,
superJump:0,
slowMotion:0,
scoreMultiplier:0,
teleport:0,
superBounce:0

}

export function updateEffects(){

Object.keys(effects).forEach(key=>{

if(effects[key] > 0){

effects[key]--

}

})

}