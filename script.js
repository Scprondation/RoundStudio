/* ========= SMOOTH SCROLL ========= */

const lenis = new Lenis({
duration:1.2,
smooth:true
});

function raf(time){
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


/* ========= CURSOR ========= */

const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});


/* ========= MAGNETIC BUTTON ========= */

document.querySelectorAll(".magnetic")
.forEach(btn=>{

btn.addEventListener("mousemove",e=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;
const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=`translate(${x*0.3}px,${y*0.3}px)`;
});

btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)";
});

});


/* ========= SCROLL REVEAL ========= */

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting)
entry.target.classList.add("visible");
});
});

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el));


/* ========= LOAD PROJECTS ========= */

const container=document.getElementById("projects");

fetch("./projects.json")
.then(r=>r.json())
.then(projects=>{

projects.forEach(p=>{

const card=document.createElement("div");
card.className="card reveal";

card.innerHTML=`
<img src="${p.image}">
<div class="card-content">
<h3>${p.title}</h3>
</div>
`;

card.onclick=()=>openViewer(p);

container.appendChild(card);
observer.observe(card);

});

});


/* ========= VIEWER ========= */

const viewer=document.getElementById("viewer");
const vimg=document.getElementById("viewer-img");
const vtitle=document.getElementById("viewer-title");

function openViewer(p){
viewer.classList.add("active");
vimg.src=p.image;
vtitle.innerText=p.title;
}

document.getElementById("close").onclick=()=>{
viewer.classList.remove("active");
};
