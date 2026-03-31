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
// 📱 MOBILE DETECT
// =============================
const isMobile = window.innerWidth < 768;

// =============================
// 🎨 CANVAS
// =============================
const canvas = document.createElement("canvas");
canvas.id = "bgCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resize();

window.addEventListener("resize", resize);

// =============================
// 🖱️ MOUSE / TOUCH
// =============================
const mouse = {
x:null,
y:null,
radius:isMobile ? 80 : 140
};

window.addEventListener("mousemove",(e)=>{
mouse.x=e.x;
mouse.y=e.y;
});

window.addEventListener("touchmove",(e)=>{
mouse.x=e.touches[0].clientX;
mouse.y=e.touches[0].clientY;
});

// =============================
// ⚙️ PARTICLE CLASS
// =============================
class Particle{

constructor(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.size=Math.random()*2+1;

this.speedX=(Math.random()-.5)*0.5;
this.speedY=(Math.random()-.5)*0.5;

this.angle=Math.random()*Math.PI*2;
}

update(){

this.x+=this.speedX;
this.y+=this.speedY;

this.y+=Math.sin(this.angle)*0.3;
this.angle+=0.002;

if(mouse.x){

let dx=this.x-mouse.x;
let dy=this.y-mouse.y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<mouse.radius){

let force=(mouse.radius-dist)/mouse.radius;

this.x+=dx*force*.03;
this.y+=dy*force*.03;

}

}

}

draw(){

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fillStyle="#cfcfcf";
ctx.fill();

}

}

// =============================
// INIT PARTICLES
// =============================
let particles=[];

const particleCount=isMobile?35:90;

function init(){

for(let i=0;i<particleCount;i++){

particles.push(new Particle());

}

}

// =============================
// CONNECT
// =============================
function connect(){

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<(isMobile?90:120)){

ctx.strokeStyle="rgba(200,200,200,0.2)";
ctx.lineWidth=0.5;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}

}

}

// =============================
// ANIMATE
// =============================
function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.update();
p.draw();
});

connect();

requestAnimationFrame(animate);

}

// =============================
// RUN
// =============================
window.onload=()=>{

typing();
init();
animate();

};