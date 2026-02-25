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
