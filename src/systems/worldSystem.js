export const worlds = [

"prehistoric",
"medieval",
"industrial",
"future",
"space"

]

export let currentWorld = 0

export function nextWorld(){

currentWorld++

if(currentWorld>=worlds.length){

currentWorld=0

}

}