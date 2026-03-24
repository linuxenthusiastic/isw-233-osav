const links = document.querySelectorAll("nav a");
const secciones = document.querySelectorAll(".seccion");

function navegarA(id){
    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
        seccion.classList.remove("visible");
    })

    const destino = document.querySelector(`#${id}`);
    if(destino) {
        destino.classList.add("activa");
        setTimeout(() => {
            destino.classList.add("visible");
        },50);
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


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
    })
})

secciones.forEach(seccion => {
    observer.observe(seccion);
})