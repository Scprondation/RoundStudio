/* ================= PRELOADER ================= */

window.addEventListener("load",()=>{
setTimeout(()=>{
document.getElementById("preloader")
.classList.add("hide");
},1500);
});


/* ================= SMOOTH SCROLL ================= */

const lenis=new Lenis();

function raf(time){
lenis.raf(time);
requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


/* ================= WEBGL BACKGROUND ================= */

const canvas=document.querySelector("#webgl");

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z=5;

const renderer=new THREE.WebGLRenderer({
canvas,
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);


/* ===== FLOATING RS OBJECT ===== */

const geometry=new THREE.TorusKnotGeometry(1,0.3,200,32);
const material=new THREE.MeshStandardMaterial({
color:0x8cffb3,
metalness:.8,
roughness:.2
});

const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

/* lights */

const light=new THREE.PointLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);


/* ===== CAMERA MOVEMENT ===== */

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*2;
const y=(e.clientY/window.innerHeight-.5)*2;

camera.position.x=x*1.5;
camera.position.y=-y*1.5;

});


/* ===== ANIMATE ===== */

function animate(){

mesh.rotation.x+=0.002;
mesh.rotation.y+=0.003;

renderer.render(scene,camera);

requestAnimationFrame(animate);
}

animate();


/* ================= SPA NAVIGATION ================= */

const view=document.getElementById("view");

const pages={

home:`
<div class="page active">
<h1>We Create Digital Experiences</h1>
<p>Studio level interaction design</p>
</div>
`,

projects:`<div class="page active">
<h1>Projects</h1>
<div id="projects" class="grid"></div>
</div>`
};

function loadPage(name){

view.innerHTML=pages[name];

if(name==="projects"){
loadProjects();
}

}

document.querySelectorAll("nav a")
.forEach(link=>{
link.onclick=()=>loadPage(link.dataset.page);
});


/* ================= PROJECTS LOAD ================= */

function loadProjects(){

fetch("./projects.json")
.then(r=>r.json())
.then(data=>{

const container=document.getElementById("projects");

data.forEach(p=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${p.image}">
<h3>${p.title}</h3>
`;

container.appendChild(card);

});

});
}

/* default page */
loadPage("home");


/* ================= RESIZE ================= */

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
