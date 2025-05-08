const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const jumpSound = new Audio("/sonido/jump-up.mp3");
const powerupSound = new Audio("/sonido/cartoon-jump.mp3");
const obstacleHitSound = new Audio("/sonido/obstacle_hit.wav");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let platforms = [];
let keys = {};
let gameStarted = false;

let level = 1;
let lastLevelShown = 1;
let levelMessageTimer = 0;
let characterIndex = 0;
let hasStartedJumping = false;

let powerUps = 0;
let powerUpItems = [];
let isInvulnerable = false;
let invulnerableTimer = 0;

let obstacles = [];  // Arreglo de obstáculos

const characters = [
  { color: "#f55" },
  { color: "#5f5" },
  { color: "#55f" },
  { color: "#ff5" },
  { color: "#f5f" },
];

const characterSelect = document.getElementById("characterSelect");
const preview = document.getElementById("characterPreview");

characterSelect.addEventListener("change", () => {
  const selectedColor = characters[characterSelect.selectedIndex];
  preview.style.backgroundColor = selectedColor.color;
});

let currentCharacterIndex = 0;
let ballColor = characters[currentCharacterIndex];

class Ball {
  constructor() {
    this.radius = 20;
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.5;
    this.jumpPower = -12;
  }

  update() {
    if (hasStartedJumping) {
      this.vy += this.gravity;
      this.y += this.vy;
    }

    this.x += this.vx;

    if (keys["ArrowLeft"]) this.vx = -5;
    else if (keys["ArrowRight"]) this.vx = 5;
    else this.vx *= 0.9;

    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width) this.x = canvas.width;

    if (this.y > canvas.height + 100) gameOver();
  }

  jump() {
    this.vy = this.jumpPower;
  }

  draw() {
    const blinking = isInvulnerable && Math.floor(invulnerableTimer / 10) % 2 === 0;
  
    if (!blinking) {
      ctx.beginPath();
      ctx.fillStyle = characters[characterIndex % characters.length].color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    if (isInvulnerable) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

class Platform {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 15;
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.speed = Math.random() * 2 + 1;
    this.updatePercents();
  }

  updatePercents() {
    this.xPercent = this.x / canvas.width;
    this.yPercent = this.y / canvas.height;
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.direction *= -1;
    }
    this.updatePercents();
  }

  repositionFromPercents() {
    this.x = this.xPercent * canvas.width;
    this.y = this.yPercent * canvas.height;
  }

  draw() {
    ctx.fillStyle = "#5af";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.collected = false;
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  draw() {
    if (this.collected) return;
    this.drawStar(ctx, this.x, this.y, 5, this.size / 2, this.size / 4);
  }

  checkCollision(ball) {
    if (
      !this.collected &&
      Math.abs(ball.x - this.x) < this.size &&
      Math.abs(ball.y - this.y) < this.size
    ) {
      this.collected = true;
      powerUps++;
      powerupSound.play();
    }
  }
}

// Clase de obstáculo con forma de bola con pinches
class Obstacle {
  constructor(x, y, width, height, speed = 2) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 1;
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.direction *= -1;
    }
  }

  draw() {
    const spikes = 12;
    const outerRadius = this.width / 2;
    const innerRadius = outerRadius * 0.6;
    const cx = this.x + outerRadius;
    const cy = this.y + outerRadius;
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.closePath();
    ctx.fillStyle = "#c00";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  checkCollision(ball) {
    const distX = ball.x - (this.x + this.width / 2);
    const distY = ball.y - (this.y + this.height / 2);
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < ball.radius + this.width / 2 && !isInvulnerable) {
      obstacleHitSound.play();
      gameOver();
    }
  }
}

const ball = new Ball();

function generateInitialPlatforms() {
  platforms = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * (canvas.width - 100);
    const y = canvas.height - i * 100;
    platforms.push(new Platform(x, y, 100));
  }
}

generateInitialPlatforms();

function gameOver() {
  gameStarted = false;
  document.getElementById("finalScore").innerText = 
    `Tu puntaje: ${Math.floor(score)}\nNivel alcanzado: ${level}`;
  document.getElementById("gameOverMenu").style.display = "flex";

  // Mostrar nuevamente la selección de personaje
  document.getElementById("characterSelect").style.display = "inline-block";
  document.getElementById("characterPreview").style.display = "inline-block";
}


