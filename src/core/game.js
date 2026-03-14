import "../systems/input.js"

import { state } from "./state.js"
import { startEngine } from "./engine.js"

import { createPlayer } from "../objects/player.js"
import { createPlatform } from "../objects/platform.js"

import { checkCollisions } from "../systems/collision.js"
import { spawnCoins } from "../systems/generator.js"

import { drawHUD } from "../ui/hud.js"