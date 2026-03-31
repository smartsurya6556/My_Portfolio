setTimeout(() => {
  typing();
  initParticles();
  animate();
}, 500);


// =============================
// 🔥 TYPING EFFECT
// =============================
const text = "Backend Developer | Java & Python";
let i = 0;

function typing() {
  const el = document.getElementById("typing");
  if (!el) return;

  if (i < text.length) {
    el.innerHTML += text[i];
    i++;
    setTimeout(typing, 60);
  }
}

// =============================
// 🎨 CANVAS SETUP
// =============================
const canvas = document.createElement("canvas");
canvas.id = "bgCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =============================
// 🖱️ MOUSE
// =============================
const mouse = {
  x: null,
  y: null,
  radius: 140,
  mode: "repel"
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  trailParticles.push({
    x: e.x,
    y: e.y,
    size: 3,
    life: 30
  });
});

window.addEventListener("click", () => {
  mouse.mode = mouse.mode === "repel" ? "attract" : "repel";
});

window.addEventListener("mousedown", () => {
  particles.forEach(p => {
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      p.x += dx * 0.5;
      p.y += dy * 0.5;
    }
  });
});

// =============================
// ⚙️ SETTINGS
// =============================
const settings = {
  swirlStrength: 0.002,
  orbitRadius: 80,
  waveSpeed: 0.002,
  waveHeight: 0.3
};

// =============================
// ✨ PARTICLE CLASS
// =============================
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;

    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;

    this.angle = Math.random() * Math.PI * 2;
    this.depth = Math.random();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 🌊 Wave
    this.y += Math.sin(this.angle) * settings.waveHeight;
    this.angle += settings.waveSpeed;

    this.speedX += (Math.random() - 0.5) * 0.02;
    this.speedY += (Math.random() - 0.5) * 0.02;

    this.speedX = Math.max(Math.min(this.speedX, 1), -1);
    this.speedY = Math.max(Math.min(this.speedY, 1), -1);

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    if (mouse.x !== null) {
      let dx = this.x - mouse.x;
      let dy = this.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < settings.orbitRadius) {
        let angle = Math.atan2(dy, dx);
        this.x = mouse.x + Math.cos(angle + 0.05) * dist;
        this.y = mouse.y + Math.sin(angle + 0.05) * dist;
      }

      if (dist < 150) {
        this.x += -dy * settings.swirlStrength;
        this.y += dx * settings.swirlStrength;
      }

      if (dist < mouse.radius) {
        let force = (mouse.radius - dist) / mouse.radius;

        if (mouse.mode === "repel") {
          this.x += dx * force * 0.03;
          this.y += dy * force * 0.03;
        } else {
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }

      if (dist < 180) {
        let force = (180 - dist) / 180;
        this.x += (mouse.x - this.x) * force * 0.02;
        this.y += (mouse.y - this.y) * force * 0.02;
      }
    }

    this.x += Math.sin(this.angle * this.depth) * 0.2;
  }

  draw() {
    let pulse = Math.sin(Date.now() * 0.005) * 0.5;
    let size = this.size + pulse;

    // 🎨 GREY COLOR (CHANGED)
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);

    ctx.fillStyle = "#cfcfcf";
    ctx.fill();
  }
}

// =============================
// INIT
// =============================
let particles = [];
function initParticles() {
  for (let i = 0; i < 90; i++) {
    particles.push(new Particle());
  }
}

// =============================
// CONNECTION
// =============================
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        // 🎯 smooth fade but always visible
        let opacity = 1 - dist / 120;

        // 🔥 strong + stable visibility
        let finalOpacity = 0.15 + opacity * 0.35;

        ctx.strokeStyle = `rgba(200,200,200,${finalOpacity})`;
        ctx.lineWidth = 0.6; // slightly thicker = clearer

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}
// =============================
// ✨ TRAIL + RIPPLE
// =============================
let trailParticles = [];
let ripples = [];

window.addEventListener("click", (e) => {
  ripples.push({
    x: e.x,
    y: e.y,
    radius: 0,
    alpha: 1
  });
});

// =============================
// 🎬 ANIMATION
// =============================
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();

  // ✨ trail (grey)
  trailParticles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,200,200,${p.life / 30})`;
    ctx.fill();

    p.life--;
    p.size *= 0.95;
    if (p.life <= 0) trailParticles.splice(i, 1);
  });

  // ripple (grey)
  ripples.forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200,200,200,${r.alpha})`;
    ctx.stroke();

    r.radius += 2;
    r.alpha -= 0.02;
    if (r.alpha <= 0) ripples.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

// =============================
// 🚀 RUN
// =============================
window.onload = () => {
  typing();
  initParticles();
  animate();
};

export {};