const links = document.querySelectorAll("nav a");
const secciones = document.querySelectorAll(".seccion");

function navegarA(id){
    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    })

    const destino = document.querySelector(`#${id}`);
    if(destino) {
        destino.classList.add("activa");
    }
}

links.forEach(link => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();

        const href = link.getAttribute("href");
        const id = href.replace("#", "");

        navegarA(id);
    });
});


const btnProjects = document.querySelector("#btnProjects");
btnProjects.addEventListener("click", () => {
    navegarA("projects");
})

const btnContact = document.querySelector('.btn-secundario')
btnContact.addEventListener("click" , () => {
    navegarA("contact")
})

links.forEach(l => {
    const text = l.textContent;
    l.addEventListener("mouseover", () => {
        l.textContent = text.toUpperCase();
    })

    l.addEventListener("mouseout", () => {
        l.textContent = text;
    })
})