function gameLoop() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach(platform => {
    platform.update();
    platform.draw();
  });

  platforms.forEach(platform => {
    if (
      hasStartedJumping &&
      ball.vy > 0 &&
      ball.x + ball.radius > platform.x &&
      ball.x - ball.radius < platform.x + platform.width &&
      ball.y + ball.radius > platform.y &&
      ball.y + ball.radius < platform.y + platform.height
    ) {
      ball.jump();
    }
  });

  ball.update();
  ball.draw();

  if (ball.y < canvas.height / 2) {
    const dy = (canvas.height / 2) - ball.y;
    ball.y = canvas.height / 2;
    platforms.forEach(p => p.y += dy);
    powerUpItems.forEach(p => p.y += dy); // <-- ¡esta línea mueve los power-ups!
    obstacles.forEach(o => o.y += dy);   // <-- opcional: también los obstáculos
    score += 0.05;
  }
  

  level = Math.floor(score / 10) + 1;
  if (level > lastLevelShown) {
    lastLevelShown = level;
    levelMessageTimer = 60;
  
    // Power-ups desde nivel 2 en adelante, y luego cada 2 niveles desde el nivel 10
    if ((level >= 2 && level < 10) || (level >= 10 && level % 2 === 0)) {
      powerUpItems.push(new PowerUp(Math.random() * canvas.width, canvas.height / 2));
    }
  
    // Obstáculos desde nivel 2 y luego cada 2 niveles
    if (level >= 2 && level % 2 === 0) {
      const y = canvas.height / 2 + 50;
      const x = Math.random() * (canvas.width - 40);
      obstacles.push(new Obstacle(x, y, 40, 40, 2 + Math.random() * 2));
    }
  }
  
  

  powerUpItems.forEach(powerUp => {
    powerUp.draw();
    powerUp.checkCollision(ball);
  });

  obstacles.forEach(obstacle => {
    obstacle.update();
    obstacle.draw();
    obstacle.checkCollision(ball);
  });

  if (isInvulnerable) {
    invulnerableTimer--;
    if (invulnerableTimer <= 0) {
      isInvulnerable = false;
    }
  }

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Puntaje: " + Math.floor(score), 10, 30);
  ctx.fillText("Power-Ups: " + powerUps, 10, 60);

  if (!hasStartedJumping) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Presiona ↑ para comenzar", canvas.width / 2, canvas.height / 2);
  }

  if (levelMessageTimer > 0) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Nivel " + level, canvas.width / 2, canvas.height / 3);
    levelMessageTimer--;
  }

  platforms = platforms.filter(platform => platform.y < canvas.height + 100);
  powerUpItems = powerUpItems.filter(p => p.y < canvas.height + 100 && !p.collected);
  obstacles = obstacles.filter(o => o.y < canvas.height + 100);

  while (platforms.length < 10) {
    const lastY = Math.min(...platforms.map(p => p.y));
    const newY = lastY - 100;
    const newX = Math.random() * (canvas.width - 100);
    platforms.push(new Platform(newX, newY, 100));
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if (e.key === "ArrowUp") {
    if (!hasStartedJumping) {
      hasStartedJumping = true;
      ball.jump();
      jumpSound.play();
    } else if (powerUps > 0 && !isInvulnerable) {
      isInvulnerable = true;
      powerUps--;
      invulnerableTimer = 60 * 7;
      powerupSound.play();
    }
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  platforms.forEach(platform => platform.repositionFromPercents());
});

document.getElementById("startButton").addEventListener("click", () => {
  currentCharacterIndex = characterSelect.selectedIndex;
  ballColor = characters[currentCharacterIndex];
  characterIndex = currentCharacterIndex;

  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("characterSelect").style.display = "none";
  document.getElementById("characterPreview").style.display = "none";

  gameStarted = true;
  gameLoop();
});

document.getElementById("restartButton").addEventListener("click", () => {
  currentCharacterIndex = characterSelect.selectedIndex;
  ballColor = characters[currentCharacterIndex];
  characterIndex = currentCharacterIndex; // ¡IMPORTANTE!

  score = 0;
  level = 1;
  lastLevelShown = 1;
  levelMessageTimer = 0;
  powerUps = 0;
  isInvulnerable = false;
  hasStartedJumping = false;

  ball.x = canvas.width / 2;
  ball.y = canvas.height - 100;
  ball.vx = 0;
  ball.vy = 0;

  generateInitialPlatforms();
  obstacles = [];
  powerUpItems = [];

  document.getElementById("gameOverMenu").style.display = "none";
  document.getElementById("characterSelect").style.display = "none";
  document.getElementById("characterPreview").style.display = "none";

  gameStarted = true;
  gameLoop();
});

document.getElementById("leftBtn").addEventListener("touchstart", () => keys["ArrowLeft"] = true);
document.getElementById("rightBtn").addEventListener("touchstart", () => keys["ArrowRight"] = true);
document.getElementById("jumpBtn").addEventListener("touchstart", () => {
  if (!hasStartedJumping) {
    hasStartedJumping = true;
    ball.jump();
    jumpSound.play();
  } else if (powerUps > 0 && !isInvulnerable) {
    isInvulnerable = true;
    powerUps--;
    invulnerableTimer = 60 * 7;
    powerupSound.play();
  }
});

// Opcional: soltar botón
["leftBtn", "rightBtn"].forEach(id => {
  document.getElementById(id).addEventListener("touchend", () => keys["ArrowLeft"] = keys["ArrowRight"] = false);
});

