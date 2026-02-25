/* ================= CURSOR ================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";
});


/* ================= SCROLL REVEAL ================= */

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("visible");
}
});
});

document.querySelectorAll(".reveal")
.forEach(el => observer.observe(el));


/* ================= LOAD PROJECTS ================= */

const container = document.getElementById("projects");

fetch("./projects.json")
.then(res => res.json())
.then(projects => {

projects.forEach(project => {

const card = document.createElement("div");
card.className = "card reveal";

card.innerHTML = `
<img src="${project.image}">
<div class="card-content">
<h3>${project.title}</h3>
</div>
`;

card.onclick = () => openViewer(project);

card.addEventListener("mousemove", tilt);
card.addEventListener("mouseleave", reset);

container.appendChild(card);
observer.observe(card);

});

});


/* ================= 3D HOVER ================= */

function tilt(e){

const card = e.currentTarget;
const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateX = -(y - rect.height/2) / 15;
const rotateY = (x - rect.width/2) / 15;

card.style.transform =
`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
}

function reset(e){
e.currentTarget.style.transform="";
}


/* ================= VIEWER ================= */

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