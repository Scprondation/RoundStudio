/* ======================================
   LOAD PROJECTS (SAFE VERSION)
====================================== */

const container = document.getElementById("projects");

if(container){

fetch("projects.json")
.then(response => {
if(!response.ok) throw new Error("JSON not found");
return response.json();
})
.then(data => renderProjects(data))
.catch(() => {

console.warn("Using fallback projects");

renderProjects([
{
title:"Studio Project",
image:"https://picsum.photos/900/600?1"
}
]);

});

}


function renderProjects(projects){

projects.forEach(project => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${project.image}">
<div class="card-content">
<h3>${project.title}</h3>
</div>
`;

card.onclick = () => openViewer(project);

container.appendChild(card);

});

}


/* ======================================
   FULLSCREEN VIEWER
====================================== */

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");
const closeBtn = document.getElementById("close");

function openViewer(project){

if(!viewer) return;

viewer.classList.add("active");
viewerImg.src = project.image;
viewerTitle.innerText = project.title;

}

if(closeBtn){
closeBtn.onclick = () => {
viewer.classList.remove("active");
};
}


/* ======================================
   SUPER WOW PARTICLES BACKGROUND
====================================== */

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x:0, y:0 };

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);


/* ===== Mouse movement ===== */

document.addEventListener("mousemove", e => {

mouse.x = e.clientX;
mouse.y = e.clientY;

const glow = document.querySelector(".cursor-glow");

if(glow){
glow.style.transform =
`translate(${mouse.x}px, ${mouse.y}px)`;
}

});


/* ===== Create particles ===== */

const PARTICLE_COUNT = 90;

for(let i=0;i<PARTICLE_COUNT;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
size:Math.random()*2+1
});
}


/* ===== Animation ===== */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

/* Mouse attraction */

let dx = mouse.x - p.x;
let dy = mouse.y - p.y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 160){
p.x -= dx * 0.002;
p.y -= dy * 0.002;
}

/* Movement */

p.x += p.vx;
p.y += p.vy;

/* Screen wrap */

if(p.x < 0) p.x = canvas.width;
if(p.x > canvas.width) p.x = 0;
if(p.y < 0) p.y = canvas.height;
if(p.y > canvas.height) p.y = 0;

/* Draw particle */

ctx.beginPath();
ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
ctx.fillStyle = "rgba(255,255,255,0.6)";
ctx.fill();

});


/* ===== Connections ===== */

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 130){

ctx.strokeStyle =
`rgba(255,255,255,${0.15 - dist/900})`;

ctx.beginPath();
ctx.moveTo(particles[a].x, particles[a].y);
ctx.lineTo(particles[b].x, particles[b].y);
ctx.stroke();

}

}
}

requestAnimationFrame(animate);
}

animate();

}
