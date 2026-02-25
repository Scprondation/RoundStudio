const container = document.getElementById("projects");

/* ==== Без падений если JSON не загрузился ==== */

fetch("projects.json")
.then(response => {
if(!response.ok){
throw new Error("JSON not found");
}
return response.json();
})
.then(data => renderProjects(data))
.catch(error => {

console.warn("Using fallback projects");

const fallback = [
{
title:"Studio Project",
image:"https://picsum.photos/900/600?1"
}
];

renderProjects(fallback);

});


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


/* ==== Viewer ==== */

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");

function openViewer(project){
viewer.classList.add("active");
viewerImg.src = project.image;
viewerTitle.innerText = project.title;
}

document.getElementById("close").onclick = () => {
viewer.classList.remove("active");
};

/* ================= PARTICLES ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


/* CREATE PARTICLES */

for(let i=0;i<70;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.3,
vy:(Math.random()-0.5)*0.3,
size:Math.random()*2+1
});
}


/* ANIMATION */

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

/* wrap screen */
if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;
if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

/* draw */
ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,0.35)";
ctx.fill();

});

/* lines between particles */

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){
ctx.strokeStyle=`rgba(255,255,255,${0.1-dist/1200})`;
ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();
}

}
}

requestAnimationFrame(animateParticles);
}

animateParticles();
