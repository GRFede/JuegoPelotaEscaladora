const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let platforms = [];
let keys = {};
let gameStarted = false;

// Nuevas variables para niveles
let level = 1;
let lastLevelShown = 1;
let levelMessageTimer = 0;

// Función de colores por nivel
function getLevelColors(level) {
  const backgrounds = ["#222", "#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];
  const platformColors = ["#5af", "#0ff", "#0f0", "#ff0", "#f90", "#f55", "#f0f", "#ccc", "#fff"];
  const ballColors = ["#f55", "#0cf", "#0f0", "#ff0", "#f90", "#f0f", "#0ff", "#fff", "#000"];
  const index = Math.min(level - 1, backgrounds.length - 1);

  return {
    background: backgrounds[index],
    platform: platformColors[index],
    ball: ballColors[index]
  };
}

class Ball {
  constructor() {
    this.radius = 20;
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;
    this.vx = 0;
    this.vy = -10;
    this.gravity = 0.5;
    this.jumpPower = -12;
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
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
    const colors = getLevelColors(level);
    ctx.beginPath();
    ctx.fillStyle = colors.ball;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
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
    this.touched = false;

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
    const colors = getLevelColors(level);
    ctx.fillStyle = colors.platform;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const ball = new Ball();

for (let i = 0; i < 10; i++) {
  const x = Math.random() * (canvas.width - 100);
  const y = canvas.height - i * 100;
  platforms.push(new Platform(x, y, 100));
}

function gameOver() {
  gameStarted = false;
  document.getElementById("finalScore").innerText = "Tu puntaje: " + Math.floor(score);
  document.getElementById("gameOverMenu").style.display = "flex";
}

function gameLoop() {
  if (!gameStarted) return;

  const colors = getLevelColors(level);
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  platforms.forEach(platform => {
    platform.update();
    platform.draw();
  });

  platforms.forEach(platform => {
    if (
      ball.vy > 0 &&
      ball.x + ball.radius > platform.x &&
      ball.x - ball.radius < platform.x + platform.width &&
      ball.y + ball.radius > platform.y &&
      ball.y + ball.radius < platform.y + platform.height
    ) {
      ball.jump();
      if (!platform.touched) {
        score += 1;
        platform.touched = true;
      }
    }
  });

  ball.update();
  ball.draw();

  if (ball.y < canvas.height / 2) {
    const dy = (canvas.height / 2) - ball.y;
    ball.y = canvas.height / 2;
    platforms.forEach(p => p.y += dy);
    score += 0.05;
  }

  level = Math.floor(score / 10) + 1;
  if (level > lastLevelShown) {
    lastLevelShown = level;
    levelMessageTimer = 60;
  }

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Puntaje: " + Math.floor(score), 10, 30);

  if (levelMessageTimer > 0) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Nivel " + level, canvas.width / 2, canvas.height / 3);
    levelMessageTimer--;
  }

  platforms = platforms.filter(platform => platform.y < canvas.height + 100);

  while (platforms.length < 10) {
    const lastY = Math.min(...platforms.map(p => p.y));
    const newY = lastY - 100;
    const newX = Math.random() * (canvas.width - 100);
    platforms.push(new Platform(newX, newY, 100));
  }

  requestAnimationFrame(gameLoop);
}

// Controles
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Redimensionar canvas y reubicar plataformas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  platforms.forEach(platform => {
    platform.repositionFromPercents();
  });
});

// Menú de inicio
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("mainMenu").style.display = "none";
  gameStarted = true;
  gameLoop();
});

// Reinicio
document.getElementById("restartButton").addEventListener("click", () => {
  score = 0;
  level = 1;
  lastLevelShown = 1;
  levelMessageTimer = 0;

  ball.x = canvas.width / 2;
  ball.y = canvas.height - 100;
  ball.vx = 0;
  ball.vy = -10;

  platforms = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * (canvas.width - 100);
    const y = canvas.height - i * 100;
    platforms.push(new Platform(x, y, 100));
  }

  document.getElementById("gameOverMenu").style.display = "none";
  gameStarted = true;
  gameLoop();
});
